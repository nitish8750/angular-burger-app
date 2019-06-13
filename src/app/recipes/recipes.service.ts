import { Recipe } from "./recipe.model";
import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe(
            'Burger', 
            'this is a Burger', 
            'https://www.maxpixel.net/static/photo/1x/Bio-Food-Home-Made-Recipe-Dishes-Kitchen-Meals-1175496.jpg',
            [
                new Ingredients('Bread', 1),
                new Ingredients('Butter', 2)
            ]
        ),
        new Recipe(
            'Pizza', 
            'this is a Pizza', 
            'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
            [
                new Ingredients('Tomato', 1),
                new Ingredients('Panner', 2)
            ]
            ),
        new Recipe(
            'Pasta', 
            'this is a Pasta', 
            'https://img1.cookinglight.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2017/05/main/pasta-chickpea-sauce-1707p46.jpg?itok=Jmv3zJMU',
            [
                new Ingredients('Pasta', 2),
                new Ingredients('Salt', 3)
            ]
            ),
        new Recipe(
            'Sandwhich', 
            'this is a Sandwhich', 
            'https://i.kinja-img.com/gawker-media/image/upload/s--k01UEarS--/c_scale,f_auto,fl_progressive,q_80,w_800/mzq37sdpd7hw30pk1pkl.jpg',
            [
                new Ingredients('Potato', 4),
                new Ingredients('Onion', 1)
            ]
            )
      ];

    getRecipe(){
        return this.recipes.slice();
    }
    getSelectedRecipe(index: number){
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
