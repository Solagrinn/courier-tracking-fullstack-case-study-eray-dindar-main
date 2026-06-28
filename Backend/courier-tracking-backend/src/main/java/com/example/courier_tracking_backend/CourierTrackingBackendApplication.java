package com.example.courier_tracking_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class CourierTrackingBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CourierTrackingBackendApplication.class, args);
	}

}
