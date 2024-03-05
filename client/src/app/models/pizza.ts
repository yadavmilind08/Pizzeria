import { Ingredient } from './ingredient';

export interface Pizza {
  id: number;
  name: string;
  quantity: number;
  ingredients: Ingredient[];
}
