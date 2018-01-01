import {Component, ComponentFactory, NgModule, Injectable, Compiler, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {SomeModule} from '../some.module';

export interface GenericUi { }

@Injectable()
export class DynamicUiFactoryProvider {

    // Just for performance:
    private _cacheOfFactories: {[templateKey: string]: ComponentFactory<GenericUi>} = {};

    // Let the JIT compiler be injected:
    constructor(protected compiler: Compiler) {}

    createComponentFactory(template: string): Promise<ComponentFactory<GenericUi>> {

        let factory = this._cacheOfFactories[template];
        if (factory) {
            console.log('Module and Type are returned from cache');
            return new Promise((resolve) => {
                resolve(factory);
            });
        }

        // Unknown template ... let's create a component and module for it:
        let componentType   = this.createComponentType(template);
        let module = this.createComponentModule(componentType);

        return new Promise((resolve) => {
            this.compiler
                .compileModuleAndAllComponentsAsync(module)
                .then((moduleWithFactories) => {
                    factory = moduleWithFactories
                        .componentFactories.find(component => component.componentType === componentType);
                    this._cacheOfFactories[template] = factory;
                    resolve(factory);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }

    private createComponentType (tmpl:string) {
        const metaData = {
                        selector: 'custom-dynamic-component',
                        template: tmpl,
                    };
        @Component(metaData)
        @CustomComponent(metaData)
        class CustomDynamicComponent implements GenericUi {
            onChangeEvent(evt) {
                console.log(evt);
            }
        }
        return CustomDynamicComponent;
    }

    private createComponentModule (componentType: any) {
        @NgModule({
            // You might need other modules, providers, etc...
            // Note that whatever components you want to be able
            // to render dynamically must be known to this module
            // like in this case 'SomeModule'.
            imports: [SomeModule],
            declarations: [componentType],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        @CustomNgModule({
            imports: [SomeModule],
            declarations: [componentType],
            // schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        class RuntimeComponentModule { }
        return RuntimeComponentModule;
    }
}

export function CustomNgModule(annotation: any) {
    return function (target: Function) {
      const metaData = new NgModule(annotation);
      NgModule(metaData)(target);
    };
  }
  export function CustomComponent(annotation: any) {
    return function (target: Function) {
        const metaData = new Component(annotation);
        Component(metaData)(target);
    }
}
