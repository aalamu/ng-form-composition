import {BaseForm} from '../form';

export interface HasForm {

  formReady(): void;

  initForm(data?: any): void;

  startSubmitting(): void;

  stopSubmitting(): void;

  completeForm(): void;

  get formModel(): BaseForm<any>;

  get payload(): any;

  get isFormReady(): boolean;

  get isFormCompleted(): boolean;

  get isFormValid(): boolean

  get isNotSubmitting(): boolean;

  get isSubmitting(): boolean;
}
