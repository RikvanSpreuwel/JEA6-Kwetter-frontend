import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { KwetterService } from 'src/app/services/api/kwetter/kwetter.service';
import { Kwetter } from 'src/app/models/kwetter';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input() public searchParam: string;
  @Output() clearSearchParam = new EventEmitter();

  public searchResults: Kwetter[] = [];

  constructor(
    private kwetterService: KwetterService) { 
   }

  ngOnInit() {
    this.kwetterService.searchByMessage(this.searchParam).subscribe((searchResults) => { 
      this.searchResults = searchResults as Kwetter[];
    });
  }

  public clear() {
    this.clearSearchParam.emit();
  }
}
