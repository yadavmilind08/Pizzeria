import { Pizza } from './pizza';

export interface Order {
  id: number;
  amount: number;
  created: string;
  pizzas: Pizza[];
}

export interface CreateOrder {
  amount: number;
  pizzas: Pizza[];
}
