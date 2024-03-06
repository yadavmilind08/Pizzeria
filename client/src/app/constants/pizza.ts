import { Ingredient } from '../models/ingredient';
import { Pizza } from '../models/pizza';

export const pizzaSizes: Ingredient[] = [
  { name: 'Small', price: 5.0, type: 'size' },
  { name: 'Medium', price: 7.5, type: 'size' },
  { name: 'Large', price: 10.0, type: 'size' },
];

export const pizzaSauces: Ingredient[] = [
  { name: 'Marinara', price: 0.5, type: 'sauce' },
  { name: 'Ranch', price: 1.5, type: 'sauce' },
];

export const pizzaCheeses: Ingredient[] = [
  { name: 'Mozzarella', price: 0.5, type: 'cheese' },
  { name: 'Extra Mozzarella', price: 1.5, type: 'cheese' },
];

export const pizzaToppings: Ingredient[] = [
  { name: 'Pepperoni', price: 0.75, type: 'topping' },
  { name: 'Italian Sausage', price: 0.5, type: 'topping' },
  { name: 'Pineapple', price: 1.0, type: 'topping' },
  { name: 'Mushrooms', price: 0.5, type: 'topping' },
];

export const availablePizzas: Pizza[] = [
  {
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
