package com.bodysignal.api.dto;

import com.bodysignal.api.domain.Exercise;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Workout {

    private List<Exercise> exercises;
}
