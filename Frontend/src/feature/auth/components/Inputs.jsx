import React from 'react'

const Inputs = ({label,placeholder,onChange,value}) => {
  return (
    <div className="form-group">
            <label>{label}</label>
            <input
              type="text"
              value={value}
              onChange={onChange}
              
              placeholder={placeholder}
              required
            />
          </div>
  )
}

export default Inputs