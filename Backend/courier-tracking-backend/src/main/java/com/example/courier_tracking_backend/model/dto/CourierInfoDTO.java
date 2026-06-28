package com.example.courier_tracking_backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourierInfoDTO {
    private String courierId;
    private String name;
    private String vehicleType;
    private Double lastLat;
    private Double lastLng;
    private LocalDateTime lastUpdated;
    private Double totalDistance;
    private String status; // e.g., "MOVING", "STALLING"
    private Long lastEnteredStoreId;
    private String lastEnteredStoreName;
}