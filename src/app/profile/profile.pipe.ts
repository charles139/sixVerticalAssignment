import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPosts'
})
export class FilterPostsPipe implements PipeTransform {
    public transform(values: any[], filter: string): any[] {
        if (!values || !values.length) return [];//If no values match or there are zero value - return nothing
        if (!filter) return values;//If no filter - return all values
        
        return values.filter(v => v.userId == filter);// Filter values array, values which match will return true
    }
}