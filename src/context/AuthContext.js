import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { encode, decode } from "js-base64";
import { request } from "../utils/HttpRequest";
import { ROUTES } from "../constant/Routes";

export const AuthContext = createContext({
  auth: false,
  info: {},
  login: () => {},
  logout: () => {},
  getToken: () => {},
  setToken: () => {},
  checkToken: () => {},
});

export const AuthContextProvider = (props) => {
  const navigate = useNavigate();
  const AuthKey = "AuthInfo";
  const localStorageInfo = localStorage.getItem(AuthKey);
  const [authState, setAuthState] = useState(() => {
    if (localStorageInfo !== null) {
      return JSON.parse(
        decode(decode(decode(decode(decode(localStorageInfo)))))
      );
    }
    return {
      auth: false,
      info: {},
    };
  });

  const fetchInfo = (url) => {
    if (!authState.auth) {
      return;
    }

    if (url === undefined || url === null || url === "") {
      return;
    }
    request(
      url,
      { id: authState.info.id },
      (response) => {
        if (response.state) {
          response.user = { ...response.user, prices: response.prices };
          const userInfo = response.user;
          if (userInfo.isActive == 0) {
            logoutHandler();
            navigate(ROUTES.LOGIN);
            return;
          }
          loginHandler(userInfo);
        }
      },
      (err) => {}
    );
  };

  const checkToken = (url) => {
    if (!authState.auth) {
      return;
    }

    if (url === undefined || url === null || url === "") {
      return;
    }
    const token = getToken(authState.info.userName);
    if (token == null || token == undefined || String(token).trim() == "") {
      logoutHandler();
      navigate(ROUTES.LOGIN);
      return;
    }
    request(
      url,
      { userId: authState.info.id, token: token },
      (response) => {
        if (!response.state) {
          logoutHandler();
          navigate(ROUTES.LOGIN);
        }
      },
      (err) => {}
    );
  };

  const loginHandler = (info) => {
    const newAuth = {
      auth: true,
      info: info,
    };
    setAuthState(newAuth);

    localStorage.setItem(
      AuthKey,
      JSON.stringify(
        encode(encode(encode(encode(encode(JSON.stringify(newAuth))))))
      )
    );
  };

  const logoutHandler = () => {
    setAuthState({
      auth: false,
      info: {},
    });
    localStorage.removeItem(AuthKey);
  };

  const getToken = (userName) => {
    let token = localStorage.tokens;
    if (!token || token.trim() == "") {
      return "";
    }
    token = JSON.parse(token);
    return token[userName] ? token[userName] : "";
  };

  const setToken = (userName, userToken) => {
    let token = localStorage.tokens;
    if (!token || token.trim() == "") {
      localStorage.setItem(
        "tokens",
        JSON.stringify({
          [userName]: userToken,
        })
      );
      return;
    }
    token = JSON.parse(token);
    token[userName] = userToken;
    localStorage.setItem("tokens", JSON.stringify(token));
  };

  const auhtContextValue = {
    auth: authState.auth,
    info: authState.info,
    login: loginHandler,
    logout: logoutHandler,
    fetchInfo: fetchInfo,
    getToken: getToken,
    setToken: setToken,
    checkToken: checkToken,
  };

  return (
    <AuthContext.Provider value={auhtContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
