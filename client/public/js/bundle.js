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
        'preset-activate-selected': {
          callback: this.activatePresetOnSelected.bind(this),
          title: 'activate a preset on the selected stations',
          confirm: true
        },
        'preset-delete': {
          callback: this.deletePreset.bind(this),
          title: 'delete a preset',
          confirm: true
        },
        'preset-update': {
          callback: this.updatePreset.bind(this),
          title: 'update a preset',
          confirm: true
        },
        'preset-refresh': {
          callback: this.refreshPresets.bind(this),
          title: 'refresh presets',
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

      var preset = {
        name: '',
        stationApps: {}
      };

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.state.stations[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var station = _step6.value;

          preset.stationApps[station.id] = station.app;
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
            preset.name = result.substr(0, 50);
            _this6.sendCreatePreset(preset);
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
    key: 'activatePresetOnSelected',
    value: function activatePresetOnSelected(presetID) {
      // To Do
    }
  }, {
    key: 'deletePreset',
    value: function deletePreset(presetID) {
      var _this9 = this;

      $.ajax({
        url: '/api/preset/' + presetID,
        method: 'delete',
        contentType: 'application/json',
        cache: false,
        success: function success() {
          _this9.fetchPresets();
        },
        error: function error(xhr, status, err) {
          return console.error(status, err.toString());
        }
      });
    }
  }, {
    key: 'updatePreset',
    value: function updatePreset(presetID) {
      var _this10 = this;

      var preset = {
        id: presetID,
        stationApps: {}
      };

      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.state.stations[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var station = _step7.value;

          preset.stationApps[station.id] = station.app;
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

      $.ajax({
        url: '/api/preset/' + presetID,
        method: 'put',
        contentType: 'application/json',
        data: JSON.stringify(preset),
        dataType: 'json',
        cache: false,
        success: function success() {
          _this10.fetchPresets();
        },
        error: function error(xhr, status, err) {
          return console.error(status, err.toString());
        }
      });
    }
  }, {
    key: 'refreshPresets',
    value: function refreshPresets() {
      this.fetchPresets();
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
      var _this11 = this;

      var minPollTime = 500;
      var retryPollTime = minPollTime;
      var retryIncreaseFactor = 2;
      var maxRetryPollTime = 4000;

      var loop = function loop() {
        _this11.pollServer().then(function () {
          setTimeout(loop, minPollTime);
          retryPollTime = minPollTime;
          if (_this11.state.serverConnectionError) {
            _this11.setState({ serverConnectionError: false });
          }
          _this11.serverConnectionRetry = 0;
        }).catch(function () {
          setTimeout(loop, retryPollTime);
          if (retryPollTime < maxRetryPollTime) {
            retryPollTime = retryPollTime * retryIncreaseFactor;
          }
          _this11.serverConnectionRetry++;
          if (_this11.serverConnectionRetry > 5) {
            _this11.setState({ serverConnectionError: true });
            // Reset the updateID so the next poll returns immediately
            // instead of being a long poll
            _this11.updateID = 0;
          }
        });
      };
      loop();
    }
  }, {
    key: 'pollServer',
    value: function pollServer() {
      var _this12 = this;

      return new Promise(function (resolve, reject) {
        $.ajax({
          url: '/api/stations',
          data: {
            lastUpdateID: _this12.updateID
          },
          dataType: 'json',
          cache: false,
          timeout: 30000,
          success: function success(data) {
            if (data.stations !== undefined) {
              _this12.updateID = data.updateID;
              _this12.setState({ stations: data.stations });
            }
            resolve();
          },
          error: function error(xhr, status, err) {
            console.error(_this12.props.url, status, err.toString());
            reject();
          }
        });
      });
    }
  }, {
    key: 'fetchPresets',
    value: function fetchPresets() {
      var _this13 = this;

      return new Promise(function (resolve, reject) {
        $.ajax({
          url: '/api/presets',
          cache: false,
          timeout: 30000,
          dataType: 'json',
          success: function success(data) {
            if (data.presets !== undefined) {
              _this13.setState({ presets: data.presets });
            }
            resolve();
          },
          error: function error(xhr, status, err) {
            console.error(_this13.props.url, status, err.toString());
            reject();
          }
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this14 = this;

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
          selected: _this14.state.selection.has(station.id),
          onClickStation: _this14.selectToggle,
          onOpenTerminalLog: _this14.showTerminalLog
        }));
      });

      var counts = {};
      this.state.stations.forEach(function (station) {
        if (!counts.hasOwnProperty(_this14.displayState(station.state))) {
          counts[_this14.displayState(station.state)] = 0;
        }
        counts[_this14.displayState(station.state)]++;
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
            _this14.deselectAll();
            _this14.setState({ visibleState: option });
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
            _this14.deselectAll();
            _this14.setState({ visibleType: option });
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
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this.state.selection[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var selectedID = _step8.value;

          if (lastType === null) {
            lastType = this.getStationState(selectedID).type;
          }
          if (this.getStationState(selectedID).type !== lastType) {
            selectedAreSameType = false;
            break;
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

      var allSelectedOn = true;
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = this.state.selection[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var _selectedID = _step9.value;

          if (this.getStationState(_selectedID).state !== 'on') {
            allSelectedOn = false;
            break;
          }
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      var canChangeApp = allSelectedOn && selectedCount > 0 && selectedAreSameType;

      var applications = [];
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = this.state.stations[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var station = _step10.value;

          if (this.state.selection.has(station.id)) {
            applications = station.possible_apps;
          }
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
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

      return _react2.default.createElement(
        'div',
        { className: messageBar !== '' ? 'with-message_bar' : '' },
        messageBar,
        _react2.default.createElement(
          _header2.default,
          {
            onShowGlobalLog: this.showGlobalLog,
            onShowNotifications: this.showNotifications
          },
          _react2.default.createElement(_presetsBlock2.default, {
            presets: this.state.presets,
            stationsSelected: selectedCount > 0,
            onCreate: this.getCommand('preset-create'),
            onActivate: this.getCommand('preset-activate'),
            onActivateOnSelected: this.getCommand('preset-activate-selected'),
            onDelete: this.getCommand('preset-delete'),
            onUpdate: this.getCommand('preset-update'),
            onRefresh: this.getCommand('preset-refresh')
          })
        ),
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
            _this14.logViewer = c;
          } }),
        _react2.default.createElement(_consoleViewer2.default, { lines: this.state.lines, ref: function ref(c) {
            _this14.consoleViewer = c;
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
          this.props.children,
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
  onShowNotifications: _react2.default.PropTypes.func,
  children: _react2.default.PropTypes.node
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

var PresetsBlock = function (_React$Component) {
  _inherits(PresetsBlock, _React$Component);

  function PresetsBlock(props) {
    _classCallCheck(this, PresetsBlock);

    var _this = _possibleConstructorReturn(this, (PresetsBlock.__proto__ || Object.getPrototypeOf(PresetsBlock)).call(this, props));

    _this.state = {
      selectedPreset: 0
    };
    _this.handlePresetChange = _this.handlePresetChange.bind(_this);
    _this.handleActivate = _this.handleActivate.bind(_this);
    _this.handleActivateOnSelected = _this.handleActivateOnSelected.bind(_this);
    _this.handleSave = _this.handleSave.bind(_this);
    _this.handleDelete = _this.handleDelete.bind(_this);
    _this.handleNew = _this.handleNew.bind(_this);
    _this.handleRefresh = _this.handleRefresh.bind(_this);
    return _this;
  }

  _createClass(PresetsBlock, [{
    key: "handlePresetChange",
    value: function handlePresetChange(ev) {
      this.setState({ selectedPreset: Number.parseInt(ev.target.value, 10) });
    }
  }, {
    key: "handleActivate",
    value: function handleActivate() {
      if (this.state.selectedPreset !== 0) {
        this.props.onActivate(this.state.selectedPreset);
      }
    }
  }, {
    key: "handleActivateOnSelected",
    value: function handleActivateOnSelected() {
      if (this.state.selectedPreset !== 0) {
        this.props.onActivateOnSelected(this.state.selectedPreset);
      }
    }
  }, {
    key: "handleSave",
    value: function handleSave() {
      if (this.state.selectedPreset !== 0) {
        this.props.onUpdate(this.state.selectedPreset);
      }
    }
  }, {
    key: "handleDelete",
    value: function handleDelete() {
      if (this.state.selectedPreset !== 0) {
        this.props.onDelete(this.state.selectedPreset);
        this.setState({ selectedPreset: 0 });
      }
    }
  }, {
    key: "handleRefresh",
    value: function handleRefresh() {
      this.props.onRefresh(this.state.selectedPreset);
    }
  }, {
    key: "handleNew",
    value: function handleNew() {
      this.props.onCreate();
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

      var actionsDisabled = this.state.selectedPreset === 0;

      return _react2.default.createElement(
        "div",
        { className: "navbar-form navbar-left" },
        "Presets  ",
        _react2.default.createElement(
          "div",
          { className: "input-group" },
          _react2.default.createElement(
            "select",
            {
              className: "form-control presets-list",
              value: this.state.selectedPreset,
              onChange: this.handlePresetChange
            },
            options
          ),
          _react2.default.createElement(
            "div",
            { className: "input-group-btn" },
            _react2.default.createElement(
              "button",
              {
                href: "#",
                className: "dropdown-toggle btn btn-default",
                "data-toggle": "dropdown"
              },
              _react2.default.createElement("span", { className: "caret" })
            ),
            _react2.default.createElement(
              "ul",
              { className: "dropdown-menu" },
              _react2.default.createElement(
                "li",
                { className: actionsDisabled ? 'disabled' : '' },
                _react2.default.createElement(
                  "a",
                  { href: "#", onClick: this.handleActivate },
                  "Activate"
                )
              ),
              _react2.default.createElement(
                "li",
                { className: actionsDisabled ? 'disabled' : '' },
                _react2.default.createElement(
                  "a",
                  { href: "#", onClick: this.handleSave },
                  "Save changes"
                )
              ),
              _react2.default.createElement(
                "li",
                { className: actionsDisabled ? 'disabled' : '' },
                _react2.default.createElement(
                  "a",
                  { href: "#", onClick: this.handleDelete },
                  "Delete"
                )
              ),
              _react2.default.createElement("li", { className: "divider" }),
              _react2.default.createElement(
                "li",
                null,
                _react2.default.createElement(
                  "a",
                  { href: "#", onClick: this.handleNew },
                  "New preset..."
                )
              ),
              _react2.default.createElement("li", { className: "divider" }),
              _react2.default.createElement(
                "li",
                null,
                _react2.default.createElement(
                  "a",
                  { href: "#", onClick: this.handleRefresh },
                  "Refresh"
                )
              )
            )
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
  stationsSelected: _react2.default.PropTypes.bool,
  onCreate: _react2.default.PropTypes.func,
  onActivate: _react2.default.PropTypes.func,
  onActivateOnSelected: _react2.default.PropTypes.func,
  onDelete: _react2.default.PropTypes.func,
  onUpdate: _react2.default.PropTypes.func,
  onRefresh: _react2.default.PropTypes.func
};

PresetsBlock.defaultProps = {
  presets: [],
  stationsSelected: false,
  onCreate: function onCreate() {},
  onActivate: function onActivate() {},
  onActivateOnSelected: function onActivateOnSelected() {},
  onDelete: function onDelete() {},
  onUpdate: function onUpdate() {},
  onRefresh: function onRefresh() {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwU2VsZWN0LmpzeCIsInNyYy9idXR0b25GaWx0ZXIuanN4Iiwic3JjL2NvbnNvbGVWaWV3ZXIuanN4Iiwic3JjL2Rhc2hib2FyZC5qc3giLCJzcmMvaGVhZGVyLmpzeCIsInNyYy9sb2dWaWV3ZXIuanN4Iiwic3JjL21haW4uanN4Iiwic3JjL3ByZXNldHNCbG9jay5qc3giLCJzcmMvc3RhdGlvbi5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUFFQTs7OztJQUlxQixTOzs7QUFFbkIscUJBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLHNIQUNYLEtBRFc7O0FBRWpCLFVBQUssV0FBTCxHQUFtQixJQUFuQjtBQUNBLFVBQUssZ0JBQUwsR0FBd0IsTUFBSyxnQkFBTCxDQUFzQixJQUF0QixPQUF4QjtBQUhpQjtBQUlsQjs7Ozt1Q0FFa0I7QUFDakIsVUFBSSxLQUFLLEtBQUwsQ0FBVyxRQUFmLEVBQXlCO0FBQ3ZCLGFBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsS0FBSyxXQUFMLENBQWlCLEtBQXJDO0FBQ0Q7QUFDRjs7OzZCQUVRO0FBQUE7O0FBQ1AsVUFBTSxlQUFlLEVBQXJCOztBQUVBLFVBQUksS0FBSyxLQUFMLENBQVcsVUFBZixFQUEyQjtBQUN6QixxQkFBYSxJQUFiLENBQ0U7QUFBQTtBQUFBLFlBQVEsS0FBSSxNQUFaLEVBQW1CLE9BQU0sRUFBekI7QUFBQTtBQUFBLFNBREY7QUFHRDs7QUFQTTtBQUFBO0FBQUE7O0FBQUE7QUFTUCw2QkFBMEIsS0FBSyxLQUFMLENBQVcsWUFBckMsOEhBQW1EO0FBQUEsY0FBeEMsV0FBd0M7O0FBQ2pELHVCQUFhLElBQWIsQ0FDRTtBQUFBO0FBQUEsY0FBUSxLQUFLLFdBQWIsRUFBMEIsT0FBTyxXQUFqQztBQUErQztBQUEvQyxX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QWdCLElBVlI7QUFXbEIsa0JBQWdCLGdCQUFNLFNBQU4sQ0FBZ0IsSUFYZDtBQVlsQixxQkFBbUIsZ0JBQU0sU0FBTixDQUFnQjtBQVpqQixDQUFwQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG4vKipcbiAqIEFwcFNlbGVjdCBjb21wb25lbnRcbiAqIEFsbG93cyB0aGUgdXNlciB0byBzZWxlY3QgYW4gYXBwbGljYXRpb24gZnJvbSBhIGxpc3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwU2VsZWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmFwcFNlbGVjdG9yID0gbnVsbDtcbiAgICB0aGlzLmNsaWNrZWRDaGFuZ2VBcHAgPSB0aGlzLmNsaWNrZWRDaGFuZ2VBcHAuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNsaWNrZWRDaGFuZ2VBcHAoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5hcHBTZWxlY3Rvci52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGFwcGxpY2F0aW9ucyA9IFtdO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuYWxsb3dCbGFuaykge1xuICAgICAgYXBwbGljYXRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PVwibnVsbFwiIHZhbHVlPVwiXCI+Jm5ic3A7PC9vcHRpb24+XG4gICAgICApO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgYXBwbGljYXRpb24gb2YgdGhpcy5wcm9wcy5hcHBsaWNhdGlvbnMpIHtcbiAgICAgIGFwcGxpY2F0aW9ucy5wdXNoKFxuICAgICAgICA8b3B0aW9uIGtleT17YXBwbGljYXRpb259IHZhbHVlPXthcHBsaWNhdGlvbn0+e2FwcGxpY2F0aW9ufTwvb3B0aW9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBkaXNhYmxlZENsYXNzID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPyAnIGRpc2FibGVkJyA6ICcnKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGFwcFNlbGVjdCR7ZGlzYWJsZWRDbGFzc31gfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWlubGluZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBmb3JtLWdyb3VwLW1pbndpZHRoXCI+XG4gICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCR7ZGlzYWJsZWRDbGFzc31gfVxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuZGVmYXVsdFZhbHVlID8gdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgOiAnJ31cbiAgICAgICAgICAgICAgcmVmPXsoc2VsKSA9PiB7IHRoaXMuYXBwU2VsZWN0b3IgPSBzZWw7IH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHthcHBsaWNhdGlvbnN9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAmbmJzcDtcbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi13YXJuaW5nJHtkaXNhYmxlZENsYXNzfWB9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNsaWNrZWRDaGFuZ2VBcHB9XG4gICAgICAgICAgPkNoYW5nZSBhcHBsaWNhdGlvbjwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkFwcFNlbGVjdC5wcm9wVHlwZXMgPSB7XG4gIGFwcGxpY2F0aW9uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICApLFxuICBkZWZhdWx0VmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGFsbG93Qmxhbms6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbn07XG5cbkFwcFNlbGVjdC5kZWZhdWx0UHJvcHMgPSB7XG4gIGFwcGxpY2F0aW9uczogW10sXG4gIGRlZmF1bHRWYWx1ZTogJycsXG4gIGFsbG93Qmxhbms6IGZhbHNlLFxuICBkaXNhYmxlZDogZmFsc2UsXG4gIG9uQ2hhbmdlOiAoKSA9PiB7fSxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBCdXR0b25GaWx0ZXIgPSAocHJvcHMpID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuXG4gIGZvciAoY29uc3Qgb3B0aW9uIG9mIHByb3BzLm9wdGlvbnMpIHtcbiAgICBjb25zdCBjbGFzc2VzID0gWydidG4nLCAnYnRuLWRlZmF1bHQnLCBgYnV0dG9uLWZpbHRlci1vcHRpb24tJHtvcHRpb259YF07XG4gICAgaWYgKHByb3BzLnZhbHVlID09PSBvcHRpb24pIHtcbiAgICAgIGNsYXNzZXMucHVzaCgnYWN0aXZlJyk7XG4gICAgfVxuICAgIGxldCBjb3VudGVyID0gJyc7XG4gICAgbGV0IHNwYWNpbmcgPSAnJztcbiAgICBpZiAocHJvcHMuY291bnRzICE9PSBudWxsKSB7XG4gICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgaWYgKHByb3BzLmNvdW50cy5oYXNPd25Qcm9wZXJ0eShvcHRpb24pICYmIHByb3BzLmNvdW50c1tvcHRpb25dICE9PSAwKSB7XG4gICAgICAgIGNvdW50ID0gcHJvcHMuY291bnRzW29wdGlvbl07XG4gICAgICB9XG4gICAgICBjb25zdCBiYWRnZUNsYXNzZXMgPSBgYmFkZ2Uke2NvdW50ID09PSAwID8gJyB6ZXJvJyA6ICcgbm9uLXplcm8nfWA7XG4gICAgICBjb3VudGVyID0gKDxzcGFuIGNsYXNzTmFtZT17YmFkZ2VDbGFzc2VzfT57Y291bnR9PC9zcGFuPik7XG4gICAgICBzcGFjaW5nID0gJyAnO1xuICAgIH1cbiAgICBvcHRpb25zLnB1c2goXG4gICAgICA8YVxuICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKCcgJyl9XG4gICAgICAgIGtleT17b3B0aW9ufVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBwcm9wcy5vbkNoYW5nZShvcHRpb24pfVxuICAgICAgPntvcHRpb259e3NwYWNpbmd9e2NvdW50ZXJ9PC9hPlxuICAgICk7XG4gIH1cblxuICBjb25zdCBkZWZhdWx0Q2xhc3NlcyA9IFsnYnRuJywgJ2J0bi1kZWZhdWx0J107XG4gIGlmIChwcm9wcy52YWx1ZSA9PT0gJycpIHtcbiAgICBkZWZhdWx0Q2xhc3Nlcy5wdXNoKCdhY3RpdmUnKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJidG4tdG9vbGJhciBidXR0b24tZmlsdGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cFwiPlxuICAgICAgICA8YVxuICAgICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgICBjbGFzc05hbWU9e2RlZmF1bHRDbGFzc2VzLmpvaW4oJyAnKX1cbiAgICAgICAgICBrZXk9XCJudWxsXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBwcm9wcy5vbkNoYW5nZSgnJyl9XG4gICAgICAgID57cHJvcHMuYWxsVGV4dH08L2E+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgIHtvcHRpb25zfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5CdXR0b25GaWx0ZXIucHJvcFR5cGVzID0ge1xuICBvcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nKSxcbiAgY291bnRzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gIGFsbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5CdXR0b25GaWx0ZXIuZGVmYXVsdFByb3BzID0ge1xuICBvcHRpb25zOiBbXSxcbiAgY291bnRzOiBudWxsLFxuICBhbGxUZXh0OiAnQWxsJyxcbiAgdmFsdWU6ICcnLFxuICBvbkNoYW5nZTogKCkgPT4ge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25GaWx0ZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zb2xlVmlld2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLm1vZGFsRElWID0gbnVsbDtcbiAgfVxuXG4gIG9wZW5Nb2RhbCgpIHtcbiAgICBpZiAodGhpcy5tb2RhbERJViAhPT0gbnVsbCkge1xuICAgICAgJCh0aGlzLm1vZGFsRElWKS5tb2RhbCgpO1xuICAgICAgJCh0aGlzLm1vZGFsRElWKS5vbignc2hvd24uYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgbW9kYWxCb2R5ID0gJCh0aGlzKS5maW5kKCcubW9kYWwtYm9keScpLmZpcnN0KClbMF07XG4gICAgICAgIG1vZGFsQm9keS5zY3JvbGxUb3AgPSBNYXRoLm1heChtb2RhbEJvZHkuc2Nyb2xsSGVpZ2h0LCBtb2RhbEJvZHkuY2xpZW50SGVpZ2h0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICQod2luZG93KS5vbigncmVzaXplJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgICAkKHRoaXMubW9kYWxESVYpLm9uKCdzaG93LmJzLm1vZGFsJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZSgpIHtcbiAgICBjb25zdCAkbW9kYWwgPSAkKHRoaXMubW9kYWxESVYpO1xuICAgIGNvbnN0IG1vZGFsSGVhZGVySGVpZ2h0ID0gNTY7XG4gICAgY29uc3QgbW9kYWxNYXJnaW4gPSAzMDtcbiAgICBjb25zdCBtb2RhbEJvcmRlciA9IDE7XG5cbiAgICBjb25zdCBib2R5SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gKG1vZGFsSGVhZGVySGVpZ2h0ICsgbW9kYWxNYXJnaW4gKiAyICsgbW9kYWxCb3JkZXIgKiAyKTtcbiAgICAkbW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5jc3MoeyBtYXhIZWlnaHQ6IGJvZHlIZWlnaHQgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZSBjb25zb2xlVmlld2VyLW1vZGFsXCIgdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiByZWY9eyhjKSA9PiB7IHRoaXMubW9kYWxESVYgPSBjOyB9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2cgbW9kYWwtbGdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+e3RoaXMucHJvcHMudGl0bGV9PC9oND5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgIDxwcmU+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGluZXMuam9pbignXFxuJyl9XG4gICAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Db25zb2xlVmlld2VyLnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGxpbmVzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nKSxcbn07XG5cbkNvbnNvbGVWaWV3ZXIuZGVmYXVsdFByb3BzID0ge1xuICB0aXRsZTogJ1Rlcm1pbmFsIE91dHB1dCcsXG4gIGxpbmVzOiBbXSxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFN0YXRpb24gZnJvbSAnLi9zdGF0aW9uLmpzeCc7XG5pbXBvcnQgQXBwU2VsZWN0IGZyb20gJy4vYXBwU2VsZWN0LmpzeCc7XG5pbXBvcnQgQnV0dG9uRmlsdGVyIGZyb20gJy4vYnV0dG9uRmlsdGVyLmpzeCc7XG5pbXBvcnQgTG9nVmlld2VyIGZyb20gJy4vbG9nVmlld2VyLmpzeCc7XG5pbXBvcnQgQ29uc29sZVZpZXdlciBmcm9tICcuL2NvbnNvbGVWaWV3ZXIuanN4JztcbmltcG9ydCBQcmVzZXRzQmxvY2sgZnJvbSAnLi9wcmVzZXRzQmxvY2suanN4JztcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi9oZWFkZXIuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFzaGJvYXJkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc3RhdGlvbnM6IFtdLFxuICAgICAgc2VsZWN0aW9uOiBuZXcgU2V0KCksXG4gICAgICB2aXNpYmxlVHlwZTogJycsXG4gICAgICB2aXNpYmxlU3RhdGU6ICcnLFxuICAgICAgbG9nOiBbXSxcbiAgICAgIHNlcnZlckNvbm5lY3Rpb25FcnJvcjogZmFsc2UsXG4gICAgICBwcmVzZXRzOiBbXSxcbiAgICB9O1xuICAgIHRoaXMuc2VsZWN0VG9nZ2xlID0gdGhpcy5zZWxlY3RUb2dnbGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNoYW5nZUFwcFNlbGVjdGVkID0gdGhpcy5jaGFuZ2VBcHBTZWxlY3RlZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2hvd1Rlcm1pbmFsTG9nID0gdGhpcy5zaG93VGVybWluYWxMb2cuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNob3dHbG9iYWxMb2cgPSB0aGlzLnNob3dHbG9iYWxMb2cuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNob3dOb3RpZmljYXRpb25zID0gdGhpcy5zaG93Tm90aWZpY2F0aW9ucy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY29tbWFuZHMgPSB7fTtcbiAgICB0aGlzLmluaXRDb21tYW5kcygpO1xuICAgIHRoaXMuZ2V0Q29tbWFuZCA9IHRoaXMuZ2V0Q29tbWFuZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9nVmlld2VyID0gbnVsbDtcbiAgICB0aGlzLmNvbnNvbGVWaWV3ZXIgPSBudWxsO1xuICAgIHRoaXMudXBkYXRlSUQgPSAwO1xuICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5ID0gMDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucG9sbExvb3AoKTtcbiAgICB0aGlzLmZldGNoUHJlc2V0cygpO1xuICB9XG5cbiAgZ2V0U3RhdGlvblN0YXRlKHN0YXRpb25JRCkge1xuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiB0aGlzLnN0YXRlLnN0YXRpb25zKSB7XG4gICAgICBpZiAoc3RhdGlvbi5pZCA9PT0gc3RhdGlvbklEKSB7XG4gICAgICAgIHJldHVybiBzdGF0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldFN0YXRpb25UeXBlcygpIHtcbiAgICBjb25zdCB0eXBlcyA9IG5ldyBTZXQoKTtcbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgdHlwZXMuYWRkKHN0YXRpb24udHlwZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEFycmF5LmZyb20odHlwZXMpO1xuICB9XG5cbiAgZ2V0Q29tbWFuZChjb21tYW5kTmFtZSkge1xuICAgIGlmICh0aGlzLmNvbW1hbmRzW2NvbW1hbmROYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb21tYW5kc1tjb21tYW5kTmFtZV0uZG9DYWxsYmFjaztcbiAgICB9XG4gICAgdGhyb3cgRXJyb3IoYENhbGwgdG8gaW52YWxpZCBjb21tYW5kICR7Y29tbWFuZE5hbWV9YCk7XG4gIH1cblxuICBnZXRWaXNpYmxlU3RhdGlvbnMoKSB7XG4gICAgY29uc3QgYW5zd2VyID0gW107XG5cbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgaWYgKCh0aGlzLnN0YXRlLnZpc2libGVUeXBlID09PSAnJyB8fCBzdGF0aW9uLnR5cGUgPT09IHRoaXMuc3RhdGUudmlzaWJsZVR5cGUpICYmXG4gICAgICAgICAgKHRoaXMuc3RhdGUudmlzaWJsZVN0YXRlID09PSAnJyB8fFxuICAgICAgICAgICB0aGlzLmRpc3BsYXlTdGF0ZShzdGF0aW9uLnN0YXRlKSA9PT0gdGhpcy5zdGF0ZS52aXNpYmxlU3RhdGUpKSB7XG4gICAgICAgIGFuc3dlci5wdXNoKHN0YXRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhbnN3ZXI7XG4gIH1cblxuICBkaXNwbGF5U3RhdGUoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUgPT09ICdzdGFydGluZ19zdGF0aW9uJyB8fFxuICAgICAgc3RhdGUgPT09ICdzdGFydGluZ19hcHAnIHx8XG4gICAgICBzdGF0ZSA9PT0gJ3N0b3BwaW5nJyB8fFxuICAgICAgc3RhdGUgPT09ICdzd2l0Y2hpbmdfYXBwJykge1xuICAgICAgcmV0dXJuICdidXN5JztcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBhdHRhY2hDb25maXJtYXRpb24odGV4dCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgIGJvb3Rib3guZGlhbG9nKHtcbiAgICAgICAgbWVzc2FnZTogdGV4dCxcbiAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgIHdhcm5pbmc6IHtcbiAgICAgICAgICAgIGxhYmVsOiAnQ29uZmlybScsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdidG4td2FybmluZycsXG4gICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2suYmluZCh0aGlzLCAuLi5hcmdzKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNhbmNlbDoge1xuICAgICAgICAgICAgbGFiZWw6ICdDYW5jZWwnLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuLWRlZmF1bHQnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgaW5pdENvbW1hbmRzKCkge1xuICAgIHRoaXMuY29tbWFuZHMgPSB7XG4gICAgICAnc3RhdGlvbnMtYWxsLXN0YXJ0Jzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5zdGFydEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3N0YXJ0IGFsbCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IHRydWUsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLWFsbC1zdG9wJzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5zdG9wQWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RvcCBhbGwgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1hbGwtc2VsZWN0Jzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5zZWxlY3RBbGwuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzZWxlY3QgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLWFsbC1kZXNlbGVjdCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuZGVzZWxlY3RBbGwuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdkZXNlbGVjdCBhbGwgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtc2VsZWN0ZWQtc3RhcnQnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnN0YXJ0U2VsZWN0ZWQuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzdGFydCB0aGUgc2VsZWN0ZWQgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1zZWxlY3RlZC1zdG9wJzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5zdG9wU2VsZWN0ZWQuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzdG9wIHRoZSBzZWxlY3RlZCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IHRydWUsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLXZpc2libGUtc2VsZWN0Jzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5zZWxlY3RBbGxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc2VsZWN0IHZpc2libGUgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICAncHJlc2V0LWNyZWF0ZSc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuY3JlYXRlUHJlc2V0LmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnY3JlYXRlIGEgcHJlc2V0JyxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgJ3ByZXNldC1hY3RpdmF0ZSc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuYWN0aXZhdGVQcmVzZXQuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdhY3RpdmF0ZSBhIHByZXNldCcsXG4gICAgICAgIGNvbmZpcm06IHRydWUsXG4gICAgICB9LFxuICAgICAgJ3ByZXNldC1hY3RpdmF0ZS1zZWxlY3RlZCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuYWN0aXZhdGVQcmVzZXRPblNlbGVjdGVkLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnYWN0aXZhdGUgYSBwcmVzZXQgb24gdGhlIHNlbGVjdGVkIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAncHJlc2V0LWRlbGV0ZSc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuZGVsZXRlUHJlc2V0LmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnZGVsZXRlIGEgcHJlc2V0JyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAncHJlc2V0LXVwZGF0ZSc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMudXBkYXRlUHJlc2V0LmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAndXBkYXRlIGEgcHJlc2V0JyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAncHJlc2V0LXJlZnJlc2gnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnJlZnJlc2hQcmVzZXRzLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAncmVmcmVzaCBwcmVzZXRzJyxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXModGhpcy5jb21tYW5kcykpIHtcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSB0aGlzLmNvbW1hbmRzW25hbWVdO1xuICAgICAgaWYgKGNvbW1hbmQuY29uZmlybSkge1xuICAgICAgICB0aGlzLmNvbW1hbmRzW25hbWVdLmRvQ2FsbGJhY2sgPSB0aGlzLmF0dGFjaENvbmZpcm1hdGlvbihcbiAgICAgICAgICBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvICR7Y29tbWFuZC50aXRsZX0/YCxcbiAgICAgICAgICBjb21tYW5kLmNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbW1hbmRzW25hbWVdLmRvQ2FsbGJhY2sgPSBjb21tYW5kLmNhbGxiYWNrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFsbFN0YXRpb25JRHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGlvbklEcyh0aGlzLnN0YXRlLnN0YXRpb25zKTtcbiAgfVxuXG4gIHN0YXRpb25JRHMoc3RhdGlvbnMpIHtcbiAgICBjb25zdCBpZHMgPSBuZXcgU2V0KCk7XG5cbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2Ygc3RhdGlvbnMpIHtcbiAgICAgIGlkcy5hZGQoc3RhdGlvbi5pZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlkcztcbiAgfVxuXG4gIHNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW9uOiB0aGlzLmFsbFN0YXRpb25JRHMoKSB9KTtcbiAgfVxuXG4gIHNlbGVjdEFsbFZpc2libGUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogdGhpcy5zdGF0aW9uSURzKHRoaXMuZ2V0VmlzaWJsZVN0YXRpb25zKCkpIH0pO1xuICB9XG5cbiAgZGVzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogbmV3IFNldCgpIH0pO1xuICB9XG5cbiAgc2VsZWN0VG9nZ2xlKGlkKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0aW9uLmhhcyhpZCkpIHtcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmRlbGV0ZShpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmFkZChpZCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3Rpb246IHRoaXMuc3RhdGUuc2VsZWN0aW9uIH0pO1xuICB9XG5cbiAgc3RvcFN0YXRpb25zKHN0YXRpb25JRHMpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9zdGF0aW9ucy9zdG9wJyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgaWRzOiBBcnJheS5mcm9tKHN0YXRpb25JRHMpLFxuICAgICAgfSksXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4ge30sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gIH1cblxuICBzdG9wU2VsZWN0ZWQoKSB7XG4gICAgdGhpcy5zdG9wU3RhdGlvbnModGhpcy5zdGF0ZS5zZWxlY3Rpb24pO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHN0b3BBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcFN0YXRpb25zKHRoaXMuYWxsU3RhdGlvbklEcygpKTtcbiAgfVxuXG4gIHN0YXJ0U3RhdGlvbnMoc3RhdGlvbklEcykge1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvYXBpL3N0YXRpb25zL3N0YXJ0JyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgaWRzOiBBcnJheS5mcm9tKHN0YXRpb25JRHMpLFxuICAgICAgfSksXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4ge30sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gIH1cblxuICBzdGFydFNlbGVjdGVkKCkge1xuICAgIHRoaXMuc3RhcnRTdGF0aW9ucyh0aGlzLnN0YXRlLnNlbGVjdGlvbik7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICB9XG5cbiAgc3RhcnRBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhcnRTdGF0aW9ucyh0aGlzLmFsbFN0YXRpb25JRHMoKSk7XG4gIH1cblxuICBjaGFuZ2VBcHBTZWxlY3RlZChhcHApIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9zdGF0aW9ucy9jaGFuZ2VfYXBwJyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgaWRzOiBBcnJheS5mcm9tKHRoaXMuc3RhdGUuc2VsZWN0aW9uKSxcbiAgICAgICAgYXBwLFxuICAgICAgfSksXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4ge30sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICB9XG5cbiAgc2hvd1Rlcm1pbmFsTG9nKHN0YXRpb25JRCkge1xuICAgIGlmICh0aGlzLmNvbnNvbGVWaWV3ZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY29uc29sZVZpZXdlci5vcGVuTW9kYWwoKTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYC9hcGkvc3RhdGlvbi8ke3N0YXRpb25JRH0vb3V0cHV0YCxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdGl0bGU6IHN0YXRpb25JRCxcbiAgICAgICAgICAgIGxpbmVzOiBkYXRhLmxpbmVzLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzaG93R2xvYmFsTG9nKCkge1xuICAgIGlmICh0aGlzLmNvbnNvbGVWaWV3ZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY29uc29sZVZpZXdlci5vcGVuTW9kYWwoKTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvc2VydmVyL291dHB1dCcsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHRpdGxlOiAnR2xvYmFsIG91dHB1dCcsXG4gICAgICAgICAgICBsaW5lczogZGF0YS5saW5lcyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2hvd05vdGlmaWNhdGlvbnMoKSB7XG4gICAgaWYgKHRoaXMubG9nVmlld2VyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmxvZ1ZpZXdlci5vcGVuTW9kYWwoKTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvbm90aWZpY2F0aW9ucycsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG9nOiBkYXRhLm5vdGlmaWNhdGlvbnMucmV2ZXJzZSgpIH0pO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVQcmVzZXQoKSB7XG4gICAgY29uc3QgcHJlc2V0ID0ge1xuICAgICAgbmFtZTogJycsXG4gICAgICBzdGF0aW9uQXBwczoge30sXG4gICAgfTtcblxuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiB0aGlzLnN0YXRlLnN0YXRpb25zKSB7XG4gICAgICBwcmVzZXQuc3RhdGlvbkFwcHNbc3RhdGlvbi5pZF0gPSBzdGF0aW9uLmFwcDtcbiAgICB9XG5cbiAgICBib290Ym94LnByb21wdCh7XG4gICAgICBzaXplOiAnc21hbGwnLFxuICAgICAgdGl0bGU6ICdFbnRlciBhIG5hbWUgZm9yIHRoZSBwcmVzZXQnLFxuICAgICAgbWVzc2FnZTogYFRoZSBwcmVzZXQgaW5jbHVkZXMgdGhlICR7dGhpcy5zdGF0ZS5zZWxlY3Rpb24ubGVuZ3RofSBzZWxlY3RlZCBzdGF0aW9uc2AsXG4gICAgICBidXR0b25zOiB7XG4gICAgICAgIGNvbmZpcm06IHtcbiAgICAgICAgICBsYWJlbDogJ0NyZWF0ZScsXG4gICAgICAgICAgY2xhc3NOYW1lOiAnYnRuLXN1Y2Nlc3MnLFxuICAgICAgICB9LFxuICAgICAgICBjYW5jZWw6IHtcbiAgICAgICAgICBsYWJlbDogJ0NhbmNlbCcsXG4gICAgICAgICAgY2xhc3NOYW1lOiAnYnRuLWRlZmF1bHQnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGNhbGxiYWNrOiAocmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IG51bGwpIHtcbiAgICAgICAgICBwcmVzZXQubmFtZSA9IHJlc3VsdC5zdWJzdHIoMCwgNTApO1xuICAgICAgICAgIHRoaXMuc2VuZENyZWF0ZVByZXNldChwcmVzZXQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgc2VuZENyZWF0ZVByZXNldChwcmVzZXQpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9wcmVzZXQnLFxuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocHJlc2V0KSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuZmV0Y2hQcmVzZXRzKCk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICB9XG5cbiAgYWN0aXZhdGVQcmVzZXQocHJlc2V0SUQpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiBgL2FwaS9wcmVzZXQvJHtwcmVzZXRJRH0vYWN0aXZhdGVgLFxuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICB0aGlzLmZldGNoUHJlc2V0cygpO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICB9KTtcbiAgfVxuXG4gIGFjdGl2YXRlUHJlc2V0T25TZWxlY3RlZChwcmVzZXRJRCkge1xuICAgIC8vIFRvIERvXG4gIH1cblxuICBkZWxldGVQcmVzZXQocHJlc2V0SUQpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiBgL2FwaS9wcmVzZXQvJHtwcmVzZXRJRH1gLFxuICAgICAgbWV0aG9kOiAnZGVsZXRlJyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuZmV0Y2hQcmVzZXRzKCk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlUHJlc2V0KHByZXNldElEKSB7XG4gICAgY29uc3QgcHJlc2V0ID0ge1xuICAgICAgaWQ6IHByZXNldElELFxuICAgICAgc3RhdGlvbkFwcHM6IHt9LFxuICAgIH07XG5cbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgcHJlc2V0LnN0YXRpb25BcHBzW3N0YXRpb24uaWRdID0gc3RhdGlvbi5hcHA7XG4gICAgfVxuXG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogYC9hcGkvcHJlc2V0LyR7cHJlc2V0SUR9YCxcbiAgICAgIG1ldGhvZDogJ3B1dCcsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocHJlc2V0KSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuZmV0Y2hQcmVzZXRzKCk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICB9XG5cbiAgcmVmcmVzaFByZXNldHMoKSB7XG4gICAgdGhpcy5mZXRjaFByZXNldHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgdGhlIHNlcnZlciBwb2xsXG4gICAqXG4gICAqIEltcGxlbWVudGF0aW9uOiBTaW5jZSB0aGUgc2VydmVyIHVzZXMgbG9uZyBwb2xsaW5nIHdlIHVzZSBhIHZlcnkgc2hvcnRcbiAgICogcG9sbCB0aW1lICg1MDBtcykuIEluIGNhc2Ugb2YgZXJyb3JzIGNvbnRhY3RpbmcgdGhlIHNlcnZlciB0aGUgcG9sbCB0aW1lXG4gICAqIGluY3JlYXNlcyB3aXRoIGVhY2ggZXJyb3IgdW50aWwgYSBtYXggcG9sbCB0aW1lIGlzIHJlYWNoZWQuXG4gICAqL1xuICBwb2xsTG9vcCgpIHtcbiAgICBjb25zdCBtaW5Qb2xsVGltZSA9IDUwMDtcbiAgICBsZXQgcmV0cnlQb2xsVGltZSA9IG1pblBvbGxUaW1lO1xuICAgIGNvbnN0IHJldHJ5SW5jcmVhc2VGYWN0b3IgPSAyO1xuICAgIGNvbnN0IG1heFJldHJ5UG9sbFRpbWUgPSA0MDAwO1xuXG4gICAgY29uc3QgbG9vcCA9ICgpID0+IHtcbiAgICAgIHRoaXMucG9sbFNlcnZlcigpLnRoZW4oKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KGxvb3AsIG1pblBvbGxUaW1lKTtcbiAgICAgICAgcmV0cnlQb2xsVGltZSA9IG1pblBvbGxUaW1lO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZXJ2ZXJDb25uZWN0aW9uRXJyb3IpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmVyQ29ubmVjdGlvbkVycm9yOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlcnZlckNvbm5lY3Rpb25SZXRyeSA9IDA7XG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQobG9vcCwgcmV0cnlQb2xsVGltZSk7XG4gICAgICAgIGlmIChyZXRyeVBvbGxUaW1lIDwgbWF4UmV0cnlQb2xsVGltZSkge1xuICAgICAgICAgIHJldHJ5UG9sbFRpbWUgPSByZXRyeVBvbGxUaW1lICogcmV0cnlJbmNyZWFzZUZhY3RvcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlcnZlckNvbm5lY3Rpb25SZXRyeSsrO1xuICAgICAgICBpZiAodGhpcy5zZXJ2ZXJDb25uZWN0aW9uUmV0cnkgPiA1KSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlcnZlckNvbm5lY3Rpb25FcnJvcjogdHJ1ZSB9KTtcbiAgICAgICAgICAvLyBSZXNldCB0aGUgdXBkYXRlSUQgc28gdGhlIG5leHQgcG9sbCByZXR1cm5zIGltbWVkaWF0ZWx5XG4gICAgICAgICAgLy8gaW5zdGVhZCBvZiBiZWluZyBhIGxvbmcgcG9sbFxuICAgICAgICAgIHRoaXMudXBkYXRlSUQgPSAwO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGxvb3AoKTtcbiAgfVxuXG4gIHBvbGxTZXJ2ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvc3RhdGlvbnMnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgbGFzdFVwZGF0ZUlEOiB0aGlzLnVwZGF0ZUlELFxuICAgICAgICB9LFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIHRpbWVvdXQ6IDMwMDAwLFxuICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhLnN0YXRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSUQgPSBkYXRhLnVwZGF0ZUlEO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHN0YXRpb25zOiBkYXRhLnN0YXRpb25zIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5wcm9wcy51cmwsIHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmZXRjaFByZXNldHMoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvcHJlc2V0cycsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgdGltZW91dDogMzAwMDAsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGEucHJlc2V0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJlc2V0czogZGF0YS5wcmVzZXRzIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5wcm9wcy51cmwsIHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzdGF0aW9ucyA9IFtdO1xuICAgIGNvbnN0IGFjdGlvbnMgPSBbXTtcbiAgICBsZXQgbWVzc2FnZUJhciA9ICcnO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuc2VydmVyQ29ubmVjdGlvbkVycm9yKSB7XG4gICAgICBtZXNzYWdlQmFyID0gKDxkaXYgY2xhc3NOYW1lPVwibWVzc2FnZV9iYXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZXNzYWdlX2Jhci1tZXNzYWdlXCI+XG4gICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtd2FybmluZ1wiPjwvaT4gIE5vIGNvbm5lY3Rpb24gdG8gc2VydmVyLlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2Pik7XG4gICAgfVxuXG4gICAgdGhpcy5nZXRWaXNpYmxlU3RhdGlvbnMoKS5mb3JFYWNoKChzdGF0aW9uKSA9PiBzdGF0aW9ucy5wdXNoKFxuICAgICAgPFN0YXRpb25cbiAgICAgICAgc3RhdGlvbj17c3RhdGlvbn1cbiAgICAgICAga2V5PXtzdGF0aW9uLmlkfVxuICAgICAgICBzZWxlY3RlZD17dGhpcy5zdGF0ZS5zZWxlY3Rpb24uaGFzKHN0YXRpb24uaWQpfVxuICAgICAgICBvbkNsaWNrU3RhdGlvbj17dGhpcy5zZWxlY3RUb2dnbGV9XG4gICAgICAgIG9uT3BlblRlcm1pbmFsTG9nPXt0aGlzLnNob3dUZXJtaW5hbExvZ31cbiAgICAgIC8+XG4gICAgKSk7XG5cbiAgICBjb25zdCBjb3VudHMgPSB7fTtcbiAgICB0aGlzLnN0YXRlLnN0YXRpb25zLmZvckVhY2goKHN0YXRpb24pID0+IHtcbiAgICAgIGlmICghY291bnRzLmhhc093blByb3BlcnR5KHRoaXMuZGlzcGxheVN0YXRlKHN0YXRpb24uc3RhdGUpKSkge1xuICAgICAgICBjb3VudHNbdGhpcy5kaXNwbGF5U3RhdGUoc3RhdGlvbi5zdGF0ZSldID0gMDtcbiAgICAgIH1cbiAgICAgIGNvdW50c1t0aGlzLmRpc3BsYXlTdGF0ZShzdGF0aW9uLnN0YXRlKV0rKztcbiAgICB9KTtcblxuICAgIGNvbnN0IHNlbGVjdGVkQ291bnQgPSB0aGlzLnN0YXRlLnNlbGVjdGlvbi5zaXplO1xuICAgIGNvbnN0IGFsbFNlbGVjdGVkID0gKHNlbGVjdGVkQ291bnQgPT09IHRoaXMuc3RhdGUuc3RhdGlvbnMubGVuZ3RoKTtcbiAgICBjb25zdCBzZWxlY3RBbGxDbGFzc2VzID1cbiAgICAgIGBidG4gYnRuLWRlZmF1bHQgJHthbGxTZWxlY3RlZCA/ICcgZGlzYWJsZWQnIDogJyd9YDtcblxuICAgIGNvbnN0IGRlc2VsZWN0QWxsQ2xhc3NlcyA9XG4gICAgICBgYnRuIGJ0bi1kZWZhdWx0ICR7c2VsZWN0ZWRDb3VudCA9PT0gMCA/ICcgZGlzYWJsZWQnIDogJyd9YDtcblxuICAgIGNvbnN0IHN0YXRpb25Xb3JkID0gc2VsZWN0ZWRDb3VudCA9PT0gMSA/ICdzdGF0aW9uJyA6ICdzdGF0aW9ucyc7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInN0YXRpb25TdGF0ZUZpbHRlclwiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxCdXR0b25GaWx0ZXJcbiAgICAgICAgICBvcHRpb25zPXtbJ29uJywgJ29mZicsICdidXN5JywgJ2Vycm9yJ119XG4gICAgICAgICAgY291bnRzPXtjb3VudHN9XG4gICAgICAgICAgYWxsVGV4dD1cIkFsbCBzdGF0ZXNcIlxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZpc2libGVTdGF0ZX1cbiAgICAgICAgICBvbkNoYW5nZT17KG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZpc2libGVTdGF0ZTogb3B0aW9uIH0pO1xuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzdGF0aW9uVHlwZUZpbHRlclwiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxCdXR0b25GaWx0ZXJcbiAgICAgICAgICBvcHRpb25zPXt0aGlzLmdldFN0YXRpb25UeXBlcygpfVxuICAgICAgICAgIGFsbFRleHQ9XCJBbGwgdHlwZXNcIlxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZpc2libGVUeXBlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmlzaWJsZVR5cGU6IG9wdGlvbiB9KTtcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic2VsZWN0ZWRDb3VudFwiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmUtc2VwYXJhdG9yXCIgPjwvZGl2PlxuICAgICAgICA8Yj57dGhpcy5zdGF0ZS5zZWxlY3Rpb24uc2l6ZX0ge3N0YXRpb25Xb3JkfSBzZWxlY3RlZDwvYj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3RBY3Rpb25zXCI+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGNsYXNzTmFtZT17ZGVzZWxlY3RBbGxDbGFzc2VzfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy1hbGwtZGVzZWxlY3QnKX1cbiAgICAgICAgICA+RGVzZWxlY3Q8L2E+Jm5ic3A7XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGNsYXNzTmFtZT17c2VsZWN0QWxsQ2xhc3Nlc31cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZ2V0Q29tbWFuZCgnc3RhdGlvbnMtdmlzaWJsZS1zZWxlY3QnKX1cbiAgICAgICAgICA+U2VsZWN0IGFsbDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgY29uc3Qgbm9TZWxlY3Rpb25EaXNhYmxlID0gKHNlbGVjdGVkQ291bnQgPT09IDAgPyAnIGRpc2FibGVkJyA6ICcnKTtcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic3RhcnRTdG9wUGFuZWxcIiBjbGFzc05hbWU9e2BhY3Rpb24tcGFuZSR7bm9TZWxlY3Rpb25EaXNhYmxlfWB9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lLXNlcGFyYXRvclwiID48L2Rpdj5cbiAgICAgICAgPGFcbiAgICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLXN1Y2Nlc3Mke25vU2VsZWN0aW9uRGlzYWJsZX1gfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZ2V0Q29tbWFuZCgnc3RhdGlvbnMtc2VsZWN0ZWQtc3RhcnQnKX1cbiAgICAgICAgPjxpIGNsYXNzTmFtZT1cImZhIGZhLXBsYXlcIiAvPiZuYnNwOyZuYnNwO1N0YXJ0IFNlbGVjdGVkPC9hPlxuICAgICAgICAmbmJzcDtcbiAgICAgICAgPGFcbiAgICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLWRhbmdlciR7bm9TZWxlY3Rpb25EaXNhYmxlfWB9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy1zZWxlY3RlZC1zdG9wJyl9XG4gICAgICAgID48aSBjbGFzc05hbWU9XCJmYSBmYS1zdG9wXCIgLz4mbmJzcDsmbmJzcDtTdG9wIFNlbGVjdGVkPC9hPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGxldCBzZWxlY3RlZEFyZVNhbWVUeXBlID0gdHJ1ZTtcbiAgICBsZXQgbGFzdFR5cGUgPSBudWxsO1xuICAgIGZvciAoY29uc3Qgc2VsZWN0ZWRJRCBvZiB0aGlzLnN0YXRlLnNlbGVjdGlvbikge1xuICAgICAgaWYgKGxhc3RUeXBlID09PSBudWxsKSB7XG4gICAgICAgIGxhc3RUeXBlID0gdGhpcy5nZXRTdGF0aW9uU3RhdGUoc2VsZWN0ZWRJRCkudHlwZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmdldFN0YXRpb25TdGF0ZShzZWxlY3RlZElEKS50eXBlICE9PSBsYXN0VHlwZSkge1xuICAgICAgICBzZWxlY3RlZEFyZVNhbWVUeXBlID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBhbGxTZWxlY3RlZE9uID0gdHJ1ZTtcbiAgICBmb3IgKGNvbnN0IHNlbGVjdGVkSUQgb2YgdGhpcy5zdGF0ZS5zZWxlY3Rpb24pIHtcbiAgICAgIGlmICh0aGlzLmdldFN0YXRpb25TdGF0ZShzZWxlY3RlZElEKS5zdGF0ZSAhPT0gJ29uJykge1xuICAgICAgICBhbGxTZWxlY3RlZE9uID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNhbkNoYW5nZUFwcCA9IChhbGxTZWxlY3RlZE9uICYmIChzZWxlY3RlZENvdW50ID4gMCkgJiYgc2VsZWN0ZWRBcmVTYW1lVHlwZSk7XG5cbiAgICBsZXQgYXBwbGljYXRpb25zID0gW107XG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGlvbi5oYXMoc3RhdGlvbi5pZCkpIHtcbiAgICAgICAgYXBwbGljYXRpb25zID0gc3RhdGlvbi5wb3NzaWJsZV9hcHBzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwiYXBwU2VsZWN0XCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZS1zZXBhcmF0b3JcIiA+PC9kaXY+XG4gICAgICAgIDxBcHBTZWxlY3RcbiAgICAgICAgICBhcHBsaWNhdGlvbnM9e2NhbkNoYW5nZUFwcCA/IGFwcGxpY2F0aW9ucyA6IFtdfVxuICAgICAgICAgIGRpc2FibGVkPXshY2FuQ2hhbmdlQXBwfVxuICAgICAgICAgIGFsbG93QmxhbmtcbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5hdHRhY2hDb25maXJtYXRpb24oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjaGFuZ2UgdGhlIGFwcGxpY2F0aW9uPycsXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFwcFNlbGVjdGVkKX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e21lc3NhZ2VCYXIgIT09ICcnID8gJ3dpdGgtbWVzc2FnZV9iYXInIDogJyd9PlxuICAgICAgICB7bWVzc2FnZUJhcn1cbiAgICAgICAgPEhlYWRlclxuICAgICAgICAgIG9uU2hvd0dsb2JhbExvZz17dGhpcy5zaG93R2xvYmFsTG9nfVxuICAgICAgICAgIG9uU2hvd05vdGlmaWNhdGlvbnM9e3RoaXMuc2hvd05vdGlmaWNhdGlvbnN9XG4gICAgICAgID5cbiAgICAgICAgICA8UHJlc2V0c0Jsb2NrXG4gICAgICAgICAgICBwcmVzZXRzPXt0aGlzLnN0YXRlLnByZXNldHN9XG4gICAgICAgICAgICBzdGF0aW9uc1NlbGVjdGVkPXtzZWxlY3RlZENvdW50ID4gMH1cbiAgICAgICAgICAgIG9uQ3JlYXRlPXt0aGlzLmdldENvbW1hbmQoJ3ByZXNldC1jcmVhdGUnKX1cbiAgICAgICAgICAgIG9uQWN0aXZhdGU9e3RoaXMuZ2V0Q29tbWFuZCgncHJlc2V0LWFjdGl2YXRlJyl9XG4gICAgICAgICAgICBvbkFjdGl2YXRlT25TZWxlY3RlZD17dGhpcy5nZXRDb21tYW5kKCdwcmVzZXQtYWN0aXZhdGUtc2VsZWN0ZWQnKX1cbiAgICAgICAgICAgIG9uRGVsZXRlPXt0aGlzLmdldENvbW1hbmQoJ3ByZXNldC1kZWxldGUnKX1cbiAgICAgICAgICAgIG9uVXBkYXRlPXt0aGlzLmdldENvbW1hbmQoJ3ByZXNldC11cGRhdGUnKX1cbiAgICAgICAgICAgIG9uUmVmcmVzaD17dGhpcy5nZXRDb21tYW5kKCdwcmVzZXQtcmVmcmVzaCcpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvSGVhZGVyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02IHBhbmUtc3RhdGlvbnNcIj5cbiAgICAgICAgICAgICAgPGRpdiBpZD1cImRhc2hib2FyZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJzdGF0aW9uTGlzdFwiIGNsYXNzTmFtZT1cInBhbmVsLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICB7c3RhdGlvbnN9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02IHBhbmUtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGFzaGJvYXJkQWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgIHthY3Rpb25zfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPExvZ1ZpZXdlciBsb2c9e3RoaXMuc3RhdGUubG9nfSByZWY9eyhjKSA9PiB7IHRoaXMubG9nVmlld2VyID0gYzsgfX0gLz5cbiAgICAgICAgPENvbnNvbGVWaWV3ZXIgbGluZXM9e3RoaXMuc3RhdGUubGluZXN9IHJlZj17KGMpID0+IHsgdGhpcy5jb25zb2xlVmlld2VyID0gYzsgfX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRGFzaGJvYXJkLnByb3BUeXBlcyA9IHtcbiAgdXJsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuaGFuZGxlR2xvYmFsTG9nQ2xpY2tlZCA9IHRoaXMuaGFuZGxlR2xvYmFsTG9nQ2xpY2tlZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlTm90aWZpY2F0aW9uc0NsaWNrZWQgPSB0aGlzLmhhbmRsZU5vdGlmaWNhdGlvbnNDbGlja2VkLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVHbG9iYWxMb2dDbGlja2VkKGV2KSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25TaG93R2xvYmFsTG9nKSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2hvd0dsb2JhbExvZygpO1xuICAgIH1cbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgaGFuZGxlTm90aWZpY2F0aW9uc0NsaWNrZWQoZXYpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblNob3dOb3RpZmljYXRpb25zKSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2hvd05vdGlmaWNhdGlvbnMoKTtcbiAgICB9XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPG5hdiBjbGFzc05hbWU9XCJuYXZiYXIgbmF2YmFyLWRlZmF1bHQgbmF2YmFyLWZpeGVkLXRvcFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2YmFyLWhlYWRlclwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibmF2YmFyLXRvZ2dsZSBjb2xsYXBzZWRcIlxuICAgICAgICAgICAgICBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJcbiAgICAgICAgICAgICAgZGF0YS10YXJnZXQ9XCIjYnMtZXhhbXBsZS1uYXZiYXItY29sbGFwc2UtMVwiXG4gICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNyLW9ubHlcIj5Ub2dnbGUgbmF2aWdhdGlvbjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvbi1iYXJcIiAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uLWJhclwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb24tYmFyXCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmRcIiBocmVmPVwiI1wiPkhpbGJlcnQ8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhci1jb2xsYXBzZSBjb2xsYXBzZSBuYXZiYXItcmlnaHRcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBuYXZiYXItYnRuXCJcbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVHbG9iYWxMb2dDbGlja2VkfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1kZXNrdG9wXCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgJm5ic3A7XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgbmF2YmFyLWJ0blwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTm90aWZpY2F0aW9uc0NsaWNrZWR9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWJlbGwtb1wiIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25hdj5cbiAgICApO1xuICB9XG59XG5cbkhlYWRlci5wcm9wVHlwZXMgPSB7XG4gIG9uU2hvd0dsb2JhbExvZzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2hvd05vdGlmaWNhdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG59O1xuXG5IZWFkZXIuZGVmYXVsdFByb3BzID0ge1xuICBvblNob3dHbG9iYWxMb2c6ICgpID0+IHt9LFxuICBvblNob3dOb3RpZmljYXRpb25zOiAoKSA9PiB7fSxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dWaWV3ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIHN0YXRpYyBmb3JtYXRUaW1lKGlzb1RpbWUpIHtcbiAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoaXNvVGltZSk7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IHllc3RlcmRheSA9IG5ldyBEYXRlKCk7XG4gICAgeWVzdGVyZGF5LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMSk7XG4gICAgbGV0IGRheSA9ICcnO1xuXG4gICAgaWYgKHRvZGF5LmdldE1vbnRoKCkgPT09IHRpbWUuZ2V0TW9udGgoKSAmJlxuICAgICAgdG9kYXkuZ2V0RnVsbFllYXIoKSA9PT0gdGltZS5nZXRGdWxsWWVhcigpICYmXG4gICAgICB0b2RheS5nZXREYXRlKCkgPT09IHRpbWUuZ2V0RGF0ZSgpKSB7XG4gICAgICBkYXkgPSAnVG9kYXknO1xuICAgIH0gZWxzZSBpZiAoeWVzdGVyZGF5LmdldE1vbnRoKCkgPT09IHRpbWUuZ2V0TW9udGgoKSAmJlxuICAgICAgeWVzdGVyZGF5LmdldEZ1bGxZZWFyKCkgPT09IHRpbWUuZ2V0RnVsbFllYXIoKSAmJlxuICAgICAgeWVzdGVyZGF5LmdldERhdGUoKSA9PT0gdGltZS5nZXREYXRlKCkpIHtcbiAgICAgIGRheSA9ICdZZXN0ZXJkYXknO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXkgPSBgJHt0aW1lLmdldEZ1bGxZZWFyKCl9LSR7dGltZS5nZXRNb250aCgpfS0ke3RpbWUuZ2V0RGF0ZSgpfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke2RheX0gJHt0aW1lLmdldEhvdXJzKCl9OiR7dGltZS5nZXRNaW51dGVzKCl9OiR7dGltZS5nZXRTZWNvbmRzKCl9YDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMubW9kYWxESVYgPSBudWxsO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCAoKSA9PiB7IHRoaXMuaGFuZGxlUmVzaXplKCk7IH0pO1xuICAgICQodGhpcy5tb2RhbERJVikub24oJ3Nob3cuYnMubW9kYWwnLCAoKSA9PiB7IHRoaXMuaGFuZGxlUmVzaXplKCk7IH0pO1xuICB9XG5cbiAgb3Blbk1vZGFsKCkge1xuICAgIGlmICh0aGlzLm1vZGFsRElWICE9PSBudWxsKSB7XG4gICAgICAkKHRoaXMubW9kYWxESVYpLm1vZGFsKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUmVzaXplKCkge1xuICAgIGNvbnN0ICRtb2RhbCA9ICQodGhpcy5tb2RhbERJVik7XG4gICAgY29uc3QgbW9kYWxIZWFkZXJIZWlnaHQgPSA1NjtcbiAgICBjb25zdCBtb2RhbE1hcmdpbiA9IDMwO1xuICAgIGNvbnN0IG1vZGFsQm9yZGVyID0gMTtcblxuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSAobW9kYWxIZWFkZXJIZWlnaHQgKyBtb2RhbE1hcmdpbiAqIDIgKyBtb2RhbEJvcmRlciAqIDIpO1xuICAgICRtb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmNzcyh7IG1heEhlaWdodDogYm9keUhlaWdodCB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCByb3dDbGFzc2VzID0ge1xuICAgICAgZXJyb3I6ICdkYW5nZXInLFxuICAgICAgd2FybmluZzogJ3dhcm5pbmcnLFxuICAgIH07XG5cbiAgICBjb25zdCBlbnRyaWVzID0gW107XG4gICAgZm9yIChjb25zdCBsb2dFbnRyeSBvZiB0aGlzLnByb3BzLmxvZykge1xuICAgICAgY29uc3Qgcm93Q2xhc3MgPSByb3dDbGFzc2VzW2xvZ0VudHJ5LnR5cGVdICE9PSB1bmRlZmluZWQgPyByb3dDbGFzc2VzW2xvZ0VudHJ5LnR5cGVdIDogJyc7XG5cbiAgICAgIGVudHJpZXMucHVzaChcbiAgICAgICAgPHRyIGtleT17bG9nRW50cnkuaWR9IGNsYXNzTmFtZT17cm93Q2xhc3N9PlxuICAgICAgICAgIDx0ZD57TG9nVmlld2VyLmZvcm1hdFRpbWUobG9nRW50cnkudGltZSl9PC90ZD5cbiAgICAgICAgICA8dGQ+e2xvZ0VudHJ5LnN0YXRpb25fbmFtZX08L3RkPlxuICAgICAgICAgIDx0ZD57bG9nRW50cnkubWVzc2FnZX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlIGxvZ1ZpZXdlci1tb2RhbFwiIHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgcmVmPXsoYykgPT4geyB0aGlzLm1vZGFsRElWID0gYzsgfX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nIG1vZGFsLWxnXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPnt0aGlzLnByb3BzLnRpdGxlfTwvaDQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUgdGFibGUtZml4ZWQgdGFibGUtY29uZGVuc2VkXCI+XG4gICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+VGltZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5TdGF0aW9uPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPk1lc3NhZ2U8L3RoPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICB7ZW50cmllc31cbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Mb2dWaWV3ZXIucHJvcFR5cGVzID0ge1xuICB0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgbG9nOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgdGltZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHN0YXRpb25faWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBzdGF0aW9uX25hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBtZXNzYWdlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIH0pXG4gICksXG59O1xuXG5Mb2dWaWV3ZXIuZGVmYXVsdFByb3BzID0ge1xuICBsb2c6IFtdLFxuICB0aXRsZTogJ0V2ZW50IExvZycsXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuL2Rhc2hib2FyZC5qc3gnO1xuXG53aW5kb3cuZGFzaGJvYXJkID0gbnVsbDtcblxuLy8gb25SZWFkeVxuJCgoKSA9PiB7XG4gIHdpbmRvdy5kYXNoYm9hcmQgPSBSZWFjdERPTS5yZW5kZXIoXG4gICAgPERhc2hib2FyZCB1cmw9XCIvYXBpL3N0YXRpb25zXCIgLz4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rhc2hib2FyZENvbnRhaW5lcicpXG4gICk7XG5cbiAgLy8gSW5zdGFsbCBjbGljayBoYW5kbGVycyBpbiBleHRlcm5hbCBtZW51cyBhbmQgYnV0dG9uc1xuICAkKCdbZGF0YS1jb21tYW5kXScpLmVhY2goZnVuY3Rpb24gc2V0Q2xpY2tIYW5kbGVyKCkge1xuICAgICQodGhpcykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB3aW5kb3cuZGFzaGJvYXJkLmdldENvbW1hbmQoJCh0aGlzKS5hdHRyKCdkYXRhLWNvbW1hbmQnKSkoKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVzZXRzQmxvY2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VsZWN0ZWRQcmVzZXQ6IDAsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZVByZXNldENoYW5nZSA9IHRoaXMuaGFuZGxlUHJlc2V0Q2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVBY3RpdmF0ZSA9IHRoaXMuaGFuZGxlQWN0aXZhdGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUFjdGl2YXRlT25TZWxlY3RlZCA9IHRoaXMuaGFuZGxlQWN0aXZhdGVPblNlbGVjdGVkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTYXZlID0gdGhpcy5oYW5kbGVTYXZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVEZWxldGUgPSB0aGlzLmhhbmRsZURlbGV0ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlTmV3ID0gdGhpcy5oYW5kbGVOZXcuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVJlZnJlc2ggPSB0aGlzLmhhbmRsZVJlZnJlc2guYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZVByZXNldENoYW5nZShldikge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZFByZXNldDogTnVtYmVyLnBhcnNlSW50KGV2LnRhcmdldC52YWx1ZSwgMTApIH0pO1xuICB9XG5cbiAgaGFuZGxlQWN0aXZhdGUoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRQcmVzZXQgIT09IDApIHtcbiAgICAgIHRoaXMucHJvcHMub25BY3RpdmF0ZSh0aGlzLnN0YXRlLnNlbGVjdGVkUHJlc2V0KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVBY3RpdmF0ZU9uU2VsZWN0ZWQoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRQcmVzZXQgIT09IDApIHtcbiAgICAgIHRoaXMucHJvcHMub25BY3RpdmF0ZU9uU2VsZWN0ZWQodGhpcy5zdGF0ZS5zZWxlY3RlZFByZXNldCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlU2F2ZSgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZFByZXNldCAhPT0gMCkge1xuICAgICAgdGhpcy5wcm9wcy5vblVwZGF0ZSh0aGlzLnN0YXRlLnNlbGVjdGVkUHJlc2V0KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVEZWxldGUoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRQcmVzZXQgIT09IDApIHtcbiAgICAgIHRoaXMucHJvcHMub25EZWxldGUodGhpcy5zdGF0ZS5zZWxlY3RlZFByZXNldCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRQcmVzZXQ6IDAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUmVmcmVzaCgpIHtcbiAgICB0aGlzLnByb3BzLm9uUmVmcmVzaCh0aGlzLnN0YXRlLnNlbGVjdGVkUHJlc2V0KTtcbiAgfVxuXG4gIGhhbmRsZU5ldygpIHtcbiAgICB0aGlzLnByb3BzLm9uQ3JlYXRlKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtcbiAgICAgIDxvcHRpb24ga2V5PVwiMFwiIHZhbHVlPVwiMFwiIC8+LFxuICAgIF07XG5cbiAgICBmb3IgKGNvbnN0IHByZXNldCBvZiB0aGlzLnByb3BzLnByZXNldHMpIHtcbiAgICAgIG9wdGlvbnMucHVzaCg8b3B0aW9uIGtleT17cHJlc2V0LmlkfSB2YWx1ZT17cHJlc2V0LmlkfT57cHJlc2V0Lm5hbWV9PC9vcHRpb24+KTtcbiAgICB9XG5cbiAgICBjb25zdCBhY3Rpb25zRGlzYWJsZWQgPSAodGhpcy5zdGF0ZS5zZWxlY3RlZFByZXNldCA9PT0gMCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZiYXItZm9ybSBuYXZiYXItbGVmdFwiPlxuICAgICAgICBQcmVzZXRzXG4gICAgICAgICZuYnNwO1xuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIHByZXNldHMtbGlzdFwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zZWxlY3RlZFByZXNldH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVByZXNldENoYW5nZX1cbiAgICAgICAgICA+e29wdGlvbnN9PC9zZWxlY3Q+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1idG5cIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgaHJlZj1cIiNcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJkcm9wZG93bi10b2dnbGUgYnRuIGJ0bi1kZWZhdWx0XCJcbiAgICAgICAgICAgICAgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXG4gICAgICAgICAgICA+PHNwYW4gY2xhc3NOYW1lPVwiY2FyZXRcIiAvPjwvYnV0dG9uPlxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnVcIj5cbiAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17YWN0aW9uc0Rpc2FibGVkID8gJ2Rpc2FibGVkJyA6ICcnfSA+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUFjdGl2YXRlfT5cbiAgICAgICAgICAgICAgICAgIEFjdGl2YXRlXG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICB7Lyo8bGkgY2xhc3NOYW1lPXthY3Rpb25zRGlzYWJsZWQgfHwgIXRoaXMucHJvcHMuc3RhdGlvbnNTZWxlY3RlZCA/ICdkaXNhYmxlZCcgOiAnJ30gPiovfVxuICAgICAgICAgICAgICAgIHsvKjxhIGhyZWY9XCIjXCIgb25DbGljaz17dGhpcy5oYW5kbGVBY3RpdmF0ZX0+Ki99XG4gICAgICAgICAgICAgICAgICB7LypBY3RpdmF0ZSBvbiBzZWxlY3RlZCovfVxuICAgICAgICAgICAgICAgIHsvKjwvYT4qL31cbiAgICAgICAgICAgICAgey8qPC9saT4qL31cbiAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17YWN0aW9uc0Rpc2FibGVkID8gJ2Rpc2FibGVkJyA6ICcnfSA+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZVNhdmV9PlxuICAgICAgICAgICAgICAgICAgU2F2ZSBjaGFuZ2VzXG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXthY3Rpb25zRGlzYWJsZWQgPyAnZGlzYWJsZWQnIDogJyd9ID5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRGVsZXRlfT5cbiAgICAgICAgICAgICAgICAgIERlbGV0ZVxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImRpdmlkZXJcIj48L2xpPlxuICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZU5ld30+TmV3IHByZXNldC4uLjwvYT48L2xpPlxuICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZGl2aWRlclwiPjwvbGk+XG4gICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlUmVmcmVzaH0+UmVmcmVzaDwvYT48L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblByZXNldHNCbG9jay5wcm9wVHlwZXMgPSB7XG4gIHByZXNldHM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBzdGF0aW9uQXBwczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdE9mKFJlYWN0LlByb3BUeXBlcy5zdHJpbmcpLFxuICAgIH0pXG4gICksXG4gIHN0YXRpb25zU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBvbkNyZWF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQWN0aXZhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBvbkFjdGl2YXRlT25TZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uRGVsZXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgb25VcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBvblJlZnJlc2g6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxufTtcblxuUHJlc2V0c0Jsb2NrLmRlZmF1bHRQcm9wcyA9IHtcbiAgcHJlc2V0czogW10sXG4gIHN0YXRpb25zU2VsZWN0ZWQ6IGZhbHNlLFxuICBvbkNyZWF0ZTogKCkgPT4ge30sXG4gIG9uQWN0aXZhdGU6ICgpID0+IHt9LFxuICBvbkFjdGl2YXRlT25TZWxlY3RlZDogKCkgPT4ge30sXG4gIG9uRGVsZXRlOiAoKSA9PiB7fSxcbiAgb25VcGRhdGU6ICgpID0+IHt9LFxuICBvblJlZnJlc2g6ICgpID0+IHt9LFxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRpb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlT3BlblRlcm1pbmFsTG9nID0gdGhpcy5oYW5kbGVPcGVuVGVybWluYWxMb2cuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKCkge1xuICAgIHRoaXMucHJvcHMub25DbGlja1N0YXRpb24odGhpcy5wcm9wcy5zdGF0aW9uLmlkKTtcbiAgfVxuXG4gIGhhbmRsZU9wZW5UZXJtaW5hbExvZyhldikge1xuICAgIHRoaXMucHJvcHMub25PcGVuVGVybWluYWxMb2codGhpcy5wcm9wcy5zdGF0aW9uLmlkKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHN0YXRpb25DbGFzc2VzID0gW1xuICAgICAgJ3N0YXRpb24nLFxuICAgICAgYHN0YXRpb24tc3RhdGUtJHt0aGlzLnByb3BzLnN0YXRpb24uc3RhdGV9YCxcbiAgICAgIGBzdGF0aW9uLXR5cGUtJHt0aGlzLnByb3BzLnN0YXRpb24udHlwZX1gLFxuICAgIF07XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZCkge1xuICAgICAgc3RhdGlvbkNsYXNzZXMucHVzaCgnc3RhdGlvbi1zZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXt0aGlzLnByb3BzLnN0YXRpb24uaWR9XG4gICAgICAgIGNsYXNzTmFtZT17c3RhdGlvbkNsYXNzZXMuam9pbignICcpfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tc3RhdGUtbGlnaHRcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLWljb25cIj5cbiAgICAgICAgICA8aW1nIGFsdD17dGhpcy5wcm9wcy5zdGF0aW9uLmFwcH0gc3JjPXt0aGlzLnByb3BzLnN0YXRpb24uaWNvbn0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1uYW1lXCI+e3RoaXMucHJvcHMuc3RhdGlvbi5uYW1lfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tdHlwZVwiPnt0aGlzLnByb3BzLnN0YXRpb24udHlwZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLWFwcFwiPnt0aGlzLnByb3BzLnN0YXRpb24uYXBwfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tc3RhdHVzXCI+e3RoaXMucHJvcHMuc3RhdGlvbi5zdGF0dXN9PC9kaXY+XG4gICAgICAgIDxhIGNsYXNzTmFtZT1cInN0YXRpb24tb3V0cHV0LWJ1dHRvblwiIG9uQ2xpY2s9eyhldikgPT4geyB0aGlzLmhhbmRsZU9wZW5UZXJtaW5hbExvZyhldik7IH19PlxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWRlc2t0b3BcIj48L2k+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuU3RhdGlvbi5wcm9wVHlwZXMgPSB7XG4gIHN0YXRpb246IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzdGF0ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN0YXR1czogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcHA6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWNvbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBvbkNsaWNrU3RhdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uT3BlblRlcm1pbmFsTG9nOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbn07XG4iXX0=
