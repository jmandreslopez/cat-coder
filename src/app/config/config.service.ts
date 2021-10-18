import { Injectable, Inject } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private variables: any = {};

    constructor(@Inject('config') config: any = {},
                @Inject('environment') environment: any = {}) {

        this.variables = {
            ...this.variables,
            ...config,
            ...environment,
        };
    }

    private getVariable(key: any, backup?: any) {

        // Key Value
        if (this.variables?.[key]) {
            return this.variables[key];
        }

        // Backup Value
        if (!_.isUndefined(backup)) {
            return backup;
        }

        // Error
        throw new Error(`Missing key - '${key}'`);
    }

    //****************************************************************************************
    // APP
    //****************************************************************************************

    // REQUIRED
    public getAppKey(): string {
        return this.getVariable('app_key');
    }

    // REQUIRED
    public getAppName(): string {
        return this.getVariable('app_name');
    }

    //****************************************************************************************
    // API
    //****************************************************************************************

    // REQUIRED
    public getApiUrl(): string {
        return this.getVariable('api_url');
    }

    //****************************************************************************************
    // COOKIES
    //****************************************************************************************

    // REQUIRED
    public getCookieDomain(): string {
        return this.getVariable('cookie_domain');
    }

    //****************************************************************************************
    // DEBUG
    //****************************************************************************************

    public isDebug(): boolean {
        return this.getVariable('debug', false);
    }

    public getDebugLevel(): string {
        return this.getVariable('debug_level', 'none');
    }

    //****************************************************************************************
    // INTERFACE
    //****************************************************************************************

    public getInterfaceModalsSize(): string {
        return this.getVariable('interface_modals_size', 'lg');
    }

    //****************************************************************************************
    // SEO
    //****************************************************************************************

    public getSEODescription(): string {
        return this.getVariable('seo_description');
    }

    public getSEOImageUrl(): string {
        return this.getVariable('seo_image_url');
    }

    //****************************************************************************************
    // STORAGE KEYS
    //****************************************************************************************

    public getStorageKeyTheme(): string {
        return this.getVariable('storage_key_theme', 'theme');
    }

    //****************************************************************************************
    // THEMES
    //****************************************************************************************

    public getThemeOptions(): Array<string> {
        return this.getVariable('theme_options', ['dark', 'light', 'auto']);
    }

    public getThemeDefault(): string {
        return this.getVariable('theme_default', 'dark');
    }

    public isThemeSelectorEnabled(): boolean {
        return this.getVariable('theme_selector_enabled', false);
    }

}
