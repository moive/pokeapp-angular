import { Component } from '@angular/core';
import { PokeService } from 'src/app/services/poke.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  pokeList: Array<any> = [];
  countPokemos: number = 0;

  protected page: number = this.pokeService.pageOffset || 0;

  constructor(private pokeService: PokeService) {
    this.getData(true);
    // pokeService.getList().subscribe((data: any) => {
    //   this.pokeList = data.results;
    //   this.countPokemos = data.count;
    // });
  }
  getData(isConstructor = false) {
    this.pokeService.getList(this.page).subscribe((data: any) => {
      this.pokeList = data.results;
      if (isConstructor) this.countPokemos = data.count;
    });
  }

  isDisabledPrev(): boolean {
    return this.page == 0;
  }

  isDisabledNext(): boolean {
    return this.page + this.pokeService.pageLimit >= this.countPokemos;
  }

  nextPage() {
    this.page += this.pokeService.pageLimit;
    this.getData();
  }
  prevPage() {
    if (this.page == 0) return;
    this.page -= this.pokeService.pageLimit;
    this.getData();
  }
}
