import React from 'react';
import { Link } from 'react-router-dom';

import HeartSvg from '../../../../utils/heartSvg'

function Job({ data }) {
  const date = new Date(data.created_at);
  const dateArr = date.toUTCString().split(" ").splice(1);

  const saveJob = () => { };

  return (
    <div className='job'>
      <div className='job-container'>
        <Link to={`/job/${data.id}`} className="background-link"></Link>
        <div className='company-logo'>
          <img src={data?.company_logo} alt="company logo" />
        </div>
        <div className='job-details'>
          <div className='row'>
            <p className='title'>{data.title}</p>
            <div className='job-buttons'>
              <button className='save-job' aria-label='save job' onClick={saveJob}><HeartSvg /></button>
              <Link className='main-button apply-now' to={`/job/${data.id}`}>apply now</Link>
            </div>
          </div>
          <div className='row' style={{ marginTop: 12 }}>
            <div className='other-data'>
              <p className='company-name'>{data.company_name}</p>
              <p className='location'>{data.location}</p>
              <p className='job-type'>{data.type === 1 ? "full time" : data.type === 2 ? 'part time' : 'freelance'}</p>
            </div>
            <p className='publish-date'>publishd: {dateArr[0] + " " + dateArr[1] + ", " + dateArr[2]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Job;