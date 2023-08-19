import React from 'react';

function Alert({alertSub, alertDiv}) {
  const alertMes = alertSub ? "only positive numbers are allowed" : alertDiv ? "franctions are not allowed" : ""

  return (
    <div>
      <button  className='alert-btn'>{alertMes}</button>
    </div>
  );
}

export default Alert;