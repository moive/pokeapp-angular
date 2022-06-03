import { Component } from '@angular/core';
import { PokeService } from 'src/app/services/poke.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  pokeList = [];
  constructor(private pokeService: PokeService) {
    pokeService.getList().subscribe((data: any) => {
      this.pokeList = data.results;
      console.log(this.pokeList);
    });
  }
}
