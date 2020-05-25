import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'progress'
})
export class ProgressPipe implements PipeTransform {

  // year, percentage
  transform(progress: [number, number][]): number {

    const totalArray = progress.length;

    let sumOfPercentages = 0;

    for(const x of progress.map(x=>x[1])){
      sumOfPercentages = sumOfPercentages + x;
    }

    let result = (totalArray / sumOfPercentages) * 100;
    if(isNaN(result)) return 0;
    return result;
  }

}
