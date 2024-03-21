import { useContext, useState } from "react";
import { AuthContext } from "../context";
import tryServerRequest from "../utils/tryServerRequest";
import IAuthorization from "../../../common/interfaces/IAuthorization";
import Auth from "../components/Auth/Auth";
import DataGateway from "../../../common/src/dataGateway/DataGateway";

const AuthPage = () => {
  const [loginData, setLoginData] = useState<IAuthorization>({
    login: "",
    password: "",
  });
  const { setAuth } = useContext(AuthContext);

  const auth = async () => {
    tryServerRequest(async () => {
      const response = await DataGateway.Login.Login(loginData);

      sessionStorage.setItem("auth", JSON.stringify(response));

      setAuth(response);
    });
  };

  return (
    <div className="d-flex justify-content-center">
      <Auth loginData={loginData} setLoginData={setLoginData} onSubmit={auth} />
    </div>
  );
};

export default AuthPage;
