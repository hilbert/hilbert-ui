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
        url: '/api/stations/stop',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
          ids: Array.from(stationIDs)
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
        url: '/api/stations/start',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
          ids: Array.from(stationIDs)
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
        url: '/api/stations/change_app',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
          ids: Array.from(this.state.selection),
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
          url: '/api/station/' + stationID + '/output',
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
          url: '/api/stations/poll',
          data: {
            lastUpdateID: _this5.updateID
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
                  url: '/api/notifications',
                  method: 'get',
                  contentType: 'application/json',
                  cache: false,
                  success: function success(data) {
                    _this6.setState({ log: data.notifications.reverse() });
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
                  url: '/api/server/output',
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
  window.dashboard = _reactDom2.default.render(_react2.default.createElement(_dashboard2.default, { url: '/api/stations' }), document.getElementById('dashboardContainer'));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwU2VsZWN0LmpzeCIsInNyYy9idXR0b25GaWx0ZXIuanN4Iiwic3JjL2NvbnNvbGVWaWV3ZXIuanN4Iiwic3JjL2Rhc2hib2FyZC5qc3giLCJzcmMvbG9nVmlld2VyLmpzeCIsInNyYy9tYWluLmpzeCIsInNyYy9zdGF0aW9uLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQUVBOzs7O0lBSXFCLFM7OztBQUVuQixxQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsc0hBQ1gsS0FEVzs7QUFFakIsVUFBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsVUFBSyxnQkFBTCxHQUF3QixNQUFLLGdCQUFMLENBQXNCLElBQXRCLE9BQXhCO0FBSGlCO0FBSWxCOzs7O3VDQUVrQjtBQUNqQixVQUFJLEtBQUssS0FBTCxDQUFXLFFBQWYsRUFBeUI7QUFDdkIsYUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixLQUFLLFdBQUwsQ0FBaUIsS0FBckM7QUFDRDtBQUNGOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFNLGVBQWUsRUFBckI7O0FBRUEsVUFBSSxLQUFLLEtBQUwsQ0FBVyxVQUFmLEVBQTJCO0FBQ3pCLHFCQUFhLElBQWIsQ0FDRTtBQUFBO0FBQUEsWUFBUSxLQUFJLE1BQVosRUFBbUIsT0FBTSxFQUF6QjtBQUFBO0FBQUEsU0FERjtBQUdEOztBQVBNO0FBQUE7QUFBQTs7QUFBQTtBQVNQLDZCQUEwQixLQUFLLEtBQUwsQ0FBVyxZQUFyQyw4SEFBbUQ7QUFBQSxjQUF4QyxXQUF3Qzs7QUFDakQsdUJBQWEsSUFBYixDQUNFO0FBQUE7QUFBQSxjQUFRLEtBQUssV0FBYixFQUEwQixPQUFPLFdBQWpDO0FBQStDO0FBQS9DLFdBREY7QUFHRDtBQWJNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBZVAsVUFBTSxnQkFBaUIsS0FBSyxLQUFMLENBQVcsUUFBWCxHQUFzQixXQUF0QixHQUFvQyxFQUEzRDs7QUFFQSxhQUNFO0FBQUE7QUFBQSxVQUFLLHlCQUF1QixhQUE1QjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsYUFBZjtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsZ0NBQWY7QUFDRTtBQUFBO0FBQUE7QUFDRSw0Q0FBMEIsYUFENUI7QUFFRSw4QkFBYyxLQUFLLEtBQUwsQ0FBVyxZQUFYLEdBQTBCLEtBQUssS0FBTCxDQUFXLFlBQXJDLEdBQW9ELEVBRnBFO0FBR0UscUJBQUssYUFBQyxHQUFELEVBQVM7QUFBRSx5QkFBSyxXQUFMLEdBQW1CLEdBQW5CO0FBQXlCO0FBSDNDO0FBS0c7QUFMSDtBQURGLFdBREY7QUFBQTtBQVdFO0FBQUE7QUFBQTtBQUNFLDZDQUE2QixhQUQvQjtBQUVFLHVCQUFTLEtBQUs7QUFGaEI7QUFBQTtBQUFBO0FBWEY7QUFERixPQURGO0FBb0JEOzs7O0VBbkRvQyxnQkFBTSxTOztrQkFBeEIsUzs7O0FBc0RyQixVQUFVLFNBQVYsR0FBc0I7QUFDcEIsZ0JBQWMsZ0JBQU0sU0FBTixDQUFnQixPQUFoQixDQUNaLGdCQUFNLFNBQU4sQ0FBZ0IsTUFESixDQURNO0FBSXBCLGdCQUFjLGdCQUFNLFNBQU4sQ0FBZ0IsTUFKVjtBQUtwQixjQUFZLGdCQUFNLFNBQU4sQ0FBZ0IsSUFMUjtBQU1wQixZQUFVLGdCQUFNLFNBQU4sQ0FBZ0IsSUFOTjtBQU9wQixZQUFVLGdCQUFNLFNBQU4sQ0FBZ0I7QUFQTixDQUF0Qjs7QUFVQSxVQUFVLFlBQVYsR0FBeUI7QUFDdkIsZ0JBQWMsRUFEUztBQUV2QixnQkFBYyxFQUZTO0FBR3ZCLGNBQVksS0FIVztBQUl2QixZQUFVLEtBSmE7QUFLdkIsWUFBVSxvQkFBTSxDQUFFO0FBTEssQ0FBekI7Ozs7Ozs7OztBQ3RFQTs7Ozs7O0FBRUEsSUFBTSxlQUFlLFNBQWYsWUFBZSxDQUFDLEtBQUQsRUFBVztBQUM5QixNQUFNLFVBQVUsRUFBaEI7O0FBRDhCO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsVUFHbkIsTUFIbUI7O0FBSTVCLFVBQU0sVUFBVSxDQUFDLEtBQUQsRUFBUSxhQUFSLDRCQUErQyxNQUEvQyxDQUFoQjtBQUNBLFVBQUksTUFBTSxLQUFOLEtBQWdCLE1BQXBCLEVBQTRCO0FBQzFCLGdCQUFRLElBQVIsQ0FBYSxRQUFiO0FBQ0Q7QUFDRCxVQUFJLFVBQVUsRUFBZDtBQUNBLFVBQUksVUFBVSxFQUFkO0FBQ0EsVUFBSSxNQUFNLE1BQU4sS0FBaUIsSUFBckIsRUFBMkI7QUFDekIsWUFBSSxRQUFRLENBQVo7QUFDQSxZQUFJLE1BQU0sTUFBTixDQUFhLGNBQWIsQ0FBNEIsTUFBNUIsS0FBdUMsTUFBTSxNQUFOLENBQWEsTUFBYixNQUF5QixDQUFwRSxFQUF1RTtBQUNyRSxrQkFBUSxNQUFNLE1BQU4sQ0FBYSxNQUFiLENBQVI7QUFDRDtBQUNELFlBQU0sMEJBQXVCLFVBQVUsQ0FBVixHQUFjLE9BQWQsR0FBd0IsV0FBL0MsQ0FBTjtBQUNBLGtCQUFXO0FBQUE7QUFBQSxZQUFNLFdBQVcsWUFBakI7QUFBZ0M7QUFBaEMsU0FBWDtBQUNBLGtCQUFVLEdBQVY7QUFDRDtBQUNELGNBQVEsSUFBUixDQUNFO0FBQUE7QUFBQTtBQUNFLGdCQUFLLEdBRFA7QUFFRSxxQkFBVyxRQUFRLElBQVIsQ0FBYSxHQUFiLENBRmI7QUFHRSxlQUFLLE1BSFA7QUFJRSxtQkFBUztBQUFBLG1CQUFNLE1BQU0sUUFBTixDQUFlLE1BQWYsQ0FBTjtBQUFBO0FBSlg7QUFLRSxjQUxGO0FBS1UsZUFMVjtBQUttQjtBQUxuQixPQURGO0FBbkI0Qjs7QUFHOUIseUJBQXFCLE1BQU0sT0FBM0IsOEhBQW9DO0FBQUE7QUF3Qm5DO0FBM0I2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQTZCOUIsTUFBTSxpQkFBaUIsQ0FBQyxLQUFELEVBQVEsYUFBUixDQUF2QjtBQUNBLE1BQUksTUFBTSxLQUFOLEtBQWdCLEVBQXBCLEVBQXdCO0FBQ3RCLG1CQUFlLElBQWYsQ0FBb0IsUUFBcEI7QUFDRDs7QUFFRCxTQUNFO0FBQUE7QUFBQSxNQUFLLFdBQVUsMkJBQWY7QUFDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLFdBQWY7QUFDRTtBQUFBO0FBQUE7QUFDRSxnQkFBSyxHQURQO0FBRUUscUJBQVcsZUFBZSxJQUFmLENBQW9CLEdBQXBCLENBRmI7QUFHRSxlQUFJLE1BSE47QUFJRSxtQkFBUztBQUFBLG1CQUFNLE1BQU0sUUFBTixDQUFlLEVBQWYsQ0FBTjtBQUFBO0FBSlg7QUFLRSxjQUFNO0FBTFI7QUFERixLQURGO0FBU0U7QUFBQTtBQUFBLFFBQUssV0FBVSxXQUFmO0FBQ0c7QUFESDtBQVRGLEdBREY7QUFlRCxDQWpERDs7QUFtREEsYUFBYSxTQUFiLEdBQXlCO0FBQ3ZCLFdBQVMsZ0JBQU0sU0FBTixDQUFnQixPQUFoQixDQUF3QixnQkFBTSxTQUFOLENBQWdCLE1BQXhDLENBRGM7QUFFdkIsVUFBUSxnQkFBTSxTQUFOLENBQWdCLFFBQWhCLENBQXlCLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBekMsQ0FGZTtBQUd2QixXQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsTUFIRjtBQUl2QixTQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsTUFKQTtBQUt2QixZQUFVLGdCQUFNLFNBQU4sQ0FBZ0I7QUFMSCxDQUF6Qjs7QUFRQSxhQUFhLFlBQWIsR0FBNEI7QUFDMUIsV0FBUyxFQURpQjtBQUUxQixVQUFRLElBRmtCO0FBRzFCLFdBQVMsS0FIaUI7QUFJMUIsU0FBTyxFQUptQjtBQUsxQixZQUFVLG9CQUFNLENBQUU7QUFMUSxDQUE1Qjs7a0JBUWUsWTs7Ozs7Ozs7Ozs7QUNyRWY7Ozs7Ozs7Ozs7OztJQUVxQixhOzs7QUFFbkIseUJBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDhIQUNYLEtBRFc7O0FBRWpCLFVBQUssUUFBTCxHQUFnQixJQUFoQjtBQUZpQjtBQUdsQjs7OztnQ0FFVztBQUNWLFVBQUksS0FBSyxRQUFMLEtBQWtCLElBQXRCLEVBQTRCO0FBQzFCLFVBQUUsS0FBSyxRQUFQLEVBQWlCLEtBQWpCO0FBQ0EsVUFBRSxLQUFLLFFBQVAsRUFBaUIsRUFBakIsQ0FBb0IsZ0JBQXBCLEVBQXNDLFlBQVc7QUFDL0MsY0FBTSxZQUFZLEVBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxhQUFiLEVBQTRCLEtBQTVCLEdBQW9DLENBQXBDLENBQWxCO0FBQ0Esb0JBQVUsU0FBVixHQUFzQixLQUFLLEdBQUwsQ0FBUyxVQUFVLFlBQW5CLEVBQWlDLFVBQVUsWUFBM0MsQ0FBdEI7QUFDRCxTQUhEO0FBSUQ7QUFDRjs7O3dDQUVtQjtBQUFBOztBQUNsQixRQUFFLE1BQUYsRUFBVSxFQUFWLENBQWEsUUFBYixFQUF1QixZQUFNO0FBQUUsZUFBSyxZQUFMO0FBQXNCLE9BQXJEO0FBQ0EsUUFBRSxLQUFLLFFBQVAsRUFBaUIsRUFBakIsQ0FBb0IsZUFBcEIsRUFBcUMsWUFBTTtBQUFFLGVBQUssWUFBTDtBQUFzQixPQUFuRTtBQUNEOzs7bUNBRWM7QUFDYixVQUFNLFNBQVMsRUFBRSxLQUFLLFFBQVAsQ0FBZjtBQUNBLFVBQU0sb0JBQW9CLEVBQTFCO0FBQ0EsVUFBTSxjQUFjLEVBQXBCO0FBQ0EsVUFBTSxjQUFjLENBQXBCOztBQUVBLFVBQU0sYUFBYSxPQUFPLFdBQVAsSUFBc0Isb0JBQW9CLGNBQWMsQ0FBbEMsR0FBc0MsY0FBYyxDQUExRSxDQUFuQjtBQUNBLGFBQU8sSUFBUCxDQUFZLGFBQVosRUFBMkIsR0FBM0IsQ0FBK0IsRUFBRSxXQUFXLFVBQWIsRUFBL0I7QUFDRDs7OzZCQUVRO0FBQUE7O0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGdDQUFmLEVBQWdELFVBQVMsSUFBekQsRUFBOEQsTUFBSyxRQUFuRSxFQUE0RSxLQUFLLGFBQUMsQ0FBRCxFQUFPO0FBQUUsbUJBQUssUUFBTCxHQUFnQixDQUFoQjtBQUFvQixXQUE5RztBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsdUJBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLGVBQWY7QUFDRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxjQUFmO0FBQ0U7QUFBQTtBQUFBLGtCQUFRLE1BQUssUUFBYixFQUFzQixXQUFVLE9BQWhDLEVBQXdDLGdCQUFhLE9BQXJEO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGLGVBREY7QUFJRTtBQUFBO0FBQUEsa0JBQUksV0FBVSxhQUFkO0FBQTZCLHFCQUFLLEtBQUwsQ0FBVztBQUF4QztBQUpGLGFBREY7QUFPRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxZQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQ0cscUJBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBc0IsSUFBdEI7QUFESDtBQURGO0FBUEY7QUFERjtBQURGLE9BREY7QUFtQkQ7Ozs7RUFwRHdDLGdCQUFNLFM7O2tCQUE1QixhOzs7QUF1RHJCLGNBQWMsU0FBZCxHQUEwQjtBQUN4QixTQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsTUFEQztBQUV4QixTQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsT0FBaEIsQ0FBd0IsZ0JBQU0sU0FBTixDQUFnQixNQUF4QztBQUZpQixDQUExQjs7QUFLQSxjQUFjLFlBQWQsR0FBNkI7QUFDM0IsU0FBTyxpQkFEb0I7QUFFM0IsU0FBTztBQUZvQixDQUE3Qjs7Ozs7Ozs7Ozs7QUM5REE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUIsUzs7O0FBRW5CLHFCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxzSEFDWCxLQURXOztBQUVqQixVQUFLLEtBQUwsR0FBYTtBQUNYLGdCQUFVLEVBREM7QUFFWCxpQkFBVyxJQUFJLEdBQUosRUFGQTtBQUdYLG1CQUFhLEVBSEY7QUFJWCxvQkFBYyxFQUpIO0FBS1gsV0FBSyxFQUxNO0FBTVgsNkJBQXVCO0FBTlosS0FBYjtBQVFBLFVBQUssWUFBTCxHQUFvQixNQUFLLFlBQUwsQ0FBa0IsSUFBbEIsT0FBcEI7QUFDQSxVQUFLLGlCQUFMLEdBQXlCLE1BQUssaUJBQUwsQ0FBdUIsSUFBdkIsT0FBekI7QUFDQSxVQUFLLGVBQUwsR0FBdUIsTUFBSyxlQUFMLENBQXFCLElBQXJCLE9BQXZCO0FBQ0EsVUFBSyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsVUFBSyxZQUFMO0FBQ0EsVUFBSyxVQUFMLEdBQWtCLE1BQUssVUFBTCxDQUFnQixJQUFoQixPQUFsQjtBQUNBLFVBQUssU0FBTCxHQUFpQixJQUFqQjtBQUNBLFVBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNBLFVBQUssUUFBTCxHQUFnQixDQUFoQjtBQUNBLFVBQUsscUJBQUwsR0FBNkIsQ0FBN0I7QUFuQmlCO0FBb0JsQjs7Ozt3Q0FFbUI7QUFDbEIsV0FBSyxRQUFMO0FBQ0Q7OztvQ0FFZSxTLEVBQVc7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDekIsNkJBQXNCLEtBQUssS0FBTCxDQUFXLFFBQWpDLDhIQUEyQztBQUFBLGNBQWhDLE9BQWdDOztBQUN6QyxjQUFJLFFBQVEsRUFBUixLQUFlLFNBQW5CLEVBQThCO0FBQzVCLG1CQUFPLE9BQVA7QUFDRDtBQUNGO0FBTHdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBTXpCLGFBQU8sSUFBUDtBQUNEOzs7c0NBRWlCO0FBQ2hCLFVBQU0sUUFBUSxJQUFJLEdBQUosRUFBZDtBQURnQjtBQUFBO0FBQUE7O0FBQUE7QUFFaEIsOEJBQXNCLEtBQUssS0FBTCxDQUFXLFFBQWpDLG1JQUEyQztBQUFBLGNBQWhDLE9BQWdDOztBQUN6QyxnQkFBTSxHQUFOLENBQVUsUUFBUSxJQUFsQjtBQUNEO0FBSmU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFNaEIsYUFBTyxNQUFNLElBQU4sQ0FBVyxLQUFYLENBQVA7QUFDRDs7OytCQUVVLFcsRUFBYTtBQUN0QixVQUFJLEtBQUssUUFBTCxDQUFjLFdBQWQsTUFBK0IsU0FBbkMsRUFBOEM7QUFDNUMsZUFBTyxLQUFLLFFBQUwsQ0FBYyxXQUFkLEVBQTJCLFVBQWxDO0FBQ0Q7QUFDRCxZQUFNLG1DQUFpQyxXQUFqQyxDQUFOO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBTSxTQUFTLEVBQWY7O0FBRG1CO0FBQUE7QUFBQTs7QUFBQTtBQUduQiw4QkFBc0IsS0FBSyxLQUFMLENBQVcsUUFBakMsbUlBQTJDO0FBQUEsY0FBaEMsT0FBZ0M7O0FBQ3pDLGNBQUksQ0FBQyxLQUFLLEtBQUwsQ0FBVyxXQUFYLEtBQTJCLEVBQTNCLElBQWlDLFFBQVEsSUFBUixLQUFpQixLQUFLLEtBQUwsQ0FBVyxXQUE5RCxNQUNDLEtBQUssS0FBTCxDQUFXLFlBQVgsS0FBNEIsRUFBNUIsSUFDQSxLQUFLLFlBQUwsQ0FBa0IsUUFBUSxLQUExQixNQUFxQyxLQUFLLEtBQUwsQ0FBVyxZQUZqRCxDQUFKLEVBRW9FO0FBQ2xFLG1CQUFPLElBQVAsQ0FBWSxPQUFaO0FBQ0Q7QUFDRjtBQVRrQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVduQixhQUFPLE1BQVA7QUFDRDs7O2lDQUVZLEssRUFBTztBQUNsQixVQUFJLFVBQVUsa0JBQVYsSUFDRixVQUFVLGNBRFIsSUFFRixVQUFVLFVBRlIsSUFHRixVQUFVLGVBSFosRUFHNkI7QUFDM0IsZUFBTyxNQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFQO0FBQ0Q7Ozt1Q0FFa0IsSSxFQUFNLFEsRUFBVTtBQUFBOztBQUNqQyxhQUFPLFlBQWE7QUFBQSwwQ0FBVCxJQUFTO0FBQVQsY0FBUztBQUFBOztBQUNsQixnQkFBUSxNQUFSLENBQWU7QUFDYixtQkFBUyxJQURJO0FBRWIsbUJBQVM7QUFDUCxxQkFBUztBQUNQLHFCQUFPLFNBREE7QUFFUCx5QkFBVyxhQUZKO0FBR1Asd0JBQVUsU0FBUyxJQUFULGlDQUF1QixJQUF2QjtBQUhILGFBREY7QUFNUCxvQkFBUTtBQUNOLHFCQUFPLFFBREQ7QUFFTix5QkFBVztBQUZMO0FBTkQ7QUFGSSxTQUFmO0FBY0QsT0FmRDtBQWdCRDs7O21DQUVjO0FBQ2IsV0FBSyxRQUFMLEdBQWdCO0FBQ2QsOEJBQXNCO0FBQ3BCLG9CQUFVLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsSUFBbkIsQ0FEVTtBQUVwQixpQkFBTyxvQkFGYTtBQUdwQixtQkFBUztBQUhXLFNBRFI7QUFNZCw2QkFBcUI7QUFDbkIsb0JBQVUsS0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixJQUFsQixDQURTO0FBRW5CLGlCQUFPLG1CQUZZO0FBR25CLG1CQUFTO0FBSFUsU0FOUDtBQVdkLCtCQUF1QjtBQUNyQixvQkFBVSxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CLElBQXBCLENBRFc7QUFFckIsaUJBQU8scUJBRmM7QUFHckIsbUJBQVM7QUFIWSxTQVhUO0FBZ0JkLGlDQUF5QjtBQUN2QixvQkFBVSxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsSUFBdEIsQ0FEYTtBQUV2QixpQkFBTyx1QkFGZ0I7QUFHdkIsbUJBQVM7QUFIYyxTQWhCWDtBQXFCZCxtQ0FBMkI7QUFDekIsb0JBQVUsS0FBSyxhQUFMLENBQW1CLElBQW5CLENBQXdCLElBQXhCLENBRGU7QUFFekIsaUJBQU8sNkJBRmtCO0FBR3pCLG1CQUFTO0FBSGdCLFNBckJiO0FBMEJkLGtDQUEwQjtBQUN4QixvQkFBVSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FEYztBQUV4QixpQkFBTyw0QkFGaUI7QUFHeEIsbUJBQVM7QUFIZSxTQTFCWjtBQStCZCxtQ0FBMkI7QUFDekIsb0JBQVUsS0FBSyxnQkFBTCxDQUFzQixJQUF0QixDQUEyQixJQUEzQixDQURlO0FBRXpCLGlCQUFPLHlCQUZrQjtBQUd6QixtQkFBUztBQUhnQjtBQS9CYixPQUFoQjs7QUFEYTtBQUFBO0FBQUE7O0FBQUE7QUF1Q2IsOEJBQW1CLE9BQU8sSUFBUCxDQUFZLEtBQUssUUFBakIsQ0FBbkIsbUlBQStDO0FBQUEsY0FBcEMsSUFBb0M7O0FBQzdDLGNBQU0sVUFBVSxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQWhCO0FBQ0EsY0FBSSxRQUFRLE9BQVosRUFBcUI7QUFDbkIsaUJBQUssUUFBTCxDQUFjLElBQWQsRUFBb0IsVUFBcEIsR0FBaUMsS0FBSyxrQkFBTCwrQkFDSCxRQUFRLEtBREwsUUFFL0IsUUFBUSxRQUZ1QixDQUFqQztBQUlELFdBTEQsTUFLTztBQUNMLGlCQUFLLFFBQUwsQ0FBYyxJQUFkLEVBQW9CLFVBQXBCLEdBQWlDLFFBQVEsUUFBekM7QUFDRDtBQUNGO0FBakRZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFrRGQ7OztvQ0FFZTtBQUNkLGFBQU8sS0FBSyxVQUFMLENBQWdCLEtBQUssS0FBTCxDQUFXLFFBQTNCLENBQVA7QUFDRDs7OytCQUVVLFEsRUFBVTtBQUNuQixVQUFNLE1BQU0sSUFBSSxHQUFKLEVBQVo7O0FBRG1CO0FBQUE7QUFBQTs7QUFBQTtBQUduQiw4QkFBc0IsUUFBdEIsbUlBQWdDO0FBQUEsY0FBckIsT0FBcUI7O0FBQzlCLGNBQUksR0FBSixDQUFRLFFBQVEsRUFBaEI7QUFDRDtBQUxrQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU9uQixhQUFPLEdBQVA7QUFDRDs7O2dDQUVXO0FBQ1YsV0FBSyxRQUFMLENBQWMsRUFBRSxXQUFXLEtBQUssYUFBTCxFQUFiLEVBQWQ7QUFDRDs7O3VDQUVrQjtBQUNqQixXQUFLLFFBQUwsQ0FBYyxFQUFFLFdBQVcsS0FBSyxVQUFMLENBQWdCLEtBQUssa0JBQUwsRUFBaEIsQ0FBYixFQUFkO0FBQ0Q7OztrQ0FFYTtBQUNaLFdBQUssUUFBTCxDQUFjLEVBQUUsV0FBVyxJQUFJLEdBQUosRUFBYixFQUFkO0FBQ0Q7OztpQ0FFWSxFLEVBQUk7QUFDZixVQUFJLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsR0FBckIsQ0FBeUIsRUFBekIsQ0FBSixFQUFrQztBQUNoQyxhQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLE1BQXJCLENBQTRCLEVBQTVCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixHQUFyQixDQUF5QixFQUF6QjtBQUNEO0FBQ0QsV0FBSyxRQUFMLENBQWMsRUFBRSxXQUFXLEtBQUssS0FBTCxDQUFXLFNBQXhCLEVBQWQ7QUFDRDs7O2lDQUVZLFUsRUFBWTtBQUN2QixRQUFFLElBQUYsQ0FBTztBQUNMLGFBQUssb0JBREE7QUFFTCxnQkFBUSxNQUZIO0FBR0wscUJBQWEsa0JBSFI7QUFJTCxjQUFNLEtBQUssU0FBTCxDQUFlO0FBQ25CLGVBQUssTUFBTSxJQUFOLENBQVcsVUFBWDtBQURjLFNBQWYsQ0FKRDtBQU9MLGtCQUFVLE1BUEw7QUFRTCxlQUFPLEtBUkY7QUFTTCxpQkFBUyxtQkFBTSxDQUFFLENBVFo7QUFVTCxlQUFPLGVBQUMsR0FBRCxFQUFNLE1BQU4sRUFBYyxHQUFkO0FBQUEsaUJBQXNCLFFBQVEsS0FBUixDQUFjLE1BQWQsRUFBc0IsSUFBSSxRQUFKLEVBQXRCLENBQXRCO0FBQUE7QUFWRixPQUFQO0FBWUQ7OzttQ0FFYztBQUNiLFdBQUssWUFBTCxDQUFrQixLQUFLLEtBQUwsQ0FBVyxTQUE3QjtBQUNBLFdBQUssV0FBTDtBQUNEOzs7OEJBRVM7QUFDUixhQUFPLEtBQUssWUFBTCxDQUFrQixLQUFLLGFBQUwsRUFBbEIsQ0FBUDtBQUNEOzs7a0NBRWEsVSxFQUFZO0FBQ3hCLFFBQUUsSUFBRixDQUFPO0FBQ0wsYUFBSyxxQkFEQTtBQUVMLGdCQUFRLE1BRkg7QUFHTCxxQkFBYSxrQkFIUjtBQUlMLGNBQU0sS0FBSyxTQUFMLENBQWU7QUFDbkIsZUFBSyxNQUFNLElBQU4sQ0FBVyxVQUFYO0FBRGMsU0FBZixDQUpEO0FBT0wsa0JBQVUsTUFQTDtBQVFMLGVBQU8sS0FSRjtBQVNMLGlCQUFTLG1CQUFNLENBQUUsQ0FUWjtBQVVMLGVBQU8sZUFBQyxHQUFELEVBQU0sTUFBTixFQUFjLEdBQWQ7QUFBQSxpQkFBc0IsUUFBUSxLQUFSLENBQWMsTUFBZCxFQUFzQixJQUFJLFFBQUosRUFBdEIsQ0FBdEI7QUFBQTtBQVZGLE9BQVA7QUFZRDs7O29DQUVlO0FBQ2QsV0FBSyxhQUFMLENBQW1CLEtBQUssS0FBTCxDQUFXLFNBQTlCO0FBQ0EsV0FBSyxXQUFMO0FBQ0Q7OzsrQkFFVTtBQUNULGFBQU8sS0FBSyxhQUFMLENBQW1CLEtBQUssYUFBTCxFQUFuQixDQUFQO0FBQ0Q7OztzQ0FFaUIsRyxFQUFLO0FBQ3JCLFFBQUUsSUFBRixDQUFPO0FBQ0wsYUFBSywwQkFEQTtBQUVMLGdCQUFRLE1BRkg7QUFHTCxxQkFBYSxrQkFIUjtBQUlMLGNBQU0sS0FBSyxTQUFMLENBQWU7QUFDbkIsZUFBSyxNQUFNLElBQU4sQ0FBVyxLQUFLLEtBQUwsQ0FBVyxTQUF0QixDQURjO0FBRW5CO0FBRm1CLFNBQWYsQ0FKRDtBQVFMLGtCQUFVLE1BUkw7QUFTTCxlQUFPLEtBVEY7QUFVTCxpQkFBUyxtQkFBTSxDQUFFLENBVlo7QUFXTCxlQUFPLGVBQUMsR0FBRCxFQUFNLE1BQU4sRUFBYyxHQUFkO0FBQUEsaUJBQXNCLFFBQVEsS0FBUixDQUFjLE1BQWQsRUFBc0IsSUFBSSxRQUFKLEVBQXRCLENBQXRCO0FBQUE7QUFYRixPQUFQO0FBYUEsV0FBSyxXQUFMO0FBQ0Q7OztvQ0FFZSxTLEVBQVc7QUFBQTs7QUFDekIsVUFBSSxLQUFLLGFBQUwsS0FBdUIsSUFBM0IsRUFBaUM7QUFDL0IsYUFBSyxhQUFMLENBQW1CLFNBQW5CO0FBQ0EsVUFBRSxJQUFGLENBQU87QUFDTCxpQ0FBcUIsU0FBckIsWUFESztBQUVMLGtCQUFRLEtBRkg7QUFHTCxvQkFBVSxNQUhMO0FBSUwsdUJBQWEsa0JBSlI7QUFLTCxpQkFBTyxLQUxGO0FBTUwsbUJBQVMsaUJBQUMsSUFBRCxFQUFVO0FBQ2pCLG1CQUFLLFFBQUwsQ0FBYztBQUNaLHFCQUFPLFNBREs7QUFFWixxQkFBTyxLQUFLO0FBRkEsYUFBZDtBQUlELFdBWEk7QUFZTCxpQkFBTyxlQUFDLEdBQUQsRUFBTSxNQUFOLEVBQWMsR0FBZDtBQUFBLG1CQUFzQixRQUFRLEtBQVIsQ0FBYyxNQUFkLEVBQXNCLElBQUksUUFBSixFQUF0QixDQUF0QjtBQUFBO0FBWkYsU0FBUDtBQWNEO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7K0JBT1c7QUFBQTs7QUFDVCxVQUFNLGNBQWMsR0FBcEI7QUFDQSxVQUFJLGdCQUFnQixXQUFwQjtBQUNBLFVBQU0sc0JBQXNCLENBQTVCO0FBQ0EsVUFBTSxtQkFBbUIsSUFBekI7O0FBRUEsVUFBTSxPQUFPLFNBQVAsSUFBTyxHQUFNO0FBQ2pCLGVBQUssVUFBTCxHQUFrQixJQUFsQixDQUF1QixZQUFNO0FBQzNCLHFCQUFXLElBQVgsRUFBaUIsV0FBakI7QUFDQSwwQkFBZ0IsV0FBaEI7QUFDQSxjQUFJLE9BQUssS0FBTCxDQUFXLHFCQUFmLEVBQXNDO0FBQ3BDLG1CQUFLLFFBQUwsQ0FBYyxFQUFFLHVCQUF1QixLQUF6QixFQUFkO0FBQ0Q7QUFDRCxpQkFBSyxxQkFBTCxHQUE2QixDQUE3QjtBQUNELFNBUEQsRUFPRyxLQVBILENBT1MsWUFBTTtBQUNiLHFCQUFXLElBQVgsRUFBaUIsYUFBakI7QUFDQSxjQUFJLGdCQUFnQixnQkFBcEIsRUFBc0M7QUFDcEMsNEJBQWdCLGdCQUFnQixtQkFBaEM7QUFDRDtBQUNELGlCQUFLLHFCQUFMO0FBQ0EsY0FBSSxPQUFLLHFCQUFMLEdBQTZCLENBQWpDLEVBQW9DO0FBQ2xDLG1CQUFLLFFBQUwsQ0FBYyxFQUFFLHVCQUF1QixJQUF6QixFQUFkO0FBQ0E7QUFDQTtBQUNBLG1CQUFLLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDRDtBQUNGLFNBbkJEO0FBb0JELE9BckJEO0FBc0JBO0FBQ0Q7OztpQ0FFWTtBQUFBOztBQUNYLGFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN0QyxVQUFFLElBQUYsQ0FBTztBQUNMLGVBQUssb0JBREE7QUFFTCxnQkFBTTtBQUNKLDBCQUFjLE9BQUs7QUFEZixXQUZEO0FBS0wsb0JBQVUsTUFMTDtBQU1MLGlCQUFPLEtBTkY7QUFPTCxtQkFBUyxLQVBKO0FBUUwsbUJBQVMsaUJBQUMsSUFBRCxFQUFVO0FBQ2pCLGdCQUFJLEtBQUssUUFBTCxLQUFrQixTQUF0QixFQUFpQztBQUMvQixxQkFBSyxRQUFMLEdBQWdCLEtBQUssUUFBckI7QUFDQSxxQkFBSyxRQUFMLENBQWMsRUFBRSxVQUFVLEtBQUssUUFBakIsRUFBZDtBQUNEO0FBQ0Q7QUFDRCxXQWRJO0FBZUwsaUJBQU8sZUFBQyxHQUFELEVBQU0sTUFBTixFQUFjLEdBQWQsRUFBc0I7QUFDM0Isb0JBQVEsS0FBUixDQUFjLE9BQUssS0FBTCxDQUFXLEdBQXpCLEVBQThCLE1BQTlCLEVBQXNDLElBQUksUUFBSixFQUF0QztBQUNBO0FBQ0Q7QUFsQkksU0FBUDtBQW9CRCxPQXJCTSxDQUFQO0FBc0JEOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFNLFdBQVcsRUFBakI7QUFDQSxVQUFNLFVBQVUsRUFBaEI7QUFDQSxVQUFJLGFBQWEsRUFBakI7O0FBRUEsVUFBSSxLQUFLLEtBQUwsQ0FBVyxxQkFBZixFQUFzQztBQUNwQyxxQkFBYztBQUFBO0FBQUEsWUFBSyxXQUFVLGFBQWY7QUFDWjtBQUFBO0FBQUEsY0FBSyxXQUFVLHFCQUFmO0FBQ0UsaURBQUcsV0FBVSxlQUFiLEdBREY7QUFBQTtBQUFBO0FBRFksU0FBZDtBQUtEOztBQUVELFdBQUssa0JBQUwsR0FBMEIsT0FBMUIsQ0FBa0MsVUFBQyxPQUFEO0FBQUEsZUFBYSxTQUFTLElBQVQsQ0FDN0M7QUFDRSxtQkFBUyxPQURYO0FBRUUsZUFBSyxRQUFRLEVBRmY7QUFHRSxvQkFBVSxPQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLEdBQXJCLENBQXlCLFFBQVEsRUFBakMsQ0FIWjtBQUlFLDBCQUFnQixPQUFLLFlBSnZCO0FBS0UsNkJBQW1CLE9BQUs7QUFMMUIsVUFENkMsQ0FBYjtBQUFBLE9BQWxDOztBQVVBLFVBQU0sU0FBUyxFQUFmO0FBQ0EsV0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixPQUFwQixDQUE0QixVQUFDLE9BQUQsRUFBYTtBQUN2QyxZQUFJLENBQUMsT0FBTyxjQUFQLENBQXNCLE9BQUssWUFBTCxDQUFrQixRQUFRLEtBQTFCLENBQXRCLENBQUwsRUFBOEQ7QUFDNUQsaUJBQU8sT0FBSyxZQUFMLENBQWtCLFFBQVEsS0FBMUIsQ0FBUCxJQUEyQyxDQUEzQztBQUNEO0FBQ0QsZUFBTyxPQUFLLFlBQUwsQ0FBa0IsUUFBUSxLQUExQixDQUFQO0FBQ0QsT0FMRDs7QUFPQSxVQUFNLGdCQUFnQixLQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLElBQTNDO0FBQ0EsVUFBTSxjQUFlLGtCQUFrQixLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLE1BQTNEO0FBQ0EsVUFBTSx5Q0FDZSxjQUFjLFdBQWQsR0FBNEIsRUFEM0MsQ0FBTjs7QUFHQSxVQUFNLDJDQUNlLGtCQUFrQixDQUFsQixHQUFzQixXQUF0QixHQUFvQyxFQURuRCxDQUFOOztBQUdBLFVBQU0sY0FBYyxrQkFBa0IsQ0FBbEIsR0FBc0IsU0FBdEIsR0FBa0MsVUFBdEQ7O0FBRUEsY0FBUSxJQUFSLENBQ0U7QUFBQTtBQUFBLFVBQUssS0FBSSxvQkFBVCxFQUE4QixXQUFVLGFBQXhDO0FBQ0U7QUFDRSxtQkFBUyxDQUFDLElBQUQsRUFBTyxLQUFQLEVBQWMsTUFBZCxFQUFzQixPQUF0QixDQURYO0FBRUUsa0JBQVEsTUFGVjtBQUdFLG1CQUFRLFlBSFY7QUFJRSxpQkFBTyxLQUFLLEtBQUwsQ0FBVyxZQUpwQjtBQUtFLG9CQUFVLGtCQUFDLE1BQUQsRUFBWTtBQUNwQixtQkFBSyxXQUFMO0FBQ0EsbUJBQUssUUFBTCxDQUFjLEVBQUUsY0FBYyxNQUFoQixFQUFkO0FBQ0Q7QUFSSDtBQURGLE9BREY7O0FBZUEsY0FBUSxJQUFSLENBQ0U7QUFBQTtBQUFBLFVBQUssS0FBSSxtQkFBVCxFQUE2QixXQUFVLGFBQXZDO0FBQ0U7QUFDRSxtQkFBUyxLQUFLLGVBQUwsRUFEWDtBQUVFLG1CQUFRLFdBRlY7QUFHRSxpQkFBTyxLQUFLLEtBQUwsQ0FBVyxXQUhwQjtBQUlFLG9CQUFVLGtCQUFDLE1BQUQsRUFBWTtBQUNwQixtQkFBSyxXQUFMO0FBQ0EsbUJBQUssUUFBTCxDQUFjLEVBQUUsYUFBYSxNQUFmLEVBQWQ7QUFDRDtBQVBIO0FBREYsT0FERjs7QUFjQSxjQUFRLElBQVIsQ0FDRTtBQUFBO0FBQUEsVUFBSyxLQUFJLGVBQVQsRUFBeUIsV0FBVSxhQUFuQztBQUNFLCtDQUFLLFdBQVUsdUJBQWYsR0FERjtBQUVFO0FBQUE7QUFBQTtBQUFJLGVBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsSUFBekI7QUFBQTtBQUFnQyxxQkFBaEM7QUFBQTtBQUFBLFNBRkY7QUFHRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGVBQWY7QUFDRTtBQUFBO0FBQUE7QUFDRSx5QkFBVyxrQkFEYjtBQUVFLHVCQUFTLEtBQUssVUFBTCxDQUFnQix1QkFBaEI7QUFGWDtBQUFBO0FBQUEsV0FERjtBQUFBO0FBS0U7QUFBQTtBQUFBO0FBQ0UseUJBQVcsZ0JBRGI7QUFFRSx1QkFBUyxLQUFLLFVBQUwsQ0FBZ0IseUJBQWhCO0FBRlg7QUFBQTtBQUFBO0FBTEY7QUFIRixPQURGOztBQWlCQSxVQUFNLHFCQUFzQixrQkFBa0IsQ0FBbEIsR0FBc0IsV0FBdEIsR0FBb0MsRUFBaEU7O0FBRUEsY0FBUSxJQUFSLENBQ0U7QUFBQTtBQUFBLFVBQUssS0FBSSxnQkFBVCxFQUEwQiwyQkFBeUIsa0JBQW5EO0FBQ0UsK0NBQUssV0FBVSx1QkFBZixHQURGO0FBRUU7QUFBQTtBQUFBO0FBQ0UsMkNBQTZCLGtCQUQvQjtBQUVFLHFCQUFTLEtBQUssVUFBTCxDQUFnQix5QkFBaEI7QUFGWDtBQUdDLCtDQUFHLFdBQVUsWUFBYixHQUhEO0FBQUE7QUFBQSxTQUZGO0FBQUE7QUFPRTtBQUFBO0FBQUE7QUFDRSwwQ0FBNEIsa0JBRDlCO0FBRUUscUJBQVMsS0FBSyxVQUFMLENBQWdCLHdCQUFoQjtBQUZYO0FBR0MsK0NBQUcsV0FBVSxZQUFiLEdBSEQ7QUFBQTtBQUFBO0FBUEYsT0FERjs7QUFlQSxVQUFJLHNCQUFzQixJQUExQjtBQUNBLFVBQUksV0FBVyxJQUFmO0FBekdPO0FBQUE7QUFBQTs7QUFBQTtBQTBHUCw4QkFBeUIsS0FBSyxLQUFMLENBQVcsU0FBcEMsbUlBQStDO0FBQUEsY0FBcEMsVUFBb0M7O0FBQzdDLGNBQUksYUFBYSxJQUFqQixFQUF1QjtBQUNyQix1QkFBVyxLQUFLLGVBQUwsQ0FBcUIsVUFBckIsRUFBaUMsSUFBNUM7QUFDRDtBQUNELGNBQUksS0FBSyxlQUFMLENBQXFCLFVBQXJCLEVBQWlDLElBQWpDLEtBQTBDLFFBQTlDLEVBQXdEO0FBQ3RELGtDQUFzQixLQUF0QjtBQUNBO0FBQ0Q7QUFDRjtBQWxITTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQW9IUCxVQUFJLGdCQUFnQixJQUFwQjtBQXBITztBQUFBO0FBQUE7O0FBQUE7QUFxSFAsOEJBQXlCLEtBQUssS0FBTCxDQUFXLFNBQXBDLG1JQUErQztBQUFBLGNBQXBDLFdBQW9DOztBQUM3QyxjQUFJLEtBQUssZUFBTCxDQUFxQixXQUFyQixFQUFpQyxLQUFqQyxLQUEyQyxJQUEvQyxFQUFxRDtBQUNuRCw0QkFBZ0IsS0FBaEI7QUFDQTtBQUNEO0FBQ0Y7QUExSE07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUE0SFAsVUFBTSxlQUFnQixpQkFBa0IsZ0JBQWdCLENBQWxDLElBQXdDLG1CQUE5RDs7QUFFQSxVQUFJLGVBQWUsRUFBbkI7QUE5SE87QUFBQTtBQUFBOztBQUFBO0FBK0hQLDhCQUFzQixLQUFLLEtBQUwsQ0FBVyxRQUFqQyxtSUFBMkM7QUFBQSxjQUFoQyxPQUFnQzs7QUFDekMsY0FBSSxLQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLEdBQXJCLENBQXlCLFFBQVEsRUFBakMsQ0FBSixFQUEwQztBQUN4QywyQkFBZSxRQUFRLGFBQXZCO0FBQ0Q7QUFDRjtBQW5JTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQXFJUCxjQUFRLElBQVIsQ0FDRTtBQUFBO0FBQUEsVUFBSyxLQUFJLFdBQVQsRUFBcUIsV0FBVSxhQUEvQjtBQUNFLCtDQUFLLFdBQVUsdUJBQWYsR0FERjtBQUVFO0FBQ0Usd0JBQWMsZUFBZSxZQUFmLEdBQThCLEVBRDlDO0FBRUUsb0JBQVUsQ0FBQyxZQUZiO0FBR0UsMEJBSEY7QUFJRSxvQkFBVSxLQUFLLGtCQUFMLENBQXdCLGtEQUF4QixFQUNSLEtBQUssaUJBREc7QUFKWjtBQUZGLE9BREY7O0FBYUEsY0FBUSxJQUFSLENBQ0U7QUFBQTtBQUFBLFVBQUssS0FBSSxTQUFULEVBQW1CLFdBQVUsYUFBN0I7QUFDRSwrQ0FBSyxXQUFVLHVCQUFmLEdBREY7QUFFRTtBQUFBO0FBQUE7QUFDRSx1QkFBVSxpQkFEWjtBQUVFLGtCQUFLLEdBRlA7QUFHRSxxQkFBUyxpQkFBQyxFQUFELEVBQVE7QUFDZixrQkFBSSxPQUFLLFNBQUwsS0FBbUIsSUFBdkIsRUFBNkI7QUFDM0IsdUJBQUssU0FBTCxDQUFlLFNBQWY7QUFDQSxrQkFBRSxJQUFGLENBQU87QUFDTCx1QkFBSyxvQkFEQTtBQUVMLDBCQUFRLEtBRkg7QUFHTCwrQkFBYSxrQkFIUjtBQUlMLHlCQUFPLEtBSkY7QUFLTCwyQkFBUyxpQkFBQyxJQUFELEVBQVU7QUFDakIsMkJBQUssUUFBTCxDQUFjLEVBQUUsS0FBSyxLQUFLLGFBQUwsQ0FBbUIsT0FBbkIsRUFBUCxFQUFkO0FBQ0QsbUJBUEk7QUFRTCx5QkFBTyxlQUFDLEdBQUQsRUFBTSxNQUFOLEVBQWMsR0FBZDtBQUFBLDJCQUFzQixRQUFRLEtBQVIsQ0FBYyxNQUFkLEVBQXNCLElBQUksUUFBSixFQUF0QixDQUF0QjtBQUFBO0FBUkYsaUJBQVA7QUFVRDtBQUNELGlCQUFHLGNBQUg7QUFDRDtBQWxCSDtBQUFBO0FBQUEsU0FGRjtBQUFBO0FBdUJFO0FBQUE7QUFBQTtBQUNFLHVCQUFXLGlCQURiO0FBRUUsa0JBQUssR0FGUDtBQUdFLHFCQUFTLGlCQUFDLEVBQUQsRUFBUTtBQUNmLGtCQUFJLE9BQUssYUFBTCxLQUF1QixJQUEzQixFQUFpQztBQUMvQix1QkFBSyxhQUFMLENBQW1CLFNBQW5CO0FBQ0Esa0JBQUUsSUFBRixDQUFPO0FBQ0wsdUJBQUssb0JBREE7QUFFTCwwQkFBUSxLQUZIO0FBR0wsNEJBQVUsTUFITDtBQUlMLCtCQUFhLGtCQUpSO0FBS0wseUJBQU8sS0FMRjtBQU1MLDJCQUFTLGlCQUFDLElBQUQsRUFBVTtBQUNqQiwyQkFBSyxRQUFMLENBQWM7QUFDWiw2QkFBTyxlQURLO0FBRVosNkJBQU8sS0FBSztBQUZBLHFCQUFkO0FBSUQsbUJBWEk7QUFZTCx5QkFBTyxlQUFDLEdBQUQsRUFBTSxNQUFOLEVBQWMsR0FBZDtBQUFBLDJCQUFzQixRQUFRLEtBQVIsQ0FBYyxNQUFkLEVBQXNCLElBQUksUUFBSixFQUF0QixDQUF0QjtBQUFBO0FBWkYsaUJBQVA7QUFjRDtBQUNELGlCQUFHLGNBQUg7QUFDRDtBQXRCSDtBQXVCQywrQ0FBRyxXQUFVLGVBQWIsR0F2QkQ7QUFBQTtBQUFBO0FBdkJGLE9BREY7O0FBbURBLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVyxlQUFlLEVBQWYsR0FBb0Isa0JBQXBCLEdBQXlDLEVBQXpEO0FBQ0csa0JBREg7QUFFRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGlCQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxLQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsd0JBQWY7QUFDRTtBQUFBO0FBQUEsa0JBQUssSUFBRyxXQUFSO0FBQ0U7QUFBQTtBQUFBLG9CQUFLLElBQUcsYUFBUixFQUFzQixXQUFVLGFBQWhDO0FBQ0c7QUFESDtBQURGO0FBREYsYUFERjtBQVFFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLHVCQUFmO0FBQ0U7QUFBQTtBQUFBLGtCQUFLLElBQUcsa0JBQVI7QUFDRztBQURIO0FBREY7QUFSRjtBQURGLFNBRkY7QUFrQkUsNkRBQVcsS0FBSyxLQUFLLEtBQUwsQ0FBVyxHQUEzQixFQUFnQyxLQUFLLGFBQUMsQ0FBRCxFQUFPO0FBQUUsbUJBQUssU0FBTCxHQUFpQixDQUFqQjtBQUFxQixXQUFuRSxHQWxCRjtBQW1CRSxpRUFBZSxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQWpDLEVBQXdDLEtBQUssYUFBQyxDQUFELEVBQU87QUFBRSxtQkFBSyxhQUFMLEdBQXFCLENBQXJCO0FBQXlCLFdBQS9FO0FBbkJGLE9BREY7QUF1QkQ7Ozs7RUF4aUJvQyxnQkFBTSxTOztrQkFBeEIsUzs7O0FBMmlCckIsVUFBVSxTQUFWLEdBQXNCO0FBQ3BCLE9BQUssZ0JBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QjtBQURSLENBQXRCOzs7Ozs7Ozs7OztBQ2xqQkE7Ozs7Ozs7Ozs7OztJQUVxQixTOzs7OzsrQkFFRCxPLEVBQVM7QUFDekIsVUFBTSxPQUFPLElBQUksSUFBSixDQUFTLE9BQVQsQ0FBYjtBQUNBLFVBQU0sUUFBUSxJQUFJLElBQUosRUFBZDtBQUNBLFVBQU0sWUFBWSxJQUFJLElBQUosRUFBbEI7QUFDQSxnQkFBVSxPQUFWLENBQWtCLE1BQU0sT0FBTixLQUFrQixDQUFwQztBQUNBLFVBQUksTUFBTSxFQUFWOztBQUVBLFVBQUksTUFBTSxRQUFOLE9BQXFCLEtBQUssUUFBTCxFQUFyQixJQUNGLE1BQU0sV0FBTixPQUF3QixLQUFLLFdBQUwsRUFEdEIsSUFFRixNQUFNLE9BQU4sT0FBb0IsS0FBSyxPQUFMLEVBRnRCLEVBRXNDO0FBQ3BDLGNBQU0sT0FBTjtBQUNELE9BSkQsTUFJTyxJQUFJLFVBQVUsUUFBVixPQUF5QixLQUFLLFFBQUwsRUFBekIsSUFDVCxVQUFVLFdBQVYsT0FBNEIsS0FBSyxXQUFMLEVBRG5CLElBRVQsVUFBVSxPQUFWLE9BQXdCLEtBQUssT0FBTCxFQUZuQixFQUVtQztBQUN4QyxjQUFNLFdBQU47QUFDRCxPQUpNLE1BSUE7QUFDTCxjQUFTLEtBQUssV0FBTCxFQUFULFNBQStCLEtBQUssUUFBTCxFQUEvQixTQUFrRCxLQUFLLE9BQUwsRUFBbEQ7QUFDRDs7QUFFRCxhQUFVLEdBQVYsU0FBaUIsS0FBSyxRQUFMLEVBQWpCLFNBQW9DLEtBQUssVUFBTCxFQUFwQyxTQUF5RCxLQUFLLFVBQUwsRUFBekQ7QUFDRDs7O0FBRUQscUJBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLHNIQUNYLEtBRFc7O0FBRWpCLFVBQUssUUFBTCxHQUFnQixJQUFoQjtBQUZpQjtBQUdsQjs7Ozt3Q0FFbUI7QUFBQTs7QUFDbEIsUUFBRSxNQUFGLEVBQVUsRUFBVixDQUFhLFFBQWIsRUFBdUIsWUFBTTtBQUFFLGVBQUssWUFBTDtBQUFzQixPQUFyRDtBQUNBLFFBQUUsS0FBSyxRQUFQLEVBQWlCLEVBQWpCLENBQW9CLGVBQXBCLEVBQXFDLFlBQU07QUFBRSxlQUFLLFlBQUw7QUFBc0IsT0FBbkU7QUFDRDs7O2dDQUVXO0FBQ1YsVUFBSSxLQUFLLFFBQUwsS0FBa0IsSUFBdEIsRUFBNEI7QUFDMUIsVUFBRSxLQUFLLFFBQVAsRUFBaUIsS0FBakI7QUFDRDtBQUNGOzs7bUNBRWM7QUFDYixVQUFNLFNBQVMsRUFBRSxLQUFLLFFBQVAsQ0FBZjtBQUNBLFVBQU0sb0JBQW9CLEVBQTFCO0FBQ0EsVUFBTSxjQUFjLEVBQXBCO0FBQ0EsVUFBTSxjQUFjLENBQXBCOztBQUVBLFVBQU0sYUFBYSxPQUFPLFdBQVAsSUFBc0Isb0JBQW9CLGNBQWMsQ0FBbEMsR0FBc0MsY0FBYyxDQUExRSxDQUFuQjtBQUNBLGFBQU8sSUFBUCxDQUFZLGFBQVosRUFBMkIsR0FBM0IsQ0FBK0IsRUFBRSxXQUFXLFVBQWIsRUFBL0I7QUFDRDs7OzZCQUVRO0FBQUE7O0FBQ1AsVUFBTSxhQUFhO0FBQ2pCLGVBQU8sUUFEVTtBQUVqQixpQkFBUztBQUZRLE9BQW5COztBQUtBLFVBQU0sVUFBVSxFQUFoQjtBQU5PO0FBQUE7QUFBQTs7QUFBQTtBQU9QLDZCQUF1QixLQUFLLEtBQUwsQ0FBVyxHQUFsQyw4SEFBdUM7QUFBQSxjQUE1QixRQUE0Qjs7QUFDckMsY0FBTSxXQUFXLFdBQVcsU0FBUyxJQUFwQixNQUE4QixTQUE5QixHQUEwQyxXQUFXLFNBQVMsSUFBcEIsQ0FBMUMsR0FBc0UsRUFBdkY7O0FBRUEsa0JBQVEsSUFBUixDQUNFO0FBQUE7QUFBQSxjQUFJLEtBQUssU0FBUyxFQUFsQixFQUFzQixXQUFXLFFBQWpDO0FBQ0U7QUFBQTtBQUFBO0FBQUssd0JBQVUsVUFBVixDQUFxQixTQUFTLElBQTlCO0FBQUwsYUFERjtBQUVFO0FBQUE7QUFBQTtBQUFLLHVCQUFTO0FBQWQsYUFGRjtBQUdFO0FBQUE7QUFBQTtBQUFLLHVCQUFTO0FBQWQ7QUFIRixXQURGO0FBT0Q7QUFqQk07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFtQlAsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLDRCQUFmLEVBQTRDLFVBQVMsSUFBckQsRUFBMEQsTUFBSyxRQUEvRCxFQUF3RSxLQUFLLGFBQUMsQ0FBRCxFQUFPO0FBQUUsbUJBQUssUUFBTCxHQUFnQixDQUFoQjtBQUFvQixXQUExRztBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsdUJBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLGVBQWY7QUFDRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxjQUFmO0FBQ0U7QUFBQTtBQUFBLGtCQUFRLE1BQUssUUFBYixFQUFzQixXQUFVLE9BQWhDLEVBQXdDLGdCQUFhLE9BQXJEO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGLGVBREY7QUFJRTtBQUFBO0FBQUEsa0JBQUksV0FBVSxhQUFkO0FBQTZCLHFCQUFLLEtBQUwsQ0FBVztBQUF4QztBQUpGLGFBREY7QUFPRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxZQUFmO0FBQ0U7QUFBQTtBQUFBLGtCQUFPLFdBQVUsbUNBQWpCO0FBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFERjtBQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRkY7QUFHRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSEY7QUFERixpQkFERjtBQVFFO0FBQUE7QUFBQTtBQUNDO0FBREQ7QUFSRjtBQURGO0FBUEY7QUFERjtBQURGLE9BREY7QUE0QkQ7Ozs7RUFqR29DLGdCQUFNLFM7O2tCQUF4QixTOzs7QUFvR3JCLFVBQVUsU0FBVixHQUFzQjtBQUNwQixTQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsTUFESDtBQUVwQixPQUFLLGdCQUFNLFNBQU4sQ0FBZ0IsT0FBaEIsQ0FDSCxnQkFBTSxTQUFOLENBQWdCLEtBQWhCLENBQXNCO0FBQ3BCLFFBQUksZ0JBQU0sU0FBTixDQUFnQixNQURBO0FBRXBCLFVBQU0sZ0JBQU0sU0FBTixDQUFnQixNQUZGO0FBR3BCLFVBQU0sZ0JBQU0sU0FBTixDQUFnQixNQUhGO0FBSXBCLGdCQUFZLGdCQUFNLFNBQU4sQ0FBZ0IsTUFKUjtBQUtwQixrQkFBYyxnQkFBTSxTQUFOLENBQWdCLE1BTFY7QUFNcEIsYUFBUyxnQkFBTSxTQUFOLENBQWdCO0FBTkwsR0FBdEIsQ0FERztBQUZlLENBQXRCOztBQWNBLFVBQVUsWUFBVixHQUF5QjtBQUN2QixPQUFLLEVBRGtCO0FBRXZCLFNBQU87QUFGZ0IsQ0FBekI7Ozs7O0FDcEhBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsT0FBTyxTQUFQLEdBQW1CLElBQW5COztBQUVBO0FBQ0EsRUFBRSxZQUFNO0FBQ04sU0FBTyxTQUFQLEdBQW1CLG1CQUFTLE1BQVQsQ0FDakIscURBQVcsS0FBSSxlQUFmLEdBRGlCLEVBRWpCLFNBQVMsY0FBVCxDQUF3QixvQkFBeEIsQ0FGaUIsQ0FBbkI7O0FBS0E7QUFDQSxJQUFFLGdCQUFGLEVBQW9CLElBQXBCLENBQXlCLFNBQVMsZUFBVCxHQUEyQjtBQUFBOztBQUNsRCxNQUFFLElBQUYsRUFBUSxFQUFSLENBQVcsT0FBWCxFQUFvQixVQUFDLEVBQUQsRUFBUTtBQUMxQixhQUFPLFNBQVAsQ0FBaUIsVUFBakIsQ0FBNEIsU0FBUSxJQUFSLENBQWEsY0FBYixDQUE1QjtBQUNBLFNBQUcsY0FBSDtBQUNELEtBSEQ7QUFJRCxHQUxEO0FBTUQsQ0FiRDs7Ozs7Ozs7Ozs7QUNQQTs7Ozs7Ozs7Ozs7O0lBRXFCLE87OztBQUNuQixtQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsa0hBQ1gsS0FEVzs7QUFFakIsVUFBSyxXQUFMLEdBQW1CLE1BQUssV0FBTCxDQUFpQixJQUFqQixPQUFuQjtBQUNBLFVBQUsscUJBQUwsR0FBNkIsTUFBSyxxQkFBTCxDQUEyQixJQUEzQixPQUE3QjtBQUhpQjtBQUlsQjs7OztrQ0FFYTtBQUNaLFdBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixFQUE3QztBQUNEOzs7MENBRXFCLEUsRUFBSTtBQUN4QixXQUFLLEtBQUwsQ0FBVyxpQkFBWCxDQUE2QixLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEVBQWhEO0FBQ0EsU0FBRyxjQUFIO0FBQ0EsU0FBRyxlQUFIO0FBQ0Q7Ozs2QkFFUTtBQUFBOztBQUNQLFVBQU0saUJBQWlCLENBQ3JCLFNBRHFCLHFCQUVKLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsS0FGZixvQkFHTCxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLElBSGQsQ0FBdkI7O0FBTUEsVUFBSSxLQUFLLEtBQUwsQ0FBVyxRQUFmLEVBQXlCO0FBQ3ZCLHVCQUFlLElBQWYsQ0FBb0Isa0JBQXBCO0FBQ0Q7O0FBRUQsYUFDRTtBQUFBO0FBQUE7QUFDRSxjQUFJLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsRUFEekI7QUFFRSxxQkFBVyxlQUFlLElBQWYsQ0FBb0IsR0FBcEIsQ0FGYjtBQUdFLG1CQUFTLEtBQUs7QUFIaEI7QUFLRSwrQ0FBSyxXQUFVLHFCQUFmLEdBTEY7QUFNRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGNBQWY7QUFDRSxpREFBSyxLQUFLLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsR0FBN0IsRUFBa0MsS0FBSyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLElBQTFEO0FBREYsU0FORjtBQVNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsY0FBZjtBQUErQixlQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CO0FBQWxELFNBVEY7QUFVRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGNBQWY7QUFBK0IsZUFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQjtBQUFsRCxTQVZGO0FBV0U7QUFBQTtBQUFBLFlBQUssV0FBVSxhQUFmO0FBQThCLGVBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUI7QUFBakQsU0FYRjtBQVlFO0FBQUE7QUFBQSxZQUFLLFdBQVUsZ0JBQWY7QUFBaUMsZUFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQjtBQUFwRCxTQVpGO0FBYUU7QUFBQTtBQUFBLFlBQUcsV0FBVSx1QkFBYixFQUFxQyxTQUFTLGlCQUFDLEVBQUQsRUFBUTtBQUFFLHFCQUFLLHFCQUFMLENBQTJCLEVBQTNCO0FBQWlDLGFBQXpGO0FBQ0UsK0NBQUcsV0FBVSxlQUFiO0FBREY7QUFiRixPQURGO0FBbUJEOzs7O0VBL0NrQyxnQkFBTSxTOztrQkFBdEIsTzs7O0FBa0RyQixRQUFRLFNBQVIsR0FBb0I7QUFDbEIsV0FBUyxnQkFBTSxTQUFOLENBQWdCLEtBQWhCLENBQXNCO0FBQzdCLFFBQUksZ0JBQU0sU0FBTixDQUFnQixNQURTO0FBRTdCLFVBQU0sZ0JBQU0sU0FBTixDQUFnQixNQUZPO0FBRzdCLFdBQU8sZ0JBQU0sU0FBTixDQUFnQixNQUhNO0FBSTdCLFVBQU0sZ0JBQU0sU0FBTixDQUFnQixNQUpPO0FBSzdCLFlBQVEsZ0JBQU0sU0FBTixDQUFnQixNQUxLO0FBTTdCLFNBQUssZ0JBQU0sU0FBTixDQUFnQixNQU5RO0FBTzdCLFVBQU0sZ0JBQU0sU0FBTixDQUFnQjtBQVBPLEdBQXRCLEVBUU4sVUFUZTtBQVVsQixZQUFVLGdCQUFNLFNBQU4sQ0FBZ0IsSUFWUjtBQVdsQixrQkFBZ0IsZ0JBQU0sU0FBTixDQUFnQixJQVhkO0FBWWxCLHFCQUFtQixnQkFBTSxTQUFOLENBQWdCO0FBWmpCLENBQXBCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbi8qKlxuICogQXBwU2VsZWN0IGNvbXBvbmVudFxuICogQWxsb3dzIHRoZSB1c2VyIHRvIHNlbGVjdCBhbiBhcHBsaWNhdGlvbiBmcm9tIGEgbGlzdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBTZWxlY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuYXBwU2VsZWN0b3IgPSBudWxsO1xuICAgIHRoaXMuY2xpY2tlZENoYW5nZUFwcCA9IHRoaXMuY2xpY2tlZENoYW5nZUFwcC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY2xpY2tlZENoYW5nZUFwcCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLmFwcFNlbGVjdG9yLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgYXBwbGljYXRpb25zID0gW107XG5cbiAgICBpZiAodGhpcy5wcm9wcy5hbGxvd0JsYW5rKSB7XG4gICAgICBhcHBsaWNhdGlvbnMucHVzaChcbiAgICAgICAgPG9wdGlvbiBrZXk9XCJudWxsXCIgdmFsdWU9XCJcIj4mbmJzcDs8L29wdGlvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBhcHBsaWNhdGlvbiBvZiB0aGlzLnByb3BzLmFwcGxpY2F0aW9ucykge1xuICAgICAgYXBwbGljYXRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PXthcHBsaWNhdGlvbn0gdmFsdWU9e2FwcGxpY2F0aW9ufT57YXBwbGljYXRpb259PC9vcHRpb24+XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGRpc2FibGVkQ2xhc3MgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA/ICcgZGlzYWJsZWQnIDogJycpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYXBwU2VsZWN0JHtkaXNhYmxlZENsYXNzfWB9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0taW5saW5lXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIGZvcm0tZ3JvdXAtbWlud2lkdGhcIj5cbiAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sJHtkaXNhYmxlZENsYXNzfWB9XG4gICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgPyB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSA6ICcnfVxuICAgICAgICAgICAgICByZWY9eyhzZWwpID0+IHsgdGhpcy5hcHBTZWxlY3RvciA9IHNlbDsgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2FwcGxpY2F0aW9uc31cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICZuYnNwO1xuICAgICAgICAgIDxhXG4gICAgICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLXdhcm5pbmcke2Rpc2FibGVkQ2xhc3N9YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY2xpY2tlZENoYW5nZUFwcH1cbiAgICAgICAgICA+Q2hhbmdlIGFwcGxpY2F0aW9uPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQXBwU2VsZWN0LnByb3BUeXBlcyA9IHtcbiAgYXBwbGljYXRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICksXG4gIGRlZmF1bHRWYWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgYWxsb3dCbGFuazogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGRpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgb25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxufTtcblxuQXBwU2VsZWN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgYXBwbGljYXRpb25zOiBbXSxcbiAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgYWxsb3dCbGFuazogZmFsc2UsXG4gIGRpc2FibGVkOiBmYWxzZSxcbiAgb25DaGFuZ2U6ICgpID0+IHt9LFxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEJ1dHRvbkZpbHRlciA9IChwcm9wcykgPT4ge1xuICBjb25zdCBvcHRpb25zID0gW107XG5cbiAgZm9yIChjb25zdCBvcHRpb24gb2YgcHJvcHMub3B0aW9ucykge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbJ2J0bicsICdidG4tZGVmYXVsdCcsIGBidXR0b24tZmlsdGVyLW9wdGlvbi0ke29wdGlvbn1gXTtcbiAgICBpZiAocHJvcHMudmFsdWUgPT09IG9wdGlvbikge1xuICAgICAgY2xhc3Nlcy5wdXNoKCdhY3RpdmUnKTtcbiAgICB9XG4gICAgbGV0IGNvdW50ZXIgPSAnJztcbiAgICBsZXQgc3BhY2luZyA9ICcnO1xuICAgIGlmIChwcm9wcy5jb3VudHMgIT09IG51bGwpIHtcbiAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICBpZiAocHJvcHMuY291bnRzLmhhc093blByb3BlcnR5KG9wdGlvbikgJiYgcHJvcHMuY291bnRzW29wdGlvbl0gIT09IDApIHtcbiAgICAgICAgY291bnQgPSBwcm9wcy5jb3VudHNbb3B0aW9uXTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGJhZGdlQ2xhc3NlcyA9IGBiYWRnZSR7Y291bnQgPT09IDAgPyAnIHplcm8nIDogJyBub24temVybyd9YDtcbiAgICAgIGNvdW50ZXIgPSAoPHNwYW4gY2xhc3NOYW1lPXtiYWRnZUNsYXNzZXN9Pntjb3VudH08L3NwYW4+KTtcbiAgICAgIHNwYWNpbmcgPSAnICc7XG4gICAgfVxuICAgIG9wdGlvbnMucHVzaChcbiAgICAgIDxhXG4gICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oJyAnKX1cbiAgICAgICAga2V5PXtvcHRpb259XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHByb3BzLm9uQ2hhbmdlKG9wdGlvbil9XG4gICAgICA+e29wdGlvbn17c3BhY2luZ317Y291bnRlcn08L2E+XG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGRlZmF1bHRDbGFzc2VzID0gWydidG4nLCAnYnRuLWRlZmF1bHQnXTtcbiAgaWYgKHByb3BzLnZhbHVlID09PSAnJykge1xuICAgIGRlZmF1bHRDbGFzc2VzLnB1c2goJ2FjdGl2ZScpO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi10b29sYmFyIGJ1dHRvbi1maWx0ZXJcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgIDxhXG4gICAgICAgICAgaHJlZj1cIiNcIlxuICAgICAgICAgIGNsYXNzTmFtZT17ZGVmYXVsdENsYXNzZXMuam9pbignICcpfVxuICAgICAgICAgIGtleT1cIm51bGxcIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHByb3BzLm9uQ2hhbmdlKCcnKX1cbiAgICAgICAgPntwcm9wcy5hbGxUZXh0fTwvYT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAge29wdGlvbnN9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbkJ1dHRvbkZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIG9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5zdHJpbmcpLFxuICBjb3VudHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3RPZihSZWFjdC5Qcm9wVHlwZXMubnVtYmVyKSxcbiAgYWxsVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbn07XG5cbkJ1dHRvbkZpbHRlci5kZWZhdWx0UHJvcHMgPSB7XG4gIG9wdGlvbnM6IFtdLFxuICBjb3VudHM6IG51bGwsXG4gIGFsbFRleHQ6ICdBbGwnLFxuICB2YWx1ZTogJycsXG4gIG9uQ2hhbmdlOiAoKSA9PiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkZpbHRlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnNvbGVWaWV3ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMubW9kYWxESVYgPSBudWxsO1xuICB9XG5cbiAgb3Blbk1vZGFsKCkge1xuICAgIGlmICh0aGlzLm1vZGFsRElWICE9PSBudWxsKSB7XG4gICAgICAkKHRoaXMubW9kYWxESVYpLm1vZGFsKCk7XG4gICAgICAkKHRoaXMubW9kYWxESVYpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBtb2RhbEJvZHkgPSAkKHRoaXMpLmZpbmQoJy5tb2RhbC1ib2R5JykuZmlyc3QoKVswXTtcbiAgICAgICAgbW9kYWxCb2R5LnNjcm9sbFRvcCA9IE1hdGgubWF4KG1vZGFsQm9keS5zY3JvbGxIZWlnaHQsIG1vZGFsQm9keS5jbGllbnRIZWlnaHQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCAoKSA9PiB7IHRoaXMuaGFuZGxlUmVzaXplKCk7IH0pO1xuICAgICQodGhpcy5tb2RhbERJVikub24oJ3Nob3cuYnMubW9kYWwnLCAoKSA9PiB7IHRoaXMuaGFuZGxlUmVzaXplKCk7IH0pO1xuICB9XG5cbiAgaGFuZGxlUmVzaXplKCkge1xuICAgIGNvbnN0ICRtb2RhbCA9ICQodGhpcy5tb2RhbERJVik7XG4gICAgY29uc3QgbW9kYWxIZWFkZXJIZWlnaHQgPSA1NjtcbiAgICBjb25zdCBtb2RhbE1hcmdpbiA9IDMwO1xuICAgIGNvbnN0IG1vZGFsQm9yZGVyID0gMTtcblxuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSAobW9kYWxIZWFkZXJIZWlnaHQgKyBtb2RhbE1hcmdpbiAqIDIgKyBtb2RhbEJvcmRlciAqIDIpO1xuICAgICRtb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmNzcyh7IG1heEhlaWdodDogYm9keUhlaWdodCB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlIGNvbnNvbGVWaWV3ZXItbW9kYWxcIiB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIHJlZj17KGMpID0+IHsgdGhpcy5tb2RhbERJViA9IGM7IH19PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZyBtb2RhbC1sZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPiZ0aW1lczs8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj57dGhpcy5wcm9wcy50aXRsZX08L2g0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgPHByZT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5saW5lcy5qb2luKCdcXG4nKX1cbiAgICAgICAgICAgICAgPC9wcmU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkNvbnNvbGVWaWV3ZXIucHJvcFR5cGVzID0ge1xuICB0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgbGluZXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5zdHJpbmcpLFxufTtcblxuQ29uc29sZVZpZXdlci5kZWZhdWx0UHJvcHMgPSB7XG4gIHRpdGxlOiAnVGVybWluYWwgT3V0cHV0JyxcbiAgbGluZXM6IFtdLFxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU3RhdGlvbiBmcm9tICcuL3N0YXRpb24uanN4JztcbmltcG9ydCBBcHBTZWxlY3QgZnJvbSAnLi9hcHBTZWxlY3QuanN4JztcbmltcG9ydCBCdXR0b25GaWx0ZXIgZnJvbSAnLi9idXR0b25GaWx0ZXIuanN4JztcbmltcG9ydCBMb2dWaWV3ZXIgZnJvbSAnLi9sb2dWaWV3ZXIuanN4JztcbmltcG9ydCBDb25zb2xlVmlld2VyIGZyb20gJy4vY29uc29sZVZpZXdlci5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdGF0aW9uczogW10sXG4gICAgICBzZWxlY3Rpb246IG5ldyBTZXQoKSxcbiAgICAgIHZpc2libGVUeXBlOiAnJyxcbiAgICAgIHZpc2libGVTdGF0ZTogJycsXG4gICAgICBsb2c6IFtdLFxuICAgICAgc2VydmVyQ29ubmVjdGlvbkVycm9yOiBmYWxzZSxcbiAgICB9O1xuICAgIHRoaXMuc2VsZWN0VG9nZ2xlID0gdGhpcy5zZWxlY3RUb2dnbGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNoYW5nZUFwcFNlbGVjdGVkID0gdGhpcy5jaGFuZ2VBcHBTZWxlY3RlZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2hvd1Rlcm1pbmFsTG9nID0gdGhpcy5zaG93VGVybWluYWxMb2cuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNvbW1hbmRzID0ge307XG4gICAgdGhpcy5pbml0Q29tbWFuZHMoKTtcbiAgICB0aGlzLmdldENvbW1hbmQgPSB0aGlzLmdldENvbW1hbmQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvZ1ZpZXdlciA9IG51bGw7XG4gICAgdGhpcy5jb25zb2xlVmlld2VyID0gbnVsbDtcbiAgICB0aGlzLnVwZGF0ZUlEID0gMDtcbiAgICB0aGlzLnNlcnZlckNvbm5lY3Rpb25SZXRyeSA9IDA7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnBvbGxMb29wKCk7XG4gIH1cblxuICBnZXRTdGF0aW9uU3RhdGUoc3RhdGlvbklEKSB7XG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIGlmIChzdGF0aW9uLmlkID09PSBzdGF0aW9uSUQpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRpb247XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0U3RhdGlvblR5cGVzKCkge1xuICAgIGNvbnN0IHR5cGVzID0gbmV3IFNldCgpO1xuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiB0aGlzLnN0YXRlLnN0YXRpb25zKSB7XG4gICAgICB0eXBlcy5hZGQoc3RhdGlvbi50eXBlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0eXBlcyk7XG4gIH1cblxuICBnZXRDb21tYW5kKGNvbW1hbmROYW1lKSB7XG4gICAgaWYgKHRoaXMuY29tbWFuZHNbY29tbWFuZE5hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbW1hbmRzW2NvbW1hbmROYW1lXS5kb0NhbGxiYWNrO1xuICAgIH1cbiAgICB0aHJvdyBFcnJvcihgQ2FsbCB0byBpbnZhbGlkIGNvbW1hbmQgJHtjb21tYW5kTmFtZX1gKTtcbiAgfVxuXG4gIGdldFZpc2libGVTdGF0aW9ucygpIHtcbiAgICBjb25zdCBhbnN3ZXIgPSBbXTtcblxuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiB0aGlzLnN0YXRlLnN0YXRpb25zKSB7XG4gICAgICBpZiAoKHRoaXMuc3RhdGUudmlzaWJsZVR5cGUgPT09ICcnIHx8IHN0YXRpb24udHlwZSA9PT0gdGhpcy5zdGF0ZS52aXNpYmxlVHlwZSkgJiZcbiAgICAgICAgICAodGhpcy5zdGF0ZS52aXNpYmxlU3RhdGUgPT09ICcnIHx8XG4gICAgICAgICAgIHRoaXMuZGlzcGxheVN0YXRlKHN0YXRpb24uc3RhdGUpID09PSB0aGlzLnN0YXRlLnZpc2libGVTdGF0ZSkpIHtcbiAgICAgICAgYW5zd2VyLnB1c2goc3RhdGlvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFuc3dlcjtcbiAgfVxuXG4gIGRpc3BsYXlTdGF0ZShzdGF0ZSkge1xuICAgIGlmIChzdGF0ZSA9PT0gJ3N0YXJ0aW5nX3N0YXRpb24nIHx8XG4gICAgICBzdGF0ZSA9PT0gJ3N0YXJ0aW5nX2FwcCcgfHxcbiAgICAgIHN0YXRlID09PSAnc3RvcHBpbmcnIHx8XG4gICAgICBzdGF0ZSA9PT0gJ3N3aXRjaGluZ19hcHAnKSB7XG4gICAgICByZXR1cm4gJ2J1c3knO1xuICAgIH1cblxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGF0dGFjaENvbmZpcm1hdGlvbih0ZXh0LCBjYWxsYmFjaykge1xuICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgYm9vdGJveC5kaWFsb2coe1xuICAgICAgICBtZXNzYWdlOiB0ZXh0LFxuICAgICAgICBidXR0b25zOiB7XG4gICAgICAgICAgd2FybmluZzoge1xuICAgICAgICAgICAgbGFiZWw6ICdDb25maXJtJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bi13YXJuaW5nJyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjay5iaW5kKHRoaXMsIC4uLmFyZ3MpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2FuY2VsOiB7XG4gICAgICAgICAgICBsYWJlbDogJ0NhbmNlbCcsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdidG4tZGVmYXVsdCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBpbml0Q29tbWFuZHMoKSB7XG4gICAgdGhpcy5jb21tYW5kcyA9IHtcbiAgICAgICdzdGF0aW9ucy1hbGwtc3RhcnQnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnN0YXJ0QWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RhcnQgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtYWxsLXN0b3AnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnN0b3BBbGwuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzdG9wIGFsbCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IHRydWUsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLWFsbC1zZWxlY3QnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnNlbGVjdEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3NlbGVjdCBhbGwgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtYWxsLWRlc2VsZWN0Jzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5kZXNlbGVjdEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ2Rlc2VsZWN0IGFsbCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IGZhbHNlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1zZWxlY3RlZC1zdGFydCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RhcnRTZWxlY3RlZC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3N0YXJ0IHRoZSBzZWxlY3RlZCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IHRydWUsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLXNlbGVjdGVkLXN0b3AnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnN0b3BTZWxlY3RlZC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3N0b3AgdGhlIHNlbGVjdGVkIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtdmlzaWJsZS1zZWxlY3QnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnNlbGVjdEFsbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzZWxlY3QgdmlzaWJsZSBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IGZhbHNlLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5rZXlzKHRoaXMuY29tbWFuZHMpKSB7XG4gICAgICBjb25zdCBjb21tYW5kID0gdGhpcy5jb21tYW5kc1tuYW1lXTtcbiAgICAgIGlmIChjb21tYW5kLmNvbmZpcm0pIHtcbiAgICAgICAgdGhpcy5jb21tYW5kc1tuYW1lXS5kb0NhbGxiYWNrID0gdGhpcy5hdHRhY2hDb25maXJtYXRpb24oXG4gICAgICAgICAgYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byAke2NvbW1hbmQudGl0bGV9P2AsXG4gICAgICAgICAgY29tbWFuZC5jYWxsYmFja1xuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21tYW5kc1tuYW1lXS5kb0NhbGxiYWNrID0gY29tbWFuZC5jYWxsYmFjaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhbGxTdGF0aW9uSURzKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRpb25JRHModGhpcy5zdGF0ZS5zdGF0aW9ucyk7XG4gIH1cblxuICBzdGF0aW9uSURzKHN0YXRpb25zKSB7XG4gICAgY29uc3QgaWRzID0gbmV3IFNldCgpO1xuXG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHN0YXRpb25zKSB7XG4gICAgICBpZHMuYWRkKHN0YXRpb24uaWQpO1xuICAgIH1cblxuICAgIHJldHVybiBpZHM7XG4gIH1cblxuICBzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogdGhpcy5hbGxTdGF0aW9uSURzKCkgfSk7XG4gIH1cblxuICBzZWxlY3RBbGxWaXNpYmxlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3Rpb246IHRoaXMuc3RhdGlvbklEcyh0aGlzLmdldFZpc2libGVTdGF0aW9ucygpKSB9KTtcbiAgfVxuXG4gIGRlc2VsZWN0QWxsKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3Rpb246IG5ldyBTZXQoKSB9KTtcbiAgfVxuXG4gIHNlbGVjdFRvZ2dsZShpZCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGlvbi5oYXMoaWQpKSB7XG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbi5kZWxldGUoaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbi5hZGQoaWQpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW9uOiB0aGlzLnN0YXRlLnNlbGVjdGlvbiB9KTtcbiAgfVxuXG4gIHN0b3BTdGF0aW9ucyhzdGF0aW9uSURzKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvc3RhdGlvbnMvc3RvcCcsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGlkczogQXJyYXkuZnJvbShzdGF0aW9uSURzKSxcbiAgICAgIH0pLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHt9LFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICB9XG5cbiAgc3RvcFNlbGVjdGVkKCkge1xuICAgIHRoaXMuc3RvcFN0YXRpb25zKHRoaXMuc3RhdGUuc2VsZWN0aW9uKTtcbiAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gIH1cblxuICBzdG9wQWxsKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3BTdGF0aW9ucyh0aGlzLmFsbFN0YXRpb25JRHMoKSk7XG4gIH1cblxuICBzdGFydFN0YXRpb25zKHN0YXRpb25JRHMpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9zdGF0aW9ucy9zdGFydCcsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGlkczogQXJyYXkuZnJvbShzdGF0aW9uSURzKSxcbiAgICAgIH0pLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHt9LFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICB9XG5cbiAgc3RhcnRTZWxlY3RlZCgpIHtcbiAgICB0aGlzLnN0YXJ0U3RhdGlvbnModGhpcy5zdGF0ZS5zZWxlY3Rpb24pO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHN0YXJ0QWxsKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0U3RhdGlvbnModGhpcy5hbGxTdGF0aW9uSURzKCkpO1xuICB9XG5cbiAgY2hhbmdlQXBwU2VsZWN0ZWQoYXBwKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvc3RhdGlvbnMvY2hhbmdlX2FwcCcsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGlkczogQXJyYXkuZnJvbSh0aGlzLnN0YXRlLnNlbGVjdGlvbiksXG4gICAgICAgIGFwcCxcbiAgICAgIH0pLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHt9LFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHNob3dUZXJtaW5hbExvZyhzdGF0aW9uSUQpIHtcbiAgICBpZiAodGhpcy5jb25zb2xlVmlld2VyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmNvbnNvbGVWaWV3ZXIub3Blbk1vZGFsKCk7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGAvYXBpL3N0YXRpb24vJHtzdGF0aW9uSUR9L291dHB1dGAsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHRpdGxlOiBzdGF0aW9uSUQsXG4gICAgICAgICAgICBsaW5lczogZGF0YS5saW5lcyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSB0aGUgc2VydmVyIHBvbGxcbiAgICpcbiAgICogSW1wbGVtZW50YXRpb246IFNpbmNlIHRoZSBzZXJ2ZXIgdXNlcyBsb25nIHBvbGxpbmcgd2UgdXNlIGEgdmVyeSBzaG9ydFxuICAgKiBwb2xsIHRpbWUgKDUwMG1zKS4gSW4gY2FzZSBvZiBlcnJvcnMgY29udGFjdGluZyB0aGUgc2VydmVyIHRoZSBwb2xsIHRpbWVcbiAgICogaW5jcmVhc2VzIHdpdGggZWFjaCBlcnJvciB1bnRpbCBhIG1heCBwb2xsIHRpbWUgaXMgcmVhY2hlZC5cbiAgICovXG4gIHBvbGxMb29wKCkge1xuICAgIGNvbnN0IG1pblBvbGxUaW1lID0gNTAwO1xuICAgIGxldCByZXRyeVBvbGxUaW1lID0gbWluUG9sbFRpbWU7XG4gICAgY29uc3QgcmV0cnlJbmNyZWFzZUZhY3RvciA9IDI7XG4gICAgY29uc3QgbWF4UmV0cnlQb2xsVGltZSA9IDQwMDA7XG5cbiAgICBjb25zdCBsb29wID0gKCkgPT4ge1xuICAgICAgdGhpcy5wb2xsU2VydmVyKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQobG9vcCwgbWluUG9sbFRpbWUpO1xuICAgICAgICByZXRyeVBvbGxUaW1lID0gbWluUG9sbFRpbWU7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlcnZlckNvbm5lY3Rpb25FcnJvcikge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXJ2ZXJDb25uZWN0aW9uRXJyb3I6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5ID0gMDtcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChsb29wLCByZXRyeVBvbGxUaW1lKTtcbiAgICAgICAgaWYgKHJldHJ5UG9sbFRpbWUgPCBtYXhSZXRyeVBvbGxUaW1lKSB7XG4gICAgICAgICAgcmV0cnlQb2xsVGltZSA9IHJldHJ5UG9sbFRpbWUgKiByZXRyeUluY3JlYXNlRmFjdG9yO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5Kys7XG4gICAgICAgIGlmICh0aGlzLnNlcnZlckNvbm5lY3Rpb25SZXRyeSA+IDUpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmVyQ29ubmVjdGlvbkVycm9yOiB0cnVlIH0pO1xuICAgICAgICAgIC8vIFJlc2V0IHRoZSB1cGRhdGVJRCBzbyB0aGUgbmV4dCBwb2xsIHJldHVybnMgaW1tZWRpYXRlbHlcbiAgICAgICAgICAvLyBpbnN0ZWFkIG9mIGJlaW5nIGEgbG9uZyBwb2xsXG4gICAgICAgICAgdGhpcy51cGRhdGVJRCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgbG9vcCgpO1xuICB9XG5cbiAgcG9sbFNlcnZlcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9zdGF0aW9ucy9wb2xsJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGxhc3RVcGRhdGVJRDogdGhpcy51cGRhdGVJRCxcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICB0aW1lb3V0OiAzMDAwMCxcbiAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICBpZiAoZGF0YS5zdGF0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlEID0gZGF0YS51cGRhdGVJRDtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzdGF0aW9uczogZGF0YS5zdGF0aW9ucyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMucHJvcHMudXJsLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHN0YXRpb25zID0gW107XG4gICAgY29uc3QgYWN0aW9ucyA9IFtdO1xuICAgIGxldCBtZXNzYWdlQmFyID0gJyc7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5zZXJ2ZXJDb25uZWN0aW9uRXJyb3IpIHtcbiAgICAgIG1lc3NhZ2VCYXIgPSAoPGRpdiBjbGFzc05hbWU9XCJtZXNzYWdlX2JhclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lc3NhZ2VfYmFyLW1lc3NhZ2VcIj5cbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS13YXJuaW5nXCI+PC9pPiAgTm8gY29ubmVjdGlvbiB0byBzZXJ2ZXIuXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+KTtcbiAgICB9XG5cbiAgICB0aGlzLmdldFZpc2libGVTdGF0aW9ucygpLmZvckVhY2goKHN0YXRpb24pID0+IHN0YXRpb25zLnB1c2goXG4gICAgICA8U3RhdGlvblxuICAgICAgICBzdGF0aW9uPXtzdGF0aW9ufVxuICAgICAgICBrZXk9e3N0YXRpb24uaWR9XG4gICAgICAgIHNlbGVjdGVkPXt0aGlzLnN0YXRlLnNlbGVjdGlvbi5oYXMoc3RhdGlvbi5pZCl9XG4gICAgICAgIG9uQ2xpY2tTdGF0aW9uPXt0aGlzLnNlbGVjdFRvZ2dsZX1cbiAgICAgICAgb25PcGVuVGVybWluYWxMb2c9e3RoaXMuc2hvd1Rlcm1pbmFsTG9nfVxuICAgICAgLz5cbiAgICApKTtcblxuICAgIGNvbnN0IGNvdW50cyA9IHt9O1xuICAgIHRoaXMuc3RhdGUuc3RhdGlvbnMuZm9yRWFjaCgoc3RhdGlvbikgPT4ge1xuICAgICAgaWYgKCFjb3VudHMuaGFzT3duUHJvcGVydHkodGhpcy5kaXNwbGF5U3RhdGUoc3RhdGlvbi5zdGF0ZSkpKSB7XG4gICAgICAgIGNvdW50c1t0aGlzLmRpc3BsYXlTdGF0ZShzdGF0aW9uLnN0YXRlKV0gPSAwO1xuICAgICAgfVxuICAgICAgY291bnRzW3RoaXMuZGlzcGxheVN0YXRlKHN0YXRpb24uc3RhdGUpXSsrO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRDb3VudCA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uLnNpemU7XG4gICAgY29uc3QgYWxsU2VsZWN0ZWQgPSAoc2VsZWN0ZWRDb3VudCA9PT0gdGhpcy5zdGF0ZS5zdGF0aW9ucy5sZW5ndGgpO1xuICAgIGNvbnN0IHNlbGVjdEFsbENsYXNzZXMgPVxuICAgICAgYGJ0biBidG4tZGVmYXVsdCAke2FsbFNlbGVjdGVkID8gJyBkaXNhYmxlZCcgOiAnJ31gO1xuXG4gICAgY29uc3QgZGVzZWxlY3RBbGxDbGFzc2VzID1cbiAgICAgIGBidG4gYnRuLWRlZmF1bHQgJHtzZWxlY3RlZENvdW50ID09PSAwID8gJyBkaXNhYmxlZCcgOiAnJ31gO1xuXG4gICAgY29uc3Qgc3RhdGlvbldvcmQgPSBzZWxlY3RlZENvdW50ID09PSAxID8gJ3N0YXRpb24nIDogJ3N0YXRpb25zJztcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic3RhdGlvblN0YXRlRmlsdGVyXCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPEJ1dHRvbkZpbHRlclxuICAgICAgICAgIG9wdGlvbnM9e1snb24nLCAnb2ZmJywgJ2J1c3knLCAnZXJyb3InXX1cbiAgICAgICAgICBjb3VudHM9e2NvdW50c31cbiAgICAgICAgICBhbGxUZXh0PVwiQWxsIHN0YXRlc1wiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmlzaWJsZVN0YXRlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmlzaWJsZVN0YXRlOiBvcHRpb24gfSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInN0YXRpb25UeXBlRmlsdGVyXCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPEJ1dHRvbkZpbHRlclxuICAgICAgICAgIG9wdGlvbnM9e3RoaXMuZ2V0U3RhdGlvblR5cGVzKCl9XG4gICAgICAgICAgYWxsVGV4dD1cIkFsbCB0eXBlc1wiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmlzaWJsZVR5cGV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhvcHRpb24pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2aXNpYmxlVHlwZTogb3B0aW9uIH0pO1xuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzZWxlY3RlZENvdW50XCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZS1zZXBhcmF0b3JcIiA+PC9kaXY+XG4gICAgICAgIDxiPnt0aGlzLnN0YXRlLnNlbGVjdGlvbi5zaXplfSB7c3RhdGlvbldvcmR9IHNlbGVjdGVkPC9iPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdEFjdGlvbnNcIj5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtkZXNlbGVjdEFsbENsYXNzZXN9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLWFsbC1kZXNlbGVjdCcpfVxuICAgICAgICAgID5EZXNlbGVjdDwvYT4mbmJzcDtcbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzZWxlY3RBbGxDbGFzc2VzfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy12aXNpYmxlLXNlbGVjdCcpfVxuICAgICAgICAgID5TZWxlY3QgYWxsPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBjb25zdCBub1NlbGVjdGlvbkRpc2FibGUgPSAoc2VsZWN0ZWRDb3VudCA9PT0gMCA/ICcgZGlzYWJsZWQnIDogJycpO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzdGFydFN0b3BQYW5lbFwiIGNsYXNzTmFtZT17YGFjdGlvbi1wYW5lJHtub1NlbGVjdGlvbkRpc2FibGV9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmUtc2VwYXJhdG9yXCIgPjwvZGl2PlxuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tc3VjY2VzcyR7bm9TZWxlY3Rpb25EaXNhYmxlfWB9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy1zZWxlY3RlZC1zdGFydCcpfVxuICAgICAgICA+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGxheVwiIC8+Jm5ic3A7Jm5ic3A7U3RhcnQgU2VsZWN0ZWQ8L2E+XG4gICAgICAgICZuYnNwO1xuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tZGFuZ2VyJHtub1NlbGVjdGlvbkRpc2FibGV9YH1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLXNlbGVjdGVkLXN0b3AnKX1cbiAgICAgICAgPjxpIGNsYXNzTmFtZT1cImZhIGZhLXN0b3BcIiAvPiZuYnNwOyZuYnNwO1N0b3AgU2VsZWN0ZWQ8L2E+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgbGV0IHNlbGVjdGVkQXJlU2FtZVR5cGUgPSB0cnVlO1xuICAgIGxldCBsYXN0VHlwZSA9IG51bGw7XG4gICAgZm9yIChjb25zdCBzZWxlY3RlZElEIG9mIHRoaXMuc3RhdGUuc2VsZWN0aW9uKSB7XG4gICAgICBpZiAobGFzdFR5cGUgPT09IG51bGwpIHtcbiAgICAgICAgbGFzdFR5cGUgPSB0aGlzLmdldFN0YXRpb25TdGF0ZShzZWxlY3RlZElEKS50eXBlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZ2V0U3RhdGlvblN0YXRlKHNlbGVjdGVkSUQpLnR5cGUgIT09IGxhc3RUeXBlKSB7XG4gICAgICAgIHNlbGVjdGVkQXJlU2FtZVR5cGUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGFsbFNlbGVjdGVkT24gPSB0cnVlO1xuICAgIGZvciAoY29uc3Qgc2VsZWN0ZWRJRCBvZiB0aGlzLnN0YXRlLnNlbGVjdGlvbikge1xuICAgICAgaWYgKHRoaXMuZ2V0U3RhdGlvblN0YXRlKHNlbGVjdGVkSUQpLnN0YXRlICE9PSAnb24nKSB7XG4gICAgICAgIGFsbFNlbGVjdGVkT24gPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2FuQ2hhbmdlQXBwID0gKGFsbFNlbGVjdGVkT24gJiYgKHNlbGVjdGVkQ291bnQgPiAwKSAmJiBzZWxlY3RlZEFyZVNhbWVUeXBlKTtcblxuICAgIGxldCBhcHBsaWNhdGlvbnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0aW9uLmhhcyhzdGF0aW9uLmlkKSkge1xuICAgICAgICBhcHBsaWNhdGlvbnMgPSBzdGF0aW9uLnBvc3NpYmxlX2FwcHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJhcHBTZWxlY3RcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lLXNlcGFyYXRvclwiID48L2Rpdj5cbiAgICAgICAgPEFwcFNlbGVjdFxuICAgICAgICAgIGFwcGxpY2F0aW9ucz17Y2FuQ2hhbmdlQXBwID8gYXBwbGljYXRpb25zIDogW119XG4gICAgICAgICAgZGlzYWJsZWQ9eyFjYW5DaGFuZ2VBcHB9XG4gICAgICAgICAgYWxsb3dCbGFua1xuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmF0dGFjaENvbmZpcm1hdGlvbignQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGUgYXBwbGljYXRpb24/JyxcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQXBwU2VsZWN0ZWQpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic2hvd0xvZ1wiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmUtc2VwYXJhdG9yXCIgPjwvZGl2PlxuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiXG4gICAgICAgICAgaHJlZj1cIiNcIlxuICAgICAgICAgIG9uQ2xpY2s9eyhldikgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMubG9nVmlld2VyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRoaXMubG9nVmlld2VyLm9wZW5Nb2RhbCgpO1xuICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvbm90aWZpY2F0aW9ucycsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvZzogZGF0YS5ub3RpZmljYXRpb25zLnJldmVyc2UoKSB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH19XG4gICAgICAgID5TaG93IGxvZzwvYT5cbiAgICAgICAgJm5ic3A7XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3NOYW1lPXsnYnRuIGJ0bi1kZWZhdWx0J31cbiAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25zb2xlVmlld2VyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRoaXMuY29uc29sZVZpZXdlci5vcGVuTW9kYWwoKTtcbiAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL3NlcnZlci9vdXRwdXQnLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnR2xvYmFsIG91dHB1dCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVzOiBkYXRhLmxpbmVzLFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9fVxuICAgICAgICA+PGkgY2xhc3NOYW1lPVwiZmEgZmEtZGVza3RvcFwiPjwvaT4gR2xvYmFsIG91dHB1dDwvYT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e21lc3NhZ2VCYXIgIT09ICcnID8gJ3dpdGgtbWVzc2FnZV9iYXInIDogJyd9PlxuICAgICAgICB7bWVzc2FnZUJhcn1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNiBwYW5lLXN0YXRpb25zXCI+XG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJkYXNoYm9hcmRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwic3RhdGlvbkxpc3RcIiBjbGFzc05hbWU9XCJwYW5lbC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAge3N0YXRpb25zfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNiBwYW5lLWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgPGRpdiBpZD1cImRhc2hib2FyZEFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICB7YWN0aW9uc31cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxMb2dWaWV3ZXIgbG9nPXt0aGlzLnN0YXRlLmxvZ30gcmVmPXsoYykgPT4geyB0aGlzLmxvZ1ZpZXdlciA9IGM7IH19IC8+XG4gICAgICAgIDxDb25zb2xlVmlld2VyIGxpbmVzPXt0aGlzLnN0YXRlLmxpbmVzfSByZWY9eyhjKSA9PiB7IHRoaXMuY29uc29sZVZpZXdlciA9IGM7IH19IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkRhc2hib2FyZC5wcm9wVHlwZXMgPSB7XG4gIHVybDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ1ZpZXdlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGZvcm1hdFRpbWUoaXNvVGltZSkge1xuICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZShpc29UaW1lKTtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgeWVzdGVyZGF5ID0gbmV3IERhdGUoKTtcbiAgICB5ZXN0ZXJkYXkuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAxKTtcbiAgICBsZXQgZGF5ID0gJyc7XG5cbiAgICBpZiAodG9kYXkuZ2V0TW9udGgoKSA9PT0gdGltZS5nZXRNb250aCgpICYmXG4gICAgICB0b2RheS5nZXRGdWxsWWVhcigpID09PSB0aW1lLmdldEZ1bGxZZWFyKCkgJiZcbiAgICAgIHRvZGF5LmdldERhdGUoKSA9PT0gdGltZS5nZXREYXRlKCkpIHtcbiAgICAgIGRheSA9ICdUb2RheSc7XG4gICAgfSBlbHNlIGlmICh5ZXN0ZXJkYXkuZ2V0TW9udGgoKSA9PT0gdGltZS5nZXRNb250aCgpICYmXG4gICAgICB5ZXN0ZXJkYXkuZ2V0RnVsbFllYXIoKSA9PT0gdGltZS5nZXRGdWxsWWVhcigpICYmXG4gICAgICB5ZXN0ZXJkYXkuZ2V0RGF0ZSgpID09PSB0aW1lLmdldERhdGUoKSkge1xuICAgICAgZGF5ID0gJ1llc3RlcmRheSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRheSA9IGAke3RpbWUuZ2V0RnVsbFllYXIoKX0tJHt0aW1lLmdldE1vbnRoKCl9LSR7dGltZS5nZXREYXRlKCl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7ZGF5fSAke3RpbWUuZ2V0SG91cnMoKX06JHt0aW1lLmdldE1pbnV0ZXMoKX06JHt0aW1lLmdldFNlY29uZHMoKX1gO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5tb2RhbERJViA9IG51bGw7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsICgpID0+IHsgdGhpcy5oYW5kbGVSZXNpemUoKTsgfSk7XG4gICAgJCh0aGlzLm1vZGFsRElWKS5vbignc2hvdy5icy5tb2RhbCcsICgpID0+IHsgdGhpcy5oYW5kbGVSZXNpemUoKTsgfSk7XG4gIH1cblxuICBvcGVuTW9kYWwoKSB7XG4gICAgaWYgKHRoaXMubW9kYWxESVYgIT09IG51bGwpIHtcbiAgICAgICQodGhpcy5tb2RhbERJVikubW9kYWwoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVSZXNpemUoKSB7XG4gICAgY29uc3QgJG1vZGFsID0gJCh0aGlzLm1vZGFsRElWKTtcbiAgICBjb25zdCBtb2RhbEhlYWRlckhlaWdodCA9IDU2O1xuICAgIGNvbnN0IG1vZGFsTWFyZ2luID0gMzA7XG4gICAgY29uc3QgbW9kYWxCb3JkZXIgPSAxO1xuXG4gICAgY29uc3QgYm9keUhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIChtb2RhbEhlYWRlckhlaWdodCArIG1vZGFsTWFyZ2luICogMiArIG1vZGFsQm9yZGVyICogMik7XG4gICAgJG1vZGFsLmZpbmQoJy5tb2RhbC1ib2R5JykuY3NzKHsgbWF4SGVpZ2h0OiBib2R5SGVpZ2h0IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHJvd0NsYXNzZXMgPSB7XG4gICAgICBlcnJvcjogJ2RhbmdlcicsXG4gICAgICB3YXJuaW5nOiAnd2FybmluZycsXG4gICAgfTtcblxuICAgIGNvbnN0IGVudHJpZXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGxvZ0VudHJ5IG9mIHRoaXMucHJvcHMubG9nKSB7XG4gICAgICBjb25zdCByb3dDbGFzcyA9IHJvd0NsYXNzZXNbbG9nRW50cnkudHlwZV0gIT09IHVuZGVmaW5lZCA/IHJvd0NsYXNzZXNbbG9nRW50cnkudHlwZV0gOiAnJztcblxuICAgICAgZW50cmllcy5wdXNoKFxuICAgICAgICA8dHIga2V5PXtsb2dFbnRyeS5pZH0gY2xhc3NOYW1lPXtyb3dDbGFzc30+XG4gICAgICAgICAgPHRkPntMb2dWaWV3ZXIuZm9ybWF0VGltZShsb2dFbnRyeS50aW1lKX08L3RkPlxuICAgICAgICAgIDx0ZD57bG9nRW50cnkuc3RhdGlvbl9uYW1lfTwvdGQ+XG4gICAgICAgICAgPHRkPntsb2dFbnRyeS5tZXNzYWdlfTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGUgbG9nVmlld2VyLW1vZGFsXCIgdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiByZWY9eyhjKSA9PiB7IHRoaXMubW9kYWxESVYgPSBjOyB9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2cgbW9kYWwtbGdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+e3RoaXMucHJvcHMudGl0bGV9PC9oND5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1maXhlZCB0YWJsZS1jb25kZW5zZWRcIj5cbiAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5UaW1lPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlN0YXRpb248L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+TWVzc2FnZTwvdGg+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIHtlbnRyaWVzfVxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkxvZ1ZpZXdlci5wcm9wVHlwZXMgPSB7XG4gIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBsb2c6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICB0aW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgc3RhdGlvbl9pZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHN0YXRpb25fbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIG1lc3NhZ2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgfSlcbiAgKSxcbn07XG5cbkxvZ1ZpZXdlci5kZWZhdWx0UHJvcHMgPSB7XG4gIGxvZzogW10sXG4gIHRpdGxlOiAnRXZlbnQgTG9nJyxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4vZGFzaGJvYXJkLmpzeCc7XG5cbndpbmRvdy5kYXNoYm9hcmQgPSBudWxsO1xuXG4vLyBvblJlYWR5XG4kKCgpID0+IHtcbiAgd2luZG93LmRhc2hib2FyZCA9IFJlYWN0RE9NLnJlbmRlcihcbiAgICA8RGFzaGJvYXJkIHVybD1cIi9hcGkvc3RhdGlvbnNcIiAvPixcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGFzaGJvYXJkQ29udGFpbmVyJylcbiAgKTtcblxuICAvLyBJbnN0YWxsIGNsaWNrIGhhbmRsZXJzIGluIGV4dGVybmFsIG1lbnVzIGFuZCBidXR0b25zXG4gICQoJ1tkYXRhLWNvbW1hbmRdJykuZWFjaChmdW5jdGlvbiBzZXRDbGlja0hhbmRsZXIoKSB7XG4gICAgJCh0aGlzKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHdpbmRvdy5kYXNoYm9hcmQuZ2V0Q29tbWFuZCgkKHRoaXMpLmF0dHIoJ2RhdGEtY29tbWFuZCcpKSgpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRpb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlT3BlblRlcm1pbmFsTG9nID0gdGhpcy5oYW5kbGVPcGVuVGVybWluYWxMb2cuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKCkge1xuICAgIHRoaXMucHJvcHMub25DbGlja1N0YXRpb24odGhpcy5wcm9wcy5zdGF0aW9uLmlkKTtcbiAgfVxuXG4gIGhhbmRsZU9wZW5UZXJtaW5hbExvZyhldikge1xuICAgIHRoaXMucHJvcHMub25PcGVuVGVybWluYWxMb2codGhpcy5wcm9wcy5zdGF0aW9uLmlkKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHN0YXRpb25DbGFzc2VzID0gW1xuICAgICAgJ3N0YXRpb24nLFxuICAgICAgYHN0YXRpb24tc3RhdGUtJHt0aGlzLnByb3BzLnN0YXRpb24uc3RhdGV9YCxcbiAgICAgIGBzdGF0aW9uLXR5cGUtJHt0aGlzLnByb3BzLnN0YXRpb24udHlwZX1gLFxuICAgIF07XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZCkge1xuICAgICAgc3RhdGlvbkNsYXNzZXMucHVzaCgnc3RhdGlvbi1zZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXt0aGlzLnByb3BzLnN0YXRpb24uaWR9XG4gICAgICAgIGNsYXNzTmFtZT17c3RhdGlvbkNsYXNzZXMuam9pbignICcpfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tc3RhdGUtbGlnaHRcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLWljb25cIj5cbiAgICAgICAgICA8aW1nIGFsdD17dGhpcy5wcm9wcy5zdGF0aW9uLmFwcH0gc3JjPXt0aGlzLnByb3BzLnN0YXRpb24uaWNvbn0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1uYW1lXCI+e3RoaXMucHJvcHMuc3RhdGlvbi5uYW1lfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tdHlwZVwiPnt0aGlzLnByb3BzLnN0YXRpb24udHlwZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLWFwcFwiPnt0aGlzLnByb3BzLnN0YXRpb24uYXBwfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tc3RhdHVzXCI+e3RoaXMucHJvcHMuc3RhdGlvbi5zdGF0dXN9PC9kaXY+XG4gICAgICAgIDxhIGNsYXNzTmFtZT1cInN0YXRpb24tb3V0cHV0LWJ1dHRvblwiIG9uQ2xpY2s9eyhldikgPT4geyB0aGlzLmhhbmRsZU9wZW5UZXJtaW5hbExvZyhldik7IH19PlxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWRlc2t0b3BcIj48L2k+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuU3RhdGlvbi5wcm9wVHlwZXMgPSB7XG4gIHN0YXRpb246IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzdGF0ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN0YXR1czogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcHA6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWNvbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBvbkNsaWNrU3RhdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uT3BlblRlcm1pbmFsTG9nOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbn07XG4iXX0=
