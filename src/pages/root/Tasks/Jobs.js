import React, { useEffect, useState } from 'react';
import Job from './Job/Job';
import { getJobs } from '../../../actions/jobs';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@chakra-ui/react';

import './style.css';
import Message from '../../../components/Message/Message';

function Tasks() {
  const [error, setError] = useState('');
  const { jobs, isLoading, current_page, per_page, total } = useSelector(state => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (jobs.length === 0 && total === undefined) {
      dispatch(getJobs(1, setError));
    }
    // eslint-disable-next-line
  }, [jobs.length, total]);

  const loadMore = () => {
    dispatch(getJobs(current_page + 1, setError));
  }

  return (
    <section className='down-side' id='jobs'>
      <div className='container'>
        {error.length > 0 && (<Message message={error} type="error" setMessage={setError} />)}
        <h1>Job lesting</h1>
        <div className='jobs-list'>
          {(isLoading && jobs.length === 0) ? (
            <div className='loading-container'>
              <CircularProgress isIndeterminate color='#00d363' thickness='5px' size="100px" />
            </div>
          ) : (
            <>
              {
                jobs.map((job) => (
                  <Job data={job} key={job.id} />
                ))
              }
            </>
          )}
          {isLoading && jobs.length !== 0 && (
            <div className='loading-container'>
              <CircularProgress isIndeterminate color='#00d363' thickness='5px' size="100px" />
            </div>
          )}
        </div>
        {(total / per_page > current_page && !isLoading) && (
          <div className='more-jobs'>
            <button className='main-button' aria-label='more jobs' onClick={loadMore}>load more</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Tasks;