import React from 'react'
import './FormInput.css'

const FormInput = (props) => {
    const { upperLabel, bottomLabel, type, name, handleChange, value, htmlFor, inputType} = props;
    return (
      <div className="input-wrapper">
        <label className="top" htmlFor={htmlFor}>
          {upperLabel}
        </label>
        {
          {
            input: (
              <input
                id={htmlFor}
                type={type}
                name={name}
                onChange={handleChange}
                value={value}
              />
            ),
            textArea: (
              <textarea
                id={htmlFor}
                type={type}
                name={name}
                onChange={handleChange}
                value={value}
              />
            ),
            file: (
              <label className="file-upload">
                <input 
                  id={htmlFor}
                  type={type}
                  name={name}
                  onChange={handleChange}
                  value={value}
                />
                Attach File
              </label>
            )
          }[inputType]
        }
        {
          bottomLabel && 
        <label className="bottom" htmlFor="props.for">
          {bottomLabel}
        </label>
        }
        
      </div>
    );
  };
export default FormInput
