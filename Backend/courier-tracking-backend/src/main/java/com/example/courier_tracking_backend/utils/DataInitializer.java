package com.example.courier_tracking_backend.utils;

import com.example.courier_tracking_backend.utils.route_simulation.SimulationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final SimulationUtil simulationUtil;

    @EventListener(ApplicationReadyEvent.class)
    public void init() {
        simulationUtil.runSimulation();
    }
}