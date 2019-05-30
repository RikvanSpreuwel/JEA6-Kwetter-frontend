import { of } from "rxjs";
import { async as _async } from "rxjs/scheduler/async";

export class UserServiceSpy {
    public get = jasmine.createSpy("get").and.callFake(
        () => of([], _async),
    );

    public getById = jasmine.createSpy("getById").and.callFake(
        () => of(undefined, _async),
    );

    public getCurrentUser = jasmine.createSpy("getCurrentUser").and.callFake(
        () => of(undefined, _async),
    );

    public followUser = jasmine.createSpy("followUser").and.callFake(
        () => of(true, _async),
    );

    public unFollowUser = jasmine.createSpy("unFollowUser").and.callFake(
        () => of(true, _async),
    );
}
