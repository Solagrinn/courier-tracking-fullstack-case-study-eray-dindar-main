package com.example.courier_tracking_backend.repository.specification;

import com.example.courier_tracking_backend.model.dto.StoreEntranceFiltersDTO;
import com.example.courier_tracking_backend.model.entity.StoreEntranceLog;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class StoreEntranceLogSpecification {

    public static Specification<StoreEntranceLog> filter(StoreEntranceFiltersDTO f) {
        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (f.getStoreName() != null && !f.getStoreName().isEmpty()) {
                predicates.add(
                        cb.like(cb.lower(root.get("store").get("name")), "%" + f.getStoreName().toLowerCase() + "%")
                );
            }

            if (f.getCourierName() != null && !f.getCourierName().isEmpty()) {
                predicates.add(
                        cb.like(cb.lower(root.get("courier").get("name")), "%" + f.getCourierName().toLowerCase() + "%")
                );
            }

            if (f.getStart() != null && f.getEnd() != null) {
                predicates.add(cb.between(root.get("entranceDate"), f.getStart(), f.getEnd()));
            } else if (f.getStart() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("entranceDate"), f.getStart()));
            } else if (f.getEnd() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("entranceDate"), f.getEnd()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
