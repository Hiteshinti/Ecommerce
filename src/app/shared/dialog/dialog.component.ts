import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Input() title: string = '';
  @Input() content: any;
  @Input() dialogType: 'login' | 'register' = 'login';
  @Output() close = new EventEmitter<any>();

  onClose: (result: any) => void = () => {};

  closeDialog(result?: any): void {
    this.close.emit(result);
    this.onClose(result);
  }
}
