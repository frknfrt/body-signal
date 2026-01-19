package com.bodysignal.api.dto;

import com.bodysignal.api.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Optional;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private Optional<User> user;
}
