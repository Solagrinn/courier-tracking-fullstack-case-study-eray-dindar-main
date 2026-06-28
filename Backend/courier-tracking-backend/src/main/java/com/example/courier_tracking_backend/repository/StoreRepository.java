package com.example.courier_tracking_backend.repository;

import com.example.courier_tracking_backend.model.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
    Store findByStoreId(Long storeId);
    List<Store> findAll();
}
