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

    var _this = _possibleConstructorReturn(this, (AppSelect.__proto__ || Object.getPrototypeOf(AppSelect)).call(this, props));

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

    var _this = _possibleConstructorReturn(this, (ConsoleViewer.__proto__ || Object.getPrototypeOf(ConsoleViewer)).call(this, props));

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

    var _this = _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call(this, props));

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
    _this.showTerminalLog = _this.showTerminalLog.bind(_this);
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
  }, {
    key: 'showTerminalLog',
    value: function showTerminalLog(stationID) {
      var _this3 = this;

      if (this.consoleViewer !== null) {
        this.consoleViewer.openModal();
        $.ajax({
          url: '/api/station_output.json',
          data: {
            stationID: stationID
          },
          method: 'get',
          dataType: 'json',
          contentType: 'application/json',
          cache: false,
          success: function success(data) {
            _this3.setState({
              title: stationID,
              lines: data.lines
            });
          },
          error: function error(xhr, status, err) {
            return console.error(status, err.toString());
          }
        });
      }
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
      var _this4 = this;

      var minPollTime = 500;
      var retryPollTime = minPollTime;
      var retryIncreaseFactor = 2;
      var maxRetryPollTime = 4000;

      var loop = function loop() {
        _this4.pollServer().then(function () {
          setTimeout(loop, minPollTime);
          retryPollTime = minPollTime;
          if (_this4.state.serverConnectionError) {
            _this4.setState({ serverConnectionError: false });
          }
          _this4.serverConnectionRetry = 0;
        }).catch(function () {
          setTimeout(loop, retryPollTime);
          if (retryPollTime < maxRetryPollTime) {
            retryPollTime = retryPollTime * retryIncreaseFactor;
          }
          _this4.serverConnectionRetry++;
          if (_this4.serverConnectionRetry > 5) {
            _this4.setState({ serverConnectionError: true });
            // Reset the updateID so the next poll returns immediately
            // instead of being a long poll
            _this4.updateID = 0;
          }
        });
      };
      loop();
    }
  }, {
    key: 'pollServer',
    value: function pollServer() {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        $.ajax({
          url: '/api/poll.json',
          data: {
            lastSeen: _this5.updateID
          },
          dataType: 'json',
          cache: false,
          timeout: 30000,
          success: function success(data) {
            if (data.stations !== undefined) {
              _this5.updateID = data.updateID;
              _this5.setState({ stations: data.stations });
            }
            resolve();
          },
          error: function error(xhr, status, err) {
            console.error(_this5.props.url, status, err.toString());
            reject();
          }
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

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
          selected: _this6.state.selection.has(station.id),
          onClickStation: _this6.selectToggle,
          onOpenTerminalLog: _this6.showTerminalLog
        }));
      });

      var counts = {};
      this.state.stations.forEach(function (station) {
        if (!counts.hasOwnProperty(_this6.displayState(station.state))) {
          counts[_this6.displayState(station.state)] = 0;
        }
        counts[_this6.displayState(station.state)]++;
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
            _this6.deselectAll();
            _this6.setState({ visibleState: option });
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
            _this6.deselectAll();
            _this6.setState({ visibleType: option });
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
              if (_this6.logViewer !== null) {
                _this6.logViewer.openModal();
                $.ajax({
                  url: '/api/log.json',
                  method: 'get',
                  contentType: 'application/json',
                  cache: false,
                  success: function success(data) {
                    _this6.setState({ log: data.entries.reverse() });
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
            className: 'btn btn-default',
            href: '#',
            onClick: function onClick(ev) {
              if (_this6.consoleViewer !== null) {
                _this6.consoleViewer.openModal();
                $.ajax({
                  url: '/api/station_output.json',
                  data: {},
                  method: 'get',
                  dataType: 'json',
                  contentType: 'application/json',
                  cache: false,
                  success: function success(data) {
                    _this6.setState({
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
          _react2.default.createElement('i', { className: 'fa fa-desktop' }),
          ' Global output'
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
            _this6.logViewer = c;
          } }),
        _react2.default.createElement(_consoleViewer2.default, { lines: this.state.lines, ref: function ref(c) {
            _this6.consoleViewer = c;
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

    var _this = _possibleConstructorReturn(this, (LogViewer.__proto__ || Object.getPrototypeOf(LogViewer)).call(this, props));

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

    var _this = _possibleConstructorReturn(this, (Station.__proto__ || Object.getPrototypeOf(Station)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleOpenTerminalLog = _this.handleOpenTerminalLog.bind(_this);
    return _this;
  }

  _createClass(Station, [{
    key: 'handleClick',
    value: function handleClick() {
      this.props.onClickStation(this.props.station.id);
    }
  }, {
    key: 'handleOpenTerminalLog',
    value: function handleOpenTerminalLog(ev) {
      this.props.onOpenTerminalLog(this.props.station.id);
      ev.preventDefault();
      ev.stopPropagation();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

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
        ),
        _react2.default.createElement(
          'a',
          { className: 'station-output-button', onClick: function onClick(ev) {
              _this2.handleOpenTerminalLog(ev);
            } },
          _react2.default.createElement('i', { className: 'fa fa-desktop' })
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
  onClickStation: _react2.default.PropTypes.func,
  onOpenTerminalLog: _react2.default.PropTypes.func
};

},{"react":"react"}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwU2VsZWN0LmpzeCIsInNyYy9idXR0b25GaWx0ZXIuanN4Iiwic3JjL2NvbnNvbGVWaWV3ZXIuanN4Iiwic3JjL2Rhc2hib2FyZC5qc3giLCJzcmMvbG9nVmlld2VyLmpzeCIsInNyYy9tYWluLmpzeCIsInNyYy9zdGF0aW9uLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQUVBOzs7O0lBSXFCLFM7OztBQUVuQixxQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsc0hBQ1gsS0FEVzs7QUFFakIsVUFBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsVUFBSyxnQkFBTCxHQUF3QixNQUFLLGdCQUFMLENBQXNCLElBQXRCLE9BQXhCO0FBSGlCO0FBSWxCOzs7O3VDQUVrQjtBQUNqQixVQUFJLEtBQUssS0FBTCxDQUFXLFFBQWYsRUFBeUI7QUFDdkIsYUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixLQUFLLFdBQUwsQ0FBaUIsS0FBckM7QUFDRDtBQUNGOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFNLGVBQWUsRUFBckI7O0FBRUEsVUFBSSxLQUFLLEtBQUwsQ0FBVyxVQUFmLEVBQTJCO0FBQ3pCLHFCQUFhLElBQWIsQ0FDRTtBQUFBO0FBQUEsWUFBUSxLQUFJLE1BQVosRUFBbUIsT0FBTSxFQUF6QjtBQUFBO0FBQUEsU0FERjtBQUdEOztBQVBNO0FBQUE7QUFBQTs7QUFBQTtBQVNQLDZCQUEwQixLQUFLLEtBQUwsQ0FBVyxZQUFyQyw4SEFBbUQ7QUFBQSxjQUF4QyxXQUF3Qzs7QUFDakQsdUJBQWEsSUFBYixDQUNFO0FBQUE7QUFBQSxjQUFRLEtBQUssV0FBYixFQUEwQixPQUFPLFdBQWpDO0FBQStDO0FBQS9DLFdBREY7QUFHRDtBQWJNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtB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QixNQUpPO0FBSzdCLFlBQVEsZ0JBQU0sU0FBTixDQUFnQixNQUxLO0FBTTdCLFNBQUssZ0JBQU0sU0FBTixDQUFnQixNQU5RO0FBTzdCLFVBQU0sZ0JBQU0sU0FBTixDQUFnQjtBQVBPLEdBQXRCLEVBUU4sVUFUZTtBQVVsQixZQUFVLGdCQUFNLFNBQU4sQ0FBZ0IsSUFWUjtBQVdsQixrQkFBZ0IsZ0JBQU0sU0FBTixDQUFnQixJQVhkO0FBWWxCLHFCQUFtQixnQkFBTSxTQUFOLENBQWdCO0FBWmpCLENBQXBCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbi8qKlxuICogQXBwU2VsZWN0IGNvbXBvbmVudFxuICogQWxsb3dzIHRoZSB1c2VyIHRvIHNlbGVjdCBhbiBhcHBsaWNhdGlvbiBmcm9tIGEgbGlzdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBTZWxlY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuYXBwU2VsZWN0b3IgPSBudWxsO1xuICAgIHRoaXMuY2xpY2tlZENoYW5nZUFwcCA9IHRoaXMuY2xpY2tlZENoYW5nZUFwcC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY2xpY2tlZENoYW5nZUFwcCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLmFwcFNlbGVjdG9yLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgYXBwbGljYXRpb25zID0gW107XG5cbiAgICBpZiAodGhpcy5wcm9wcy5hbGxvd0JsYW5rKSB7XG4gICAgICBhcHBsaWNhdGlvbnMucHVzaChcbiAgICAgICAgPG9wdGlvbiBrZXk9XCJudWxsXCIgdmFsdWU9XCJcIj4mbmJzcDs8L29wdGlvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBhcHBsaWNhdGlvbiBvZiB0aGlzLnByb3BzLmFwcGxpY2F0aW9ucykge1xuICAgICAgYXBwbGljYXRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PXthcHBsaWNhdGlvbn0gdmFsdWU9e2FwcGxpY2F0aW9ufT57YXBwbGljYXRpb259PC9vcHRpb24+XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGRpc2FibGVkQ2xhc3MgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA/ICcgZGlzYWJsZWQnIDogJycpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYXBwU2VsZWN0JHtkaXNhYmxlZENsYXNzfWB9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0taW5saW5lXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIGZvcm0tZ3JvdXAtbWlud2lkdGhcIj5cbiAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sJHtkaXNhYmxlZENsYXNzfWB9XG4gICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgPyB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSA6ICcnfVxuICAgICAgICAgICAgICByZWY9eyhzZWwpID0+IHsgdGhpcy5hcHBTZWxlY3RvciA9IHNlbDsgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2FwcGxpY2F0aW9uc31cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICZuYnNwO1xuICAgICAgICAgIDxhXG4gICAgICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLXdhcm5pbmcke2Rpc2FibGVkQ2xhc3N9YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY2xpY2tlZENoYW5nZUFwcH1cbiAgICAgICAgICA+Q2hhbmdlIGFwcGxpY2F0aW9uPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQXBwU2VsZWN0LnByb3BUeXBlcyA9IHtcbiAgYXBwbGljYXRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICksXG4gIGRlZmF1bHRWYWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgYWxsb3dCbGFuazogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGRpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgb25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxufTtcblxuQXBwU2VsZWN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgYXBwbGljYXRpb25zOiBbXSxcbiAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgYWxsb3dCbGFuazogZmFsc2UsXG4gIGRpc2FibGVkOiBmYWxzZSxcbiAgb25DaGFuZ2U6ICgpID0+IHt9LFxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEJ1dHRvbkZpbHRlciA9IChwcm9wcykgPT4ge1xuICBjb25zdCBvcHRpb25zID0gW107XG5cbiAgZm9yIChjb25zdCBvcHRpb24gb2YgcHJvcHMub3B0aW9ucykge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbJ2J0bicsICdidG4tZGVmYXVsdCcsIGBidXR0b24tZmlsdGVyLW9wdGlvbi0ke29wdGlvbn1gXTtcbiAgICBpZiAocHJvcHMudmFsdWUgPT09IG9wdGlvbikge1xuICAgICAgY2xhc3Nlcy5wdXNoKCdhY3RpdmUnKTtcbiAgICB9XG4gICAgbGV0IGNvdW50ZXIgPSAnJztcbiAgICBsZXQgc3BhY2luZyA9ICcnO1xuICAgIGlmIChwcm9wcy5jb3VudHMgIT09IG51bGwpIHtcbiAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICBpZiAocHJvcHMuY291bnRzLmhhc093blByb3BlcnR5KG9wdGlvbikgJiYgcHJvcHMuY291bnRzW29wdGlvbl0gIT09IDApIHtcbiAgICAgICAgY291bnQgPSBwcm9wcy5jb3VudHNbb3B0aW9uXTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGJhZGdlQ2xhc3NlcyA9IGBiYWRnZSR7Y291bnQgPT09IDAgPyAnIHplcm8nIDogJyBub24temVybyd9YDtcbiAgICAgIGNvdW50ZXIgPSAoPHNwYW4gY2xhc3NOYW1lPXtiYWRnZUNsYXNzZXN9Pntjb3VudH08L3NwYW4+KTtcbiAgICAgIHNwYWNpbmcgPSAnICc7XG4gICAgfVxuICAgIG9wdGlvbnMucHVzaChcbiAgICAgIDxhXG4gICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oJyAnKX1cbiAgICAgICAga2V5PXtvcHRpb259XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHByb3BzLm9uQ2hhbmdlKG9wdGlvbil9XG4gICAgICA+e29wdGlvbn17c3BhY2luZ317Y291bnRlcn08L2E+XG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGRlZmF1bHRDbGFzc2VzID0gWydidG4nLCAnYnRuLWRlZmF1bHQnXTtcbiAgaWYgKHByb3BzLnZhbHVlID09PSAnJykge1xuICAgIGRlZmF1bHRDbGFzc2VzLnB1c2goJ2FjdGl2ZScpO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi10b29sYmFyIGJ1dHRvbi1maWx0ZXJcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgIDxhXG4gICAgICAgICAgaHJlZj1cIiNcIlxuICAgICAgICAgIGNsYXNzTmFtZT17ZGVmYXVsdENsYXNzZXMuam9pbignICcpfVxuICAgICAgICAgIGtleT1cIm51bGxcIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHByb3BzLm9uQ2hhbmdlKCcnKX1cbiAgICAgICAgPntwcm9wcy5hbGxUZXh0fTwvYT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAge29wdGlvbnN9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbkJ1dHRvbkZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIG9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5zdHJpbmcpLFxuICBjb3VudHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3RPZihSZWFjdC5Qcm9wVHlwZXMubnVtYmVyKSxcbiAgYWxsVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbn07XG5cbkJ1dHRvbkZpbHRlci5kZWZhdWx0UHJvcHMgPSB7XG4gIG9wdGlvbnM6IFtdLFxuICBjb3VudHM6IG51bGwsXG4gIGFsbFRleHQ6ICdBbGwnLFxuICB2YWx1ZTogJycsXG4gIG9uQ2hhbmdlOiAoKSA9PiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkZpbHRlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnNvbGVWaWV3ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMubW9kYWxESVYgPSBudWxsO1xuICB9XG5cbiAgb3Blbk1vZGFsKCkge1xuICAgIGlmICh0aGlzLm1vZGFsRElWICE9PSBudWxsKSB7XG4gICAgICAkKHRoaXMubW9kYWxESVYpLm1vZGFsKCk7XG4gICAgICAkKHRoaXMubW9kYWxESVYpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBtb2RhbEJvZHkgPSAkKHRoaXMpLmZpbmQoJy5tb2RhbC1ib2R5JykuZmlyc3QoKVswXTtcbiAgICAgICAgbW9kYWxCb2R5LnNjcm9sbFRvcCA9IE1hdGgubWF4KG1vZGFsQm9keS5zY3JvbGxIZWlnaHQsIG1vZGFsQm9keS5jbGllbnRIZWlnaHQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCAoKSA9PiB7IHRoaXMuaGFuZGxlUmVzaXplKCk7IH0pO1xuICAgICQodGhpcy5tb2RhbERJVikub24oJ3Nob3cuYnMubW9kYWwnLCAoKSA9PiB7IHRoaXMuaGFuZGxlUmVzaXplKCk7IH0pO1xuICB9XG5cbiAgaGFuZGxlUmVzaXplKCkge1xuICAgIGNvbnN0ICRtb2RhbCA9ICQodGhpcy5tb2RhbERJVik7XG4gICAgY29uc3QgbW9kYWxIZWFkZXJIZWlnaHQgPSA1NjtcbiAgICBjb25zdCBtb2RhbE1hcmdpbiA9IDMwO1xuICAgIGNvbnN0IG1vZGFsQm9yZGVyID0gMTtcblxuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSAobW9kYWxIZWFkZXJIZWlnaHQgKyBtb2RhbE1hcmdpbiAqIDIgKyBtb2RhbEJvcmRlciAqIDIpO1xuICAgICRtb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmNzcyh7IG1heEhlaWdodDogYm9keUhlaWdodCB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlIGNvbnNvbGVWaWV3ZXItbW9kYWxcIiB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIHJlZj17KGMpID0+IHsgdGhpcy5tb2RhbERJViA9IGM7IH19PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZyBtb2RhbC1sZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPiZ0aW1lczs8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj57dGhpcy5wcm9wcy50aXRsZX08L2g0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgPHByZT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5saW5lcy5qb2luKCdcXG4nKX1cbiAgICAgICAgICAgICAgPC9wcmU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkNvbnNvbGVWaWV3ZXIucHJvcFR5cGVzID0ge1xuICB0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgbGluZXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5zdHJpbmcpLFxufTtcblxuQ29uc29sZVZpZXdlci5kZWZhdWx0UHJvcHMgPSB7XG4gIHRpdGxlOiAnVGVybWluYWwgT3V0cHV0JyxcbiAgbGluZXM6IFtdLFxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU3RhdGlvbiBmcm9tICcuL3N0YXRpb24uanN4JztcbmltcG9ydCBBcHBTZWxlY3QgZnJvbSAnLi9hcHBTZWxlY3QuanN4JztcbmltcG9ydCBCdXR0b25GaWx0ZXIgZnJvbSAnLi9idXR0b25GaWx0ZXIuanN4JztcbmltcG9ydCBMb2dWaWV3ZXIgZnJvbSAnLi9sb2dWaWV3ZXIuanN4JztcbmltcG9ydCBDb25zb2xlVmlld2VyIGZyb20gJy4vY29uc29sZVZpZXdlci5qc3gnO1xuXG4vLyBjb25zdCB0bXBfbG9nX2VudHJpZXMgPSByZXF1aXJlKCcuL3RtcF9sb2cuanNvbicpLmVudHJpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhc2hib2FyZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHN0YXRpb25zOiBbXSxcbiAgICAgIHNlbGVjdGlvbjogbmV3IFNldCgpLFxuICAgICAgdmlzaWJsZVR5cGU6ICcnLFxuICAgICAgdmlzaWJsZVN0YXRlOiAnJyxcbiAgICAgIGxvZzogW10sXG4gICAgICBzZXJ2ZXJDb25uZWN0aW9uRXJyb3I6IGZhbHNlLFxuICAgIH07XG4gICAgdGhpcy5zZWxlY3RUb2dnbGUgPSB0aGlzLnNlbGVjdFRvZ2dsZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2hhbmdlQXBwU2VsZWN0ZWQgPSB0aGlzLmNoYW5nZUFwcFNlbGVjdGVkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaG93VGVybWluYWxMb2cgPSB0aGlzLnNob3dUZXJtaW5hbExvZy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY29tbWFuZHMgPSB7fTtcbiAgICB0aGlzLmluaXRDb21tYW5kcygpO1xuICAgIHRoaXMuZ2V0Q29tbWFuZCA9IHRoaXMuZ2V0Q29tbWFuZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9nVmlld2VyID0gbnVsbDtcbiAgICB0aGlzLmNvbnNvbGVWaWV3ZXIgPSBudWxsO1xuICAgIHRoaXMudXBkYXRlSUQgPSAwO1xuICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5ID0gMDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucG9sbExvb3AoKTtcbiAgfVxuXG4gIGdldFN0YXRpb25TdGF0ZShzdGF0aW9uSUQpIHtcbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgaWYgKHN0YXRpb24uaWQgPT09IHN0YXRpb25JRCkge1xuICAgICAgICByZXR1cm4gc3RhdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRTdGF0aW9uVHlwZXMoKSB7XG4gICAgY29uc3QgdHlwZXMgPSBuZXcgU2V0KCk7XG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIHR5cGVzLmFkZChzdGF0aW9uLnR5cGUpO1xuICAgIH1cblxuICAgIHJldHVybiBBcnJheS5mcm9tKHR5cGVzKTtcbiAgfVxuXG4gIGdldENvbW1hbmQoY29tbWFuZE5hbWUpIHtcbiAgICBpZiAodGhpcy5jb21tYW5kc1tjb21tYW5kTmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29tbWFuZHNbY29tbWFuZE5hbWVdLmRvQ2FsbGJhY2s7XG4gICAgfVxuICAgIHRocm93IEVycm9yKGBDYWxsIHRvIGludmFsaWQgY29tbWFuZCAke2NvbW1hbmROYW1lfWApO1xuICB9XG5cbiAgZ2V0VmlzaWJsZVN0YXRpb25zKCkge1xuICAgIGNvbnN0IGFuc3dlciA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIGlmICgodGhpcy5zdGF0ZS52aXNpYmxlVHlwZSA9PT0gJycgfHwgc3RhdGlvbi50eXBlID09PSB0aGlzLnN0YXRlLnZpc2libGVUeXBlKSAmJlxuICAgICAgICAgICh0aGlzLnN0YXRlLnZpc2libGVTdGF0ZSA9PT0gJycgfHxcbiAgICAgICAgICAgdGhpcy5kaXNwbGF5U3RhdGUoc3RhdGlvbi5zdGF0ZSkgPT09IHRoaXMuc3RhdGUudmlzaWJsZVN0YXRlKSkge1xuICAgICAgICBhbnN3ZXIucHVzaChzdGF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYW5zd2VyO1xuICB9XG5cbiAgZGlzcGxheVN0YXRlKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlID09PSAnc3RhcnRpbmdfc3RhdGlvbicgfHxcbiAgICAgIHN0YXRlID09PSAnc3RhcnRpbmdfYXBwJyB8fFxuICAgICAgc3RhdGUgPT09ICdzdG9wcGluZycgfHxcbiAgICAgIHN0YXRlID09PSAnc3dpdGNoaW5nX2FwcCcpIHtcbiAgICAgIHJldHVybiAnYnVzeSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgYXR0YWNoQ29uZmlybWF0aW9uKHRleHQsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICBib290Ym94LmRpYWxvZyh7XG4gICAgICAgIG1lc3NhZ2U6IHRleHQsXG4gICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICB3YXJuaW5nOiB7XG4gICAgICAgICAgICBsYWJlbDogJ0NvbmZpcm0nLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuLXdhcm5pbmcnLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLmJpbmQodGhpcywgLi4uYXJncyksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjYW5jZWw6IHtcbiAgICAgICAgICAgIGxhYmVsOiAnQ2FuY2VsJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bi1kZWZhdWx0JyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGluaXRDb21tYW5kcygpIHtcbiAgICB0aGlzLmNvbW1hbmRzID0ge1xuICAgICAgJ3N0YXRpb25zLWFsbC1zdGFydCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RhcnRBbGwuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzdGFydCBhbGwgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1hbGwtc3RvcCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RvcEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3N0b3AgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtYWxsLXNlbGVjdCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc2VsZWN0QWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc2VsZWN0IGFsbCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IGZhbHNlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1hbGwtZGVzZWxlY3QnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLmRlc2VsZWN0QWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnZGVzZWxlY3QgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLXNlbGVjdGVkLXN0YXJ0Jzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5zdGFydFNlbGVjdGVkLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RhcnQgdGhlIHNlbGVjdGVkIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtc2VsZWN0ZWQtc3RvcCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RvcFNlbGVjdGVkLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RvcCB0aGUgc2VsZWN0ZWQgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy12aXNpYmxlLXNlbGVjdCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc2VsZWN0QWxsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3NlbGVjdCB2aXNpYmxlIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXModGhpcy5jb21tYW5kcykpIHtcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSB0aGlzLmNvbW1hbmRzW25hbWVdO1xuICAgICAgaWYgKGNvbW1hbmQuY29uZmlybSkge1xuICAgICAgICB0aGlzLmNvbW1hbmRzW25hbWVdLmRvQ2FsbGJhY2sgPSB0aGlzLmF0dGFjaENvbmZpcm1hdGlvbihcbiAgICAgICAgICBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvICR7Y29tbWFuZC50aXRsZX0/YCxcbiAgICAgICAgICBjb21tYW5kLmNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbW1hbmRzW25hbWVdLmRvQ2FsbGJhY2sgPSBjb21tYW5kLmNhbGxiYWNrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFsbFN0YXRpb25JRHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGlvbklEcyh0aGlzLnN0YXRlLnN0YXRpb25zKTtcbiAgfVxuXG4gIHN0YXRpb25JRHMoc3RhdGlvbnMpIHtcbiAgICBjb25zdCBpZHMgPSBuZXcgU2V0KCk7XG5cbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2Ygc3RhdGlvbnMpIHtcbiAgICAgIGlkcy5hZGQoc3RhdGlvbi5pZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlkcztcbiAgfVxuXG4gIHNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW9uOiB0aGlzLmFsbFN0YXRpb25JRHMoKSB9KTtcbiAgfVxuXG4gIHNlbGVjdEFsbFZpc2libGUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogdGhpcy5zdGF0aW9uSURzKHRoaXMuZ2V0VmlzaWJsZVN0YXRpb25zKCkpIH0pO1xuICB9XG5cbiAgZGVzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogbmV3IFNldCgpIH0pO1xuICB9XG5cbiAgc2VsZWN0VG9nZ2xlKGlkKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0aW9uLmhhcyhpZCkpIHtcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmRlbGV0ZShpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmFkZChpZCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3Rpb246IHRoaXMuc3RhdGUuc2VsZWN0aW9uIH0pO1xuICB9XG5cbiAgc3RvcFN0YXRpb25zKHN0YXRpb25JRHMpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9zdGF0aW9ucy5qc29uJyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgYWN0aW9uOiAnc3RvcCcsXG4gICAgICAgIHN0YXRpb25JRHM6IEFycmF5LmZyb20oc3RhdGlvbklEcyksXG4gICAgICB9KSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7fSxcbiAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICB9KTtcbiAgfVxuXG4gIHN0b3BTZWxlY3RlZCgpIHtcbiAgICB0aGlzLnN0b3BTdGF0aW9ucyh0aGlzLnN0YXRlLnNlbGVjdGlvbik7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICB9XG5cbiAgc3RvcEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9wU3RhdGlvbnModGhpcy5hbGxTdGF0aW9uSURzKCkpO1xuICB9XG5cbiAgc3RhcnRTdGF0aW9ucyhzdGF0aW9uSURzKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvc3RhdGlvbnMuanNvbicsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGFjdGlvbjogJ3N0YXJ0JyxcbiAgICAgICAgc3RhdGlvbklEczogQXJyYXkuZnJvbShzdGF0aW9uSURzKSxcbiAgICAgIH0pLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHt9LFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICB9XG5cbiAgc3RhcnRTZWxlY3RlZCgpIHtcbiAgICB0aGlzLnN0YXJ0U3RhdGlvbnModGhpcy5zdGF0ZS5zZWxlY3Rpb24pO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHN0YXJ0QWxsKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0U3RhdGlvbnModGhpcy5hbGxTdGF0aW9uSURzKCkpO1xuICB9XG5cbiAgY2hhbmdlQXBwU2VsZWN0ZWQoYXBwKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvc3RhdGlvbnMuanNvbicsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGFjdGlvbjogJ2NoYW5nZV9hcHAnLFxuICAgICAgICBzdGF0aW9uSURzOiBBcnJheS5mcm9tKHRoaXMuc3RhdGUuc2VsZWN0aW9uKSxcbiAgICAgICAgYXBwLFxuICAgICAgfSksXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4ge30sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICB9XG5cbiAgc2hvd1Rlcm1pbmFsTG9nKHN0YXRpb25JRCkge1xuICAgIGlmICh0aGlzLmNvbnNvbGVWaWV3ZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY29uc29sZVZpZXdlci5vcGVuTW9kYWwoKTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvc3RhdGlvbl9vdXRwdXQuanNvbicsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBzdGF0aW9uSUQsXG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHRpdGxlOiBzdGF0aW9uSUQsXG4gICAgICAgICAgICBsaW5lczogZGF0YS5saW5lcyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSB0aGUgc2VydmVyIHBvbGxcbiAgICpcbiAgICogSW1wbGVtZW50YXRpb246IFNpbmNlIHRoZSBzZXJ2ZXIgdXNlcyBsb25nIHBvbGxpbmcgd2UgdXNlIGEgdmVyeSBzaG9ydFxuICAgKiBwb2xsIHRpbWUgKDUwMG1zKS4gSW4gY2FzZSBvZiBlcnJvcnMgY29udGFjdGluZyB0aGUgc2VydmVyIHRoZSBwb2xsIHRpbWVcbiAgICogaW5jcmVhc2VzIHdpdGggZWFjaCBlcnJvciB1bnRpbCBhIG1heCBwb2xsIHRpbWUgaXMgcmVhY2hlZC5cbiAgICovXG4gIHBvbGxMb29wKCkge1xuICAgIGNvbnN0IG1pblBvbGxUaW1lID0gNTAwO1xuICAgIGxldCByZXRyeVBvbGxUaW1lID0gbWluUG9sbFRpbWU7XG4gICAgY29uc3QgcmV0cnlJbmNyZWFzZUZhY3RvciA9IDI7XG4gICAgY29uc3QgbWF4UmV0cnlQb2xsVGltZSA9IDQwMDA7XG5cbiAgICBjb25zdCBsb29wID0gKCkgPT4ge1xuICAgICAgdGhpcy5wb2xsU2VydmVyKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQobG9vcCwgbWluUG9sbFRpbWUpO1xuICAgICAgICByZXRyeVBvbGxUaW1lID0gbWluUG9sbFRpbWU7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlcnZlckNvbm5lY3Rpb25FcnJvcikge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXJ2ZXJDb25uZWN0aW9uRXJyb3I6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5ID0gMDtcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChsb29wLCByZXRyeVBvbGxUaW1lKTtcbiAgICAgICAgaWYgKHJldHJ5UG9sbFRpbWUgPCBtYXhSZXRyeVBvbGxUaW1lKSB7XG4gICAgICAgICAgcmV0cnlQb2xsVGltZSA9IHJldHJ5UG9sbFRpbWUgKiByZXRyeUluY3JlYXNlRmFjdG9yO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5Kys7XG4gICAgICAgIGlmICh0aGlzLnNlcnZlckNvbm5lY3Rpb25SZXRyeSA+IDUpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmVyQ29ubmVjdGlvbkVycm9yOiB0cnVlIH0pO1xuICAgICAgICAgIC8vIFJlc2V0IHRoZSB1cGRhdGVJRCBzbyB0aGUgbmV4dCBwb2xsIHJldHVybnMgaW1tZWRpYXRlbHlcbiAgICAgICAgICAvLyBpbnN0ZWFkIG9mIGJlaW5nIGEgbG9uZyBwb2xsXG4gICAgICAgICAgdGhpcy51cGRhdGVJRCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgbG9vcCgpO1xuICB9XG5cbiAgcG9sbFNlcnZlcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9wb2xsLmpzb24nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgbGFzdFNlZW46IHRoaXMudXBkYXRlSUQsXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgdGltZW91dDogMzAwMDAsXG4gICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGEuc3RhdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJRCA9IGRhdGEudXBkYXRlSUQ7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc3RhdGlvbnM6IGRhdGEuc3RhdGlvbnMgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByb3BzLnVybCwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzdGF0aW9ucyA9IFtdO1xuICAgIGNvbnN0IGFjdGlvbnMgPSBbXTtcbiAgICBsZXQgbWVzc2FnZUJhciA9ICcnO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuc2VydmVyQ29ubmVjdGlvbkVycm9yKSB7XG4gICAgICBtZXNzYWdlQmFyID0gKDxkaXYgY2xhc3NOYW1lPVwibWVzc2FnZV9iYXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZXNzYWdlX2Jhci1tZXNzYWdlXCI+XG4gICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtd2FybmluZ1wiPjwvaT4gIE5vIGNvbm5lY3Rpb24gdG8gc2VydmVyLlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2Pik7XG4gICAgfVxuXG4gICAgdGhpcy5nZXRWaXNpYmxlU3RhdGlvbnMoKS5mb3JFYWNoKChzdGF0aW9uKSA9PiBzdGF0aW9ucy5wdXNoKFxuICAgICAgPFN0YXRpb25cbiAgICAgICAgc3RhdGlvbj17c3RhdGlvbn1cbiAgICAgICAga2V5PXtzdGF0aW9uLmlkfVxuICAgICAgICBzZWxlY3RlZD17dGhpcy5zdGF0ZS5zZWxlY3Rpb24uaGFzKHN0YXRpb24uaWQpfVxuICAgICAgICBvbkNsaWNrU3RhdGlvbj17dGhpcy5zZWxlY3RUb2dnbGV9XG4gICAgICAgIG9uT3BlblRlcm1pbmFsTG9nPXt0aGlzLnNob3dUZXJtaW5hbExvZ31cbiAgICAgIC8+XG4gICAgKSk7XG5cbiAgICBjb25zdCBjb3VudHMgPSB7fTtcbiAgICB0aGlzLnN0YXRlLnN0YXRpb25zLmZvckVhY2goKHN0YXRpb24pID0+IHtcbiAgICAgIGlmICghY291bnRzLmhhc093blByb3BlcnR5KHRoaXMuZGlzcGxheVN0YXRlKHN0YXRpb24uc3RhdGUpKSkge1xuICAgICAgICBjb3VudHNbdGhpcy5kaXNwbGF5U3RhdGUoc3RhdGlvbi5zdGF0ZSldID0gMDtcbiAgICAgIH1cbiAgICAgIGNvdW50c1t0aGlzLmRpc3BsYXlTdGF0ZShzdGF0aW9uLnN0YXRlKV0rKztcbiAgICB9KTtcblxuICAgIGNvbnN0IHNlbGVjdGVkQ291bnQgPSB0aGlzLnN0YXRlLnNlbGVjdGlvbi5zaXplO1xuICAgIGNvbnN0IGFsbFNlbGVjdGVkID0gKHNlbGVjdGVkQ291bnQgPT09IHRoaXMuc3RhdGUuc3RhdGlvbnMubGVuZ3RoKTtcbiAgICBjb25zdCBzZWxlY3RBbGxDbGFzc2VzID1cbiAgICAgIGBidG4gYnRuLWRlZmF1bHQgJHthbGxTZWxlY3RlZCA/ICcgZGlzYWJsZWQnIDogJyd9YDtcblxuICAgIGNvbnN0IGRlc2VsZWN0QWxsQ2xhc3NlcyA9XG4gICAgICBgYnRuIGJ0bi1kZWZhdWx0ICR7c2VsZWN0ZWRDb3VudCA9PT0gMCA/ICcgZGlzYWJsZWQnIDogJyd9YDtcblxuICAgIGNvbnN0IHN0YXRpb25Xb3JkID0gc2VsZWN0ZWRDb3VudCA9PT0gMSA/ICdzdGF0aW9uJyA6ICdzdGF0aW9ucyc7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInN0YXRpb25TdGF0ZUZpbHRlclwiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxCdXR0b25GaWx0ZXJcbiAgICAgICAgICBvcHRpb25zPXtbJ29uJywgJ29mZicsICdidXN5JywgJ2Vycm9yJ119XG4gICAgICAgICAgY291bnRzPXtjb3VudHN9XG4gICAgICAgICAgYWxsVGV4dD1cIkFsbCBzdGF0ZXNcIlxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZpc2libGVTdGF0ZX1cbiAgICAgICAgICBvbkNoYW5nZT17KG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZpc2libGVTdGF0ZTogb3B0aW9uIH0pO1xuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzdGF0aW9uVHlwZUZpbHRlclwiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxCdXR0b25GaWx0ZXJcbiAgICAgICAgICBvcHRpb25zPXt0aGlzLmdldFN0YXRpb25UeXBlcygpfVxuICAgICAgICAgIGFsbFRleHQ9XCJBbGwgdHlwZXNcIlxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZpc2libGVUeXBlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmlzaWJsZVR5cGU6IG9wdGlvbiB9KTtcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic2VsZWN0ZWRDb3VudFwiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmUtc2VwYXJhdG9yXCIgPjwvZGl2PlxuICAgICAgICA8Yj57dGhpcy5zdGF0ZS5zZWxlY3Rpb24uc2l6ZX0ge3N0YXRpb25Xb3JkfSBzZWxlY3RlZDwvYj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3RBY3Rpb25zXCI+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGNsYXNzTmFtZT17ZGVzZWxlY3RBbGxDbGFzc2VzfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy1hbGwtZGVzZWxlY3QnKX1cbiAgICAgICAgICA+RGVzZWxlY3Q8L2E+Jm5ic3A7XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGNsYXNzTmFtZT17c2VsZWN0QWxsQ2xhc3Nlc31cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZ2V0Q29tbWFuZCgnc3RhdGlvbnMtdmlzaWJsZS1zZWxlY3QnKX1cbiAgICAgICAgICA+U2VsZWN0IGFsbDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgY29uc3Qgbm9TZWxlY3Rpb25EaXNhYmxlID0gKHNlbGVjdGVkQ291bnQgPT09IDAgPyAnIGRpc2FibGVkJyA6ICcnKTtcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic3RhcnRTdG9wUGFuZWxcIiBjbGFzc05hbWU9e2BhY3Rpb24tcGFuZSR7bm9TZWxlY3Rpb25EaXNhYmxlfWB9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lLXNlcGFyYXRvclwiID48L2Rpdj5cbiAgICAgICAgPGFcbiAgICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLXN1Y2Nlc3Mke25vU2VsZWN0aW9uRGlzYWJsZX1gfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZ2V0Q29tbWFuZCgnc3RhdGlvbnMtc2VsZWN0ZWQtc3RhcnQnKX1cbiAgICAgICAgPjxpIGNsYXNzTmFtZT1cImZhIGZhLXBsYXlcIiAvPiZuYnNwOyZuYnNwO1N0YXJ0IFNlbGVjdGVkPC9hPlxuICAgICAgICAmbmJzcDtcbiAgICAgICAgPGFcbiAgICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLWRhbmdlciR7bm9TZWxlY3Rpb25EaXNhYmxlfWB9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy1zZWxlY3RlZC1zdG9wJyl9XG4gICAgICAgID48aSBjbGFzc05hbWU9XCJmYSBmYS1zdG9wXCIgLz4mbmJzcDsmbmJzcDtTdG9wIFNlbGVjdGVkPC9hPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGxldCBzZWxlY3RlZEFyZVNhbWVUeXBlID0gdHJ1ZTtcbiAgICBsZXQgbGFzdFR5cGUgPSBudWxsO1xuICAgIGZvciAoY29uc3Qgc2VsZWN0ZWRJRCBvZiB0aGlzLnN0YXRlLnNlbGVjdGlvbikge1xuICAgICAgaWYgKGxhc3RUeXBlID09PSBudWxsKSB7XG4gICAgICAgIGxhc3RUeXBlID0gdGhpcy5nZXRTdGF0aW9uU3RhdGUoc2VsZWN0ZWRJRCkudHlwZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmdldFN0YXRpb25TdGF0ZShzZWxlY3RlZElEKS50eXBlICE9PSBsYXN0VHlwZSkge1xuICAgICAgICBzZWxlY3RlZEFyZVNhbWVUeXBlID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBhbGxTZWxlY3RlZE9uID0gdHJ1ZTtcbiAgICBmb3IgKGNvbnN0IHNlbGVjdGVkSUQgb2YgdGhpcy5zdGF0ZS5zZWxlY3Rpb24pIHtcbiAgICAgIGlmICh0aGlzLmdldFN0YXRpb25TdGF0ZShzZWxlY3RlZElEKS5zdGF0ZSAhPT0gJ29uJykge1xuICAgICAgICBhbGxTZWxlY3RlZE9uID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNhbkNoYW5nZUFwcCA9IChhbGxTZWxlY3RlZE9uICYmIChzZWxlY3RlZENvdW50ID4gMCkgJiYgc2VsZWN0ZWRBcmVTYW1lVHlwZSk7XG5cbiAgICBsZXQgYXBwbGljYXRpb25zID0gW107XG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGlvbi5oYXMoc3RhdGlvbi5pZCkpIHtcbiAgICAgICAgYXBwbGljYXRpb25zID0gc3RhdGlvbi5wb3NzaWJsZV9hcHBzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwiYXBwU2VsZWN0XCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZS1zZXBhcmF0b3JcIiA+PC9kaXY+XG4gICAgICAgIDxBcHBTZWxlY3RcbiAgICAgICAgICBhcHBsaWNhdGlvbnM9e2NhbkNoYW5nZUFwcCA/IGFwcGxpY2F0aW9ucyA6IFtdfVxuICAgICAgICAgIGRpc2FibGVkPXshY2FuQ2hhbmdlQXBwfVxuICAgICAgICAgIGFsbG93QmxhbmtcbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5hdHRhY2hDb25maXJtYXRpb24oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjaGFuZ2UgdGhlIGFwcGxpY2F0aW9uPycsXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFwcFNlbGVjdGVkKX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBjb25zdCBub1Rlcm1pbmFsT3V0cHV0RGlzYWJsZSA9IChzZWxlY3RlZENvdW50ICE9PSAxID8gJyBkaXNhYmxlZCcgOiAnJyk7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInNob3dMb2dcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lLXNlcGFyYXRvclwiID48L2Rpdj5cbiAgICAgICAgPGFcbiAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIlxuICAgICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgICBvbkNsaWNrPXsoZXYpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvZ1ZpZXdlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICB0aGlzLmxvZ1ZpZXdlci5vcGVuTW9kYWwoKTtcbiAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2xvZy5qc29uJyxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG9nOiBkYXRhLmVudHJpZXMucmV2ZXJzZSgpIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgPlNob3cgbG9nPC9hPlxuICAgICAgICAmbmJzcDtcbiAgICAgICAgPGFcbiAgICAgICAgICBjbGFzc05hbWU9eydidG4gYnRuLWRlZmF1bHQnfVxuICAgICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgICBvbkNsaWNrPXsoZXYpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnNvbGVWaWV3ZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhpcy5jb25zb2xlVmlld2VyLm9wZW5Nb2RhbCgpO1xuICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvc3RhdGlvbl9vdXRwdXQuanNvbicsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdHbG9iYWwgb3V0cHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbGluZXM6IGRhdGEubGluZXMsXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH19XG4gICAgICAgID48aSBjbGFzc05hbWU9XCJmYSBmYS1kZXNrdG9wXCI+PC9pPiBHbG9iYWwgb3V0cHV0PC9hPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17bWVzc2FnZUJhciAhPT0gJycgPyAnd2l0aC1tZXNzYWdlX2JhcicgOiAnJ30+XG4gICAgICAgIHttZXNzYWdlQmFyfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02IHBhbmUtc3RhdGlvbnNcIj5cbiAgICAgICAgICAgICAgPGRpdiBpZD1cImRhc2hib2FyZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJzdGF0aW9uTGlzdFwiIGNsYXNzTmFtZT1cInBhbmVsLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICB7c3RhdGlvbnN9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02IHBhbmUtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGFzaGJvYXJkQWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgIHthY3Rpb25zfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPExvZ1ZpZXdlciBsb2c9e3RoaXMuc3RhdGUubG9nfSByZWY9eyhjKSA9PiB7IHRoaXMubG9nVmlld2VyID0gYzsgfX0gLz5cbiAgICAgICAgPENvbnNvbGVWaWV3ZXIgbGluZXM9e3RoaXMuc3RhdGUubGluZXN9IHJlZj17KGMpID0+IHsgdGhpcy5jb25zb2xlVmlld2VyID0gYzsgfX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRGFzaGJvYXJkLnByb3BUeXBlcyA9IHtcbiAgdXJsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nVmlld2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBzdGF0aWMgZm9ybWF0VGltZShpc29UaW1lKSB7XG4gICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKGlzb1RpbWUpO1xuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSgpO1xuICAgIHllc3RlcmRheS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDEpO1xuICAgIGxldCBkYXkgPSAnJztcblxuICAgIGlmICh0b2RheS5nZXRNb250aCgpID09PSB0aW1lLmdldE1vbnRoKCkgJiZcbiAgICAgIHRvZGF5LmdldEZ1bGxZZWFyKCkgPT09IHRpbWUuZ2V0RnVsbFllYXIoKSAmJlxuICAgICAgdG9kYXkuZ2V0RGF0ZSgpID09PSB0aW1lLmdldERhdGUoKSkge1xuICAgICAgZGF5ID0gJ1RvZGF5JztcbiAgICB9IGVsc2UgaWYgKHllc3RlcmRheS5nZXRNb250aCgpID09PSB0aW1lLmdldE1vbnRoKCkgJiZcbiAgICAgIHllc3RlcmRheS5nZXRGdWxsWWVhcigpID09PSB0aW1lLmdldEZ1bGxZZWFyKCkgJiZcbiAgICAgIHllc3RlcmRheS5nZXREYXRlKCkgPT09IHRpbWUuZ2V0RGF0ZSgpKSB7XG4gICAgICBkYXkgPSAnWWVzdGVyZGF5JztcbiAgICB9IGVsc2Uge1xuICAgICAgZGF5ID0gYCR7dGltZS5nZXRGdWxsWWVhcigpfS0ke3RpbWUuZ2V0TW9udGgoKX0tJHt0aW1lLmdldERhdGUoKX1gO1xuICAgIH1cblxuICAgIHJldHVybiBgJHtkYXl9ICR7dGltZS5nZXRIb3VycygpfToke3RpbWUuZ2V0TWludXRlcygpfToke3RpbWUuZ2V0U2Vjb25kcygpfWA7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLm1vZGFsRElWID0gbnVsbDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICQod2luZG93KS5vbigncmVzaXplJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgICAkKHRoaXMubW9kYWxESVYpLm9uKCdzaG93LmJzLm1vZGFsJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgfVxuXG4gIG9wZW5Nb2RhbCgpIHtcbiAgICBpZiAodGhpcy5tb2RhbERJViAhPT0gbnVsbCkge1xuICAgICAgJCh0aGlzLm1vZGFsRElWKS5tb2RhbCgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZSgpIHtcbiAgICBjb25zdCAkbW9kYWwgPSAkKHRoaXMubW9kYWxESVYpO1xuICAgIGNvbnN0IG1vZGFsSGVhZGVySGVpZ2h0ID0gNTY7XG4gICAgY29uc3QgbW9kYWxNYXJnaW4gPSAzMDtcbiAgICBjb25zdCBtb2RhbEJvcmRlciA9IDE7XG5cbiAgICBjb25zdCBib2R5SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gKG1vZGFsSGVhZGVySGVpZ2h0ICsgbW9kYWxNYXJnaW4gKiAyICsgbW9kYWxCb3JkZXIgKiAyKTtcbiAgICAkbW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5jc3MoeyBtYXhIZWlnaHQ6IGJvZHlIZWlnaHQgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgcm93Q2xhc3NlcyA9IHtcbiAgICAgIGVycm9yOiAnZGFuZ2VyJyxcbiAgICAgIHdhcm5pbmc6ICd3YXJuaW5nJyxcbiAgICB9O1xuXG4gICAgY29uc3QgZW50cmllcyA9IFtdO1xuICAgIGZvciAoY29uc3QgbG9nRW50cnkgb2YgdGhpcy5wcm9wcy5sb2cpIHtcbiAgICAgIGNvbnN0IHJvd0NsYXNzID0gcm93Q2xhc3Nlc1tsb2dFbnRyeS50eXBlXSAhPT0gdW5kZWZpbmVkID8gcm93Q2xhc3Nlc1tsb2dFbnRyeS50eXBlXSA6ICcnO1xuXG4gICAgICBlbnRyaWVzLnB1c2goXG4gICAgICAgIDx0ciBrZXk9e2xvZ0VudHJ5LmlkfSBjbGFzc05hbWU9e3Jvd0NsYXNzfT5cbiAgICAgICAgICA8dGQ+e0xvZ1ZpZXdlci5mb3JtYXRUaW1lKGxvZ0VudHJ5LnRpbWUpfTwvdGQ+XG4gICAgICAgICAgPHRkPntsb2dFbnRyeS5zdGF0aW9uX25hbWV9PC90ZD5cbiAgICAgICAgICA8dGQ+e2xvZ0VudHJ5Lm1lc3NhZ2V9PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZSBsb2dWaWV3ZXItbW9kYWxcIiB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIHJlZj17KGMpID0+IHsgdGhpcy5tb2RhbERJViA9IGM7IH19PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZyBtb2RhbC1sZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPiZ0aW1lczs8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj57dGhpcy5wcm9wcy50aXRsZX08L2g0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLWZpeGVkIHRhYmxlLWNvbmRlbnNlZFwiPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlRpbWU8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+U3RhdGlvbjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5NZXNzYWdlPC90aD5cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAge2VudHJpZXN9XG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuTG9nVmlld2VyLnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGxvZzogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgdHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHRpbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBzdGF0aW9uX2lkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgc3RhdGlvbl9uYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgbWVzc2FnZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9KVxuICApLFxufTtcblxuTG9nVmlld2VyLmRlZmF1bHRQcm9wcyA9IHtcbiAgbG9nOiBbXSxcbiAgdGl0bGU6ICdFdmVudCBMb2cnLFxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi9kYXNoYm9hcmQuanN4Jztcblxud2luZG93LmRhc2hib2FyZCA9IG51bGw7XG5cbi8vIG9uUmVhZHlcbiQoKCkgPT4ge1xuICB3aW5kb3cuZGFzaGJvYXJkID0gUmVhY3RET00ucmVuZGVyKFxuICAgIDxEYXNoYm9hcmQgdXJsPVwiL2FwaS9zdGF0aW9ucy5qc29uXCIgLz4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rhc2hib2FyZENvbnRhaW5lcicpXG4gICk7XG5cbiAgLy8gSW5zdGFsbCBjbGljayBoYW5kbGVycyBpbiBleHRlcm5hbCBtZW51cyBhbmQgYnV0dG9uc1xuICAkKCdbZGF0YS1jb21tYW5kXScpLmVhY2goZnVuY3Rpb24gc2V0Q2xpY2tIYW5kbGVyKCkge1xuICAgICQodGhpcykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB3aW5kb3cuZGFzaGJvYXJkLmdldENvbW1hbmQoJCh0aGlzKS5hdHRyKCdkYXRhLWNvbW1hbmQnKSkoKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0aW9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZU9wZW5UZXJtaW5hbExvZyA9IHRoaXMuaGFuZGxlT3BlblRlcm1pbmFsTG9nLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVDbGljaygpIHtcbiAgICB0aGlzLnByb3BzLm9uQ2xpY2tTdGF0aW9uKHRoaXMucHJvcHMuc3RhdGlvbi5pZCk7XG4gIH1cblxuICBoYW5kbGVPcGVuVGVybWluYWxMb2coZXYpIHtcbiAgICB0aGlzLnByb3BzLm9uT3BlblRlcm1pbmFsTG9nKHRoaXMucHJvcHMuc3RhdGlvbi5pZCk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzdGF0aW9uQ2xhc3NlcyA9IFtcbiAgICAgICdzdGF0aW9uJyxcbiAgICAgIGBzdGF0aW9uLXN0YXRlLSR7dGhpcy5wcm9wcy5zdGF0aW9uLnN0YXRlfWAsXG4gICAgICBgc3RhdGlvbi10eXBlLSR7dGhpcy5wcm9wcy5zdGF0aW9uLnR5cGV9YCxcbiAgICBdO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWQpIHtcbiAgICAgIHN0YXRpb25DbGFzc2VzLnB1c2goJ3N0YXRpb24tc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17dGhpcy5wcm9wcy5zdGF0aW9uLmlkfVxuICAgICAgICBjbGFzc05hbWU9e3N0YXRpb25DbGFzc2VzLmpvaW4oJyAnKX1cbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLXN0YXRlLWxpZ2h0XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1pY29uXCI+XG4gICAgICAgICAgPGltZyBhbHQ9e3RoaXMucHJvcHMuc3RhdGlvbi5hcHB9IHNyYz17dGhpcy5wcm9wcy5zdGF0aW9uLmljb259IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tbmFtZVwiPnt0aGlzLnByb3BzLnN0YXRpb24ubmFtZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLXR5cGVcIj57dGhpcy5wcm9wcy5zdGF0aW9uLnR5cGV9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1hcHBcIj57dGhpcy5wcm9wcy5zdGF0aW9uLmFwcH08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLXN0YXR1c1wiPnt0aGlzLnByb3BzLnN0YXRpb24uc3RhdHVzfTwvZGl2PlxuICAgICAgICA8YSBjbGFzc05hbWU9XCJzdGF0aW9uLW91dHB1dC1idXR0b25cIiBvbkNsaWNrPXsoZXYpID0+IHsgdGhpcy5oYW5kbGVPcGVuVGVybWluYWxMb2coZXYpOyB9fT5cbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1kZXNrdG9wXCI+PC9pPlxuICAgICAgICA8L2E+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblN0YXRpb24ucHJvcFR5cGVzID0ge1xuICBzdGF0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc3RhdGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgdHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzdGF0dXM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXBwOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGljb246IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIHNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgb25DbGlja1N0YXRpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBvbk9wZW5UZXJtaW5hbExvZzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG59O1xuIl19
