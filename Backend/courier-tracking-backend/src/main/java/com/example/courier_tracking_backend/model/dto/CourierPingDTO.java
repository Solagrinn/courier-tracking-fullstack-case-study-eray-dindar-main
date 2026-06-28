package com.example.courier_tracking_backend.model.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class CourierPingDTO {
    private String courierId;
    private Double lat;
    private Double lng;
    private LocalDateTime timestamp;
}
