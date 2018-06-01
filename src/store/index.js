import rootReducer from "./reducers";
import { createStore } from "redux";

export function configureStore() {
    const store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}
