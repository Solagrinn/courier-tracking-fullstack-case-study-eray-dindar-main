package com.example.courier_tracking_backend.controller;


import com.example.courier_tracking_backend.model.dto.StoreDTO;
import com.example.courier_tracking_backend.model.dto.StoreEntranceFiltersDTO;
import com.example.courier_tracking_backend.model.dto.StoreEntranceLogDTO;
import com.example.courier_tracking_backend.service.StoreEntranceLogService;
import com.example.courier_tracking_backend.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/stores")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StoreController {
    private final StoreService storeService;
    private final StoreEntranceLogService logService;

    @GetMapping
    public ResponseEntity<List<StoreDTO>> getAllStores() {
        return ResponseEntity.ok(storeService.getAllStores());
    }

    @GetMapping("/logs")
    public ResponseEntity<List<StoreEntranceLogDTO>> getLogs(StoreEntranceFiltersDTO filters) {

        List<StoreEntranceLogDTO> logs = logService.getFilteredLogs(filters);
        return ResponseEntity.ok(logs);
    }

}
