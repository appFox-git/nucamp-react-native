import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchComments = () => dispatch => {
  return fetch(baseUrl + 'comments')
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMess,
});

export const addComments = comments => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

// action creator is wrapped in an additional function, so redux thunk
// will intercept action creator and stop the dispatch from going to reducer.
// Instead, it will send an asynchronous to the server in baseURL using fetch.
// fetch then returns a promise, to either dispatch the addComments or
// commentsFailed function.
export const fetchCampsites = () => dispatch => {
  dispatch(campsitesLoading());

  return fetch(baseUrl + 'campsites')
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(campsites => dispatch(addCampsites(campsites)))
    .catch(error => dispatch(campsitesFailed(error.message)));
};

export const campsitesLoading = () => ({
  type: ActionTypes.CAMPSITES_LOADING,
});

export const campsitesFailed = errMess => ({
  type: ActionTypes.CAMPSITES_FAILED,
  payload: errMess,
});

export const addCampsites = campsites => ({
  type: ActionTypes.ADD_CAMPSITES,
  payload: campsites,
});

export const fetchPromotions = () => dispatch => {
  dispatch(promotionsLoading());

  return fetch(baseUrl + 'promotions')
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(promotions => dispatch(addPromotions(promotions)))
    .catch(error => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
  type: ActionTypes.PROMOTIONS_LOADING,
});

export const promotionsFailed = errMess => ({
  type: ActionTypes.PROMOTIONS_FAILED,
  payload: errMess,
});

export const addPromotions = promotions => ({
  type: ActionTypes.ADD_PROMOTIONS,
  payload: promotions,
});

export const fetchPartners = () => dispatch => {
  dispatch(partnersLoading());

  return fetch(baseUrl + 'partners')
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(partners => dispatch(addPartners(partners)))
    .catch(error => dispatch(partnersFailed(error.message)));
};

export const partnersLoading = () => ({
  type: ActionTypes.PARTNERS_LOADING,
});

export const partnersFailed = errMess => ({
  type: ActionTypes.PARTNERS_FAILED,
  payload: errMess,
});

export const addPartners = partners => ({
  type: ActionTypes.ADD_PARTNERS,
  payload: partners,
});

// pass in campsiteId of favorite, then wrap in 2nd function (using Redux Thunk)\
// pass in dispatch function. Set up a simulated server response, then dispatch
// the addFavorite function with the campsiteId.
export const postFavorite = campsiteId => dispatch => {
  setTimeout(() => {
    dispatch(addFavorite(campsiteId));
  }, 2000);
};

// standard action creator (no Thunk), returns action object with action type and
// payload which contains campsiteId
export const addFavorite = campsiteId => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: campsiteId,
});

export const deleteFavorite = campsiteId => ({
  type: ActionTypes.DELETE_FAVORITE,
  payload: campsiteId,
});

export const postComment = (campsiteId, rating, author, text) => dispatch => {
  const newComment = {
    campsiteId,
    rating,
    author,
    text,
  };

  newComment.date = new Date().toISOString();

  setTimeout(() => {
    dispatch(addComment(newComment));
  }, 2000);
};

export const addComment = comment =>
  // console.log('Payload "comment" from addComment action creator:'),
  // console.log(comment),
  ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment,
  });
