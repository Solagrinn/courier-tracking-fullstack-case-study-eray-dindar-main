package com.example.courier_tracking_backend.model.dto;

import lombok.Data;

@Data
public class CourierEntranceFiltersDTO {
    private String courierId;
    private String courierName;
    private String lastEnteredStoreName;
}

