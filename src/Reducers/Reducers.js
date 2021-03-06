import { combineReducers } from 'redux';
import DebugLog from '../Utils///DebugLog';

import {
  ADD_GAYMER, ADD_GAYMER_REQUEST, ADD_GAYMER_FAILURE, ADD_GAYMER_SUCCESS,

  GET_GAYMERS, GET_GAYMERS_REQUEST, GET_GAYMERS_FAILURE, GET_GAYMERS_SUCCESS, GET_GAYMERS_EMPTY,

  SET_GAMES, SET_GAMES_REQUEST, SET_GAMES_FAILURE, SET_GAMES_SUCCESS,

  GET_GAMES, GET_GAMES_REQUEST, GET_GAMES_FAILURE, GET_GAMES_SUCCESS, GET_GAMES_EMPTY,

  TOGGLE_SELECTED_GAME,

  COMPUTE_STREAM_COUNTS,

  GET_TWITCH_LIVE_STREAMS, GET_TWITCH_LIVE_STREAMS_REQUEST, GET_TWITCH_LIVE_STREAMS_FAILURE, GET_TWITCH_LIVE_STREAMS_SUCCESS, GET_TWITCH_LIVE_STREAMS_EMPTY,
  GET_TWITCH_LIVE_STREAMS_BY_GAME_SUCCESS,
  
  UPDATE_GAYMER_ONLINE_STATUS_REQUEST, UPDATE_GAYMER_ONLINE_STATUS_COMPLETE,

  SET_GAME_FILTER,
  GameFilters } from '../Actions/Actions';


/*
 * reduces gaymersForSelectedGame
 */
export function addGaymer(state = {
  isFetching: false,
  isSuccess: false,
  hasError: false,
  status: undefined,
  streamPlatform: 'Twitch',
  gaymerName: undefined,
  gaymerId: undefined
   }, action){
  switch(action.type){
    case ADD_GAYMER:
    case ADD_GAYMER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isSuccess: false,
        hasError: false,
        status: action.status,
        streamPlatform: action.streamPlatform,
        gaymerName: action.gaymerName
      });
    case ADD_GAYMER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: false,
        hasError: true,
        status: action.status,
        streamPlatform: action.streamPlatform,
        gaymerName: action.gaymerName,
      });
    case ADD_GAYMER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: true,
        hasError: false,
        status: action.status,
        streamPlatform: action.streamPlatform,
        gaymerName: action.gaymerName,
        gaymerId: action.gaymerId
      });
    default:
      return state;
  }
}


/*
 * reduces getGaymersRequest
 */
export function getGaymers(state = {
  isFetching: false,
  isSuccess: false,
  hasError: false,
  status: undefined,
  gaymers: []
   }, action){

  switch(action.type){
    case GET_GAYMERS:
    case GET_GAYMERS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isSuccess: false,
        hasError: false,
        status: action.status
      });
    case GET_GAYMERS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: false,
        hasError: true,
        status: action.status
      });
    case GET_GAYMERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: true,
        hasError: false,
        status: action.status,
        gaymers: action.gaymers
      });
    case GET_GAYMERS_EMPTY:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: true,
        hasError: false,
        status: action.status
      });
    case UPDATE_GAYMER_ONLINE_STATUS_REQUEST:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: true,
        hasError: false,
        status: action.status
      });
    case UPDATE_GAYMER_ONLINE_STATUS_COMPLETE:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: true,
        hasError: false,
        status: action.status,
        gaymers: action.gaymers
      });
    default:
      return state;
  }
}

/*
 * reduces getGames
 */
export function getGames(state = {
  isFetching: false,
  isSuccess: false,
  status: undefined,
  games: []
  }, action){

  //DebugLog('*****GETGAMES getGames', state);
  switch(action.type){
    case GET_GAMES:
    case GET_GAMES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isSuccess: false,
        status: action.status,
        games: []
      });
    case GET_GAMES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: false,
        status: action.status,
        games: []
      });
    case GET_GAMES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: true,
        status: action.status,
        games: setSelectedGame("All Games", action.games)
      });
    case GET_GAMES_EMPTY:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: true,
        status: action.status,
        games: []
      });
    case TOGGLE_SELECTED_GAME:

      DebugLog('TOGGLE_SELECTED_GAME', state);
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: true,
        status: action.status,
        games: setSelectedGame(action.game, state.games)
      });
    case COMPUTE_STREAM_COUNTS:
      DebugLog('%%%REDUCER COMPUTE_STREAM_COUNTS', action);
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: true,
        status: action.status,
        games: computeStreamCountsForGames(action.games, action.liveStreams)
      })
      break;

    default:
      return state;
  }
}

