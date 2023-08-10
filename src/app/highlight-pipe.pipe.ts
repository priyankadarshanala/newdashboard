import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightPipe'
})
export class HighlightPipePipe implements PipeTransform {
  searchText: any;

  transform(value: string, searchText: string): string {
    if (!searchText || !value) {
      return value;
    }

    const regex = new RegExp(searchText, 'gi');
    return value.replace(regex, match => `<span class="highlight">${match}</span>`);
  }
  // highlightSearchText(text: string): string {
  //   if (!this.searchText || !text) {
  //     return text;
  //   }
  
  //   const searchRegex = new RegExp(this.searchText, 'gi');
  //   return text.replace(searchRegex, match => `<span class="highlight">${match}</span>`);
  // }
  
}