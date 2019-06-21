/* globals window */

import React from 'react';

/**
 * A component for visualizing process output console-style
 */
export default class ConsoleViewer extends React.Component {
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
      $(this.modalDIV).on('shown.bs.modal', function onModalShow() {
        const modalBody = $(this).find('.modal-body').first()[0];
        modalBody.scrollTop = Math.max(modalBody.scrollHeight, modalBody.clientHeight);
      });
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
    const {
      title, lines,
    } = this.props;

    return (
      <div className="modal fade consoleViewer-modal" tabIndex="-1" role="dialog" ref={(c) => { this.modalDIV = c; }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
              <h4 className="modal-title">{title}</h4>
            </div>
            <div className="modal-body">
              <pre>
                {lines.join('\n')}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ConsoleViewer.propTypes = {
  title: React.PropTypes.string,
  lines: React.PropTypes.arrayOf(React.PropTypes.string),
};

ConsoleViewer.defaultProps = {
  title: 'Terminal Output',
  lines: [],
};
