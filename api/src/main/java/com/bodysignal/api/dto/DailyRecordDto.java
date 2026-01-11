package com.bodysignal.api.dto;

import com.bodysignal.api.domain.Workout;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class DailyRecord {

    private LocalDate recordDate;

    private LocalTime sleepTime;
    private LocalTime wakeUpTime;

    private Double morningWeight;

    private Workout workout;
}