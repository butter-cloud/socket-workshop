package com.workshop.socket_workshop.handler;

import com.workshop.socket_workshop.SocketWorkshopApplication;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class ChatHandler extends TextWebSocketHandler {

    private final SocketWorkshopApplication application;

}
