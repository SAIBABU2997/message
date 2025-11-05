import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div style="max-width: 500px; margin: 50px auto; font-family: Arial, sans-serif;">
      <h2 style="text-align: center; color: #3f51b5;">Message Board</h2>

      <!-- Notification -->
      <div *ngIf="notification" 
           style="margin-bottom: 15px; padding: 10px; border-radius: 5px; color: white; text-align: center;"
           [ngStyle]="{'background-color': notificationColor}">
        {{ notification }}
      </div>

      <!-- Input Form -->
      <div style="display: flex; gap: 10px; margin-bottom: 20px;">
        <input [(ngModel)]="msg" placeholder="Type a message" 
               style="flex: 1; padding: 10px; border-radius: 5px; border: 1px solid #ccc;"/>
        <button (click)="send()" 
                style="padding: 10px 15px; background-color: #3f51b5; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Send
        </button>
      </div>

      <!-- Message List -->
      <div *ngFor="let m of list" 
           style="margin-bottom: 15px; padding: 15px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); background-color: #f5f5f5; position: relative;">
        {{ m.text }}
        <button (click)="delete(m.id)" 
                style="position: absolute; top: 10px; right: 10px; background-color: #e53935; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
          Delete
        </button>
      </div>
    </div>
  `
})
export class AppComponent {
  msg = '';
  list = [
    { text: 'Hello World', id: '1' },
    { text: 'Test Message', id: '2' }
  ];

  notification = '';
  notificationColor = '#4caf50'; // default green

  send() {
    if (!this.msg) return;

    const newMessage = { text: this.msg, id: Date.now().toString() };
    this.list.unshift(newMessage);
    this.msg = '';

    // show popup
    this.showNotification('Message added!', '#4caf50');
  }

  delete(id: string) {
    this.list = this.list.filter(m => m.id !== id);

    // show popup
    this.showNotification('Message deleted!', '#e53935');
  }

  showNotification(msg: string, color: string) {
    this.notification = msg;
    this.notificationColor = color;

    setTimeout(() => {
      this.notification = '';
    }, 2000); // hide after 2 seconds
  }
}
