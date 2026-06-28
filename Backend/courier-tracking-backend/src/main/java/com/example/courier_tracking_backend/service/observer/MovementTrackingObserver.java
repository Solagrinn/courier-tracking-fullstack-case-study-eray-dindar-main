package com.example.courier_tracking_backend.service.observer;

import com.example.courier_tracking_backend.model.dto.CourierLocationDTO;
import com.example.courier_tracking_backend.model.dto.CourierPingDTO;
import com.example.courier_tracking_backend.model.entity.Courier;
import com.example.courier_tracking_backend.repository.CourierRepository;
import com.example.courier_tracking_backend.service.strategy.DistanceStrategy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
@Slf4j
public class MovementTrackingObserver implements LocationObserver {

    private final CourierRepository courierRepository;
    private final ConcurrentHashMap<String, CourierLocationDTO> courierLocations;
    private final DistanceStrategy distanceStrategy;

    @Override
    @Transactional
    public void onLocationUpdate(CourierPingDTO request) {
        Courier courier = courierRepository.findByCourierId(request.getCourierId());

        // Calculate distance from last known location
        CourierLocationDTO previousLocation = courierLocations.get(request.getCourierId());
        if (previousLocation != null) {
            double distance = distanceStrategy.calculate(
                    previousLocation.getLat(), previousLocation.getLng(),
                    request.getLat(), request.getLng()
            );

            courier.setTotalDistance(courier.getTotalDistance() + distance);
        }

        // Update courier's last location
        courier.setLastLat(request.getLat());
        courier.setLastLng(request.getLng());
        courier.setLastUpdated(request.getTimestamp());
        courierRepository.save(courier);
    }
}
