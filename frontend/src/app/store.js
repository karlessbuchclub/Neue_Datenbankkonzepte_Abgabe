import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import reviewReducer from '../features/review/reviewSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    review: reviewReducer,
  },
});
