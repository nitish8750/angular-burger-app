import { Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    @Output() onFeatureSelected = new EventEmitter<string>();

    onSelected(selectedval: string){
        this.onFeatureSelected.emit(selectedval);
    }
}