package com.example.courier_tracking_backend.service.observer;

import com.example.courier_tracking_backend.model.dto.CourierLocationDTO;
import com.example.courier_tracking_backend.model.dto.CourierPingDTO;
import com.example.courier_tracking_backend.model.dto.StoreDTO;
import com.example.courier_tracking_backend.model.entity.Courier;
import com.example.courier_tracking_backend.model.entity.Store;
import com.example.courier_tracking_backend.model.entity.StoreEntranceLog;
import com.example.courier_tracking_backend.repository.CourierRepository;
import com.example.courier_tracking_backend.repository.StoreEntranceLogRepository;
import com.example.courier_tracking_backend.repository.StoreRepository;
import com.example.courier_tracking_backend.service.StoreService;
import com.example.courier_tracking_backend.service.strategy.DistanceStrategy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
@Slf4j
public class StoreProximityObserver implements LocationObserver {

    private static final double STORE_RADIUS_METERS = 100.0;
    private static final long REENTRY_COOLDOWN_SECONDS = 60;

    private final DistanceStrategy distanceStrategy;
    private final StoreEntranceLogRepository storeEntranceLogRepository;
    private final ConcurrentHashMap<String, CourierLocationDTO> courierLocations;
    private final CourierRepository courierRepository;
    private final StoreRepository storeRepository;

    private final StoreService storeService;
    private List<StoreDTO> stores;

    @EventListener(org.springframework.boot.context.event.ApplicationReadyEvent.class)
    public void init() {
        // This runs AFTER the app starts and database is ready
        this.stores = storeService.getAllStores();
        log.info("Initialized StoreProximityObserver with {} stores from database.", stores.size());
    }

    @Override
    @Transactional
    public void onLocationUpdate(CourierPingDTO request) {

        boolean insideAnyStore = false;

        for (StoreDTO store : stores) {
            double distance = distanceStrategy.calculate(
                    request.getLat(), request.getLng(),
                    store.getLat(), store.getLng()
            );

            if (distance <= STORE_RADIUS_METERS) {
                insideAnyStore = true;

                if (!isReentry(request.getCourierId(), store.getStoreId(), request.getTimestamp())) {
                    logStoreEntrance(request, store);
                }

                break; // stop after first match
            }
        }

        updateLiveCourierState(request.getCourierId(), insideAnyStore);
    }

    private boolean isReentry(String courierId, Long storeId, LocalDateTime currentTimestamp) {
        Optional<StoreEntranceLog> lastEntry = storeEntranceLogRepository
                .findTopByCourier_CourierIdAndStore_StoreIdOrderByEntranceDateDesc(courierId, storeId);

        if (lastEntry.isPresent()) {
            long secondsSinceLastEntry = ChronoUnit.SECONDS.between(
                    lastEntry.get().getEntranceDate(), currentTimestamp);
            return secondsSinceLastEntry < REENTRY_COOLDOWN_SECONDS;
        }

        return false;
    }

    private void logStoreEntrance(CourierPingDTO request, StoreDTO storeDTO) {
        Courier courier = courierRepository.findByCourierId(request.getCourierId());
        Store store = storeRepository.findByStoreId(storeDTO.getStoreId());

        StoreEntranceLog entranceLog = StoreEntranceLog.builder()
                .courier(courier)
                .store(store)
                .entranceDate(request.getTimestamp())
                .build();

        courier.setLastEnteredStore(store);

        courierRepository.save(courier);
        storeEntranceLogRepository.save(entranceLog);
        log.info("Courier {} entered the radius of store '{}' at {}",
                request.getCourierId(), storeDTO.getName(), request.getTimestamp());
    }

    private void updateLiveCourierState(String courierId, boolean inStore) {

        courierLocations.compute(courierId, (id, location) -> {
            if (location == null) return null;

            location.setInStore(inStore);
            return location;
        });
    }
}
