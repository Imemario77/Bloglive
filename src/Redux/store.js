import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/rootReducer.js";

const persisteConfig = {
  key: "root",
  storage,
};

const PersistedReducer = persistReducer(persisteConfig, rootReducer);

const store = createStore(PersistedReducer);

const persistor = persistStore(store);

export { persistor };
export default store;
