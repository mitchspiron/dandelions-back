import { Server } from 'socket.io';
export declare class SocketEvents {
    server: Server;
    handleEventComment(): void;
    handleEventNotification(): void;
}
