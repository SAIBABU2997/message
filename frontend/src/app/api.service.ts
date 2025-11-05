import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Use your deployed backend URL here
  private baseUrl = 'https://message-board-backend-2q1z.onrender.com/messages';

  constructor(private http: HttpClient) {}

  // Get all messages
  getMessages(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Send a new message
  sendMessage(msg: any): Observable<any> {
    return this.http.post(this.baseUrl, msg);
  }

  // Delete a message by ID
  deleteMessage(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