function computeStreamCountsForGames(games, liveStreams){
  DebugLog('*****computeStreamCountsForGames games', games);
  DebugLog('computeStreamCountsForGames, liveStreams', liveStreams);

  if (games === null || games === undefined || games.length === 0) {
    DebugLog('%%%%%RETURNING GAMES games',games);
    return games;
  }
  if (liveStreams === null || liveStreams === undefined || liveStreams.length === 0) {
    DebugLog('%%%%%RETURNING GAMES liveStreams', liveStreams);
    return games;
  }

  for (let i = 0; i < games.length; i+=1){
    let game = games[i];
    game['streamerCount'] = 0;
    for (let j = 0; j < liveStreams.length; j+=1){
      let liveStream = liveStreams[j];
      if (game.name === liveStream.game){
        game['streamerCount'] += 1;
      }
    }
  }

  DebugLog('*****computeStreamCountsForGames games',games);
  return games;
}

function setSelectedGame(game, games){
  let arr = [];
  for (let k = 0; k < games.length; k+=1){
    let g = games[k];
    if (game && game === g['name']){
      g['selected'] = true;
    } else {
      g['selected'] = false;
    }
    arr.push(g);
  }
  DebugLog('*****setSelectedGame', games);
  return arr;
}

/*
 * reduces setGames
 */
export function setGames(state = {
  isFetching: false,
  isSuccess: false,
  status: undefined,
  games: []
   }, action){

  switch(action.type){
    case SET_GAMES:
    case SET_GAMES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isSuccess: false,
        status: action.status,
        games: []
      });
    case SET_GAMES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: false,
        status: action.status,
        games: []
      });
    case SET_GAMES_SUCCESS:
      DebugLog('SET_GAMES_SUCCESS state.games', state.games)
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: true,
        status: action.status
      });
    default:
      return state;
  }
}


/*
 * reduces gaymersForSelectedGame
 */
export function gaymersForSelectedGame(state = [], action){

  // TODO: Implement
  // For now, don't handle any actions and just return the state given to us.
  return state;
}

/*
 * reduces selectedGame
 */
export function selectedGame(state = 'Overwatch', action){


  // console.log('selectedGame reducer state:', state);
  // console.log('selectedGame reducer action:', action);
  // TODO: Implement
  // For now, don't handle any actions and just return the state given to us.
  return state;
}

/*
 * reduces twitchLiveStreamsList
 */
export function twitchLiveStreamsList(state = {
    isFetching: false,
    status: undefined,
    isSuccess: false,
    liveStreamsForGame: [],
    liveStreams: [],
    game: undefined
  }, action){
  switch (action.type){
    case GET_TWITCH_LIVE_STREAMS:
    case GET_TWITCH_LIVE_STREAMS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        status: action.status,
        game: action.game
      });
    case GET_TWITCH_LIVE_STREAMS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        status: action.status,
        game: action.game
      });
    case GET_TWITCH_LIVE_STREAMS_SUCCESS:

      DebugLog('GET_TWITCH_LIVE_STREAMS_SUCCESS',action);

      return Object.assign({}, state, {
        isFetching: false,
        status: action.status,
        isSuccess: true,
        liveStreams: action.liveStreams,
        game: action.game
      });
    case GET_TWITCH_LIVE_STREAMS_EMPTY:
      DebugLog('GET_TWITCH_LIVE_STREAMS_EMPTY',action);

      return Object.assign({}, state, {
        isFetching: false,
        status: action.status,
        isSuccess: true,
        liveStreams: [],
        game: undefined
      });
    case GET_TWITCH_LIVE_STREAMS_BY_GAME_SUCCESS:
      DebugLog('GET_TWITCH_LIVE_STREAMS_BY_GAME_SUCCESS state', state);
      DebugLog('GET_TWITCH_LIVE_STREAMS_BY_GAME_SUCCESS action', action);

      return Object.assign({}, state, {
        isFetching: false,
        status: action.status,
        isSuccess: true,
        liveStreamsForGame: action.liveStreamsForGame,
        liveStreams: state.liveStreams,
        game: action.game
      });
    default:
      return state;
  }
}

/*
 * reduces gameFilter
 */
export function gameFilter(state = GameFilters.SORT_BY_MOST_VIEWERS, action){
  switch (action.type){
    case SET_GAME_FILTER:
      return action.filter;
    default:
      return state;
  }
}

/*
 * root reducer
 */
const GaymerBearsAppReducer = combineReducers({
  addGaymer,
  getGaymers,
  getGames,
  setGames,
  gaymersForSelectedGame,
  selectedGame,
  twitchLiveStreamsList,
  gameFilter
});

export default GaymerBearsAppReducer;
