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

var _presetsBlock = require('./presetsBlock.jsx');

var _presetsBlock2 = _interopRequireDefault(_presetsBlock);

var _header = require('./header.jsx');

var _header2 = _interopRequireDefault(_header);

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
      serverConnectionError: false,
      presets: []
    };
    _this.selectToggle = _this.selectToggle.bind(_this);
    _this.changeAppSelected = _this.changeAppSelected.bind(_this);
    _this.showTerminalLog = _this.showTerminalLog.bind(_this);
    _this.showGlobalLog = _this.showGlobalLog.bind(_this);
    _this.showNotifications = _this.showNotifications.bind(_this);
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
      this.fetchPresets();
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
        },
        'preset-create': {
          callback: this.createPreset.bind(this),
          title: 'create a preset',
          confirm: false
        },
        'preset-activate': {
          callback: this.activatePreset.bind(this),
          title: 'activate a preset',
          confirm: true
        },
        'preset-delete': {
          callback: this.deletePreset.bind(this),
          title: 'delete a preset',
          confirm: true
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
  }, {
    key: 'showGlobalLog',
    value: function showGlobalLog() {
      var _this4 = this;

      if (this.consoleViewer !== null) {
        this.consoleViewer.openModal();
        $.ajax({
          url: '/api/server/output',
          method: 'get',
          dataType: 'json',
          contentType: 'application/json',
          cache: false,
          success: function success(data) {
            _this4.setState({
              title: 'Global output',
              lines: data.lines
            });
          },
          error: function error(xhr, status, err) {
            return console.error(status, err.toString());
          }
        });
      }
    }
  }, {
    key: 'showNotifications',
    value: function showNotifications() {
      var _this5 = this;

      if (this.logViewer !== null) {
        this.logViewer.openModal();
        $.ajax({
          url: '/api/notifications',
          method: 'get',
          contentType: 'application/json',
          cache: false,
          success: function success(data) {
            _this5.setState({ log: data.notifications.reverse() });
          },
          error: function error(xhr, status, err) {
            return console.error(status, err.toString());
          }
        });
      }
    }
  }, {
    key: 'createPreset',
    value: function createPreset() {
      var _this6 = this;

      var newPreset = {
        name: '',
        stationApps: {}
      };
      this.getVisibleStations().forEach(function (station) {
        if (_this6.state.selection.has(station.id)) {
          newPreset.stationApps[station.id] = station.app;
        }
      });

      bootbox.prompt({
        size: 'small',
        title: 'Enter a name for the preset',
        message: 'The preset includes the ' + this.state.selection.length + ' selected stations',
        buttons: {
          confirm: {
            label: 'Create',
            className: 'btn-success'
          },
          cancel: {
            label: 'Cancel',
            className: 'btn-default'
          }
        },
        callback: function callback(result) {
          if (result !== null) {
            newPreset.name = result.substr(0, 50);
            _this6.sendCreatePreset(newPreset);
          }
        }
      });
    }
  }, {
    key: 'sendCreatePreset',
    value: function sendCreatePreset(preset) {
      var _this7 = this;

      $.ajax({
        url: '/api/preset',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify(preset),
        dataType: 'json',
        cache: false,
        success: function success() {
          _this7.fetchPresets();
        },
        error: function error(xhr, status, err) {
          return console.error(status, err.toString());
        }
      });
    }
  }, {
    key: 'activatePreset',
    value: function activatePreset(presetID) {
      var _this8 = this;

      $.ajax({
        url: '/api/preset/' + presetID + '/activate',
        method: 'post',
        contentType: 'application/json',
        cache: false,
        success: function success() {
          _this8.fetchPresets();
        },
        error: function error(xhr, status, err) {
          return console.error(status, err.toString());
        }
      });
    }
  }, {
    key: 'deletePreset',
    value: function deletePreset(presetID) {
      $.ajax({
        url: '/api/preset/' + presetID,
        method: 'delete',
        contentType: 'application/json',
        cache: false,
        success: function success() {},
        error: function error(xhr, status, err) {
          return console.error(status, err.toString());
        }
      });
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
      var _this9 = this;

      var minPollTime = 500;
      var retryPollTime = minPollTime;
      var retryIncreaseFactor = 2;
      var maxRetryPollTime = 4000;

      var loop = function loop() {
        _this9.pollServer().then(function () {
          setTimeout(loop, minPollTime);
          retryPollTime = minPollTime;
          if (_this9.state.serverConnectionError) {
            _this9.setState({ serverConnectionError: false });
          }
          _this9.serverConnectionRetry = 0;
        }).catch(function () {
          setTimeout(loop, retryPollTime);
          if (retryPollTime < maxRetryPollTime) {
            retryPollTime = retryPollTime * retryIncreaseFactor;
          }
          _this9.serverConnectionRetry++;
          if (_this9.serverConnectionRetry > 5) {
            _this9.setState({ serverConnectionError: true });
            // Reset the updateID so the next poll returns immediately
            // instead of being a long poll
            _this9.updateID = 0;
          }
        });
      };
      loop();
    }
  }, {
    key: 'pollServer',
    value: function pollServer() {
      var _this10 = this;

      return new Promise(function (resolve, reject) {
        $.ajax({
          url: '/api/stations',
          data: {
            lastUpdateID: _this10.updateID
          },
          dataType: 'json',
          cache: false,
          timeout: 30000,
          success: function success(data) {
            if (data.stations !== undefined) {
              _this10.updateID = data.updateID;
              _this10.setState({ stations: data.stations });
            }
            resolve();
          },
          error: function error(xhr, status, err) {
            console.error(_this10.props.url, status, err.toString());
            reject();
          }
        });
      });
    }
  }, {
    key: 'fetchPresets',
    value: function fetchPresets() {
      var _this11 = this;

      return new Promise(function (resolve, reject) {
        $.ajax({
          url: '/api/presets',
          cache: false,
          timeout: 30000,
          dataType: 'json',
          success: function success(data) {
            if (data.presets !== undefined) {
              _this11.setState({ presets: data.presets });
            }
            resolve();
          },
          error: function error(xhr, status, err) {
            console.error(_this11.props.url, status, err.toString());
            reject();
          }
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this12 = this;

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
          selected: _this12.state.selection.has(station.id),
          onClickStation: _this12.selectToggle,
          onOpenTerminalLog: _this12.showTerminalLog
        }));
      });

      var counts = {};
      this.state.stations.forEach(function (station) {
        if (!counts.hasOwnProperty(_this12.displayState(station.state))) {
          counts[_this12.displayState(station.state)] = 0;
        }
        counts[_this12.displayState(station.state)]++;
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
            _this12.deselectAll();
            _this12.setState({ visibleState: option });
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
            _this12.deselectAll();
            _this12.setState({ visibleType: option });
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
        { key: 'presets', className: 'action-pane' },
        _react2.default.createElement('div', { className: 'action-pane-separator' }),
        _react2.default.createElement(_presetsBlock2.default, {
          presets: this.state.presets,
          onCreate: this.getCommand('preset-create'),
          onActivate: this.getCommand('preset-activate'),
          onDelete: this.getCommand('preset-delete'),
          createDisabled: selectedCount === 0 || !allSelectedOn
        })
      ));

      return _react2.default.createElement(
        'div',
        { className: messageBar !== '' ? 'with-message_bar' : '' },
        messageBar,
        _react2.default.createElement(_header2.default, {
          onShowGlobalLog: this.showGlobalLog,
          onShowNotifications: this.showNotifications
        }),
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
            _this12.logViewer = c;
          } }),
        _react2.default.createElement(_consoleViewer2.default, { lines: this.state.lines, ref: function ref(c) {
            _this12.consoleViewer = c;
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

},{"./appSelect.jsx":1,"./buttonFilter.jsx":2,"./consoleViewer.jsx":3,"./header.jsx":5,"./logViewer.jsx":6,"./presetsBlock.jsx":8,"./station.jsx":9,"react":"react"}],5:[function(require,module,exports){
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

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    _this.handleGlobalLogClicked = _this.handleGlobalLogClicked.bind(_this);
    _this.handleNotificationsClicked = _this.handleNotificationsClicked.bind(_this);
    return _this;
  }

  _createClass(Header, [{
    key: "handleGlobalLogClicked",
    value: function handleGlobalLogClicked(ev) {
      if (this.props.onShowGlobalLog) {
        this.props.onShowGlobalLog();
      }
      ev.preventDefault();
    }
  }, {
    key: "handleNotificationsClicked",
    value: function handleNotificationsClicked(ev) {
      if (this.props.onShowNotifications) {
        this.props.onShowNotifications();
      }
      ev.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "nav",
        { className: "navbar navbar-default navbar-fixed-top" },
        _react2.default.createElement(
          "div",
          { className: "container-fluid" },
          _react2.default.createElement(
            "div",
            { className: "navbar-header" },
            _react2.default.createElement(
              "button",
              {
                type: "button",
                className: "navbar-toggle collapsed",
                "data-toggle": "collapse",
                "data-target": "#bs-example-navbar-collapse-1",
                "aria-expanded": "false"
              },
              _react2.default.createElement(
                "span",
                { className: "sr-only" },
                "Toggle navigation"
              ),
              _react2.default.createElement("span", { className: "icon-bar" }),
              _react2.default.createElement("span", { className: "icon-bar" }),
              _react2.default.createElement("span", { className: "icon-bar" })
            ),
            _react2.default.createElement(
              "div",
              { className: "navbar-brand", href: "#" },
              "Hilbert"
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "navbar-collapse collapse navbar-right" },
            _react2.default.createElement(
              "button",
              {
                type: "button",
                className: "btn btn-default navbar-btn",
                onClick: this.handleGlobalLogClicked
              },
              _react2.default.createElement("i", { className: "fa fa-desktop" })
            ),
            " ",
            _react2.default.createElement(
              "button",
              {
                type: "button",
                className: "btn btn-default navbar-btn",
                onClick: this.handleNotificationsClicked
              },
              _react2.default.createElement("i", { className: "fa fa-bell-o" })
            )
          )
        )
      );
    }
  }]);

  return Header;
}(_react2.default.Component);

