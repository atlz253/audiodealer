import { FC, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../context";
import IAuth from "../../../common/interfaces/IAuth";
import { AppRouter } from "./AppRouter";
import API from "../api/API";

const Root: FC = () => {
  const [auth, setAuth] = useState<IAuth | null>(null);

  useEffect(() => {
    let token: string = "";

    if (auth !== null && auth.accessToken !== undefined) {
      token = auth.accessToken;

      API.SetAuthToken(token);
    }
  }, [auth]);

  useEffect(() => {
    const auth = sessionStorage.getItem("auth");

    if (auth !== null) {
      setAuth(JSON.parse(auth));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
        <AppRouter />
    </AuthContext.Provider>
  );
};

export default Root;
