package com.example.courier_tracking_backend.service;

import com.example.courier_tracking_backend.model.dto.StoreDTO;
import com.example.courier_tracking_backend.model.entity.Store;
import com.example.courier_tracking_backend.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StoreService {

    private final StoreRepository storeRepository;

    public List<StoreDTO> getAllStores() {
        List<Store> stores = storeRepository.findAll();

        return stores.stream()
                .map(store -> StoreDTO.builder().storeId(store.getStoreId()).name(store.getName()).lat(store.getLat()).lng(store.getLng()).build())
                .toList();
    }
}
