import { AuthenticatedApp } from './authentticated-app';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { UnauthenticatedApp } from './unauthenticated-app';


import './App.css';
import { ErrorBoundary } from 'components/error-boundary';
import { FullPageErrorFallback } from 'components/lib';
// import { ProjectListScreen } from 'screens/project-list';


function App() {
  const { user} =useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
             {user? <AuthenticatedApp/>:<UnauthenticatedApp/>}
      </ErrorBoundary>
  
      {/* <ProjectListScreen></ProjectListScreen> */}
    </div>
  );
}

export default App;
