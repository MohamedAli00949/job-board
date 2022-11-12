import React from 'react';

function Input({
  component,
  formData,
  setFormData,
  setErrors,
  errors,
  name,
  type,
  placeholder,
  ...props
}) {
  const onBlur = (e) => {
    if (!e.target.value) {
      setErrors({ ...errors, [e.target.name]: "This field is required." });
    } else {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const handleInputChange = (e) => {
    if (type !== "number") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
    }

    if (type === 'email') {
      const validateEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      console.log(!validateEmail.test(e.target.value) ? "Invalid email" : '')
      setErrors({
        ...errors,
        [e.target.name]: `${!validateEmail.test(e.target.value) && "Invalid email"}`
      });
    } else {
      if (type === 'number') {
        setErrors({
          ...errors, [e.target.name]:
            Number(e.target.value) < [props?.min] && Number(e.target.value) > [props?.max] ?
              `Invalid ${name}` : ""
        })
      }
    }

    if (e.target.value) {
      setErrors({ ...errors, [e.target.name]: '' })
    } else {
      setErrors({ ...errors, [e.target.name]: "This field is required." });
    }
    console.log(errors);
  }

  return (
    <div
      className={`input-container ${component === 'textarea' ? 'textarea-container' : ""}`}
      style={{ width: type === 'email' && '100%' }}
    >
      {component === "textarea" ? (
        <textarea
          name={name}
          type={type}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleInputChange}
          required
          onBlur={onBlur}
          {...props}
          style={{
            borderColor: errors[name] && "#f00"
          }}
        >
        </textarea>
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleInputChange}
          required
          onBlur={onBlur}
          {...props}
          style={{
            borderColor: errors[name] && "#f00"
          }}
        />
      )}
      {errors[name] && (<span className='error'>{errors[name]}</span>)}
    </div>
  );
}

export default Input;