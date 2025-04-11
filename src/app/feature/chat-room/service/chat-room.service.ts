import {Injectable} from '@angular/core';
import {CreateChatRoomPayload} from '../../../model/type';
import {Observable, of} from 'rxjs';
import {CreateChatRoomResponse} from '../../../model/response';
import {ChatRoom} from '../../../model';
import {ChatRoomVisibility} from '../../../constant';

@Injectable()
export class ChatRoomService {

  public constructor() {
  }

  protected get basePath(): string {
    return 'chat-room'
  }

  public create(body: CreateChatRoomPayload): Observable<CreateChatRoomResponse> {
    const chatRoom: ChatRoom = new ChatRoom({
      id: 1,
      title: body.title,
      description: body.description,
      tags: body.tags,
      guidelinesOrRules: body.guidelinesOrRules,
      visibility: body.visibility as ChatRoomVisibility,
    });

    const createChatRoomResponse = new CreateChatRoomResponse({
      message: 'Chat Room created successfully',
      chatRoom: chatRoom,
      createdOn: new Date(),
      updatedOn: new Date()
    });

    return of(createChatRoomResponse);
  }
}
