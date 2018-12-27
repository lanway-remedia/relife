import React from 'react'
import DatePicker from 'react-datepicker'

const CalendarComponent = ({ name, value, ...rest }) => {
  return (
    <DatePicker
      className="form-control"
      selected={value}
      id={name}
      name={name}
      {...rest}
    />
  )
}

export default CalendarComponent
