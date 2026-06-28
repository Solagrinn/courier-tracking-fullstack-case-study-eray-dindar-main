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
public class StoreEntranceLogDTO {
    private Long id;
    private String courierId;
    private String courierName;
    private Long storeId;
    private String storeName;
    private LocalDateTime entranceDate;
}

