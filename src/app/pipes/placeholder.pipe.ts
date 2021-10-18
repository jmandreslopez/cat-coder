import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'placeholder'
})
export class PlaceholderPipe implements PipeTransform {

    transform(value: any, placeholder: any): any {
        return value || placeholder || '';
    }

}
