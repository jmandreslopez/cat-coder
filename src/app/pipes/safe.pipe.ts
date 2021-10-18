import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
    name: 'safe'
})
export class SafePipe implements PipeTransform {

    constructor(private domSanitizer: DomSanitizer) {
        //
    }

    transform(content: string, type?: string): SafeResourceUrl {

        switch (type) {
            case 'html':
                return this.domSanitizer.bypassSecurityTrustHtml(content);

            case 'script':
                return this.domSanitizer.bypassSecurityTrustScript(content);

            case 'style':
                return this.domSanitizer.bypassSecurityTrustStyle(content);

            case 'url':
                return this.domSanitizer.bypassSecurityTrustUrl(content);

            default:
                break;
        }

        return this.domSanitizer.bypassSecurityTrustResourceUrl(content);
    }

}
