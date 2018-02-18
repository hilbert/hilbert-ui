import UIAPI from './uiAPI';
import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './dashboard.jsx';

const Promise = require('bluebird');
const apiConnector = new UIAPI('/api');

window.dashboard = null;
// onReady
$(() => {
  const initData = {};
  const initTasks = [
    apiConnector.getApplications().then((applications) => {
      initData.applications = applications;
    }),
    apiConnector.getStationProfiles().then((stationProfiles) => {
      initData.stationProfiles = stationProfiles;
    }),
  ];

  Promise.all(initTasks)
    .then(() => {
      window.dashboard = ReactDOM.render(
        <Dashboard
          api={apiConnector}
          applications={initData.applications}
          stationProfiles={initData.stationProfiles}
        />,
        document.getElementById('dashboardContainer')
      );

      // Install click handlers in external menus and buttons
      $('[data-command]').each(function setClickHandler() {
        $(this).on('click', (ev) => {
          window.dashboard.getCommand($(this).attr('data-command'))();
          ev.preventDefault();
        });
      });
    });
});
