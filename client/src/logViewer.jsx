/* globals window */
import React from 'react';

export default class LogViewer extends React.Component {
  static formatTime(isoTime) {
    const time = new Date(isoTime);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    let day = '';

    if (today.getMonth() === time.getMonth()
      && today.getFullYear() === time.getFullYear()
      && today.getDate() === time.getDate()) {
      day = 'Today';
    } else if (yesterday.getMonth() === time.getMonth()
      && yesterday.getFullYear() === time.getFullYear()
      && yesterday.getDate() === time.getDate()) {
      day = 'Yesterday';
    } else {
      day = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`;
    }

    return `${day} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
  }

  constructor(props) {
    super(props);
    this.modalDIV = null;
  }

  componentDidMount() {
    $(window).on('resize', () => { this.handleResize(); });
    $(this.modalDIV).on('show.bs.modal', () => { this.handleResize(); });
  }

  openModal() {
    if (this.modalDIV !== null) {
      $(this.modalDIV).modal();
    }
  }

  handleResize() {
    const $modal = $(this.modalDIV);
    const modalHeaderHeight = 56;
    const modalMargin = 30;
    const modalBorder = 1;

    const bodyHeight = window.innerHeight - (modalHeaderHeight + modalMargin * 2 + modalBorder * 2);
    $modal.find('.modal-body').css({ maxHeight: bodyHeight });
  }

  render() {
    const { log, title } = this.props;
    const rowClasses = {
      error: 'danger',
      warning: 'warning',
    };

    const entries = log.map((logEntry) => {
      const rowClass = rowClasses[logEntry.type] || '';
      return (
        <tr key={logEntry.id} className={rowClass}>
          <td>{LogViewer.formatTime(logEntry.time)}</td>
          <td>{logEntry.station_name}</td>
          <td>{logEntry.message}</td>
          <td>{logEntry.details}</td>
        </tr>
      );
    });

    return (
      <div className="modal fade logViewer-modal" tabIndex="-1" role="dialog" ref={(c) => { this.modalDIV = c; }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
              <h4 className="modal-title">{title}</h4>
            </div>
            <div className="modal-body">
              <table className="table table-fixed table-condensed">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Station</th>
                    <th>Message</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  { entries }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LogViewer.propTypes = {
  title: React.PropTypes.string,
  log: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number,
      type: React.PropTypes.string,
      time: React.PropTypes.string,
      station_id: React.PropTypes.string,
      station_name: React.PropTypes.string,
      message: React.PropTypes.string,
      details: React.PropTypes.string
    })
  ),
};

LogViewer.defaultProps = {
  log: [],
  title: 'Latest Notifications',
};
