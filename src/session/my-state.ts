/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import {
  getAnnounce,
  getClub,
  getFilterByRoom,
  getHighlight,
  getPantipHitz,
  getPantipPick,
  getRoomRecommend,
  getSidebarContent,
  getSuggestTopicBehavior,
  getSuggestTopicPopular,
  getTagHit,
  getNextRoomContent,
  getNextPantipHitz,
  getNextPantipPick,
} from '@/services/request'

import {
  fetchAnnounceContent,
  fetchClubContent,
  fetchHighlightContent,
  fetchHitzPantip,
  fetchPickPantip,
  fetchRoomRecommend,
  fetchSidebarContent,
  fetchStart,
  fetchSuccess,
  fetchSuggestTopicBehavior,
  fetchSuggestTopicPopular,
  fetchTaghitContent,
  setReachTop,
  setRoomChoosen,
  setTagChoosen,
  appendHitzContent,
  appendPickContent,
  appendRoomContent,
  fetchSecondStart,
  fetchSecondSuccess
} from './sessionReducers'

export const fetchContent = () => {
  return async (dispatch: any) => {
    dispatch(fetchStart()) // Dispatch loginStart action to set loading state
    try {
      const room = await getRoomRecommend()
      const sidebar = await getSidebarContent()
      const highlight = await getHighlight()
      const announce = await getAnnounce()
      const club = await getClub()
      const taghit = await getTagHit()
      const suggestBehavior = await getSuggestTopicBehavior()
      const suggestPopular = await getSuggestTopicPopular()
      const pick = await getPantipPick()
      const hitz = await getPantipHitz()
      const roomContent = await getFilterByRoom('siliconvalley')
      if (
        sidebar === null ||
        highlight === null ||
        announce === null ||
        club === null ||
        taghit === null ||
        suggestBehavior === null ||
        suggestPopular === null ||
        pick === null ||
        hitz === null
      ) {
        throw new Error('One or more required variables are null.')
      } else {
        dispatch(fetchRoomRecommend(room))
        dispatch(fetchSidebarContent(sidebar))
        dispatch(fetchHighlightContent(roomContent))
        dispatch(fetchAnnounceContent(announce))
        dispatch(fetchClubContent(club))
        dispatch(fetchTaghitContent(taghit))
        dispatch(fetchSuggestTopicBehavior(suggestBehavior))
        dispatch(fetchSuggestTopicPopular(suggestPopular))
        dispatch(fetchPickPantip(pick))
        dispatch(fetchHitzPantip(hitz))
        dispatch(setReachTop(true))
        dispatch(setRoomChoosen('siliconvalley'))
        setTimeout(async () => {
          dispatch(fetchSuccess())
          // Set success after 2000 milliseconds
        }, 2000)
        dispatch(setTagChoosen(''))
      }
    } catch (error) {
      dispatch(fetchSuccess()) // Dispatch loginFailure action if login encounters an error
    }
  }
}

export const getDataRoomChoosen = (room: string) => {
  return async (dispatch: any) => {
    dispatch(fetchStart()) // Dispatch loginStart action to set loading state
    try {
      if (room === '') {
        dispatch(fetchSuccess())
        return
      }
      const res = await getFilterByRoom(room)

      dispatch(fetchHighlightContent(res))
      setTimeout(async () => {
        dispatch(fetchSuccess())
        // Set success after 2000 milliseconds
      }, 2000)
    } catch (error) {
      dispatch(fetchSuccess()) // Dispatch loginFailure action if login encounters an error
    }
  }
}

export const fetchMoreRoomContent = (room: string) => {
  return async (dispatch: any, state: any) => {
    dispatch(fetchSecondStart()) // Dispatch loginStart action to set loading state
    try {
      if (room === '') {
        dispatch(fetchSecondSuccess())
        return
      }
      const res = await getNextRoomContent(
        room,
        state().mySession.highlightContent.next_id,
      )

      setTimeout(async () => {
        dispatch(appendRoomContent(res))
        dispatch(fetchSecondSuccess())
        // Set success after 2000 milliseconds
      }, 2000)
    } catch (error) {
      dispatch(fetchSecondSuccess()) // Dispatch loginFailure action if login encounters an error
    }
  }
}

export const fetchMorePickContent = () => {
  return async (dispatch: any, state: any) => {
    dispatch(fetchSecondStart()) // Dispatch loginStart action to set loading state
    try {
      const res = await getNextPantipPick(
        state().mySession.highlightContent.next_id,
      )

      setTimeout(async () => {
        dispatch(appendPickContent(res))
        dispatch(fetchSecondSuccess())
        // Set success after 2000 milliseconds
      }, 2000)
    } catch (error) {
      dispatch(fetchSecondSuccess()) // Dispatch loginFailure action if login encounters an error
    }
  }
}

export const fetchMoreHitzContent = () => {
  return async (dispatch: any, state: any) => {
    dispatch(fetchSecondStart()) // Dispatch loginStart action to set loading state
    try {
     
      const res = await getNextPantipHitz(
        state().mySession.hitzPantip.next_id,
      )

      setTimeout(async () => {
        dispatch(appendHitzContent(res))
        dispatch(fetchSecondSuccess())
        // Set success after 2000 milliseconds
      }, 2000)
    } catch (error) {
      dispatch(fetchSecondSuccess()) // Dispatch loginFailure action if login encounters an error
    }
  }
}
