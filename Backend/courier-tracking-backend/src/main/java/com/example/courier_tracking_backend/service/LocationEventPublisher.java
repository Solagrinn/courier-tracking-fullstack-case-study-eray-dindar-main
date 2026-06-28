package com.example.courier_tracking_backend.service;

import com.example.courier_tracking_backend.model.dto.CourierPingDTO;
import com.example.courier_tracking_backend.service.observer.LocationObserver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Observer Pattern: Publisher that notifies all registered LocationObservers
 * when a new courier location update arrives.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class LocationEventPublisher {

    private final List<LocationObserver> observers;

    public void publish(CourierPingDTO locationRequest) {
        log.debug("Publishing location update for courier {}", locationRequest.getCourierId());
        for (LocationObserver observer : observers) {
            try {
                observer.onLocationUpdate(locationRequest);
            } catch (Exception e) {
                log.error("Observer {} failed processing location update: {}",
                        observer.getClass().getSimpleName(), e.getMessage(), e);
            }
        }
    }
}

