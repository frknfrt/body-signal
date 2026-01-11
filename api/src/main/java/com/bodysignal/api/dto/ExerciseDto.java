package com.bodysignal.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Exercise {

    private String name;
    private Double weight;
    private Integer setCount;
    private Integer repCount;
    private Integer lastSetRpe;
}