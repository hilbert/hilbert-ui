import UIAPI from './uiAPI';
import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './dashboard.jsx';

const apiConnector = new UIAPI('/api');

window.dashboard = null;
// onReady
$(() => {
  window.dashboard = ReactDOM.render(
    <Dashboard api={apiConnector} />,
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
