import { of } from "rxjs";
import { async as _async} from "rxjs/scheduler/async";

export class StompServiceSpy {
    public watch = jasmine.createSpy("watch").and.callFake(
        () => of(null, _async),
    );
}
