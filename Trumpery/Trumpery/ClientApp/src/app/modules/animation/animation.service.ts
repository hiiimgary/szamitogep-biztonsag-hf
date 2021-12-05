import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAnimationListItem, IAnimationListItemResponse } from './models/animation-list-item.interface';
import { IAnimationDetail } from './models/animation-detail.interface';
import { HttpClient } from '@angular/common/http';

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
        isHidden: true,
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

  constructor(private req: HttpClient) { }

  getAnimationList(query: string = null): Observable<IAnimationListItem[]> {
    // return of(this.list).pipe(
    //   map((list: IAnimationListItemResponse[]) => this.mapAnimationList(list))
    // );
    return this.req.get(`caff/search`, { params: {keywords: query}} ).pipe(
      map((res: IAnimationListItemResponse[]) => this.mapAnimationList(res))
    );

  }

  getAnimationDetail(id: number) {
    return this.req.get(`caff/detail/${id}`);
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

  search(keywords) {
    return this.req.get(`caff/search`, { params: {keywords: keywords}} );
  }

  deleteCaff(id) {
    return this.req.delete(`caff/delete/${id}`);
  }

  uploadCaff(file: File) {
    const fd = new FormData();
    fd.append('file', file);

    return this.req.post(`caff/upload`, fd);
  }
}
