import React, { Suspense, lazy, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@chakra-ui/react';
import { AiFillCamera } from 'react-icons/ai';

import './styles.css';
import Message from '../../components/Message/Message'
import { createJob } from '../../actions/jobs';
import { useNavigate } from 'react-router-dom';

const Navbar = lazy(() => import('../../components/Navbar/Navbar'));
const Input = lazy(() => import('../../components/Input/Input'));

const initialData = {
  "title": "",
  "description": "",
  "vacancy": "",
  "salary": "",
  "type": 1,
  "location": "",
  "company_name": "",
  "company_email": ""
}

function NewJob() {
  const { isLoading } = useSelector(state => state.jobs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const [logoFile, setLogoFile] = useState(undefined);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [imageSrc, setImageSrc] = useState('');

  if (isLoading && !Object.values(formData).includes('')) {
    return (
      <div>
        <div className='big-loading'>
          <CircularProgress isIndeterminate color='#00d363' thickness='6px' size="250px" />
        </div>
      </div>
    )
  }

  const handleChangePicture = (e) => {
    console.log(e.target.files[0]);
    setLogoFile(e.target.files[0]);
    setImageSrc(URL?.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataValues = Object.values(formData);
    if (formDataValues.includes('')) {
      setMessage("Please complete form data");
      Object.entries(formData).forEach(([key, value]) => {
        if (!value) {
          setErrors({ ...errors, [key]: "This field is required." })
          console.log(key);
        }
      })
    }

    console.log(logoFile)
    const logoFormData = new FormData();
    logoFormData.set('file', logoFile);
    const uploadedImage = await fetch(
      'https://gdsc-job-app.herokuapp.com/api/upload',
      { method: 'POST', body: logoFormData }
    );

    const logoData = await uploadedImage.json();

    await dispatch(createJob({ ...formData, company_logo: logoData.path }, setErrors, setMessage, navigate));
  }

  return (
    <Suspense fallback={<>
      <div className='big-loading'>
        <CircularProgress isIndeterminate color='#00d363' thickness='6px' size="250px" />
      </div>
    </>}>
      {message && (<Message message={message} type="error" setMessage={setMessage} />)}
      {isLoading && (
        <div>
          <div className='big-loading'>
            <CircularProgress isIndeterminate color='#00d363' thickness='6px' size="250px" />
          </div>
        </div>
      )}
      <section className='upper-side'>
        <div className='container'>
          <Navbar />
          <div className='hero'>
            <div className='left' data-aos="flip-left">
              <h1>New Job</h1>
            </div>
          </div>
        </div>
      </section>
      <section className='down-side more-details'>
        <div className='container'>
          <div className='inner-container' style={{
            flexDirection: "column"
          }}>
            <h1>Create a new job</h1>
            <form className='new-job' onSubmit={handleSubmit}>
              {/* <div className='block'></div> */}
              <div
                className='block'
                style={{ justifyContent: 'flex-start' }}
              >
                <Input
                  name='title'
                  type='text'
                  placeholder="job title"
                  setErrors={setErrors}
                  errors={errors}
                  formData={formData}
                  setFormData={setFormData}
                />
                <Input
                  name='company_name'
                  type="text"
                  placeholder='company name'
                  setErrors={setErrors}
                  errors={errors}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div
                className='block'
                style={{ justifyContent: 'flex-start' }}
              >
                <Input
                  name='vacancy'
                  type="number"
                  placeholder='vacancy'
                  setErrors={setErrors}
                  errors={errors}
                  formData={formData}
                  setFormData={setFormData}
                />
                <Input
                  name='salary'
                  type="text"
                  placeholder='salary'
                  setErrors={setErrors}
                  errors={errors}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div
                className='block'
                style={{ justifyContent: 'flex-start' }}
              >
                <Input
                  name="type"
                  type="number"
                  min="1"
                  max="2"
                  required
                  placeholder='job type'
                  setErrors={setErrors}
                  errors={errors}
                  formData={formData}
                  setFormData={setFormData}
                />
                <Input
                  name="location"
                  type="text"
                  placeholder="location"
                  setErrors={setErrors}
                  errors={errors}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div
                className='block'
              >
                <Input
                  name='company_email'
                  type="email"
                  placeholder='company email'
                  setErrors={setErrors}
                  errors={errors}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div
                className='block avatar-description'
              >
                <Input
                  component="textarea"
                  name='description'
                  placeholder='job description'
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                  setErrors={setErrors}
                />
                <div className="change-avatar" style={{ margin: "5px" }}>
                  <label
                    htmlFor="icon-button-file"
                    style={{ backgroundImage: `url(${imageSrc})` }}>
                    {!imageSrc && (
                      <p>Company logo</p>
                    )}
                    <input
                      onChange={handleChangePicture}
                      accept="image/*"
                      id="icon-button-file"
                      type="file" />
                    <span aria-label="upload picture">
                      <AiFillCamera />
                    </span>
                  </label>
                </div>
              </div>
              <div className='block'>
                <button
                  type='submit'
                  className='main-button'
                  disabled={
                    !logoFile ||
                    Object.values(formData).includes("") ||
                    Object.values(formData).includes(0)
                  }>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Suspense>
  );
}

export default NewJob;