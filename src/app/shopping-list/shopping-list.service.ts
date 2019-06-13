import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  onIngredientAdded = new Subject<Ingredients[]>();
  startEditing = new Subject<number>();
   private ingredients:Ingredients[] = [
        new Ingredients('apples', 5),
        new Ingredients('tomato', 10)
      ];

    getIngredients(){
      return this.ingredients.slice();
    }

    getIngredient(index: number) {
      return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredients) {
      this.ingredients.push(ingredient);
      this.onIngredientAdded.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredients[]){
      this.ingredients.push(...ingredients);
      this.onIngredientAdded.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient : Ingredients){
      this.ingredients[index] = newIngredient;
      this.onIngredientAdded.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
      this.ingredients.splice(index, 1);
      this.onIngredientAdded.next(this.ingredients.slice());
    }

}