import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';

@Component({
  selector: '',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent {

  private errorMsg: WritableSignal<string> = signal('');
  private statusMsg: WritableSignal<string> = signal('');
  private ready: WritableSignal<boolean> = signal(false);

  protected componentReady(): void {
    this.ready.set(true);
  }

  protected resetErrorMessage(): void {
    this.errorMsg.set('');
  }

  protected resetStatusMessage(): void {
    this.statusMsg.set('');
  }

  protected updateStatusMessage(message: string = ''): void {
    this.statusMsg.set(message);
  }

  protected updateErrorMessage(message: string = ''): void {
    this.errorMsg.set(message);
  }

  public get isComponentReady(): boolean {
    return this.ready();
  }

  public get errorMessage(): string {
    return this.errorMsg();
  }

  public get statusMessage(): string {
    return this.statusMsg();
  }
}
