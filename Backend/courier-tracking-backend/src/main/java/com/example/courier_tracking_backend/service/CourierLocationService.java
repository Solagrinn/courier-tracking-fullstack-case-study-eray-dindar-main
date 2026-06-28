package com.example.courier_tracking_backend.service;

import com.example.courier_tracking_backend.model.dto.BreadcrumbHistoryDTO;
import com.example.courier_tracking_backend.model.dto.CourierLocationDTO;
import com.example.courier_tracking_backend.model.dto.CourierPingDTO;
import com.example.courier_tracking_backend.model.entity.Breadcrumb;
import com.example.courier_tracking_backend.repository.BreadcrumbRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.Collection;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourierLocationService {
    private final ConcurrentHashMap<String, CourierLocationDTO> courierLocations;
    private final LocationEventPublisher locationEventPublisher;
    private final BreadcrumbRepository breadcrumbRepository;


    /**
     * Process an incoming courier location ping.
     */
    public void processLocationUpdate(CourierPingDTO request) {
        log.info("Processing location update: courier={}, lat={}, lng={}, time={}",
                request.getCourierId(), request.getLat(), request.getLng(), request.getTimestamp());

        locationEventPublisher.publish(request);
        courierLocations.compute(request.getCourierId(), (id, existing) -> {
            if (existing == null) {
                return CourierLocationDTO.builder().courierId(request.getCourierId()).lat(request.getLat()).lng(request.getLng()).timestamp(request.getTimestamp()).build();
            }
            existing.setLat(request.getLat());
            existing.setLng(request.getLng());
            existing.setTimestamp(request.getTimestamp());
            return existing;
        });
        // Save the breadcrumb on DistanceTrackingObserver.
    }

    /**
     * Get current (real-time) locations of all couriers from the ConcurrentHashMap.
     */
    public Collection<CourierLocationDTO> getCurrentLocations() {
        return courierLocations.values();
    }

    /**
     * Get single couriers location history (paginated by 100) from the H2 database.
     * Pagination is unused for project simplicity
     */
    public List<BreadcrumbHistoryDTO> getBreadcrumbsHistory(String courierId, Long lastSeenId) {
        Pageable limitTwoHundredFifty = PageRequest.of(0, 250);
        List<Breadcrumb> entities;

        if (lastSeenId == null) {
            // Fallback: No ID provided, just get the 100 latest
            entities = breadcrumbRepository.findByCourier_CourierIdOrderByTimestampDesc(courierId, limitTwoHundredFifty);
        } else {
            // User clicked "Older", get 100 points older than lastSeenId
            entities = breadcrumbRepository.findOlderThan(courierId, lastSeenId, limitTwoHundredFifty);
        }

        return entities.stream()
                .map(this::convertToDto)
                .toList();
    }


    private BreadcrumbHistoryDTO convertToDto(Breadcrumb entity) {
        return BreadcrumbHistoryDTO.builder()
                .Id(entity.getId())
                .lat(entity.getLat())
                .lng(entity.getLng())
                .timestamp(entity.getTimestamp())
                .build();
    }


}
