import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { store } from "./store";
import CellList from "./components/CellList";

import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
