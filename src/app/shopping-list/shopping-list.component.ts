import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Ingredients[];
  private ingredientsSub: Subscription

  constructor(private shoppingListService: ShoppingListService) { }
  
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsSub = this.shoppingListService.onIngredientAdded
      .subscribe((ingredient: Ingredients[]) => {
        this.ingredients = ingredient;
      })
  }

  onEditItem(index: number){
    this.shoppingListService.startEditing.next(index);
  }

  ngOnDestroy() {
    this.ingredientsSub.unsubscribe();
  }

}
