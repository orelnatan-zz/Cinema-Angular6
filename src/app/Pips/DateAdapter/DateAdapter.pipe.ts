
import {Pipe, PipeTransform} from '@angular/core';

@Pipe ({
   name: 'dateAdapter'
})
export class DateAdapter implements PipeTransform {
   
    transform(value: string): string {
        return value.split('-').reverse().join('/');
   }
}