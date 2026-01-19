package com.bodysignal.api.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AIAnalysisResponseDto {

    private Long id;
    private Long dailyRecordId;

    private String analysisText;
    private Double recoveryScore;
    private String analysisTitle;

    private LocalDateTime createdAt;
}
