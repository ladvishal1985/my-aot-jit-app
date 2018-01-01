import {NgModule} from '@angular/core';
import {SomeComponent} from './some.component';

@NgModule({
    declarations: [SomeComponent],
    exports: [SomeComponent]
})
@CustomNgModule({
    declarations: [SomeComponent],
    exports: [SomeComponent]
})
export class SomeModule { }
export function CustomNgModule(annotation: any) {
    return function (target: Function) {
      const metaData = new NgModule(annotation);
      NgModule(metaData)(target);
    };
  }