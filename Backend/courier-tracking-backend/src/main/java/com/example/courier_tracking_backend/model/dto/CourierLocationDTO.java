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
public class CourierLocationDTO {
    private String courierId;
    private Double lat;
    private Double lng;
    private LocalDateTime timestamp;
    private boolean isInStore;
}
