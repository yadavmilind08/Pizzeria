import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orderList: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList() {
    this.orderService.getOrdersByUsername()?.subscribe({
      next: (res: Order[]) => (this.orderList = [...res]),
    });
  }
}
