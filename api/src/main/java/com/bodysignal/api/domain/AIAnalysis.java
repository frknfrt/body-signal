package com.bodysignal.api.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "ai_analysis")
@Getter
@Setter
public class AIAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    @OneToOne
    private DailyRecord dailyRecord;

    @Column(length = 5000)
    private String analysisText;

    private String analysisTitle;
    private Double recoveryScore; // 0-100 gibi

    private LocalDateTime createdAt;
}
