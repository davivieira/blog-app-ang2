import { Component, Input, Output, SimpleChange, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './userspan.component.html',
    selector: 'user-span',
    styleUrls: ['../registration/registration.component.css']
})
export class UserSpanComponent {
    @Input() icon: string = 'fa fa-user-circle';
    @Output() isValid = new EventEmitter();

    /*ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        if (['fa fa-user-circle red', 'fa fa-user-circle'].indexOf(changes.icon.currentValue) != -1) {
            this.isValid.emit(false);
            return;
        }

        this.isValid.emit(true);
    }*/
}
