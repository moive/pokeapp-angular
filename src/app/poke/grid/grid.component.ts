import { Component } from '@angular/core';
import { PokeService } from 'src/app/services/poke.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  constructor(private pokeService: PokeService) {
    pokeService.getList().subscribe((data: any) => {
      console.log(data);
    });
  }
}
