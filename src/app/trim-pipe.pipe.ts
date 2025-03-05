import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'trimPipe',
    standalone: false
})
export class TrimPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.replace(/^(.{61}[^\s]*).*/, "$1") +"...";
  }

}
