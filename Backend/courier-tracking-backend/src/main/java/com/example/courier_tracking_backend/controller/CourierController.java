package com.example.courier_tracking_backend.controller;

import com.example.courier_tracking_backend.model.dto.*;
import com.example.courier_tracking_backend.service.CourierInfoService;
import com.example.courier_tracking_backend.service.CourierLocationService;
import com.example.courier_tracking_backend.service.StoreEntranceLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/couriers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CourierController {

    private final CourierLocationService courierLocationService;
    private final CourierInfoService courierInfoService;
    private final StoreEntranceLogService storeEntranceLogService;

    /**
     * Receive a streaming courier location ping.
     * POST /api/couriers/locations
     */
    @PostMapping("/locations")
    public ResponseEntity<Map<String, String>> receiveLocation(@RequestBody CourierPingDTO request) {
        courierLocationService.processLocationUpdate(request);
        return ResponseEntity.ok(Map.of("status", "ok", "courierId", request.getCourierId()));
    }

    /**
     * Get real-time current locations from ConcurrentHashMap.
     * GET /api/couriers/locations/current
     */
    @GetMapping("/locations/current")
    public ResponseEntity<Collection<CourierLocationDTO>> getCurrentLocations() {
        return ResponseEntity.ok(courierLocationService.getCurrentLocations());
    }


    @GetMapping("/{courierId}/history")
    public ResponseEntity<List<BreadcrumbHistoryDTO>> getCourierHistory(
            @PathVariable String courierId,
            @RequestParam(required = false) Long lastSeenId) {

        return ResponseEntity.ok(courierLocationService.getBreadcrumbsHistory(courierId, lastSeenId));
    }

    @GetMapping("/{courierId}/info")
    public ResponseEntity<CourierInfoDTO> getCourierInfo(
            @PathVariable String courierId) {

        return ResponseEntity.ok(courierInfoService.getCourierInfo(courierId));
    }


    @GetMapping("/{courierId}/store-entrance-logs")
    public ResponseEntity<List<StoreEntranceLogDTO>> getLogsByCourierId(@PathVariable String courierId) {

        List<StoreEntranceLogDTO> logs = storeEntranceLogService.getStoreEntranceLogsByCourierId(courierId);
        return ResponseEntity.ok(logs);
    }


    @GetMapping
    public ResponseEntity<List<CourierInfoDTO>> getAllCouriers() {
        return ResponseEntity.ok(courierInfoService.getAllCouriers());
    }

    @GetMapping("/entrances")
    public ResponseEntity<List<CourierLastEntranceDTO>> getAllCourierLastEntrances(CourierEntranceFiltersDTO filters) {
        return ResponseEntity.ok(courierInfoService.getFilteredCourierEntrances(filters));
    }
}
