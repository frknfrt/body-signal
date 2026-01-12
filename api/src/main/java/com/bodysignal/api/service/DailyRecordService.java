package com.bodysignal.api.service;

import com.bodysignal.api.domain.DailyRecord;
import com.bodysignal.api.domain.Exercise;
import com.bodysignal.api.domain.User;
import com.bodysignal.api.domain.Workout;
import com.bodysignal.api.dto.DailyRecordDto;
import com.bodysignal.api.repository.DailyRecordRepository;
import com.bodysignal.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DailyRecordService {

    private final DailyRecordRepository dailyRecordRepository;
    private final UserRepository userRepository;
    private final AIAnalysisService aiAnalysisService;


    public void createDailyRecord(
            DailyRecordDto request,
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow();

        Workout workout = new Workout();

        List<Exercise> exerciseList = request.getWorkout()
                .getExercises()
                .stream()
                .map(req -> {
                    Exercise e = new Exercise();
                    e.setName(req.getName());
                    e.setWeight(req.getWeight());
                    e.setRepCount(req.getRepCount());
                    e.setLastSetRpe(req.getLastSetRpe());
                    e.setWorkout(workout);
                    return e;
                }).toList();

        workout.setExercises(exerciseList);
        workout.setUser(user);

        DailyRecord record = new DailyRecord();
        record.setRecordDate(request.getRecordDate());
        record.setSleepTime(request.getSleepTime());
        record.setWakeUpTime(request.getWakeUpTime());
        record.setMorningWeight(request.getMorningWeight());
        record.setWorkout(workout);
        record.setUser(user);

        dailyRecordRepository.save(record);
        aiAnalysisService.analyzeAndSave(
                record,
                email
        );
    }
}
