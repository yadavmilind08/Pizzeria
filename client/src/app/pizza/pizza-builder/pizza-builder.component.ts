import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ingredient } from 'src/app/models/ingredient';
import { CreateOrder } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-pizza-builder',
  templateUrl: './pizza-builder.component.html',
  styleUrls: ['./pizza-builder.component.scss'],
})
export class PizzaBuilderComponent {
  sizes: Ingredient[] = [
    { name: 'Small', price: 5.0, type: 'size' },
    { name: 'Medium', price: 7.5, type: 'size' },
    { name: 'Large', price: 10.0, type: 'size' },
  ];
  sauces: Ingredient[] = [
    { name: 'Marinara', price: 0.5, type: 'sauce' },
    { name: 'Ranch', price: 1.5, type: 'sauce' },
  ];
  cheeses: Ingredient[] = [
    { name: 'Mozzarella', price: 0.5, type: 'cheese' },
    { name: 'Extra Mozzarella', price: 1.5, type: 'cheese' },
  ];
  toppings: Ingredient[] = [
    { name: 'Pepperoni', price: 0.75, type: 'topping' },
    { name: 'Italian Sausage', price: 0.5, type: 'topping' },
    { name: 'Pineapple', price: 1.0, type: 'topping' },
    { name: 'Mushrooms', price: 0.5, type: 'topping' },
  ];
  selectedIngredients: Ingredient[] = [];
  loading: boolean = false;

  constructor(
    private orderService: OrderService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  updateSelectedIngredients(ingredient: Ingredient, event: any) {
    const { type, checked } = event.target;
    if (checked) {
      if (type === 'radio') {
        const selectedSize = this.selectedIngredients.find(
          (x) => x.type === ingredient.type
        );

        if (selectedSize) {
          const index = this.selectedIngredients.findIndex(
            (ing) => ing.type === ingredient.type
          );
          this.selectedIngredients[index] = ingredient;
        } else {
          this.selectedIngredients.push(ingredient);
        }
      } else {
        this.selectedIngredients.push(ingredient);
      }
    } else {
      const index = this.selectedIngredients.findIndex(
        (ing) => ing.name === ingredient.name
      );
      if (index > -1) {
        this.selectedIngredients.splice(index, 1);
      }
    }
  }

  calculateTotalPrice(): number {
    return this.selectedIngredients.reduce(
      (acc, ingredient) => acc + ingredient.price,
      0
    );
  }

  onPlaceOrder() {
    const order: CreateOrder = {
      amount: this.calculateTotalPrice(),
      pizzas: [
        {
          name: this.selectedIngredients.reduce(
            (acc, ing) => acc + ing.name,
            ''
          ),
          quantity: 1,
          ingredients: this.selectedIngredients,
        },
      ],
    };
    this.loading = true;
    this.orderService.createOrder(order).subscribe({
      next: (res) => {
        this.loading = false;
        if (res) {
          this.selectedIngredients = [];
          this.toaster.success('Order created successfully');
          this.router.navigateByUrl('/orders');
        }
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
