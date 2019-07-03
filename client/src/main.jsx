/* globals window */
import 'core-js/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'bluebird';

import packagedata from '../package.json';
import UIAPI from './uiAPI';
import Dashboard from './dashboard';

const apiConnector = new UIAPI('/api');

console.log(`Starting hilbert-ui client v${packagedata.version}`);
window.dashboard = null;
// onReady
$(() => {
  const initData = {};
  const initTasks = [
    apiConnector.getApplications().then((applications) => {
      initData.applications = {};
      applications.forEach((application) => {
        initData.applications[application.id] = application;
      });
    }),
    apiConnector.getStationProfiles().then((stationProfiles) => {
      initData.stationProfiles = {};
      stationProfiles.forEach((stationProfile) => {
        initData.stationProfiles[stationProfile.id] = stationProfile;
      });
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
        window.document.getElementById('dashboardContainer')
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
