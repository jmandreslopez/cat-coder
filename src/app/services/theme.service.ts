import { Injectable, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import * as _ from 'lodash';

// App
import { ConfigService } from '@app/config';
import { DOMService } from './dom.service';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class ThemeService implements OnInit {
    private renderer: Renderer2;
    private theme: string;
    private storageKey: string = this.configService.getStorageKeyTheme();

    constructor(private configService: ConfigService,
                private domService: DOMService,
                private rendererFactory: RendererFactory2,
                private storageService: StorageService) {

        // Define Renderer
        this.renderer = this.rendererFactory.createRenderer(null, null);

        // OnInit
        this.ngOnInit();
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    public getTheme(): string {
        return this.theme;
    }

    public toggle(theme: string = undefined) {

        if (_.isUndefined(theme)) {
            theme = this.theme === 'dark' ? 'light' : 'dark';
        }

        this.theme = theme;

        this.update();
    }

    public update() {
        let theme: string = this.theme;

        // Detect system theme
        if (this.theme === 'auto') {
            theme = window?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        const element: any = this.domService.document.querySelector(':root');
        this.renderer.setAttribute(element, 'data-theme', theme);

        // Save Theme
        const storageKey: string = this.configService.getStorageKeyTheme();
        this.storageService.setItem(storageKey, this.theme);
    }

    //****************************************************************************************
    // LIFECYCLES
    //****************************************************************************************

    public ngOnInit() {

        // Set Initial Value
        this.theme = this.storageService.getItem(this.storageKey) || this.configService.getThemeDefault();

        this.update();
    }

}
