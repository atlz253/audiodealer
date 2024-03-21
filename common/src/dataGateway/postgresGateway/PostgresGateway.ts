import AbstractGateway from "../abstractGateway/AbstractGateway";
import Contracts from "./Contracts";
import Products from "./Products";

class PostgresGateway extends AbstractGateway {
  public static get Products() {
    return Products;
  }

  public static get Contracts() {
    return Contracts;
  }
}

export default PostgresGateway;
