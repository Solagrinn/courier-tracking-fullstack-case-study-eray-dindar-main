package com.example.courier_tracking_backend.model.dto;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StoreEntranceFiltersDTO {

    private String storeName;
    private String courierName;
    private LocalDateTime start;
    private LocalDateTime end;
}
