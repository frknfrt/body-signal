package com.bodysignal.api.controller;

import com.bodysignal.api.domain.AIAnalysis;
import com.bodysignal.api.dto.AIAnalysisResponseDto;
import com.bodysignal.api.service.AIAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/analysis")
@RequiredArgsConstructor
public class AIAnalysisController {

    private final AIAnalysisService aiAnalysisService;

    /**
     * Daily record için AI analiz sonucu getir
     */
    @GetMapping("/{recordId}")
    public ResponseEntity<AIAnalysisResponseDto> getAnalysis(
            @PathVariable Long recordId,
            Principal principal) {

        AIAnalysis analysis =
                aiAnalysisService.getByRecordId(
                        recordId,
                        principal.getName()
                );

        return ResponseEntity.ok(mapToDto(analysis));
    }

    private AIAnalysisResponseDto mapToDto(
            AIAnalysis a) {

        AIAnalysisResponseDto dto =
                new AIAnalysisResponseDto();

        dto.setId(a.getId());
        dto.setDailyRecordId(
                a.getDailyRecord().getId()
        );
        dto.setAnalysisText(a.getAnalysisText());
        dto.setRecoveryScore(a.getRecoveryScore());
        dto.setCreatedAt(a.getCreatedAt());

        return dto;
    }
}
