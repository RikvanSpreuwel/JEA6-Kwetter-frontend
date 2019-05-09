import { of } from "rxjs";
import { async as _async } from "rxjs/scheduler/async";

export class KwetterServiceSpy {
    public get = jasmine.createSpy("get").and.callFake(
        () => of([], _async),
    );

    public getTimeline = jasmine.createSpy("getTimeline").and.callFake(
        () => of([], _async),
    );

    public searchByMessage = jasmine.createSpy("searchByMessage").and.callFake(
        () => of([], _async),
    );

    public createKwetter = jasmine.createSpy("createKwetter").and.callFake(
        () => of(undefined, _async),
    );
}
