import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import { cartApi } from "./cartApi";
import { productApi } from "./productApi";
import { orderApi } from "./orderApi";
import { wishlistApi } from "./wishlistApi";
import { artistApi } from "./artistApi";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "cart"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  [artistApi.reducerPath]: artistApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(cartApi.middleware)
      .concat(productApi.middleware)
      .concat(orderApi.middleware)
      .concat(wishlistApi.middleware)
      .concat(artistApi.middleware),
});

export let persistor = persistStore(store);
