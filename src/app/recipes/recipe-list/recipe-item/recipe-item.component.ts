import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../../recipes.service';
import { Recipe } from '../../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input('recipe') recipe: Recipe;

  constructor(private recipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute){}
  
  ngOnInit() {
  }

  // recipeClicked(){
  //   this.router.navigate([this.recipe.id], { relativeTo: this.activatedRoute });
  // }

}
