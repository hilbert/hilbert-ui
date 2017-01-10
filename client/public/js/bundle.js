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
          url: '/api/stations',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwU2VsZWN0LmpzeCIsInNyYy9idXR0b25GaWx0ZXIuanN4Iiwic3JjL2NvbnNvbGVWaWV3ZXIuanN4Iiwic3JjL2Rhc2hib2FyZC5qc3giLCJzcmMvbG9nVmlld2VyLmpzeCIsInNyYy9tYWluLmpzeCIsInNyYy9zdGF0aW9uLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQUVBOzs7O0lBSXFCLFM7OztBQUVuQixxQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsc0hBQ1gsS0FEVzs7QUFFakIsVUFBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsVUFBSyxnQkFBTCxHQUF3QixNQUFLLGdCQUFMLENBQXNCLElBQXRCLE9BQXhCO0FBSGlCO0FBSWxCOzs7O3VDQUVrQjtBQUNqQixVQUFJLEtBQUssS0FBTCxDQUFXLFFBQWYsRUFBeUI7QUFDdkIsYUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixLQUFLLFdBQUwsQ0FBaUIsS0FBckM7QUFDRDtBQUNGOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFNLGVBQWUsRUFBckI7O0FBRUEsVUFBSSxLQUFLLEtBQUwsQ0FBVyxVQUFmLEVBQTJCO0FBQ3pCLHFCQUFhLElBQWIsQ0FDRTtBQUFBO0FBQUEsWUFBUSxLQUFJLE1BQVosRUFBbUIsT0FBTSxFQUF6QjtBQUFBO0FBQUEsU0FERjtBQUdEOztBQVBNO0FBQUE7QUFBQTs7QUFBQTtBQVNQLDZCQUEwQixLQUFLLEtBQUwsQ0FBVyxZQUFyQyw4SEFBbUQ7QUFBQSxjQUF4QyxXQUF3Qzs7QUFDakQsdUJBQWEsSUFBYixDQUNFO0FBQUE7QUFBQSxjQUFRLEtBQUssV0FBYixFQUEwQixPQUFPLFdBQWpDO0FBQStDO0FBQS9DLFdBREY7QUFHRDtBQWJNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBZVAsVUFBTSxnQkFBaUIsS0FBSyxLQUFMLENBQVcsUUFBWCxHQUFzQixXQUF0QixHQUFvQyxFQUEzRDs7QUFFQSxhQUNFO0FBQUE7QUFBQSxVQUFLLHlCQUF1QixhQUE1QjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsYUFBZjtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsZ0NBQWY7QUFDRTtBQUFBO0FBQUE7QUFDRSw0Q0FBMEIsYUFENUI7QUFFRSw4QkFBYyxLQUFLLEtBQUwsQ0FBVyxZQUFYLEdBQTBCLEtBQUssS0FBTCxDQUFXLFlBQXJDLEdBQW9ELEVBRnBFO0FBR0UscUJBQUssYUFBQyxHQUFELEVBQVM7QUFBRSx5QkFBSyxXQUFMLEdBQW1CLEdBQW5CO0FBQXlCO0FBSDNDO0FBS0c7QUFMSDtBQURGLFdBREY7QUFBQTtBQVdFO0FBQUE7QUFBQTtBQUNFLDZDQUE2QixhQUQvQjtBQUVFLHVCQUFTLEtBQUs7QUFGaEI7QUFBQTtBQUFBO0FBWEY7QUFERixPQURGO0FBb0JEOzs7O0VBbkRvQyxnQkFBTSxTOztrQkFBeEIsUzs7O0FBc0RyQixVQUFVLFNBQVYsR0FBc0I7QUFDcEIsZ0JBQWMsZ0JBQU0sU0FBTixDQUFnQixPQUFoQixDQUNaLGdCQUFNLFNBQU4sQ0FBZ0IsTUFESixDQURNO0FBSXBCLGdCQUFjLGdCQUFNLFNBQU4sQ0FBZ0IsTUFKVjtBQUtwQixjQUFZLGdCQUFNLFNBQU4sQ0FBZ0IsSUFMUjtBQU1wQixZQUFVLGdCQUFNLFNBQU4sQ0FBZ0IsSUFOTjtBQU9wQixZQUFVLGdCQUFNLFNBQU4sQ0FBZ0I7QUFQTixDQUF0Qjs7QUFVQSxVQUFVLFlBQVYsR0FBeUI7QUFDdkIsZ0JBQWMsRUFEUztBQUV2QixnQkFBYyxFQUZTO0FBR3ZCLGNBQVksS0FIVztBQUl2QixZQUFVLEtBSmE7QUFLdkIsWUFBVSxvQkFBTSxDQUFFO0FBTEssQ0FBekI7Ozs7Ozs7OztBQ3RFQTs7Ozs7O0FBRUEsSUFBTSxlQUFlLFNBQWYsWUFBZSxDQUFDLEtBQUQsRUFBVztBQUM5QixNQUFNLFVBQVUsRUFBaEI7O0FBRDhCO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsVUFHbkIsTUFIbUI7O0FBSTVCLFVBQU0sVUFBVSxDQUFDLEtBQUQsRUFBUSxhQUFSLDRCQUErQyxNQUEvQyxDQUFoQjtBQUNBLFVBQUksTUFBTSxLQUFOLEtBQWdCLE1BQXBCLEVBQTRCO0FBQzFCLGdCQUFRLElBQVIsQ0FBYSxRQUFiO0FBQ0Q7QUFDRCxVQUFJLFVBQVUsRUFBZDtBQUNBLFVBQUksVUFBVSxFQUFkO0FBQ0EsVUFBSSxNQUFNLE1BQU4sS0FBaUIsSUFBckIsRUFBMkI7QUFDekIsWUFBSSxRQUFRLENBQVo7QUFDQSxZQUFJLE1BQU0sTUFBTixDQUFhLGNBQWIsQ0FBNEIsTUFBNUIsS0FBdUMsTUFBTSxNQUFOLENBQWEsTUFBYixNQUF5QixDQUFwRSxFQUF1RTtBQUNyRSxrQkFBUSxNQUFNLE1BQU4sQ0FBYSxNQUFiLENBQVI7QUFDRDtBQUNELFlBQU0sMEJBQXVCLFVBQVUsQ0FBVixHQUFjLE9BQWQsR0FBd0IsV0FBL0MsQ0FBTjtBQUNBLGtCQUFXO0FBQUE7QUFBQSxZQUFNLFdBQVcsWUFBakI7QUFBZ0M7QUFBaEMsU0FBWDtBQUNBLGtCQUFVLEdBQVY7QUFDRDtBQUNELGNBQVEsSUFBUixDQUNFO0FBQUE7QUFBQTtBQUNFLGdCQUFLLEdBRFA7QUFFRSxxQkFBVyxRQUFRLElBQVIsQ0FBYSxHQUFiLENBRmI7QUFHRSxlQUFLLE1BSFA7QUFJRSxtQkFBUztBQUFBLG1CQUFNLE1BQU0sUUFBTixDQUFlLE1BQWYsQ0FBTjtBQUFBO0FBSlg7QUFLRSxjQUxGO0FBS1UsZUFMVjtBQUttQjtBQUxuQixPQURGO0FBbkI0Qjs7QUFHOUIseUJBQXFCLE1BQU0sT0FBM0IsOEhBQW9DO0FBQUE7QUF3Qm5DO0FBM0I2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQTZCOUIsTUFBTSxpQkFBaUIsQ0FBQyxLQUFELEVBQVEsYUFBUixDQUF2QjtBQUNBLE1BQUksTUFBTSxLQUFOLEtBQWdCLEVBQXBCLEVBQXdCO0FBQ3RCLG1CQUFlLElBQWYsQ0FBb0IsUUFBcEI7QUFDRDs7QUFFRCxTQUNFO0FBQUE7QUFBQSxNQUFLLFdBQVUsMkJBQWY7QUFDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLFdBQWY7QUFDRTtBQUFBO0FBQUE7QUFDRSxnQkFBSyxHQURQO0FBRUUscUJBQVcsZUFBZSxJQUFmLENBQW9CLEdBQXBCLENBRmI7QUFHRSxlQUFJLE1BSE47QUFJRSxtQkFBUztBQUFBLG1CQUFNLE1BQU0sUUFBTixDQUFlLEVBQWYsQ0FBTjtBQUFBO0FBSlg7QUFLRSxjQUFNO0FBTFI7QUFERixLQURGO0FBU0U7QUFBQTtBQUFBLFFBQUssV0FBVSxXQUFmO0FBQ0c7QUFESDtBQVRGLEdBREY7QUFlRCxDQWpERDs7QUFtREEsYUFBYSxTQUFiLEdBQXlCO0FBQ3ZCLFdBQVMsZ0JBQU0sU0FBTixDQUFnQixPQUFoQixDQUF3QixnQkFBTSxTQUFOLENBQWdCLE1BQXhDLENBRGM7QUFFdkIsVUFBUSxnQkFBTSxTQUFOLENBQWdCLFFBQWhCLENBQXlCLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBekMsQ0FGZTtBQUd2QixXQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsTUFIRjtBQUl2QixTQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsTUFKQTtBQUt2QixZQUFVLGdCQUFNLFNBQU4sQ0FBZ0I7QUFMSCxDQUF6Qjs7QUFRQSxhQUFhLFlBQWIsR0FBNEI7QUFDMUIsV0FBUyxFQURpQjtBQUUxQixVQUFRLElBRmtCO0FBRzFCLFdBQVMsS0FIaUI7QUFJMUIsU0FBTyxFQUptQjtBQUsxQixZQUFVLG9CQUFNLENBQUU7QUFMUSxDQUE1Qjs7a0JBUWUsWTs7Ozs7Ozs7Ozs7QUNyRWY7Ozs7Ozs7Ozs7OztJQUVxQixhOzs7QUFFbkIseUJBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDhIQUNYLEtBRFc7O0FBRWpCLFVBQUssUUFBTCxHQUFnQixJQUFoQjtBQUZpQjtBQUdsQjs7OztnQ0FFVztBQUNWLFVBQUksS0FBSyxRQUFMLEtBQWtCLElBQXRCLEVBQTRCO0FBQzFCLFVBQUUsS0FBSyxRQUFQLEVBQWlCLEtBQWpCO0FBQ0EsVUFBRSxLQUFLLFFBQVAsRUFBaUIsRUFBakIsQ0FBb0IsZ0JBQXBCLEVBQXNDLFlBQVc7QUFDL0MsY0FBTSxZQUFZLEVBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxhQUFiLEVBQTRCLEtBQTVCLEdBQW9DLENBQXBDLENBQWxCO0FBQ0Esb0JBQVUsU0FBVixHQUFzQixLQUFLLEdBQUwsQ0FBUyxVQUFVLFlBQW5CLEVBQWlDLFVBQVUsWUFBM0MsQ0FBdEI7QUFDRCxTQUhEO0FBSUQ7QUFDRjs7O3dDQUVtQjtBQUFBOztBQUNsQixRQUFFLE1BQUYsRUFBVSxFQUFWLENBQWEsUUFBYixFQUF1QixZQUFNO0FBQUUsZUFBSyxZQUFMO0FBQXNCLE9BQXJEO0FBQ0EsUUFBRSxLQUFLLFFBQVAsRUFBaUIsRUFBakIsQ0FBb0IsZUFBcEIsRUFBcUMsWUFBTTtBQUFFLGVBQUssWUFBTDtBQUFzQixPQUFuRTtBQUNEOzs7bUNBRWM7QUFDYixVQUFNLFNBQVMsRUFBRSxLQUFLLFFBQVAsQ0FBZjtBQUNBLFVBQU0sb0JBQW9CLEVBQTFCO0FBQ0EsVUFBTSxjQUFjLEVBQXBCO0FBQ0EsVUFBTSxjQUFjLENBQXBCOztBQUVBLFVBQU0sYUFBYSxPQUFPLFdBQVAsSUFBc0Isb0JBQW9CLGNBQWMsQ0FBbEMsR0FBc0MsY0FBYyxDQUExRSxDQUFuQjtBQUNBLGFBQU8sSUFBUCxDQUFZLGFBQVosRUFBMkIsR0FBM0IsQ0FBK0IsRUFBRSxXQUFXLFVBQWIsRUFBL0I7QUFDRDs7OzZCQUVRO0FBQUE7O0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGdDQUFmLEVBQWdELFVBQVMsSUFBekQsRUFBOEQsTUFBSyxRQUFuRSxFQUE0RSxLQUFLLGFBQUMsQ0FBRCxFQUFPO0FBQUUsbUJBQUssUUFBTCxHQUFnQixDQUFoQjtBQUFvQixXQUE5RztBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsdUJBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLGVBQWY7QUFDRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxjQUFmO0FBQ0U7QUFBQTtBQUFBLGtCQUFRLE1BQUssUUFBYixFQUFzQixXQUFVLE9BQWhDLEVBQXdDLGdCQUFhLE9BQXJEO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGLGVBREY7QUFJRTtBQUFBO0FBQUEsa0JBQUksV0FBVSxhQUFkO0FBQTZCLHFCQUFLLEtBQUwsQ0FBVztBQUF4QztBQUpGLGFBREY7QUFPRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxZQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQ0cscUJBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBc0IsSUFBdEI7QUFESDtBQURGO0FBUEY7QUFERjtBQURGLE9BREY7QUFtQkQ7Ozs7RUFwRHdDLGdCQUFNLFM7O2tCQUE1QixhOzs7QUF1RHJCLGNBQWMsU0FBZCxHQUEwQjtBQUN4QixTQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsTUFEQztBQUV4QixTQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsT0FBaEIsQ0FBd0IsZ0JBQU0sU0FBTixDQUFnQixNQUF4QztBQUZpQixDQUExQjs7QUFLQSxjQUFjLFlBQWQsR0FBNkI7QUFDM0IsU0FBTyxpQkFEb0I7QUFFM0IsU0FBTztBQUZvQixDQUE3Qjs7Ozs7Ozs7Ozs7QUM5REE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUIsUzs7O0FBRW5CLHFCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxzSEFDWCxLQURXOztBQUVqQixVQUFLLEtBQUwsR0FBYTtBQUNYLGdCQUFVLEVBREM7QUFFWCxpQkFBVyxJQUFJLEdBQUosRUFGQTtBQUdYLG1CQUFhLEVBSEY7QUFJWCxvQkFBYyxFQUpIO0FBS1gsV0FBSyxFQUxNO0FBTVgsNkJBQXVCO0FBTlosS0FBYjtBQVFBLFVBQUssWUFBTCxHQUFvQixNQUFLLFlBQUwsQ0FBa0IsSUFBbEIsT0FBcEI7QUFDQSxVQUFLLGlCQUFMLEdBQXlCLE1BQUssaUJBQUwsQ0FBdUIsSUFBdkIsT0FBekI7QUFDQSxVQUFLLGVBQUwsR0FBdUIsTUFBSyxlQUFMLENBQXFCLElBQXJCLE9BQXZCO0FBQ0EsVUFBSyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsVUFBSyxZQUFMO0FBQ0EsVUFBSyxVQUFMLEdBQWtCLE1BQUssVUFBTCxDQUFnQixJQUFoQixPQUFsQjtBQUNBLFVBQUssU0FBTCxHQUFpQixJQUFqQjtBQUNBLFVBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNBLFVBQUssUUFBTCxHQUFnQixDQUFoQjtBQUNBLFVBQUsscUJBQUwsR0FBNkIsQ0FBN0I7QUFuQmlCO0FBb0JsQjs7Ozt3Q0FFbUI7QUFDbEIsV0FBSyxRQUFMO0FBQ0Q7OztvQ0FFZSxTLEVBQVc7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDekIsNkJBQXNCLEtBQUssS0FBTCxDQUFXLFFBQWpDLDhIQUEyQztBQUFBLGNBQWhDLE9BQWdDOztBQUN6QyxjQUFJLFFBQVEsRUFBUixLQUFlLFNBQW5CLEVBQThCO0FBQzVCLG1CQUFPLE9BQVA7QUFDRDtBQUNGO0FBTHdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBTXpCLGFBQU8sSUFBUDtBQUNEOzs7c0NBRWlCO0FBQ2hCLFVBQU0sUUFBUSxJQUFJLEdBQUosRUFBZDtBQURnQjtBQUFBO0FBQUE7O0FBQUE7QUFFaEIsOEJBQXNCLEtBQUssS0FBTCxDQUFXLFFBQWpDLG1JQUEyQztBQUFBLGNBQWhDLE9BQWdDOztBQUN6QyxnQkFBTSxHQUFOLENBQVUsUUFBUSxJQUFsQjtBQUNEO0FBSmU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFNaEIsYUFBTyxNQUFNLElBQU4sQ0FBVyxLQUFYLENBQVA7QUFDRDs7OytCQUVVLFcsRUFBYTtBQUN0QixVQUFJLEtBQUssUUFBTCxDQUFjLFdBQWQsTUFBK0IsU0FBbkMsRUFBOEM7QUFDNUMsZUFBTyxLQUFLLFFBQUwsQ0FBYyxXQUFkLEVBQTJCLFVBQWxDO0FBQ0Q7QUFDRCxZQUFNLG1DQUFpQyxXQUFqQyxDQUFOO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBTSxTQUFTLEVBQWY7O0FBRG1CO0FBQUE7QUFBQTs7QUFBQTtBQUduQiw4QkFBc0IsS0FBSyxLQUFMLENBQVcsUUFBakMsbUlBQTJDO0FBQUEsY0FBaEMsT0FBZ0M7O0FBQ3pDLGNBQUksQ0FBQyxLQUFLLEtBQUwsQ0FBVyxXQUFYLEtBQTJCLEVBQTNCLElBQWlDLFFBQVEsSUFBUixLQUFpQixLQUFLLEtBQUwsQ0FBVyxXQUE5RCxNQUNDLEtBQUssS0FBTCxDQUFXLFlBQVgsS0FBNEIsRUFBNUIsSUFDQSxLQUFLLFlBQUwsQ0FBa0IsUUFBUSxLQUExQixNQUFxQyxLQUFLLEtBQUwsQ0FBVyxZQUZqRCxDQUFKLEVBRW9FO0FBQ2xFLG1CQUFPLElBQVAsQ0FBWSxPQUFaO0FBQ0Q7QUFDRjtBQVRrQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVduQixhQUFPLE1BQVA7QUFDRDs7O2lDQUVZLEssRUFBTztBQUNsQixVQUFJLFVBQVUsa0JBQVYsSUFDRixVQUFVLGNBRFIsSUFFRixVQUFVLFVBRlIsSUFHRixVQUFVLGVBSFosRUFHNkI7QUFDM0IsZUFBTyxNQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFQO0FBQ0Q7Ozt1Q0FFa0IsSSxFQUFNLFEsRUFBVTtBQUFBOztBQUNqQyxhQUFPLFlBQWE7QUFBQSwwQ0FBVCxJQUFTO0FBQVQsY0FBUztBQUFBOztBQUNsQixnQkFBUSxNQUFSLENBQWU7QUFDYixtQkFBUyxJQURJO0FBRWIsbUJBQVM7QUFDUCxxQkFBUztBQUNQLHFCQUFPLFNBREE7QUFFUCx5QkFBVyxhQUZKO0FBR1Asd0JBQVUsU0FBUyxJQUFULGlDQUF1QixJQUF2QjtBQUhILGFBREY7QUFNUCxvQkFBUTtBQUNOLHFCQUFPLFFBREQ7QUFFTix5QkFBVztBQUZMO0FBTkQ7QUFGSSxTQUFmO0FBY0QsT0FmRDtBQWdCRDs7O21DQUVjO0FBQ2IsV0FBSyxRQUFMLEdBQWdCO0FBQ2QsOEJBQXNCO0FBQ3BCLG9CQUFVLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsSUFBbkIsQ0FEVTtBQUVwQixpQkFBTyxvQkFGYTtBQUdwQixtQkFBUztBQUhXLFNBRFI7QUFNZCw2QkFBcUI7QUFDbkIsb0JBQVUsS0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixJQUFsQixDQURTO0FBRW5CLGlCQUFPLG1CQUZZO0FBR25CLG1CQUFTO0FBSFUsU0FOUDtBQVdkLCtCQUF1QjtBQUNyQixvQkFBVSxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CLElBQXBCLENBRFc7QUFFckIsaUJBQU8scUJBRmM7QUFHckIsbUJBQVM7QUFIWSxTQVhUO0FBZ0JkLGlDQUF5QjtBQUN2QixvQkFBVSxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsSUFBdEIsQ0FEYTtBQUV2QixpQkFBTyx1QkFGZ0I7QUFHdkIsbUJBQVM7QUFIYyxTQWhCWDtBQXFCZCxtQ0FBMkI7QUFDekIsb0JBQVUsS0FBSyxhQUFMLENBQW1CLElBQW5CLENBQXdCLElBQXhCLENBRGU7QUFFekIsaUJBQU8sNkJBRmtCO0FBR3pCLG1CQUFTO0FBSGdCLFNBckJiO0FBMEJkLGtDQUEwQjtBQUN4QixvQkFBVSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FEYztBQUV4QixpQkFBTyw0QkFGaUI7QUFHeEIsbUJBQVM7QUFIZSxTQTFCWjtBQStCZCxtQ0FBMkI7QUFDekIsb0JBQVUsS0FBSyxnQkFBTCxDQUFzQixJQUF0QixDQUEyQixJQUEzQixDQURlO0FBRXpCLGlCQUFPLHlCQUZrQjtBQUd6QixtQkFBUztBQUhnQjtBQS9CYixPQUFoQjs7QUFEYTtBQUFBO0FBQUE7O0FBQUE7QUF1Q2IsOEJBQW1CLE9BQU8sSUFBUCxDQUFZLEtBQUssUUFBakIsQ0FBbkIsbUlBQStDO0FBQUEsY0FBcEMsSUFBb0M7O0FBQzdDLGNBQU0sVUFBVSxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQWhCO0FBQ0EsY0FBSSxRQUFRLE9BQVosRUFBcUI7QUFDbkIsaUJBQUssUUFBTCxDQUFjLElBQWQsRUFBb0IsVUFBcEIsR0FBaUMsS0FBSyxrQkFBTCwrQkFDSCxRQUFRLEtBREwsUUFFL0IsUUFBUSxRQUZ1QixDQUFqQztBQUlELFdBTEQsTUFLTztBQUNMLGlCQUFLLFFBQUwsQ0FBYyxJQUFkLEVBQW9CLFVBQXBCLEdBQWlDLFFBQVEsUUFBekM7QUFDRDtBQUNGO0FBakRZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFrRGQ7OztvQ0FFZTtBQUNkLGFBQU8sS0FBSyxVQUFMLENBQWdCLEtBQUssS0FBTCxDQUFXLFFBQTNCLENBQVA7QUFDRDs7OytCQUVVLFEsRUFBVTtBQUNuQixVQUFNLE1BQU0sSUFBSSxHQUFKLEVBQVo7O0FBRG1CO0FBQUE7QUFBQTs7QUFBQTtBQUduQiw4QkFBc0IsUUFBdEIsbUlBQWdDO0FBQUEsY0FBckIsT0FBcUI7O0FBQzlCLGNBQUksR0FBSixDQUFRLFFBQVEsRUFBaEI7QUFDRDtBQUxrQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU9uQixhQUFPLEdBQVA7QUFDRDs7O2dDQUVXO0FBQ1YsV0FBSyxRQUFMLENBQWMsRUFBRSxXQUFXLEtBQUssYUFBTCxFQUFiLEVBQWQ7QUFDRDs7O3VDQUVrQjtBQUNqQixXQUFLLFFBQUwsQ0FBYyxFQUFFLFdBQVcsS0FBSyxVQUFMLENBQWdCLEtBQUssa0JBQUwsRUFBaEIsQ0FBYixFQUFkO0FBQ0Q7OztrQ0FFYTtBQUNaLFdBQUssUUFBTCxDQUFjLEVBQUUsV0FBVyxJQUFJLEdBQUosRUFBYixFQUFkO0FBQ0Q7OztpQ0FFWSxFLEVBQUk7QUFDZixVQUFJLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsR0FBckIsQ0FBeUIsRUFBekIsQ0FBSixFQUFrQztBQUNoQyxhQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLE1BQXJCLENBQTRCLEVBQTVCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixHQUFyQixDQUF5QixFQUF6QjtBQUNEO0FBQ0QsV0FBSyxRQUFMLENBQWMsRUFBRSxXQUFXLEtBQUssS0FBTCxDQUFXLFNBQXhCLEVBQWQ7QUFDRDs7O2lDQUVZLFUsRUFBWTtBQUN2QixRQUFFLElBQUYsQ0FBTztBQUNMLGFBQUssb0JBREE7QUFFTCxnQkFBUSxNQUZIO0FBR0wscUJBQWEsa0JBSFI7QUFJTCxjQUFNLEtBQUssU0FBTCxDQUFlO0FBQ25CLGVBQUssTUFBTSxJQUFOLENBQVcsVUFBWDtBQURjLFNBQWYsQ0FKRDtBQU9MLGtCQUFVLE1BUEw7QUFRTCxlQUFPLEtBUkY7QUFTTCxpQkFBUyxtQkFBTSxDQUFFLENBVFo7QUFVTCxlQUFPLGVBQUMsR0FBRCxFQUFNLE1BQU4sRUFBYyxHQUFkO0FBQUEsaUJBQXNCLFFBQVEsS0FBUixDQUFjLE1BQWQsRUFBc0IsSUFBSSxRQUFKLEVBQXRCLENBQXRCO0FBQUE7QUFWRixPQUFQO0FBWUQ7OzttQ0FFYztBQUNiLFdBQUssWUFBTCxDQUFrQixLQUFLLEtBQUwsQ0FBVyxTQUE3QjtBQUNBLFdBQUssV0FBTDtBQUNEOzs7OEJBRVM7QUFDUixhQUFPLEtBQUssWUFBTCxDQUFrQixLQUFLLGFBQUwsRUFBbEIsQ0FBUDtBQUNEOzs7a0NBRWEsVSxFQUFZO0FBQ3hCLFFBQUUsSUFBRixDQUFPO0FBQ0wsYUFBSyxxQkFEQTtBQUVMLGdCQUFRLE1BRkg7QUFHTCxxQkFBYSxrQkFIUjtBQUlMLGNBQU0sS0FBSyxTQUFMLENBQWU7QUFDbkIsZUFBSyxNQUFNLElBQU4sQ0FBVyxVQUFYO0FBRGMsU0FBZixDQUpEO0FBT0wsa0JBQVUsTUFQTDtBQVFMLGVBQU8sS0FSRjtBQVNMLGlCQUFTLG1CQUFNLENBQUUsQ0FUWjtBQVVMLGVBQU8sZUFBQyxHQUFELEVBQU0sTUFBTixFQUFjLEdBQWQ7QUFBQSxpQkFBc0IsUUFBUSxLQUFSLENBQWMsTUFBZCxFQUFzQixJQUFJLFFBQUosRUFBdEIsQ0FBdEI7QUFBQTtBQVZGLE9BQVA7QUFZRDs7O29DQUVlO0FBQ2QsV0FBSyxhQUFMLENBQW1CLEtBQUssS0FBTCxDQUFXLFNBQTlCO0FBQ0EsV0FBSyxXQUFMO0FBQ0Q7OzsrQkFFVTtBQUNULGFBQU8sS0FBSyxhQUFMLENBQW1CLEtBQUssYUFBTCxFQUFuQixDQUFQO0FBQ0Q7OztzQ0FFaUIsRyxFQUFLO0FBQ3JCLFFBQUUsSUFBRixDQUFPO0FBQ0wsYUFBSywwQkFEQTtBQUVMLGdCQUFRLE1BRkg7QUFHTCxxQkFBYSxrQkFIUjtBQUlMLGNBQU0sS0FBSyxTQUFMLENBQWU7QUFDbkIsZUFBSyxNQUFNLElBQU4sQ0FBVyxLQUFLLEtBQUwsQ0FBVyxTQUF0QixDQURjO0FBRW5CO0FBRm1CLFNBQWYsQ0FKRDtBQVFMLGtCQUFVLE1BUkw7QUFTTCxlQUFPLEtBVEY7QUFVTCxpQkFBUyxtQkFBTSxDQUFFLENBVlo7QUFXTCxlQUFPLGVBQUMsR0FBRCxFQUFNLE1BQU4sRUFBYyxHQUFkO0FBQUEsaUJBQXNCLFFBQVEsS0FBUixDQUFjLE1BQWQsRUFBc0IsSUFBSSxRQUFKLEVBQXRCLENBQXRCO0FBQUE7QUFYRixPQUFQO0FBYUEsV0FBSyxXQUFMO0FBQ0Q7OztvQ0FFZSxTLEVBQVc7QUFBQTs7QUFDekIsVUFBSSxLQUFLLGFBQUwsS0FBdUIsSUFBM0IsRUFBaUM7QUFDL0IsYUFBSyxhQUFMLENBQW1CLFNBQW5CO0FBQ0EsVUFBRSxJQUFGLENBQU87QUFDTCxpQ0FBcUIsU0FBckIsWUFESztBQUVMLGtCQUFRLEtBRkg7QUFHTCxvQkFBVSxNQUhMO0FBSUwsdUJBQWEsa0JBSlI7QUFLTCxpQkFBTyxLQUxGO0FBTUwsbUJBQVMsaUJBQUMsSUFBRCxFQUFVO0FBQ2pCLG1CQUFLLFFBQUwsQ0FBYztBQUNaLHFCQUFPLFNBREs7QUFFWixxQkFBTyxLQUFLO0FBRkEsYUFBZDtBQUlELFdBWEk7QUFZTCxpQkFBTyxlQUFDLEdBQUQsRUFBTSxNQUFOLEVBQWMsR0FBZDtBQUFBLG1CQUFzQixRQUFRLEtBQVIsQ0FBYyxNQUFkLEVBQXNCLElBQUksUUFBSixFQUF0QixDQUF0QjtBQUFBO0FBWkYsU0FBUDtBQWNEO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7K0JBT1c7QUFBQTs7QUFDVCxVQUFNLGNBQWMsR0FBcEI7QUFDQSxVQUFJLGdCQUFnQixXQUFwQjtBQUNBLFVBQU0sc0JBQXNCLENBQTVCO0FBQ0EsVUFBTSxtQkFBbUIsSUFBekI7O0FBRUEsVUFBTSxPQUFPLFNBQVAsSUFBTyxHQUFNO0FBQ2pCLGVBQUssVUFBTCxHQUFrQixJQUFsQixDQUF1QixZQUFNO0FBQzNCLHFCQUFXLElBQVgsRUFBaUIsV0FBakI7QUFDQSwwQkFBZ0IsV0FBaEI7QUFDQSxjQUFJLE9BQUssS0FBTCxDQUFXLHFCQUFmLEVBQXNDO0FBQ3BDLG1CQUFLLFFBQUwsQ0FBYyxFQUFFLHVCQUF1QixLQUF6QixFQUFkO0FBQ0Q7QUFDRCxpQkFBSyxxQkFBTCxHQUE2QixDQUE3QjtBQUNELFNBUEQsRUFPRyxLQVBILENBT1MsWUFBTTtBQUNiLHFCQUFXLElBQVgsRUFBaUIsYUFBakI7QUFDQSxjQUFJLGdCQUFnQixnQkFBcEIsRUFBc0M7QUFDcEMsNEJBQWdCLGdCQUFnQixtQkFBaEM7QUFDRDtBQUNELGlCQUFLLHFCQUFMO0FBQ0EsY0FBSSxPQUFLLHFCQUFMLEdBQTZCLENBQWpDLEVBQW9DO0FBQ2xDLG1CQUFLLFFBQUwsQ0FBYyxFQUFFLHVCQUF1QixJQUF6QixFQUFkO0FBQ0E7QUFDQTtBQUNBLG1CQUFLLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDRDtBQUNGLFNBbkJEO0FBb0JELE9BckJEO0FBc0JBO0FBQ0Q7OztpQ0FFWTtBQUFBOztBQUNYLGFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN0QyxVQUFFLElBQUYsQ0FBTztBQUNMLGVBQUssZUFEQTtBQUVMLGdCQUFNO0FBQ0osMEJBQWMsT0FBSztBQURmLFdBRkQ7QUFLTCxvQkFBVSxNQUxMO0FBTUwsaUJBQU8sS0FORjtBQU9MLG1CQUFTLEtBUEo7QUFRTCxtQkFBUyxpQkFBQyxJQUFELEVBQVU7QUFDakIsZ0JBQUksS0FBSyxRQUFMLEtBQWtCLFNBQXRCLEVBQWlDO0FBQy9CLHFCQUFLLFFBQUwsR0FBZ0IsS0FBSyxRQUFyQjtBQUNBLHFCQUFLLFFBQUwsQ0FBYyxFQUFFLFVBQVUsS0FBSyxRQUFqQixFQUFkO0FBQ0Q7QUFDRDtBQUNELFdBZEk7QUFlTCxpQkFBTyxlQUFDLEdBQUQsRUFBTSxNQUFOLEVBQWMsR0FBZCxFQUFzQjtBQUMzQixvQkFBUSxLQUFSLENBQWMsT0FBSyxLQUFMLENBQVcsR0FBekIsRUFBOEIsTUFBOUIsRUFBc0MsSUFBSSxRQUFKLEVBQXRDO0FBQ0E7QUFDRDtBQWxCSSxTQUFQO0FBb0JELE9BckJNLENBQVA7QUFzQkQ7Ozs2QkFFUTtBQUFBOztBQUNQLFVBQU0sV0FBVyxFQUFqQjtBQUNBLFVBQU0sVUFBVSxFQUFoQjtBQUNBLFVBQUksYUFBYSxFQUFqQjs7QUFFQSxVQUFJLEtBQUssS0FBTCxDQUFXLHFCQUFmLEVBQXNDO0FBQ3BDLHFCQUFjO0FBQUE7QUFBQSxZQUFLLFdBQVUsYUFBZjtBQUNaO0FBQUE7QUFBQSxjQUFLLFdBQVUscUJBQWY7QUFDRSxpREFBRyxXQUFVLGVBQWIsR0FERjtBQUFBO0FBQUE7QUFEWSxTQUFkO0FBS0Q7O0FBRUQsV0FBSyxrQkFBTCxHQUEwQixPQUExQixDQUFrQyxVQUFDLE9BQUQ7QUFBQSxlQUFhLFNBQVMsSUFBVCxDQUM3QztBQUNFLG1CQUFTLE9BRFg7QUFFRSxlQUFLLFFBQVEsRUFGZjtBQUdFLG9CQUFVLE9BQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsR0FBckIsQ0FBeUIsUUFBUSxFQUFqQyxDQUhaO0FBSUUsMEJBQWdCLE9BQUssWUFKdkI7QUFLRSw2QkFBbUIsT0FBSztBQUwxQixVQUQ2QyxDQUFiO0FBQUEsT0FBbEM7O0FBVUEsVUFBTSxTQUFTLEVBQWY7QUFDQSxXQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLE9BQXBCLENBQTRCLFVBQUMsT0FBRCxFQUFhO0FBQ3ZDLFlBQUksQ0FBQyxPQUFPLGNBQVAsQ0FBc0IsT0FBSyxZQUFMLENBQWtCLFFBQVEsS0FBMUIsQ0FBdEIsQ0FBTCxFQUE4RDtBQUM1RCxpQkFBTyxPQUFLLFlBQUwsQ0FBa0IsUUFBUSxLQUExQixDQUFQLElBQTJDLENBQTNDO0FBQ0Q7QUFDRCxlQUFPLE9BQUssWUFBTCxDQUFrQixRQUFRLEtBQTFCLENBQVA7QUFDRCxPQUxEOztBQU9BLFVBQU0sZ0JBQWdCLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsSUFBM0M7QUFDQSxVQUFNLGNBQWUsa0JBQWtCLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsTUFBM0Q7QUFDQSxVQUFNLHlDQUNlLGNBQWMsV0FBZCxHQUE0QixFQUQzQyxDQUFOOztBQUdBLFVBQU0sMkNBQ2Usa0JBQWtCLENBQWxCLEdBQXNCLFdBQXRCLEdBQW9DLEVBRG5ELENBQU47O0FBR0EsVUFBTSxjQUFjLGtCQUFrQixDQUFsQixHQUFzQixTQUF0QixHQUFrQyxVQUF0RDs7QUFFQSxjQUFRLElBQVIsQ0FDRTtBQUFBO0FBQUEsVUFBSyxLQUFJLG9CQUFULEVBQThCLFdBQVUsYUFBeEM7QUFDRTtBQUNFLG1CQUFTLENBQUMsSUFBRCxFQUFPLEtBQVAsRUFBYyxNQUFkLEVBQXNCLE9BQXRCLENBRFg7QUFFRSxrQkFBUSxNQUZWO0FBR0UsbUJBQVEsWUFIVjtBQUlFLGlCQUFPLEtBQUssS0FBTCxDQUFXLFlBSnBCO0FBS0Usb0JBQVUsa0JBQUMsTUFBRCxFQUFZO0FBQ3BCLG1CQUFLLFdBQUw7QUFDQSxtQkFBSyxRQUFMLENBQWMsRUFBRSxjQUFjLE1BQWhCLEVBQWQ7QUFDRDtBQVJIO0FBREYsT0FERjs7QUFlQSxjQUFRLElBQVIsQ0FDRTtBQUFBO0FBQUEsVUFBSyxLQUFJLG1CQUFULEVBQTZCLFdBQVUsYUFBdkM7QUFDRTtBQUNFLG1CQUFTLEtBQUssZUFBTCxFQURYO0FBRUUsbUJBQVEsV0FGVjtBQUdFLGlCQUFPLEtBQUssS0FBTCxDQUFXLFdBSHBCO0FBSUUsb0JBQVUsa0JBQUMsTUFBRCxFQUFZO0FBQ3BCLG1CQUFLLFdBQUw7QUFDQSxtQkFBSyxRQUFMLENBQWMsRUFBRSxhQUFhLE1BQWYsRUFBZDtBQUNEO0FBUEg7QUFERixPQURGOztBQWNBLGNBQVEsSUFBUixDQUNFO0FBQUE7QUFBQSxVQUFLLEtBQUksZUFBVCxFQUF5QixXQUFVLGFBQW5DO0FBQ0UsK0NBQUssV0FBVSx1QkFBZixHQURGO0FBRUU7QUFBQTtBQUFBO0FBQUksZUFBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixJQUF6QjtBQUFBO0FBQWdDLHFCQUFoQztBQUFBO0FBQUEsU0FGRjtBQUdFO0FBQUE7QUFBQSxZQUFLLFdBQVUsZUFBZjtBQUNFO0FBQUE7QUFBQTtBQUNFLHlCQUFXLGtCQURiO0FBRUUsdUJBQVMsS0FBSyxVQUFMLENBQWdCLHVCQUFoQjtBQUZYO0FBQUE7QUFBQSxXQURGO0FBQUE7QUFLRTtBQUFBO0FBQUE7QUFDRSx5QkFBVyxnQkFEYjtBQUVFLHVCQUFTLEtBQUssVUFBTCxDQUFnQix5QkFBaEI7QUFGWDtBQUFBO0FBQUE7QUFMRjtBQUhGLE9BREY7O0FBaUJBLFVBQU0scUJBQXNCLGtCQUFrQixDQUFsQixHQUFzQixXQUF0QixHQUFvQyxFQUFoRTs7QUFFQSxjQUFRLElBQVIsQ0FDRTtBQUFBO0FBQUEsVUFBSyxLQUFJLGdCQUFULEVBQTBCLDJCQUF5QixrQkFBbkQ7QUFDRSwrQ0FBSyxXQUFVLHVCQUFmLEdBREY7QUFFRTtBQUFBO0FBQUE7QUFDRSwyQ0FBNkIsa0JBRC9CO0FBRUUscUJBQVMsS0FBSyxVQUFMLENBQWdCLHlCQUFoQjtBQUZYO0FBR0MsK0NBQUcsV0FBVSxZQUFiLEdBSEQ7QUFBQTtBQUFBLFNBRkY7QUFBQTtBQU9FO0FBQUE7QUFBQTtBQUNFLDBDQUE0QixrQkFEOUI7QUFFRSxxQkFBUyxLQUFLLFVBQUwsQ0FBZ0Isd0JBQWhCO0FBRlg7QUFHQywrQ0FBRyxXQUFVLFlBQWIsR0FIRDtBQUFBO0FBQUE7QUFQRixPQURGOztBQWVBLFVBQUksc0JBQXNCLElBQTFCO0FBQ0EsVUFBSSxXQUFXLElBQWY7QUF6R087QUFBQTtBQUFBOztBQUFBO0FBMEdQLDhCQUF5QixLQUFLLEtBQUwsQ0FBVyxTQUFwQyxtSUFBK0M7QUFBQSxjQUFwQyxVQUFvQzs7QUFDN0MsY0FBSSxhQUFhLElBQWpCLEVBQXVCO0FBQ3JCLHVCQUFXLEtBQUssZUFBTCxDQUFxQixVQUFyQixFQUFpQyxJQUE1QztBQUNEO0FBQ0QsY0FBSSxLQUFLLGVBQUwsQ0FBcUIsVUFBckIsRUFBaUMsSUFBakMsS0FBMEMsUUFBOUMsRUFBd0Q7QUFDdEQsa0NBQXNCLEtBQXRCO0FBQ0E7QUFDRDtBQUNGO0FBbEhNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBb0hQLFVBQUksZ0JBQWdCLElBQXBCO0FBcEhPO0FBQUE7QUFBQTs7QUFBQTtBQXFIUCw4QkFBeUIsS0FBSyxLQUFMLENBQVcsU0FBcEMsbUlBQStDO0FBQUEsY0FBcEMsV0FBb0M7O0FBQzdDLGNBQUksS0FBSyxlQUFMLENBQXFCLFdBQXJCLEVBQWlDLEtBQWpDLEtBQTJDLElBQS9DLEVBQXFEO0FBQ25ELDRCQUFnQixLQUFoQjtBQUNBO0FBQ0Q7QUFDRjtBQTFITTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQTRIUCxVQUFNLGVBQWdCLGlCQUFrQixnQkFBZ0IsQ0FBbEMsSUFBd0MsbUJBQTlEOztBQUVBLFVBQUksZUFBZSxFQUFuQjtBQTlITztBQUFBO0FBQUE7O0FBQUE7QUErSFAsOEJBQXNCLEtBQUssS0FBTCxDQUFXLFFBQWpDLG1JQUEyQztBQUFBLGNBQWhDLE9BQWdDOztBQUN6QyxjQUFJLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsR0FBckIsQ0FBeUIsUUFBUSxFQUFqQyxDQUFKLEVBQTBDO0FBQ3hDLDJCQUFlLFFBQVEsYUFBdkI7QUFDRDtBQUNGO0FBbklNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBcUlQLGNBQVEsSUFBUixDQUNFO0FBQUE7QUFBQSxVQUFLLEtBQUksV0FBVCxFQUFxQixXQUFVLGFBQS9CO0FBQ0UsK0NBQUssV0FBVSx1QkFBZixHQURGO0FBRUU7QUFDRSx3QkFBYyxlQUFlLFlBQWYsR0FBOEIsRUFEOUM7QUFFRSxvQkFBVSxDQUFDLFlBRmI7QUFHRSwwQkFIRjtBQUlFLG9CQUFVLEtBQUssa0JBQUwsQ0FBd0Isa0RBQXhCLEVBQ1IsS0FBSyxpQkFERztBQUpaO0FBRkYsT0FERjs7QUFhQSxjQUFRLElBQVIsQ0FDRTtBQUFBO0FBQUEsVUFBSyxLQUFJLFNBQVQsRUFBbUIsV0FBVSxhQUE3QjtBQUNFLCtDQUFLLFdBQVUsdUJBQWYsR0FERjtBQUVFO0FBQUE7QUFBQTtBQUNFLHVCQUFVLGlCQURaO0FBRUUsa0JBQUssR0FGUDtBQUdFLHFCQUFTLGlCQUFDLEVBQUQsRUFBUTtBQUNmLGtCQUFJLE9BQUssU0FBTCxLQUFtQixJQUF2QixFQUE2QjtBQUMzQix1QkFBSyxTQUFMLENBQWUsU0FBZjtBQUNBLGtCQUFFLElBQUYsQ0FBTztBQUNMLHVCQUFLLG9CQURBO0FBRUwsMEJBQVEsS0FGSDtBQUdMLCtCQUFhLGtCQUhSO0FBSUwseUJBQU8sS0FKRjtBQUtMLDJCQUFTLGlCQUFDLElBQUQsRUFBVTtBQUNqQiwyQkFBSyxRQUFMLENBQWMsRUFBRSxLQUFLLEtBQUssYUFBTCxDQUFtQixPQUFuQixFQUFQLEVBQWQ7QUFDRCxtQkFQSTtBQVFMLHlCQUFPLGVBQUMsR0FBRCxFQUFNLE1BQU4sRUFBYyxHQUFkO0FBQUEsMkJBQXNCLFFBQVEsS0FBUixDQUFjLE1BQWQsRUFBc0IsSUFBSSxRQUFKLEVBQXRCLENBQXRCO0FBQUE7QUFSRixpQkFBUDtBQVVEO0FBQ0QsaUJBQUcsY0FBSDtBQUNEO0FBbEJIO0FBQUE7QUFBQSxTQUZGO0FBQUE7QUF1QkU7QUFBQTtBQUFBO0FBQ0UsdUJBQVcsaUJBRGI7QUFFRSxrQkFBSyxHQUZQO0FBR0UscUJBQVMsaUJBQUMsRUFBRCxFQUFRO0FBQ2Ysa0JBQUksT0FBSyxhQUFMLEtBQXVCLElBQTNCLEVBQWlDO0FBQy9CLHVCQUFLLGFBQUwsQ0FBbUIsU0FBbkI7QUFDQSxrQkFBRSxJQUFGLENBQU87QUFDTCx1QkFBSyxvQkFEQTtBQUVMLDBCQUFRLEtBRkg7QUFHTCw0QkFBVSxNQUhMO0FBSUwsK0JBQWEsa0JBSlI7QUFLTCx5QkFBTyxLQUxGO0FBTUwsMkJBQVMsaUJBQUMsSUFBRCxFQUFVO0FBQ2pCLDJCQUFLLFFBQUwsQ0FBYztBQUNaLDZCQUFPLGVBREs7QUFFWiw2QkFBTyxLQUFLO0FBRkEscUJBQWQ7QUFJRCxtQkFYSTtBQVlMLHlCQUFPLGVBQUMsR0FBRCxFQUFNLE1BQU4sRUFBYyxHQUFkO0FBQUEsMkJBQXNCLFFBQVEsS0FBUixDQUFjLE1BQWQsRUFBc0IsSUFBSSxRQUFKLEVBQXRCLENBQXRCO0FBQUE7QUFaRixpQkFBUDtBQWNEO0FBQ0QsaUJBQUcsY0FBSDtBQUNEO0FBdEJIO0FBdUJDLCtDQUFHLFdBQVUsZUFBYixHQXZCRDtBQUFBO0FBQUE7QUF2QkYsT0FERjs7QUFtREEsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFXLGVBQWUsRUFBZixHQUFvQixrQkFBcEIsR0FBeUMsRUFBekQ7QUFDRyxrQkFESDtBQUVFO0FBQUE7QUFBQSxZQUFLLFdBQVUsaUJBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLEtBQWY7QUFDRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSx3QkFBZjtBQUNFO0FBQUE7QUFBQSxrQkFBSyxJQUFHLFdBQVI7QUFDRTtBQUFBO0FBQUEsb0JBQUssSUFBRyxhQUFSLEVBQXNCLFdBQVUsYUFBaEM7QUFDRztBQURIO0FBREY7QUFERixhQURGO0FBUUU7QUFBQTtBQUFBLGdCQUFLLFdBQVUsdUJBQWY7QUFDRTtBQUFBO0FBQUEsa0JBQUssSUFBRyxrQkFBUjtBQUNHO0FBREg7QUFERjtBQVJGO0FBREYsU0FGRjtBQWtCRSw2REFBVyxLQUFLLEtBQUssS0FBTCxDQUFXLEdBQTNCLEVBQWdDLEtBQUssYUFBQyxDQUFELEVBQU87QUFBRSxtQkFBSyxTQUFMLEdBQWlCLENBQWpCO0FBQXFCLFdBQW5FLEdBbEJGO0FBbUJFLGlFQUFlLE9BQU8sS0FBSyxLQUFMLENBQVcsS0FBakMsRUFBd0MsS0FBSyxhQUFDLENBQUQsRUFBTztBQUFFLG1CQUFLLGFBQUwsR0FBcUIsQ0FBckI7QUFBeUIsV0FBL0U7QUFuQkYsT0FERjtBQXVCRDs7OztFQXhpQm9DLGdCQUFNLFM7O2tCQUF4QixTOzs7QUEyaUJyQixVQUFVLFNBQVYsR0FBc0I7QUFDcEIsT0FBSyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCO0FBRFIsQ0FBdEI7Ozs7Ozs7Ozs7O0FDbGpCQTs7Ozs7Ozs7Ozs7O0lBRXFCLFM7Ozs7OytCQUVELE8sRUFBUztBQUN6QixVQUFNLE9BQU8sSUFBSSxJQUFKLENBQVMsT0FBVCxDQUFiO0FBQ0EsVUFBTSxRQUFRLElBQUksSUFBSixFQUFkO0FBQ0EsVUFBTSxZQUFZLElBQUksSUFBSixFQUFsQjtBQUNBLGdCQUFVLE9BQVYsQ0FBa0IsTUFBTSxPQUFOLEtBQWtCLENBQXBDO0FBQ0EsVUFBSSxNQUFNLEVBQVY7O0FBRUEsVUFBSSxNQUFNLFFBQU4sT0FBcUIsS0FBSyxRQUFMLEVBQXJCLElBQ0YsTUFBTSxXQUFOLE9BQXdCLEtBQUssV0FBTCxFQUR0QixJQUVGLE1BQU0sT0FBTixPQUFvQixLQUFLLE9BQUwsRUFGdEIsRUFFc0M7QUFDcEMsY0FBTSxPQUFOO0FBQ0QsT0FKRCxNQUlPLElBQUksVUFBVSxRQUFWLE9BQXlCLEtBQUssUUFBTCxFQUF6QixJQUNULFVBQVUsV0FBVixPQUE0QixLQUFLLFdBQUwsRUFEbkIsSUFFVCxVQUFVLE9BQVYsT0FBd0IsS0FBSyxPQUFMLEVBRm5CLEVBRW1DO0FBQ3hDLGNBQU0sV0FBTjtBQUNELE9BSk0sTUFJQTtBQUNMLGNBQVMsS0FBSyxXQUFMLEVBQVQsU0FBK0IsS0FBSyxRQUFMLEVBQS9CLFNBQWtELEtBQUssT0FBTCxFQUFsRDtBQUNEOztBQUVELGFBQVUsR0FBVixTQUFpQixLQUFLLFFBQUwsRUFBakIsU0FBb0MsS0FBSyxVQUFMLEVBQXBDLFNBQXlELEtBQUssVUFBTCxFQUF6RDtBQUNEOzs7QUFFRCxxQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsc0hBQ1gsS0FEVzs7QUFFakIsVUFBSyxRQUFMLEdBQWdCLElBQWhCO0FBRmlCO0FBR2xCOzs7O3dDQUVtQjtBQUFBOztBQUNsQixRQUFFLE1BQUYsRUFBVSxFQUFWLENBQWEsUUFBYixFQUF1QixZQUFNO0FBQUUsZUFBSyxZQUFMO0FBQXNCLE9BQXJEO0FBQ0EsUUFBRSxLQUFLLFFBQVAsRUFBaUIsRUFBakIsQ0FBb0IsZUFBcEIsRUFBcUMsWUFBTTtBQUFFLGVBQUssWUFBTDtBQUFzQixPQUFuRTtBQUNEOzs7Z0NBRVc7QUFDVixVQUFJLEtBQUssUUFBTCxLQUFrQixJQUF0QixFQUE0QjtBQUMxQixVQUFFLEtBQUssUUFBUCxFQUFpQixLQUFqQjtBQUNEO0FBQ0Y7OzttQ0FFYztBQUNiLFVBQU0sU0FBUyxFQUFFLEtBQUssUUFBUCxDQUFmO0FBQ0EsVUFBTSxvQkFBb0IsRUFBMUI7QUFDQSxVQUFNLGNBQWMsRUFBcEI7QUFDQSxVQUFNLGNBQWMsQ0FBcEI7O0FBRUEsVUFBTSxhQUFhLE9BQU8sV0FBUCxJQUFzQixvQkFBb0IsY0FBYyxDQUFsQyxHQUFzQyxjQUFjLENBQTFFLENBQW5CO0FBQ0EsYUFBTyxJQUFQLENBQVksYUFBWixFQUEyQixHQUEzQixDQUErQixFQUFFLFdBQVcsVUFBYixFQUEvQjtBQUNEOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFNLGFBQWE7QUFDakIsZUFBTyxRQURVO0FBRWpCLGlCQUFTO0FBRlEsT0FBbkI7O0FBS0EsVUFBTSxVQUFVLEVBQWhCO0FBTk87QUFBQTtBQUFBOztBQUFBO0FBT1AsNkJBQXVCLEtBQUssS0FBTCxDQUFXLEdBQWxDLDhIQUF1QztBQUFBLGNBQTVCLFFBQTRCOztBQUNyQyxjQUFNLFdBQVcsV0FBVyxTQUFTLElBQXBCLE1BQThCLFNBQTlCLEdBQTBDLFdBQVcsU0FBUyxJQUFwQixDQUExQyxHQUFzRSxFQUF2Rjs7QUFFQSxrQkFBUSxJQUFSLENBQ0U7QUFBQTtBQUFBLGNBQUksS0FBSyxTQUFTLEVBQWxCLEVBQXNCLFdBQVcsUUFBakM7QUFDRTtBQUFBO0FBQUE7QUFBSyx3QkFBVSxVQUFWLENBQXFCLFNBQVMsSUFBOUI7QUFBTCxhQURGO0FBRUU7QUFBQTtBQUFBO0FBQUssdUJBQVM7QUFBZCxhQUZGO0FBR0U7QUFBQTtBQUFBO0FBQUssdUJBQVM7QUFBZDtBQUhGLFdBREY7QUFPRDtBQWpCTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQW1CUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsNEJBQWYsRUFBNEMsVUFBUyxJQUFyRCxFQUEwRCxNQUFLLFFBQS9ELEVBQXdFLEtBQUssYUFBQyxDQUFELEVBQU87QUFBRSxtQkFBSyxRQUFMLEdBQWdCLENBQWhCO0FBQW9CLFdBQTFHO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSx1QkFBZjtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsZUFBZjtBQUNFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLGNBQWY7QUFDRTtBQUFBO0FBQUEsa0JBQVEsTUFBSyxRQUFiLEVBQXNCLFdBQVUsT0FBaEMsRUFBd0MsZ0JBQWEsT0FBckQ7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREYsZUFERjtBQUlFO0FBQUE7QUFBQSxrQkFBSSxXQUFVLGFBQWQ7QUFBNkIscUJBQUssS0FBTCxDQUFXO0FBQXhDO0FBSkYsYUFERjtBQU9FO0FBQUE7QUFBQSxnQkFBSyxXQUFVLFlBQWY7QUFDRTtBQUFBO0FBQUEsa0JBQU8sV0FBVSxtQ0FBakI7QUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFGRjtBQUdFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFIRjtBQURGLGlCQURGO0FBUUU7QUFBQTtBQUFBO0FBQ0M7QUFERDtBQVJGO0FBREY7QUFQRjtBQURGO0FBREYsT0FERjtBQTRCRDs7OztFQWpHb0MsZ0JBQU0sUzs7a0JBQXhCLFM7OztBQW9HckIsVUFBVSxTQUFWLEdBQXNCO0FBQ3BCLFNBQU8sZ0JBQU0sU0FBTixDQUFnQixNQURIO0FBRXBCLE9BQUssZ0JBQU0sU0FBTixDQUFnQixPQUFoQixDQUNILGdCQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0I7QUFDcEIsUUFBSSxnQkFBTSxTQUFOLENBQWdCLE1BREE7QUFFcEIsVUFBTSxnQkFBTSxTQUFOLENBQWdCLE1BRkY7QUFHcEIsVUFBTSxnQkFBTSxTQUFOLENBQWdCLE1BSEY7QUFJcEIsZ0JBQVksZ0JBQU0sU0FBTixDQUFnQixNQUpSO0FBS3BCLGtCQUFjLGdCQUFNLFNBQU4sQ0FBZ0IsTUFMVjtBQU1wQixhQUFTLGdCQUFNLFNBQU4sQ0FBZ0I7QUFOTCxHQUF0QixDQURHO0FBRmUsQ0FBdEI7O0FBY0EsVUFBVSxZQUFWLEdBQXlCO0FBQ3ZCLE9BQUssRUFEa0I7QUFFdkIsU0FBTztBQUZnQixDQUF6Qjs7Ozs7QUNwSEE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxPQUFPLFNBQVAsR0FBbUIsSUFBbkI7O0FBRUE7QUFDQSxFQUFFLFlBQU07QUFDTixTQUFPLFNBQVAsR0FBbUIsbUJBQVMsTUFBVCxDQUNqQixxREFBVyxLQUFJLGVBQWYsR0FEaUIsRUFFakIsU0FBUyxjQUFULENBQXdCLG9CQUF4QixDQUZpQixDQUFuQjs7QUFLQTtBQUNBLElBQUUsZ0JBQUYsRUFBb0IsSUFBcEIsQ0FBeUIsU0FBUyxlQUFULEdBQTJCO0FBQUE7O0FBQ2xELE1BQUUsSUFBRixFQUFRLEVBQVIsQ0FBVyxPQUFYLEVBQW9CLFVBQUMsRUFBRCxFQUFRO0FBQzFCLGFBQU8sU0FBUCxDQUFpQixVQUFqQixDQUE0QixTQUFRLElBQVIsQ0FBYSxjQUFiLENBQTVCO0FBQ0EsU0FBRyxjQUFIO0FBQ0QsS0FIRDtBQUlELEdBTEQ7QUFNRCxDQWJEOzs7Ozs7Ozs7OztBQ1BBOzs7Ozs7Ozs7Ozs7SUFFcUIsTzs7O0FBQ25CLG1CQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxrSEFDWCxLQURXOztBQUVqQixVQUFLLFdBQUwsR0FBbUIsTUFBSyxXQUFMLENBQWlCLElBQWpCLE9BQW5CO0FBQ0EsVUFBSyxxQkFBTCxHQUE2QixNQUFLLHFCQUFMLENBQTJCLElBQTNCLE9BQTdCO0FBSGlCO0FBSWxCOzs7O2tDQUVhO0FBQ1osV0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEVBQTdDO0FBQ0Q7OzswQ0FFcUIsRSxFQUFJO0FBQ3hCLFdBQUssS0FBTCxDQUFXLGlCQUFYLENBQTZCLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsRUFBaEQ7QUFDQSxTQUFHLGNBQUg7QUFDQSxTQUFHLGVBQUg7QUFDRDs7OzZCQUVRO0FBQUE7O0FBQ1AsVUFBTSxpQkFBaUIsQ0FDckIsU0FEcUIscUJBRUosS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixLQUZmLG9CQUdMLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsSUFIZCxDQUF2Qjs7QUFNQSxVQUFJLEtBQUssS0FBTCxDQUFXLFFBQWYsRUFBeUI7QUFDdkIsdUJBQWUsSUFBZixDQUFvQixrQkFBcEI7QUFDRDs7QUFFRCxhQUNFO0FBQUE7QUFBQTtBQUNFLGNBQUksS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixFQUR6QjtBQUVFLHFCQUFXLGVBQWUsSUFBZixDQUFvQixHQUFwQixDQUZiO0FBR0UsbUJBQVMsS0FBSztBQUhoQjtBQUtFLCtDQUFLLFdBQVUscUJBQWYsR0FMRjtBQU1FO0FBQUE7QUFBQSxZQUFLLFdBQVUsY0FBZjtBQUNFLGlEQUFLLEtBQUssS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixHQUE3QixFQUFrQyxLQUFLLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsSUFBMUQ7QUFERixTQU5GO0FBU0U7QUFBQTtBQUFBLFlBQUssV0FBVSxjQUFmO0FBQStCLGVBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUI7QUFBbEQsU0FURjtBQVVFO0FBQUE7QUFBQSxZQUFLLFdBQVUsY0FBZjtBQUErQixlQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CO0FBQWxELFNBVkY7QUFXRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGFBQWY7QUFBOEIsZUFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQjtBQUFqRCxTQVhGO0FBWUU7QUFBQTtBQUFBLFlBQUssV0FBVSxnQkFBZjtBQUFpQyxlQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CO0FBQXBELFNBWkY7QUFhRTtBQUFBO0FBQUEsWUFBRyxXQUFVLHVCQUFiLEVBQXFDLFNBQVMsaUJBQUMsRUFBRCxFQUFRO0FBQUUscUJBQUsscUJBQUwsQ0FBMkIsRUFBM0I7QUFBaUMsYUFBekY7QUFDRSwrQ0FBRyxXQUFVLGVBQWI7QUFERjtBQWJGLE9BREY7QUFtQkQ7Ozs7RUEvQ2tDLGdCQUFNLFM7O2tCQUF0QixPOzs7QUFrRHJCLFFBQVEsU0FBUixHQUFvQjtBQUNsQixXQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0I7QUFDN0IsUUFBSSxnQkFBTSxTQUFOLENBQWdCLE1BRFM7QUFFN0IsVUFBTSxnQkFBTSxTQUFOLENBQWdCLE1BRk87QUFHN0IsV0FBTyxnQkFBTSxTQUFOLENBQWdCLE1BSE07QUFJN0IsVUFBTSxnQkFBTSxTQUFOLENBQWdCLE1BSk87QUFLN0IsWUFBUSxnQkFBTSxTQUFOLENBQWdCLE1BTEs7QUFNN0IsU0FBSyxnQkFBTSxTQUFOLENBQWdCLE1BTlE7QUFPN0IsVUFBTSxnQkFBTSxTQUFOLENBQWdCO0FBUE8sR0FBdEIsRUFRTixVQVRlO0FBVWxCLFlBQVUsZ0JBQU0sU0FBTixDQUFnQixJQVZSO0FBV2xCLGtCQUFnQixnQkFBTSxTQUFOLENBQWdCLElBWGQ7QUFZbEIscUJBQW1CLGdCQUFNLFNBQU4sQ0FBZ0I7QUFaakIsQ0FBcEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuLyoqXG4gKiBBcHBTZWxlY3QgY29tcG9uZW50XG4gKiBBbGxvd3MgdGhlIHVzZXIgdG8gc2VsZWN0IGFuIGFwcGxpY2F0aW9uIGZyb20gYSBsaXN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcFNlbGVjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5hcHBTZWxlY3RvciA9IG51bGw7XG4gICAgdGhpcy5jbGlja2VkQ2hhbmdlQXBwID0gdGhpcy5jbGlja2VkQ2hhbmdlQXBwLmJpbmQodGhpcyk7XG4gIH1cblxuICBjbGlja2VkQ2hhbmdlQXBwKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMuYXBwU2VsZWN0b3IudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBhcHBsaWNhdGlvbnMgPSBbXTtcblxuICAgIGlmICh0aGlzLnByb3BzLmFsbG93QmxhbmspIHtcbiAgICAgIGFwcGxpY2F0aW9ucy5wdXNoKFxuICAgICAgICA8b3B0aW9uIGtleT1cIm51bGxcIiB2YWx1ZT1cIlwiPiZuYnNwOzwvb3B0aW9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGFwcGxpY2F0aW9uIG9mIHRoaXMucHJvcHMuYXBwbGljYXRpb25zKSB7XG4gICAgICBhcHBsaWNhdGlvbnMucHVzaChcbiAgICAgICAgPG9wdGlvbiBrZXk9e2FwcGxpY2F0aW9ufSB2YWx1ZT17YXBwbGljYXRpb259PnthcHBsaWNhdGlvbn08L29wdGlvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgZGlzYWJsZWRDbGFzcyA9ICh0aGlzLnByb3BzLmRpc2FibGVkID8gJyBkaXNhYmxlZCcgOiAnJyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BhcHBTZWxlY3Qke2Rpc2FibGVkQ2xhc3N9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1pbmxpbmVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgZm9ybS1ncm91cC1taW53aWR0aFwiPlxuICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb3JtLWNvbnRyb2wke2Rpc2FibGVkQ2xhc3N9YH1cbiAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSA/IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlIDogJyd9XG4gICAgICAgICAgICAgIHJlZj17KHNlbCkgPT4geyB0aGlzLmFwcFNlbGVjdG9yID0gc2VsOyB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7YXBwbGljYXRpb25zfVxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgJm5ic3A7XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4td2FybmluZyR7ZGlzYWJsZWRDbGFzc31gfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5jbGlja2VkQ2hhbmdlQXBwfVxuICAgICAgICAgID5DaGFuZ2UgYXBwbGljYXRpb248L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5BcHBTZWxlY3QucHJvcFR5cGVzID0ge1xuICBhcHBsaWNhdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgKSxcbiAgZGVmYXVsdFZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBhbGxvd0JsYW5rOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgZGlzYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5BcHBTZWxlY3QuZGVmYXVsdFByb3BzID0ge1xuICBhcHBsaWNhdGlvbnM6IFtdLFxuICBkZWZhdWx0VmFsdWU6ICcnLFxuICBhbGxvd0JsYW5rOiBmYWxzZSxcbiAgZGlzYWJsZWQ6IGZhbHNlLFxuICBvbkNoYW5nZTogKCkgPT4ge30sXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQnV0dG9uRmlsdGVyID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSBbXTtcblxuICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBwcm9wcy5vcHRpb25zKSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IFsnYnRuJywgJ2J0bi1kZWZhdWx0JywgYGJ1dHRvbi1maWx0ZXItb3B0aW9uLSR7b3B0aW9ufWBdO1xuICAgIGlmIChwcm9wcy52YWx1ZSA9PT0gb3B0aW9uKSB7XG4gICAgICBjbGFzc2VzLnB1c2goJ2FjdGl2ZScpO1xuICAgIH1cbiAgICBsZXQgY291bnRlciA9ICcnO1xuICAgIGxldCBzcGFjaW5nID0gJyc7XG4gICAgaWYgKHByb3BzLmNvdW50cyAhPT0gbnVsbCkge1xuICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgIGlmIChwcm9wcy5jb3VudHMuaGFzT3duUHJvcGVydHkob3B0aW9uKSAmJiBwcm9wcy5jb3VudHNbb3B0aW9uXSAhPT0gMCkge1xuICAgICAgICBjb3VudCA9IHByb3BzLmNvdW50c1tvcHRpb25dO1xuICAgICAgfVxuICAgICAgY29uc3QgYmFkZ2VDbGFzc2VzID0gYGJhZGdlJHtjb3VudCA9PT0gMCA/ICcgemVybycgOiAnIG5vbi16ZXJvJ31gO1xuICAgICAgY291bnRlciA9ICg8c3BhbiBjbGFzc05hbWU9e2JhZGdlQ2xhc3Nlc30+e2NvdW50fTwvc3Bhbj4pO1xuICAgICAgc3BhY2luZyA9ICcgJztcbiAgICB9XG4gICAgb3B0aW9ucy5wdXNoKFxuICAgICAgPGFcbiAgICAgICAgaHJlZj1cIiNcIlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMuam9pbignICcpfVxuICAgICAgICBrZXk9e29wdGlvbn1cbiAgICAgICAgb25DbGljaz17KCkgPT4gcHJvcHMub25DaGFuZ2Uob3B0aW9uKX1cbiAgICAgID57b3B0aW9ufXtzcGFjaW5nfXtjb3VudGVyfTwvYT5cbiAgICApO1xuICB9XG5cbiAgY29uc3QgZGVmYXVsdENsYXNzZXMgPSBbJ2J0bicsICdidG4tZGVmYXVsdCddO1xuICBpZiAocHJvcHMudmFsdWUgPT09ICcnKSB7XG4gICAgZGVmYXVsdENsYXNzZXMucHVzaCgnYWN0aXZlJyk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLXRvb2xiYXIgYnV0dG9uLWZpbHRlclwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAgPGFcbiAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgY2xhc3NOYW1lPXtkZWZhdWx0Q2xhc3Nlcy5qb2luKCcgJyl9XG4gICAgICAgICAga2V5PVwibnVsbFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gcHJvcHMub25DaGFuZ2UoJycpfVxuICAgICAgICA+e3Byb3BzLmFsbFRleHR9PC9hPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cFwiPlxuICAgICAgICB7b3B0aW9uc31cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuQnV0dG9uRmlsdGVyLnByb3BUeXBlcyA9IHtcbiAgb3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLnN0cmluZyksXG4gIGNvdW50czogUmVhY3QuUHJvcFR5cGVzLm9iamVjdE9mKFJlYWN0LlByb3BUeXBlcy5udW1iZXIpLFxuICBhbGxUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgb25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxufTtcblxuQnV0dG9uRmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb3B0aW9uczogW10sXG4gIGNvdW50czogbnVsbCxcbiAgYWxsVGV4dDogJ0FsbCcsXG4gIHZhbHVlOiAnJyxcbiAgb25DaGFuZ2U6ICgpID0+IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uRmlsdGVyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uc29sZVZpZXdlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5tb2RhbERJViA9IG51bGw7XG4gIH1cblxuICBvcGVuTW9kYWwoKSB7XG4gICAgaWYgKHRoaXMubW9kYWxESVYgIT09IG51bGwpIHtcbiAgICAgICQodGhpcy5tb2RhbERJVikubW9kYWwoKTtcbiAgICAgICQodGhpcy5tb2RhbERJVikub24oJ3Nob3duLmJzLm1vZGFsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IG1vZGFsQm9keSA9ICQodGhpcykuZmluZCgnLm1vZGFsLWJvZHknKS5maXJzdCgpWzBdO1xuICAgICAgICBtb2RhbEJvZHkuc2Nyb2xsVG9wID0gTWF0aC5tYXgobW9kYWxCb2R5LnNjcm9sbEhlaWdodCwgbW9kYWxCb2R5LmNsaWVudEhlaWdodCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsICgpID0+IHsgdGhpcy5oYW5kbGVSZXNpemUoKTsgfSk7XG4gICAgJCh0aGlzLm1vZGFsRElWKS5vbignc2hvdy5icy5tb2RhbCcsICgpID0+IHsgdGhpcy5oYW5kbGVSZXNpemUoKTsgfSk7XG4gIH1cblxuICBoYW5kbGVSZXNpemUoKSB7XG4gICAgY29uc3QgJG1vZGFsID0gJCh0aGlzLm1vZGFsRElWKTtcbiAgICBjb25zdCBtb2RhbEhlYWRlckhlaWdodCA9IDU2O1xuICAgIGNvbnN0IG1vZGFsTWFyZ2luID0gMzA7XG4gICAgY29uc3QgbW9kYWxCb3JkZXIgPSAxO1xuXG4gICAgY29uc3QgYm9keUhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIChtb2RhbEhlYWRlckhlaWdodCArIG1vZGFsTWFyZ2luICogMiArIG1vZGFsQm9yZGVyICogMik7XG4gICAgJG1vZGFsLmZpbmQoJy5tb2RhbC1ib2R5JykuY3NzKHsgbWF4SGVpZ2h0OiBib2R5SGVpZ2h0IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGUgY29uc29sZVZpZXdlci1tb2RhbFwiIHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgcmVmPXsoYykgPT4geyB0aGlzLm1vZGFsRElWID0gYzsgfX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nIG1vZGFsLWxnXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPnt0aGlzLnByb3BzLnRpdGxlfTwvaDQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICA8cHJlPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxpbmVzLmpvaW4oJ1xcbicpfVxuICAgICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQ29uc29sZVZpZXdlci5wcm9wVHlwZXMgPSB7XG4gIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBsaW5lczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLnN0cmluZyksXG59O1xuXG5Db25zb2xlVmlld2VyLmRlZmF1bHRQcm9wcyA9IHtcbiAgdGl0bGU6ICdUZXJtaW5hbCBPdXRwdXQnLFxuICBsaW5lczogW10sXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTdGF0aW9uIGZyb20gJy4vc3RhdGlvbi5qc3gnO1xuaW1wb3J0IEFwcFNlbGVjdCBmcm9tICcuL2FwcFNlbGVjdC5qc3gnO1xuaW1wb3J0IEJ1dHRvbkZpbHRlciBmcm9tICcuL2J1dHRvbkZpbHRlci5qc3gnO1xuaW1wb3J0IExvZ1ZpZXdlciBmcm9tICcuL2xvZ1ZpZXdlci5qc3gnO1xuaW1wb3J0IENvbnNvbGVWaWV3ZXIgZnJvbSAnLi9jb25zb2xlVmlld2VyLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhc2hib2FyZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHN0YXRpb25zOiBbXSxcbiAgICAgIHNlbGVjdGlvbjogbmV3IFNldCgpLFxuICAgICAgdmlzaWJsZVR5cGU6ICcnLFxuICAgICAgdmlzaWJsZVN0YXRlOiAnJyxcbiAgICAgIGxvZzogW10sXG4gICAgICBzZXJ2ZXJDb25uZWN0aW9uRXJyb3I6IGZhbHNlLFxuICAgIH07XG4gICAgdGhpcy5zZWxlY3RUb2dnbGUgPSB0aGlzLnNlbGVjdFRvZ2dsZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2hhbmdlQXBwU2VsZWN0ZWQgPSB0aGlzLmNoYW5nZUFwcFNlbGVjdGVkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaG93VGVybWluYWxMb2cgPSB0aGlzLnNob3dUZXJtaW5hbExvZy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY29tbWFuZHMgPSB7fTtcbiAgICB0aGlzLmluaXRDb21tYW5kcygpO1xuICAgIHRoaXMuZ2V0Q29tbWFuZCA9IHRoaXMuZ2V0Q29tbWFuZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9nVmlld2VyID0gbnVsbDtcbiAgICB0aGlzLmNvbnNvbGVWaWV3ZXIgPSBudWxsO1xuICAgIHRoaXMudXBkYXRlSUQgPSAwO1xuICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5ID0gMDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucG9sbExvb3AoKTtcbiAgfVxuXG4gIGdldFN0YXRpb25TdGF0ZShzdGF0aW9uSUQpIHtcbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgaWYgKHN0YXRpb24uaWQgPT09IHN0YXRpb25JRCkge1xuICAgICAgICByZXR1cm4gc3RhdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRTdGF0aW9uVHlwZXMoKSB7XG4gICAgY29uc3QgdHlwZXMgPSBuZXcgU2V0KCk7XG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIHR5cGVzLmFkZChzdGF0aW9uLnR5cGUpO1xuICAgIH1cblxuICAgIHJldHVybiBBcnJheS5mcm9tKHR5cGVzKTtcbiAgfVxuXG4gIGdldENvbW1hbmQoY29tbWFuZE5hbWUpIHtcbiAgICBpZiAodGhpcy5jb21tYW5kc1tjb21tYW5kTmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29tbWFuZHNbY29tbWFuZE5hbWVdLmRvQ2FsbGJhY2s7XG4gICAgfVxuICAgIHRocm93IEVycm9yKGBDYWxsIHRvIGludmFsaWQgY29tbWFuZCAke2NvbW1hbmROYW1lfWApO1xuICB9XG5cbiAgZ2V0VmlzaWJsZVN0YXRpb25zKCkge1xuICAgIGNvbnN0IGFuc3dlciA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIGlmICgodGhpcy5zdGF0ZS52aXNpYmxlVHlwZSA9PT0gJycgfHwgc3RhdGlvbi50eXBlID09PSB0aGlzLnN0YXRlLnZpc2libGVUeXBlKSAmJlxuICAgICAgICAgICh0aGlzLnN0YXRlLnZpc2libGVTdGF0ZSA9PT0gJycgfHxcbiAgICAgICAgICAgdGhpcy5kaXNwbGF5U3RhdGUoc3RhdGlvbi5zdGF0ZSkgPT09IHRoaXMuc3RhdGUudmlzaWJsZVN0YXRlKSkge1xuICAgICAgICBhbnN3ZXIucHVzaChzdGF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYW5zd2VyO1xuICB9XG5cbiAgZGlzcGxheVN0YXRlKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlID09PSAnc3RhcnRpbmdfc3RhdGlvbicgfHxcbiAgICAgIHN0YXRlID09PSAnc3RhcnRpbmdfYXBwJyB8fFxuICAgICAgc3RhdGUgPT09ICdzdG9wcGluZycgfHxcbiAgICAgIHN0YXRlID09PSAnc3dpdGNoaW5nX2FwcCcpIHtcbiAgICAgIHJldHVybiAnYnVzeSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgYXR0YWNoQ29uZmlybWF0aW9uKHRleHQsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICBib290Ym94LmRpYWxvZyh7XG4gICAgICAgIG1lc3NhZ2U6IHRleHQsXG4gICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICB3YXJuaW5nOiB7XG4gICAgICAgICAgICBsYWJlbDogJ0NvbmZpcm0nLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuLXdhcm5pbmcnLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLmJpbmQodGhpcywgLi4uYXJncyksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjYW5jZWw6IHtcbiAgICAgICAgICAgIGxhYmVsOiAnQ2FuY2VsJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bi1kZWZhdWx0JyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGluaXRDb21tYW5kcygpIHtcbiAgICB0aGlzLmNvbW1hbmRzID0ge1xuICAgICAgJ3N0YXRpb25zLWFsbC1zdGFydCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RhcnRBbGwuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzdGFydCBhbGwgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1hbGwtc3RvcCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RvcEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3N0b3AgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtYWxsLXNlbGVjdCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc2VsZWN0QWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc2VsZWN0IGFsbCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IGZhbHNlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1hbGwtZGVzZWxlY3QnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLmRlc2VsZWN0QWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnZGVzZWxlY3QgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLXNlbGVjdGVkLXN0YXJ0Jzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5zdGFydFNlbGVjdGVkLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RhcnQgdGhlIHNlbGVjdGVkIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtc2VsZWN0ZWQtc3RvcCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RvcFNlbGVjdGVkLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RvcCB0aGUgc2VsZWN0ZWQgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy12aXNpYmxlLXNlbGVjdCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc2VsZWN0QWxsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3NlbGVjdCB2aXNpYmxlIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXModGhpcy5jb21tYW5kcykpIHtcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSB0aGlzLmNvbW1hbmRzW25hbWVdO1xuICAgICAgaWYgKGNvbW1hbmQuY29uZmlybSkge1xuICAgICAgICB0aGlzLmNvbW1hbmRzW25hbWVdLmRvQ2FsbGJhY2sgPSB0aGlzLmF0dGFjaENvbmZpcm1hdGlvbihcbiAgICAgICAgICBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvICR7Y29tbWFuZC50aXRsZX0/YCxcbiAgICAgICAgICBjb21tYW5kLmNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbW1hbmRzW25hbWVdLmRvQ2FsbGJhY2sgPSBjb21tYW5kLmNhbGxiYWNrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFsbFN0YXRpb25JRHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGlvbklEcyh0aGlzLnN0YXRlLnN0YXRpb25zKTtcbiAgfVxuXG4gIHN0YXRpb25JRHMoc3RhdGlvbnMpIHtcbiAgICBjb25zdCBpZHMgPSBuZXcgU2V0KCk7XG5cbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2Ygc3RhdGlvbnMpIHtcbiAgICAgIGlkcy5hZGQoc3RhdGlvbi5pZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlkcztcbiAgfVxuXG4gIHNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW9uOiB0aGlzLmFsbFN0YXRpb25JRHMoKSB9KTtcbiAgfVxuXG4gIHNlbGVjdEFsbFZpc2libGUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogdGhpcy5zdGF0aW9uSURzKHRoaXMuZ2V0VmlzaWJsZVN0YXRpb25zKCkpIH0pO1xuICB9XG5cbiAgZGVzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogbmV3IFNldCgpIH0pO1xuICB9XG5cbiAgc2VsZWN0VG9nZ2xlKGlkKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0aW9uLmhhcyhpZCkpIHtcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmRlbGV0ZShpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmFkZChpZCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3Rpb246IHRoaXMuc3RhdGUuc2VsZWN0aW9uIH0pO1xuICB9XG5cbiAgc3RvcFN0YXRpb25zKHN0YXRpb25JRHMpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9zdGF0aW9ucy9zdG9wJyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgaWRzOiBBcnJheS5mcm9tKHN0YXRpb25JRHMpLFxuICAgICAgfSksXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4ge30sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gIH1cblxuICBzdG9wU2VsZWN0ZWQoKSB7XG4gICAgdGhpcy5zdG9wU3RhdGlvbnModGhpcy5zdGF0ZS5zZWxlY3Rpb24pO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHN0b3BBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcFN0YXRpb25zKHRoaXMuYWxsU3RhdGlvbklEcygpKTtcbiAgfVxuXG4gIHN0YXJ0U3RhdGlvbnMoc3RhdGlvbklEcykge1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvYXBpL3N0YXRpb25zL3N0YXJ0JyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgaWRzOiBBcnJheS5mcm9tKHN0YXRpb25JRHMpLFxuICAgICAgfSksXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4ge30sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gIH1cblxuICBzdGFydFNlbGVjdGVkKCkge1xuICAgIHRoaXMuc3RhcnRTdGF0aW9ucyh0aGlzLnN0YXRlLnNlbGVjdGlvbik7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICB9XG5cbiAgc3RhcnRBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhcnRTdGF0aW9ucyh0aGlzLmFsbFN0YXRpb25JRHMoKSk7XG4gIH1cblxuICBjaGFuZ2VBcHBTZWxlY3RlZChhcHApIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9zdGF0aW9ucy9jaGFuZ2VfYXBwJyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgaWRzOiBBcnJheS5mcm9tKHRoaXMuc3RhdGUuc2VsZWN0aW9uKSxcbiAgICAgICAgYXBwLFxuICAgICAgfSksXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4ge30sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICB9XG5cbiAgc2hvd1Rlcm1pbmFsTG9nKHN0YXRpb25JRCkge1xuICAgIGlmICh0aGlzLmNvbnNvbGVWaWV3ZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY29uc29sZVZpZXdlci5vcGVuTW9kYWwoKTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYC9hcGkvc3RhdGlvbi8ke3N0YXRpb25JRH0vb3V0cHV0YCxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdGl0bGU6IHN0YXRpb25JRCxcbiAgICAgICAgICAgIGxpbmVzOiBkYXRhLmxpbmVzLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIHRoZSBzZXJ2ZXIgcG9sbFxuICAgKlxuICAgKiBJbXBsZW1lbnRhdGlvbjogU2luY2UgdGhlIHNlcnZlciB1c2VzIGxvbmcgcG9sbGluZyB3ZSB1c2UgYSB2ZXJ5IHNob3J0XG4gICAqIHBvbGwgdGltZSAoNTAwbXMpLiBJbiBjYXNlIG9mIGVycm9ycyBjb250YWN0aW5nIHRoZSBzZXJ2ZXIgdGhlIHBvbGwgdGltZVxuICAgKiBpbmNyZWFzZXMgd2l0aCBlYWNoIGVycm9yIHVudGlsIGEgbWF4IHBvbGwgdGltZSBpcyByZWFjaGVkLlxuICAgKi9cbiAgcG9sbExvb3AoKSB7XG4gICAgY29uc3QgbWluUG9sbFRpbWUgPSA1MDA7XG4gICAgbGV0IHJldHJ5UG9sbFRpbWUgPSBtaW5Qb2xsVGltZTtcbiAgICBjb25zdCByZXRyeUluY3JlYXNlRmFjdG9yID0gMjtcbiAgICBjb25zdCBtYXhSZXRyeVBvbGxUaW1lID0gNDAwMDtcblxuICAgIGNvbnN0IGxvb3AgPSAoKSA9PiB7XG4gICAgICB0aGlzLnBvbGxTZXJ2ZXIoKS50aGVuKCgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChsb29wLCBtaW5Qb2xsVGltZSk7XG4gICAgICAgIHJldHJ5UG9sbFRpbWUgPSBtaW5Qb2xsVGltZTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VydmVyQ29ubmVjdGlvbkVycm9yKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlcnZlckNvbm5lY3Rpb25FcnJvcjogZmFsc2UgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXJ2ZXJDb25uZWN0aW9uUmV0cnkgPSAwO1xuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KGxvb3AsIHJldHJ5UG9sbFRpbWUpO1xuICAgICAgICBpZiAocmV0cnlQb2xsVGltZSA8IG1heFJldHJ5UG9sbFRpbWUpIHtcbiAgICAgICAgICByZXRyeVBvbGxUaW1lID0gcmV0cnlQb2xsVGltZSAqIHJldHJ5SW5jcmVhc2VGYWN0b3I7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXJ2ZXJDb25uZWN0aW9uUmV0cnkrKztcbiAgICAgICAgaWYgKHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5ID4gNSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXJ2ZXJDb25uZWN0aW9uRXJyb3I6IHRydWUgfSk7XG4gICAgICAgICAgLy8gUmVzZXQgdGhlIHVwZGF0ZUlEIHNvIHRoZSBuZXh0IHBvbGwgcmV0dXJucyBpbW1lZGlhdGVseVxuICAgICAgICAgIC8vIGluc3RlYWQgb2YgYmVpbmcgYSBsb25nIHBvbGxcbiAgICAgICAgICB0aGlzLnVwZGF0ZUlEID0gMDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgICBsb29wKCk7XG4gIH1cblxuICBwb2xsU2VydmVyKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL3N0YXRpb25zJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGxhc3RVcGRhdGVJRDogdGhpcy51cGRhdGVJRCxcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICB0aW1lb3V0OiAzMDAwMCxcbiAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICBpZiAoZGF0YS5zdGF0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlEID0gZGF0YS51cGRhdGVJRDtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzdGF0aW9uczogZGF0YS5zdGF0aW9ucyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMucHJvcHMudXJsLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHN0YXRpb25zID0gW107XG4gICAgY29uc3QgYWN0aW9ucyA9IFtdO1xuICAgIGxldCBtZXNzYWdlQmFyID0gJyc7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5zZXJ2ZXJDb25uZWN0aW9uRXJyb3IpIHtcbiAgICAgIG1lc3NhZ2VCYXIgPSAoPGRpdiBjbGFzc05hbWU9XCJtZXNzYWdlX2JhclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lc3NhZ2VfYmFyLW1lc3NhZ2VcIj5cbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS13YXJuaW5nXCI+PC9pPiAgTm8gY29ubmVjdGlvbiB0byBzZXJ2ZXIuXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+KTtcbiAgICB9XG5cbiAgICB0aGlzLmdldFZpc2libGVTdGF0aW9ucygpLmZvckVhY2goKHN0YXRpb24pID0+IHN0YXRpb25zLnB1c2goXG4gICAgICA8U3RhdGlvblxuICAgICAgICBzdGF0aW9uPXtzdGF0aW9ufVxuICAgICAgICBrZXk9e3N0YXRpb24uaWR9XG4gICAgICAgIHNlbGVjdGVkPXt0aGlzLnN0YXRlLnNlbGVjdGlvbi5oYXMoc3RhdGlvbi5pZCl9XG4gICAgICAgIG9uQ2xpY2tTdGF0aW9uPXt0aGlzLnNlbGVjdFRvZ2dsZX1cbiAgICAgICAgb25PcGVuVGVybWluYWxMb2c9e3RoaXMuc2hvd1Rlcm1pbmFsTG9nfVxuICAgICAgLz5cbiAgICApKTtcblxuICAgIGNvbnN0IGNvdW50cyA9IHt9O1xuICAgIHRoaXMuc3RhdGUuc3RhdGlvbnMuZm9yRWFjaCgoc3RhdGlvbikgPT4ge1xuICAgICAgaWYgKCFjb3VudHMuaGFzT3duUHJvcGVydHkodGhpcy5kaXNwbGF5U3RhdGUoc3RhdGlvbi5zdGF0ZSkpKSB7XG4gICAgICAgIGNvdW50c1t0aGlzLmRpc3BsYXlTdGF0ZShzdGF0aW9uLnN0YXRlKV0gPSAwO1xuICAgICAgfVxuICAgICAgY291bnRzW3RoaXMuZGlzcGxheVN0YXRlKHN0YXRpb24uc3RhdGUpXSsrO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRDb3VudCA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uLnNpemU7XG4gICAgY29uc3QgYWxsU2VsZWN0ZWQgPSAoc2VsZWN0ZWRDb3VudCA9PT0gdGhpcy5zdGF0ZS5zdGF0aW9ucy5sZW5ndGgpO1xuICAgIGNvbnN0IHNlbGVjdEFsbENsYXNzZXMgPVxuICAgICAgYGJ0biBidG4tZGVmYXVsdCAke2FsbFNlbGVjdGVkID8gJyBkaXNhYmxlZCcgOiAnJ31gO1xuXG4gICAgY29uc3QgZGVzZWxlY3RBbGxDbGFzc2VzID1cbiAgICAgIGBidG4gYnRuLWRlZmF1bHQgJHtzZWxlY3RlZENvdW50ID09PSAwID8gJyBkaXNhYmxlZCcgOiAnJ31gO1xuXG4gICAgY29uc3Qgc3RhdGlvbldvcmQgPSBzZWxlY3RlZENvdW50ID09PSAxID8gJ3N0YXRpb24nIDogJ3N0YXRpb25zJztcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic3RhdGlvblN0YXRlRmlsdGVyXCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPEJ1dHRvbkZpbHRlclxuICAgICAgICAgIG9wdGlvbnM9e1snb24nLCAnb2ZmJywgJ2J1c3knLCAnZXJyb3InXX1cbiAgICAgICAgICBjb3VudHM9e2NvdW50c31cbiAgICAgICAgICBhbGxUZXh0PVwiQWxsIHN0YXRlc1wiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmlzaWJsZVN0YXRlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmlzaWJsZVN0YXRlOiBvcHRpb24gfSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInN0YXRpb25UeXBlRmlsdGVyXCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPEJ1dHRvbkZpbHRlclxuICAgICAgICAgIG9wdGlvbnM9e3RoaXMuZ2V0U3RhdGlvblR5cGVzKCl9XG4gICAgICAgICAgYWxsVGV4dD1cIkFsbCB0eXBlc1wiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmlzaWJsZVR5cGV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhvcHRpb24pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2aXNpYmxlVHlwZTogb3B0aW9uIH0pO1xuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzZWxlY3RlZENvdW50XCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZS1zZXBhcmF0b3JcIiA+PC9kaXY+XG4gICAgICAgIDxiPnt0aGlzLnN0YXRlLnNlbGVjdGlvbi5zaXplfSB7c3RhdGlvbldvcmR9IHNlbGVjdGVkPC9iPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdEFjdGlvbnNcIj5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtkZXNlbGVjdEFsbENsYXNzZXN9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLWFsbC1kZXNlbGVjdCcpfVxuICAgICAgICAgID5EZXNlbGVjdDwvYT4mbmJzcDtcbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzZWxlY3RBbGxDbGFzc2VzfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy12aXNpYmxlLXNlbGVjdCcpfVxuICAgICAgICAgID5TZWxlY3QgYWxsPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBjb25zdCBub1NlbGVjdGlvbkRpc2FibGUgPSAoc2VsZWN0ZWRDb3VudCA9PT0gMCA/ICcgZGlzYWJsZWQnIDogJycpO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzdGFydFN0b3BQYW5lbFwiIGNsYXNzTmFtZT17YGFjdGlvbi1wYW5lJHtub1NlbGVjdGlvbkRpc2FibGV9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmUtc2VwYXJhdG9yXCIgPjwvZGl2PlxuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tc3VjY2VzcyR7bm9TZWxlY3Rpb25EaXNhYmxlfWB9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy1zZWxlY3RlZC1zdGFydCcpfVxuICAgICAgICA+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGxheVwiIC8+Jm5ic3A7Jm5ic3A7U3RhcnQgU2VsZWN0ZWQ8L2E+XG4gICAgICAgICZuYnNwO1xuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tZGFuZ2VyJHtub1NlbGVjdGlvbkRpc2FibGV9YH1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLXNlbGVjdGVkLXN0b3AnKX1cbiAgICAgICAgPjxpIGNsYXNzTmFtZT1cImZhIGZhLXN0b3BcIiAvPiZuYnNwOyZuYnNwO1N0b3AgU2VsZWN0ZWQ8L2E+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgbGV0IHNlbGVjdGVkQXJlU2FtZVR5cGUgPSB0cnVlO1xuICAgIGxldCBsYXN0VHlwZSA9IG51bGw7XG4gICAgZm9yIChjb25zdCBzZWxlY3RlZElEIG9mIHRoaXMuc3RhdGUuc2VsZWN0aW9uKSB7XG4gICAgICBpZiAobGFzdFR5cGUgPT09IG51bGwpIHtcbiAgICAgICAgbGFzdFR5cGUgPSB0aGlzLmdldFN0YXRpb25TdGF0ZShzZWxlY3RlZElEKS50eXBlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZ2V0U3RhdGlvblN0YXRlKHNlbGVjdGVkSUQpLnR5cGUgIT09IGxhc3RUeXBlKSB7XG4gICAgICAgIHNlbGVjdGVkQXJlU2FtZVR5cGUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGFsbFNlbGVjdGVkT24gPSB0cnVlO1xuICAgIGZvciAoY29uc3Qgc2VsZWN0ZWRJRCBvZiB0aGlzLnN0YXRlLnNlbGVjdGlvbikge1xuICAgICAgaWYgKHRoaXMuZ2V0U3RhdGlvblN0YXRlKHNlbGVjdGVkSUQpLnN0YXRlICE9PSAnb24nKSB7XG4gICAgICAgIGFsbFNlbGVjdGVkT24gPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2FuQ2hhbmdlQXBwID0gKGFsbFNlbGVjdGVkT24gJiYgKHNlbGVjdGVkQ291bnQgPiAwKSAmJiBzZWxlY3RlZEFyZVNhbWVUeXBlKTtcblxuICAgIGxldCBhcHBsaWNhdGlvbnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0aW9uLmhhcyhzdGF0aW9uLmlkKSkge1xuICAgICAgICBhcHBsaWNhdGlvbnMgPSBzdGF0aW9uLnBvc3NpYmxlX2FwcHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJhcHBTZWxlY3RcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lLXNlcGFyYXRvclwiID48L2Rpdj5cbiAgICAgICAgPEFwcFNlbGVjdFxuICAgICAgICAgIGFwcGxpY2F0aW9ucz17Y2FuQ2hhbmdlQXBwID8gYXBwbGljYXRpb25zIDogW119XG4gICAgICAgICAgZGlzYWJsZWQ9eyFjYW5DaGFuZ2VBcHB9XG4gICAgICAgICAgYWxsb3dCbGFua1xuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmF0dGFjaENvbmZpcm1hdGlvbignQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGUgYXBwbGljYXRpb24/JyxcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQXBwU2VsZWN0ZWQpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic2hvd0xvZ1wiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmUtc2VwYXJhdG9yXCIgPjwvZGl2PlxuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiXG4gICAgICAgICAgaHJlZj1cIiNcIlxuICAgICAgICAgIG9uQ2xpY2s9eyhldikgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMubG9nVmlld2VyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRoaXMubG9nVmlld2VyLm9wZW5Nb2RhbCgpO1xuICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvbm90aWZpY2F0aW9ucycsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvZzogZGF0YS5ub3RpZmljYXRpb25zLnJldmVyc2UoKSB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH19XG4gICAgICAgID5TaG93IGxvZzwvYT5cbiAgICAgICAgJm5ic3A7XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3NOYW1lPXsnYnRuIGJ0bi1kZWZhdWx0J31cbiAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25zb2xlVmlld2VyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRoaXMuY29uc29sZVZpZXdlci5vcGVuTW9kYWwoKTtcbiAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL3NlcnZlci9vdXRwdXQnLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnR2xvYmFsIG91dHB1dCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVzOiBkYXRhLmxpbmVzLFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9fVxuICAgICAgICA+PGkgY2xhc3NOYW1lPVwiZmEgZmEtZGVza3RvcFwiPjwvaT4gR2xvYmFsIG91dHB1dDwvYT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e21lc3NhZ2VCYXIgIT09ICcnID8gJ3dpdGgtbWVzc2FnZV9iYXInIDogJyd9PlxuICAgICAgICB7bWVzc2FnZUJhcn1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNiBwYW5lLXN0YXRpb25zXCI+XG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJkYXNoYm9hcmRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwic3RhdGlvbkxpc3RcIiBjbGFzc05hbWU9XCJwYW5lbC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAge3N0YXRpb25zfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNiBwYW5lLWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgPGRpdiBpZD1cImRhc2hib2FyZEFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICB7YWN0aW9uc31cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxMb2dWaWV3ZXIgbG9nPXt0aGlzLnN0YXRlLmxvZ30gcmVmPXsoYykgPT4geyB0aGlzLmxvZ1ZpZXdlciA9IGM7IH19IC8+XG4gICAgICAgIDxDb25zb2xlVmlld2VyIGxpbmVzPXt0aGlzLnN0YXRlLmxpbmVzfSByZWY9eyhjKSA9PiB7IHRoaXMuY29uc29sZVZpZXdlciA9IGM7IH19IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkRhc2hib2FyZC5wcm9wVHlwZXMgPSB7XG4gIHVybDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ1ZpZXdlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGZvcm1hdFRpbWUoaXNvVGltZSkge1xuICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZShpc29UaW1lKTtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgeWVzdGVyZGF5ID0gbmV3IERhdGUoKTtcbiAgICB5ZXN0ZXJkYXkuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAxKTtcbiAgICBsZXQgZGF5ID0gJyc7XG5cbiAgICBpZiAodG9kYXkuZ2V0TW9udGgoKSA9PT0gdGltZS5nZXRNb250aCgpICYmXG4gICAgICB0b2RheS5nZXRGdWxsWWVhcigpID09PSB0aW1lLmdldEZ1bGxZZWFyKCkgJiZcbiAgICAgIHRvZGF5LmdldERhdGUoKSA9PT0gdGltZS5nZXREYXRlKCkpIHtcbiAgICAgIGRheSA9ICdUb2RheSc7XG4gICAgfSBlbHNlIGlmICh5ZXN0ZXJkYXkuZ2V0TW9udGgoKSA9PT0gdGltZS5nZXRNb250aCgpICYmXG4gICAgICB5ZXN0ZXJkYXkuZ2V0RnVsbFllYXIoKSA9PT0gdGltZS5nZXRGdWxsWWVhcigpICYmXG4gICAgICB5ZXN0ZXJkYXkuZ2V0RGF0ZSgpID09PSB0aW1lLmdldERhdGUoKSkge1xuICAgICAgZGF5ID0gJ1llc3RlcmRheSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRheSA9IGAke3RpbWUuZ2V0RnVsbFllYXIoKX0tJHt0aW1lLmdldE1vbnRoKCl9LSR7dGltZS5nZXREYXRlKCl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7ZGF5fSAke3RpbWUuZ2V0SG91cnMoKX06JHt0aW1lLmdldE1pbnV0ZXMoKX06JHt0aW1lLmdldFNlY29uZHMoKX1gO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5tb2RhbERJViA9IG51bGw7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsICgpID0+IHsgdGhpcy5oYW5kbGVSZXNpemUoKTsgfSk7XG4gICAgJCh0aGlzLm1vZGFsRElWKS5vbignc2hvdy5icy5tb2RhbCcsICgpID0+IHsgdGhpcy5oYW5kbGVSZXNpemUoKTsgfSk7XG4gIH1cblxuICBvcGVuTW9kYWwoKSB7XG4gICAgaWYgKHRoaXMubW9kYWxESVYgIT09IG51bGwpIHtcbiAgICAgICQodGhpcy5tb2RhbERJVikubW9kYWwoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVSZXNpemUoKSB7XG4gICAgY29uc3QgJG1vZGFsID0gJCh0aGlzLm1vZGFsRElWKTtcbiAgICBjb25zdCBtb2RhbEhlYWRlckhlaWdodCA9IDU2O1xuICAgIGNvbnN0IG1vZGFsTWFyZ2luID0gMzA7XG4gICAgY29uc3QgbW9kYWxCb3JkZXIgPSAxO1xuXG4gICAgY29uc3QgYm9keUhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIChtb2RhbEhlYWRlckhlaWdodCArIG1vZGFsTWFyZ2luICogMiArIG1vZGFsQm9yZGVyICogMik7XG4gICAgJG1vZGFsLmZpbmQoJy5tb2RhbC1ib2R5JykuY3NzKHsgbWF4SGVpZ2h0OiBib2R5SGVpZ2h0IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHJvd0NsYXNzZXMgPSB7XG4gICAgICBlcnJvcjogJ2RhbmdlcicsXG4gICAgICB3YXJuaW5nOiAnd2FybmluZycsXG4gICAgfTtcblxuICAgIGNvbnN0IGVudHJpZXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGxvZ0VudHJ5IG9mIHRoaXMucHJvcHMubG9nKSB7XG4gICAgICBjb25zdCByb3dDbGFzcyA9IHJvd0NsYXNzZXNbbG9nRW50cnkudHlwZV0gIT09IHVuZGVmaW5lZCA/IHJvd0NsYXNzZXNbbG9nRW50cnkudHlwZV0gOiAnJztcblxuICAgICAgZW50cmllcy5wdXNoKFxuICAgICAgICA8dHIga2V5PXtsb2dFbnRyeS5pZH0gY2xhc3NOYW1lPXtyb3dDbGFzc30+XG4gICAgICAgICAgPHRkPntMb2dWaWV3ZXIuZm9ybWF0VGltZShsb2dFbnRyeS50aW1lKX08L3RkPlxuICAgICAgICAgIDx0ZD57bG9nRW50cnkuc3RhdGlvbl9uYW1lfTwvdGQ+XG4gICAgICAgICAgPHRkPntsb2dFbnRyeS5tZXNzYWdlfTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGUgbG9nVmlld2VyLW1vZGFsXCIgdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiByZWY9eyhjKSA9PiB7IHRoaXMubW9kYWxESVYgPSBjOyB9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2cgbW9kYWwtbGdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+e3RoaXMucHJvcHMudGl0bGV9PC9oND5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1maXhlZCB0YWJsZS1jb25kZW5zZWRcIj5cbiAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5UaW1lPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlN0YXRpb248L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+TWVzc2FnZTwvdGg+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIHtlbnRyaWVzfVxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkxvZ1ZpZXdlci5wcm9wVHlwZXMgPSB7XG4gIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBsb2c6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICB0aW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgc3RhdGlvbl9pZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHN0YXRpb25fbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIG1lc3NhZ2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgfSlcbiAgKSxcbn07XG5cbkxvZ1ZpZXdlci5kZWZhdWx0UHJvcHMgPSB7XG4gIGxvZzogW10sXG4gIHRpdGxlOiAnRXZlbnQgTG9nJyxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4vZGFzaGJvYXJkLmpzeCc7XG5cbndpbmRvdy5kYXNoYm9hcmQgPSBudWxsO1xuXG4vLyBvblJlYWR5XG4kKCgpID0+IHtcbiAgd2luZG93LmRhc2hib2FyZCA9IFJlYWN0RE9NLnJlbmRlcihcbiAgICA8RGFzaGJvYXJkIHVybD1cIi9hcGkvc3RhdGlvbnNcIiAvPixcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGFzaGJvYXJkQ29udGFpbmVyJylcbiAgKTtcblxuICAvLyBJbnN0YWxsIGNsaWNrIGhhbmRsZXJzIGluIGV4dGVybmFsIG1lbnVzIGFuZCBidXR0b25zXG4gICQoJ1tkYXRhLWNvbW1hbmRdJykuZWFjaChmdW5jdGlvbiBzZXRDbGlja0hhbmRsZXIoKSB7XG4gICAgJCh0aGlzKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHdpbmRvdy5kYXNoYm9hcmQuZ2V0Q29tbWFuZCgkKHRoaXMpLmF0dHIoJ2RhdGEtY29tbWFuZCcpKSgpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRpb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlT3BlblRlcm1pbmFsTG9nID0gdGhpcy5oYW5kbGVPcGVuVGVybWluYWxMb2cuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKCkge1xuICAgIHRoaXMucHJvcHMub25DbGlja1N0YXRpb24odGhpcy5wcm9wcy5zdGF0aW9uLmlkKTtcbiAgfVxuXG4gIGhhbmRsZU9wZW5UZXJtaW5hbExvZyhldikge1xuICAgIHRoaXMucHJvcHMub25PcGVuVGVybWluYWxMb2codGhpcy5wcm9wcy5zdGF0aW9uLmlkKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHN0YXRpb25DbGFzc2VzID0gW1xuICAgICAgJ3N0YXRpb24nLFxuICAgICAgYHN0YXRpb24tc3RhdGUtJHt0aGlzLnByb3BzLnN0YXRpb24uc3RhdGV9YCxcbiAgICAgIGBzdGF0aW9uLXR5cGUtJHt0aGlzLnByb3BzLnN0YXRpb24udHlwZX1gLFxuICAgIF07XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZCkge1xuICAgICAgc3RhdGlvbkNsYXNzZXMucHVzaCgnc3RhdGlvbi1zZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXt0aGlzLnByb3BzLnN0YXRpb24uaWR9XG4gICAgICAgIGNsYXNzTmFtZT17c3RhdGlvbkNsYXNzZXMuam9pbignICcpfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tc3RhdGUtbGlnaHRcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLWljb25cIj5cbiAgICAgICAgICA8aW1nIGFsdD17dGhpcy5wcm9wcy5zdGF0aW9uLmFwcH0gc3JjPXt0aGlzLnByb3BzLnN0YXRpb24uaWNvbn0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1uYW1lXCI+e3RoaXMucHJvcHMuc3RhdGlvbi5uYW1lfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tdHlwZVwiPnt0aGlzLnByb3BzLnN0YXRpb24udHlwZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLWFwcFwiPnt0aGlzLnByb3BzLnN0YXRpb24uYXBwfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tc3RhdHVzXCI+e3RoaXMucHJvcHMuc3RhdGlvbi5zdGF0dXN9PC9kaXY+XG4gICAgICAgIDxhIGNsYXNzTmFtZT1cInN0YXRpb24tb3V0cHV0LWJ1dHRvblwiIG9uQ2xpY2s9eyhldikgPT4geyB0aGlzLmhhbmRsZU9wZW5UZXJtaW5hbExvZyhldik7IH19PlxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWRlc2t0b3BcIj48L2k+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuU3RhdGlvbi5wcm9wVHlwZXMgPSB7XG4gIHN0YXRpb246IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzdGF0ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN0YXR1czogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcHA6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWNvbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBvbkNsaWNrU3RhdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uT3BlblRlcm1pbmFsTG9nOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbn07XG4iXX0=