exports.default = Header;


Header.propTypes = {
  onShowGlobalLog: _react2.default.PropTypes.func,
  onShowNotifications: _react2.default.PropTypes.func
};

Header.defaultProps = {
  onShowGlobalLog: function onShowGlobalLog() {},
  onShowNotifications: function onShowNotifications() {}
};

},{"react":"react"}],6:[function(require,module,exports){
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

},{"react":"react"}],7:[function(require,module,exports){
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

},{"./dashboard.jsx":4,"react":"react","react-dom":"react-dom"}],8:[function(require,module,exports){
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
 * Presets Block component
 * Allows activating, deleting and creating components
 */
var PresetsBlock = function (_React$Component) {
  _inherits(PresetsBlock, _React$Component);

  function PresetsBlock(props) {
    _classCallCheck(this, PresetsBlock);

    var _this = _possibleConstructorReturn(this, (PresetsBlock.__proto__ || Object.getPrototypeOf(PresetsBlock)).call(this, props));

    _this.state = {
      selectedPreset: 0
    };
    _this.clickedCreate = _this.clickedCreate.bind(_this);
    _this.clickedActivate = _this.clickedActivate.bind(_this);
    _this.clickedDelete = _this.clickedDelete.bind(_this);
    _this.handlePresetChange = _this.handlePresetChange.bind(_this);
    return _this;
  }

  _createClass(PresetsBlock, [{
    key: "clickedCreate",
    value: function clickedCreate() {
      if (this.props.onCreate) {
        this.props.onCreate();
      }
    }
  }, {
    key: "clickedActivate",
    value: function clickedActivate() {
      if (this.props.onActivate) {
        this.props.onActivate(this.state.selectedPreset);
      }
    }
  }, {
    key: "clickedDelete",
    value: function clickedDelete() {
      if (this.props.onDelete) {
        this.props.onDelete(this.state.selectedPreset);
      }
    }
  }, {
    key: "handlePresetChange",
    value: function handlePresetChange(ev) {
      this.setState({ selectedPreset: Number.parseInt(ev.target.value, 10) });
    }
  }, {
    key: "render",
    value: function render() {
      var options = [_react2.default.createElement("option", { key: "0", value: "0" })];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.presets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var preset = _step.value;

          options.push(_react2.default.createElement(
            "option",
            { key: preset.id, value: preset.id },
            preset.name
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

      var createDisabled = this.props.createDisabled ? ' disabled' : '';
      var actionsDisabled = this.state.selectedPreset === 0 ? ' disabled' : '';

      return _react2.default.createElement(
        "div",
        { className: "presets-block" },
        _react2.default.createElement(
          "div",
          { className: "form-inline" },
          _react2.default.createElement(
            "div",
            { className: "form-group form-group-minwidth" },
            _react2.default.createElement(
              "select",
              {
                className: "form-control presets-list",
                value: this.state.selectedPreset,
                onChange: this.handlePresetChange
              },
              options
            )
          ),
          _react2.default.createElement(
            "a",
            { className: "btn btn-warning" + actionsDisabled, onClick: this.clickedActivate },
            "Activate preset"
          ),
          _react2.default.createElement(
            "a",
            { className: "btn btn-danger" + actionsDisabled, onClick: this.clickedDelete },
            _react2.default.createElement("span", { className: "fa fa-trash-o" })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "presets-actions" },
          _react2.default.createElement(
            "a",
            { className: "btn btn-success" + createDisabled, onClick: this.clickedCreate },
            "Create preset"
          )
        )
      );
    }
  }]);

  return PresetsBlock;
}(_react2.default.Component);

exports.default = PresetsBlock;


PresetsBlock.propTypes = {
  presets: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    id: _react2.default.PropTypes.number,
    name: _react2.default.PropTypes.string,
    stationApps: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.string)
  })),
  onCreate: _react2.default.PropTypes.func,
  onActivate: _react2.default.PropTypes.func,
  onDelete: _react2.default.PropTypes.func,
  createDisabled: _react2.default.PropTypes.bool
};

