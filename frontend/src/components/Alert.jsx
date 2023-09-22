import React, { useState } from 'react'

export const Alert = (props) => {
  const [isVisible, setIsVisible] = useState(true)
  setTimeout(() => {
    setIsVisible(false)
  }, 3000)

  const { type, title, message } = props
  let color = {
    bg: 'bg-teal-100',
    border: 'border-teal-500',
    text: 'text-teal-900',
  }
  if (type === 'rejected') {
    color = {
      bg: 'bg-red-100',
      border: 'border-red-400',
      text: 'text-red-700',
    }
  } else if (type === 'fullfilled') {
    color = {
      bg: 'bg-teal-100',
      border: 'border-teal-500',
      text: 'text-teal-900',
    }
  }
  console.log('Alert')

  return (
    <>
      {isVisible ? (
        <div className="static">
          <div
            className={`absolute top-2 right-0 border-t-4 rounded-b px-4 py-3 shadow-md ${color.bg} ${color.border} ${color.text}`}
            role="alert"
          >
            <div>
              <p className="font-bold">{title}</p>
              <p className="text-sm">{message}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
