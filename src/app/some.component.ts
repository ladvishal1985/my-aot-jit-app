import {Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'some-component',
    template: `<div>
                <span [style.color]="color">{{text}}: {{count}}</span>
                    <button (click)='increment()'>
                        Increment
                    </button>
                <div>`
})
@CustomComponent({
    moduleId: module.id,
    selector: 'some-component',
    template: `<div>
                    <span [style.color]="color">{{text}}: {{count}}</span>
                    <button (click)='increment()'>
                        Increment
                    </button>
               <div>`
})
export class SomeComponent {
    @Input()
    @CustomInput()
    color: string;
    @Input()
    @CustomInput()
    text: string = 'blah';
    
    public count: number =  0;
    @Output()
    @CustomOutput()
    change: EventEmitter<number> = new EventEmitter<number>();

    increment() {
        this.count++;
        this.change.emit(this.count);
    }
}
export function CustomComponent(annotation: any) {
    return function (target: Function) {
        const metaData = new Component(annotation);
        Component(metaData)(target);
    }
}

export function CustomInput(bindingPropertyName?: any) {
    return Input(bindingPropertyName);
}
export function CustomOutput(bindingPropertyName?: any) {
    return Output(bindingPropertyName);
}
