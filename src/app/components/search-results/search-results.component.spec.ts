import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { Routes } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { KwetterService } from "src/app/services/api/kwetter/kwetter.service";
import { KwetterServiceSpy } from "src/utils/test/kwetterServiceSpy";
import { SearchResultsComponent } from "./search-results.component";

const routes: Routes = [
    {path: "", redirectTo: "/", pathMatch: "full"},
  ];

describe("SearchResultsComponent", () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ SearchResultsComponent ],
        imports: [RouterTestingModule.withRoutes(routes)],
        providers: [
            { provide: KwetterService, useValue: {} },
        ],
    }).overrideComponent(SearchResultsComponent, {
        set: {
            providers: [
                { provide: KwetterService, useClass: KwetterServiceSpy },
            ],
        },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
