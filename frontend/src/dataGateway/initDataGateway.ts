import DataGateway from "../../../common/src/dataGateway/DataGateway";
// #if process.env.DEMO === "demo"
import MockGateway from "../../../common/src/dataGateway/mockGateway/MockGateway";
// #endif
// #if process.env.DEMO !== "demo"
import BackendGateway from "../../../common/src/dataGateway/backendGateway/BackendGateway";
// #endif

export function initDataGateway() {
  // #if process.env.DEMO === "demo"
  console.log("Demo mode");
  DataGateway.SetDataGatewayImplementation(MockGateway)
  // #endif
  // #if process.env.DEMO !== "demo"
  DataGateway.SetDataGatewayImplementation(BackendGateway);
  // #endif
}
