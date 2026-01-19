package com.bodysignal.api.service;

import com.bodysignal.api.domain.DailyRecord;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AIClient {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    private final String apiUrl =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";


    public String getAnalysis(DailyRecord record) {

        String prompt = String.format(
                "Sen dünya çapında bir performans koçusun. Sporcunun verilerini analiz et:\n" +
                        "- Vücut Ağırlığı: %s kg\n" +
                        "- Yatış Saati: %s saat\n" +
                        "- Uyanış Saati: %s saat\n"+
                        "- Antrenman Detayları: %s\n\n" +
                        "GÖREV: Sporcunun toparlanma durumunu ve antrenman şiddetini (RPE) değerlendir.(lastSetRpe değeri o hareketin RPE değeridir) " +
                        "Eğer RPE 9-10 ise ve uyku düşükse uyar. Eğer her şey yolundaysa motive et. " +
                        "Yanıtın maksimum 3 cümle, sert ama yapıcı bir koç ağzıyla olsun.",
                record.getMorningWeight(),
                record.getSleepTime(),
                record.getWakeUpTime(),
                record.getWorkout().getExercises()
        );

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(requestBody, headers);

        try {
            Map<String, Object> response =
                    restTemplate.postForObject(apiUrl + "?key=" + apiKey, entity, Map.class);

            List candidates = (List) response.get("candidates");
            Map firstCandidate = (Map) candidates.get(0);
            Map content = (Map) firstCandidate.get("content");
            List parts = (List) content.get("parts");
            Map firstPart = (Map) parts.get(0);

            return (String) firstPart.get("text");

        } catch (Exception e) {
            e.printStackTrace();
            return "Analiz şu an yapılamıyor, ancak verilerin güvende. Antrenmana odaklan!";
        }
    }
}
