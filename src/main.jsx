import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/app/styles/index.css'
import App from './App.jsx'

import { Amplify } from 'aws-amplify';
import awsconfig from './app/aws-config';

Amplify.configure(awsconfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
