package com.workshop.socket_workshop.model;

import lombok.Data;

@Data
public class MessageRequest {
    private String sender;
    private String recipient;
    private String message;
}
