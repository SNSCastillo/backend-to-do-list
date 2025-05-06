import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { RegistroPersonalizado } from '../common/utils/logger.utils'
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class TareasGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly loggerGateway = new RegistroPersonalizado();
  private readonly logger = new Logger("Gateway Tareas");

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log('Socket.io inicializado');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  emitirTareasObtenidas(tareas: any[], user: UserActiveInterface) {
    this.server.emit('tareasObtenidas', tareas);
    this.loggerGateway.log(`Tareas obtenidas por: ${user.email}. Total: ${tareas.length}`);
    this.logger.log(`Tareas obtenidas por: ${user.email}. Total: ${tareas.length}`);
  }

  emitirNuevaTarea(tarea: any, user: UserActiveInterface) {
    this.server.emit('tareaCreada', tarea);
    this.loggerGateway.log(`Nueva tarea creada por: ${user.email}. ID: ${tarea.id}`);
    this.logger.log(`Nueva tarea creada por: ${user.email}. ID: ${tarea.id}`);
  }

  emitirTareaActualizada(tarea, user: UserActiveInterface) {
    this.server.emit('tareaActualizada', tarea);
    this.loggerGateway.log(`Tarea ${tarea} actualizada por: ${user.email}.`);
    this.logger.log(`Tarea ${tarea} actualizada por: ${user.email}.`);
  }

  emitirTareaTerminada(tarea, user: UserActiveInterface) {
    this.server.emit('tareaTerminada', tarea);
    this.loggerGateway.log(`Tarea ${tarea} terminada por: ${user.email}.`);
    this.logger.log(`Tarea ${tarea} terminadaa por: ${user.email}.`);
  }

  emitirTareaEliminada(id: number, user: UserActiveInterface) {
    this.server.emit('tareaEliminada', { id });
    this.loggerGateway.log(`Tarea con ID ${id} eliminada por: ${user.email}`);
    this.logger.log(`Tarea con ID: ${id} eliminada por: ${user.email}`);
  }
}
