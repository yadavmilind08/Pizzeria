import { Component } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent {
  orderList = [
    {
      id: 1,
      orderDate: new Date().toISOString(),
      totalAmount: 50,
      pizzas: [
        {
          id: 1,
          name: 'pizza1',
          ingredients: [
            { name: 'Medium', price: 7.5, type: 'size' },
            { name: 'Marinara', price: 0.5, type: 'sauce' },
            { name: 'Extra Mozzarella', price: 1.5, type: 'cheese' },
            { name: 'Pepperoni', price: 0.75, type: 'topping' },
            { name: 'Mushrooms', price: 0.5, type: 'topping' },
          ],
        },
        {
          id: 2,
          name: 'pizza2',
          ingredients: [
            { name: 'Medium', price: 7.5, type: 'size' },
            { name: 'Ranch', price: 1.5, type: 'sauce' },
            { name: 'Mozzarella', price: 0.5, type: 'cheese' },
            { name: 'Pepperoni', price: 0.75, type: 'topping' },
            { name: 'Italian Sausage', price: 0.5, type: 'topping' },
            { name: 'Pineapple', price: 1.0, type: 'topping' },
            { name: 'Mushrooms', price: 0.5, type: 'topping' },
          ],
        },
      ],
    },
    {
      id: 1,
      orderDate: new Date().toISOString(),
      totalAmount: 80,
      pizzas: [
        {
          id: 1,
          name: 'pizza1',
          ingredients: [
            { name: 'Medium', price: 7.5, type: 'size' },
            { name: 'Marinara', price: 0.5, type: 'sauce' },
            { name: 'Extra Mozzarella', price: 1.5, type: 'cheese' },
            { name: 'Pepperoni', price: 0.75, type: 'topping' },
            { name: 'Mushrooms', price: 0.5, type: 'topping' },
          ],
        },
      ],
    },
  ];
}
