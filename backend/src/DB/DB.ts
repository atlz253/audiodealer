import Admins from "./Admins";
import Authorizations from "./Authorizations";
import Banks from "./Banks";
import Categories from "./Categories";
import Clients from "./Clients";
import CompanyNames from "./CompanyNames";
import Dealers from "./Dealers";
import FirstNames from "./FirstNames";
import Manufacturers from "./Manufacturers";
import Providers from "./Providers";

class DB { /* TODO: DataGateway inheritance */
  public static get Categories(): typeof Categories {
    return Categories;
  }

  public static get Manufacturers(): typeof Manufacturers {
    return Manufacturers;
  }

  public static get Banks(): typeof Banks {
    return Banks;
  }

  public static get Clients(): typeof Clients {
    return Clients;
  }

  public static get Admins(): typeof Admins {
    return Admins;
  }

  public static get Autorizations(): typeof Authorizations {
    return Authorizations;
  }

  public static get FirstNames(): typeof FirstNames {
    return FirstNames;
  }

  public static get Dealers(): typeof Dealers {
    return Dealers;
  }

  public static get Providers(): typeof Providers {
    return Providers;
  }

  public static get CompanyNames(): typeof CompanyNames {
    return CompanyNames;
  }
}

export default DB;
