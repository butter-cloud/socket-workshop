package com.workshop.socket_workshop.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
public class SseService {
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private static final Long SSE_TIMEOUT = 10L * 60 * 1000; // SSE 타임아웃 10분
    private static final Long RETRY_TIME = 1L * 300;   // 재연결시간 0.3초

    public SseEmitter subscribe(String emitterKey) {
        // emitter 생성
        SseEmitter emitter = new SseEmitter(SSE_TIMEOUT);

        try {
            emitter.send(SseEmitter.event()
                    .reconnectTime(RETRY_TIME)
                    .name("connect")
                    .data("Connected! Your emitterKey: " + emitterKey));

            emitter.send(SseEmitter.event()
                    .name("connect")
                    .reconnectTime(RETRY_TIME)
                    .data(emitterKey + "님 연결되었습니다"));
        } catch (IOException e) {
            log.error("Failed to send initial message", e);
        }

        // callback
        setupEmitterCallbacks(emitter, emitterKey);

        emitters.put(emitterKey, emitter);
        return emitter;
    }

    // eventType 입력 없으면 기본값으로 "message" 설정
    public void sendMessage(String emitterKey, String message) {
        sendMessage(emitterKey, message, "message");
    }

    // eventType 입력 시
    public void sendMessage(String emitterKey, String message, String eventType) {
        Optional.ofNullable(emitters.get(emitterKey))
                .ifPresent(emitter -> {
                    try {
                        String finalEventType = (eventType == null || eventType.isBlank()) ? "message" : eventType;
                        emitter.send(SseEmitter.event()
                                .name(finalEventType)
                                .data(message)
                        );
                    } catch (IOException e) {
                        log.error("Failed to send initial message", e);
                        emitter.complete();
                    }
                });
    }

    private void setupEmitterCallbacks(SseEmitter emitter, String emitterKey) {
        emitter.onCompletion(() -> {
            log.info("SSE Connection completed. emitterKey={}", emitterKey);
            removeEmitter(emitterKey);
        });

        emitter.onTimeout(() -> {
            log.info("SSE Connection timeout. emitterKey={}", emitterKey);
            emitter.complete();
        });

        emitter.onError(ex -> {
            log.error("SSE Connection error. emitterKey={}", emitterKey, ex);
            emitter.complete();
        });
    }

    public void removeEmitter(String emitterKey) {
        SseEmitter emitter = emitters.get(emitterKey);
        if (emitter != null) {
            try {
                emitter.complete(); // SSE 연결 정상 종료
            } catch (Exception e) {
                log.info("Failed to complete emitter. emitterKey={}", emitterKey, e);
            } finally {
                emitters.remove(emitterKey); // 맵에서 제거
                log.info("Emitter removed. emitterKey={}", emitterKey);
            }
        }
    }
}
