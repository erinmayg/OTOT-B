import React, { ReactNode } from 'react';

function Dialog(props: { children: ReactNode; open: boolean }) {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: '0',
        left: '0',
        background: 'rgba(0, 0, 0, 0.85)',
        display: `${props.open ? 'flex' : 'none'}`,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '8px',
          width: 'fit-content',
        }}
      >
        {props.children}
      </div>
    </div>
  );
}

export default Dialog;
