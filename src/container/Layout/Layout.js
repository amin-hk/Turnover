import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "../../constant/Routes";
import { AuthContext } from "../../context/AuthContext";
import Main from '../../components/Main'

const getRoutes = (props) => {
  const routes = [
    {
      path: ROUTES.MAIN,
      element: <Main/>,
    }
  ];

  return (
    <div className="p-4">
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route
              key={`ROUTE_${index}`}
              path={route.path}
              element={route.element}
            ></Route>
          );
        })}
      </Routes>
    </div>
  );
};


const Layout = (props) => {
  const authContext = useContext(AuthContext);

  return (
    <>
      {getRoutes(props)}
    </>
  );
};

export default Layout;
