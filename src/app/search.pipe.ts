import { Pipe, PipeTransform } from '@angular/core';
import { Games } from './interface/games';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(games:Games[] , term:string):Games[] {
    return games.filter(game => game.title.toLocaleLowerCase().includes(term.toLocaleLowerCase()));
  }

}
