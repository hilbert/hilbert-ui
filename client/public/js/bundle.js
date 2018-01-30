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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwU2VsZWN0LmpzeCIsInNyYy9idXR0b25GaWx0ZXIuanN4Iiwic3JjL2NvbnNvbGVWaWV3ZXIuanN4Iiwic3JjL2Rhc2hib2FyZC5qc3giLCJzcmMvaGVhZGVyLmpzeCIsInNyYy9sb2dWaWV3ZXIuanN4Iiwic3JjL21haW4uanN4Iiwic3JjL3ByZXNldHNCbG9jay5qc3giLCJzcmMvc3RhdGlvbi5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUFFQTs7OztJQUlxQixTOzs7QUFFbkIscUJBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLHNIQUNYLEtBRFc7O0FBRWpCLFVBQUssV0FBTCxHQUFtQixJQUFuQjtBQUNBLFVBQUssZ0JBQUwsR0FBd0IsTUFBSyxnQkFBTCxDQUFzQixJQUF0QixPQUF4QjtBQUhpQjtBQUlsQjs7Ozt1Q0FFa0I7QUFDakIsVUFBSSxLQUFLLEtBQUwsQ0FBVyxRQUFmLEVBQXlCO0FBQ3ZCLGFBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsS0FBSyxXQUFMLENBQWlCLEtBQXJDO0FBQ0Q7QUFDRjs7OzZCQUVRO0FBQUE7O0FBQ1AsVUFBTSxlQUFlLEVBQXJCOztBQUVBLFVBQUksS0FBSyxLQUFMLENBQVcsVUFBZixFQUEyQjtBQUN6QixxQkFBYSxJQUFiLENBQ0U7QUFBQTtBQUFBLFlBQVEsS0FBSSxNQUFaLEVBQW1CLE9BQU0sRUFBekI7QUFBQTtBQUFBLFNBREY7QUFHRDs7QUFQTTtBQUFBO0FBQUE7O0FBQUE7QUFTUCw2QkFBMEIsS0FBSyxLQUFMLENBQVcsWUFBckMsOEhBQW1EO0FBQUEsY0FBeEMsV0FBd0M7O0FBQ2pELHVCQUFhLElBQWIsQ0FDRTtBQUFBO0FBQUEsY0FBUSxLQUFLLFdBQWIsRUFBMEIsT0FBTyxXQUFqQztBQUErQztBQUEvQyxX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O0FBWWxCLHFCQUFtQixnQkFBTSxTQUFOLENBQWdCO0FBWmpCLENBQXBCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbi8qKlxuICogQXBwU2VsZWN0IGNvbXBvbmVudFxuICogQWxsb3dzIHRoZSB1c2VyIHRvIHNlbGVjdCBhbiBhcHBsaWNhdGlvbiBmcm9tIGEgbGlzdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBTZWxlY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuYXBwU2VsZWN0b3IgPSBudWxsO1xuICAgIHRoaXMuY2xpY2tlZENoYW5nZUFwcCA9IHRoaXMuY2xpY2tlZENoYW5nZUFwcC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY2xpY2tlZENoYW5nZUFwcCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLmFwcFNlbGVjdG9yLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgYXBwbGljYXRpb25zID0gW107XG5cbiAgICBpZiAodGhpcy5wcm9wcy5hbGxvd0JsYW5rKSB7XG4gICAgICBhcHBsaWNhdGlvbnMucHVzaChcbiAgICAgICAgPG9wdGlvbiBrZXk9XCJudWxsXCIgdmFsdWU9XCJcIj4mbmJzcDs8L29wdGlvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBhcHBsaWNhdGlvbiBvZiB0aGlzLnByb3BzLmFwcGxpY2F0aW9ucykge1xuICAgICAgYXBwbGljYXRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PXthcHBsaWNhdGlvbn0gdmFsdWU9e2FwcGxpY2F0aW9ufT57YXBwbGljYXRpb259PC9vcHRpb24+XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGRpc2FibGVkQ2xhc3MgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA/ICcgZGlzYWJsZWQnIDogJycpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYXBwU2VsZWN0JHtkaXNhYmxlZENsYXNzfWB9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0taW5saW5lXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIGZvcm0tZ3JvdXAtbWlud2lkdGhcIj5cbiAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sJHtkaXNhYmxlZENsYXNzfWB9XG4gICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgPyB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSA6ICcnfVxuICAgICAgICAgICAgICByZWY9eyhzZWwpID0+IHsgdGhpcy5hcHBTZWxlY3RvciA9IHNlbDsgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2FwcGxpY2F0aW9uc31cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICZuYnNwO1xuICAgICAgICAgIDxhXG4gICAgICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLXdhcm5pbmcke2Rpc2FibGVkQ2xhc3N9YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY2xpY2tlZENoYW5nZUFwcH1cbiAgICAgICAgICA+Q2hhbmdlIGFwcGxpY2F0aW9uPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQXBwU2VsZWN0LnByb3BUeXBlcyA9IHtcbiAgYXBwbGljYXRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICksXG4gIGRlZmF1bHRWYWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgYWxsb3dCbGFuazogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGRpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgb25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxufTtcblxuQXBwU2VsZWN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgYXBwbGljYXRpb25zOiBbXSxcbiAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgYWxsb3dCbGFuazogZmFsc2UsXG4gIGRpc2FibGVkOiBmYWxzZSxcbiAgb25DaGFuZ2U6ICgpID0+IHt9LFxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEJ1dHRvbkZpbHRlciA9IChwcm9wcykgPT4ge1xuICBjb25zdCBvcHRpb25zID0gW107XG5cbiAgZm9yIChjb25zdCBvcHRpb24gb2YgcHJvcHMub3B0aW9ucykge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbJ2J0bicsICdidG4tZGVmYXVsdCcsIGBidXR0b24tZmlsdGVyLW9wdGlvbi0ke29wdGlvbn1gXTtcbiAgICBpZiAocHJvcHMudmFsdWUgPT09IG9wdGlvbikge1xuICAgICAgY2xhc3Nlcy5wdXNoKCdhY3RpdmUnKTtcbiAgICB9XG4gICAgbGV0IGNvdW50ZXIgPSAnJztcbiAgICBsZXQgc3BhY2luZyA9ICcnO1xuICAgIGlmIChwcm9wcy5jb3VudHMgIT09IG51bGwpIHtcbiAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICBpZiAocHJvcHMuY291bnRzLmhhc093blByb3BlcnR5KG9wdGlvbikgJiYgcHJvcHMuY291bnRzW29wdGlvbl0gIT09IDApIHtcbiAgICAgICAgY291bnQgPSBwcm9wcy5jb3VudHNbb3B0aW9uXTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGJhZGdlQ2xhc3NlcyA9IGBiYWRnZSR7Y291bnQgPT09IDAgPyAnIHplcm8nIDogJyBub24temVybyd9YDtcbiAgICAgIGNvdW50ZXIgPSAoPHNwYW4gY2xhc3NOYW1lPXtiYWRnZUNsYXNzZXN9Pntjb3VudH08L3NwYW4+KTtcbiAgICAgIHNwYWNpbmcgPSAnICc7XG4gICAgfVxuICAgIG9wdGlvbnMucHVzaChcbiAgICAgIDxhXG4gICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oJyAnKX1cbiAgICAgICAga2V5PXtvcHRpb259XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHByb3BzLm9uQ2hhbmdlKG9wdGlvbil9XG4gICAgICA+e29wdGlvbn17c3BhY2luZ317Y291bnRlcn08L2E+XG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGRlZmF1bHRDbGFzc2VzID0gWydidG4nLCAnYnRuLWRlZmF1bHQnXTtcbiAgaWYgKHByb3BzLnZhbHVlID09PSAnJykge1xuICAgIGRlZmF1bHRDbGFzc2VzLnB1c2goJ2FjdGl2ZScpO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi10b29sYmFyIGJ1dHRvbi1maWx0ZXJcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgIDxhXG4gICAgICAgICAgaHJlZj1cIiNcIlxuICAgICAgICAgIGNsYXNzTmFtZT17ZGVmYXVsdENsYXNzZXMuam9pbignICcpfVxuICAgICAgICAgIGtleT1cIm51bGxcIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHByb3BzLm9uQ2hhbmdlKCcnKX1cbiAgICAgICAgPntwcm9wcy5hbGxUZXh0fTwvYT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAge29wdGlvbnN9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbkJ1dHRvbkZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIG9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5zdHJpbmcpLFxuICBjb3VudHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3RPZihSZWFjdC5Qcm9wVHlwZXMubnVtYmVyKSxcbiAgYWxsVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbn07XG5cbkJ1dHRvbkZpbHRlci5kZWZhdWx0UHJvcHMgPSB7XG4gIG9wdGlvbnM6IFtdLFxuICBjb3VudHM6IG51bGwsXG4gIGFsbFRleHQ6ICdBbGwnLFxuICB2YWx1ZTogJycsXG4gIG9uQ2hhbmdlOiAoKSA9PiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkZpbHRlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnNvbGVWaWV3ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMubW9kYWxESVYgPSBudWxsO1xuICB9XG5cbiAgb3Blbk1vZGFsKCkge1xuICAgIGlmICh0aGlzLm1vZGFsRElWICE9PSBudWxsKSB7XG4gICAgICAkKHRoaXMubW9kYWxESVYpLm1vZGFsKCk7XG4gICAgICAkKHRoaXMubW9kYWxESVYpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBtb2RhbEJvZHkgPSAkKHRoaXMpLmZpbmQoJy5tb2RhbC1ib2R5JykuZmlyc3QoKVswXTtcbiAgICAgICAgbW9kYWxCb2R5LnNjcm9sbFRvcCA9IE1hdGgubWF4KG1vZGFsQm9keS5zY3JvbGxIZWlnaHQsIG1vZGFsQm9keS5jbGllbnRIZWlnaHQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCAoKSA9PiB7IHRoaXMuaGFuZGxlUmVzaXplKCk7IH0pO1xuICAgICQodGhpcy5tb2RhbERJVikub24oJ3Nob3cuYnMubW9kYWwnLCAoKSA9PiB7IHRoaXMuaGFuZGxlUmVzaXplKCk7IH0pO1xuICB9XG5cbiAgaGFuZGxlUmVzaXplKCkge1xuICAgIGNvbnN0ICRtb2RhbCA9ICQodGhpcy5tb2RhbERJVik7XG4gICAgY29uc3QgbW9kYWxIZWFkZXJIZWlnaHQgPSA1NjtcbiAgICBjb25zdCBtb2RhbE1hcmdpbiA9IDMwO1xuICAgIGNvbnN0IG1vZGFsQm9yZGVyID0gMTtcblxuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSAobW9kYWxIZWFkZXJIZWlnaHQgKyBtb2RhbE1hcmdpbiAqIDIgKyBtb2RhbEJvcmRlciAqIDIpO1xuICAgICRtb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmNzcyh7IG1heEhlaWdodDogYm9keUhlaWdodCB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlIGNvbnNvbGVWaWV3ZXItbW9kYWxcIiB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIHJlZj17KGMpID0+IHsgdGhpcy5tb2RhbERJViA9IGM7IH19PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZyBtb2RhbC1sZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPiZ0aW1lczs8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj57dGhpcy5wcm9wcy50aXRsZX08L2g0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgPHByZT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5saW5lcy5qb2luKCdcXG4nKX1cbiAgICAgICAgICAgICAgPC9wcmU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkNvbnNvbGVWaWV3ZXIucHJvcFR5cGVzID0ge1xuICB0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgbGluZXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5zdHJpbmcpLFxufTtcblxuQ29uc29sZVZpZXdlci5kZWZhdWx0UHJvcHMgPSB7XG4gIHRpdGxlOiAnVGVybWluYWwgT3V0cHV0JyxcbiAgbGluZXM6IFtdLFxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU3RhdGlvbiBmcm9tICcuL3N0YXRpb24uanN4JztcbmltcG9ydCBBcHBTZWxlY3QgZnJvbSAnLi9hcHBTZWxlY3QuanN4JztcbmltcG9ydCBCdXR0b25GaWx0ZXIgZnJvbSAnLi9idXR0b25GaWx0ZXIuanN4JztcbmltcG9ydCBMb2dWaWV3ZXIgZnJvbSAnLi9sb2dWaWV3ZXIuanN4JztcbmltcG9ydCBDb25zb2xlVmlld2VyIGZyb20gJy4vY29uc29sZVZpZXdlci5qc3gnO1xuaW1wb3J0IFByZXNldHNCbG9jayBmcm9tICcuL3ByZXNldHNCbG9jay5qc3gnO1xuaW1wb3J0IEhlYWRlciBmcm9tICcuL2hlYWRlci5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdGF0aW9uczogW10sXG4gICAgICBzZWxlY3Rpb246IG5ldyBTZXQoKSxcbiAgICAgIHZpc2libGVUeXBlOiAnJyxcbiAgICAgIHZpc2libGVTdGF0ZTogJycsXG4gICAgICBsb2c6IFtdLFxuICAgICAgc2VydmVyQ29ubmVjdGlvbkVycm9yOiBmYWxzZSxcbiAgICAgIHByZXNldHM6IFtdLFxuICAgIH07XG4gICAgdGhpcy5zZWxlY3RUb2dnbGUgPSB0aGlzLnNlbGVjdFRvZ2dsZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2hhbmdlQXBwU2VsZWN0ZWQgPSB0aGlzLmNoYW5nZUFwcFNlbGVjdGVkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaG93VGVybWluYWxMb2cgPSB0aGlzLnNob3dUZXJtaW5hbExvZy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2hvd0dsb2JhbExvZyA9IHRoaXMuc2hvd0dsb2JhbExvZy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2hvd05vdGlmaWNhdGlvbnMgPSB0aGlzLnNob3dOb3RpZmljYXRpb25zLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jb21tYW5kcyA9IHt9O1xuICAgIHRoaXMuaW5pdENvbW1hbmRzKCk7XG4gICAgdGhpcy5nZXRDb21tYW5kID0gdGhpcy5nZXRDb21tYW5kLmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb2dWaWV3ZXIgPSBudWxsO1xuICAgIHRoaXMuY29uc29sZVZpZXdlciA9IG51bGw7XG4gICAgdGhpcy51cGRhdGVJRCA9IDA7XG4gICAgdGhpcy5zZXJ2ZXJDb25uZWN0aW9uUmV0cnkgPSAwO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wb2xsTG9vcCgpO1xuICAgIHRoaXMuZmV0Y2hQcmVzZXRzKCk7XG4gIH1cblxuICBnZXRTdGF0aW9uU3RhdGUoc3RhdGlvbklEKSB7XG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIGlmIChzdGF0aW9uLmlkID09PSBzdGF0aW9uSUQpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRpb247XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0U3RhdGlvblR5cGVzKCkge1xuICAgIGNvbnN0IHR5cGVzID0gbmV3IFNldCgpO1xuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiB0aGlzLnN0YXRlLnN0YXRpb25zKSB7XG4gICAgICB0eXBlcy5hZGQoc3RhdGlvbi50eXBlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0eXBlcyk7XG4gIH1cblxuICBnZXRDb21tYW5kKGNvbW1hbmROYW1lKSB7XG4gICAgaWYgKHRoaXMuY29tbWFuZHNbY29tbWFuZE5hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbW1hbmRzW2NvbW1hbmROYW1lXS5kb0NhbGxiYWNrO1xuICAgIH1cbiAgICB0aHJvdyBFcnJvcihgQ2FsbCB0byBpbnZhbGlkIGNvbW1hbmQgJHtjb21tYW5kTmFtZX1gKTtcbiAgfVxuXG4gIGdldFZpc2libGVTdGF0aW9ucygpIHtcbiAgICBjb25zdCBhbnN3ZXIgPSBbXTtcblxuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiB0aGlzLnN0YXRlLnN0YXRpb25zKSB7XG4gICAgICBpZiAoKHRoaXMuc3RhdGUudmlzaWJsZVR5cGUgPT09ICcnIHx8IHN0YXRpb24udHlwZSA9PT0gdGhpcy5zdGF0ZS52aXNpYmxlVHlwZSkgJiZcbiAgICAgICAgICAodGhpcy5zdGF0ZS52aXNpYmxlU3RhdGUgPT09ICcnIHx8XG4gICAgICAgICAgIHRoaXMuZGlzcGxheVN0YXRlKHN0YXRpb24uc3RhdGUpID09PSB0aGlzLnN0YXRlLnZpc2libGVTdGF0ZSkpIHtcbiAgICAgICAgYW5zd2VyLnB1c2goc3RhdGlvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFuc3dlcjtcbiAgfVxuXG4gIGRpc3BsYXlTdGF0ZShzdGF0ZSkge1xuICAgIGlmIChzdGF0ZSA9PT0gJ3N0YXJ0aW5nX3N0YXRpb24nIHx8XG4gICAgICBzdGF0ZSA9PT0gJ3N0YXJ0aW5nX2FwcCcgfHxcbiAgICAgIHN0YXRlID09PSAnc3RvcHBpbmcnIHx8XG4gICAgICBzdGF0ZSA9PT0gJ3N3aXRjaGluZ19hcHAnKSB7XG4gICAgICByZXR1cm4gJ2J1c3knO1xuICAgIH1cblxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGF0dGFjaENvbmZpcm1hdGlvbih0ZXh0LCBjYWxsYmFjaykge1xuICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgYm9vdGJveC5kaWFsb2coe1xuICAgICAgICBtZXNzYWdlOiB0ZXh0LFxuICAgICAgICBidXR0b25zOiB7XG4gICAgICAgICAgd2FybmluZzoge1xuICAgICAgICAgICAgbGFiZWw6ICdDb25maXJtJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bi13YXJuaW5nJyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjay5iaW5kKHRoaXMsIC4uLmFyZ3MpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2FuY2VsOiB7XG4gICAgICAgICAgICBsYWJlbDogJ0NhbmNlbCcsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdidG4tZGVmYXVsdCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBpbml0Q29tbWFuZHMoKSB7XG4gICAgdGhpcy5jb21tYW5kcyA9IHtcbiAgICAgICdzdGF0aW9ucy1hbGwtc3RhcnQnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnN0YXJ0QWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RhcnQgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtYWxsLXN0b3AnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnN0b3BBbGwuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzdG9wIGFsbCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IHRydWUsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLWFsbC1zZWxlY3QnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnNlbGVjdEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3NlbGVjdCBhbGwgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtYWxsLWRlc2VsZWN0Jzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5kZXNlbGVjdEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ2Rlc2VsZWN0IGFsbCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IGZhbHNlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1zZWxlY3RlZC1zdGFydCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RhcnRTZWxlY3RlZC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3N0YXJ0IHRoZSBzZWxlY3RlZCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IHRydWUsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLXNlbGVjdGVkLXN0b3AnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnN0b3BTZWxlY3RlZC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3N0b3AgdGhlIHNlbGVjdGVkIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtdmlzaWJsZS1zZWxlY3QnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnNlbGVjdEFsbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzZWxlY3QgdmlzaWJsZSBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IGZhbHNlLFxuICAgICAgfSxcbiAgICAgICdwcmVzZXQtY3JlYXRlJzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5jcmVhdGVQcmVzZXQuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdjcmVhdGUgYSBwcmVzZXQnLFxuICAgICAgICBjb25maXJtOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICAncHJlc2V0LWFjdGl2YXRlJzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5hY3RpdmF0ZVByZXNldC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ2FjdGl2YXRlIGEgcHJlc2V0JyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAncHJlc2V0LWFjdGl2YXRlLXNlbGVjdGVkJzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5hY3RpdmF0ZVByZXNldE9uU2VsZWN0ZWQuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdhY3RpdmF0ZSBhIHByZXNldCBvbiB0aGUgc2VsZWN0ZWQgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdwcmVzZXQtZGVsZXRlJzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5kZWxldGVQcmVzZXQuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdkZWxldGUgYSBwcmVzZXQnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdwcmVzZXQtdXBkYXRlJzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy51cGRhdGVQcmVzZXQuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICd1cGRhdGUgYSBwcmVzZXQnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdwcmVzZXQtcmVmcmVzaCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMucmVmcmVzaFByZXNldHMuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdyZWZyZXNoIHByZXNldHMnLFxuICAgICAgICBjb25maXJtOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGZvciAoY29uc3QgbmFtZSBvZiBPYmplY3Qua2V5cyh0aGlzLmNvbW1hbmRzKSkge1xuICAgICAgY29uc3QgY29tbWFuZCA9IHRoaXMuY29tbWFuZHNbbmFtZV07XG4gICAgICBpZiAoY29tbWFuZC5jb25maXJtKSB7XG4gICAgICAgIHRoaXMuY29tbWFuZHNbbmFtZV0uZG9DYWxsYmFjayA9IHRoaXMuYXR0YWNoQ29uZmlybWF0aW9uKFxuICAgICAgICAgIGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gJHtjb21tYW5kLnRpdGxlfT9gLFxuICAgICAgICAgIGNvbW1hbmQuY2FsbGJhY2tcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29tbWFuZHNbbmFtZV0uZG9DYWxsYmFjayA9IGNvbW1hbmQuY2FsbGJhY2s7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWxsU3RhdGlvbklEcygpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0aW9uSURzKHRoaXMuc3RhdGUuc3RhdGlvbnMpO1xuICB9XG5cbiAgc3RhdGlvbklEcyhzdGF0aW9ucykge1xuICAgIGNvbnN0IGlkcyA9IG5ldyBTZXQoKTtcblxuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiBzdGF0aW9ucykge1xuICAgICAgaWRzLmFkZChzdGF0aW9uLmlkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaWRzO1xuICB9XG5cbiAgc2VsZWN0QWxsKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3Rpb246IHRoaXMuYWxsU3RhdGlvbklEcygpIH0pO1xuICB9XG5cbiAgc2VsZWN0QWxsVmlzaWJsZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW9uOiB0aGlzLnN0YXRpb25JRHModGhpcy5nZXRWaXNpYmxlU3RhdGlvbnMoKSkgfSk7XG4gIH1cblxuICBkZXNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW9uOiBuZXcgU2V0KCkgfSk7XG4gIH1cblxuICBzZWxlY3RUb2dnbGUoaWQpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3Rpb24uaGFzKGlkKSkge1xuICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24uZGVsZXRlKGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24uYWRkKGlkKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogdGhpcy5zdGF0ZS5zZWxlY3Rpb24gfSk7XG4gIH1cblxuICBzdG9wU3RhdGlvbnMoc3RhdGlvbklEcykge1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvYXBpL3N0YXRpb25zL3N0b3AnLFxuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBpZHM6IEFycmF5LmZyb20oc3RhdGlvbklEcyksXG4gICAgICB9KSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7fSxcbiAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICB9KTtcbiAgfVxuXG4gIHN0b3BTZWxlY3RlZCgpIHtcbiAgICB0aGlzLnN0b3BTdGF0aW9ucyh0aGlzLnN0YXRlLnNlbGVjdGlvbik7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICB9XG5cbiAgc3RvcEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9wU3RhdGlvbnModGhpcy5hbGxTdGF0aW9uSURzKCkpO1xuICB9XG5cbiAgc3RhcnRTdGF0aW9ucyhzdGF0aW9uSURzKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvc3RhdGlvbnMvc3RhcnQnLFxuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBpZHM6IEFycmF5LmZyb20oc3RhdGlvbklEcyksXG4gICAgICB9KSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7fSxcbiAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXJ0U2VsZWN0ZWQoKSB7XG4gICAgdGhpcy5zdGFydFN0YXRpb25zKHRoaXMuc3RhdGUuc2VsZWN0aW9uKTtcbiAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gIH1cblxuICBzdGFydEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFydFN0YXRpb25zKHRoaXMuYWxsU3RhdGlvbklEcygpKTtcbiAgfVxuXG4gIGNoYW5nZUFwcFNlbGVjdGVkKGFwcCkge1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvYXBpL3N0YXRpb25zL2NoYW5nZV9hcHAnLFxuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBpZHM6IEFycmF5LmZyb20odGhpcy5zdGF0ZS5zZWxlY3Rpb24pLFxuICAgICAgICBhcHAsXG4gICAgICB9KSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7fSxcbiAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICB9KTtcbiAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gIH1cblxuICBzaG93VGVybWluYWxMb2coc3RhdGlvbklEKSB7XG4gICAgaWYgKHRoaXMuY29uc29sZVZpZXdlciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5jb25zb2xlVmlld2VyLm9wZW5Nb2RhbCgpO1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgL2FwaS9zdGF0aW9uLyR7c3RhdGlvbklEfS9vdXRwdXRgLFxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB0aXRsZTogc3RhdGlvbklELFxuICAgICAgICAgICAgbGluZXM6IGRhdGEubGluZXMsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNob3dHbG9iYWxMb2coKSB7XG4gICAgaWYgKHRoaXMuY29uc29sZVZpZXdlciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5jb25zb2xlVmlld2VyLm9wZW5Nb2RhbCgpO1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9zZXJ2ZXIvb3V0cHV0JyxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdGl0bGU6ICdHbG9iYWwgb3V0cHV0JyxcbiAgICAgICAgICAgIGxpbmVzOiBkYXRhLmxpbmVzLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzaG93Tm90aWZpY2F0aW9ucygpIHtcbiAgICBpZiAodGhpcy5sb2dWaWV3ZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMubG9nVmlld2VyLm9wZW5Nb2RhbCgpO1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9ub3RpZmljYXRpb25zJyxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsb2c6IGRhdGEubm90aWZpY2F0aW9ucy5yZXZlcnNlKCkgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZVByZXNldCgpIHtcbiAgICBjb25zdCBwcmVzZXQgPSB7XG4gICAgICBuYW1lOiAnJyxcbiAgICAgIHN0YXRpb25BcHBzOiB7fSxcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIHByZXNldC5zdGF0aW9uQXBwc1tzdGF0aW9uLmlkXSA9IHN0YXRpb24uYXBwO1xuICAgIH1cblxuICAgIGJvb3Rib3gucHJvbXB0KHtcbiAgICAgIHNpemU6ICdzbWFsbCcsXG4gICAgICB0aXRsZTogJ0VudGVyIGEgbmFtZSBmb3IgdGhlIHByZXNldCcsXG4gICAgICBtZXNzYWdlOiBgVGhlIHByZXNldCBpbmNsdWRlcyB0aGUgJHt0aGlzLnN0YXRlLnNlbGVjdGlvbi5sZW5ndGh9IHNlbGVjdGVkIHN0YXRpb25zYCxcbiAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgY29uZmlybToge1xuICAgICAgICAgIGxhYmVsOiAnQ3JlYXRlJyxcbiAgICAgICAgICBjbGFzc05hbWU6ICdidG4tc3VjY2VzcycsXG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbDoge1xuICAgICAgICAgIGxhYmVsOiAnQ2FuY2VsJyxcbiAgICAgICAgICBjbGFzc05hbWU6ICdidG4tZGVmYXVsdCcsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgY2FsbGJhY2s6IChyZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gbnVsbCkge1xuICAgICAgICAgIHByZXNldC5uYW1lID0gcmVzdWx0LnN1YnN0cigwLCA1MCk7XG4gICAgICAgICAgdGhpcy5zZW5kQ3JlYXRlUHJlc2V0KHByZXNldCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBzZW5kQ3JlYXRlUHJlc2V0KHByZXNldCkge1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvYXBpL3ByZXNldCcsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShwcmVzZXQpLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgdGhpcy5mZXRjaFByZXNldHMoKTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gIH1cblxuICBhY3RpdmF0ZVByZXNldChwcmVzZXRJRCkge1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6IGAvYXBpL3ByZXNldC8ke3ByZXNldElEfS9hY3RpdmF0ZWAsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuZmV0Y2hQcmVzZXRzKCk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICB9XG5cbiAgYWN0aXZhdGVQcmVzZXRPblNlbGVjdGVkKHByZXNldElEKSB7XG4gICAgLy8gVG8gRG9cbiAgfVxuXG4gIGRlbGV0ZVByZXNldChwcmVzZXRJRCkge1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6IGAvYXBpL3ByZXNldC8ke3ByZXNldElEfWAsXG4gICAgICBtZXRob2Q6ICdkZWxldGUnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgdGhpcy5mZXRjaFByZXNldHMoKTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVQcmVzZXQocHJlc2V0SUQpIHtcbiAgICBjb25zdCBwcmVzZXQgPSB7XG4gICAgICBpZDogcHJlc2V0SUQsXG4gICAgICBzdGF0aW9uQXBwczoge30sXG4gICAgfTtcblxuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiB0aGlzLnN0YXRlLnN0YXRpb25zKSB7XG4gICAgICBwcmVzZXQuc3RhdGlvbkFwcHNbc3RhdGlvbi5pZF0gPSBzdGF0aW9uLmFwcDtcbiAgICB9XG5cbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiBgL2FwaS9wcmVzZXQvJHtwcmVzZXRJRH1gLFxuICAgICAgbWV0aG9kOiAncHV0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShwcmVzZXQpLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgdGhpcy5mZXRjaFByZXNldHMoKTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gIH1cblxuICByZWZyZXNoUHJlc2V0cygpIHtcbiAgICB0aGlzLmZldGNoUHJlc2V0cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSB0aGUgc2VydmVyIHBvbGxcbiAgICpcbiAgICogSW1wbGVtZW50YXRpb246IFNpbmNlIHRoZSBzZXJ2ZXIgdXNlcyBsb25nIHBvbGxpbmcgd2UgdXNlIGEgdmVyeSBzaG9ydFxuICAgKiBwb2xsIHRpbWUgKDUwMG1zKS4gSW4gY2FzZSBvZiBlcnJvcnMgY29udGFjdGluZyB0aGUgc2VydmVyIHRoZSBwb2xsIHRpbWVcbiAgICogaW5jcmVhc2VzIHdpdGggZWFjaCBlcnJvciB1bnRpbCBhIG1heCBwb2xsIHRpbWUgaXMgcmVhY2hlZC5cbiAgICovXG4gIHBvbGxMb29wKCkge1xuICAgIGNvbnN0IG1pblBvbGxUaW1lID0gNTAwO1xuICAgIGxldCByZXRyeVBvbGxUaW1lID0gbWluUG9sbFRpbWU7XG4gICAgY29uc3QgcmV0cnlJbmNyZWFzZUZhY3RvciA9IDI7XG4gICAgY29uc3QgbWF4UmV0cnlQb2xsVGltZSA9IDQwMDA7XG5cbiAgICBjb25zdCBsb29wID0gKCkgPT4ge1xuICAgICAgdGhpcy5wb2xsU2VydmVyKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQobG9vcCwgbWluUG9sbFRpbWUpO1xuICAgICAgICByZXRyeVBvbGxUaW1lID0gbWluUG9sbFRpbWU7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlcnZlckNvbm5lY3Rpb25FcnJvcikge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXJ2ZXJDb25uZWN0aW9uRXJyb3I6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5ID0gMDtcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChsb29wLCByZXRyeVBvbGxUaW1lKTtcbiAgICAgICAgaWYgKHJldHJ5UG9sbFRpbWUgPCBtYXhSZXRyeVBvbGxUaW1lKSB7XG4gICAgICAgICAgcmV0cnlQb2xsVGltZSA9IHJldHJ5UG9sbFRpbWUgKiByZXRyeUluY3JlYXNlRmFjdG9yO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5Kys7XG4gICAgICAgIGlmICh0aGlzLnNlcnZlckNvbm5lY3Rpb25SZXRyeSA+IDUpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmVyQ29ubmVjdGlvbkVycm9yOiB0cnVlIH0pO1xuICAgICAgICAgIC8vIFJlc2V0IHRoZSB1cGRhdGVJRCBzbyB0aGUgbmV4dCBwb2xsIHJldHVybnMgaW1tZWRpYXRlbHlcbiAgICAgICAgICAvLyBpbnN0ZWFkIG9mIGJlaW5nIGEgbG9uZyBwb2xsXG4gICAgICAgICAgdGhpcy51cGRhdGVJRCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgbG9vcCgpO1xuICB9XG5cbiAgcG9sbFNlcnZlcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9zdGF0aW9ucycsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBsYXN0VXBkYXRlSUQ6IHRoaXMudXBkYXRlSUQsXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgdGltZW91dDogMzAwMDAsXG4gICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGEuc3RhdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJRCA9IGRhdGEudXBkYXRlSUQ7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc3RhdGlvbnM6IGRhdGEuc3RhdGlvbnMgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByb3BzLnVybCwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZldGNoUHJlc2V0cygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9wcmVzZXRzJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICB0aW1lb3V0OiAzMDAwMCxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICBpZiAoZGF0YS5wcmVzZXRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwcmVzZXRzOiBkYXRhLnByZXNldHMgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByb3BzLnVybCwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHN0YXRpb25zID0gW107XG4gICAgY29uc3QgYWN0aW9ucyA9IFtdO1xuICAgIGxldCBtZXNzYWdlQmFyID0gJyc7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5zZXJ2ZXJDb25uZWN0aW9uRXJyb3IpIHtcbiAgICAgIG1lc3NhZ2VCYXIgPSAoPGRpdiBjbGFzc05hbWU9XCJtZXNzYWdlX2JhclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lc3NhZ2VfYmFyLW1lc3NhZ2VcIj5cbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS13YXJuaW5nXCI+PC9pPiAgTm8gY29ubmVjdGlvbiB0byBzZXJ2ZXIuXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+KTtcbiAgICB9XG5cbiAgICB0aGlzLmdldFZpc2libGVTdGF0aW9ucygpLmZvckVhY2goKHN0YXRpb24pID0+IHN0YXRpb25zLnB1c2goXG4gICAgICA8U3RhdGlvblxuICAgICAgICBzdGF0aW9uPXtzdGF0aW9ufVxuICAgICAgICBrZXk9e3N0YXRpb24uaWR9XG4gICAgICAgIHNlbGVjdGVkPXt0aGlzLnN0YXRlLnNlbGVjdGlvbi5oYXMoc3RhdGlvbi5pZCl9XG4gICAgICAgIG9uQ2xpY2tTdGF0aW9uPXt0aGlzLnNlbGVjdFRvZ2dsZX1cbiAgICAgICAgb25PcGVuVGVybWluYWxMb2c9e3RoaXMuc2hvd1Rlcm1pbmFsTG9nfVxuICAgICAgLz5cbiAgICApKTtcblxuICAgIGNvbnN0IGNvdW50cyA9IHt9O1xuICAgIHRoaXMuc3RhdGUuc3RhdGlvbnMuZm9yRWFjaCgoc3RhdGlvbikgPT4ge1xuICAgICAgaWYgKCFjb3VudHMuaGFzT3duUHJvcGVydHkodGhpcy5kaXNwbGF5U3RhdGUoc3RhdGlvbi5zdGF0ZSkpKSB7XG4gICAgICAgIGNvdW50c1t0aGlzLmRpc3BsYXlTdGF0ZShzdGF0aW9uLnN0YXRlKV0gPSAwO1xuICAgICAgfVxuICAgICAgY291bnRzW3RoaXMuZGlzcGxheVN0YXRlKHN0YXRpb24uc3RhdGUpXSsrO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRDb3VudCA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uLnNpemU7XG4gICAgY29uc3QgYWxsU2VsZWN0ZWQgPSAoc2VsZWN0ZWRDb3VudCA9PT0gdGhpcy5zdGF0ZS5zdGF0aW9ucy5sZW5ndGgpO1xuICAgIGNvbnN0IHNlbGVjdEFsbENsYXNzZXMgPVxuICAgICAgYGJ0biBidG4tZGVmYXVsdCAke2FsbFNlbGVjdGVkID8gJyBkaXNhYmxlZCcgOiAnJ31gO1xuXG4gICAgY29uc3QgZGVzZWxlY3RBbGxDbGFzc2VzID1cbiAgICAgIGBidG4gYnRuLWRlZmF1bHQgJHtzZWxlY3RlZENvdW50ID09PSAwID8gJyBkaXNhYmxlZCcgOiAnJ31gO1xuXG4gICAgY29uc3Qgc3RhdGlvbldvcmQgPSBzZWxlY3RlZENvdW50ID09PSAxID8gJ3N0YXRpb24nIDogJ3N0YXRpb25zJztcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic3RhdGlvblN0YXRlRmlsdGVyXCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPEJ1dHRvbkZpbHRlclxuICAgICAgICAgIG9wdGlvbnM9e1snb24nLCAnb2ZmJywgJ2J1c3knLCAnZXJyb3InXX1cbiAgICAgICAgICBjb3VudHM9e2NvdW50c31cbiAgICAgICAgICBhbGxUZXh0PVwiQWxsIHN0YXRlc1wiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmlzaWJsZVN0YXRlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmlzaWJsZVN0YXRlOiBvcHRpb24gfSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInN0YXRpb25UeXBlRmlsdGVyXCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPEJ1dHRvbkZpbHRlclxuICAgICAgICAgIG9wdGlvbnM9e3RoaXMuZ2V0U3RhdGlvblR5cGVzKCl9XG4gICAgICAgICAgYWxsVGV4dD1cIkFsbCB0eXBlc1wiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmlzaWJsZVR5cGV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhvcHRpb24pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2aXNpYmxlVHlwZTogb3B0aW9uIH0pO1xuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzZWxlY3RlZENvdW50XCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZS1zZXBhcmF0b3JcIiA+PC9kaXY+XG4gICAgICAgIDxiPnt0aGlzLnN0YXRlLnNlbGVjdGlvbi5zaXplfSB7c3RhdGlvbldvcmR9IHNlbGVjdGVkPC9iPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdEFjdGlvbnNcIj5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtkZXNlbGVjdEFsbENsYXNzZXN9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLWFsbC1kZXNlbGVjdCcpfVxuICAgICAgICAgID5EZXNlbGVjdDwvYT4mbmJzcDtcbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzZWxlY3RBbGxDbGFzc2VzfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy12aXNpYmxlLXNlbGVjdCcpfVxuICAgICAgICAgID5TZWxlY3QgYWxsPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBjb25zdCBub1NlbGVjdGlvbkRpc2FibGUgPSAoc2VsZWN0ZWRDb3VudCA9PT0gMCA/ICcgZGlzYWJsZWQnIDogJycpO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzdGFydFN0b3BQYW5lbFwiIGNsYXNzTmFtZT17YGFjdGlvbi1wYW5lJHtub1NlbGVjdGlvbkRpc2FibGV9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmUtc2VwYXJhdG9yXCIgPjwvZGl2PlxuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tc3VjY2VzcyR7bm9TZWxlY3Rpb25EaXNhYmxlfWB9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy1zZWxlY3RlZC1zdGFydCcpfVxuICAgICAgICA+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGxheVwiIC8+Jm5ic3A7Jm5ic3A7U3RhcnQgU2VsZWN0ZWQ8L2E+XG4gICAgICAgICZuYnNwO1xuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tZGFuZ2VyJHtub1NlbGVjdGlvbkRpc2FibGV9YH1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLXNlbGVjdGVkLXN0b3AnKX1cbiAgICAgICAgPjxpIGNsYXNzTmFtZT1cImZhIGZhLXN0b3BcIiAvPiZuYnNwOyZuYnNwO1N0b3AgU2VsZWN0ZWQ8L2E+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgbGV0IHNlbGVjdGVkQXJlU2FtZVR5cGUgPSB0cnVlO1xuICAgIGxldCBsYXN0VHlwZSA9IG51bGw7XG4gICAgZm9yIChjb25zdCBzZWxlY3RlZElEIG9mIHRoaXMuc3RhdGUuc2VsZWN0aW9uKSB7XG4gICAgICBpZiAobGFzdFR5cGUgPT09IG51bGwpIHtcbiAgICAgICAgbGFzdFR5cGUgPSB0aGlzLmdldFN0YXRpb25TdGF0ZShzZWxlY3RlZElEKS50eXBlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZ2V0U3RhdGlvblN0YXRlKHNlbGVjdGVkSUQpLnR5cGUgIT09IGxhc3RUeXBlKSB7XG4gICAgICAgIHNlbGVjdGVkQXJlU2FtZVR5cGUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGFsbFNlbGVjdGVkT24gPSB0cnVlO1xuICAgIGZvciAoY29uc3Qgc2VsZWN0ZWRJRCBvZiB0aGlzLnN0YXRlLnNlbGVjdGlvbikge1xuICAgICAgaWYgKHRoaXMuZ2V0U3RhdGlvblN0YXRlKHNlbGVjdGVkSUQpLnN0YXRlICE9PSAnb24nKSB7XG4gICAgICAgIGFsbFNlbGVjdGVkT24gPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2FuQ2hhbmdlQXBwID0gKGFsbFNlbGVjdGVkT24gJiYgKHNlbGVjdGVkQ291bnQgPiAwKSAmJiBzZWxlY3RlZEFyZVNhbWVUeXBlKTtcblxuICAgIGxldCBhcHBsaWNhdGlvbnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0aW9uLmhhcyhzdGF0aW9uLmlkKSkge1xuICAgICAgICBhcHBsaWNhdGlvbnMgPSBzdGF0aW9uLnBvc3NpYmxlX2FwcHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJhcHBTZWxlY3RcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lLXNlcGFyYXRvclwiID48L2Rpdj5cbiAgICAgICAgPEFwcFNlbGVjdFxuICAgICAgICAgIGFwcGxpY2F0aW9ucz17Y2FuQ2hhbmdlQXBwID8gYXBwbGljYXRpb25zIDogW119XG4gICAgICAgICAgZGlzYWJsZWQ9eyFjYW5DaGFuZ2VBcHB9XG4gICAgICAgICAgYWxsb3dCbGFua1xuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmF0dGFjaENvbmZpcm1hdGlvbignQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGUgYXBwbGljYXRpb24/JyxcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQXBwU2VsZWN0ZWQpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17bWVzc2FnZUJhciAhPT0gJycgPyAnd2l0aC1tZXNzYWdlX2JhcicgOiAnJ30+XG4gICAgICAgIHttZXNzYWdlQmFyfVxuICAgICAgICA8SGVhZGVyXG4gICAgICAgICAgb25TaG93R2xvYmFsTG9nPXt0aGlzLnNob3dHbG9iYWxMb2d9XG4gICAgICAgICAgb25TaG93Tm90aWZpY2F0aW9ucz17dGhpcy5zaG93Tm90aWZpY2F0aW9uc31cbiAgICAgICAgPlxuICAgICAgICAgIDxQcmVzZXRzQmxvY2tcbiAgICAgICAgICAgIHByZXNldHM9e3RoaXMuc3RhdGUucHJlc2V0c31cbiAgICAgICAgICAgIHN0YXRpb25zU2VsZWN0ZWQ9e3NlbGVjdGVkQ291bnQgPiAwfVxuICAgICAgICAgICAgb25DcmVhdGU9e3RoaXMuZ2V0Q29tbWFuZCgncHJlc2V0LWNyZWF0ZScpfVxuICAgICAgICAgICAgb25BY3RpdmF0ZT17dGhpcy5nZXRDb21tYW5kKCdwcmVzZXQtYWN0aXZhdGUnKX1cbiAgICAgICAgICAgIG9uQWN0aXZhdGVPblNlbGVjdGVkPXt0aGlzLmdldENvbW1hbmQoJ3ByZXNldC1hY3RpdmF0ZS1zZWxlY3RlZCcpfVxuICAgICAgICAgICAgb25EZWxldGU9e3RoaXMuZ2V0Q29tbWFuZCgncHJlc2V0LWRlbGV0ZScpfVxuICAgICAgICAgICAgb25VcGRhdGU9e3RoaXMuZ2V0Q29tbWFuZCgncHJlc2V0LXVwZGF0ZScpfVxuICAgICAgICAgICAgb25SZWZyZXNoPXt0aGlzLmdldENvbW1hbmQoJ3ByZXNldC1yZWZyZXNoJyl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9IZWFkZXI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTYgcGFuZS1zdGF0aW9uc1wiPlxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGFzaGJvYXJkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInN0YXRpb25MaXN0XCIgY2xhc3NOYW1lPVwicGFuZWwtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgIHtzdGF0aW9uc31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTYgcGFuZS1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJkYXNoYm9hcmRBY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAge2FjdGlvbnN9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8TG9nVmlld2VyIGxvZz17dGhpcy5zdGF0ZS5sb2d9IHJlZj17KGMpID0+IHsgdGhpcy5sb2dWaWV3ZXIgPSBjOyB9fSAvPlxuICAgICAgICA8Q29uc29sZVZpZXdlciBsaW5lcz17dGhpcy5zdGF0ZS5saW5lc30gcmVmPXsoYykgPT4geyB0aGlzLmNvbnNvbGVWaWV3ZXIgPSBjOyB9fSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5EYXNoYm9hcmQucHJvcFR5cGVzID0ge1xuICB1cmw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5oYW5kbGVHbG9iYWxMb2dDbGlja2VkID0gdGhpcy5oYW5kbGVHbG9iYWxMb2dDbGlja2VkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVOb3RpZmljYXRpb25zQ2xpY2tlZCA9IHRoaXMuaGFuZGxlTm90aWZpY2F0aW9uc0NsaWNrZWQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUdsb2JhbExvZ0NsaWNrZWQoZXYpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblNob3dHbG9iYWxMb2cpIHtcbiAgICAgIHRoaXMucHJvcHMub25TaG93R2xvYmFsTG9nKCk7XG4gICAgfVxuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBoYW5kbGVOb3RpZmljYXRpb25zQ2xpY2tlZChldikge1xuICAgIGlmICh0aGlzLnByb3BzLm9uU2hvd05vdGlmaWNhdGlvbnMpIHtcbiAgICAgIHRoaXMucHJvcHMub25TaG93Tm90aWZpY2F0aW9ucygpO1xuICAgIH1cbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8bmF2IGNsYXNzTmFtZT1cIm5hdmJhciBuYXZiYXItZGVmYXVsdCBuYXZiYXItZml4ZWQtdG9wXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZiYXItaGVhZGVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJuYXZiYXItdG9nZ2xlIGNvbGxhcHNlZFwiXG4gICAgICAgICAgICAgIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIlxuICAgICAgICAgICAgICBkYXRhLXRhcmdldD1cIiNicy1leGFtcGxlLW5hdmJhci1jb2xsYXBzZS0xXCJcbiAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD1cImZhbHNlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3Itb25seVwiPlRvZ2dsZSBuYXZpZ2F0aW9uPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uLWJhclwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb24tYmFyXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvbi1iYXJcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCIjXCI+SGlsYmVydDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2YmFyLWNvbGxhcHNlIGNvbGxhcHNlIG5hdmJhci1yaWdodFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IG5hdmJhci1idG5cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUdsb2JhbExvZ0NsaWNrZWR9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWRlc2t0b3BcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAmbmJzcDtcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBuYXZiYXItYnRuXCJcbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVOb3RpZmljYXRpb25zQ2xpY2tlZH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtYmVsbC1vXCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmF2PlxuICAgICk7XG4gIH1cbn1cblxuSGVhZGVyLnByb3BUeXBlcyA9IHtcbiAgb25TaG93R2xvYmFsTG9nOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgb25TaG93Tm90aWZpY2F0aW9uczogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbn07XG5cbkhlYWRlci5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uU2hvd0dsb2JhbExvZzogKCkgPT4ge30sXG4gIG9uU2hvd05vdGlmaWNhdGlvbnM6ICgpID0+IHt9LFxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ1ZpZXdlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGZvcm1hdFRpbWUoaXNvVGltZSkge1xuICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZShpc29UaW1lKTtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgeWVzdGVyZGF5ID0gbmV3IERhdGUoKTtcbiAgICB5ZXN0ZXJkYXkuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAxKTtcbiAgICBsZXQgZGF5ID0gJyc7XG5cbiAgICBpZiAodG9kYXkuZ2V0TW9udGgoKSA9PT0gdGltZS5nZXRNb250aCgpICYmXG4gICAgICB0b2RheS5nZXRGdWxsWWVhcigpID09PSB0aW1lLmdldEZ1bGxZZWFyKCkgJiZcbiAgICAgIHRvZGF5LmdldERhdGUoKSA9PT0gdGltZS5nZXREYXRlKCkpIHtcbiAgICAgIGRheSA9ICdUb2RheSc7XG4gICAgfSBlbHNlIGlmICh5ZXN0ZXJkYXkuZ2V0TW9udGgoKSA9PT0gdGltZS5nZXRNb250aCgpICYmXG4gICAgICB5ZXN0ZXJkYXkuZ2V0RnVsbFllYXIoKSA9PT0gdGltZS5nZXRGdWxsWWVhcigpICYmXG4gICAgICB5ZXN0ZXJkYXkuZ2V0RGF0ZSgpID09PSB0aW1lLmdldERhdGUoKSkge1xuICAgICAgZGF5ID0gJ1llc3RlcmRheSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRheSA9IGAke3RpbWUuZ2V0RnVsbFllYXIoKX0tJHt0aW1lLmdldE1vbnRoKCl9LSR7dGltZS5nZXREYXRlKCl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7ZGF5fSAke3RpbWUuZ2V0SG91cnMoKX06JHt0aW1lLmdldE1pbnV0ZXMoKX06JHt0aW1lLmdldFNlY29uZHMoKX1gO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5tb2RhbERJViA9IG51bGw7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsICgpID0+IHsgdGhpcy5oYW5kbGVSZXNpemUoKTsgfSk7XG4gICAgJCh0aGlzLm1vZGFsRElWKS5vbignc2hvdy5icy5tb2RhbCcsICgpID0+IHsgdGhpcy5oYW5kbGVSZXNpemUoKTsgfSk7XG4gIH1cblxuICBvcGVuTW9kYWwoKSB7XG4gICAgaWYgKHRoaXMubW9kYWxESVYgIT09IG51bGwpIHtcbiAgICAgICQodGhpcy5tb2RhbERJVikubW9kYWwoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVSZXNpemUoKSB7XG4gICAgY29uc3QgJG1vZGFsID0gJCh0aGlzLm1vZGFsRElWKTtcbiAgICBjb25zdCBtb2RhbEhlYWRlckhlaWdodCA9IDU2O1xuICAgIGNvbnN0IG1vZGFsTWFyZ2luID0gMzA7XG4gICAgY29uc3QgbW9kYWxCb3JkZXIgPSAxO1xuXG4gICAgY29uc3QgYm9keUhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIChtb2RhbEhlYWRlckhlaWdodCArIG1vZGFsTWFyZ2luICogMiArIG1vZGFsQm9yZGVyICogMik7XG4gICAgJG1vZGFsLmZpbmQoJy5tb2RhbC1ib2R5JykuY3NzKHsgbWF4SGVpZ2h0OiBib2R5SGVpZ2h0IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHJvd0NsYXNzZXMgPSB7XG4gICAgICBlcnJvcjogJ2RhbmdlcicsXG4gICAgICB3YXJuaW5nOiAnd2FybmluZycsXG4gICAgfTtcblxuICAgIGNvbnN0IGVudHJpZXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGxvZ0VudHJ5IG9mIHRoaXMucHJvcHMubG9nKSB7XG4gICAgICBjb25zdCByb3dDbGFzcyA9IHJvd0NsYXNzZXNbbG9nRW50cnkudHlwZV0gIT09IHVuZGVmaW5lZCA/IHJvd0NsYXNzZXNbbG9nRW50cnkudHlwZV0gOiAnJztcblxuICAgICAgZW50cmllcy5wdXNoKFxuICAgICAgICA8dHIga2V5PXtsb2dFbnRyeS5pZH0gY2xhc3NOYW1lPXtyb3dDbGFzc30+XG4gICAgICAgICAgPHRkPntMb2dWaWV3ZXIuZm9ybWF0VGltZShsb2dFbnRyeS50aW1lKX08L3RkPlxuICAgICAgICAgIDx0ZD57bG9nRW50cnkuc3RhdGlvbl9uYW1lfTwvdGQ+XG4gICAgICAgICAgPHRkPntsb2dFbnRyeS5tZXNzYWdlfTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGUgbG9nVmlld2VyLW1vZGFsXCIgdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiByZWY9eyhjKSA9PiB7IHRoaXMubW9kYWxESVYgPSBjOyB9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2cgbW9kYWwtbGdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+e3RoaXMucHJvcHMudGl0bGV9PC9oND5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1maXhlZCB0YWJsZS1jb25kZW5zZWRcIj5cbiAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5UaW1lPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlN0YXRpb248L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+TWVzc2FnZTwvdGg+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIHtlbnRyaWVzfVxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkxvZ1ZpZXdlci5wcm9wVHlwZXMgPSB7XG4gIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBsb2c6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICB0aW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgc3RhdGlvbl9pZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHN0YXRpb25fbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIG1lc3NhZ2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgfSlcbiAgKSxcbn07XG5cbkxvZ1ZpZXdlci5kZWZhdWx0UHJvcHMgPSB7XG4gIGxvZzogW10sXG4gIHRpdGxlOiAnRXZlbnQgTG9nJyxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4vZGFzaGJvYXJkLmpzeCc7XG5cbndpbmRvdy5kYXNoYm9hcmQgPSBudWxsO1xuXG4vLyBvblJlYWR5XG4kKCgpID0+IHtcbiAgd2luZG93LmRhc2hib2FyZCA9IFJlYWN0RE9NLnJlbmRlcihcbiAgICA8RGFzaGJvYXJkIHVybD1cIi9hcGkvc3RhdGlvbnNcIiAvPixcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGFzaGJvYXJkQ29udGFpbmVyJylcbiAgKTtcblxuICAvLyBJbnN0YWxsIGNsaWNrIGhhbmRsZXJzIGluIGV4dGVybmFsIG1lbnVzIGFuZCBidXR0b25zXG4gICQoJ1tkYXRhLWNvbW1hbmRdJykuZWFjaChmdW5jdGlvbiBzZXRDbGlja0hhbmRsZXIoKSB7XG4gICAgJCh0aGlzKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHdpbmRvdy5kYXNoYm9hcmQuZ2V0Q29tbWFuZCgkKHRoaXMpLmF0dHIoJ2RhdGEtY29tbWFuZCcpKSgpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXNldHNCbG9jayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZFByZXNldDogMCxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlUHJlc2V0Q2hhbmdlID0gdGhpcy5oYW5kbGVQcmVzZXRDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUFjdGl2YXRlID0gdGhpcy5oYW5kbGVBY3RpdmF0ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlQWN0aXZhdGVPblNlbGVjdGVkID0gdGhpcy5oYW5kbGVBY3RpdmF0ZU9uU2VsZWN0ZWQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVNhdmUgPSB0aGlzLmhhbmRsZVNhdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZURlbGV0ZSA9IHRoaXMuaGFuZGxlRGVsZXRlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVOZXcgPSB0aGlzLmhhbmRsZU5ldy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlUmVmcmVzaCA9IHRoaXMuaGFuZGxlUmVmcmVzaC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaGFuZGxlUHJlc2V0Q2hhbmdlKGV2KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkUHJlc2V0OiBOdW1iZXIucGFyc2VJbnQoZXYudGFyZ2V0LnZhbHVlLCAxMCkgfSk7XG4gIH1cblxuICBoYW5kbGVBY3RpdmF0ZSgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZFByZXNldCAhPT0gMCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkFjdGl2YXRlKHRoaXMuc3RhdGUuc2VsZWN0ZWRQcmVzZXQpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUFjdGl2YXRlT25TZWxlY3RlZCgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZFByZXNldCAhPT0gMCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkFjdGl2YXRlT25TZWxlY3RlZCh0aGlzLnN0YXRlLnNlbGVjdGVkUHJlc2V0KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTYXZlKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkUHJlc2V0ICE9PSAwKSB7XG4gICAgICB0aGlzLnByb3BzLm9uVXBkYXRlKHRoaXMuc3RhdGUuc2VsZWN0ZWRQcmVzZXQpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZURlbGV0ZSgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZFByZXNldCAhPT0gMCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkRlbGV0ZSh0aGlzLnN0YXRlLnNlbGVjdGVkUHJlc2V0KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVSZWZyZXNoKCkge1xuICAgIHRoaXMucHJvcHMub25SZWZyZXNoKHRoaXMuc3RhdGUuc2VsZWN0ZWRQcmVzZXQpO1xuICB9XG5cbiAgaGFuZGxlTmV3KCkge1xuICAgIHRoaXMucHJvcHMub25DcmVhdGUoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBvcHRpb25zID0gW1xuICAgICAgPG9wdGlvbiBrZXk9XCIwXCIgdmFsdWU9XCIwXCIgLz4sXG4gICAgXTtcblxuICAgIGZvciAoY29uc3QgcHJlc2V0IG9mIHRoaXMucHJvcHMucHJlc2V0cykge1xuICAgICAgb3B0aW9ucy5wdXNoKDxvcHRpb24ga2V5PXtwcmVzZXQuaWR9IHZhbHVlPXtwcmVzZXQuaWR9PntwcmVzZXQubmFtZX08L29wdGlvbj4pO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGlvbnNEaXNhYmxlZCA9ICh0aGlzLnN0YXRlLnNlbGVjdGVkUHJlc2V0ID09PSAwKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhci1mb3JtIG5hdmJhci1sZWZ0XCI+XG4gICAgICAgIFByZXNldHNcbiAgICAgICAgJm5ic3A7XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgcHJlc2V0cy1saXN0XCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnNlbGVjdGVkUHJlc2V0fVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUHJlc2V0Q2hhbmdlfVxuICAgICAgICAgID57b3B0aW9uc308L3NlbGVjdD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWJ0blwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImRyb3Bkb3duLXRvZ2dsZSBidG4gYnRuLWRlZmF1bHRcIlxuICAgICAgICAgICAgICBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJcbiAgICAgICAgICAgID48c3BhbiBjbGFzc05hbWU9XCJjYXJldFwiIC8+PC9idXR0b24+XG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudVwiPlxuICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXthY3Rpb25zRGlzYWJsZWQgPyAnZGlzYWJsZWQnIDogJyd9ID5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQWN0aXZhdGV9PlxuICAgICAgICAgICAgICAgICAgQWN0aXZhdGVcbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgIHsvKjxsaSBjbGFzc05hbWU9e2FjdGlvbnNEaXNhYmxlZCB8fCAhdGhpcy5wcm9wcy5zdGF0aW9uc1NlbGVjdGVkID8gJ2Rpc2FibGVkJyA6ICcnfSA+Ki99XG4gICAgICAgICAgICAgICAgey8qPGEgaHJlZj1cIiNcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUFjdGl2YXRlfT4qL31cbiAgICAgICAgICAgICAgICAgIHsvKkFjdGl2YXRlIG9uIHNlbGVjdGVkKi99XG4gICAgICAgICAgICAgICAgey8qPC9hPiovfVxuICAgICAgICAgICAgICB7Lyo8L2xpPiovfVxuICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXthY3Rpb25zRGlzYWJsZWQgPyAnZGlzYWJsZWQnIDogJyd9ID5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2F2ZX0+XG4gICAgICAgICAgICAgICAgICBTYXZlIGNoYW5nZXNcbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e2FjdGlvbnNEaXNhYmxlZCA/ICdkaXNhYmxlZCcgOiAnJ30gPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgb25DbGljaz17dGhpcy5oYW5kbGVEZWxldGV9PlxuICAgICAgICAgICAgICAgICAgRGVsZXRlXG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZGl2aWRlclwiPjwvbGk+XG4gICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTmV3fT5OZXcgcHJlc2V0Li4uPC9hPjwvbGk+XG4gICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJkaXZpZGVyXCI+PC9saT5cbiAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCIgb25DbGljaz17dGhpcy5oYW5kbGVSZWZyZXNofT5SZWZyZXNoPC9hPjwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuUHJlc2V0c0Jsb2NrLnByb3BUeXBlcyA9IHtcbiAgcHJlc2V0czogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHN0YXRpb25BcHBzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0T2YoUmVhY3QuUHJvcFR5cGVzLnN0cmluZyksXG4gICAgfSlcbiAgKSxcbiAgc3RhdGlvbnNTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ3JlYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgb25BY3RpdmF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQWN0aXZhdGVPblNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgb25EZWxldGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBvblVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uUmVmcmVzaDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5QcmVzZXRzQmxvY2suZGVmYXVsdFByb3BzID0ge1xuICBwcmVzZXRzOiBbXSxcbiAgc3RhdGlvbnNTZWxlY3RlZDogZmFsc2UsXG4gIG9uQ3JlYXRlOiAoKSA9PiB7fSxcbiAgb25BY3RpdmF0ZTogKCkgPT4ge30sXG4gIG9uQWN0aXZhdGVPblNlbGVjdGVkOiAoKSA9PiB7fSxcbiAgb25EZWxldGU6ICgpID0+IHt9LFxuICBvblVwZGF0ZTogKCkgPT4ge30sXG4gIG9uUmVmcmVzaDogKCkgPT4ge30sXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVPcGVuVGVybWluYWxMb2cgPSB0aGlzLmhhbmRsZU9wZW5UZXJtaW5hbExvZy5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaGFuZGxlQ2xpY2soKSB7XG4gICAgdGhpcy5wcm9wcy5vbkNsaWNrU3RhdGlvbih0aGlzLnByb3BzLnN0YXRpb24uaWQpO1xuICB9XG5cbiAgaGFuZGxlT3BlblRlcm1pbmFsTG9nKGV2KSB7XG4gICAgdGhpcy5wcm9wcy5vbk9wZW5UZXJtaW5hbExvZyh0aGlzLnByb3BzLnN0YXRpb24uaWQpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgc3RhdGlvbkNsYXNzZXMgPSBbXG4gICAgICAnc3RhdGlvbicsXG4gICAgICBgc3RhdGlvbi1zdGF0ZS0ke3RoaXMucHJvcHMuc3RhdGlvbi5zdGF0ZX1gLFxuICAgICAgYHN0YXRpb24tdHlwZS0ke3RoaXMucHJvcHMuc3RhdGlvbi50eXBlfWAsXG4gICAgXTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkKSB7XG4gICAgICBzdGF0aW9uQ2xhc3Nlcy5wdXNoKCdzdGF0aW9uLXNlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e3RoaXMucHJvcHMuc3RhdGlvbi5pZH1cbiAgICAgICAgY2xhc3NOYW1lPXtzdGF0aW9uQ2xhc3Nlcy5qb2luKCcgJyl9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1zdGF0ZS1saWdodFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24taWNvblwiPlxuICAgICAgICAgIDxpbWcgYWx0PXt0aGlzLnByb3BzLnN0YXRpb24uYXBwfSBzcmM9e3RoaXMucHJvcHMuc3RhdGlvbi5pY29ufSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLW5hbWVcIj57dGhpcy5wcm9wcy5zdGF0aW9uLm5hbWV9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi10eXBlXCI+e3RoaXMucHJvcHMuc3RhdGlvbi50eXBlfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tYXBwXCI+e3RoaXMucHJvcHMuc3RhdGlvbi5hcHB9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1zdGF0dXNcIj57dGhpcy5wcm9wcy5zdGF0aW9uLnN0YXR1c308L2Rpdj5cbiAgICAgICAgPGEgY2xhc3NOYW1lPVwic3RhdGlvbi1vdXRwdXQtYnV0dG9uXCIgb25DbGljaz17KGV2KSA9PiB7IHRoaXMuaGFuZGxlT3BlblRlcm1pbmFsTG9nKGV2KTsgfX0+XG4gICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtZGVza3RvcFwiPjwvaT5cbiAgICAgICAgPC9hPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TdGF0aW9uLnByb3BUeXBlcyA9IHtcbiAgc3RhdGlvbjogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN0YXRlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc3RhdHVzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFwcDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpY29uOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICB9KS5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2xpY2tTdGF0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgb25PcGVuVGVybWluYWxMb2c6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxufTtcbiJdfQ==
