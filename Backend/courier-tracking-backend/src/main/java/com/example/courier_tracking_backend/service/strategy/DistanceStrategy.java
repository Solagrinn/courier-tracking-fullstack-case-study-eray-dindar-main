package com.example.courier_tracking_backend.service.strategy;

/**
 * Strategy Pattern: Interface for distance calculation between two coordinates.
 */
public interface DistanceStrategy {
    /**
     * Calculate distance between two geographic points.
     *
     * @return distance in meters
     */
    double calculate(double lat1, double lng1, double lat2, double lng2);
}

