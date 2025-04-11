import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {BaseComponent} from '../../../../shared';
import {ChatRoom, ChatRoomForm, HasForm} from '../../../../model';
import {CreateChatRoomPayload} from '../../../../model/type';
import {CreateChatRoomResponse, ErrorResponse} from '../../../../model/response';
import {ChatRoomService} from '../../service/chat-room.service';
import {faCheck, faPlus, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {TitleCasePipe} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-create-chat-room',
  imports: [
    ReactiveFormsModule,
    TitleCasePipe,
    FaIconComponent,

  ],
  providers: [
    ChatRoomService,
  ],
  templateUrl: './create-chat-room.html',
  styleUrl: './create-chat-room.css'
})
export class CreateChatRoom extends BaseComponent implements OnInit, HasForm {

  protected readonly chatRoomService: ChatRoomService = inject(ChatRoomService);
  protected readonly formBuilder: FormBuilder = inject(FormBuilder);

  protected readonly chatRoomForm: WritableSignal<ChatRoomForm> = signal(ChatRoomForm.empty(this.formBuilder));

  public ngOnInit(): void {
    this.initForm();
  }

  public formReady(): void {
    this.formModel.openForm();
    this.componentReady();
  }

  public completeForm(): void {
    this.formModel.completeForm();
  }

  public initForm(): void {
    const createChatRoomForm: ChatRoomForm = ChatRoomForm.of(this.formBuilder, ChatRoom.empty());
    this.chatRoomForm.set(createChatRoomForm);

    this.formReady();
  }

  public createChatRoom(): void {
    if (this.isFormValid && this.isNotSubmitting) {
      this.startSubmitting();

      const payload: CreateChatRoomPayload = this.payload;
      this.chatRoomService.create(payload)
        .subscribe({
          next: (response: CreateChatRoomResponse): void => { this.createChatRoomSuccess(response); },
          error: (error: ErrorResponse): void => { this.createChatRoomFailure(error); },
          complete: (): void => { this.createChatRoomComplete(); }
        });
    }
  }

  protected createChatRoomSuccess(result: CreateChatRoomResponse): void {
    this.updateStatusMessage(result.message);
  }

  protected createChatRoomFailure(error: ErrorResponse): void {
    this.updateErrorMessage(error.message);
    this.createChatRoomComplete();
  }

  protected createChatRoomComplete(): void {
    this.stopSubmitting();
    this.completeForm();
  }

  public startSubmitting(): void {
    this.formModel.startSubmitting();
  }

  public stopSubmitting(): void {
    this.formModel.stopSubmitting();
  }

  public get createChatRoomForm(): FormGroup {
    return this.formModel.form;
  }

  public get payload(): CreateChatRoomPayload {
    return this.formModel.value;
  }

  public get formModel(): ChatRoomForm {
    return this.chatRoomForm();
  }

  public get isFormReady(): boolean {
    return this.formModel.isFormReady;
  }

  public get isFormValid(): boolean {
    return this.formModel.isFormValid;
  }

  public get isFormCompleted(): boolean {
    return this.formModel.isFormCompleted;
  }

  public get isSubmitting(): boolean {
    return this.formModel.isSubmitting;
  }

  public get isNotSubmitting(): boolean {
    return this.formModel.isNotSubmitting;
  }

  protected readonly faCheck = faCheck;
  protected readonly faSpinner = faSpinner;
  protected readonly faPlus = faPlus;
}
