import "./wdyr"
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {DevTools, loadServer} from "jira-dev-tool"
import { AppProperties } from 'context';
import "antd/dist/antd.less"

loadServer(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProperties>
        <DevTools></DevTools>
        <App />
      </AppProperties>
  </React.StrictMode>,
  document.getElementById('root')
)
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
