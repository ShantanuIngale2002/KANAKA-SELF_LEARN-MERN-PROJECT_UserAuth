import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
    // react-redux : Application wrap/composition : state & action mgmt
    <Provider store={store}>
        {/* redux-persist : Application wrap/composition : data persistence mgmt */}
        <PersistGate persistor={persistor} loading={null}>
            <App />
        </PersistGate>
    </Provider>
);
