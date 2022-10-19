import React from 'react'
import LoginPopup from '../Auth/LoginPopup';
export const BlankLayout = ({ children }) => {
  return (
    <div className='wrraper-layout'>
      <LoginPopup />
      { children }
    </div>
  )
}