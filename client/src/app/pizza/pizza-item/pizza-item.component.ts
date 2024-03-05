import { Component, Input } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient';

@Component({
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.scss'],
})
export class PizzaItemComponent {
  @Input() selectedIngredients: Ingredient[] = [];

  getPizzaSize() {
    const selectedSize = this.selectedIngredients.find(
      (x) => x.type === 'size'
    );

    return selectedSize !== null ? selectedSize?.name?.toLowerCase() : '';
  }

  shouldDisplay(name: string) {
    return (
      this.selectedIngredients.findIndex((x) => x.name.toLowerCase() === name) >
      -1
    );
  }
}
