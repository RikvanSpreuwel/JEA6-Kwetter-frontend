import { InjectableRxStompConfig, StompConfig } from "@stomp/ng2-stompjs";
import * as SockJS from "sockjs-client";
import { environment } from "src/environments/environment.prod";
import { socketProvider } from "./socketProvider";

export const KwetterStompConfig: StompConfig = {
  // Which server?
  url: socketProvider,

  // Headers
  // Typical keys: login, passcode, host
  headers: {
    login: "guest",
    passcode: "guest",
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 500 (500 milli seconds)
  reconnect_delay: 2000,

  // Will log diagnostics on console
  // It can be quite verbose, not recommended in production
  // Skip this key to stop logging to console
  debug: true,
};
