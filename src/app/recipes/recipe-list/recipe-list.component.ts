import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() onRecipeDetailClicked = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Burger', 'this is a Burger', 'https://www.maxpixel.net/static/photo/1x/Bio-Food-Home-Made-Recipe-Dishes-Kitchen-Meals-1175496.jpg'),
    new Recipe('Pizza', 'this is a Pizza', 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'),
    new Recipe('Pasta', 'this is a Pasta', 'https://img1.cookinglight.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2017/05/main/pasta-chickpea-sauce-1707p46.jpg?itok=Jmv3zJMU'),
    new Recipe('Sandwhich', 'this is a Sandwhich', 'https://i.kinja-img.com/gawker-media/image/upload/s--k01UEarS--/c_scale,f_auto,fl_progressive,q_80,w_800/mzq37sdpd7hw30pk1pkl.jpg')
  ];
  constructor() { }
  ngOnInit() {
  }

  recipeItemClicked(recipe: Recipe){
    this.onRecipeDetailClicked.emit(recipe);
  }

}
