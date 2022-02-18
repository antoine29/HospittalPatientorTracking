import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "@apollo/client";

// ToDo: this import breaks the bundle. Importing it instead in index.html
//import 'semantic-ui-css/semantic.min.css';

import { client } from './graphQL/apolloClient'
import { reducer, StateProvider } from "./state";
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <StateProvider reducer={reducer}>
        <App />
      </StateProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
