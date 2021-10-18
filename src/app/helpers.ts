import { FormGroup } from '@angular/forms';
import CryptoES from 'crypto-es';
import * as _ from 'lodash';

// Description: Encode element
export const encode = (element: any): string => JSON.stringify(element);

// Description: Decode element
export const decode = (element: string): any => JSON.parse(element);

// Description: URI Encode value
export const uri = (value: string): string => encodeURIComponent(value);

// Description: Serialize params
export const serialize = (params: {[key: string]: any}): string => {
    return _
        .chain(params)
        .forOwn((value: any, key: string) => `${uri(key)}=${uri(value)}`)
        .join(`&`)
        .value();
};

// Description: Crypt using MD5
export const md5 = (value: string): string => CryptoES.MD5(value).toString();

// Description: Crypt using SHA1
export const sha1 = (value: string): string => CryptoES.SHA1(value).toString();

// Description: Crypt using HMAC MD5
// tslint:disable-next-line:variable-name
export const hmac_md5 = (value: string, key: string): string => CryptoES.HmacMD5(value, key).toString();

// Description: Check if a form is valid, otherwise
// trigger all the controls to show errors
export const isValidForm = (form: FormGroup): boolean => {

    if (form.valid) {
        return true;
    }

    // Mask all as touched
    form.markAllAsTouched();

    return false;
};

// Description: Check if the params object contains
// any array and flatten that array by using the keys
// as a new property of the object
export const flatParams = (params: any): any => {
    let flatParams = [];

    _.forEach(params, (param: any, element: number) => {

        // If no array was found,
        // handle as a simple property
        if (!_.isArray(param)) {
            flatParams[element] = param;

            return; // break
        }

        // If array was found, loop over all the items
        _.forEach(param, (item: any, key: number) => {

            // If not object was found,
            // handle as a simple property
            if (!_.isObject(item)) {
                flatParams[`${element}[${key}]`] = item;

                return; // break
            }

            // If object was found, loop over all the properties
            _.forEach(item, (value: any, property: any) => {
                flatParams[`${element}[${key}][${property}]`] = value;
            });
        });
    });

    return flatParams;
};

// Description: Random string generator
export const randomString = (length: number = 8, config: any = { specialChars: true }): string => {
    let chars: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let specialChars: string = '!@#$%^&*';

    if (config?.specialChars) {
        chars = `${chars}${specialChars}`;
    }

    let random = '';
    for (let x = 0; x < length; x++) {
        random += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return random;
};

// Description; Generate random numbers array
export const randomNumbers = ({ amount = 10, min = 1, max = 1000 }): Array<number> => {
    return _.times(amount, () => _.random(min, max));
};
