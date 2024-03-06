import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreateOrder } from 'src/app/models/order';
import { Pizza } from 'src/app/models/pizza';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  pizzaList: Pizza[] = [
    {
      id: 1,
      name: 'Margherita',
      quantity: 0,
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
      name: 'Hawaiian',
      quantity: 0,
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
  ];

  selectedPizzas: Pizza[] = [];
  loading: boolean = false;

  constructor(
    private orderService: OrderService,
    private toaster: ToastrService
  ) {}

  onAdd(pizza: Pizza) {
    const index = this.selectedPizzas.findIndex((x) => x.name === pizza.name);
    if (index > -1) {
      this.selectedPizzas[index].quantity++;
    } else {
      pizza.quantity = 1;
      this.selectedPizzas.push(pizza);
    }
  }

  onRemove(pizza: Pizza) {
    const index = this.selectedPizzas.findIndex((x) => x.name === pizza.name);
    if (index > -1) {
      if (this.selectedPizzas[index].quantity > 1) {
        this.selectedPizzas[index].quantity--;
      } else {
        this.selectedPizzas.splice(index, 1);
      }
    }
  }

  calculateQuantity(name: string) {
    return this.selectedPizzas.find((x) => x.name === name)?.quantity || 0;
  }

  calculateTotalPrice(): number {
    return this.selectedPizzas.reduce(
      (total, pizza) =>
        total +
        pizza.ingredients.reduce(
          (acc: any, ingredient: { price: any }) => acc + ingredient.price,
          0
        ) *
          pizza.quantity,
      0
    );
  }

  onPlaceOrder() {
    const order: CreateOrder = {
      amount: this.calculateTotalPrice(),
      pizzas: this.selectedPizzas,
    };
    this.loading = true;
    this.orderService.createOrder(order).subscribe({
      next: (res) => {
        this.loading = false;
        if (res) {
          this.selectedPizzas = [];
          this.toaster.success('Order created successfully');
        }
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
