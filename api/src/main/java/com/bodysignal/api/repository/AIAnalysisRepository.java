package com.bodysignal.api.repository;

import com.bodysignal.api.domain.AIAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AIAnalysisRepository
        extends JpaRepository<AIAnalysis, Long> {

    Optional<AIAnalysis> findByDailyRecordId(Long id);
    Optional<AIAnalysis> findByDailyRecordIdAndUserEmail(
            Long id,
            String email
    );
}