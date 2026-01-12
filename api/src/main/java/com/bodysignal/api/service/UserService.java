package com.bodysignal.api.service;

import com.bodysignal.api.dto.RegisterRequest;

public interface UserService {
    void register(RegisterRequest request);
}
