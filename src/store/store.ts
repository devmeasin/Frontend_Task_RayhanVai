import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
// import auth from './isAuth';
import { productsApi } from 'store/services/productsApi';

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
    },

    middleware: (gDM) => gDM().concat(productsApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch