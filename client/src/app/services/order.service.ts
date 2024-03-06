import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { CreateOrder, Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getOrdersByUsername() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    return this.http.get<Order[]>(this.baseUrl + `order/${user.username}`);
  }

  createOrder(order: CreateOrder) {
    return this.http.post<CreateOrder[]>(this.baseUrl + `order`, order);
  }
}
