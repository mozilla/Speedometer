import { render } from "react-dom";
import { Provider } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import App from "./components/app";
import LocationHandler from "./components/app";
import { store } from "./store";
import "todomvc-app-css/index.css";

render(
    <Provider store={store}>
        <HashRouter>
            <LocationHandler />
            <Route path="*" component={App} />
        </HashRouter>
    </Provider>,
    document.getElementById("root")
);
