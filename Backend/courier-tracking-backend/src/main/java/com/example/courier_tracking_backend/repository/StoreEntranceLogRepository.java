package com.example.courier_tracking_backend.repository;

import com.example.courier_tracking_backend.model.entity.StoreEntranceLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreEntranceLogRepository
        extends JpaRepository<StoreEntranceLog, Long>,
        JpaSpecificationExecutor<StoreEntranceLog> {

    // Used for "re-entry prevention"
    Optional<StoreEntranceLog> findTopByCourier_CourierIdAndStore_StoreIdOrderByEntranceDateDesc(String courierId, Long storeId);

    List<StoreEntranceLog> findAllByCourier_CourierIdOrderByEntranceDateDesc(String courierId);
}
