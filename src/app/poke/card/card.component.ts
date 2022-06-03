import { Component, Input, OnInit } from '@angular/core';
import { PokeService } from 'src/app/services/poke.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input()
  item: any;

  urlImgSmall: string = '';
  urlImgLarge: string = '';
  typePoke: string = '';

  constructor(private pokeService: PokeService) {}

  ngOnInit(): void {
    this.pokeService.getPokeData(this.item.name).subscribe((data: any) => {
      this.urlImgSmall = data.sprites.other.home.front_default;
      this.urlImgLarge = data.sprites.other.home.front_shiny;
      this.typePoke = data.species.name;
    });
  }
}
