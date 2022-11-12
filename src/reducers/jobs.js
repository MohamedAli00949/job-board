import { START_LOADING, END_LOADING, GET_JOBS } from "../actions/jobs";

// eslint-disable-next-line
export default (state = { jobs: [], isLoading: false, current_page: 1, per_page: null, total: undefined }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    case GET_JOBS:
      return {
        ...state,
        jobs: state.jobs.concat(action.data.data),
        current_page: action.data.meta.current_page,
        per_page: action.data.meta.per_page,
        total: action.data.meta.total
      }
    default:
      return state;
  }
}