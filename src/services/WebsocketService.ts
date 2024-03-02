// src/services/stompService.ts
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BACKEND_BASE_URL } from '../config';
export class StompService {
    private client: Client;

    constructor() {
        this.client = new Client({
        webSocketFactory: () => new SockJS(`${BACKEND_BASE_URL}/note-auto-save`),
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('Connected to STOMP');
            },
            onDisconnect: () => {
                console.log('Disconnected from STOMP');
            },
            onWebSocketError: (err) => {
                console.error('WebSocket connection error:', err);
                // Handle WebSocket connection errors here
            },
        });
    }

    connect() {
        this.client.activate();
    }

    disconnect() {
        this.client.deactivate();
    }

    saveNote(content: string, noteId: string) {
        if (this.client.active) {
            console.log('Saving note');
            this.client.publish({
                destination: `/app/notes/${noteId}/auto-save`,
                body: content,
            });
        } else {
            console.error('STOMP client is not connected');
        }
    }

    send(destination: string, body: string) {
        if (this.client.active) {
            console.log('Sending message: ', body);
            console.log('Destination: ', destination);
            this.client.publish({ destination, body });
        } else {
            console.error('STOMP client is not connected');
        }
    }

    isActive() {
        return this.client.active;
    }
}