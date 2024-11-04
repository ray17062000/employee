import { Pipe, PipeTransform } from '@angular/core';
import {Employee} from './employee'

@Pipe({
  name: 'namefilter'
})
export class NamefilterPipe implements PipeTransform {

  transform(EmpCollection: Employee[], filterinput: string): Employee[] {

    if(filterinput)
    {
      return EmpCollection.filter(x => x.name.toUpperCase().startsWith(filterinput.toUpperCase()));
    }
    else 
    {
      return EmpCollection;
    }
    
  }

}