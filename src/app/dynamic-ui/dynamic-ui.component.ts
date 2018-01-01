import {Component, ComponentRef, ViewChild, ViewContainerRef, Input}   from '@angular/core';
import {AfterViewInit, OnDestroy} from '@angular/core';
import {OnChanges,SimpleChange,ComponentFactory} from '@angular/core';
import {GenericUi, DynamicUiFactoryProvider} from './dynamic-ui.factory';

@Component({
    selector: 'dynamic-ui',
    template: '<div #dynamicUiContentPlaceHolder></div>'
})
export class DynamicUiComponent implements AfterViewInit, OnChanges, OnDestroy {

    @Input() templateContent: string;

    @ViewChild('dynamicUiContentPlaceHolder', {read: ViewContainerRef})
    public genericUiComponentTarget: ViewContainerRef;
    private componentRef: ComponentRef<GenericUi>;
    private wasViewInitialized = false;

    constructor(private factoryProvider: DynamicUiFactoryProvider) {}

    ngAfterViewInit(): void {
        this.init();
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}): void {
        this.init();
    }
    

    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }

    private init () {
        if (this.wasViewInitialized) {
            return;
        }
        this.wasViewInitialized = true;
        this.buildUi();
    }

    private buildUi () {
        if (this.componentRef) {
            this.componentRef.destroy();
        }

        console.log('The dyanic UI template is: ' + this.templateContent);

        this.factoryProvider
            .createComponentFactory(this.templateContent)
            .then((factory: ComponentFactory<GenericUi>) => {
                this.componentRef = this.genericUiComponentTarget.createComponent(factory);
            });
    }
}
