import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.URL_FRONT,
    methods: ['GET', 'POST'],
  },
  path: '/socket/',
})
export class SocketEvents {
  @WebSocketServer()
  server: Server;

  /*  @SubscribeMessage('test')
  test() {
    console.log('Salut à toi');
    this.server.emit('arrival-test');
  } */

  @SubscribeMessage('change-comment')
  handleEventComment() {
    this.server.emit('arrival-comment');
  }

  @SubscribeMessage('send-notif')
  handleEventNotification() {
    this.server.emit('arrival-notif');
  }
}
