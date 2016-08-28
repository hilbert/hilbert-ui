(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * AppSelect component
 * Allows the user to select an application from a list
 */

var AppSelect = function (_React$Component) {
  _inherits(AppSelect, _React$Component);

  function AppSelect(props) {
    _classCallCheck(this, AppSelect);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AppSelect).call(this, props));

    _this.appSelector = null;
    _this.clickedChangeApp = _this.clickedChangeApp.bind(_this);
    return _this;
  }

  _createClass(AppSelect, [{
    key: "clickedChangeApp",
    value: function clickedChangeApp() {
      if (this.props.onChange) {
        this.props.onChange(this.appSelector.value);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var applications = [];

      if (this.props.allowBlank) {
        applications.push(_react2.default.createElement(
          "option",
          { key: "null", value: "" },
          " "
        ));
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.applications[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var application = _step.value;

          applications.push(_react2.default.createElement(
            "option",
            { key: application, value: application },
            application
          ));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var disabledClass = this.props.disabled ? ' disabled' : '';

      return _react2.default.createElement(
        "div",
        { className: "appSelect" + disabledClass },
        _react2.default.createElement(
          "div",
          { className: "form-inline" },
          _react2.default.createElement(
            "div",
            { className: "form-group form-group-minwidth" },
            _react2.default.createElement(
              "select",
              {
                className: "form-control" + disabledClass,
                defaultValue: this.props.defaultValue ? this.props.defaultValue : '',
                ref: function ref(sel) {
                  _this2.appSelector = sel;
                }
              },
              applications
            )
          ),
          " ",
          _react2.default.createElement(
            "a",
            {
              className: "btn btn-warning" + disabledClass,
              onClick: this.clickedChangeApp
            },
            "Change application"
          )
        )
      );
    }
  }]);

  return AppSelect;
}(_react2.default.Component);

exports.default = AppSelect;


AppSelect.propTypes = {
  applications: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
  defaultValue: _react2.default.PropTypes.string,
  allowBlank: _react2.default.PropTypes.bool,
  disabled: _react2.default.PropTypes.bool,
  onChange: _react2.default.PropTypes.func
};

AppSelect.defaultProps = {
  applications: [],
  defaultValue: '',
  allowBlank: false,
  disabled: false,
  onChange: function onChange() {}
};

},{"react":"react"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonFilter = function ButtonFilter(props) {
  var options = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var option = _step.value;

      var classes = ['btn', 'btn-default', 'button-filter-option-' + option];
      if (props.value === option) {
        classes.push('active');
      }
      var counter = '';
      var spacing = '';
      if (props.counts !== null) {
        var count = 0;
        if (props.counts.hasOwnProperty(option) && props.counts[option] !== 0) {
          count = props.counts[option];
        }
        var badgeClasses = 'badge' + (count === 0 ? ' zero' : ' non-zero');
        counter = _react2.default.createElement(
          'span',
          { className: badgeClasses },
          count
        );
        spacing = ' ';
      }
      options.push(_react2.default.createElement(
        'a',
        {
          href: '#',
          className: classes.join(' '),
          key: option,
          onClick: function onClick() {
            return props.onChange(option);
          }
        },
        option,
        spacing,
        counter
      ));
    };

    for (var _iterator = props.options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var defaultClasses = ['btn', 'btn-default'];
  if (props.value === '') {
    defaultClasses.push('active');
  }

  return _react2.default.createElement(
    'div',
    { className: 'btn-toolbar button-filter' },
    _react2.default.createElement(
      'div',
      { className: 'btn-group' },
      _react2.default.createElement(
        'a',
        {
          href: '#',
          className: defaultClasses.join(' '),
          key: 'null',
          onClick: function onClick() {
            return props.onChange('');
          }
        },
        props.allText
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'btn-group' },
      options
    )
  );
};

ButtonFilter.propTypes = {
  options: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
  counts: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.number),
  allText: _react2.default.PropTypes.string,
  value: _react2.default.PropTypes.string,
  onChange: _react2.default.PropTypes.func
};

ButtonFilter.defaultProps = {
  options: [],
  counts: null,
  allText: 'All',
  value: '',
  onChange: function onChange() {}
};

exports.default = ButtonFilter;

},{"react":"react"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConsoleViewer = function (_React$Component) {
  _inherits(ConsoleViewer, _React$Component);

  function ConsoleViewer(props) {
    _classCallCheck(this, ConsoleViewer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConsoleViewer).call(this, props));

    _this.modalDIV = null;
    return _this;
  }

  _createClass(ConsoleViewer, [{
    key: 'openModal',
    value: function openModal() {
      if (this.modalDIV !== null) {
        $(this.modalDIV).modal();
        $(this.modalDIV).on('shown.bs.modal', function () {
          var modalBody = $(this).find('.modal-body').first()[0];
          modalBody.scrollTop = Math.max(modalBody.scrollHeight, modalBody.clientHeight);
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      $(window).on('resize', function () {
        _this2.handleResize();
      });
      $(this.modalDIV).on('show.bs.modal', function () {
        _this2.handleResize();
      });
    }
  }, {
    key: 'handleResize',
    value: function handleResize() {
      var $modal = $(this.modalDIV);
      var modalHeaderHeight = 56;
      var modalMargin = 30;
      var modalBorder = 1;

      var bodyHeight = window.innerHeight - (modalHeaderHeight + modalMargin * 2 + modalBorder * 2);
      $modal.find('.modal-body').css({ maxHeight: bodyHeight });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: 'modal fade consoleViewer-modal', tabIndex: '-1', role: 'dialog', ref: function ref(c) {
            _this3.modalDIV = c;
          } },
        _react2.default.createElement(
          'div',
          { className: 'modal-dialog modal-lg' },
          _react2.default.createElement(
            'div',
            { className: 'modal-content' },
            _react2.default.createElement(
              'div',
              { className: 'modal-header' },
              _react2.default.createElement(
                'button',
                { type: 'button', className: 'close', 'data-dismiss': 'modal' },
                _react2.default.createElement(
                  'span',
                  null,
                  '×'
                )
              ),
              _react2.default.createElement(
                'h4',
                { className: 'modal-title' },
                this.props.title
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'modal-body' },
              _react2.default.createElement(
                'pre',
                null,
                this.props.lines.join('\n')
              )
            )
          )
        )
      );
    }
  }]);

  return ConsoleViewer;
}(_react2.default.Component);

exports.default = ConsoleViewer;


ConsoleViewer.propTypes = {
  title: _react2.default.PropTypes.string,
  lines: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string)
};

ConsoleViewer.defaultProps = {
  title: 'Terminal Output',
  lines: []
};

},{"react":"react"}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _station = require('./station.jsx');

var _station2 = _interopRequireDefault(_station);

var _appSelect = require('./appSelect.jsx');

var _appSelect2 = _interopRequireDefault(_appSelect);

var _buttonFilter = require('./buttonFilter.jsx');

var _buttonFilter2 = _interopRequireDefault(_buttonFilter);

var _logViewer = require('./logViewer.jsx');

var _logViewer2 = _interopRequireDefault(_logViewer);

var _consoleViewer = require('./consoleViewer.jsx');

