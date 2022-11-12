import * as api from './../api';

export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const GET_JOBS = 'GET_JOBS';
export const CREATE_JOB = 'CREATE_JOB';

export const getJobs = (page, setError) => async (dispatch) => {
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


export const createJob = (jobData, setErrors, setMessage, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createJob(jobData);

    dispatch({ type: CREATE_JOB, data });
    navigate(`/job/${data.data.id}`);

    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
    if (error.response.data.errors) {
      setErrors(error.response.data.errors);
    } else {
      setMessage(error.message);
    }
  }
}