PresetsBlock.defaultProps = {
  presets: [],
  onCreate: function onCreate() {},
  onActivate: function onActivate() {},
  onDelete: function onDelete() {},
  createDisabled: false
};

},{"react":"react"}],9:[function(require,module,exports){
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

},{"react":"react"}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwU2VsZWN0LmpzeCIsInNyYy9idXR0b25GaWx0ZXIuanN4Iiwic3JjL2NvbnNvbGVWaWV3ZXIuanN4Iiwic3JjL2Rhc2hib2FyZC5qc3giLCJzcmMvaGVhZGVyLmpzeCIsInNyYy9sb2dWaWV3ZXIuanN4Iiwic3JjL21haW4uanN4Iiwic3JjL3ByZXNldHNCbG9jay5qc3giLCJzcmMvc3RhdGlvbi5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUFFQTs7OztJQUlxQixTOzs7QUFFbkIscUJBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLHNIQUNYLEtBRFc7O0FBRWpCLFVBQUssV0FBTCxHQUFtQixJQUFuQjtBQUNBLFVBQUssZ0JBQUwsR0FBd0IsTUFBSyxnQkFBTCxDQUFzQixJQUF0QixPQUF4QjtBQUhpQjtBQUlsQjs7Ozt1Q0FFa0I7QUFDakIsVUFBSSxLQUFLLEtBQUwsQ0FBVyxRQUFmLEVBQXlCO0FBQ3ZCLGFBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsS0FBSyxXQUFMLENBQWlCLEtBQXJDO0FBQ0Q7QUFDRjs7OzZCQUVRO0FBQUE7O0FBQ1AsVUFBTSxlQUFlLEVBQXJCOztBQUVBLFVBQUksS0FBSyxLQUFMLENBQVcsVUFBZixFQUEyQjtBQUN6QixxQkFBYSxJQUFiLENBQ0U7QUFBQTtBQUFBLFlBQVEsS0FBSSxNQUFaLEVBQW1CLE9BQU0sRUFBekI7QUFBQTtBQUFBLFNBREY7QUFHRDs7QUFQTTtBQUFBO0FBQUE7O0FBQUE7QUFTUCw2QkFBMEIsS0FBSyxLQUFMLENBQVcsWUFBckMsOEhBQW1EO0FBQUEsY0FBeEMsV0FBd0M7O0FBQ2pELHVCQUFhLElBQWIsQ0FDRTtBQUFBO0FBQUEsY0FBUSxLQUFLLFdBQWIsRUFBMEIsT0FBTyxXQUFqQztBQUErQztBQUEvQyxX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WEY7QUFZRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGdCQUFmO0FBQWlDLGVBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUI7QUFBcEQsU0FaRjtBQWFFO0FBQUE7QUFBQSxZQUFHLFdBQVUsdUJBQWIsRUFBcUMsU0FBUyxpQkFBQyxFQUFELEVBQVE7QUFBRSxxQkFBSyxxQkFBTCxDQUEyQixFQUEzQjtBQUFpQyxhQUF6RjtBQUNFLCtDQUFHLFdBQVUsZUFBYjtBQURGO0FBYkYsT0FERjtBQW1CRDs7OztFQS9Da0MsZ0JBQU0sUzs7a0JBQXRCLE87OztBQWtEckIsUUFBUSxTQUFSLEdBQW9CO0FBQ2xCLFdBQVMsZ0JBQU0sU0FBTixDQUFnQixLQUFoQixDQUFzQjtBQUM3QixRQUFJLGdCQUFNLFNBQU4sQ0FBZ0IsTUFEUztBQUU3QixVQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsTUFGTztBQUc3QixXQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsTUFITTtBQUk3QixVQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsTUFKTztBQUs3QixZQUFRLGdCQUFNLFNBQU4sQ0FBZ0IsTUFMSztBQU03QixTQUFLLGdCQUFNLFNBQU4sQ0FBZ0IsTUFOUTtBQU83QixVQUFNLGdCQUFNLFNBQU4sQ0FBZ0I7QUFQTyxHQUF0QixFQVFOLFVBVGU7QUFVbEIsWUFBVSxnQkFBTSxTQUFOLENBQWdCLElBVlI7QUFXbEIsa0JBQWdCLGdCQUFNLFNBQU4sQ0FBZ0IsSUFYZDtBQVlsQixxQkFBbUIsZ0JBQU0sU0FBTixDQUFnQjtBQVpqQixDQUFwQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG4vKipcbiAqIEFwcFNlbGVjdCBjb21wb25lbnRcbiAqIEFsbG93cyB0aGUgdXNlciB0byBzZWxlY3QgYW4gYXBwbGljYXRpb24gZnJvbSBhIGxpc3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwU2VsZWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmFwcFNlbGVjdG9yID0gbnVsbDtcbiAgICB0aGlzLmNsaWNrZWRDaGFuZ2VBcHAgPSB0aGlzLmNsaWNrZWRDaGFuZ2VBcHAuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNsaWNrZWRDaGFuZ2VBcHAoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5hcHBTZWxlY3Rvci52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGFwcGxpY2F0aW9ucyA9IFtdO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuYWxsb3dCbGFuaykge1xuICAgICAgYXBwbGljYXRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PVwibnVsbFwiIHZhbHVlPVwiXCI+Jm5ic3A7PC9vcHRpb24+XG4gICAgICApO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgYXBwbGljYXRpb24gb2YgdGhpcy5wcm9wcy5hcHBsaWNhdGlvbnMpIHtcbiAgICAgIGFwcGxpY2F0aW9ucy5wdXNoKFxuICAgICAgICA8b3B0aW9uIGtleT17YXBwbGljYXRpb259IHZhbHVlPXthcHBsaWNhdGlvbn0+e2FwcGxpY2F0aW9ufTwvb3B0aW9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBkaXNhYmxlZENsYXNzID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPyAnIGRpc2FibGVkJyA6ICcnKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGFwcFNlbGVjdCR7ZGlzYWJsZWRDbGFzc31gfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWlubGluZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBmb3JtLWdyb3VwLW1pbndpZHRoXCI+XG4gICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCR7ZGlzYWJsZWRDbGFzc31gfVxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuZGVmYXVsdFZhbHVlID8gdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgOiAnJ31cbiAgICAgICAgICAgICAgcmVmPXsoc2VsKSA9PiB7IHRoaXMuYXBwU2VsZWN0b3IgPSBzZWw7IH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHthcHBsaWNhdGlvbnN9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAmbmJzcDtcbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi13YXJuaW5nJHtkaXNhYmxlZENsYXNzfWB9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNsaWNrZWRDaGFuZ2VBcHB9XG4gICAgICAgICAgPkNoYW5nZSBhcHBsaWNhdGlvbjwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkFwcFNlbGVjdC5wcm9wVHlwZXMgPSB7XG4gIGFwcGxpY2F0aW9uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICApLFxuICBkZWZhdWx0VmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGFsbG93Qmxhbms6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbn07XG5cbkFwcFNlbGVjdC5kZWZhdWx0UHJvcHMgPSB7XG4gIGFwcGxpY2F0aW9uczogW10sXG4gIGRlZmF1bHRWYWx1ZTogJycsXG4gIGFsbG93Qmxhbms6IGZhbHNlLFxuICBkaXNhYmxlZDogZmFsc2UsXG4gIG9uQ2hhbmdlOiAoKSA9PiB7fSxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBCdXR0b25GaWx0ZXIgPSAocHJvcHMpID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuXG4gIGZvciAoY29uc3Qgb3B0aW9uIG9mIHByb3BzLm9wdGlvbnMpIHtcbiAgICBjb25zdCBjbGFzc2VzID0gWydidG4nLCAnYnRuLWRlZmF1bHQnLCBgYnV0dG9uLWZpbHRlci1vcHRpb24tJHtvcHRpb259YF07XG4gICAgaWYgKHByb3BzLnZhbHVlID09PSBvcHRpb24pIHtcbiAgICAgIGNsYXNzZXMucHVzaCgnYWN0aXZlJyk7XG4gICAgfVxuICAgIGxldCBjb3VudGVyID0gJyc7XG4gICAgbGV0IHNwYWNpbmcgPSAnJztcbiAgICBpZiAocHJvcHMuY291bnRzICE9PSBudWxsKSB7XG4gICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgaWYgKHByb3BzLmNvdW50cy5oYXNPd25Qcm9wZXJ0eShvcHRpb24pICYmIHByb3BzLmNvdW50c1tvcHRpb25dICE9PSAwKSB7XG4gICAgICAgIGNvdW50ID0gcHJvcHMuY291bnRzW29wdGlvbl07XG4gICAgICB9XG4gICAgICBjb25zdCBiYWRnZUNsYXNzZXMgPSBgYmFkZ2Uke2NvdW50ID09PSAwID8gJyB6ZXJvJyA6ICcgbm9uLXplcm8nfWA7XG4gICAgICBjb3VudGVyID0gKDxzcGFuIGNsYXNzTmFtZT17YmFkZ2VDbGFzc2VzfT57Y291bnR9PC9zcGFuPik7XG4gICAgICBzcGFjaW5nID0gJyAnO1xuICAgIH1cbiAgICBvcHRpb25zLnB1c2goXG4gICAgICA8YVxuICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKCcgJyl9XG4gICAgICAgIGtleT17b3B0aW9ufVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBwcm9wcy5vbkNoYW5nZShvcHRpb24pfVxuICAgICAgPntvcHRpb259e3NwYWNpbmd9e2NvdW50ZXJ9PC9hPlxuICAgICk7XG4gIH1cblxuICBjb25zdCBkZWZhdWx0Q2xhc3NlcyA9IFsnYnRuJywgJ2J0bi1kZWZhdWx0J107XG4gIGlmIChwcm9wcy52YWx1ZSA9PT0gJycpIHtcbiAgICBkZWZhdWx0Q2xhc3Nlcy5wdXNoKCdhY3RpdmUnKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJidG4tdG9vbGJhciBidXR0b24tZmlsdGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cFwiPlxuICAgICAgICA8YVxuICAgICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgICBjbGFzc05hbWU9e2RlZmF1bHRDbGFzc2VzLmpvaW4oJyAnKX1cbiAgICAgICAgICBrZXk9XCJudWxsXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBwcm9wcy5vbkNoYW5nZSgnJyl9XG4gICAgICAgID57cHJvcHMuYWxsVGV4dH08L2E+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgIHtvcHRpb25zfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5CdXR0b25GaWx0ZXIucHJvcFR5cGVzID0ge1xuICBvcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nKSxcbiAgY291bnRzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gIGFsbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5CdXR0b25GaWx0ZXIuZGVmYXVsdFByb3BzID0ge1xuICBvcHRpb25zOiBbXSxcbiAgY291bnRzOiBudWxsLFxuICBhbGxUZXh0OiAnQWxsJyxcbiAgdmFsdWU6ICcnLFxuICBvbkNoYW5nZTogKCkgPT4ge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25GaWx0ZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zb2xlVmlld2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLm1vZGFsRElWID0gbnVsbDtcbiAgfVxuXG4gIG9wZW5Nb2RhbCgpIHtcbiAgICBpZiAodGhpcy5tb2RhbERJViAhPT0gbnVsbCkge1xuICAgICAgJCh0aGlzLm1vZGFsRElWKS5tb2RhbCgpO1xuICAgICAgJCh0aGlzLm1vZGFsRElWKS5vbignc2hvd24uYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgbW9kYWxCb2R5ID0gJCh0aGlzKS5maW5kKCcubW9kYWwtYm9keScpLmZpcnN0KClbMF07XG4gICAgICAgIG1vZGFsQm9keS5zY3JvbGxUb3AgPSBNYXRoLm1heChtb2RhbEJvZHkuc2Nyb2xsSGVpZ2h0LCBtb2RhbEJvZHkuY2xpZW50SGVpZ2h0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICQod2luZG93KS5vbigncmVzaXplJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgICAkKHRoaXMubW9kYWxESVYpLm9uKCdzaG93LmJzLm1vZGFsJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZSgpIHtcbiAgICBjb25zdCAkbW9kYWwgPSAkKHRoaXMubW9kYWxESVYpO1xuICAgIGNvbnN0IG1vZGFsSGVhZGVySGVpZ2h0ID0gNTY7XG4gICAgY29uc3QgbW9kYWxNYXJnaW4gPSAzMDtcbiAgICBjb25zdCBtb2RhbEJvcmRlciA9IDE7XG5cbiAgICBjb25zdCBib2R5SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gKG1vZGFsSGVhZGVySGVpZ2h0ICsgbW9kYWxNYXJnaW4gKiAyICsgbW9kYWxCb3JkZXIgKiAyKTtcbiAgICAkbW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5jc3MoeyBtYXhIZWlnaHQ6IGJvZHlIZWlnaHQgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZSBjb25zb2xlVmlld2VyLW1vZGFsXCIgdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiByZWY9eyhjKSA9PiB7IHRoaXMubW9kYWxESVYgPSBjOyB9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2cgbW9kYWwtbGdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+e3RoaXMucHJvcHMudGl0bGV9PC9oND5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgIDxwcmU+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGluZXMuam9pbignXFxuJyl9XG4gICAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Db25zb2xlVmlld2VyLnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGxpbmVzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nKSxcbn07XG5cbkNvbnNvbGVWaWV3ZXIuZGVmYXVsdFByb3BzID0ge1xuICB0aXRsZTogJ1Rlcm1pbmFsIE91dHB1dCcsXG4gIGxpbmVzOiBbXSxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFN0YXRpb24gZnJvbSAnLi9zdGF0aW9uLmpzeCc7XG5pbXBvcnQgQXBwU2VsZWN0IGZyb20gJy4vYXBwU2VsZWN0LmpzeCc7XG5pbXBvcnQgQnV0dG9uRmlsdGVyIGZyb20gJy4vYnV0dG9uRmlsdGVyLmpzeCc7XG5pbXBvcnQgTG9nVmlld2VyIGZyb20gJy4vbG9nVmlld2VyLmpzeCc7XG5pbXBvcnQgQ29uc29sZVZpZXdlciBmcm9tICcuL2NvbnNvbGVWaWV3ZXIuanN4JztcbmltcG9ydCBQcmVzZXRzQmxvY2sgZnJvbSAnLi9wcmVzZXRzQmxvY2suanN4JztcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi9oZWFkZXIuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFzaGJvYXJkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc3RhdGlvbnM6IFtdLFxuICAgICAgc2VsZWN0aW9uOiBuZXcgU2V0KCksXG4gICAgICB2aXNpYmxlVHlwZTogJycsXG4gICAgICB2aXNpYmxlU3RhdGU6ICcnLFxuICAgICAgbG9nOiBbXSxcbiAgICAgIHNlcnZlckNvbm5lY3Rpb25FcnJvcjogZmFsc2UsXG4gICAgICBwcmVzZXRzOiBbXSxcbiAgICB9O1xuICAgIHRoaXMuc2VsZWN0VG9nZ2xlID0gdGhpcy5zZWxlY3RUb2dnbGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNoYW5nZUFwcFNlbGVjdGVkID0gdGhpcy5jaGFuZ2VBcHBTZWxlY3RlZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2hvd1Rlcm1pbmFsTG9nID0gdGhpcy5zaG93VGVybWluYWxMb2cuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNob3dHbG9iYWxMb2cgPSB0aGlzLnNob3dHbG9iYWxMb2cuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNob3dOb3RpZmljYXRpb25zID0gdGhpcy5zaG93Tm90aWZpY2F0aW9ucy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY29tbWFuZHMgPSB7fTtcbiAgICB0aGlzLmluaXRDb21tYW5kcygpO1xuICAgIHRoaXMuZ2V0Q29tbWFuZCA9IHRoaXMuZ2V0Q29tbWFuZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9nVmlld2VyID0gbnVsbDtcbiAgICB0aGlzLmNvbnNvbGVWaWV3ZXIgPSBudWxsO1xuICAgIHRoaXMudXBkYXRlSUQgPSAwO1xuICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5ID0gMDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucG9sbExvb3AoKTtcbiAgICB0aGlzLmZldGNoUHJlc2V0cygpO1xuICB9XG5cbiAgZ2V0U3RhdGlvblN0YXRlKHN0YXRpb25JRCkge1xuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiB0aGlzLnN0YXRlLnN0YXRpb25zKSB7XG4gICAgICBpZiAoc3RhdGlvbi5pZCA9PT0gc3RhdGlvbklEKSB7XG4gICAgICAgIHJldHVybiBzdGF0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldFN0YXRpb25UeXBlcygpIHtcbiAgICBjb25zdCB0eXBlcyA9IG5ldyBTZXQoKTtcbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgdHlwZXMuYWRkKHN0YXRpb24udHlwZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEFycmF5LmZyb20odHlwZXMpO1xuICB9XG5cbiAgZ2V0Q29tbWFuZChjb21tYW5kTmFtZSkge1xuICAgIGlmICh0aGlzLmNvbW1hbmRzW2NvbW1hbmROYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb21tYW5kc1tjb21tYW5kTmFtZV0uZG9DYWxsYmFjaztcbiAgICB9XG4gICAgdGhyb3cgRXJyb3IoYENhbGwgdG8gaW52YWxpZCBjb21tYW5kICR7Y29tbWFuZE5hbWV9YCk7XG4gIH1cblxuICBnZXRWaXNpYmxlU3RhdGlvbnMoKSB7XG4gICAgY29uc3QgYW5zd2VyID0gW107XG5cbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgaWYgKCh0aGlzLnN0YXRlLnZpc2libGVUeXBlID09PSAnJyB8fCBzdGF0aW9uLnR5cGUgPT09IHRoaXMuc3RhdGUudmlzaWJsZVR5cGUpICYmXG4gICAgICAgICAgKHRoaXMuc3RhdGUudmlzaWJsZVN0YXRlID09PSAnJyB8fFxuICAgICAgICAgICB0aGlzLmRpc3BsYXlTdGF0ZShzdGF0aW9uLnN0YXRlKSA9PT0gdGhpcy5zdGF0ZS52aXNpYmxlU3RhdGUpKSB7XG4gICAgICAgIGFuc3dlci5wdXNoKHN0YXRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhbnN3ZXI7XG4gIH1cblxuICBkaXNwbGF5U3RhdGUoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUgPT09ICdzdGFydGluZ19zdGF0aW9uJyB8fFxuICAgICAgc3RhdGUgPT09ICdzdGFydGluZ19hcHAnIHx8XG4gICAgICBzdGF0ZSA9PT0gJ3N0b3BwaW5nJyB8fFxuICAgICAgc3RhdGUgPT09ICdzd2l0Y2hpbmdfYXBwJykge1xuICAgICAgcmV0dXJuICdidXN5JztcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBhdHRhY2hDb25maXJtYXRpb24odGV4dCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgIGJvb3Rib3guZGlhbG9nKHtcbiAgICAgICAgbWVzc2FnZTogdGV4dCxcbiAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgIHdhcm5pbmc6IHtcbiAgICAgICAgICAgIGxhYmVsOiAnQ29uZmlybScsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdidG4td2FybmluZycsXG4gICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2suYmluZCh0aGlzLCAuLi5hcmdzKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNhbmNlbDoge1xuICAgICAgICAgICAgbGFiZWw6ICdDYW5jZWwnLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuLWRlZmF1bHQnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgaW5pdENvbW1hbmRzKCkge1xuICAgIHRoaXMuY29tbWFuZHMgPSB7XG4gICAgICAnc3RhdGlvbnMtYWxsLXN0YXJ0Jzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5zdGFydEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3N0YXJ0IGFsbCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IHRydWUsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLWFsbC1zdG9wJzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5zdG9wQWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RvcCBhbGwgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1hbGwtc2VsZWN0Jzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5zZWxlY3RBbGwuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzZWxlY3QgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLWFsbC1kZXNlbGVjdCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuZGVzZWxlY3RBbGwuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdkZXNlbGVjdCBhbGwgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtc2VsZWN0ZWQtc3RhcnQnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnN0YXJ0U2VsZWN0ZWQuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzdGFydCB0aGUgc2VsZWN0ZWQgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1zZWxlY3RlZC1zdG9wJzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5zdG9wU2VsZWN0ZWQuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzdG9wIHRoZSBzZWxlY3RlZCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IHRydWUsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLXZpc2libGUtc2VsZWN0Jzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5zZWxlY3RBbGxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc2VsZWN0IHZpc2libGUgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICAncHJlc2V0LWNyZWF0ZSc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuY3JlYXRlUHJlc2V0LmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnY3JlYXRlIGEgcHJlc2V0JyxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgJ3ByZXNldC1hY3RpdmF0ZSc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuYWN0aXZhdGVQcmVzZXQuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdhY3RpdmF0ZSBhIHByZXNldCcsXG4gICAgICAgIGNvbmZpcm06IHRydWUsXG4gICAgICB9LFxuICAgICAgJ3ByZXNldC1kZWxldGUnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLmRlbGV0ZVByZXNldC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ2RlbGV0ZSBhIHByZXNldCcsXG4gICAgICAgIGNvbmZpcm06IHRydWUsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXModGhpcy5jb21tYW5kcykpIHtcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSB0aGlzLmNvbW1hbmRzW25hbWVdO1xuICAgICAgaWYgKGNvbW1hbmQuY29uZmlybSkge1xuICAgICAgICB0aGlzLmNvbW1hbmRzW25hbWVdLmRvQ2FsbGJhY2sgPSB0aGlzLmF0dGFjaENvbmZpcm1hdGlvbihcbiAgICAgICAgICBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvICR7Y29tbWFuZC50aXRsZX0/YCxcbiAgICAgICAgICBjb21tYW5kLmNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbW1hbmRzW25hbWVdLmRvQ2FsbGJhY2sgPSBjb21tYW5kLmNhbGxiYWNrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFsbFN0YXRpb25JRHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGlvbklEcyh0aGlzLnN0YXRlLnN0YXRpb25zKTtcbiAgfVxuXG4gIHN0YXRpb25JRHMoc3RhdGlvbnMpIHtcbiAgICBjb25zdCBpZHMgPSBuZXcgU2V0KCk7XG5cbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2Ygc3RhdGlvbnMpIHtcbiAgICAgIGlkcy5hZGQoc3RhdGlvbi5pZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlkcztcbiAgfVxuXG4gIHNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW9uOiB0aGlzLmFsbFN0YXRpb25JRHMoKSB9KTtcbiAgfVxuXG4gIHNlbGVjdEFsbFZpc2libGUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogdGhpcy5zdGF0aW9uSURzKHRoaXMuZ2V0VmlzaWJsZVN0YXRpb25zKCkpIH0pO1xuICB9XG5cbiAgZGVzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogbmV3IFNldCgpIH0pO1xuICB9XG5cbiAgc2VsZWN0VG9nZ2xlKGlkKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0aW9uLmhhcyhpZCkpIHtcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmRlbGV0ZShpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmFkZChpZCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3Rpb246IHRoaXMuc3RhdGUuc2VsZWN0aW9uIH0pO1xuICB9XG5cbiAgc3RvcFN0YXRpb25zKHN0YXRpb25JRHMpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9zdGF0aW9ucy9zdG9wJyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgaWRzOiBBcnJheS5mcm9tKHN0YXRpb25JRHMpLFxuICAgICAgfSksXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4ge30sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gIH1cblxuICBzdG9wU2VsZWN0ZWQoKSB7XG4gICAgdGhpcy5zdG9wU3RhdGlvbnModGhpcy5zdGF0ZS5zZWxlY3Rpb24pO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHN0b3BBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcFN0YXRpb25zKHRoaXMuYWxsU3RhdGlvbklEcygpKTtcbiAgfVxuXG4gIHN0YXJ0U3RhdGlvbnMoc3RhdGlvbklEcykge1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvYXBpL3N0YXRpb25zL3N0YXJ0JyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgaWRzOiBBcnJheS5mcm9tKHN0YXRpb25JRHMpLFxuICAgICAgfSksXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4ge30sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gIH1cblxuICBzdGFydFNlbGVjdGVkKCkge1xuICAgIHRoaXMuc3RhcnRTdGF0aW9ucyh0aGlzLnN0YXRlLnNlbGVjdGlvbik7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICB9XG5cbiAgc3RhcnRBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhcnRTdGF0aW9ucyh0aGlzLmFsbFN0YXRpb25JRHMoKSk7XG4gIH1cblxuICBjaGFuZ2VBcHBTZWxlY3RlZChhcHApIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9zdGF0aW9ucy9jaGFuZ2VfYXBwJyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgaWRzOiBBcnJheS5mcm9tKHRoaXMuc3RhdGUuc2VsZWN0aW9uKSxcbiAgICAgICAgYXBwLFxuICAgICAgfSksXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4ge30sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICB9XG5cbiAgc2hvd1Rlcm1pbmFsTG9nKHN0YXRpb25JRCkge1xuICAgIGlmICh0aGlzLmNvbnNvbGVWaWV3ZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY29uc29sZVZpZXdlci5vcGVuTW9kYWwoKTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYC9hcGkvc3RhdGlvbi8ke3N0YXRpb25JRH0vb3V0cHV0YCxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdGl0bGU6IHN0YXRpb25JRCxcbiAgICAgICAgICAgIGxpbmVzOiBkYXRhLmxpbmVzLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzaG93R2xvYmFsTG9nKCkge1xuICAgIGlmICh0aGlzLmNvbnNvbGVWaWV3ZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY29uc29sZVZpZXdlci5vcGVuTW9kYWwoKTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvc2VydmVyL291dHB1dCcsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHRpdGxlOiAnR2xvYmFsIG91dHB1dCcsXG4gICAgICAgICAgICBsaW5lczogZGF0YS5saW5lcyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2hvd05vdGlmaWNhdGlvbnMoKSB7XG4gICAgaWYgKHRoaXMubG9nVmlld2VyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmxvZ1ZpZXdlci5vcGVuTW9kYWwoKTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvbm90aWZpY2F0aW9ucycsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG9nOiBkYXRhLm5vdGlmaWNhdGlvbnMucmV2ZXJzZSgpIH0pO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVQcmVzZXQoKSB7XG4gICAgY29uc3QgbmV3UHJlc2V0ID0ge1xuICAgICAgbmFtZTogJycsXG4gICAgICBzdGF0aW9uQXBwczoge30sXG4gICAgfTtcbiAgICB0aGlzLmdldFZpc2libGVTdGF0aW9ucygpLmZvckVhY2goKHN0YXRpb24pID0+IHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGlvbi5oYXMoc3RhdGlvbi5pZCkpIHtcbiAgICAgICAgbmV3UHJlc2V0LnN0YXRpb25BcHBzW3N0YXRpb24uaWRdID0gc3RhdGlvbi5hcHA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBib290Ym94LnByb21wdCh7XG4gICAgICBzaXplOiAnc21hbGwnLFxuICAgICAgdGl0bGU6ICdFbnRlciBhIG5hbWUgZm9yIHRoZSBwcmVzZXQnLFxuICAgICAgbWVzc2FnZTogYFRoZSBwcmVzZXQgaW5jbHVkZXMgdGhlICR7dGhpcy5zdGF0ZS5zZWxlY3Rpb24ubGVuZ3RofSBzZWxlY3RlZCBzdGF0aW9uc2AsXG4gICAgICBidXR0b25zOiB7XG4gICAgICAgIGNvbmZpcm06IHtcbiAgICAgICAgICBsYWJlbDogJ0NyZWF0ZScsXG4gICAgICAgICAgY2xhc3NOYW1lOiAnYnRuLXN1Y2Nlc3MnLFxuICAgICAgICB9LFxuICAgICAgICBjYW5jZWw6IHtcbiAgICAgICAgICBsYWJlbDogJ0NhbmNlbCcsXG4gICAgICAgICAgY2xhc3NOYW1lOiAnYnRuLWRlZmF1bHQnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGNhbGxiYWNrOiAocmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IG51bGwpIHtcbiAgICAgICAgICBuZXdQcmVzZXQubmFtZSA9IHJlc3VsdC5zdWJzdHIoMCwgNTApO1xuICAgICAgICAgIHRoaXMuc2VuZENyZWF0ZVByZXNldChuZXdQcmVzZXQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgc2VuZENyZWF0ZVByZXNldChwcmVzZXQpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9wcmVzZXQnLFxuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocHJlc2V0KSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuZmV0Y2hQcmVzZXRzKCk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICB9XG5cbiAgYWN0aXZhdGVQcmVzZXQocHJlc2V0SUQpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiBgL2FwaS9wcmVzZXQvJHtwcmVzZXRJRH0vYWN0aXZhdGVgLFxuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICB0aGlzLmZldGNoUHJlc2V0cygpO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZVByZXNldChwcmVzZXRJRCkge1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6IGAvYXBpL3ByZXNldC8ke3ByZXNldElEfWAsXG4gICAgICBtZXRob2Q6ICdkZWxldGUnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIHRoZSBzZXJ2ZXIgcG9sbFxuICAgKlxuICAgKiBJbXBsZW1lbnRhdGlvbjogU2luY2UgdGhlIHNlcnZlciB1c2VzIGxvbmcgcG9sbGluZyB3ZSB1c2UgYSB2ZXJ5IHNob3J0XG4gICAqIHBvbGwgdGltZSAoNTAwbXMpLiBJbiBjYXNlIG9mIGVycm9ycyBjb250YWN0aW5nIHRoZSBzZXJ2ZXIgdGhlIHBvbGwgdGltZVxuICAgKiBpbmNyZWFzZXMgd2l0aCBlYWNoIGVycm9yIHVudGlsIGEgbWF4IHBvbGwgdGltZSBpcyByZWFjaGVkLlxuICAgKi9cbiAgcG9sbExvb3AoKSB7XG4gICAgY29uc3QgbWluUG9sbFRpbWUgPSA1MDA7XG4gICAgbGV0IHJldHJ5UG9sbFRpbWUgPSBtaW5Qb2xsVGltZTtcbiAgICBjb25zdCByZXRyeUluY3JlYXNlRmFjdG9yID0gMjtcbiAgICBjb25zdCBtYXhSZXRyeVBvbGxUaW1lID0gNDAwMDtcblxuICAgIGNvbnN0IGxvb3AgPSAoKSA9PiB7XG4gICAgICB0aGlzLnBvbGxTZXJ2ZXIoKS50aGVuKCgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChsb29wLCBtaW5Qb2xsVGltZSk7XG4gICAgICAgIHJldHJ5UG9sbFRpbWUgPSBtaW5Qb2xsVGltZTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VydmVyQ29ubmVjdGlvbkVycm9yKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlcnZlckNvbm5lY3Rpb25FcnJvcjogZmFsc2UgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXJ2ZXJDb25uZWN0aW9uUmV0cnkgPSAwO1xuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KGxvb3AsIHJldHJ5UG9sbFRpbWUpO1xuICAgICAgICBpZiAocmV0cnlQb2xsVGltZSA8IG1heFJldHJ5UG9sbFRpbWUpIHtcbiAgICAgICAgICByZXRyeVBvbGxUaW1lID0gcmV0cnlQb2xsVGltZSAqIHJldHJ5SW5jcmVhc2VGYWN0b3I7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXJ2ZXJDb25uZWN0aW9uUmV0cnkrKztcbiAgICAgICAgaWYgKHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5ID4gNSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXJ2ZXJDb25uZWN0aW9uRXJyb3I6IHRydWUgfSk7XG4gICAgICAgICAgLy8gUmVzZXQgdGhlIHVwZGF0ZUlEIHNvIHRoZSBuZXh0IHBvbGwgcmV0dXJucyBpbW1lZGlhdGVseVxuICAgICAgICAgIC8vIGluc3RlYWQgb2YgYmVpbmcgYSBsb25nIHBvbGxcbiAgICAgICAgICB0aGlzLnVwZGF0ZUlEID0gMDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgICBsb29wKCk7XG4gIH1cblxuICBwb2xsU2VydmVyKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL3N0YXRpb25zJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGxhc3RVcGRhdGVJRDogdGhpcy51cGRhdGVJRCxcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICB0aW1lb3V0OiAzMDAwMCxcbiAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICBpZiAoZGF0YS5zdGF0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlEID0gZGF0YS51cGRhdGVJRDtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzdGF0aW9uczogZGF0YS5zdGF0aW9ucyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMucHJvcHMudXJsLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZmV0Y2hQcmVzZXRzKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL3ByZXNldHMnLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIHRpbWVvdXQ6IDMwMDAwLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhLnByZXNldHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByZXNldHM6IGRhdGEucHJlc2V0cyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMucHJvcHMudXJsLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgc3RhdGlvbnMgPSBbXTtcbiAgICBjb25zdCBhY3Rpb25zID0gW107XG4gICAgbGV0IG1lc3NhZ2VCYXIgPSAnJztcblxuICAgIGlmICh0aGlzLnN0YXRlLnNlcnZlckNvbm5lY3Rpb25FcnJvcikge1xuICAgICAgbWVzc2FnZUJhciA9ICg8ZGl2IGNsYXNzTmFtZT1cIm1lc3NhZ2VfYmFyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVzc2FnZV9iYXItbWVzc2FnZVwiPlxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXdhcm5pbmdcIj48L2k+ICBObyBjb25uZWN0aW9uIHRvIHNlcnZlci5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4pO1xuICAgIH1cblxuICAgIHRoaXMuZ2V0VmlzaWJsZVN0YXRpb25zKCkuZm9yRWFjaCgoc3RhdGlvbikgPT4gc3RhdGlvbnMucHVzaChcbiAgICAgIDxTdGF0aW9uXG4gICAgICAgIHN0YXRpb249e3N0YXRpb259XG4gICAgICAgIGtleT17c3RhdGlvbi5pZH1cbiAgICAgICAgc2VsZWN0ZWQ9e3RoaXMuc3RhdGUuc2VsZWN0aW9uLmhhcyhzdGF0aW9uLmlkKX1cbiAgICAgICAgb25DbGlja1N0YXRpb249e3RoaXMuc2VsZWN0VG9nZ2xlfVxuICAgICAgICBvbk9wZW5UZXJtaW5hbExvZz17dGhpcy5zaG93VGVybWluYWxMb2d9XG4gICAgICAvPlxuICAgICkpO1xuXG4gICAgY29uc3QgY291bnRzID0ge307XG4gICAgdGhpcy5zdGF0ZS5zdGF0aW9ucy5mb3JFYWNoKChzdGF0aW9uKSA9PiB7XG4gICAgICBpZiAoIWNvdW50cy5oYXNPd25Qcm9wZXJ0eSh0aGlzLmRpc3BsYXlTdGF0ZShzdGF0aW9uLnN0YXRlKSkpIHtcbiAgICAgICAgY291bnRzW3RoaXMuZGlzcGxheVN0YXRlKHN0YXRpb24uc3RhdGUpXSA9IDA7XG4gICAgICB9XG4gICAgICBjb3VudHNbdGhpcy5kaXNwbGF5U3RhdGUoc3RhdGlvbi5zdGF0ZSldKys7XG4gICAgfSk7XG5cbiAgICBjb25zdCBzZWxlY3RlZENvdW50ID0gdGhpcy5zdGF0ZS5zZWxlY3Rpb24uc2l6ZTtcbiAgICBjb25zdCBhbGxTZWxlY3RlZCA9IChzZWxlY3RlZENvdW50ID09PSB0aGlzLnN0YXRlLnN0YXRpb25zLmxlbmd0aCk7XG4gICAgY29uc3Qgc2VsZWN0QWxsQ2xhc3NlcyA9XG4gICAgICBgYnRuIGJ0bi1kZWZhdWx0ICR7YWxsU2VsZWN0ZWQgPyAnIGRpc2FibGVkJyA6ICcnfWA7XG5cbiAgICBjb25zdCBkZXNlbGVjdEFsbENsYXNzZXMgPVxuICAgICAgYGJ0biBidG4tZGVmYXVsdCAke3NlbGVjdGVkQ291bnQgPT09IDAgPyAnIGRpc2FibGVkJyA6ICcnfWA7XG5cbiAgICBjb25zdCBzdGF0aW9uV29yZCA9IHNlbGVjdGVkQ291bnQgPT09IDEgPyAnc3RhdGlvbicgOiAnc3RhdGlvbnMnO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzdGF0aW9uU3RhdGVGaWx0ZXJcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8QnV0dG9uRmlsdGVyXG4gICAgICAgICAgb3B0aW9ucz17WydvbicsICdvZmYnLCAnYnVzeScsICdlcnJvciddfVxuICAgICAgICAgIGNvdW50cz17Y291bnRzfVxuICAgICAgICAgIGFsbFRleHQ9XCJBbGwgc3RhdGVzXCJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52aXNpYmxlU3RhdGV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhvcHRpb24pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2aXNpYmxlU3RhdGU6IG9wdGlvbiB9KTtcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic3RhdGlvblR5cGVGaWx0ZXJcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8QnV0dG9uRmlsdGVyXG4gICAgICAgICAgb3B0aW9ucz17dGhpcy5nZXRTdGF0aW9uVHlwZXMoKX1cbiAgICAgICAgICBhbGxUZXh0PVwiQWxsIHR5cGVzXCJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52aXNpYmxlVHlwZX1cbiAgICAgICAgICBvbkNoYW5nZT17KG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZpc2libGVUeXBlOiBvcHRpb24gfSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInNlbGVjdGVkQ291bnRcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lLXNlcGFyYXRvclwiID48L2Rpdj5cbiAgICAgICAgPGI+e3RoaXMuc3RhdGUuc2VsZWN0aW9uLnNpemV9IHtzdGF0aW9uV29yZH0gc2VsZWN0ZWQ8L2I+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0QWN0aW9uc1wiPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBjbGFzc05hbWU9e2Rlc2VsZWN0QWxsQ2xhc3Nlc31cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZ2V0Q29tbWFuZCgnc3RhdGlvbnMtYWxsLWRlc2VsZWN0Jyl9XG4gICAgICAgICAgPkRlc2VsZWN0PC9hPiZuYnNwO1xuICAgICAgICAgIDxhXG4gICAgICAgICAgICBjbGFzc05hbWU9e3NlbGVjdEFsbENsYXNzZXN9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLXZpc2libGUtc2VsZWN0Jyl9XG4gICAgICAgICAgPlNlbGVjdCBhbGw8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGNvbnN0IG5vU2VsZWN0aW9uRGlzYWJsZSA9IChzZWxlY3RlZENvdW50ID09PSAwID8gJyBkaXNhYmxlZCcgOiAnJyk7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInN0YXJ0U3RvcFBhbmVsXCIgY2xhc3NOYW1lPXtgYWN0aW9uLXBhbmUke25vU2VsZWN0aW9uRGlzYWJsZX1gfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZS1zZXBhcmF0b3JcIiA+PC9kaXY+XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi1zdWNjZXNzJHtub1NlbGVjdGlvbkRpc2FibGV9YH1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLXNlbGVjdGVkLXN0YXJ0Jyl9XG4gICAgICAgID48aSBjbGFzc05hbWU9XCJmYSBmYS1wbGF5XCIgLz4mbmJzcDsmbmJzcDtTdGFydCBTZWxlY3RlZDwvYT5cbiAgICAgICAgJm5ic3A7XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi1kYW5nZXIke25vU2VsZWN0aW9uRGlzYWJsZX1gfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZ2V0Q29tbWFuZCgnc3RhdGlvbnMtc2VsZWN0ZWQtc3RvcCcpfVxuICAgICAgICA+PGkgY2xhc3NOYW1lPVwiZmEgZmEtc3RvcFwiIC8+Jm5ic3A7Jm5ic3A7U3RvcCBTZWxlY3RlZDwvYT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBsZXQgc2VsZWN0ZWRBcmVTYW1lVHlwZSA9IHRydWU7XG4gICAgbGV0IGxhc3RUeXBlID0gbnVsbDtcbiAgICBmb3IgKGNvbnN0IHNlbGVjdGVkSUQgb2YgdGhpcy5zdGF0ZS5zZWxlY3Rpb24pIHtcbiAgICAgIGlmIChsYXN0VHlwZSA9PT0gbnVsbCkge1xuICAgICAgICBsYXN0VHlwZSA9IHRoaXMuZ2V0U3RhdGlvblN0YXRlKHNlbGVjdGVkSUQpLnR5cGU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5nZXRTdGF0aW9uU3RhdGUoc2VsZWN0ZWRJRCkudHlwZSAhPT0gbGFzdFR5cGUpIHtcbiAgICAgICAgc2VsZWN0ZWRBcmVTYW1lVHlwZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYWxsU2VsZWN0ZWRPbiA9IHRydWU7XG4gICAgZm9yIChjb25zdCBzZWxlY3RlZElEIG9mIHRoaXMuc3RhdGUuc2VsZWN0aW9uKSB7XG4gICAgICBpZiAodGhpcy5nZXRTdGF0aW9uU3RhdGUoc2VsZWN0ZWRJRCkuc3RhdGUgIT09ICdvbicpIHtcbiAgICAgICAgYWxsU2VsZWN0ZWRPbiA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjYW5DaGFuZ2VBcHAgPSAoYWxsU2VsZWN0ZWRPbiAmJiAoc2VsZWN0ZWRDb3VudCA+IDApICYmIHNlbGVjdGVkQXJlU2FtZVR5cGUpO1xuXG4gICAgbGV0IGFwcGxpY2F0aW9ucyA9IFtdO1xuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiB0aGlzLnN0YXRlLnN0YXRpb25zKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3Rpb24uaGFzKHN0YXRpb24uaWQpKSB7XG4gICAgICAgIGFwcGxpY2F0aW9ucyA9IHN0YXRpb24ucG9zc2libGVfYXBwcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cImFwcFNlbGVjdFwiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmUtc2VwYXJhdG9yXCIgPjwvZGl2PlxuICAgICAgICA8QXBwU2VsZWN0XG4gICAgICAgICAgYXBwbGljYXRpb25zPXtjYW5DaGFuZ2VBcHAgPyBhcHBsaWNhdGlvbnMgOiBbXX1cbiAgICAgICAgICBkaXNhYmxlZD17IWNhbkNoYW5nZUFwcH1cbiAgICAgICAgICBhbGxvd0JsYW5rXG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuYXR0YWNoQ29uZmlybWF0aW9uKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHRoZSBhcHBsaWNhdGlvbj8nLFxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VBcHBTZWxlY3RlZCl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJwcmVzZXRzXCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZS1zZXBhcmF0b3JcIiAvPlxuICAgICAgICA8UHJlc2V0c0Jsb2NrXG4gICAgICAgICAgcHJlc2V0cz17dGhpcy5zdGF0ZS5wcmVzZXRzfVxuICAgICAgICAgIG9uQ3JlYXRlPXt0aGlzLmdldENvbW1hbmQoJ3ByZXNldC1jcmVhdGUnKX1cbiAgICAgICAgICBvbkFjdGl2YXRlPXt0aGlzLmdldENvbW1hbmQoJ3ByZXNldC1hY3RpdmF0ZScpfVxuICAgICAgICAgIG9uRGVsZXRlPXt0aGlzLmdldENvbW1hbmQoJ3ByZXNldC1kZWxldGUnKX1cbiAgICAgICAgICBjcmVhdGVEaXNhYmxlZD17c2VsZWN0ZWRDb3VudCA9PT0gMCB8fCAhYWxsU2VsZWN0ZWRPbn1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e21lc3NhZ2VCYXIgIT09ICcnID8gJ3dpdGgtbWVzc2FnZV9iYXInIDogJyd9PlxuICAgICAgICB7bWVzc2FnZUJhcn1cbiAgICAgICAgPEhlYWRlclxuICAgICAgICAgIG9uU2hvd0dsb2JhbExvZz17dGhpcy5zaG93R2xvYmFsTG9nfVxuICAgICAgICAgIG9uU2hvd05vdGlmaWNhdGlvbnM9e3RoaXMuc2hvd05vdGlmaWNhdGlvbnN9XG4gICAgICAgIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTYgcGFuZS1zdGF0aW9uc1wiPlxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGFzaGJvYXJkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInN0YXRpb25MaXN0XCIgY2xhc3NOYW1lPVwicGFuZWwtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgIHtzdGF0aW9uc31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTYgcGFuZS1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJkYXNoYm9hcmRBY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAge2FjdGlvbnN9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8TG9nVmlld2VyIGxvZz17dGhpcy5zdGF0ZS5sb2d9IHJlZj17KGMpID0+IHsgdGhpcy5sb2dWaWV3ZXIgPSBjOyB9fSAvPlxuICAgICAgICA8Q29uc29sZVZpZXdlciBsaW5lcz17dGhpcy5zdGF0ZS5saW5lc30gcmVmPXsoYykgPT4geyB0aGlzLmNvbnNvbGVWaWV3ZXIgPSBjOyB9fSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5EYXNoYm9hcmQucHJvcFR5cGVzID0ge1xuICB1cmw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5oYW5kbGVHbG9iYWxMb2dDbGlja2VkID0gdGhpcy5oYW5kbGVHbG9iYWxMb2dDbGlja2VkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVOb3RpZmljYXRpb25zQ2xpY2tlZCA9IHRoaXMuaGFuZGxlTm90aWZpY2F0aW9uc0NsaWNrZWQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUdsb2JhbExvZ0NsaWNrZWQoZXYpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblNob3dHbG9iYWxMb2cpIHtcbiAgICAgIHRoaXMucHJvcHMub25TaG93R2xvYmFsTG9nKCk7XG4gICAgfVxuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBoYW5kbGVOb3RpZmljYXRpb25zQ2xpY2tlZChldikge1xuICAgIGlmICh0aGlzLnByb3BzLm9uU2hvd05vdGlmaWNhdGlvbnMpIHtcbiAgICAgIHRoaXMucHJvcHMub25TaG93Tm90aWZpY2F0aW9ucygpO1xuICAgIH1cbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8bmF2IGNsYXNzTmFtZT1cIm5hdmJhciBuYXZiYXItZGVmYXVsdCBuYXZiYXItZml4ZWQtdG9wXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZiYXItaGVhZGVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJuYXZiYXItdG9nZ2xlIGNvbGxhcHNlZFwiXG4gICAgICAgICAgICAgIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIlxuICAgICAgICAgICAgICBkYXRhLXRhcmdldD1cIiNicy1leGFtcGxlLW5hdmJhci1jb2xsYXBzZS0xXCJcbiAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD1cImZhbHNlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3Itb25seVwiPlRvZ2dsZSBuYXZpZ2F0aW9uPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uLWJhclwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb24tYmFyXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvbi1iYXJcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCIjXCI+SGlsYmVydDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2YmFyLWNvbGxhcHNlIGNvbGxhcHNlIG5hdmJhci1yaWdodFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IG5hdmJhci1idG5cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUdsb2JhbExvZ0NsaWNrZWR9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWRlc2t0b3BcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAmbmJzcDtcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBuYXZiYXItYnRuXCJcbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVOb3RpZmljYXRpb25zQ2xpY2tlZH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtYmVsbC1vXCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmF2PlxuICAgICk7XG4gIH1cbn1cblxuSGVhZGVyLnByb3BUeXBlcyA9IHtcbiAgb25TaG93R2xvYmFsTG9nOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgb25TaG93Tm90aWZpY2F0aW9uczogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5IZWFkZXIuZGVmYXVsdFByb3BzID0ge1xuICBvblNob3dHbG9iYWxMb2c6ICgpID0+IHt9LFxuICBvblNob3dOb3RpZmljYXRpb25zOiAoKSA9PiB7fSxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dWaWV3ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIHN0YXRpYyBmb3JtYXRUaW1lKGlzb1RpbWUpIHtcbiAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoaXNvVGltZSk7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IHllc3RlcmRheSA9IG5ldyBEYXRlKCk7XG4gICAgeWVzdGVyZGF5LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMSk7XG4gICAgbGV0IGRheSA9ICcnO1xuXG4gICAgaWYgKHRvZGF5LmdldE1vbnRoKCkgPT09IHRpbWUuZ2V0TW9udGgoKSAmJlxuICAgICAgdG9kYXkuZ2V0RnVsbFllYXIoKSA9PT0gdGltZS5nZXRGdWxsWWVhcigpICYmXG4gICAgICB0b2RheS5nZXREYXRlKCkgPT09IHRpbWUuZ2V0RGF0ZSgpKSB7XG4gICAgICBkYXkgPSAnVG9kYXknO1xuICAgIH0gZWxzZSBpZiAoeWVzdGVyZGF5LmdldE1vbnRoKCkgPT09IHRpbWUuZ2V0TW9udGgoKSAmJlxuICAgICAgeWVzdGVyZGF5LmdldEZ1bGxZZWFyKCkgPT09IHRpbWUuZ2V0RnVsbFllYXIoKSAmJlxuICAgICAgeWVzdGVyZGF5LmdldERhdGUoKSA9PT0gdGltZS5nZXREYXRlKCkpIHtcbiAgICAgIGRheSA9ICdZZXN0ZXJkYXknO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXkgPSBgJHt0aW1lLmdldEZ1bGxZZWFyKCl9LSR7dGltZS5nZXRNb250aCgpfS0ke3RpbWUuZ2V0RGF0ZSgpfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke2RheX0gJHt0aW1lLmdldEhvdXJzKCl9OiR7dGltZS5nZXRNaW51dGVzKCl9OiR7dGltZS5nZXRTZWNvbmRzKCl9YDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMubW9kYWxESVYgPSBudWxsO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCAoKSA9PiB7IHRoaXMuaGFuZGxlUmVzaXplKCk7IH0pO1xuICAgICQodGhpcy5tb2RhbERJVikub24oJ3Nob3cuYnMubW9kYWwnLCAoKSA9PiB7IHRoaXMuaGFuZGxlUmVzaXplKCk7IH0pO1xuICB9XG5cbiAgb3Blbk1vZGFsKCkge1xuICAgIGlmICh0aGlzLm1vZGFsRElWICE9PSBudWxsKSB7XG4gICAgICAkKHRoaXMubW9kYWxESVYpLm1vZGFsKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUmVzaXplKCkge1xuICAgIGNvbnN0ICRtb2RhbCA9ICQodGhpcy5tb2RhbERJVik7XG4gICAgY29uc3QgbW9kYWxIZWFkZXJIZWlnaHQgPSA1NjtcbiAgICBjb25zdCBtb2RhbE1hcmdpbiA9IDMwO1xuICAgIGNvbnN0IG1vZGFsQm9yZGVyID0gMTtcblxuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSAobW9kYWxIZWFkZXJIZWlnaHQgKyBtb2RhbE1hcmdpbiAqIDIgKyBtb2RhbEJvcmRlciAqIDIpO1xuICAgICRtb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmNzcyh7IG1heEhlaWdodDogYm9keUhlaWdodCB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCByb3dDbGFzc2VzID0ge1xuICAgICAgZXJyb3I6ICdkYW5nZXInLFxuICAgICAgd2FybmluZzogJ3dhcm5pbmcnLFxuICAgIH07XG5cbiAgICBjb25zdCBlbnRyaWVzID0gW107XG4gICAgZm9yIChjb25zdCBsb2dFbnRyeSBvZiB0aGlzLnByb3BzLmxvZykge1xuICAgICAgY29uc3Qgcm93Q2xhc3MgPSByb3dDbGFzc2VzW2xvZ0VudHJ5LnR5cGVdICE9PSB1bmRlZmluZWQgPyByb3dDbGFzc2VzW2xvZ0VudHJ5LnR5cGVdIDogJyc7XG5cbiAgICAgIGVudHJpZXMucHVzaChcbiAgICAgICAgPHRyIGtleT17bG9nRW50cnkuaWR9IGNsYXNzTmFtZT17cm93Q2xhc3N9PlxuICAgICAgICAgIDx0ZD57TG9nVmlld2VyLmZvcm1hdFRpbWUobG9nRW50cnkudGltZSl9PC90ZD5cbiAgICAgICAgICA8dGQ+e2xvZ0VudHJ5LnN0YXRpb25fbmFtZX08L3RkPlxuICAgICAgICAgIDx0ZD57bG9nRW50cnkubWVzc2FnZX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlIGxvZ1ZpZXdlci1tb2RhbFwiIHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgcmVmPXsoYykgPT4geyB0aGlzLm1vZGFsRElWID0gYzsgfX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nIG1vZGFsLWxnXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPnt0aGlzLnByb3BzLnRpdGxlfTwvaDQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUgdGFibGUtZml4ZWQgdGFibGUtY29uZGVuc2VkXCI+XG4gICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+VGltZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5TdGF0aW9uPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPk1lc3NhZ2U8L3RoPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICB7ZW50cmllc31cbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Mb2dWaWV3ZXIucHJvcFR5cGVzID0ge1xuICB0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgbG9nOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgdGltZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHN0YXRpb25faWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBzdGF0aW9uX25hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBtZXNzYWdlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIH0pXG4gICksXG59O1xuXG5Mb2dWaWV3ZXIuZGVmYXVsdFByb3BzID0ge1xuICBsb2c6IFtdLFxuICB0aXRsZTogJ0V2ZW50IExvZycsXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuL2Rhc2hib2FyZC5qc3gnO1xuXG53aW5kb3cuZGFzaGJvYXJkID0gbnVsbDtcblxuLy8gb25SZWFkeVxuJCgoKSA9PiB7XG4gIHdpbmRvdy5kYXNoYm9hcmQgPSBSZWFjdERPTS5yZW5kZXIoXG4gICAgPERhc2hib2FyZCB1cmw9XCIvYXBpL3N0YXRpb25zXCIgLz4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rhc2hib2FyZENvbnRhaW5lcicpXG4gICk7XG5cbiAgLy8gSW5zdGFsbCBjbGljayBoYW5kbGVycyBpbiBleHRlcm5hbCBtZW51cyBhbmQgYnV0dG9uc1xuICAkKCdbZGF0YS1jb21tYW5kXScpLmVhY2goZnVuY3Rpb24gc2V0Q2xpY2tIYW5kbGVyKCkge1xuICAgICQodGhpcykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB3aW5kb3cuZGFzaGJvYXJkLmdldENvbW1hbmQoJCh0aGlzKS5hdHRyKCdkYXRhLWNvbW1hbmQnKSkoKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG4vKipcbiAqIFByZXNldHMgQmxvY2sgY29tcG9uZW50XG4gKiBBbGxvd3MgYWN0aXZhdGluZywgZGVsZXRpbmcgYW5kIGNyZWF0aW5nIGNvbXBvbmVudHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlc2V0c0Jsb2NrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkUHJlc2V0OiAwLFxuICAgIH07XG4gICAgdGhpcy5jbGlja2VkQ3JlYXRlID0gdGhpcy5jbGlja2VkQ3JlYXRlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jbGlja2VkQWN0aXZhdGUgPSB0aGlzLmNsaWNrZWRBY3RpdmF0ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2xpY2tlZERlbGV0ZSA9IHRoaXMuY2xpY2tlZERlbGV0ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlUHJlc2V0Q2hhbmdlID0gdGhpcy5oYW5kbGVQcmVzZXRDaGFuZ2UuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNsaWNrZWRDcmVhdGUoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25DcmVhdGUpIHtcbiAgICAgIHRoaXMucHJvcHMub25DcmVhdGUoKTtcbiAgICB9XG4gIH1cblxuICBjbGlja2VkQWN0aXZhdGUoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25BY3RpdmF0ZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkFjdGl2YXRlKHRoaXMuc3RhdGUuc2VsZWN0ZWRQcmVzZXQpO1xuICAgIH1cbiAgfVxuXG4gIGNsaWNrZWREZWxldGUoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EZWxldGUpIHtcbiAgICAgIHRoaXMucHJvcHMub25EZWxldGUodGhpcy5zdGF0ZS5zZWxlY3RlZFByZXNldCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUHJlc2V0Q2hhbmdlKGV2KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkUHJlc2V0OiBOdW1iZXIucGFyc2VJbnQoZXYudGFyZ2V0LnZhbHVlLCAxMCkgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtcbiAgICAgIDxvcHRpb24ga2V5PVwiMFwiIHZhbHVlPVwiMFwiIC8+LFxuICAgIF07XG5cbiAgICBmb3IgKGNvbnN0IHByZXNldCBvZiB0aGlzLnByb3BzLnByZXNldHMpIHtcbiAgICAgIG9wdGlvbnMucHVzaCg8b3B0aW9uIGtleT17cHJlc2V0LmlkfSB2YWx1ZT17cHJlc2V0LmlkfT57cHJlc2V0Lm5hbWV9PC9vcHRpb24+KTtcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVEaXNhYmxlZCA9IHRoaXMucHJvcHMuY3JlYXRlRGlzYWJsZWQgPyAnIGRpc2FibGVkJyA6ICcnO1xuICAgIGNvbnN0IGFjdGlvbnNEaXNhYmxlZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRQcmVzZXQgPT09IDAgPyAnIGRpc2FibGVkJyA6ICcnO1xuXG5cbiAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwicHJlc2V0cy1ibG9ja1wiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWlubGluZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgZm9ybS1ncm91cC1taW53aWR0aFwiPlxuICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBwcmVzZXRzLWxpc3RcIlxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuc2VsZWN0ZWRQcmVzZXR9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVQcmVzZXRDaGFuZ2V9XG4gICAgICAgICAgPntvcHRpb25zfTwvc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGEgY2xhc3NOYW1lPXtgYnRuIGJ0bi13YXJuaW5nJHthY3Rpb25zRGlzYWJsZWR9YH0gb25DbGljaz17dGhpcy5jbGlja2VkQWN0aXZhdGV9PkFjdGl2YXRlIHByZXNldDwvYT5cbiAgICAgICAgPGEgY2xhc3NOYW1lPXtgYnRuIGJ0bi1kYW5nZXIke2FjdGlvbnNEaXNhYmxlZH1gfSBvbkNsaWNrPXt0aGlzLmNsaWNrZWREZWxldGV9PjxzcGFuIGNsYXNzTmFtZT1cImZhIGZhLXRyYXNoLW9cIiAvPjwvYT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmVzZXRzLWFjdGlvbnNcIj5cbiAgICAgICAgPGEgY2xhc3NOYW1lPXtgYnRuIGJ0bi1zdWNjZXNzJHtjcmVhdGVEaXNhYmxlZH1gfSBvbkNsaWNrPXt0aGlzLmNsaWNrZWRDcmVhdGV9PkNyZWF0ZSBwcmVzZXQ8L2E+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4pO1xuICB9XG59XG5cblByZXNldHNCbG9jay5wcm9wVHlwZXMgPSB7XG4gIHByZXNldHM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBzdGF0aW9uQXBwczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdE9mKFJlYWN0LlByb3BUeXBlcy5zdHJpbmcpLFxuICAgIH0pXG4gICksXG4gIG9uQ3JlYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgb25BY3RpdmF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uRGVsZXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgY3JlYXRlRGlzYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxufTtcblxuUHJlc2V0c0Jsb2NrLmRlZmF1bHRQcm9wcyA9IHtcbiAgcHJlc2V0czogW10sXG4gIG9uQ3JlYXRlOiAoKSA9PiB7fSxcbiAgb25BY3RpdmF0ZTogKCkgPT4ge30sXG4gIG9uRGVsZXRlOiAoKSA9PiB7fSxcbiAgY3JlYXRlRGlzYWJsZWQ6IGZhbHNlLFxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRpb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlT3BlblRlcm1pbmFsTG9nID0gdGhpcy5oYW5kbGVPcGVuVGVybWluYWxMb2cuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKCkge1xuICAgIHRoaXMucHJvcHMub25DbGlja1N0YXRpb24odGhpcy5wcm9wcy5zdGF0aW9uLmlkKTtcbiAgfVxuXG4gIGhhbmRsZU9wZW5UZXJtaW5hbExvZyhldikge1xuICAgIHRoaXMucHJvcHMub25PcGVuVGVybWluYWxMb2codGhpcy5wcm9wcy5zdGF0aW9uLmlkKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHN0YXRpb25DbGFzc2VzID0gW1xuICAgICAgJ3N0YXRpb24nLFxuICAgICAgYHN0YXRpb24tc3RhdGUtJHt0aGlzLnByb3BzLnN0YXRpb24uc3RhdGV9YCxcbiAgICAgIGBzdGF0aW9uLXR5cGUtJHt0aGlzLnByb3BzLnN0YXRpb24udHlwZX1gLFxuICAgIF07XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZCkge1xuICAgICAgc3RhdGlvbkNsYXNzZXMucHVzaCgnc3RhdGlvbi1zZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXt0aGlzLnByb3BzLnN0YXRpb24uaWR9XG4gICAgICAgIGNsYXNzTmFtZT17c3RhdGlvbkNsYXNzZXMuam9pbignICcpfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tc3RhdGUtbGlnaHRcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLWljb25cIj5cbiAgICAgICAgICA8aW1nIGFsdD17dGhpcy5wcm9wcy5zdGF0aW9uLmFwcH0gc3JjPXt0aGlzLnByb3BzLnN0YXRpb24uaWNvbn0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1uYW1lXCI+e3RoaXMucHJvcHMuc3RhdGlvbi5uYW1lfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tdHlwZVwiPnt0aGlzLnByb3BzLnN0YXRpb24udHlwZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLWFwcFwiPnt0aGlzLnByb3BzLnN0YXRpb24uYXBwfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tc3RhdHVzXCI+e3RoaXMucHJvcHMuc3RhdGlvbi5zdGF0dXN9PC9kaXY+XG4gICAgICAgIDxhIGNsYXNzTmFtZT1cInN0YXRpb24tb3V0cHV0LWJ1dHRvblwiIG9uQ2xpY2s9eyhldikgPT4geyB0aGlzLmhhbmRsZU9wZW5UZXJtaW5hbExvZyhldik7IH19PlxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWRlc2t0b3BcIj48L2k+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuU3RhdGlvbi5wcm9wVHlwZXMgPSB7XG4gIHN0YXRpb246IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzdGF0ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN0YXR1czogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcHA6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWNvbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBvbkNsaWNrU3RhdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uT3BlblRlcm1pbmFsTG9nOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbn07XG4iXX0=
