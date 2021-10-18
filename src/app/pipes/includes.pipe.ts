import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'includes'
})
export class IncludesPipe implements PipeTransform {

    transform(collection: any, value: any): boolean {

        // If the collection is not an array
        // check if the value is equals to the
        // collection, this is an edge case
        if (!_.isArray(collection)) {
            return collection === value;
        }

        return collection.includes(value);
    }

}
