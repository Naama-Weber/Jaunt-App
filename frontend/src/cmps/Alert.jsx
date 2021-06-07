import React from 'react';
import Alert from '@material-ui/lab/Alert';

const style = {
  backgroundColor: "white",
  position: "fixed",
  right: "50px",
  bottom: "50px",
}

// setTimeout(() => {
//   style.display= "none"
// }, 2000);

export default function ColorAlerts({ text }) {
  return (
    <div className="alert" style={style}>
      <Alert severity="success" variant="outlined" >
        {text}
      </Alert>
    </div>
  );
}