package com.example.courier_tracking_backend.repository.specification;

import com.example.courier_tracking_backend.model.dto.CourierEntranceFiltersDTO;
import com.example.courier_tracking_backend.model.entity.Courier;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class CourierSpecification {

    public static Specification<Courier> filterEntrances(CourierEntranceFiltersDTO f) {
        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (f.getCourierId() != null && !f.getCourierId().isEmpty()) {
                predicates.add(
                        cb.like(cb.lower(root.get("courierId")), "%" + f.getCourierId().toLowerCase() + "%")
                );
            }

            if (f.getCourierName() != null && !f.getCourierName().isEmpty()) {
                predicates.add(
                        cb.like(cb.lower(root.get("name")), "%" + f.getCourierName().toLowerCase() + "%")
                );
            }

            if (f.getLastEnteredStoreName() != null && !f.getLastEnteredStoreName().isEmpty()) {
                predicates.add(
                        cb.like(cb.lower(root.get("lastEnteredStore").get("name")),
                                "%" + f.getLastEnteredStoreName().toLowerCase() + "%")
                );
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}

