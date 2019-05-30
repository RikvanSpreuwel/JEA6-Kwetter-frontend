import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({ selector: "app-search-results", template: "" })
export class SearchResultsComponentStub {
    @Input() public searchParam: string;
    @Output() public clearSearchParam = new EventEmitter();

}
