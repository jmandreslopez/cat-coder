import { Injectable, ElementRef } from '@angular/core';

// App
import { ConfigService } from '@app/config';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {

    constructor(private configService: ConfigService) {
        //
    }

    private hasLevel(levels: Array<string>): boolean {
        return ['all', ...levels].includes(this.configService.getDebugLevel() || 'all');
    };

    // Success === Color Green
    public success(...args: Array<any>): any {

        if (! this.configService.isDebug()) {
            return; // break
        }

        if (! this.hasLevel(['success'])) {
            return; // break
        }

        console.log.apply(console, ['%cSuccess:', 'color:green', ...args]);
    }

    // Information === Color Gray
    public info(...args: Array<any>): any {

        if (! this.configService.isDebug()) {
            return; // break
        }

        if (! this.hasLevel(['info'])) {
            return; // break
        }

        console.log.apply(console, ['%cInfo:', 'color:gray', ...args]);
    }

    // Error === Color Red
    public error(...args: Array<any>): any {

        if (! this.configService.isDebug()) {
            return; // break
        }

        if (! this.hasLevel(['error'])) {
            return; // break
        }

        console.log.apply(console, ['%cError:', 'color:red', ...args]);
    }

    // Warning === Color Orange
    public warning(...args: Array<any>): any {

        if (! this.configService.isDebug()) {
            return; // break
        }

        if (! this.hasLevel(['warning'])) {
            return; // break
        }

        console.log.apply(console, ['%cWarning:', 'color:orange', ...args]);
    }

    // Stack
    public stack(message = ''): any {

        if (! this.configService.isDebug()) {
            return; // break
        }

        if (! this.hasLevel(['stack'])) {
            return; // break
        }

        const error = new Error(message);
        const stack = error.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
            .split('\n');

        console.error(message, stack);
    }

}
