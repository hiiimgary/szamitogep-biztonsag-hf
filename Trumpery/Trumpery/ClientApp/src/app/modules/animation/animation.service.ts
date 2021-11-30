import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAnimationListItem, IAnimationListItemResponse } from './models/animation-list-item.interface';
import { IAnimationDetail } from './models/animation-detail.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  private list: IAnimationListItemResponse[] = [
    {
      id: 1,
      author: 'Mikorka Kálmán',
      tags: ['asd', 'dsa', 'vicces', 'nagyon', 'tothemoon'],
      description: 'Ez egy rendkívül szofisztikált és vicces gif, ezen felül pedig van hosszu sora amit törni lehet kövi sorba',
      createdAt: '2021.11.30 14:12',
      gifPath: 'assets/placeholders/test.gif'
    },
    {
      id: 1,
      author: 'Mikorka Kálmán',
      tags: ['asd', 'dsa', 'vicces', 'nagyon', 'tothemoon'],
      description: 'Ez egy rendkívül szofisztikált és vicces gif',
      createdAt: '2021.11.30 14:12',
      gifPath: 'assets/placeholders/test.gif'
    },
    {
      id: 1,
      author: 'Mikorka Kálmán',
      tags: ['asd', 'dsa', 'vicces', 'nagyon', 'tothemoon'],
      description: 'Ez egy rendkívül szofisztikált és vicces gif',
      createdAt: '2021.11.30 14:12',
      gifPath: 'assets/placeholders/test.gif'
    },
    {
      id: 1,
      author: 'Mikorka Kálmán',
      tags: ['asd', 'dsa', 'vicces', 'nagyon', 'tothemoon'],
      description: 'Ez egy rendkívül szofisztikált és vicces gif',
      createdAt: '2021.11.30 14:12',
      gifPath: 'assets/placeholders/test.gif'
    },
    {
      id: 1,
      author: 'Mikorka Kálmán',
      tags: ['asd', 'dsa', 'vicces', 'nagyon', 'tothemoon'],
      description: 'Ez egy rendkívül szofisztikált és vicces gif',
      createdAt: '2021.11.30 14:12',
      gifPath: 'assets/placeholders/test.gif'
    }
  ];

  private detail: IAnimationDetail = {
    animation:     {
      id: 1,
      author: 'Mikorka Kálmán',
      tags: ['asd', 'dsa', 'vicces', 'nagyon', 'tothemoon'],
      description: 'Ez egy rendkívül szofisztikált és vicces gif',
      createdAt: new Date('2021.11.30 14:12'),
      gifPath: 'assets/placeholders/test.gif'
    },
    comments: [
      {
        id: 1,
        content: 'Wow, ez nagyon adja.',
        user: {
          id: 1,
          name: 'Tesz Tamás'
        }
      },
      {
        id: 1,
        content: 'Ilyet még nem ettem!',
        user: {
          id: 1,
          name: 'Teszt Elek'
        }
      },
      {
        id: 1,
        content: 'Hogy vigyen el a rosseb mi ez a szenny amit ide mertél posztolni?',
        user: {
          id: 1,
          name: 'Aggre Szilveszter'
        }
      },
      {
        id: 1,
        content: 'Nekem nagyon bejön ahogy fogja és gyengéden, óvatosan megfogja az elé rakott monitort és azzal a lendülettel nekiklöki',
        user: {
          id: 1,
          name: 'Tesz Tamás'
        }
      },
      {
        id: 1,
        content: 'Wow, ez nagyon adja.',
        user: {
          id: 1,
          name: 'Tesz Tamás'
        }
      },
    ]
  };

  constructor() { }

  getAnimationList(query: string = null): Observable<IAnimationListItem[]> {
    return of(this.list).pipe(
      map((list: IAnimationListItemResponse[]) => this.mapAnimationList(list))
    );
  }

  getAnimationDetail(id: number) {
    return of(this.detail);
  }

  private mapAnimationList(list: IAnimationListItemResponse[]): IAnimationListItem[] {
    return list.map((item: IAnimationListItemResponse) => {
      const mappedItem: IAnimationListItem = {
        id: item.id,
        author: item.author,
        tags: item.tags,
        description: item.description,
        createdAt: new Date(item.createdAt),
        gifPath: item.gifPath
      };
      return mappedItem;
    });
  }
}
