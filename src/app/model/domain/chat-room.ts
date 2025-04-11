import {ChatRoomVisibility} from '../../constant';

export class ChatRoom {
  public readonly id: number | string;
  public readonly title: string;
  public readonly description: string;
  public readonly tags: string;
  public readonly guidelinesOrRules: string;
  public readonly visibility: ChatRoomVisibility;

  public constructor(data: ChatRoom) {
    this.id = data.id ?? 0;
    this.title = data.title ?? '';
    this.description = data.description ?? '';
    this.tags = data.tags ?? '';
    this.guidelinesOrRules = data.guidelinesOrRules ?? '';
    this.visibility = data.visibility ?? '';
  }

  public static of(data: ChatRoom): ChatRoom {
    return new ChatRoom(data);
  }

  public static empty(): ChatRoom {
    return new ChatRoom({} as ChatRoom);
  }
}