var _consoleViewer2 = _interopRequireDefault(_consoleViewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const tmp_log_entries = require('./tmp_log.json').entries;

var Dashboard = function (_React$Component) {
  _inherits(Dashboard, _React$Component);

  function Dashboard(props) {
    _classCallCheck(this, Dashboard);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dashboard).call(this, props));

    _this.state = {
      stations: [],
      selection: new Set(),
      visibleType: '',
      visibleState: '',
      log: [],
      serverConnectionError: false
    };
    _this.selectToggle = _this.selectToggle.bind(_this);
    _this.changeAppSelected = _this.changeAppSelected.bind(_this);
    _this.commands = {};
    _this.initCommands();
    _this.getCommand = _this.getCommand.bind(_this);
    _this.logViewer = null;
    _this.consoleViewer = null;
    _this.updateID = 0;
    _this.serverConnectionRetry = 0;
    return _this;
  }

  _createClass(Dashboard, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.pollLoop();
    }
  }, {
    key: 'getStationState',
    value: function getStationState(stationID) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.state.stations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var station = _step.value;

          if (station.id === stationID) {
            return station;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    }
  }, {
    key: 'getStationTypes',
    value: function getStationTypes() {
      var types = new Set();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.state.stations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var station = _step2.value;

          types.add(station.type);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return Array.from(types);
    }
  }, {
    key: 'getCommand',
    value: function getCommand(commandName) {
      if (this.commands[commandName] !== undefined) {
        return this.commands[commandName].doCallback;
      }
      throw Error('Call to invalid command ' + commandName);
    }
  }, {
    key: 'getVisibleStations',
    value: function getVisibleStations() {
      var answer = [];

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.state.stations[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var station = _step3.value;

          if ((this.state.visibleType === '' || station.type === this.state.visibleType) && (this.state.visibleState === '' || this.displayState(station.state) === this.state.visibleState)) {
            answer.push(station);
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return answer;
    }
  }, {
    key: 'displayState',
    value: function displayState(state) {
      if (state === 'starting_station' || state === 'starting_app' || state === 'stopping' || state === 'switching_app') {
        return 'busy';
      }

      return state;
    }
  }, {
    key: 'attachConfirmation',
    value: function attachConfirmation(text, callback) {
      var _this2 = this;

      return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        bootbox.dialog({
          message: text,
          buttons: {
            warning: {
              label: 'Confirm',
              className: 'btn-warning',
              callback: callback.bind.apply(callback, [_this2].concat(args))
            },
            cancel: {
              label: 'Cancel',
              className: 'btn-default'
            }
          }
        });
      };
    }
  }, {
    key: 'initCommands',
    value: function initCommands() {
      this.commands = {
        'stations-all-start': {
          callback: this.startAll.bind(this),
          title: 'start all stations',
          confirm: true
        },
        'stations-all-stop': {
          callback: this.stopAll.bind(this),
          title: 'stop all stations',
          confirm: true
        },
        'stations-all-select': {
          callback: this.selectAll.bind(this),
          title: 'select all stations',
          confirm: false
        },
        'stations-all-deselect': {
          callback: this.deselectAll.bind(this),
          title: 'deselect all stations',
          confirm: false
        },
        'stations-selected-start': {
          callback: this.startSelected.bind(this),
          title: 'start the selected stations',
          confirm: true
        },
        'stations-selected-stop': {
          callback: this.stopSelected.bind(this),
          title: 'stop the selected stations',
          confirm: true
        },
        'stations-visible-select': {
          callback: this.selectAllVisible.bind(this),
          title: 'select visible stations',
          confirm: false
        }
      };

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = Object.keys(this.commands)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var name = _step4.value;

          var command = this.commands[name];
          if (command.confirm) {
            this.commands[name].doCallback = this.attachConfirmation('Are you sure you want to ' + command.title + '?', command.callback);
          } else {
            this.commands[name].doCallback = command.callback;
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  }, {
    key: 'allStationIDs',
    value: function allStationIDs() {
      return this.stationIDs(this.state.stations);
    }
  }, {
    key: 'stationIDs',
    value: function stationIDs(stations) {
      var ids = new Set();

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = stations[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var station = _step5.value;

          ids.add(station.id);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return ids;
    }
  }, {
    key: 'selectAll',
    value: function selectAll() {
      this.setState({ selection: this.allStationIDs() });
    }
  }, {
    key: 'selectAllVisible',
    value: function selectAllVisible() {
      this.setState({ selection: this.stationIDs(this.getVisibleStations()) });
    }
  }, {
    key: 'deselectAll',
    value: function deselectAll() {
      this.setState({ selection: new Set() });
    }
  }, {
    key: 'selectToggle',
    value: function selectToggle(id) {
      if (this.state.selection.has(id)) {
        this.state.selection.delete(id);
      } else {
        this.state.selection.add(id);
      }
      this.setState({ selection: this.state.selection });
    }
  }, {
    key: 'stopStations',
    value: function stopStations(stationIDs) {
      $.ajax({
        url: '/api/stations.json',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
          action: 'stop',
          stationIDs: Array.from(stationIDs)
        }),
        dataType: 'json',
        cache: false,
        success: function success() {},
        error: function error(xhr, status, err) {
          return console.error(status, err.toString());
        }
      });
    }
  }, {
    key: 'stopSelected',
    value: function stopSelected() {
      this.stopStations(this.state.selection);
      this.deselectAll();
    }
  }, {
    key: 'stopAll',
    value: function stopAll() {
      return this.stopStations(this.allStationIDs());
    }
  }, {
    key: 'startStations',
    value: function startStations(stationIDs) {
      $.ajax({
        url: '/api/stations.json',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
          action: 'start',
          stationIDs: Array.from(stationIDs)
        }),
        dataType: 'json',
        cache: false,
        success: function success() {},
        error: function error(xhr, status, err) {
          return console.error(status, err.toString());
        }
      });
    }
  }, {
    key: 'startSelected',
    value: function startSelected() {
      this.startStations(this.state.selection);
      this.deselectAll();
    }
  }, {
    key: 'startAll',
    value: function startAll() {
      return this.startStations(this.allStationIDs());
    }
  }, {
    key: 'changeAppSelected',
    value: function changeAppSelected(app) {
      $.ajax({
        url: '/api/stations.json',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
          action: 'change_app',
          stationIDs: Array.from(this.state.selection),
          app: app
        }),
        dataType: 'json',
        cache: false,
        success: function success() {},
        error: function error(xhr, status, err) {
          return console.error(status, err.toString());
        }
      });
      this.deselectAll();
    }

    /**
     * Handle the server poll
     *
     * Implementation: Since the server uses long polling we use a very short
     * poll time (500ms). In case of errors contacting the server the poll time
     * increases with each error until a max poll time is reached.
     */

  }, {
    key: 'pollLoop',
    value: function pollLoop() {
      var _this3 = this;

      var minPollTime = 500;
      var retryPollTime = minPollTime;
      var retryIncreaseFactor = 2;
      var maxRetryPollTime = 4000;

      var loop = function loop() {
        _this3.pollServer().then(function () {
          setTimeout(loop, minPollTime);
          retryPollTime = minPollTime;
          if (_this3.state.serverConnectionError) {
            _this3.setState({ serverConnectionError: false });
          }
          _this3.serverConnectionRetry = 0;
        }).catch(function () {
          setTimeout(loop, retryPollTime);
          if (retryPollTime < maxRetryPollTime) {
            retryPollTime = retryPollTime * retryIncreaseFactor;
          }
          _this3.serverConnectionRetry++;
          if (_this3.serverConnectionRetry > 5) {
            _this3.setState({ serverConnectionError: true });
            // Reset the updateID so the next poll returns immediately
            // instead of being a long poll
            _this3.updateID = 0;
          }
        });
      };
      loop();
    }
  }, {
    key: 'pollServer',
    value: function pollServer() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        $.ajax({
          url: '/api/poll.json',
          data: {
            lastSeen: _this4.updateID
          },
          dataType: 'json',
          cache: false,
          timeout: 30000,
          success: function success(data) {
            if (data.stations !== undefined) {
              _this4.updateID = data.updateID;
              _this4.setState({ stations: data.stations });
            }
            resolve();
          },
          error: function error(xhr, status, err) {
            console.error(_this4.props.url, status, err.toString());
            reject();
          }
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var stations = [];
      var actions = [];
      var messageBar = '';

      if (this.state.serverConnectionError) {
        messageBar = _react2.default.createElement(
          'div',
          { className: 'message_bar' },
          _react2.default.createElement(
            'div',
            { className: 'message_bar-message' },
            _react2.default.createElement('i', { className: 'fa fa-warning' }),
            '  No connection to server.'
          )
        );
      }

      this.getVisibleStations().forEach(function (station) {
        return stations.push(_react2.default.createElement(_station2.default, {
          station: station,
          key: station.id,
          selected: _this5.state.selection.has(station.id),
          onClickStation: _this5.selectToggle
        }));
      });

      var counts = {};
      this.state.stations.forEach(function (station) {
        if (!counts.hasOwnProperty(_this5.displayState(station.state))) {
          counts[_this5.displayState(station.state)] = 0;
        }
        counts[_this5.displayState(station.state)]++;
      });

      var selectedCount = this.state.selection.size;
      var allSelected = selectedCount === this.state.stations.length;
      var selectAllClasses = 'btn btn-default ' + (allSelected ? ' disabled' : '');

      var deselectAllClasses = 'btn btn-default ' + (selectedCount === 0 ? ' disabled' : '');

      var stationWord = selectedCount === 1 ? 'station' : 'stations';

      actions.push(_react2.default.createElement(
        'div',
        { key: 'stationStateFilter', className: 'action-pane' },
        _react2.default.createElement(_buttonFilter2.default, {
          options: ['on', 'off', 'busy', 'error'],
          counts: counts,
          allText: 'All states',
          value: this.state.visibleState,
          onChange: function onChange(option) {
            _this5.deselectAll();
            _this5.setState({ visibleState: option });
          }
        })
      ));

      actions.push(_react2.default.createElement(
        'div',
        { key: 'stationTypeFilter', className: 'action-pane' },
        _react2.default.createElement(_buttonFilter2.default, {
          options: this.getStationTypes(),
          allText: 'All types',
          value: this.state.visibleType,
          onChange: function onChange(option) {
            _this5.deselectAll();
            _this5.setState({ visibleType: option });
          }
        })
      ));

      actions.push(_react2.default.createElement(
        'div',
        { key: 'selectedCount', className: 'action-pane' },
        _react2.default.createElement('div', { className: 'action-pane-separator' }),
        _react2.default.createElement(
          'b',
          null,
          this.state.selection.size,
          ' ',
          stationWord,
          ' selected'
        ),
        _react2.default.createElement(
          'div',
          { className: 'selectActions' },
          _react2.default.createElement(
            'a',
            {
              className: deselectAllClasses,
              onClick: this.getCommand('stations-all-deselect')
            },
            'Deselect'
          ),
          ' ',
          _react2.default.createElement(
            'a',
            {
              className: selectAllClasses,
              onClick: this.getCommand('stations-visible-select')
            },
            'Select all'
          )
        )
      ));

      var noSelectionDisable = selectedCount === 0 ? ' disabled' : '';

      actions.push(_react2.default.createElement(
        'div',
        { key: 'startStopPanel', className: 'action-pane' + noSelectionDisable },
        _react2.default.createElement('div', { className: 'action-pane-separator' }),
        _react2.default.createElement(
          'a',
          {
            className: 'btn btn-success' + noSelectionDisable,
            onClick: this.getCommand('stations-selected-start')
          },
          _react2.default.createElement('i', { className: 'fa fa-play' }),
          '  Start Selected'
        ),
        ' ',
        _react2.default.createElement(
          'a',
          {
            className: 'btn btn-danger' + noSelectionDisable,
            onClick: this.getCommand('stations-selected-stop')
          },
          _react2.default.createElement('i', { className: 'fa fa-stop' }),
          '  Stop Selected'
        )
      ));

      var selectedAreSameType = true;
      var lastType = null;
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.state.selection[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var selectedID = _step6.value;

          if (lastType === null) {
            lastType = this.getStationState(selectedID).type;
          }
          if (this.getStationState(selectedID).type !== lastType) {
            selectedAreSameType = false;
            break;
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      var allSelectedOn = true;
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.state.selection[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _selectedID = _step7.value;

          if (this.getStationState(_selectedID).state !== 'on') {
            allSelectedOn = false;
            break;
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      var canChangeApp = allSelectedOn && selectedCount > 0 && selectedAreSameType;

      var applications = [];
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this.state.stations[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var station = _step8.value;

          if (this.state.selection.has(station.id)) {
            applications = station.possible_apps;
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      actions.push(_react2.default.createElement(
        'div',
        { key: 'appSelect', className: 'action-pane' },
        _react2.default.createElement('div', { className: 'action-pane-separator' }),
        _react2.default.createElement(_appSelect2.default, {
          applications: canChangeApp ? applications : [],
          disabled: !canChangeApp,
          allowBlank: true,
          onChange: this.attachConfirmation('Are you sure you want to change the application?', this.changeAppSelected)
        })
      ));

      var noTerminalOutputDisable = selectedCount !== 1 ? ' disabled' : '';

      actions.push(_react2.default.createElement(
        'div',
        { key: 'showLog', className: 'action-pane' },
        _react2.default.createElement('div', { className: 'action-pane-separator' }),
        _react2.default.createElement(
          'a',
          {
            className: 'btn btn-default',
            href: '#',
            onClick: function onClick(ev) {
              if (_this5.logViewer !== null) {
                _this5.logViewer.openModal();
                $.ajax({
                  url: '/api/log.json',
                  method: 'get',
                  contentType: 'application/json',
                  cache: false,
                  success: function success(data) {
                    _this5.setState({ log: data.entries.reverse() });
                  },
                  error: function error(xhr, status, err) {
                    return console.error(status, err.toString());
                  }
                });
              }
              ev.preventDefault();
            }
          },
          'Show log'
        ),
        ' ',
        _react2.default.createElement(
          'a',
          {
            className: 'btn btn-default' + noTerminalOutputDisable,
            href: '#',
            onClick: function onClick(ev) {
              if (_this5.consoleViewer !== null) {
                _this5.consoleViewer.openModal();
                $.ajax({
                  url: '/api/station_output.json',
                  data: {
                    stationID: Array.from(_this5.state.selection)[0]
                  },
                  method: 'get',
                  dataType: 'json',
                  contentType: 'application/json',
                  cache: false,
                  success: function success(data) {
                    _this5.setState({
                      title: Array.from(_this5.state.selection)[0],
                      lines: data.lines
                    });
                  },
                  error: function error(xhr, status, err) {
                    return console.error(status, err.toString());
                  }
                });
              }
              ev.preventDefault();
            }
          },
          'Terminal output'
        ),
        ' ',
        _react2.default.createElement(
          'a',
          {
            className: 'btn btn-default',
            href: '#',
            onClick: function onClick(ev) {
              if (_this5.consoleViewer !== null) {
                _this5.consoleViewer.openModal();
                $.ajax({
                  url: '/api/station_output.json',
                  data: {},
                  method: 'get',
                  dataType: 'json',
                  contentType: 'application/json',
                  cache: false,
                  success: function success(data) {
                    _this5.setState({
                      title: 'Global output',
                      lines: data.lines
                    });
                  },
                  error: function error(xhr, status, err) {
                    return console.error(status, err.toString());
                  }
                });
              }
              ev.preventDefault();
            }
          },
          'Global output'
        )
      ));

      return _react2.default.createElement(
        'div',
        { className: messageBar !== '' ? 'with-message_bar' : '' },
        messageBar,
        _react2.default.createElement(
          'div',
          { className: 'container-fluid' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-sm-6 pane-stations' },
              _react2.default.createElement(
                'div',
                { id: 'dashboard' },
                _react2.default.createElement(
                  'div',
                  { id: 'stationList', className: 'panel-group' },
                  stations
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-sm-6 pane-actions' },
              _react2.default.createElement(
                'div',
                { id: 'dashboardActions' },
                actions
              )
            )
          )
        ),
        _react2.default.createElement(_logViewer2.default, { log: this.state.log, ref: function ref(c) {
            _this5.logViewer = c;
          } }),
        _react2.default.createElement(_consoleViewer2.default, { lines: this.state.lines, ref: function ref(c) {
            _this5.consoleViewer = c;
          } })
      );
    }
  }]);

  return Dashboard;
}(_react2.default.Component);

exports.default = Dashboard;


Dashboard.propTypes = {
  url: _react2.default.PropTypes.string.isRequired
};

},{"./appSelect.jsx":1,"./buttonFilter.jsx":2,"./consoleViewer.jsx":3,"./logViewer.jsx":5,"./station.jsx":7,"react":"react"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LogViewer = function (_React$Component) {
  _inherits(LogViewer, _React$Component);

  _createClass(LogViewer, null, [{
    key: 'formatTime',
    value: function formatTime(isoTime) {
      var time = new Date(isoTime);
      var today = new Date();
      var yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      var day = '';

      if (today.getMonth() === time.getMonth() && today.getFullYear() === time.getFullYear() && today.getDate() === time.getDate()) {
        day = 'Today';
      } else if (yesterday.getMonth() === time.getMonth() && yesterday.getFullYear() === time.getFullYear() && yesterday.getDate() === time.getDate()) {
        day = 'Yesterday';
      } else {
        day = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate();
      }

      return day + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
    }
  }]);

  function LogViewer(props) {
    _classCallCheck(this, LogViewer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LogViewer).call(this, props));

    _this.modalDIV = null;
    return _this;
  }

  _createClass(LogViewer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      $(window).on('resize', function () {
        _this2.handleResize();
      });
      $(this.modalDIV).on('show.bs.modal', function () {
        _this2.handleResize();
      });
    }
  }, {
    key: 'openModal',
    value: function openModal() {
      if (this.modalDIV !== null) {
        $(this.modalDIV).modal();
      }
    }
  }, {
    key: 'handleResize',
    value: function handleResize() {
      var $modal = $(this.modalDIV);
      var modalHeaderHeight = 56;
      var modalMargin = 30;
      var modalBorder = 1;

      var bodyHeight = window.innerHeight - (modalHeaderHeight + modalMargin * 2 + modalBorder * 2);
      $modal.find('.modal-body').css({ maxHeight: bodyHeight });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var rowClasses = {
        error: 'danger',
        warning: 'warning'
      };

      var entries = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.log[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var logEntry = _step.value;

          var rowClass = rowClasses[logEntry.type] !== undefined ? rowClasses[logEntry.type] : '';

          entries.push(_react2.default.createElement(
            'tr',
            { key: logEntry.id, className: rowClass },
            _react2.default.createElement(
              'td',
              null,
              LogViewer.formatTime(logEntry.time)
            ),
            _react2.default.createElement(
              'td',
              null,
              logEntry.station_name
            ),
            _react2.default.createElement(
              'td',
              null,
              logEntry.message
            )
          ));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _react2.default.createElement(
        'div',
        { className: 'modal fade logViewer-modal', tabIndex: '-1', role: 'dialog', ref: function ref(c) {
            _this3.modalDIV = c;
          } },
        _react2.default.createElement(
          'div',
          { className: 'modal-dialog modal-lg' },
          _react2.default.createElement(
            'div',
            { className: 'modal-content' },
            _react2.default.createElement(
              'div',
              { className: 'modal-header' },
              _react2.default.createElement(
                'button',
                { type: 'button', className: 'close', 'data-dismiss': 'modal' },
                _react2.default.createElement(
                  'span',
                  null,
                  '×'
                )
              ),
              _react2.default.createElement(
                'h4',
                { className: 'modal-title' },
                this.props.title
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'modal-body' },
              _react2.default.createElement(
                'table',
                { className: 'table table-fixed table-condensed' },
                _react2.default.createElement(
                  'thead',
                  null,
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'th',
                      null,
                      'Time'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Station'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Message'
                    )
                  )
                ),
                _react2.default.createElement(
                  'tbody',
                  null,
                  entries
                )
              )
            )
          )
        )
      );
    }
  }]);

  return LogViewer;
}(_react2.default.Component);

