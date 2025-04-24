package com.workshop.socket_workshop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.rsocket.RSocketRequester;

@Configuration
public class RSocketClientConfig {

    @Bean
    public RSocketRequester.Builder rSocketRequester() {
        return RSocketRequester.builder();              // lazy injection으로 필요할 때 주입
    }
}
