import {ApiResponse} from './base.response';
import {ChatRoom} from '../domain';

export class CreateChatRoomResponse extends ApiResponse {

  public readonly chatRoom: ChatRoom;

  public constructor(data: CreateChatRoomResponse) {
    super(data);
    this.chatRoom = data?. chatRoom ? ChatRoom.of(data.chatRoom) : ChatRoom.empty();
  }
}
