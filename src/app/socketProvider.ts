import * as SockJS from "sockjs-client";
import { environment } from "src/environments/environment.dev";

export function socketProvider() {
    return new SockJS(environment.webApiBaseUrl + "/tweets");
}
