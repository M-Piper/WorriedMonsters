import React from 'react';
import LoginForm from './login/loginForm.js';

function App() {
  return (
      <div className="App">
        <header className="App-header">
          {/* Render the login form */}
          <LoginForm />
        </header>
      </div>
  );
}

export default App;
