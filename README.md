# Angular2 JIT and AOT compilation POC.
This is a small experiment with Angular 2 compilation process for our project.
This is a angular-cli generated project. This project is derived from one of the sample posted on this discussion.
This is a very interesting discussion on using AOT+JIT together but issue seems to be still open:
https://github.com/angular/angular/issues/15510


## Summary of Issue:
When we try to build the project with AOT configuration the metadata associated with the dynamic module/component is stripped off. This makes the module unidentifiable. We can find the threads on similar discussion:
https://github.com/angular/angular/issues/16033
https://github.com/angular/angular-cli/issues/6866
https://github.com/angular/angular/issues/17595

##Proposed workaround
The idea is to preserve the metadata/decorator associated with any of the angular module/component/service. This can be achieved through creating custom decorators as demonstrated in the the current POC.
 
## Things to try:
1. Create a component that load external style sheet.
2. Discover external modules which does not have custom metadata/decorators at runtime.

## How to compile and test:
- ``npm run aot``

Hope this helps someone in need!