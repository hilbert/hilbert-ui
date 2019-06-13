import 'core-js/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import UIAPI from './uiAPI';
import Dashboard from './dashboard';

const Promise = require('bluebird');

const apiConnector = new UIAPI('/api');

window.dashboard = null;
// onReady
$(() => {
  const initData = {};
  const initTasks = [
    apiConnector.getApplications().then((applications) => {
      initData.applications = {};
      for (const application of applications) {
        initData.applications[application.id] = application;
      }
    }),
    apiConnector.getStationProfiles().then((stationProfiles) => {
      initData.stationProfiles = {};
      for (const stationProfile of stationProfiles) {
        initData.stationProfiles[stationProfile.id] = stationProfile;
      }
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
