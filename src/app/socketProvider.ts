import * as SockJS from "sockjs-client";
import { environment } from "src/environments/environment";

export function socketProvider() {
    return new SockJS(environment.webApiBaseUrl + "/tweets");
}
