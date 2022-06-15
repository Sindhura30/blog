import jsonPlaceHolder from "../apis/jsonPlaceHolder";
import _ from 'lodash';

export const fetchPostsAndUsers = () => {
    return async function(dispatch, getState) {
       await dispatch(fetchPosts());
       const userIds =  _.uniq(_.map(getState().posts, 'userId'));
       userIds.forEach(id => dispatch(fetchUser(id)));
    }
}

export const fetchPosts = () => {
    return async function(dispatch) {
        const response = await jsonPlaceHolder.get('/posts');
        dispatch({type: 'FETCH_POSTS', payload: response.data})
    }
}

export const fetchUser = (id) => {
    return async function(dispatch) {
        const response = await jsonPlaceHolder.get(`/users/${id}`)
        dispatch({type: 'FETCH_USER', payload: response.data})
    }
}

// const _fetchUser = _.memoize( async (id, dispatch) => {
//     const response = await jsonPlaceHolder.get(`/users/${id}`)
//     dispatch({type: 'FETCH_USER', payload: response.data})
// })