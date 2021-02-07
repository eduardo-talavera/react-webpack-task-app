import React from 'react'


function DefaultLayout({ children, className }) {
  return (
   <>
     <header className="header">
        <h4 className="">Project 0</h4>
      </header>

      <div className={className}>{children}</div>   
   </>
  )
}

export default DefaultLayout;
