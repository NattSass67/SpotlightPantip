import { createSlice } from '@reduxjs/toolkit';

interface SessionState {
  roomRecommend: any;
  sidebarContent: any;
  highlightContent: any;
  announceContent: any;
  clubContent: any;
  taghitContent: any;
  suggestTopicBehavior: any;
  suggestTopicPopular: any;
  pickPantip: any;
  hitzPantip: any;
  tagChoosen: string;
  roomChoosen: string;
  reachTop: boolean;
  loading: boolean; // Add loading state to track API request status
}

const initialState: SessionState = {
  roomRecommend: null,
  sidebarContent: null,
  highlightContent: [],
  announceContent: null,
  clubContent: null,
  taghitContent: null,
  suggestTopicBehavior: null,
  suggestTopicPopular: null,
  pickPantip: null,
  hitzPantip: null,
  roomChoosen: '',
  tagChoosen: '',
  reachTop: true,
  loading: false, // Initialize loading state
};

/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */
const sessionSlice = createSlice({
  name: 'fetching',
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true; // Set loading state to true when login starts
    },
    fetchSuccess(state) {
      state.loading = false; // Set loading state to false when login succeeds
    },
    fetchRoomRecommend(state, action) {
      state.roomRecommend = action.payload;
    },
    fetchSidebarContent(state, action) {
      state.sidebarContent = action.payload;
    },
    fetchHighlightContent(state, action) {
      state.highlightContent = action.payload;
    },
    fetchAnnounceContent(state, action) {
      state.announceContent = action.payload;
    },
    fetchClubContent(state, action) {
      state.clubContent = action.payload;
    },
    fetchTaghitContent(state, action) {
      state.taghitContent = action.payload;
    },
    fetchSuggestTopicBehavior(state, action) {
      state.suggestTopicBehavior = action.payload;
    },
    fetchSuggestTopicPopular(state, action) {
      state.suggestTopicPopular = action.payload;
    },
    fetchPickPantip(state, action) {
      state.pickPantip = action.payload;
    },
    fetchHitzPantip(state, action) {
      state.hitzPantip = action.payload;
    },
    setTagChoosen(state, action) {
      state.tagChoosen = action.payload;
    },
    setReachTop(state, action) {
      state.reachTop = action.payload;
    },
    setRoomChoosen(state, action) {
      state.roomChoosen = action.payload;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchRoomRecommend,
  fetchSidebarContent,
  fetchHighlightContent,
  fetchAnnounceContent,
  fetchClubContent,
  fetchTaghitContent,
  fetchSuggestTopicBehavior,
  fetchSuggestTopicPopular,
  fetchPickPantip,
  fetchHitzPantip,
  setTagChoosen,
  setReachTop,
  setRoomChoosen,
} = sessionSlice.actions;

export default sessionSlice.reducer;
