import DataGateway from "./DataGateway";
// #if process.env.DEMO !== "demo"
import BackendGateway from "./backendGateway/BackendGateway";
// #endif

export function initDataGateway() {
  // #if process.env.DEMO === "demo"
  console.log("Demo mode");
  // #endif
  // #if process.env.DEMO !== "demo"
  DataGateway.SetDataGatewayImplementation(BackendGateway);
  // #endif
}
