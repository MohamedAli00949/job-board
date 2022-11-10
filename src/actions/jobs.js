import * as api from './../api';

export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const GET_JOBS = 'GET_JOBS';

export const getJobs = (page, setError) => async (dispatch, getState) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getAllJobs(page);

    dispatch({ type: GET_JOBS, data });
    dispatch({ type: END_LOADING })
  } catch (error) {
    setError(error.message);
    console.error(error);
  }
}


// export const uploadLogo = async () => {
  
// }