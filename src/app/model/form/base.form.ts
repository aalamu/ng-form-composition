import {AbstractControl, FormGroup} from '@angular/forms';
import {signal, WritableSignal} from '@angular/core';
import {tap, timer} from 'rxjs';

export abstract class BaseForm<T> {

  protected formGroup!: FormGroup;

  private submitting: WritableSignal<boolean> = signal(false);
  private formReady: WritableSignal<boolean> = signal(false);
  private formCompleted: WritableSignal<boolean> = signal(false);

  protected constructor() {}

  protected initForm(): void {}

  protected control(name: string): AbstractControl | null | undefined {
    return this.form?.get(name);
  }

  public enableFormComplete(): void {
    this.formCompleted.set(true);
  }

  public disableFormCompleted(): void {
    this.formCompleted.set(false);
  }

  public openForm(): void {
    this.formReady.set(true);
  }

  public startSubmitting(): void {
    this.submitting.set(true);
  }

  public stopSubmitting(): void {
    this.submitting.set(false);
  }

  public get form(): FormGroup {
    return this.formGroup;
  }

  public get value(): T {
    return this.form.value as T;
  }

  public get isFormValid(): boolean {
    return this.formGroup.valid;
  }

  public get isFormCompleted(): boolean {
    return this.formCompleted();
  }

  public get isFormReady(): boolean {
    return this.formReady();
  }

  public get isSubmitting(): boolean {
    return this.submitting();
  }

  public get isNotSubmitting(): boolean {
    return !(this.isSubmitting);
  }

  public completeForm(delayToReset: number = 5000): void {
    // Ensure delay is non-negative
    const safeDelay: number = Math.max(0, delayToReset);

    // Mark the form as completed
    this.enableFormComplete();

    // Set a timer to reset form completion status
    timer(delayToReset).pipe(
      // Reset form completion status
      tap(() => this.disableFormCompleted()),
    ).subscribe();
  }

}
