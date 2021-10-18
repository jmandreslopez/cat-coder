import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'times'
})
export class TimesPipe implements PipeTransform {

    transform(times: number): Array<any> {
        return Array(times).fill(0).map((x, i) => i);
    }

}
