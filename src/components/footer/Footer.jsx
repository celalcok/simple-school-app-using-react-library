import React from 'react'

function Footer() {
  
  return (
    <footer className="bg-dark text-muted text-center py-3">
          <p>
            <i className="fa fa-copy" aria-hidden="true"></i>All rights reserved | {new Date().getFullYear()}<br/>
          </p>
          <h5><strong>SCHOOL</strong></h5>

    </footer>
  )
}

export default Footer