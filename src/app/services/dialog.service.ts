import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  Type
} from '@angular/core';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private currentDialog?: ComponentRef<DialogComponent>;
  private currentContent?: ComponentRef<unknown>;

  constructor(
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  openLoginDialog(): void {
    this.openDialog(LoginComponent, 'login');
  }

  openRegisterDialog(): void {
    this.openDialog(RegisterComponent, 'register');
  }

  private openDialog(component: Type<unknown>, dialogType: 'login' | 'register'): void {
    this.closeDialog();

    const contentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const dialogFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);

    this.currentContent = contentFactory.create(this.injector);
    this.appRef.attachView(this.currentContent.hostView);

    const contentNode = this.currentContent.location.nativeElement;
    this.currentDialog = dialogFactory.create(this.injector, [[contentNode]]);
    this.currentDialog.instance.dialogType = dialogType;
    this.currentDialog.instance.close.subscribe(() => this.closeDialog());

    this.appRef.attachView(this.currentDialog.hostView);
    document.body.appendChild(this.currentDialog.location.nativeElement);
  }

  closeDialog(): void {
    if (this.currentDialog) {
      this.appRef.detachView(this.currentDialog.hostView);
      this.currentDialog.destroy();
      this.currentDialog = undefined;
    }

    if (this.currentContent) {
      this.appRef.detachView(this.currentContent.hostView);
      this.currentContent.destroy();
      this.currentContent = undefined;
    }
  }
}
