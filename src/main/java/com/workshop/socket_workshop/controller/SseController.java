package com.workshop.socket_workshop.controller;

import com.workshop.socket_workshop.model.MessageRequest;
import com.workshop.socket_workshop.service.SseService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class SseController {

    private final SseService sseService;

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

    @PostMapping(value = "/sse/send")
    public ResponseEntity<Map<String, Boolean>> sendMessage(@RequestBody MessageRequest messageRequest) {
        log.info("SSE message request - recipient: {}, sender: {}, message: {}", messageRequest.getRecipient(), messageRequest.getSender(), messageRequest.getMessage());
        try {
            sseService.sendMessage(messageRequest.getRecipient(), messageRequest.getMessage());
            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false));
        }
    }
}
