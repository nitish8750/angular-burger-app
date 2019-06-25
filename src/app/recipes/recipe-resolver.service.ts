import { DataStorageSrvice } from '../shared/dataStorage.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipes.service';

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataService: DataStorageSrvice, private recipeService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipeService.getRecipe();

        if(recipes.length ===0 ){
            return this.dataService.onFetchRecipe();
        } else {
            return recipes;
        }
        
    }
}