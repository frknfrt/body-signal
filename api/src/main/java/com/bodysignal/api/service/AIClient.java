package com.bodysignal.api.service;

import com.bodysignal.api.domain.DailyRecord;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class AIClient {

    private final RestTemplate restTemplate;

    public String getAnalysis(DailyRecord record) {

        String url = "https://api.ai-provider.com/analyze";

        return restTemplate.postForObject(
                url,
                record,
                String.class
        );
    }
}
