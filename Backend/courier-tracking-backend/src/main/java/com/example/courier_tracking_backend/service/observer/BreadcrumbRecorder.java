package com.example.courier_tracking_backend.service.observer;

import com.example.courier_tracking_backend.model.dto.CourierPingDTO;
import com.example.courier_tracking_backend.model.entity.Breadcrumb;
import com.example.courier_tracking_backend.model.entity.Courier;
import com.example.courier_tracking_backend.repository.BreadcrumbRepository;
import com.example.courier_tracking_backend.repository.CourierRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;


@Component
@RequiredArgsConstructor
@Slf4j
public class BreadcrumbRecorder implements LocationObserver {
    private final BreadcrumbRepository breadcrumbRepository;
    private final CourierRepository courierRepository;

    @Override
    @Transactional
    public void onLocationUpdate(CourierPingDTO request) {
        Courier courier = courierRepository.findByCourierId(request.getCourierId());

        Breadcrumb breadcrumb = Breadcrumb.builder()
                .courier(courier)
                .lat(request.getLat())
                .lng(request.getLng())
                .timestamp(request.getTimestamp())
                .build();
        breadcrumbRepository.save(breadcrumb);
    }

}
