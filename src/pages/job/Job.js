import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getJob } from '../../api';
import Message from '../../components/Message/Message';

const Navbar = lazy(() => import('../../components/Navbar/Navbar'));

function Job() {
  const { id } = useParams();
  const { jobs, total } = useSelector(state => state.jobs);

  const [job, setJob] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!isNaN(Number(id))) {
        if (!job) {
          setIsLoading(true);
          if (total !== undefined) {
            const jobData = jobs.find((job) => job.id === Number(id));
            setJob(jobData);
          } else {
            const { data } = await getJob(id);
            const jobData = data.data;
            setJob(jobData);
          }
          setIsLoading(false);
        }
      } else {
        setMessage("Invalid Id");
        navigate("/");
      }
    })();

    // eslint-disable-next-line
  }, [job]);

  useEffect(() => {
    if (document?.querySelector('.description-responsibility')) {
      if (job?.description) {
        const description = job.description.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
        const descriptionHTML = document.createElement("div");
        descriptionHTML.classList.add("paragraph");
        descriptionHTML.classList.add("description");
        descriptionHTML.innerHTML = description;
        document.querySelector('.description-responsibility').appendChild(descriptionHTML);
      }
      if (job?.responsibility) {
        const responsibility = job.responsibility.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
        const responsibilityHTML = document.createElement("div");
        responsibilityHTML.classList.add("paragraph");
        responsibilityHTML.classList.add("responsibility");
        responsibilityHTML.innerHTML = responsibility;
        document.querySelector('.description-responsibility').appendChild(responsibilityHTML);
      }
    }

  }, [job]);

  const date = new Date(job?.created_at);
  const dateArr = date.toUTCString().split(" ").splice(1);

  if (isLoading) {
    return (
      <div>
        <div className='big-loading'>
          <CircularProgress isIndeterminate color='#00d363' thickness='6px' size="250px" />
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={<>
      <div className='big-loading'>
        <CircularProgress isIndeterminate color='#00d363' thickness='6px' size="250px" />
      </div>
    </>}>
      {message && (<Message message={message} type="error" setMessage={setMessage} />)}
      <section className='upper-side'>
        <div className='container'>
          <Navbar />
          <div className='hero'>
            <div className='left' data-aos="flip-left">
              <h1>{job?.title}</h1>
              <h2>{job?.company_name}</h2>
            </div>
          </div>
        </div>
      </section>
      <section className='down-side more-details'>
        <div className='container'>
          <div className='inner-container'>
            <div className='right'>
              <div className='job-descrition'>
                <div className='upper'>
                  <div className='job'>
                    <div className='job-container'>
                      <div className='company-logo'>
                        <img src={job?.company_logo} alt="company logo" width="100" height="100" />
                      </div>
                      <div className='job-details'>
                        <div className='col col1'>
                          <p className='title'>{job?.title}</p>
                          <div className='other-data'>
                            <p className='company-name'>{job?.company_name}</p>
                            <p className='location'>{job?.location}</p>
                            <p className='job-type'>{job?.type === 1 ? "full time" : job?.type === 2 ? 'part time' : 'freelance'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='description-responsibility'>
                </div>
              </div>
              <div className='appling-data'>
                <h2>Apply for the job</h2>
                <p>Send your CV to our email at: <span>{job?.company_email}</span></p>
              </div>
            </div>
            <div className='left'>
              <div className='job-summary'>
                <h2>Job Summary</h2>
                <ul className='summary-data'>
                  <li>
                    <span className='circle'></span>
                    Published on: &nbsp;<span className='value'>{dateArr[0] + " " + dateArr[1] + ", " + dateArr[2]}</span>
                  </li>
                  <li>
                    <span className='circle'></span>
                    vacancy: &nbsp;<span className='value'>{job?.vacancy}</span>
                  </li>
                  <li>
                    <span className='circle'></span>
                    salary: &nbsp;<span className='value'>{job?.salary}</span>
                  </li>
                  <li>
                    <span className='circle'></span>
                    location: &nbsp;<span className='value'>{job?.location}</span>
                  </li>
                  <li>
                    <span className='circle'></span>
                    job nature: &nbsp;<span className='value'>{job?.type === 1 ? "full time" : job?.type === 2 ? 'part time' : 'freelance'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
}

export default Job;