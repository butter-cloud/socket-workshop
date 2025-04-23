package com.workshop.socket_workshop.controller;

import com.workshop.socket_workshop.service.SseService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@RestController
public class SseController {

    private final SseService sseService;

    public SseController(SseService sseService) {
        this.sseService = sseService;
    }

    @GetMapping(value ="/sse/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(HttpServletResponse response, @RequestParam String username) {
        log.info("SSE Subscribe request - userName: {}", username);

        response.setContentType("text/event-stream");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Connection", "keep-alive");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("X-Accel-Buffering", "no");

        return sseService.subscribe(username);
    }
}
