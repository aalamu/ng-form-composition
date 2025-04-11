import {ChatRoomVisibility} from '../../constant';

export type CreateChatRoomPayload = {
  title: string;
  description: string;
  guidelinesOrRules: string;
  tags: string;
  visibility: ChatRoomVisibility | string;
}
