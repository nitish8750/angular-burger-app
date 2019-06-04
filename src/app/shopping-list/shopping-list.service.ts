import { Ingredients } from '../shared/ingredients.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  onIngredientAdded = new EventEmitter<Ingredients[]>();
   private ingredients:Ingredients[] = [
        new Ingredients('apples', 5),
        new Ingredients('tomato', 10)
      ];

    getIngredients(){
      return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredients) {
      this.ingredients.push(ingredient);
      this.onIngredientAdded.emit(this.ingredients.slice());
    }
    addIngredients(ingredients: Ingredients[]){
      this.ingredients.push(...ingredients);
      this.onIngredientAdded.emit(this.ingredients.slice());
    }
}