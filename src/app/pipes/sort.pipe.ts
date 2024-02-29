import { Pipe, PipeTransform } from '@angular/core';
import { IData, SortTypes } from '../types';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(data: IData[], field: string, type: SortTypes): IData[] {
    const i = field as keyof IData;
    if(type === SortTypes.DESC) {
      data.sort((a, b) => (a[i] > b[i] ? -1 : 1))
    } else {
      data.sort((a, b) => (a[i] < b[i] ? -1 : 1))
    }
    return data;
  }
}
