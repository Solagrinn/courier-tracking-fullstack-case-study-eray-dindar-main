package com.example.courier_tracking_backend.service.observer;

import com.example.courier_tracking_backend.model.dto.CourierPingDTO;

/**
 * Observer Pattern: Interface for observers that react to courier location updates.
 */
public interface LocationObserver {
    void onLocationUpdate(CourierPingDTO locationRequest);
}

