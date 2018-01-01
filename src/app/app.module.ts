import {NgModule, CUSTOM_ELEMENTS_SCHEMA, ApplicationRef, Compiler} from '@angular/core';
// import {removeNgStyles, createNewHosts, createInputTransfer} from '@angularclass/hmr';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {JitCompilerFactory} from '@angular/compiler';
import {DynamicUiComponent} from './dynamic-ui/dynamic-ui.component';
import {DynamicUiFactoryProvider} from './dynamic-ui/dynamic-ui.factory';
import {SomeModule} from './some.module';

// Need an exported function to make it work with AOT:
export function createJitCompiler () {
    return new JitCompilerFactory([{useDebug: false, useJit: true}]).createCompiler();
}

@NgModule({
    imports: [
        BrowserModule,
        SomeModule
    ],
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent,
        DynamicUiComponent
    ],
    providers: [
        { provide: Compiler, useFactory:  createJitCompiler},
        DynamicUiFactoryProvider
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA // required for non-angular HTML tags
    ]
})
export class AppModule {}
