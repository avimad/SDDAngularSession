import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addMr'
})
export class AddMrPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    const newStr = `Mr. ${value}`;
    return newStr;
  }

}
