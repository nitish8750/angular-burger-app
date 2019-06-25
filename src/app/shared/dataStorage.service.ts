import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import  { map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageSrvice {
    constructor(private http: HttpClient, private recipeService: RecipeService){}

    onSaveRcipe(){
        let recipes = this.recipeService.getRecipe();
        this.http.put('https://burger-app-19acc.firebaseio.com//recipes.json', recipes)
            .subscribe(response => console.log(response));
    }

     onFetchRecipe(){
        return this.http.get<Recipe[]>('https://burger-app-19acc.firebaseio.com//recipes.json').
        pipe(
            map(recipes => {
            return recipes.map(recipe => {
                return {
                    ...recipe, 
                    ingredients: recipe.ingredients ? recipe.ingredients : [] 
                };
            });
        }), 
        tap(recipes => {
            return this.recipeService.setRecipe(recipes);
        })
        );
    }

}