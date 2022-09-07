import React from "react";
import RoutContainer from "./container/RoutContainer";
import * as DeviceInfo from "react-device-detect";

const App = () => {
  return (
    <div className="app p-1 bg-l_primary dark:bg-b_primary">
      <RoutContainer />
    </div>
  );
};

export default App;
