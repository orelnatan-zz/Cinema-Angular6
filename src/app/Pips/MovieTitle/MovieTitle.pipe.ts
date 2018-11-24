import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
   name : 'movieTitle'
})
export class MovieTitle implements PipeTransform {
    transform(value: string): string {
        let clean: string = value.replace(/[`~!@#$%^&*()_|+\-=?;:0-9'",.<>\{\}\[\]\\\/]/gi, '');
        let words: Array<string> = clean.split(' ');
        let final: string = '';

        for(let i in words){
            final += words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase() + ' ';
        }
        final = final.substring(0, final.length - 1);
        return final.trim();
   }
}