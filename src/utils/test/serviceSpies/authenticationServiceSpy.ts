import { of } from "rxjs";
import { async as _async } from "rxjs/scheduler/async";

export class AuthenticationServiceSpy {
    public login = jasmine.createSpy("login").and.callFake(
        () => of(undefined, _async),
    );

    public isLoggedIn = jasmine.createSpy("isLoggedIn").and.callFake(
        () => of(true, _async),
    );
}