exports.default = LogViewer;


LogViewer.propTypes = {
  title: _react2.default.PropTypes.string,
  log: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    id: _react2.default.PropTypes.number,
    type: _react2.default.PropTypes.string,
    time: _react2.default.PropTypes.string,
    station_id: _react2.default.PropTypes.string,
    station_name: _react2.default.PropTypes.string,
    message: _react2.default.PropTypes.string
  }))
};

LogViewer.defaultProps = {
  log: [],
  title: 'Event Log'
};

},{"react":"react"}],6:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dashboard = require('./dashboard.jsx');

var _dashboard2 = _interopRequireDefault(_dashboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.dashboard = null;

// onReady
$(function () {
  window.dashboard = _reactDom2.default.render(_react2.default.createElement(_dashboard2.default, { url: '/api/stations.json' }), document.getElementById('dashboardContainer'));

  // Install click handlers in external menus and buttons
  $('[data-command]').each(function setClickHandler() {
    var _this = this;

    $(this).on('click', function (ev) {
      window.dashboard.getCommand($(_this).attr('data-command'))();
      ev.preventDefault();
    });
  });
});

},{"./dashboard.jsx":4,"react":"react","react-dom":"react-dom"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Station = function (_React$Component) {
  _inherits(Station, _React$Component);

  function Station(props) {
    _classCallCheck(this, Station);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Station).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(Station, [{
    key: 'handleClick',
    value: function handleClick() {
      this.props.onClickStation(this.props.station.id);
    }
  }, {
    key: 'render',
    value: function render() {
      var stationClasses = ['station', 'station-state-' + this.props.station.state, 'station-type-' + this.props.station.type];

      if (this.props.selected) {
        stationClasses.push('station-selected');
      }

      return _react2.default.createElement(
        'div',
        {
          id: this.props.station.id,
          className: stationClasses.join(' '),
          onClick: this.handleClick
        },
        _react2.default.createElement('div', { className: 'station-state-light' }),
        _react2.default.createElement(
          'div',
          { className: 'station-icon' },
          _react2.default.createElement('img', { alt: this.props.station.app, src: this.props.station.icon })
        ),
        _react2.default.createElement(
          'div',
          { className: 'station-name' },
          this.props.station.name
        ),
        _react2.default.createElement(
          'div',
          { className: 'station-type' },
          this.props.station.type
        ),
        _react2.default.createElement(
          'div',
          { className: 'station-app' },
          this.props.station.app
        ),
        _react2.default.createElement(
          'div',
          { className: 'station-status' },
          this.props.station.status
        )
      );
    }
  }]);

  return Station;
}(_react2.default.Component);

exports.default = Station;


Station.propTypes = {
  station: _react2.default.PropTypes.shape({
    id: _react2.default.PropTypes.string,
    name: _react2.default.PropTypes.string,
    state: _react2.default.PropTypes.string,
    type: _react2.default.PropTypes.string,
    status: _react2.default.PropTypes.string,
    app: _react2.default.PropTypes.string,
    icon: _react2.default.PropTypes.string
  }).isRequired,
  selected: _react2.default.PropTypes.bool,
  onClickStation: _react2.default.PropTypes.func
};

},{"react":"react"}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwU2VsZWN0LmpzeCIsInNyYy9idXR0b25GaWx0ZXIuanN4Iiwic3JjL2NvbnNvbGVWaWV3ZXIuanN4Iiwic3JjL2Rhc2hib2FyZC5qc3giLCJzcmMvbG9nVmlld2VyLmpzeCIsInNyYy9tYWluLmpzeCIsInNyYy9zdGF0aW9uLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTXFCLFM7OztBQUVuQixxQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsNkZBQ1gsS0FEVzs7QUFFakIsVUFBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsVUFBSyxnQkFBTCxHQUF3QixNQUFLLGdCQUFMLENBQXNCLElBQXRCLE9BQXhCO0FBSGlCO0FBSWxCOzs7O3VDQUVrQjtBQUNqQixVQUFJLEtBQUssS0FBTCxDQUFXLFFBQWYsRUFBeUI7QUFDdkIsYUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixLQUFLLFdBQUwsQ0FBaUIsS0FBckM7QUFDRDtBQUNGOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFNLGVBQWUsRUFBckI7O0FBRUEsVUFBSSxLQUFLLEtBQUwsQ0FBVyxVQUFmLEVBQTJCO0FBQ3pCLHFCQUFhLElBQWIsQ0FDRTtBQUFBO1VBQUEsRUFBUSxLQUFJLE1BQVosRUFBbUIsT0FBTSxFQUF6QjtVQUFBO0FBQUEsU0FERjtBQUdEOztBQVBNO0FBQUE7QUFBQTs7QUFBQTtBQVNQLDZCQUEwQixLQUFLLEtBQUwsQ0FBVyxZQUFyQyw4SEFBbUQ7QUFBQSxjQUF4QyxXQUF3Qzs7QUFDakQsdUJBQWEsSUFBYixDQUNFO0FBQUE7WUFBQSxFQUFRLEtBQUssV0FBYixFQUEwQixPQUFPLFdBQWpDO1lBQStDO0FBQS9DLFdBREY7QUFHRDtBQWJNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFB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ZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG4vKipcbiAqIEFwcFNlbGVjdCBjb21wb25lbnRcbiAqIEFsbG93cyB0aGUgdXNlciB0byBzZWxlY3QgYW4gYXBwbGljYXRpb24gZnJvbSBhIGxpc3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwU2VsZWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmFwcFNlbGVjdG9yID0gbnVsbDtcbiAgICB0aGlzLmNsaWNrZWRDaGFuZ2VBcHAgPSB0aGlzLmNsaWNrZWRDaGFuZ2VBcHAuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNsaWNrZWRDaGFuZ2VBcHAoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5hcHBTZWxlY3Rvci52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGFwcGxpY2F0aW9ucyA9IFtdO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuYWxsb3dCbGFuaykge1xuICAgICAgYXBwbGljYXRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PVwibnVsbFwiIHZhbHVlPVwiXCI+Jm5ic3A7PC9vcHRpb24+XG4gICAgICApO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgYXBwbGljYXRpb24gb2YgdGhpcy5wcm9wcy5hcHBsaWNhdGlvbnMpIHtcbiAgICAgIGFwcGxpY2F0aW9ucy5wdXNoKFxuICAgICAgICA8b3B0aW9uIGtleT17YXBwbGljYXRpb259IHZhbHVlPXthcHBsaWNhdGlvbn0+e2FwcGxpY2F0aW9ufTwvb3B0aW9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBkaXNhYmxlZENsYXNzID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPyAnIGRpc2FibGVkJyA6ICcnKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGFwcFNlbGVjdCR7ZGlzYWJsZWRDbGFzc31gfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWlubGluZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBmb3JtLWdyb3VwLW1pbndpZHRoXCI+XG4gICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCR7ZGlzYWJsZWRDbGFzc31gfVxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuZGVmYXVsdFZhbHVlID8gdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgOiAnJ31cbiAgICAgICAgICAgICAgcmVmPXsoc2VsKSA9PiB7IHRoaXMuYXBwU2VsZWN0b3IgPSBzZWw7IH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHthcHBsaWNhdGlvbnN9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAmbmJzcDtcbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi13YXJuaW5nJHtkaXNhYmxlZENsYXNzfWB9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNsaWNrZWRDaGFuZ2VBcHB9XG4gICAgICAgICAgPkNoYW5nZSBhcHBsaWNhdGlvbjwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkFwcFNlbGVjdC5wcm9wVHlwZXMgPSB7XG4gIGFwcGxpY2F0aW9uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICApLFxuICBkZWZhdWx0VmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGFsbG93Qmxhbms6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbn07XG5cbkFwcFNlbGVjdC5kZWZhdWx0UHJvcHMgPSB7XG4gIGFwcGxpY2F0aW9uczogW10sXG4gIGRlZmF1bHRWYWx1ZTogJycsXG4gIGFsbG93Qmxhbms6IGZhbHNlLFxuICBkaXNhYmxlZDogZmFsc2UsXG4gIG9uQ2hhbmdlOiAoKSA9PiB7fSxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBCdXR0b25GaWx0ZXIgPSAocHJvcHMpID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuXG4gIGZvciAoY29uc3Qgb3B0aW9uIG9mIHByb3BzLm9wdGlvbnMpIHtcbiAgICBjb25zdCBjbGFzc2VzID0gWydidG4nLCAnYnRuLWRlZmF1bHQnLCBgYnV0dG9uLWZpbHRlci1vcHRpb24tJHtvcHRpb259YF07XG4gICAgaWYgKHByb3BzLnZhbHVlID09PSBvcHRpb24pIHtcbiAgICAgIGNsYXNzZXMucHVzaCgnYWN0aXZlJyk7XG4gICAgfVxuICAgIGxldCBjb3VudGVyID0gJyc7XG4gICAgbGV0IHNwYWNpbmcgPSAnJztcbiAgICBpZiAocHJvcHMuY291bnRzICE9PSBudWxsKSB7XG4gICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgaWYgKHByb3BzLmNvdW50cy5oYXNPd25Qcm9wZXJ0eShvcHRpb24pICYmIHByb3BzLmNvdW50c1tvcHRpb25dICE9PSAwKSB7XG4gICAgICAgIGNvdW50ID0gcHJvcHMuY291bnRzW29wdGlvbl07XG4gICAgICB9XG4gICAgICBjb25zdCBiYWRnZUNsYXNzZXMgPSBgYmFkZ2Uke2NvdW50ID09PSAwID8gJyB6ZXJvJyA6ICcgbm9uLXplcm8nfWA7XG4gICAgICBjb3VudGVyID0gKDxzcGFuIGNsYXNzTmFtZT17YmFkZ2VDbGFzc2VzfT57Y291bnR9PC9zcGFuPik7XG4gICAgICBzcGFjaW5nID0gJyAnO1xuICAgIH1cbiAgICBvcHRpb25zLnB1c2goXG4gICAgICA8YVxuICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKCcgJyl9XG4gICAgICAgIGtleT17b3B0aW9ufVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBwcm9wcy5vbkNoYW5nZShvcHRpb24pfVxuICAgICAgPntvcHRpb259e3NwYWNpbmd9e2NvdW50ZXJ9PC9hPlxuICAgICk7XG4gIH1cblxuICBjb25zdCBkZWZhdWx0Q2xhc3NlcyA9IFsnYnRuJywgJ2J0bi1kZWZhdWx0J107XG4gIGlmIChwcm9wcy52YWx1ZSA9PT0gJycpIHtcbiAgICBkZWZhdWx0Q2xhc3Nlcy5wdXNoKCdhY3RpdmUnKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJidG4tdG9vbGJhciBidXR0b24tZmlsdGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cFwiPlxuICAgICAgICA8YVxuICAgICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgICBjbGFzc05hbWU9e2RlZmF1bHRDbGFzc2VzLmpvaW4oJyAnKX1cbiAgICAgICAgICBrZXk9XCJudWxsXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBwcm9wcy5vbkNoYW5nZSgnJyl9XG4gICAgICAgID57cHJvcHMuYWxsVGV4dH08L2E+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgIHtvcHRpb25zfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5CdXR0b25GaWx0ZXIucHJvcFR5cGVzID0ge1xuICBvcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nKSxcbiAgY291bnRzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gIGFsbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5CdXR0b25GaWx0ZXIuZGVmYXVsdFByb3BzID0ge1xuICBvcHRpb25zOiBbXSxcbiAgY291bnRzOiBudWxsLFxuICBhbGxUZXh0OiAnQWxsJyxcbiAgdmFsdWU6ICcnLFxuICBvbkNoYW5nZTogKCkgPT4ge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25GaWx0ZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zb2xlVmlld2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLm1vZGFsRElWID0gbnVsbDtcbiAgfVxuXG4gIG9wZW5Nb2RhbCgpIHtcbiAgICBpZiAodGhpcy5tb2RhbERJViAhPT0gbnVsbCkge1xuICAgICAgJCh0aGlzLm1vZGFsRElWKS5tb2RhbCgpO1xuICAgICAgJCh0aGlzLm1vZGFsRElWKS5vbignc2hvd24uYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgbW9kYWxCb2R5ID0gJCh0aGlzKS5maW5kKCcubW9kYWwtYm9keScpLmZpcnN0KClbMF07XG4gICAgICAgIG1vZGFsQm9keS5zY3JvbGxUb3AgPSBNYXRoLm1heChtb2RhbEJvZHkuc2Nyb2xsSGVpZ2h0LCBtb2RhbEJvZHkuY2xpZW50SGVpZ2h0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICQod2luZG93KS5vbigncmVzaXplJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgICAkKHRoaXMubW9kYWxESVYpLm9uKCdzaG93LmJzLm1vZGFsJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZSgpIHtcbiAgICBjb25zdCAkbW9kYWwgPSAkKHRoaXMubW9kYWxESVYpO1xuICAgIGNvbnN0IG1vZGFsSGVhZGVySGVpZ2h0ID0gNTY7XG4gICAgY29uc3QgbW9kYWxNYXJnaW4gPSAzMDtcbiAgICBjb25zdCBtb2RhbEJvcmRlciA9IDE7XG5cbiAgICBjb25zdCBib2R5SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gKG1vZGFsSGVhZGVySGVpZ2h0ICsgbW9kYWxNYXJnaW4gKiAyICsgbW9kYWxCb3JkZXIgKiAyKTtcbiAgICAkbW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5jc3MoeyBtYXhIZWlnaHQ6IGJvZHlIZWlnaHQgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZSBjb25zb2xlVmlld2VyLW1vZGFsXCIgdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiByZWY9eyhjKSA9PiB7IHRoaXMubW9kYWxESVYgPSBjOyB9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2cgbW9kYWwtbGdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+e3RoaXMucHJvcHMudGl0bGV9PC9oND5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgIDxwcmU+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGluZXMuam9pbignXFxuJyl9XG4gICAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Db25zb2xlVmlld2VyLnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGxpbmVzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nKSxcbn07XG5cbkNvbnNvbGVWaWV3ZXIuZGVmYXVsdFByb3BzID0ge1xuICB0aXRsZTogJ1Rlcm1pbmFsIE91dHB1dCcsXG4gIGxpbmVzOiBbXSxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFN0YXRpb24gZnJvbSAnLi9zdGF0aW9uLmpzeCc7XG5pbXBvcnQgQXBwU2VsZWN0IGZyb20gJy4vYXBwU2VsZWN0LmpzeCc7XG5pbXBvcnQgQnV0dG9uRmlsdGVyIGZyb20gJy4vYnV0dG9uRmlsdGVyLmpzeCc7XG5pbXBvcnQgTG9nVmlld2VyIGZyb20gJy4vbG9nVmlld2VyLmpzeCc7XG5pbXBvcnQgQ29uc29sZVZpZXdlciBmcm9tICcuL2NvbnNvbGVWaWV3ZXIuanN4JztcblxuLy8gY29uc3QgdG1wX2xvZ19lbnRyaWVzID0gcmVxdWlyZSgnLi90bXBfbG9nLmpzb24nKS5lbnRyaWVzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdGF0aW9uczogW10sXG4gICAgICBzZWxlY3Rpb246IG5ldyBTZXQoKSxcbiAgICAgIHZpc2libGVUeXBlOiAnJyxcbiAgICAgIHZpc2libGVTdGF0ZTogJycsXG4gICAgICBsb2c6IFtdLFxuICAgICAgc2VydmVyQ29ubmVjdGlvbkVycm9yOiBmYWxzZSxcbiAgICB9O1xuICAgIHRoaXMuc2VsZWN0VG9nZ2xlID0gdGhpcy5zZWxlY3RUb2dnbGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNoYW5nZUFwcFNlbGVjdGVkID0gdGhpcy5jaGFuZ2VBcHBTZWxlY3RlZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY29tbWFuZHMgPSB7fTtcbiAgICB0aGlzLmluaXRDb21tYW5kcygpO1xuICAgIHRoaXMuZ2V0Q29tbWFuZCA9IHRoaXMuZ2V0Q29tbWFuZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9nVmlld2VyID0gbnVsbDtcbiAgICB0aGlzLmNvbnNvbGVWaWV3ZXIgPSBudWxsO1xuICAgIHRoaXMudXBkYXRlSUQgPSAwO1xuICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5ID0gMDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucG9sbExvb3AoKTtcbiAgfVxuXG4gIGdldFN0YXRpb25TdGF0ZShzdGF0aW9uSUQpIHtcbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgaWYgKHN0YXRpb24uaWQgPT09IHN0YXRpb25JRCkge1xuICAgICAgICByZXR1cm4gc3RhdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRTdGF0aW9uVHlwZXMoKSB7XG4gICAgY29uc3QgdHlwZXMgPSBuZXcgU2V0KCk7XG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIHR5cGVzLmFkZChzdGF0aW9uLnR5cGUpO1xuICAgIH1cblxuICAgIHJldHVybiBBcnJheS5mcm9tKHR5cGVzKTtcbiAgfVxuXG4gIGdldENvbW1hbmQoY29tbWFuZE5hbWUpIHtcbiAgICBpZiAodGhpcy5jb21tYW5kc1tjb21tYW5kTmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29tbWFuZHNbY29tbWFuZE5hbWVdLmRvQ2FsbGJhY2s7XG4gICAgfVxuICAgIHRocm93IEVycm9yKGBDYWxsIHRvIGludmFsaWQgY29tbWFuZCAke2NvbW1hbmROYW1lfWApO1xuICB9XG5cbiAgZ2V0VmlzaWJsZVN0YXRpb25zKCkge1xuICAgIGNvbnN0IGFuc3dlciA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIGlmICgodGhpcy5zdGF0ZS52aXNpYmxlVHlwZSA9PT0gJycgfHwgc3RhdGlvbi50eXBlID09PSB0aGlzLnN0YXRlLnZpc2libGVUeXBlKSAmJlxuICAgICAgICAgICh0aGlzLnN0YXRlLnZpc2libGVTdGF0ZSA9PT0gJycgfHxcbiAgICAgICAgICAgdGhpcy5kaXNwbGF5U3RhdGUoc3RhdGlvbi5zdGF0ZSkgPT09IHRoaXMuc3RhdGUudmlzaWJsZVN0YXRlKSkge1xuICAgICAgICBhbnN3ZXIucHVzaChzdGF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYW5zd2VyO1xuICB9XG5cbiAgZGlzcGxheVN0YXRlKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlID09PSAnc3RhcnRpbmdfc3RhdGlvbicgfHxcbiAgICAgIHN0YXRlID09PSAnc3RhcnRpbmdfYXBwJyB8fFxuICAgICAgc3RhdGUgPT09ICdzdG9wcGluZycgfHxcbiAgICAgIHN0YXRlID09PSAnc3dpdGNoaW5nX2FwcCcpIHtcbiAgICAgIHJldHVybiAnYnVzeSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgYXR0YWNoQ29uZmlybWF0aW9uKHRleHQsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICBib290Ym94LmRpYWxvZyh7XG4gICAgICAgIG1lc3NhZ2U6IHRleHQsXG4gICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICB3YXJuaW5nOiB7XG4gICAgICAgICAgICBsYWJlbDogJ0NvbmZpcm0nLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuLXdhcm5pbmcnLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLmJpbmQodGhpcywgLi4uYXJncyksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjYW5jZWw6IHtcbiAgICAgICAgICAgIGxhYmVsOiAnQ2FuY2VsJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bi1kZWZhdWx0JyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGluaXRDb21tYW5kcygpIHtcbiAgICB0aGlzLmNvbW1hbmRzID0ge1xuICAgICAgJ3N0YXRpb25zLWFsbC1zdGFydCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RhcnRBbGwuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzdGFydCBhbGwgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1hbGwtc3RvcCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RvcEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3N0b3AgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtYWxsLXNlbGVjdCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc2VsZWN0QWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc2VsZWN0IGFsbCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IGZhbHNlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1hbGwtZGVzZWxlY3QnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLmRlc2VsZWN0QWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnZGVzZWxlY3QgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLXNlbGVjdGVkLXN0YXJ0Jzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5zdGFydFNlbGVjdGVkLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RhcnQgdGhlIHNlbGVjdGVkIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtc2VsZWN0ZWQtc3RvcCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RvcFNlbGVjdGVkLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RvcCB0aGUgc2VsZWN0ZWQgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy12aXNpYmxlLXNlbGVjdCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc2VsZWN0QWxsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3NlbGVjdCB2aXNpYmxlIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXModGhpcy5jb21tYW5kcykpIHtcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSB0aGlzLmNvbW1hbmRzW25hbWVdO1xuICAgICAgaWYgKGNvbW1hbmQuY29uZmlybSkge1xuICAgICAgICB0aGlzLmNvbW1hbmRzW25hbWVdLmRvQ2FsbGJhY2sgPSB0aGlzLmF0dGFjaENvbmZpcm1hdGlvbihcbiAgICAgICAgICBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvICR7Y29tbWFuZC50aXRsZX0/YCxcbiAgICAgICAgICBjb21tYW5kLmNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbW1hbmRzW25hbWVdLmRvQ2FsbGJhY2sgPSBjb21tYW5kLmNhbGxiYWNrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFsbFN0YXRpb25JRHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGlvbklEcyh0aGlzLnN0YXRlLnN0YXRpb25zKTtcbiAgfVxuXG4gIHN0YXRpb25JRHMoc3RhdGlvbnMpIHtcbiAgICBjb25zdCBpZHMgPSBuZXcgU2V0KCk7XG5cbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2Ygc3RhdGlvbnMpIHtcbiAgICAgIGlkcy5hZGQoc3RhdGlvbi5pZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlkcztcbiAgfVxuXG4gIHNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW9uOiB0aGlzLmFsbFN0YXRpb25JRHMoKSB9KTtcbiAgfVxuXG4gIHNlbGVjdEFsbFZpc2libGUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogdGhpcy5zdGF0aW9uSURzKHRoaXMuZ2V0VmlzaWJsZVN0YXRpb25zKCkpIH0pO1xuICB9XG5cbiAgZGVzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogbmV3IFNldCgpIH0pO1xuICB9XG5cbiAgc2VsZWN0VG9nZ2xlKGlkKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0aW9uLmhhcyhpZCkpIHtcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmRlbGV0ZShpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmFkZChpZCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3Rpb246IHRoaXMuc3RhdGUuc2VsZWN0aW9uIH0pO1xuICB9XG5cbiAgc3RvcFN0YXRpb25zKHN0YXRpb25JRHMpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9zdGF0aW9ucy5qc29uJyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgYWN0aW9uOiAnc3RvcCcsXG4gICAgICAgIHN0YXRpb25JRHM6IEFycmF5LmZyb20oc3RhdGlvbklEcyksXG4gICAgICB9KSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7fSxcbiAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICB9KTtcbiAgfVxuXG4gIHN0b3BTZWxlY3RlZCgpIHtcbiAgICB0aGlzLnN0b3BTdGF0aW9ucyh0aGlzLnN0YXRlLnNlbGVjdGlvbik7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICB9XG5cbiAgc3RvcEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9wU3RhdGlvbnModGhpcy5hbGxTdGF0aW9uSURzKCkpO1xuICB9XG5cbiAgc3RhcnRTdGF0aW9ucyhzdGF0aW9uSURzKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvc3RhdGlvbnMuanNvbicsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGFjdGlvbjogJ3N0YXJ0JyxcbiAgICAgICAgc3RhdGlvbklEczogQXJyYXkuZnJvbShzdGF0aW9uSURzKSxcbiAgICAgIH0pLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHt9LFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICB9XG5cbiAgc3RhcnRTZWxlY3RlZCgpIHtcbiAgICB0aGlzLnN0YXJ0U3RhdGlvbnModGhpcy5zdGF0ZS5zZWxlY3Rpb24pO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHN0YXJ0QWxsKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0U3RhdGlvbnModGhpcy5hbGxTdGF0aW9uSURzKCkpO1xuICB9XG5cbiAgY2hhbmdlQXBwU2VsZWN0ZWQoYXBwKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvc3RhdGlvbnMuanNvbicsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGFjdGlvbjogJ2NoYW5nZV9hcHAnLFxuICAgICAgICBzdGF0aW9uSURzOiBBcnJheS5mcm9tKHRoaXMuc3RhdGUuc2VsZWN0aW9uKSxcbiAgICAgICAgYXBwLFxuICAgICAgfSksXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4ge30sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSB0aGUgc2VydmVyIHBvbGxcbiAgICpcbiAgICogSW1wbGVtZW50YXRpb246IFNpbmNlIHRoZSBzZXJ2ZXIgdXNlcyBsb25nIHBvbGxpbmcgd2UgdXNlIGEgdmVyeSBzaG9ydFxuICAgKiBwb2xsIHRpbWUgKDUwMG1zKS4gSW4gY2FzZSBvZiBlcnJvcnMgY29udGFjdGluZyB0aGUgc2VydmVyIHRoZSBwb2xsIHRpbWVcbiAgICogaW5jcmVhc2VzIHdpdGggZWFjaCBlcnJvciB1bnRpbCBhIG1heCBwb2xsIHRpbWUgaXMgcmVhY2hlZC5cbiAgICovXG4gIHBvbGxMb29wKCkge1xuICAgIGNvbnN0IG1pblBvbGxUaW1lID0gNTAwO1xuICAgIGxldCByZXRyeVBvbGxUaW1lID0gbWluUG9sbFRpbWU7XG4gICAgY29uc3QgcmV0cnlJbmNyZWFzZUZhY3RvciA9IDI7XG4gICAgY29uc3QgbWF4UmV0cnlQb2xsVGltZSA9IDQwMDA7XG5cbiAgICBjb25zdCBsb29wID0gKCkgPT4ge1xuICAgICAgdGhpcy5wb2xsU2VydmVyKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQobG9vcCwgbWluUG9sbFRpbWUpO1xuICAgICAgICByZXRyeVBvbGxUaW1lID0gbWluUG9sbFRpbWU7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlcnZlckNvbm5lY3Rpb25FcnJvcikge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXJ2ZXJDb25uZWN0aW9uRXJyb3I6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5ID0gMDtcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChsb29wLCByZXRyeVBvbGxUaW1lKTtcbiAgICAgICAgaWYgKHJldHJ5UG9sbFRpbWUgPCBtYXhSZXRyeVBvbGxUaW1lKSB7XG4gICAgICAgICAgcmV0cnlQb2xsVGltZSA9IHJldHJ5UG9sbFRpbWUgKiByZXRyeUluY3JlYXNlRmFjdG9yO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5Kys7XG4gICAgICAgIGlmICh0aGlzLnNlcnZlckNvbm5lY3Rpb25SZXRyeSA+IDUpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmVyQ29ubmVjdGlvbkVycm9yOiB0cnVlIH0pO1xuICAgICAgICAgIC8vIFJlc2V0IHRoZSB1cGRhdGVJRCBzbyB0aGUgbmV4dCBwb2xsIHJldHVybnMgaW1tZWRpYXRlbHlcbiAgICAgICAgICAvLyBpbnN0ZWFkIG9mIGJlaW5nIGEgbG9uZyBwb2xsXG4gICAgICAgICAgdGhpcy51cGRhdGVJRCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgbG9vcCgpO1xuICB9XG5cbiAgcG9sbFNlcnZlcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9wb2xsLmpzb24nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgbGFzdFNlZW46IHRoaXMudXBkYXRlSUQsXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgdGltZW91dDogMzAwMDAsXG4gICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGEuc3RhdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJRCA9IGRhdGEudXBkYXRlSUQ7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc3RhdGlvbnM6IGRhdGEuc3RhdGlvbnMgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByb3BzLnVybCwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzdGF0aW9ucyA9IFtdO1xuICAgIGNvbnN0IGFjdGlvbnMgPSBbXTtcbiAgICBsZXQgbWVzc2FnZUJhciA9ICcnO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuc2VydmVyQ29ubmVjdGlvbkVycm9yKSB7XG4gICAgICBtZXNzYWdlQmFyID0gKDxkaXYgY2xhc3NOYW1lPVwibWVzc2FnZV9iYXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZXNzYWdlX2Jhci1tZXNzYWdlXCI+XG4gICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtd2FybmluZ1wiPjwvaT4gIE5vIGNvbm5lY3Rpb24gdG8gc2VydmVyLlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2Pik7XG4gICAgfVxuXG4gICAgdGhpcy5nZXRWaXNpYmxlU3RhdGlvbnMoKS5mb3JFYWNoKChzdGF0aW9uKSA9PiBzdGF0aW9ucy5wdXNoKFxuICAgICAgPFN0YXRpb25cbiAgICAgICAgc3RhdGlvbj17c3RhdGlvbn1cbiAgICAgICAga2V5PXtzdGF0aW9uLmlkfVxuICAgICAgICBzZWxlY3RlZD17dGhpcy5zdGF0ZS5zZWxlY3Rpb24uaGFzKHN0YXRpb24uaWQpfVxuICAgICAgICBvbkNsaWNrU3RhdGlvbj17dGhpcy5zZWxlY3RUb2dnbGV9XG4gICAgICAvPlxuICAgICkpO1xuXG4gICAgY29uc3QgY291bnRzID0ge307XG4gICAgdGhpcy5zdGF0ZS5zdGF0aW9ucy5mb3JFYWNoKChzdGF0aW9uKSA9PiB7XG4gICAgICBpZiAoIWNvdW50cy5oYXNPd25Qcm9wZXJ0eSh0aGlzLmRpc3BsYXlTdGF0ZShzdGF0aW9uLnN0YXRlKSkpIHtcbiAgICAgICAgY291bnRzW3RoaXMuZGlzcGxheVN0YXRlKHN0YXRpb24uc3RhdGUpXSA9IDA7XG4gICAgICB9XG4gICAgICBjb3VudHNbdGhpcy5kaXNwbGF5U3RhdGUoc3RhdGlvbi5zdGF0ZSldKys7XG4gICAgfSk7XG5cbiAgICBjb25zdCBzZWxlY3RlZENvdW50ID0gdGhpcy5zdGF0ZS5zZWxlY3Rpb24uc2l6ZTtcbiAgICBjb25zdCBhbGxTZWxlY3RlZCA9IChzZWxlY3RlZENvdW50ID09PSB0aGlzLnN0YXRlLnN0YXRpb25zLmxlbmd0aCk7XG4gICAgY29uc3Qgc2VsZWN0QWxsQ2xhc3NlcyA9XG4gICAgICBgYnRuIGJ0bi1kZWZhdWx0ICR7YWxsU2VsZWN0ZWQgPyAnIGRpc2FibGVkJyA6ICcnfWA7XG5cbiAgICBjb25zdCBkZXNlbGVjdEFsbENsYXNzZXMgPVxuICAgICAgYGJ0biBidG4tZGVmYXVsdCAke3NlbGVjdGVkQ291bnQgPT09IDAgPyAnIGRpc2FibGVkJyA6ICcnfWA7XG5cbiAgICBjb25zdCBzdGF0aW9uV29yZCA9IHNlbGVjdGVkQ291bnQgPT09IDEgPyAnc3RhdGlvbicgOiAnc3RhdGlvbnMnO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzdGF0aW9uU3RhdGVGaWx0ZXJcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8QnV0dG9uRmlsdGVyXG4gICAgICAgICAgb3B0aW9ucz17WydvbicsICdvZmYnLCAnYnVzeScsICdlcnJvciddfVxuICAgICAgICAgIGNvdW50cz17Y291bnRzfVxuICAgICAgICAgIGFsbFRleHQ9XCJBbGwgc3RhdGVzXCJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52aXNpYmxlU3RhdGV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhvcHRpb24pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2aXNpYmxlU3RhdGU6IG9wdGlvbiB9KTtcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic3RhdGlvblR5cGVGaWx0ZXJcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8QnV0dG9uRmlsdGVyXG4gICAgICAgICAgb3B0aW9ucz17dGhpcy5nZXRTdGF0aW9uVHlwZXMoKX1cbiAgICAgICAgICBhbGxUZXh0PVwiQWxsIHR5cGVzXCJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52aXNpYmxlVHlwZX1cbiAgICAgICAgICBvbkNoYW5nZT17KG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZpc2libGVUeXBlOiBvcHRpb24gfSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInNlbGVjdGVkQ291bnRcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lLXNlcGFyYXRvclwiID48L2Rpdj5cbiAgICAgICAgPGI+e3RoaXMuc3RhdGUuc2VsZWN0aW9uLnNpemV9IHtzdGF0aW9uV29yZH0gc2VsZWN0ZWQ8L2I+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0QWN0aW9uc1wiPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBjbGFzc05hbWU9e2Rlc2VsZWN0QWxsQ2xhc3Nlc31cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZ2V0Q29tbWFuZCgnc3RhdGlvbnMtYWxsLWRlc2VsZWN0Jyl9XG4gICAgICAgICAgPkRlc2VsZWN0PC9hPiZuYnNwO1xuICAgICAgICAgIDxhXG4gICAgICAgICAgICBjbGFzc05hbWU9e3NlbGVjdEFsbENsYXNzZXN9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLXZpc2libGUtc2VsZWN0Jyl9XG4gICAgICAgICAgPlNlbGVjdCBhbGw8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGNvbnN0IG5vU2VsZWN0aW9uRGlzYWJsZSA9IChzZWxlY3RlZENvdW50ID09PSAwID8gJyBkaXNhYmxlZCcgOiAnJyk7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInN0YXJ0U3RvcFBhbmVsXCIgY2xhc3NOYW1lPXtgYWN0aW9uLXBhbmUke25vU2VsZWN0aW9uRGlzYWJsZX1gfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZS1zZXBhcmF0b3JcIiA+PC9kaXY+XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi1zdWNjZXNzJHtub1NlbGVjdGlvbkRpc2FibGV9YH1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLXNlbGVjdGVkLXN0YXJ0Jyl9XG4gICAgICAgID48aSBjbGFzc05hbWU9XCJmYSBmYS1wbGF5XCIgLz4mbmJzcDsmbmJzcDtTdGFydCBTZWxlY3RlZDwvYT5cbiAgICAgICAgJm5ic3A7XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi1kYW5nZXIke25vU2VsZWN0aW9uRGlzYWJsZX1gfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZ2V0Q29tbWFuZCgnc3RhdGlvbnMtc2VsZWN0ZWQtc3RvcCcpfVxuICAgICAgICA+PGkgY2xhc3NOYW1lPVwiZmEgZmEtc3RvcFwiIC8+Jm5ic3A7Jm5ic3A7U3RvcCBTZWxlY3RlZDwvYT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBsZXQgc2VsZWN0ZWRBcmVTYW1lVHlwZSA9IHRydWU7XG4gICAgbGV0IGxhc3RUeXBlID0gbnVsbDtcbiAgICBmb3IgKGNvbnN0IHNlbGVjdGVkSUQgb2YgdGhpcy5zdGF0ZS5zZWxlY3Rpb24pIHtcbiAgICAgIGlmIChsYXN0VHlwZSA9PT0gbnVsbCkge1xuICAgICAgICBsYXN0VHlwZSA9IHRoaXMuZ2V0U3RhdGlvblN0YXRlKHNlbGVjdGVkSUQpLnR5cGU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5nZXRTdGF0aW9uU3RhdGUoc2VsZWN0ZWRJRCkudHlwZSAhPT0gbGFzdFR5cGUpIHtcbiAgICAgICAgc2VsZWN0ZWRBcmVTYW1lVHlwZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYWxsU2VsZWN0ZWRPbiA9IHRydWU7XG4gICAgZm9yIChjb25zdCBzZWxlY3RlZElEIG9mIHRoaXMuc3RhdGUuc2VsZWN0aW9uKSB7XG4gICAgICBpZiAodGhpcy5nZXRTdGF0aW9uU3RhdGUoc2VsZWN0ZWRJRCkuc3RhdGUgIT09ICdvbicpIHtcbiAgICAgICAgYWxsU2VsZWN0ZWRPbiA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjYW5DaGFuZ2VBcHAgPSAoYWxsU2VsZWN0ZWRPbiAmJiAoc2VsZWN0ZWRDb3VudCA+IDApICYmIHNlbGVjdGVkQXJlU2FtZVR5cGUpO1xuXG4gICAgbGV0IGFwcGxpY2F0aW9ucyA9IFtdO1xuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiB0aGlzLnN0YXRlLnN0YXRpb25zKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3Rpb24uaGFzKHN0YXRpb24uaWQpKSB7XG4gICAgICAgIGFwcGxpY2F0aW9ucyA9IHN0YXRpb24ucG9zc2libGVfYXBwcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cImFwcFNlbGVjdFwiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmUtc2VwYXJhdG9yXCIgPjwvZGl2PlxuICAgICAgICA8QXBwU2VsZWN0XG4gICAgICAgICAgYXBwbGljYXRpb25zPXtjYW5DaGFuZ2VBcHAgPyBhcHBsaWNhdGlvbnMgOiBbXX1cbiAgICAgICAgICBkaXNhYmxlZD17IWNhbkNoYW5nZUFwcH1cbiAgICAgICAgICBhbGxvd0JsYW5rXG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuYXR0YWNoQ29uZmlybWF0aW9uKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHRoZSBhcHBsaWNhdGlvbj8nLFxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VBcHBTZWxlY3RlZCl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgY29uc3Qgbm9UZXJtaW5hbE91dHB1dERpc2FibGUgPSAoc2VsZWN0ZWRDb3VudCAhPT0gMSA/ICcgZGlzYWJsZWQnIDogJycpO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzaG93TG9nXCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZS1zZXBhcmF0b3JcIiA+PC9kaXY+XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCJcbiAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5sb2dWaWV3ZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhpcy5sb2dWaWV3ZXIub3Blbk1vZGFsKCk7XG4gICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9sb2cuanNvbicsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvZzogZGF0YS5lbnRyaWVzLnJldmVyc2UoKSB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH19XG4gICAgICAgID5TaG93IGxvZzwvYT5cbiAgICAgICAgJm5ic3A7XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi1kZWZhdWx0JHtub1Rlcm1pbmFsT3V0cHV0RGlzYWJsZX1gfVxuICAgICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgICBvbkNsaWNrPXsoZXYpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnNvbGVWaWV3ZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhpcy5jb25zb2xlVmlld2VyLm9wZW5Nb2RhbCgpO1xuICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvc3RhdGlvbl9vdXRwdXQuanNvbicsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgc3RhdGlvbklEOiBBcnJheS5mcm9tKHRoaXMuc3RhdGUuc2VsZWN0aW9uKVswXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBBcnJheS5mcm9tKHRoaXMuc3RhdGUuc2VsZWN0aW9uKVswXSxcbiAgICAgICAgICAgICAgICAgICAgbGluZXM6IGRhdGEubGluZXMsXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH19XG4gICAgICAgID5UZXJtaW5hbCBvdXRwdXQ8L2E+XG4gICAgICAgICZuYnNwO1xuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT17J2J0biBidG4tZGVmYXVsdCd9XG4gICAgICAgICAgaHJlZj1cIiNcIlxuICAgICAgICAgIG9uQ2xpY2s9eyhldikgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uc29sZVZpZXdlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICB0aGlzLmNvbnNvbGVWaWV3ZXIub3Blbk1vZGFsKCk7XG4gICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9zdGF0aW9uX291dHB1dC5qc29uJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0dsb2JhbCBvdXRwdXQnLFxuICAgICAgICAgICAgICAgICAgICBsaW5lczogZGF0YS5saW5lcyxcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgPkdsb2JhbCBvdXRwdXQ8L2E+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXttZXNzYWdlQmFyICE9PSAnJyA/ICd3aXRoLW1lc3NhZ2VfYmFyJyA6ICcnfT5cbiAgICAgICAge21lc3NhZ2VCYXJ9XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTYgcGFuZS1zdGF0aW9uc1wiPlxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGFzaGJvYXJkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInN0YXRpb25MaXN0XCIgY2xhc3NOYW1lPVwicGFuZWwtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgIHtzdGF0aW9uc31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTYgcGFuZS1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJkYXNoYm9hcmRBY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAge2FjdGlvbnN9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8TG9nVmlld2VyIGxvZz17dGhpcy5zdGF0ZS5sb2d9IHJlZj17KGMpID0+IHsgdGhpcy5sb2dWaWV3ZXIgPSBjOyB9fSAvPlxuICAgICAgICA8Q29uc29sZVZpZXdlciBsaW5lcz17dGhpcy5zdGF0ZS5saW5lc30gcmVmPXsoYykgPT4geyB0aGlzLmNvbnNvbGVWaWV3ZXIgPSBjOyB9fSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5EYXNoYm9hcmQucHJvcFR5cGVzID0ge1xuICB1cmw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dWaWV3ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIHN0YXRpYyBmb3JtYXRUaW1lKGlzb1RpbWUpIHtcbiAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoaXNvVGltZSk7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IHllc3RlcmRheSA9IG5ldyBEYXRlKCk7XG4gICAgeWVzdGVyZGF5LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMSk7XG4gICAgbGV0IGRheSA9ICcnO1xuXG4gICAgaWYgKHRvZGF5LmdldE1vbnRoKCkgPT09IHRpbWUuZ2V0TW9udGgoKSAmJlxuICAgICAgdG9kYXkuZ2V0RnVsbFllYXIoKSA9PT0gdGltZS5nZXRGdWxsWWVhcigpICYmXG4gICAgICB0b2RheS5nZXREYXRlKCkgPT09IHRpbWUuZ2V0RGF0ZSgpKSB7XG4gICAgICBkYXkgPSAnVG9kYXknO1xuICAgIH0gZWxzZSBpZiAoeWVzdGVyZGF5LmdldE1vbnRoKCkgPT09IHRpbWUuZ2V0TW9udGgoKSAmJlxuICAgICAgeWVzdGVyZGF5LmdldEZ1bGxZZWFyKCkgPT09IHRpbWUuZ2V0RnVsbFllYXIoKSAmJlxuICAgICAgeWVzdGVyZGF5LmdldERhdGUoKSA9PT0gdGltZS5nZXREYXRlKCkpIHtcbiAgICAgIGRheSA9ICdZZXN0ZXJkYXknO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXkgPSBgJHt0aW1lLmdldEZ1bGxZZWFyKCl9LSR7dGltZS5nZXRNb250aCgpfS0ke3RpbWUuZ2V0RGF0ZSgpfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke2RheX0gJHt0aW1lLmdldEhvdXJzKCl9OiR7dGltZS5nZXRNaW51dGVzKCl9OiR7dGltZS5nZXRTZWNvbmRzKCl9YDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMubW9kYWxESVYgPSBudWxsO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCAoKSA9PiB7IHRoaXMuaGFuZGxlUmVzaXplKCk7IH0pO1xuICAgICQodGhpcy5tb2RhbERJVikub24oJ3Nob3cuYnMubW9kYWwnLCAoKSA9PiB7IHRoaXMuaGFuZGxlUmVzaXplKCk7IH0pO1xuICB9XG5cbiAgb3Blbk1vZGFsKCkge1xuICAgIGlmICh0aGlzLm1vZGFsRElWICE9PSBudWxsKSB7XG4gICAgICAkKHRoaXMubW9kYWxESVYpLm1vZGFsKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUmVzaXplKCkge1xuICAgIGNvbnN0ICRtb2RhbCA9ICQodGhpcy5tb2RhbERJVik7XG4gICAgY29uc3QgbW9kYWxIZWFkZXJIZWlnaHQgPSA1NjtcbiAgICBjb25zdCBtb2RhbE1hcmdpbiA9IDMwO1xuICAgIGNvbnN0IG1vZGFsQm9yZGVyID0gMTtcblxuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSAobW9kYWxIZWFkZXJIZWlnaHQgKyBtb2RhbE1hcmdpbiAqIDIgKyBtb2RhbEJvcmRlciAqIDIpO1xuICAgICRtb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmNzcyh7IG1heEhlaWdodDogYm9keUhlaWdodCB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCByb3dDbGFzc2VzID0ge1xuICAgICAgZXJyb3I6ICdkYW5nZXInLFxuICAgICAgd2FybmluZzogJ3dhcm5pbmcnLFxuICAgIH07XG5cbiAgICBjb25zdCBlbnRyaWVzID0gW107XG4gICAgZm9yIChjb25zdCBsb2dFbnRyeSBvZiB0aGlzLnByb3BzLmxvZykge1xuICAgICAgY29uc3Qgcm93Q2xhc3MgPSByb3dDbGFzc2VzW2xvZ0VudHJ5LnR5cGVdICE9PSB1bmRlZmluZWQgPyByb3dDbGFzc2VzW2xvZ0VudHJ5LnR5cGVdIDogJyc7XG5cbiAgICAgIGVudHJpZXMucHVzaChcbiAgICAgICAgPHRyIGtleT17bG9nRW50cnkuaWR9IGNsYXNzTmFtZT17cm93Q2xhc3N9PlxuICAgICAgICAgIDx0ZD57TG9nVmlld2VyLmZvcm1hdFRpbWUobG9nRW50cnkudGltZSl9PC90ZD5cbiAgICAgICAgICA8dGQ+e2xvZ0VudHJ5LnN0YXRpb25fbmFtZX08L3RkPlxuICAgICAgICAgIDx0ZD57bG9nRW50cnkubWVzc2FnZX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlIGxvZ1ZpZXdlci1tb2RhbFwiIHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgcmVmPXsoYykgPT4geyB0aGlzLm1vZGFsRElWID0gYzsgfX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nIG1vZGFsLWxnXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPnt0aGlzLnByb3BzLnRpdGxlfTwvaDQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUgdGFibGUtZml4ZWQgdGFibGUtY29uZGVuc2VkXCI+XG4gICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+VGltZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5TdGF0aW9uPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPk1lc3NhZ2U8L3RoPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICB7ZW50cmllc31cbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Mb2dWaWV3ZXIucHJvcFR5cGVzID0ge1xuICB0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgbG9nOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgdGltZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHN0YXRpb25faWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBzdGF0aW9uX25hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBtZXNzYWdlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIH0pXG4gICksXG59O1xuXG5Mb2dWaWV3ZXIuZGVmYXVsdFByb3BzID0ge1xuICBsb2c6IFtdLFxuICB0aXRsZTogJ0V2ZW50IExvZycsXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuL2Rhc2hib2FyZC5qc3gnO1xuXG53aW5kb3cuZGFzaGJvYXJkID0gbnVsbDtcblxuLy8gb25SZWFkeVxuJCgoKSA9PiB7XG4gIHdpbmRvdy5kYXNoYm9hcmQgPSBSZWFjdERPTS5yZW5kZXIoXG4gICAgPERhc2hib2FyZCB1cmw9XCIvYXBpL3N0YXRpb25zLmpzb25cIiAvPixcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGFzaGJvYXJkQ29udGFpbmVyJylcbiAgKTtcblxuICAvLyBJbnN0YWxsIGNsaWNrIGhhbmRsZXJzIGluIGV4dGVybmFsIG1lbnVzIGFuZCBidXR0b25zXG4gICQoJ1tkYXRhLWNvbW1hbmRdJykuZWFjaChmdW5jdGlvbiBzZXRDbGlja0hhbmRsZXIoKSB7XG4gICAgJCh0aGlzKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHdpbmRvdy5kYXNoYm9hcmQuZ2V0Q29tbWFuZCgkKHRoaXMpLmF0dHIoJ2RhdGEtY29tbWFuZCcpKSgpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRpb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaGFuZGxlQ2xpY2soKSB7XG4gICAgdGhpcy5wcm9wcy5vbkNsaWNrU3RhdGlvbih0aGlzLnByb3BzLnN0YXRpb24uaWQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHN0YXRpb25DbGFzc2VzID0gW1xuICAgICAgJ3N0YXRpb24nLFxuICAgICAgYHN0YXRpb24tc3RhdGUtJHt0aGlzLnByb3BzLnN0YXRpb24uc3RhdGV9YCxcbiAgICAgIGBzdGF0aW9uLXR5cGUtJHt0aGlzLnByb3BzLnN0YXRpb24udHlwZX1gLFxuICAgIF07XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZCkge1xuICAgICAgc3RhdGlvbkNsYXNzZXMucHVzaCgnc3RhdGlvbi1zZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXt0aGlzLnByb3BzLnN0YXRpb24uaWR9XG4gICAgICAgIGNsYXNzTmFtZT17c3RhdGlvbkNsYXNzZXMuam9pbignICcpfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tc3RhdGUtbGlnaHRcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLWljb25cIj5cbiAgICAgICAgICA8aW1nIGFsdD17dGhpcy5wcm9wcy5zdGF0aW9uLmFwcH0gc3JjPXt0aGlzLnByb3BzLnN0YXRpb24uaWNvbn0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1uYW1lXCI+e3RoaXMucHJvcHMuc3RhdGlvbi5uYW1lfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tdHlwZVwiPnt0aGlzLnByb3BzLnN0YXRpb24udHlwZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLWFwcFwiPnt0aGlzLnByb3BzLnN0YXRpb24uYXBwfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tc3RhdHVzXCI+e3RoaXMucHJvcHMuc3RhdGlvbi5zdGF0dXN9PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblN0YXRpb24ucHJvcFR5cGVzID0ge1xuICBzdGF0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc3RhdGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgdHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzdGF0dXM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXBwOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGljb246IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIHNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgb25DbGlja1N0YXRpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxufTtcbiJdfQ==
