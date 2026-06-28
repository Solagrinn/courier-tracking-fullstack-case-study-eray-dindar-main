package com.example.courier_tracking_backend.repository;

import com.example.courier_tracking_backend.model.entity.Breadcrumb;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BreadcrumbRepository extends JpaRepository<Breadcrumb, Long> {

    List<Breadcrumb> findByCourier_CourierIdOrderByTimestampDesc(String courierId, Pageable pageable);

    // Find 100 records where the ID is LESS THAN the one the user is currently looking at
    @Query("SELECT b FROM Breadcrumb b WHERE b.courier.courierId = :courierId AND b.id < :lastId ORDER BY b.id DESC")
    List<Breadcrumb> findOlderThan(@Param("courierId") String courierId, @Param("lastId") Long lastId, Pageable pageable);
}
