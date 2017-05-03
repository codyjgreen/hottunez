import React from 'react';

const Login = ({ lock }) => {
  return (
    <div>
      <a href="#" onClick={() => lock.show()}>Sign In</a>
    </div>
  );
};

export default Login;
