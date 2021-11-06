import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';

const clients = [];

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args): any {
    console.log(clients);
  }

  @SubscribeMessage('join')
  joinRoomHandler(@ConnectedSocket() client: Socket, @MessageBody() room) {
    client.join(room);
  }

  @SubscribeMessage('message')
  messageHandler(@ConnectedSocket() client: Socket, @MessageBody() data: { message: string, room: string }) {
    console.log('Message', data);
    this.server.to(data.room).emit('message', data.message);
  }
}

