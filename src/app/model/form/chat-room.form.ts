import {AbstractControl, FormBuilder} from '@angular/forms';
import {ChatRoom} from '../domain';
import {ChatRoomVisibility} from '../../constant';
import {BaseForm} from './base.form';
import {CreateChatRoomPayload} from '../type';
import {maxLength, minLength, oneOf, required} from '../../shared';

export class ChatRoomForm extends BaseForm<CreateChatRoomPayload> {

  private constructor(
    private formBuilder: FormBuilder,
    private chatRoom: ChatRoom) {
    super();
  }

  public get title(): AbstractControl | null | undefined {
    return this.control('title');
  }

  public get description(): AbstractControl | null | undefined {
    return this.control('description');
  }

  public get guidelines(): AbstractControl | null | undefined {
    return this.control('guidelinesOrRules');
  }

  public get tags(): AbstractControl | null | undefined {
    return this.control('tags');
  }

  public get visibility(): AbstractControl | null | undefined {
    return this.control('visibility');
  }

  public get visibilities(): string[] {
    return Object.values(ChatRoomVisibility);
  }

  protected override initForm(): void {
    this.formGroup = this.formBuilder.group({
      title: [this.chatRoom.title, [
        required,
        minLength(10),
        maxLength(500),
      ]],

      description: [this.chatRoom.description, [
        required,
        maxLength(1000),
      ]],

      tags: [this.chatRoom.tags, [
        required,
        minLength(10),
        maxLength(500),
      ]],

      guidelinesOrRules: [this.chatRoom.guidelinesOrRules, [
        required,
        maxLength(1500),
      ]],

      visibility: [this.chatRoom.visibility, [
        required,
        oneOf(ChatRoomVisibility)
      ]],

    });
  }



  public static of(formBuilder: FormBuilder, chatRoom: ChatRoom): ChatRoomForm {
    const chatRoomForm: ChatRoomForm = new ChatRoomForm(formBuilder, chatRoom);
    chatRoomForm.initForm();

    return chatRoomForm;
  }

  public static empty(formBuilder: FormBuilder): ChatRoomForm {
    return new ChatRoomForm(formBuilder, ChatRoom.empty());
  }
}
