package com.workshop.socket_workshop.model;

import lombok.Data;

@Data
public class ChatMessage {
    private String sender;
    private String content;
}
