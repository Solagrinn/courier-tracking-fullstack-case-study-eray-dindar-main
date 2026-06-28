package com.example.courier_tracking_backend.service;

import com.example.courier_tracking_backend.model.dto.*;
import com.example.courier_tracking_backend.model.entity.Courier;
import com.example.courier_tracking_backend.model.entity.Store;
import com.example.courier_tracking_backend.repository.CourierRepository;
import com.example.courier_tracking_backend.repository.specification.CourierSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourierInfoService {
    private final CourierRepository courierRepository;

    @Transactional(readOnly = true)
    public CourierInfoDTO getCourierInfo(String courierId) {
        Courier courier = courierRepository.findByCourierId(courierId);

        if (courier == null) {
            throw new RuntimeException("Courier not found with id: " + courierId);
        }

        return mapToDTO(courier);
    }

    @Transactional(readOnly = true)
    public List<CourierInfoDTO> getAllCouriers() {
        return courierRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CourierLastEntranceDTO> getFilteredCourierEntrances(CourierEntranceFiltersDTO filters) {
        return courierRepository.findAll(CourierSpecification.filterEntrances(filters))
                .stream()
                .map(this::mapToEntranceDTO)
                .toList();
    }


    private CourierLastEntranceDTO mapToEntranceDTO(Courier courier) {
        Store store = courier.getLastEnteredStore();
        return CourierLastEntranceDTO.builder()
                .courierId(courier.getCourierId())
                .name(courier.getName())
                .lastEnteredStoreId(store != null ? store.getStoreId() : null)
                .lastEnteredStoreName(store != null ? store.getName() : null)
                .totalDistance(getRoundedDistance(courier.getTotalDistance()))
                .build();
    }

    private CourierInfoDTO mapToDTO(Courier courier) {
        Store store = courier.getLastEnteredStore();
        return CourierInfoDTO.builder()
                .courierId(courier.getCourierId())
                .name(courier.getName())
                .vehicleType(courier.getVehicleType())
                .lastLat(courier.getLastLat())
                .lastLng(courier.getLastLng())
                .lastUpdated(courier.getLastUpdated())
                .status(courier.getStatus())
                .totalDistance(getRoundedDistance(courier.getTotalDistance()))
                .lastEnteredStoreId(store != null ? store.getStoreId() : null)
                .lastEnteredStoreName(store != null ? store.getName() : null)
                .build();
    }

    private double getRoundedDistance(double totalDistance) {
        return Math.round((totalDistance / 1000.0) * 10.0) / 10.0;
    }
}
