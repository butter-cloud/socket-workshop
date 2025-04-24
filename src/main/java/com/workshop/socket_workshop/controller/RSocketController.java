package com.workshop.socket_workshop.controller;

import com.workshop.socket_workshop.service.SseService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.rsocket.RSocketRequester;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
public class RSocketController {

    private final RSocketRequester.Builder builder;
    private final SseService sseService;

    @GetMapping("/greet")
    public Mono<String> greet (@RequestParam String username) {
        RSocketRequester requester = builder
                .tcp("localhost", 7000);

        return requester
                .route("greet")
                .data(username)
                .retrieveMono(String.class);            // 서버에서 응답이 올 때까지 대기 후 응답 결과를 Mono<String> 으로 반환
    }

    @GetMapping("/greet-stream")
    public Flux<String> greetStream (@RequestParam String username) {
        RSocketRequester requester = builder.tcp("localhost", 7000);

        return requester
                .route("greet-stream")
                .data(username)
                .retrieveFlux(String.class)
                .doOnNext(message -> sseService.sendMessage(username, message, "stream"));
    }
}