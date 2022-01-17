import * as React from 'react';

export default function Modal({title, open, onClose, children}) {

  if (!open) return null

  return (
      <div className="Modal">
        <div className="overlay" onClick={onClose}/>
        <div className="inner p2">
          <h4 className="title mb2 mt0 pb1 border-bottom">{title}</h4>
          <div>{children}</div>
        </div>
      </div>
  )
}