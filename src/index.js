import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Media from 'react-media';
import {BrowserRouter} from "react-router-dom"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
   <div>
    

        <Media query={{ maxWidth: 599 }}>
          {matches =>
            matches ? (
              <BrowserRouter>
               <App/>
              </BrowserRouter>
             
            ) : (
              <h2 style={{textAlign:"center"}}>Page ristricted on large screens.</h2>
            )
          }
        </Media>

        {/* <Media query="(max-width: 599px)">
          {matches =>
            matches ? (
              <p>The document is less than 600px wide.</p>
            ) : (
              <p>The document is at least 600px wide.</p>
            )
          }
        </Media> */}
      </div>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
