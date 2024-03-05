import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  pizzaList = [
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
  ];

  selectedPizzas: any[] = [];

  onAdd(pizza: any) {
    this.selectedPizzas.push(pizza);
  }

  onRemove(pizza: any) {
    const index = this.selectedPizzas.findIndex((x) => x.name === pizza.name);
    if (index > -1) {
      this.selectedPizzas.splice(index, 1);
    }
  }

  calculateQuantity(name: string) {
    return this.selectedPizzas.filter((x) => x.name === name).length;
  }

  calculateTotalPrice(): number {
    return this.selectedPizzas.reduce(
      (total, pizza) =>
        total +
        pizza.ingredients.reduce(
          (acc: any, ingredient: { price: any }) => acc + ingredient.price,
          0
        ),
      0
    );
  }
}
