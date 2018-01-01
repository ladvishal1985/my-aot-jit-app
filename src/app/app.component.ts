// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'app';
// }
import {Component} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent { 
  public dynamicTemplate: string = `<some-component [color]=&quot;\'red\'&quot; [text]=&quot;\'Created with JIT\'&quot;></some-component>`
  
}