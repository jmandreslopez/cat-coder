import { Injectable } from '@angular/core';
import { HttpParameterCodec } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CustomEncoder implements HttpParameterCodec {

    public encodeKey(key: string): string {
        return this.standardEncoding(key);
    }

    public encodeValue(value: string): string {
        return this.standardEncoding(value);
    }

    public decodeKey(key: string): string {
        return this.standardDecoding(key);
    }

    public decodeValue(value: string) {
        return this.standardDecoding(value);
    }

    // Override Angular's standard encoding
    private standardEncoding(value: any) {
        return encodeURIComponent(value);
            // .replace(/%40/gi, '@')
            // .replace(/%3A/gi, ':')
            // .replace(/%24/gi, '$')
            // .replace(/%2C/gi, ',')
            // .replace(/%3B/gi, ';')
            // .replace(/%2B/gi, '+')
            // .replace(/%3D/gi, '=')
            // .replace(/%3F/gi, '?')
            // .replace(/%2F/gi, '/');
    }

    // Override Angular's standard encoding
    private standardDecoding(value: any) {
        return decodeURIComponent(value);
    }

}
