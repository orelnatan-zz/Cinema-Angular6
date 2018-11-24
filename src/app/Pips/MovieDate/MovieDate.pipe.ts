import * as moment from 'moment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
   name: 'movieDate'
})
export class MovieDate implements PipeTransform {
    transform(value: string): string {
        return moment((new Date(value))).format('DD/MM/YYYY');
   }
}