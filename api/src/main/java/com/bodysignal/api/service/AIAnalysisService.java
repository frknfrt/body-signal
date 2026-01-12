package com.bodysignal.api.service;

import com.bodysignal.api.domain.AIAnalysis;
import com.bodysignal.api.domain.DailyRecord;
import com.bodysignal.api.repository.AIAnalysisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AIAnalysisService {

    private final AIClient aiClient;
    private final AIAnalysisRepository repository;

    public void analyzeAndSave(
            DailyRecord record,
            String email) {

        String aiResponse =
                aiClient.getAnalysis(record);

        AIAnalysis analysis = new AIAnalysis();
        analysis.setUserEmail(email);
        analysis.setDailyRecord(record);
        analysis.setAnalysisText(aiResponse);
        analysis.setCreatedAt(LocalDateTime.now());

        repository.save(analysis);
    }

    public AIAnalysis getByRecordId(
            Long recordId,
            String email) {

        return repository
                .findByDailyRecordIdAndUserEmail(recordId, email)
                .orElseThrow(() ->
                        new RuntimeException("Analiz bulunamadı"));
    }

    private Double parseScore(String text) {
        return 75.0; // demo (sonra AI parsing yapılır)
    }
}
