import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Kwetter } from "src/app/models/kwetter";
import { KwetterService } from "src/app/services/api/kwetter/kwetter.service";

@Component({
  selector: "app-search-results",
  styleUrls: ["./search-results.component.css"],
  templateUrl: "./search-results.component.html",
})
export class SearchResultsComponent implements OnInit {
  @Input() public searchParam: string;
  @Output() public clearSearchParam = new EventEmitter();

  public searchResults: Kwetter[] = [];

  constructor(
    private kwetterService: KwetterService) {
   }

  public ngOnInit() {
    this.kwetterService.searchByMessage(this.searchParam).subscribe((searchResults) => {
      this.searchResults = searchResults as Kwetter[];
    });
  }

  public clear() {
    this.clearSearchParam.emit();
  }
}
