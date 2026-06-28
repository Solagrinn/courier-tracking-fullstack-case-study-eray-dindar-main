package com.example.courier_tracking_backend.repository;

import com.example.courier_tracking_backend.model.entity.Courier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CourierRepository extends JpaRepository<Courier, Long>, JpaSpecificationExecutor<Courier> {
    Courier findByCourierId(String courierId);
}

