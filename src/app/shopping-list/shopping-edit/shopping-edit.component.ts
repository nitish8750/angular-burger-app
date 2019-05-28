import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @Output() onIngredientAdded = new EventEmitter<Ingredients>();

  constructor() { }

  ngOnInit() {
  }

  onAddItem(event: Event){
    event.preventDefault();
    let name = this.nameInputRef.nativeElement.value;
    let amount = this.amountInputRef.nativeElement.value;
    let ingredient = new Ingredients(name, amount);
    this.onIngredientAdded.emit(ingredient);
  }

}
