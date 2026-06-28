package com.example.courier_tracking_backend.service;

import com.example.courier_tracking_backend.model.dto.StoreEntranceFiltersDTO;
import com.example.courier_tracking_backend.model.dto.StoreEntranceLogDTO;
import com.example.courier_tracking_backend.model.entity.StoreEntranceLog;
import com.example.courier_tracking_backend.repository.StoreEntranceLogRepository;
import com.example.courier_tracking_backend.repository.specification.StoreEntranceLogSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StoreEntranceLogService {

    private final StoreEntranceLogRepository storeEntranceLogRepository;

    @Transactional(readOnly = true)
    public List<StoreEntranceLogDTO> getFilteredLogs(StoreEntranceFiltersDTO filters) {
        List<StoreEntranceLog> logs = storeEntranceLogRepository.findAll(
                StoreEntranceLogSpecification.filter(filters),
                Sort.by(Sort.Direction.DESC, "entranceDate")
        );

        return logs.stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<StoreEntranceLogDTO> getStoreEntranceLogsByCourierId(String courierId){
        List<StoreEntranceLog> storeEntranceLogs =
                storeEntranceLogRepository.findAllByCourier_CourierIdOrderByEntranceDateDesc(courierId);

        return storeEntranceLogs.stream().map(storeEntranceLog -> StoreEntranceLogDTO.builder()
                .id(storeEntranceLog.getId())
                .storeId(storeEntranceLog.getStore().getStoreId())
                .storeName(storeEntranceLog.getStore().getName())
                .entranceDate(storeEntranceLog.getEntranceDate())
                .build()
        ).toList();
    }

    private StoreEntranceLogDTO mapToDTO(StoreEntranceLog log) {
        return StoreEntranceLogDTO.builder()
                .id(log.getId())
                .courierId(log.getCourier().getCourierId())
                .courierName(log.getCourier().getName())
                .storeId(log.getStore().getStoreId())
                .storeName(log.getStore().getName())
                .entranceDate(log.getEntranceDate())
                .build();
    }
}

