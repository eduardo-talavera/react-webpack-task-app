import React from 'react';
import { withRouter } from "react-router-dom";
import { signout } from '../services/authService';


function DefaultLayout({ children, className, history }) {
  return (
   <>
     <header className="header">
        <h4 className="">Project 0</h4>
        <button 
           className="btn btn-custom text-primary"
           onClick={() =>
            signout(() => {
              history.push("/signin");
            })
          }
          >
            Signout
        </button>
      </header>

      <div className={className}>{children}</div>   
   </>
  )
}

export default withRouter(DefaultLayout);
