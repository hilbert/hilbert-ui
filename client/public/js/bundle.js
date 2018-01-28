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
    key: 'createPreset',
    value: function createPreset() {
      var _this4 = this;

      var newPreset = {
        name: '',
        stationApps: {}
      };
      this.getVisibleStations().forEach(function (station) {
        if (_this4.state.selection.has(station.id)) {
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
            _this4.sendCreatePreset(newPreset);
          }
        }
      });
    }
  }, {
    key: 'sendCreatePreset',
    value: function sendCreatePreset(preset) {
      var _this5 = this;

      $.ajax({
        url: '/api/preset',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify(preset),
        dataType: 'json',
        cache: false,
        success: function success() {
          _this5.fetchPresets();
        },
        error: function error(xhr, status, err) {
          return console.error(status, err.toString());
        }
      });
    }
  }, {
    key: 'activatePreset',
    value: function activatePreset(presetID) {
      var _this6 = this;

      $.ajax({
        url: '/api/preset/' + presetID + '/activate',
        method: 'post',
        contentType: 'application/json',
        cache: false,
        success: function success() {
          _this6.fetchPresets();
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
      var _this7 = this;

      var minPollTime = 500;
      var retryPollTime = minPollTime;
      var retryIncreaseFactor = 2;
      var maxRetryPollTime = 4000;

      var loop = function loop() {
        _this7.pollServer().then(function () {
          setTimeout(loop, minPollTime);
          retryPollTime = minPollTime;
          if (_this7.state.serverConnectionError) {
            _this7.setState({ serverConnectionError: false });
          }
          _this7.serverConnectionRetry = 0;
        }).catch(function () {
          setTimeout(loop, retryPollTime);
          if (retryPollTime < maxRetryPollTime) {
            retryPollTime = retryPollTime * retryIncreaseFactor;
          }
          _this7.serverConnectionRetry++;
          if (_this7.serverConnectionRetry > 5) {
            _this7.setState({ serverConnectionError: true });
            // Reset the updateID so the next poll returns immediately
            // instead of being a long poll
            _this7.updateID = 0;
          }
        });
      };
      loop();
    }
  }, {
    key: 'pollServer',
    value: function pollServer() {
      var _this8 = this;

      return new Promise(function (resolve, reject) {
        $.ajax({
          url: '/api/stations',
          data: {
            lastUpdateID: _this8.updateID
          },
          dataType: 'json',
          cache: false,
          timeout: 30000,
          success: function success(data) {
            if (data.stations !== undefined) {
              _this8.updateID = data.updateID;
              _this8.setState({ stations: data.stations });
            }
            resolve();
          },
          error: function error(xhr, status, err) {
            console.error(_this8.props.url, status, err.toString());
            reject();
          }
        });
      });
    }
  }, {
    key: 'fetchPresets',
    value: function fetchPresets() {
      var _this9 = this;

      return new Promise(function (resolve, reject) {
        $.ajax({
          url: '/api/presets',
          cache: false,
          timeout: 30000,
          dataType: 'json',
          success: function success(data) {
            if (data.presets !== undefined) {
              _this9.setState({ presets: data.presets });
            }
            resolve();
          },
          error: function error(xhr, status, err) {
            console.error(_this9.props.url, status, err.toString());
            reject();
          }
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this10 = this;

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
          selected: _this10.state.selection.has(station.id),
          onClickStation: _this10.selectToggle,
          onOpenTerminalLog: _this10.showTerminalLog
        }));
      });

      var counts = {};
      this.state.stations.forEach(function (station) {
        if (!counts.hasOwnProperty(_this10.displayState(station.state))) {
          counts[_this10.displayState(station.state)] = 0;
        }
        counts[_this10.displayState(station.state)]++;
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
            _this10.deselectAll();
            _this10.setState({ visibleState: option });
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
            _this10.deselectAll();
            _this10.setState({ visibleType: option });
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
              if (_this10.logViewer !== null) {
                _this10.logViewer.openModal();
                $.ajax({
                  url: '/api/notifications',
                  method: 'get',
                  contentType: 'application/json',
                  cache: false,
                  success: function success(data) {
                    _this10.setState({ log: data.notifications.reverse() });
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
              if (_this10.consoleViewer !== null) {
                _this10.consoleViewer.openModal();
                $.ajax({
                  url: '/api/server/output',
                  method: 'get',
                  dataType: 'json',
                  contentType: 'application/json',
                  cache: false,
                  success: function success(data) {
                    _this10.setState({
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
            _this10.logViewer = c;
          } }),
        _react2.default.createElement(_consoleViewer2.default, { lines: this.state.lines, ref: function ref(c) {
            _this10.consoleViewer = c;
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

},{"./appSelect.jsx":1,"./buttonFilter.jsx":2,"./consoleViewer.jsx":3,"./logViewer.jsx":5,"./presetsBlock.jsx":7,"./station.jsx":8,"react":"react"}],5:[function(require,module,exports){
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

},{"react":"react"}],8:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwU2VsZWN0LmpzeCIsInNyYy9idXR0b25GaWx0ZXIuanN4Iiwic3JjL2NvbnNvbGVWaWV3ZXIuanN4Iiwic3JjL2Rhc2hib2FyZC5qc3giLCJzcmMvbG9nVmlld2VyLmpzeCIsInNyYy9tYWluLmpzeCIsInNyYy9wcmVzZXRzQmxvY2suanN4Iiwic3JjL3N0YXRpb24uanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7SUFJcUIsUzs7O0FBRW5CLHFCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxzSEFDWCxLQURXOztBQUVqQixVQUFLLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxVQUFLLGdCQUFMLEdBQXdCLE1BQUssZ0JBQUwsQ0FBc0IsSUFBdEIsT0FBeEI7QUFIaUI7QUFJbEI7Ozs7dUNBRWtCO0FBQ2pCLFVBQUksS0FBSyxLQUFMLENBQVcsUUFBZixFQUF5QjtBQUN2QixhQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEtBQUssV0FBTCxDQUFpQixLQUFyQztBQUNEO0FBQ0Y7Ozs2QkFFUTtBQUFBOztBQUNQLFVBQU0sZUFBZSxFQUFyQjs7QUFFQSxVQUFJLEtBQUssS0FBTCxDQUFXLFVBQWYsRUFBMkI7QUFDekIscUJBQWEsSUFBYixDQUNFO0FBQUE7QUFBQSxZQUFRLEtBQUksTUFBWixFQUFtQixPQUFNLEVBQXpCO0FBQUE7QUFBQSxTQURGO0FBR0Q7O0FBUE07QUFBQTtBQUFBOztBQUFBO0FBU1AsNkJBQTBCLEtBQUssS0FBTCxDQUFXLFlBQXJDLDhIQUFtRDtBQUFBLGNBQXhDLFdBQXdDOztBQUNqRCx1QkFBYSxJQUFiLENBQ0U7QUFBQTtBQUFBLGNBQVEsS0FBSyxXQUFiLEVBQTBCLE9BQU8sV0FBakM7QUFBK0M7QUFBL0MsV0FERjtBQUdEO0FBYk07QUFB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Uzs7a0JBQXRCLE87OztBQWtEckIsUUFBUSxTQUFSLEdBQW9CO0FBQ2xCLFdBQVMsZ0JBQU0sU0FBTixDQUFnQixLQUFoQixDQUFzQjtBQUM3QixRQUFJLGdCQUFNLFNBQU4sQ0FBZ0IsTUFEUztBQUU3QixVQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsTUFGTztBQUc3QixXQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsTUFITTtBQUk3QixVQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsTUFKTztBQUs3QixZQUFRLGdCQUFNLFNBQU4sQ0FBZ0IsTUFMSztBQU03QixTQUFLLGdCQUFNLFNBQU4sQ0FBZ0IsTUFOUTtBQU83QixVQUFNLGdCQUFNLFNBQU4sQ0FBZ0I7QUFQTyxHQUF0QixFQVFOLFVBVGU7QUFVbEIsWUFBVSxnQkFBTSxTQUFOLENBQWdCLElBVlI7QUFXbEIsa0JBQWdCLGdCQUFNLFNBQU4sQ0FBZ0IsSUFYZDtBQVlsQixxQkFBbUIsZ0JBQU0sU0FBTixDQUFnQjtBQVpqQixDQUFwQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG4vKipcbiAqIEFwcFNlbGVjdCBjb21wb25lbnRcbiAqIEFsbG93cyB0aGUgdXNlciB0byBzZWxlY3QgYW4gYXBwbGljYXRpb24gZnJvbSBhIGxpc3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwU2VsZWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmFwcFNlbGVjdG9yID0gbnVsbDtcbiAgICB0aGlzLmNsaWNrZWRDaGFuZ2VBcHAgPSB0aGlzLmNsaWNrZWRDaGFuZ2VBcHAuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNsaWNrZWRDaGFuZ2VBcHAoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5hcHBTZWxlY3Rvci52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGFwcGxpY2F0aW9ucyA9IFtdO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuYWxsb3dCbGFuaykge1xuICAgICAgYXBwbGljYXRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PVwibnVsbFwiIHZhbHVlPVwiXCI+Jm5ic3A7PC9vcHRpb24+XG4gICAgICApO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgYXBwbGljYXRpb24gb2YgdGhpcy5wcm9wcy5hcHBsaWNhdGlvbnMpIHtcbiAgICAgIGFwcGxpY2F0aW9ucy5wdXNoKFxuICAgICAgICA8b3B0aW9uIGtleT17YXBwbGljYXRpb259IHZhbHVlPXthcHBsaWNhdGlvbn0+e2FwcGxpY2F0aW9ufTwvb3B0aW9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBkaXNhYmxlZENsYXNzID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPyAnIGRpc2FibGVkJyA6ICcnKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGFwcFNlbGVjdCR7ZGlzYWJsZWRDbGFzc31gfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWlubGluZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBmb3JtLWdyb3VwLW1pbndpZHRoXCI+XG4gICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCR7ZGlzYWJsZWRDbGFzc31gfVxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuZGVmYXVsdFZhbHVlID8gdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgOiAnJ31cbiAgICAgICAgICAgICAgcmVmPXsoc2VsKSA9PiB7IHRoaXMuYXBwU2VsZWN0b3IgPSBzZWw7IH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHthcHBsaWNhdGlvbnN9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAmbmJzcDtcbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi13YXJuaW5nJHtkaXNhYmxlZENsYXNzfWB9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNsaWNrZWRDaGFuZ2VBcHB9XG4gICAgICAgICAgPkNoYW5nZSBhcHBsaWNhdGlvbjwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkFwcFNlbGVjdC5wcm9wVHlwZXMgPSB7XG4gIGFwcGxpY2F0aW9uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICApLFxuICBkZWZhdWx0VmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGFsbG93Qmxhbms6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbn07XG5cbkFwcFNlbGVjdC5kZWZhdWx0UHJvcHMgPSB7XG4gIGFwcGxpY2F0aW9uczogW10sXG4gIGRlZmF1bHRWYWx1ZTogJycsXG4gIGFsbG93Qmxhbms6IGZhbHNlLFxuICBkaXNhYmxlZDogZmFsc2UsXG4gIG9uQ2hhbmdlOiAoKSA9PiB7fSxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBCdXR0b25GaWx0ZXIgPSAocHJvcHMpID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuXG4gIGZvciAoY29uc3Qgb3B0aW9uIG9mIHByb3BzLm9wdGlvbnMpIHtcbiAgICBjb25zdCBjbGFzc2VzID0gWydidG4nLCAnYnRuLWRlZmF1bHQnLCBgYnV0dG9uLWZpbHRlci1vcHRpb24tJHtvcHRpb259YF07XG4gICAgaWYgKHByb3BzLnZhbHVlID09PSBvcHRpb24pIHtcbiAgICAgIGNsYXNzZXMucHVzaCgnYWN0aXZlJyk7XG4gICAgfVxuICAgIGxldCBjb3VudGVyID0gJyc7XG4gICAgbGV0IHNwYWNpbmcgPSAnJztcbiAgICBpZiAocHJvcHMuY291bnRzICE9PSBudWxsKSB7XG4gICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgaWYgKHByb3BzLmNvdW50cy5oYXNPd25Qcm9wZXJ0eShvcHRpb24pICYmIHByb3BzLmNvdW50c1tvcHRpb25dICE9PSAwKSB7XG4gICAgICAgIGNvdW50ID0gcHJvcHMuY291bnRzW29wdGlvbl07XG4gICAgICB9XG4gICAgICBjb25zdCBiYWRnZUNsYXNzZXMgPSBgYmFkZ2Uke2NvdW50ID09PSAwID8gJyB6ZXJvJyA6ICcgbm9uLXplcm8nfWA7XG4gICAgICBjb3VudGVyID0gKDxzcGFuIGNsYXNzTmFtZT17YmFkZ2VDbGFzc2VzfT57Y291bnR9PC9zcGFuPik7XG4gICAgICBzcGFjaW5nID0gJyAnO1xuICAgIH1cbiAgICBvcHRpb25zLnB1c2goXG4gICAgICA8YVxuICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKCcgJyl9XG4gICAgICAgIGtleT17b3B0aW9ufVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBwcm9wcy5vbkNoYW5nZShvcHRpb24pfVxuICAgICAgPntvcHRpb259e3NwYWNpbmd9e2NvdW50ZXJ9PC9hPlxuICAgICk7XG4gIH1cblxuICBjb25zdCBkZWZhdWx0Q2xhc3NlcyA9IFsnYnRuJywgJ2J0bi1kZWZhdWx0J107XG4gIGlmIChwcm9wcy52YWx1ZSA9PT0gJycpIHtcbiAgICBkZWZhdWx0Q2xhc3Nlcy5wdXNoKCdhY3RpdmUnKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJidG4tdG9vbGJhciBidXR0b24tZmlsdGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cFwiPlxuICAgICAgICA8YVxuICAgICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgICBjbGFzc05hbWU9e2RlZmF1bHRDbGFzc2VzLmpvaW4oJyAnKX1cbiAgICAgICAgICBrZXk9XCJudWxsXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBwcm9wcy5vbkNoYW5nZSgnJyl9XG4gICAgICAgID57cHJvcHMuYWxsVGV4dH08L2E+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgIHtvcHRpb25zfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5CdXR0b25GaWx0ZXIucHJvcFR5cGVzID0ge1xuICBvcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nKSxcbiAgY291bnRzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gIGFsbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5CdXR0b25GaWx0ZXIuZGVmYXVsdFByb3BzID0ge1xuICBvcHRpb25zOiBbXSxcbiAgY291bnRzOiBudWxsLFxuICBhbGxUZXh0OiAnQWxsJyxcbiAgdmFsdWU6ICcnLFxuICBvbkNoYW5nZTogKCkgPT4ge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25GaWx0ZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zb2xlVmlld2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLm1vZGFsRElWID0gbnVsbDtcbiAgfVxuXG4gIG9wZW5Nb2RhbCgpIHtcbiAgICBpZiAodGhpcy5tb2RhbERJViAhPT0gbnVsbCkge1xuICAgICAgJCh0aGlzLm1vZGFsRElWKS5tb2RhbCgpO1xuICAgICAgJCh0aGlzLm1vZGFsRElWKS5vbignc2hvd24uYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgbW9kYWxCb2R5ID0gJCh0aGlzKS5maW5kKCcubW9kYWwtYm9keScpLmZpcnN0KClbMF07XG4gICAgICAgIG1vZGFsQm9keS5zY3JvbGxUb3AgPSBNYXRoLm1heChtb2RhbEJvZHkuc2Nyb2xsSGVpZ2h0LCBtb2RhbEJvZHkuY2xpZW50SGVpZ2h0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICQod2luZG93KS5vbigncmVzaXplJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgICAkKHRoaXMubW9kYWxESVYpLm9uKCdzaG93LmJzLm1vZGFsJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZSgpIHtcbiAgICBjb25zdCAkbW9kYWwgPSAkKHRoaXMubW9kYWxESVYpO1xuICAgIGNvbnN0IG1vZGFsSGVhZGVySGVpZ2h0ID0gNTY7XG4gICAgY29uc3QgbW9kYWxNYXJnaW4gPSAzMDtcbiAgICBjb25zdCBtb2RhbEJvcmRlciA9IDE7XG5cbiAgICBjb25zdCBib2R5SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gKG1vZGFsSGVhZGVySGVpZ2h0ICsgbW9kYWxNYXJnaW4gKiAyICsgbW9kYWxCb3JkZXIgKiAyKTtcbiAgICAkbW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5jc3MoeyBtYXhIZWlnaHQ6IGJvZHlIZWlnaHQgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZSBjb25zb2xlVmlld2VyLW1vZGFsXCIgdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiByZWY9eyhjKSA9PiB7IHRoaXMubW9kYWxESVYgPSBjOyB9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2cgbW9kYWwtbGdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+e3RoaXMucHJvcHMudGl0bGV9PC9oND5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgIDxwcmU+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGluZXMuam9pbignXFxuJyl9XG4gICAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Db25zb2xlVmlld2VyLnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGxpbmVzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nKSxcbn07XG5cbkNvbnNvbGVWaWV3ZXIuZGVmYXVsdFByb3BzID0ge1xuICB0aXRsZTogJ1Rlcm1pbmFsIE91dHB1dCcsXG4gIGxpbmVzOiBbXSxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFN0YXRpb24gZnJvbSAnLi9zdGF0aW9uLmpzeCc7XG5pbXBvcnQgQXBwU2VsZWN0IGZyb20gJy4vYXBwU2VsZWN0LmpzeCc7XG5pbXBvcnQgQnV0dG9uRmlsdGVyIGZyb20gJy4vYnV0dG9uRmlsdGVyLmpzeCc7XG5pbXBvcnQgTG9nVmlld2VyIGZyb20gJy4vbG9nVmlld2VyLmpzeCc7XG5pbXBvcnQgQ29uc29sZVZpZXdlciBmcm9tICcuL2NvbnNvbGVWaWV3ZXIuanN4JztcbmltcG9ydCBQcmVzZXRzQmxvY2sgZnJvbSAnLi9wcmVzZXRzQmxvY2suanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFzaGJvYXJkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc3RhdGlvbnM6IFtdLFxuICAgICAgc2VsZWN0aW9uOiBuZXcgU2V0KCksXG4gICAgICB2aXNpYmxlVHlwZTogJycsXG4gICAgICB2aXNpYmxlU3RhdGU6ICcnLFxuICAgICAgbG9nOiBbXSxcbiAgICAgIHNlcnZlckNvbm5lY3Rpb25FcnJvcjogZmFsc2UsXG4gICAgICBwcmVzZXRzOiBbXSxcbiAgICB9O1xuICAgIHRoaXMuc2VsZWN0VG9nZ2xlID0gdGhpcy5zZWxlY3RUb2dnbGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNoYW5nZUFwcFNlbGVjdGVkID0gdGhpcy5jaGFuZ2VBcHBTZWxlY3RlZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2hvd1Rlcm1pbmFsTG9nID0gdGhpcy5zaG93VGVybWluYWxMb2cuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNvbW1hbmRzID0ge307XG4gICAgdGhpcy5pbml0Q29tbWFuZHMoKTtcbiAgICB0aGlzLmdldENvbW1hbmQgPSB0aGlzLmdldENvbW1hbmQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvZ1ZpZXdlciA9IG51bGw7XG4gICAgdGhpcy5jb25zb2xlVmlld2VyID0gbnVsbDtcbiAgICB0aGlzLnVwZGF0ZUlEID0gMDtcbiAgICB0aGlzLnNlcnZlckNvbm5lY3Rpb25SZXRyeSA9IDA7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnBvbGxMb29wKCk7XG4gICAgdGhpcy5mZXRjaFByZXNldHMoKTtcbiAgfVxuXG4gIGdldFN0YXRpb25TdGF0ZShzdGF0aW9uSUQpIHtcbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgaWYgKHN0YXRpb24uaWQgPT09IHN0YXRpb25JRCkge1xuICAgICAgICByZXR1cm4gc3RhdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRTdGF0aW9uVHlwZXMoKSB7XG4gICAgY29uc3QgdHlwZXMgPSBuZXcgU2V0KCk7XG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIHR5cGVzLmFkZChzdGF0aW9uLnR5cGUpO1xuICAgIH1cblxuICAgIHJldHVybiBBcnJheS5mcm9tKHR5cGVzKTtcbiAgfVxuXG4gIGdldENvbW1hbmQoY29tbWFuZE5hbWUpIHtcbiAgICBpZiAodGhpcy5jb21tYW5kc1tjb21tYW5kTmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29tbWFuZHNbY29tbWFuZE5hbWVdLmRvQ2FsbGJhY2s7XG4gICAgfVxuICAgIHRocm93IEVycm9yKGBDYWxsIHRvIGludmFsaWQgY29tbWFuZCAke2NvbW1hbmROYW1lfWApO1xuICB9XG5cbiAgZ2V0VmlzaWJsZVN0YXRpb25zKCkge1xuICAgIGNvbnN0IGFuc3dlciA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIGlmICgodGhpcy5zdGF0ZS52aXNpYmxlVHlwZSA9PT0gJycgfHwgc3RhdGlvbi50eXBlID09PSB0aGlzLnN0YXRlLnZpc2libGVUeXBlKSAmJlxuICAgICAgICAgICh0aGlzLnN0YXRlLnZpc2libGVTdGF0ZSA9PT0gJycgfHxcbiAgICAgICAgICAgdGhpcy5kaXNwbGF5U3RhdGUoc3RhdGlvbi5zdGF0ZSkgPT09IHRoaXMuc3RhdGUudmlzaWJsZVN0YXRlKSkge1xuICAgICAgICBhbnN3ZXIucHVzaChzdGF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYW5zd2VyO1xuICB9XG5cbiAgZGlzcGxheVN0YXRlKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlID09PSAnc3RhcnRpbmdfc3RhdGlvbicgfHxcbiAgICAgIHN0YXRlID09PSAnc3RhcnRpbmdfYXBwJyB8fFxuICAgICAgc3RhdGUgPT09ICdzdG9wcGluZycgfHxcbiAgICAgIHN0YXRlID09PSAnc3dpdGNoaW5nX2FwcCcpIHtcbiAgICAgIHJldHVybiAnYnVzeSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgYXR0YWNoQ29uZmlybWF0aW9uKHRleHQsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICBib290Ym94LmRpYWxvZyh7XG4gICAgICAgIG1lc3NhZ2U6IHRleHQsXG4gICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICB3YXJuaW5nOiB7XG4gICAgICAgICAgICBsYWJlbDogJ0NvbmZpcm0nLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuLXdhcm5pbmcnLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLmJpbmQodGhpcywgLi4uYXJncyksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjYW5jZWw6IHtcbiAgICAgICAgICAgIGxhYmVsOiAnQ2FuY2VsJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bi1kZWZhdWx0JyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGluaXRDb21tYW5kcygpIHtcbiAgICB0aGlzLmNvbW1hbmRzID0ge1xuICAgICAgJ3N0YXRpb25zLWFsbC1zdGFydCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RhcnRBbGwuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzdGFydCBhbGwgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1hbGwtc3RvcCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RvcEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3N0b3AgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtYWxsLXNlbGVjdCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc2VsZWN0QWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc2VsZWN0IGFsbCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IGZhbHNlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1hbGwtZGVzZWxlY3QnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLmRlc2VsZWN0QWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnZGVzZWxlY3QgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLXNlbGVjdGVkLXN0YXJ0Jzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5zdGFydFNlbGVjdGVkLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RhcnQgdGhlIHNlbGVjdGVkIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtc2VsZWN0ZWQtc3RvcCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RvcFNlbGVjdGVkLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RvcCB0aGUgc2VsZWN0ZWQgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy12aXNpYmxlLXNlbGVjdCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc2VsZWN0QWxsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3NlbGVjdCB2aXNpYmxlIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgJ3ByZXNldC1jcmVhdGUnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLmNyZWF0ZVByZXNldC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ2NyZWF0ZSBhIHByZXNldCcsXG4gICAgICAgIGNvbmZpcm06IGZhbHNlLFxuICAgICAgfSxcbiAgICAgICdwcmVzZXQtYWN0aXZhdGUnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLmFjdGl2YXRlUHJlc2V0LmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnYWN0aXZhdGUgYSBwcmVzZXQnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdwcmVzZXQtZGVsZXRlJzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5kZWxldGVQcmVzZXQuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdkZWxldGUgYSBwcmVzZXQnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5rZXlzKHRoaXMuY29tbWFuZHMpKSB7XG4gICAgICBjb25zdCBjb21tYW5kID0gdGhpcy5jb21tYW5kc1tuYW1lXTtcbiAgICAgIGlmIChjb21tYW5kLmNvbmZpcm0pIHtcbiAgICAgICAgdGhpcy5jb21tYW5kc1tuYW1lXS5kb0NhbGxiYWNrID0gdGhpcy5hdHRhY2hDb25maXJtYXRpb24oXG4gICAgICAgICAgYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byAke2NvbW1hbmQudGl0bGV9P2AsXG4gICAgICAgICAgY29tbWFuZC5jYWxsYmFja1xuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21tYW5kc1tuYW1lXS5kb0NhbGxiYWNrID0gY29tbWFuZC5jYWxsYmFjaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhbGxTdGF0aW9uSURzKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRpb25JRHModGhpcy5zdGF0ZS5zdGF0aW9ucyk7XG4gIH1cblxuICBzdGF0aW9uSURzKHN0YXRpb25zKSB7XG4gICAgY29uc3QgaWRzID0gbmV3IFNldCgpO1xuXG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHN0YXRpb25zKSB7XG4gICAgICBpZHMuYWRkKHN0YXRpb24uaWQpO1xuICAgIH1cblxuICAgIHJldHVybiBpZHM7XG4gIH1cblxuICBzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogdGhpcy5hbGxTdGF0aW9uSURzKCkgfSk7XG4gIH1cblxuICBzZWxlY3RBbGxWaXNpYmxlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3Rpb246IHRoaXMuc3RhdGlvbklEcyh0aGlzLmdldFZpc2libGVTdGF0aW9ucygpKSB9KTtcbiAgfVxuXG4gIGRlc2VsZWN0QWxsKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3Rpb246IG5ldyBTZXQoKSB9KTtcbiAgfVxuXG4gIHNlbGVjdFRvZ2dsZShpZCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGlvbi5oYXMoaWQpKSB7XG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbi5kZWxldGUoaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbi5hZGQoaWQpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW9uOiB0aGlzLnN0YXRlLnNlbGVjdGlvbiB9KTtcbiAgfVxuXG4gIHN0b3BTdGF0aW9ucyhzdGF0aW9uSURzKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvc3RhdGlvbnMvc3RvcCcsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGlkczogQXJyYXkuZnJvbShzdGF0aW9uSURzKSxcbiAgICAgIH0pLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHt9LFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICB9XG5cbiAgc3RvcFNlbGVjdGVkKCkge1xuICAgIHRoaXMuc3RvcFN0YXRpb25zKHRoaXMuc3RhdGUuc2VsZWN0aW9uKTtcbiAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gIH1cblxuICBzdG9wQWxsKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3BTdGF0aW9ucyh0aGlzLmFsbFN0YXRpb25JRHMoKSk7XG4gIH1cblxuICBzdGFydFN0YXRpb25zKHN0YXRpb25JRHMpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9zdGF0aW9ucy9zdGFydCcsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGlkczogQXJyYXkuZnJvbShzdGF0aW9uSURzKSxcbiAgICAgIH0pLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHt9LFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICB9XG5cbiAgc3RhcnRTZWxlY3RlZCgpIHtcbiAgICB0aGlzLnN0YXJ0U3RhdGlvbnModGhpcy5zdGF0ZS5zZWxlY3Rpb24pO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHN0YXJ0QWxsKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0U3RhdGlvbnModGhpcy5hbGxTdGF0aW9uSURzKCkpO1xuICB9XG5cbiAgY2hhbmdlQXBwU2VsZWN0ZWQoYXBwKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvc3RhdGlvbnMvY2hhbmdlX2FwcCcsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGlkczogQXJyYXkuZnJvbSh0aGlzLnN0YXRlLnNlbGVjdGlvbiksXG4gICAgICAgIGFwcCxcbiAgICAgIH0pLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHt9LFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHNob3dUZXJtaW5hbExvZyhzdGF0aW9uSUQpIHtcbiAgICBpZiAodGhpcy5jb25zb2xlVmlld2VyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmNvbnNvbGVWaWV3ZXIub3Blbk1vZGFsKCk7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGAvYXBpL3N0YXRpb24vJHtzdGF0aW9uSUR9L291dHB1dGAsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHRpdGxlOiBzdGF0aW9uSUQsXG4gICAgICAgICAgICBsaW5lczogZGF0YS5saW5lcyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlUHJlc2V0KCkge1xuICAgIGNvbnN0IG5ld1ByZXNldCA9IHtcbiAgICAgIG5hbWU6ICcnLFxuICAgICAgc3RhdGlvbkFwcHM6IHt9LFxuICAgIH07XG4gICAgdGhpcy5nZXRWaXNpYmxlU3RhdGlvbnMoKS5mb3JFYWNoKChzdGF0aW9uKSA9PiB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3Rpb24uaGFzKHN0YXRpb24uaWQpKSB7XG4gICAgICAgIG5ld1ByZXNldC5zdGF0aW9uQXBwc1tzdGF0aW9uLmlkXSA9IHN0YXRpb24uYXBwO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYm9vdGJveC5wcm9tcHQoe1xuICAgICAgc2l6ZTogJ3NtYWxsJyxcbiAgICAgIHRpdGxlOiAnRW50ZXIgYSBuYW1lIGZvciB0aGUgcHJlc2V0JyxcbiAgICAgIG1lc3NhZ2U6IGBUaGUgcHJlc2V0IGluY2x1ZGVzIHRoZSAke3RoaXMuc3RhdGUuc2VsZWN0aW9uLmxlbmd0aH0gc2VsZWN0ZWQgc3RhdGlvbnNgLFxuICAgICAgYnV0dG9uczoge1xuICAgICAgICBjb25maXJtOiB7XG4gICAgICAgICAgbGFiZWw6ICdDcmVhdGUnLFxuICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bi1zdWNjZXNzJyxcbiAgICAgICAgfSxcbiAgICAgICAgY2FuY2VsOiB7XG4gICAgICAgICAgbGFiZWw6ICdDYW5jZWwnLFxuICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bi1kZWZhdWx0JyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBjYWxsYmFjazogKHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0ICE9PSBudWxsKSB7XG4gICAgICAgICAgbmV3UHJlc2V0Lm5hbWUgPSByZXN1bHQuc3Vic3RyKDAsIDUwKTtcbiAgICAgICAgICB0aGlzLnNlbmRDcmVhdGVQcmVzZXQobmV3UHJlc2V0KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHNlbmRDcmVhdGVQcmVzZXQocHJlc2V0KSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvcHJlc2V0JyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHByZXNldCksXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICB0aGlzLmZldGNoUHJlc2V0cygpO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICB9KTtcbiAgfVxuXG4gIGFjdGl2YXRlUHJlc2V0KHByZXNldElEKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogYC9hcGkvcHJlc2V0LyR7cHJlc2V0SUR9L2FjdGl2YXRlYCxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgdGhpcy5mZXRjaFByZXNldHMoKTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gIH1cblxuICBkZWxldGVQcmVzZXQocHJlc2V0SUQpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiBgL2FwaS9wcmVzZXQvJHtwcmVzZXRJRH1gLFxuICAgICAgbWV0aG9kOiAnZGVsZXRlJyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICB9LFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSB0aGUgc2VydmVyIHBvbGxcbiAgICpcbiAgICogSW1wbGVtZW50YXRpb246IFNpbmNlIHRoZSBzZXJ2ZXIgdXNlcyBsb25nIHBvbGxpbmcgd2UgdXNlIGEgdmVyeSBzaG9ydFxuICAgKiBwb2xsIHRpbWUgKDUwMG1zKS4gSW4gY2FzZSBvZiBlcnJvcnMgY29udGFjdGluZyB0aGUgc2VydmVyIHRoZSBwb2xsIHRpbWVcbiAgICogaW5jcmVhc2VzIHdpdGggZWFjaCBlcnJvciB1bnRpbCBhIG1heCBwb2xsIHRpbWUgaXMgcmVhY2hlZC5cbiAgICovXG4gIHBvbGxMb29wKCkge1xuICAgIGNvbnN0IG1pblBvbGxUaW1lID0gNTAwO1xuICAgIGxldCByZXRyeVBvbGxUaW1lID0gbWluUG9sbFRpbWU7XG4gICAgY29uc3QgcmV0cnlJbmNyZWFzZUZhY3RvciA9IDI7XG4gICAgY29uc3QgbWF4UmV0cnlQb2xsVGltZSA9IDQwMDA7XG5cbiAgICBjb25zdCBsb29wID0gKCkgPT4ge1xuICAgICAgdGhpcy5wb2xsU2VydmVyKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQobG9vcCwgbWluUG9sbFRpbWUpO1xuICAgICAgICByZXRyeVBvbGxUaW1lID0gbWluUG9sbFRpbWU7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlcnZlckNvbm5lY3Rpb25FcnJvcikge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXJ2ZXJDb25uZWN0aW9uRXJyb3I6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5ID0gMDtcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChsb29wLCByZXRyeVBvbGxUaW1lKTtcbiAgICAgICAgaWYgKHJldHJ5UG9sbFRpbWUgPCBtYXhSZXRyeVBvbGxUaW1lKSB7XG4gICAgICAgICAgcmV0cnlQb2xsVGltZSA9IHJldHJ5UG9sbFRpbWUgKiByZXRyeUluY3JlYXNlRmFjdG9yO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5Kys7XG4gICAgICAgIGlmICh0aGlzLnNlcnZlckNvbm5lY3Rpb25SZXRyeSA+IDUpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmVyQ29ubmVjdGlvbkVycm9yOiB0cnVlIH0pO1xuICAgICAgICAgIC8vIFJlc2V0IHRoZSB1cGRhdGVJRCBzbyB0aGUgbmV4dCBwb2xsIHJldHVybnMgaW1tZWRpYXRlbHlcbiAgICAgICAgICAvLyBpbnN0ZWFkIG9mIGJlaW5nIGEgbG9uZyBwb2xsXG4gICAgICAgICAgdGhpcy51cGRhdGVJRCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgbG9vcCgpO1xuICB9XG5cbiAgcG9sbFNlcnZlcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9zdGF0aW9ucycsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBsYXN0VXBkYXRlSUQ6IHRoaXMudXBkYXRlSUQsXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgdGltZW91dDogMzAwMDAsXG4gICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGEuc3RhdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJRCA9IGRhdGEudXBkYXRlSUQ7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc3RhdGlvbnM6IGRhdGEuc3RhdGlvbnMgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByb3BzLnVybCwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZldGNoUHJlc2V0cygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9wcmVzZXRzJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICB0aW1lb3V0OiAzMDAwMCxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICBpZiAoZGF0YS5wcmVzZXRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwcmVzZXRzOiBkYXRhLnByZXNldHMgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByb3BzLnVybCwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHN0YXRpb25zID0gW107XG4gICAgY29uc3QgYWN0aW9ucyA9IFtdO1xuICAgIGxldCBtZXNzYWdlQmFyID0gJyc7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5zZXJ2ZXJDb25uZWN0aW9uRXJyb3IpIHtcbiAgICAgIG1lc3NhZ2VCYXIgPSAoPGRpdiBjbGFzc05hbWU9XCJtZXNzYWdlX2JhclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lc3NhZ2VfYmFyLW1lc3NhZ2VcIj5cbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS13YXJuaW5nXCI+PC9pPiAgTm8gY29ubmVjdGlvbiB0byBzZXJ2ZXIuXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+KTtcbiAgICB9XG5cbiAgICB0aGlzLmdldFZpc2libGVTdGF0aW9ucygpLmZvckVhY2goKHN0YXRpb24pID0+IHN0YXRpb25zLnB1c2goXG4gICAgICA8U3RhdGlvblxuICAgICAgICBzdGF0aW9uPXtzdGF0aW9ufVxuICAgICAgICBrZXk9e3N0YXRpb24uaWR9XG4gICAgICAgIHNlbGVjdGVkPXt0aGlzLnN0YXRlLnNlbGVjdGlvbi5oYXMoc3RhdGlvbi5pZCl9XG4gICAgICAgIG9uQ2xpY2tTdGF0aW9uPXt0aGlzLnNlbGVjdFRvZ2dsZX1cbiAgICAgICAgb25PcGVuVGVybWluYWxMb2c9e3RoaXMuc2hvd1Rlcm1pbmFsTG9nfVxuICAgICAgLz5cbiAgICApKTtcblxuICAgIGNvbnN0IGNvdW50cyA9IHt9O1xuICAgIHRoaXMuc3RhdGUuc3RhdGlvbnMuZm9yRWFjaCgoc3RhdGlvbikgPT4ge1xuICAgICAgaWYgKCFjb3VudHMuaGFzT3duUHJvcGVydHkodGhpcy5kaXNwbGF5U3RhdGUoc3RhdGlvbi5zdGF0ZSkpKSB7XG4gICAgICAgIGNvdW50c1t0aGlzLmRpc3BsYXlTdGF0ZShzdGF0aW9uLnN0YXRlKV0gPSAwO1xuICAgICAgfVxuICAgICAgY291bnRzW3RoaXMuZGlzcGxheVN0YXRlKHN0YXRpb24uc3RhdGUpXSsrO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRDb3VudCA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uLnNpemU7XG4gICAgY29uc3QgYWxsU2VsZWN0ZWQgPSAoc2VsZWN0ZWRDb3VudCA9PT0gdGhpcy5zdGF0ZS5zdGF0aW9ucy5sZW5ndGgpO1xuICAgIGNvbnN0IHNlbGVjdEFsbENsYXNzZXMgPVxuICAgICAgYGJ0biBidG4tZGVmYXVsdCAke2FsbFNlbGVjdGVkID8gJyBkaXNhYmxlZCcgOiAnJ31gO1xuXG4gICAgY29uc3QgZGVzZWxlY3RBbGxDbGFzc2VzID1cbiAgICAgIGBidG4gYnRuLWRlZmF1bHQgJHtzZWxlY3RlZENvdW50ID09PSAwID8gJyBkaXNhYmxlZCcgOiAnJ31gO1xuXG4gICAgY29uc3Qgc3RhdGlvbldvcmQgPSBzZWxlY3RlZENvdW50ID09PSAxID8gJ3N0YXRpb24nIDogJ3N0YXRpb25zJztcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic3RhdGlvblN0YXRlRmlsdGVyXCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPEJ1dHRvbkZpbHRlclxuICAgICAgICAgIG9wdGlvbnM9e1snb24nLCAnb2ZmJywgJ2J1c3knLCAnZXJyb3InXX1cbiAgICAgICAgICBjb3VudHM9e2NvdW50c31cbiAgICAgICAgICBhbGxUZXh0PVwiQWxsIHN0YXRlc1wiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmlzaWJsZVN0YXRlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmlzaWJsZVN0YXRlOiBvcHRpb24gfSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInN0YXRpb25UeXBlRmlsdGVyXCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPEJ1dHRvbkZpbHRlclxuICAgICAgICAgIG9wdGlvbnM9e3RoaXMuZ2V0U3RhdGlvblR5cGVzKCl9XG4gICAgICAgICAgYWxsVGV4dD1cIkFsbCB0eXBlc1wiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmlzaWJsZVR5cGV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhvcHRpb24pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2aXNpYmxlVHlwZTogb3B0aW9uIH0pO1xuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzZWxlY3RlZENvdW50XCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZS1zZXBhcmF0b3JcIiA+PC9kaXY+XG4gICAgICAgIDxiPnt0aGlzLnN0YXRlLnNlbGVjdGlvbi5zaXplfSB7c3RhdGlvbldvcmR9IHNlbGVjdGVkPC9iPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdEFjdGlvbnNcIj5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtkZXNlbGVjdEFsbENsYXNzZXN9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLWFsbC1kZXNlbGVjdCcpfVxuICAgICAgICAgID5EZXNlbGVjdDwvYT4mbmJzcDtcbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzZWxlY3RBbGxDbGFzc2VzfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy12aXNpYmxlLXNlbGVjdCcpfVxuICAgICAgICAgID5TZWxlY3QgYWxsPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBjb25zdCBub1NlbGVjdGlvbkRpc2FibGUgPSAoc2VsZWN0ZWRDb3VudCA9PT0gMCA/ICcgZGlzYWJsZWQnIDogJycpO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzdGFydFN0b3BQYW5lbFwiIGNsYXNzTmFtZT17YGFjdGlvbi1wYW5lJHtub1NlbGVjdGlvbkRpc2FibGV9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmUtc2VwYXJhdG9yXCIgPjwvZGl2PlxuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tc3VjY2VzcyR7bm9TZWxlY3Rpb25EaXNhYmxlfWB9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy1zZWxlY3RlZC1zdGFydCcpfVxuICAgICAgICA+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGxheVwiIC8+Jm5ic3A7Jm5ic3A7U3RhcnQgU2VsZWN0ZWQ8L2E+XG4gICAgICAgICZuYnNwO1xuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tZGFuZ2VyJHtub1NlbGVjdGlvbkRpc2FibGV9YH1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLXNlbGVjdGVkLXN0b3AnKX1cbiAgICAgICAgPjxpIGNsYXNzTmFtZT1cImZhIGZhLXN0b3BcIiAvPiZuYnNwOyZuYnNwO1N0b3AgU2VsZWN0ZWQ8L2E+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgbGV0IHNlbGVjdGVkQXJlU2FtZVR5cGUgPSB0cnVlO1xuICAgIGxldCBsYXN0VHlwZSA9IG51bGw7XG4gICAgZm9yIChjb25zdCBzZWxlY3RlZElEIG9mIHRoaXMuc3RhdGUuc2VsZWN0aW9uKSB7XG4gICAgICBpZiAobGFzdFR5cGUgPT09IG51bGwpIHtcbiAgICAgICAgbGFzdFR5cGUgPSB0aGlzLmdldFN0YXRpb25TdGF0ZShzZWxlY3RlZElEKS50eXBlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZ2V0U3RhdGlvblN0YXRlKHNlbGVjdGVkSUQpLnR5cGUgIT09IGxhc3RUeXBlKSB7XG4gICAgICAgIHNlbGVjdGVkQXJlU2FtZVR5cGUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGFsbFNlbGVjdGVkT24gPSB0cnVlO1xuICAgIGZvciAoY29uc3Qgc2VsZWN0ZWRJRCBvZiB0aGlzLnN0YXRlLnNlbGVjdGlvbikge1xuICAgICAgaWYgKHRoaXMuZ2V0U3RhdGlvblN0YXRlKHNlbGVjdGVkSUQpLnN0YXRlICE9PSAnb24nKSB7XG4gICAgICAgIGFsbFNlbGVjdGVkT24gPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2FuQ2hhbmdlQXBwID0gKGFsbFNlbGVjdGVkT24gJiYgKHNlbGVjdGVkQ291bnQgPiAwKSAmJiBzZWxlY3RlZEFyZVNhbWVUeXBlKTtcblxuICAgIGxldCBhcHBsaWNhdGlvbnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0aW9uLmhhcyhzdGF0aW9uLmlkKSkge1xuICAgICAgICBhcHBsaWNhdGlvbnMgPSBzdGF0aW9uLnBvc3NpYmxlX2FwcHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJhcHBTZWxlY3RcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lLXNlcGFyYXRvclwiID48L2Rpdj5cbiAgICAgICAgPEFwcFNlbGVjdFxuICAgICAgICAgIGFwcGxpY2F0aW9ucz17Y2FuQ2hhbmdlQXBwID8gYXBwbGljYXRpb25zIDogW119XG4gICAgICAgICAgZGlzYWJsZWQ9eyFjYW5DaGFuZ2VBcHB9XG4gICAgICAgICAgYWxsb3dCbGFua1xuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmF0dGFjaENvbmZpcm1hdGlvbignQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGUgYXBwbGljYXRpb24/JyxcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQXBwU2VsZWN0ZWQpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwicHJlc2V0c1wiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmUtc2VwYXJhdG9yXCIgLz5cbiAgICAgICAgPFByZXNldHNCbG9ja1xuICAgICAgICAgIHByZXNldHM9e3RoaXMuc3RhdGUucHJlc2V0c31cbiAgICAgICAgICBvbkNyZWF0ZT17dGhpcy5nZXRDb21tYW5kKCdwcmVzZXQtY3JlYXRlJyl9XG4gICAgICAgICAgb25BY3RpdmF0ZT17dGhpcy5nZXRDb21tYW5kKCdwcmVzZXQtYWN0aXZhdGUnKX1cbiAgICAgICAgICBvbkRlbGV0ZT17dGhpcy5nZXRDb21tYW5kKCdwcmVzZXQtZGVsZXRlJyl9XG4gICAgICAgICAgY3JlYXRlRGlzYWJsZWQ9e3NlbGVjdGVkQ291bnQgPT09IDAgfHwgIWFsbFNlbGVjdGVkT259XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzaG93TG9nXCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZS1zZXBhcmF0b3JcIiA+PC9kaXY+XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCJcbiAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5sb2dWaWV3ZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhpcy5sb2dWaWV3ZXIub3Blbk1vZGFsKCk7XG4gICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9ub3RpZmljYXRpb25zJyxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG9nOiBkYXRhLm5vdGlmaWNhdGlvbnMucmV2ZXJzZSgpIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgPlNob3cgbG9nPC9hPlxuICAgICAgICAmbmJzcDtcbiAgICAgICAgPGFcbiAgICAgICAgICBjbGFzc05hbWU9eydidG4gYnRuLWRlZmF1bHQnfVxuICAgICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgICBvbkNsaWNrPXsoZXYpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnNvbGVWaWV3ZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhpcy5jb25zb2xlVmlld2VyLm9wZW5Nb2RhbCgpO1xuICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvc2VydmVyL291dHB1dCcsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdHbG9iYWwgb3V0cHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbGluZXM6IGRhdGEubGluZXMsXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH19XG4gICAgICAgID48aSBjbGFzc05hbWU9XCJmYSBmYS1kZXNrdG9wXCI+PC9pPiBHbG9iYWwgb3V0cHV0PC9hPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17bWVzc2FnZUJhciAhPT0gJycgPyAnd2l0aC1tZXNzYWdlX2JhcicgOiAnJ30+XG4gICAgICAgIHttZXNzYWdlQmFyfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02IHBhbmUtc3RhdGlvbnNcIj5cbiAgICAgICAgICAgICAgPGRpdiBpZD1cImRhc2hib2FyZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJzdGF0aW9uTGlzdFwiIGNsYXNzTmFtZT1cInBhbmVsLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICB7c3RhdGlvbnN9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02IHBhbmUtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGFzaGJvYXJkQWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgIHthY3Rpb25zfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPExvZ1ZpZXdlciBsb2c9e3RoaXMuc3RhdGUubG9nfSByZWY9eyhjKSA9PiB7IHRoaXMubG9nVmlld2VyID0gYzsgfX0gLz5cbiAgICAgICAgPENvbnNvbGVWaWV3ZXIgbGluZXM9e3RoaXMuc3RhdGUubGluZXN9IHJlZj17KGMpID0+IHsgdGhpcy5jb25zb2xlVmlld2VyID0gYzsgfX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRGFzaGJvYXJkLnByb3BUeXBlcyA9IHtcbiAgdXJsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nVmlld2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBzdGF0aWMgZm9ybWF0VGltZShpc29UaW1lKSB7XG4gICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKGlzb1RpbWUpO1xuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSgpO1xuICAgIHllc3RlcmRheS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDEpO1xuICAgIGxldCBkYXkgPSAnJztcblxuICAgIGlmICh0b2RheS5nZXRNb250aCgpID09PSB0aW1lLmdldE1vbnRoKCkgJiZcbiAgICAgIHRvZGF5LmdldEZ1bGxZZWFyKCkgPT09IHRpbWUuZ2V0RnVsbFllYXIoKSAmJlxuICAgICAgdG9kYXkuZ2V0RGF0ZSgpID09PSB0aW1lLmdldERhdGUoKSkge1xuICAgICAgZGF5ID0gJ1RvZGF5JztcbiAgICB9IGVsc2UgaWYgKHllc3RlcmRheS5nZXRNb250aCgpID09PSB0aW1lLmdldE1vbnRoKCkgJiZcbiAgICAgIHllc3RlcmRheS5nZXRGdWxsWWVhcigpID09PSB0aW1lLmdldEZ1bGxZZWFyKCkgJiZcbiAgICAgIHllc3RlcmRheS5nZXREYXRlKCkgPT09IHRpbWUuZ2V0RGF0ZSgpKSB7XG4gICAgICBkYXkgPSAnWWVzdGVyZGF5JztcbiAgICB9IGVsc2Uge1xuICAgICAgZGF5ID0gYCR7dGltZS5nZXRGdWxsWWVhcigpfS0ke3RpbWUuZ2V0TW9udGgoKX0tJHt0aW1lLmdldERhdGUoKX1gO1xuICAgIH1cblxuICAgIHJldHVybiBgJHtkYXl9ICR7dGltZS5nZXRIb3VycygpfToke3RpbWUuZ2V0TWludXRlcygpfToke3RpbWUuZ2V0U2Vjb25kcygpfWA7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLm1vZGFsRElWID0gbnVsbDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICQod2luZG93KS5vbigncmVzaXplJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgICAkKHRoaXMubW9kYWxESVYpLm9uKCdzaG93LmJzLm1vZGFsJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgfVxuXG4gIG9wZW5Nb2RhbCgpIHtcbiAgICBpZiAodGhpcy5tb2RhbERJViAhPT0gbnVsbCkge1xuICAgICAgJCh0aGlzLm1vZGFsRElWKS5tb2RhbCgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZSgpIHtcbiAgICBjb25zdCAkbW9kYWwgPSAkKHRoaXMubW9kYWxESVYpO1xuICAgIGNvbnN0IG1vZGFsSGVhZGVySGVpZ2h0ID0gNTY7XG4gICAgY29uc3QgbW9kYWxNYXJnaW4gPSAzMDtcbiAgICBjb25zdCBtb2RhbEJvcmRlciA9IDE7XG5cbiAgICBjb25zdCBib2R5SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gKG1vZGFsSGVhZGVySGVpZ2h0ICsgbW9kYWxNYXJnaW4gKiAyICsgbW9kYWxCb3JkZXIgKiAyKTtcbiAgICAkbW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5jc3MoeyBtYXhIZWlnaHQ6IGJvZHlIZWlnaHQgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgcm93Q2xhc3NlcyA9IHtcbiAgICAgIGVycm9yOiAnZGFuZ2VyJyxcbiAgICAgIHdhcm5pbmc6ICd3YXJuaW5nJyxcbiAgICB9O1xuXG4gICAgY29uc3QgZW50cmllcyA9IFtdO1xuICAgIGZvciAoY29uc3QgbG9nRW50cnkgb2YgdGhpcy5wcm9wcy5sb2cpIHtcbiAgICAgIGNvbnN0IHJvd0NsYXNzID0gcm93Q2xhc3Nlc1tsb2dFbnRyeS50eXBlXSAhPT0gdW5kZWZpbmVkID8gcm93Q2xhc3Nlc1tsb2dFbnRyeS50eXBlXSA6ICcnO1xuXG4gICAgICBlbnRyaWVzLnB1c2goXG4gICAgICAgIDx0ciBrZXk9e2xvZ0VudHJ5LmlkfSBjbGFzc05hbWU9e3Jvd0NsYXNzfT5cbiAgICAgICAgICA8dGQ+e0xvZ1ZpZXdlci5mb3JtYXRUaW1lKGxvZ0VudHJ5LnRpbWUpfTwvdGQ+XG4gICAgICAgICAgPHRkPntsb2dFbnRyeS5zdGF0aW9uX25hbWV9PC90ZD5cbiAgICAgICAgICA8dGQ+e2xvZ0VudHJ5Lm1lc3NhZ2V9PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZSBsb2dWaWV3ZXItbW9kYWxcIiB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIHJlZj17KGMpID0+IHsgdGhpcy5tb2RhbERJViA9IGM7IH19PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZyBtb2RhbC1sZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPiZ0aW1lczs8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj57dGhpcy5wcm9wcy50aXRsZX08L2g0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLWZpeGVkIHRhYmxlLWNvbmRlbnNlZFwiPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlRpbWU8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+U3RhdGlvbjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5NZXNzYWdlPC90aD5cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAge2VudHJpZXN9XG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuTG9nVmlld2VyLnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGxvZzogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgdHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHRpbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBzdGF0aW9uX2lkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgc3RhdGlvbl9uYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgbWVzc2FnZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9KVxuICApLFxufTtcblxuTG9nVmlld2VyLmRlZmF1bHRQcm9wcyA9IHtcbiAgbG9nOiBbXSxcbiAgdGl0bGU6ICdFdmVudCBMb2cnLFxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi9kYXNoYm9hcmQuanN4Jztcblxud2luZG93LmRhc2hib2FyZCA9IG51bGw7XG5cbi8vIG9uUmVhZHlcbiQoKCkgPT4ge1xuICB3aW5kb3cuZGFzaGJvYXJkID0gUmVhY3RET00ucmVuZGVyKFxuICAgIDxEYXNoYm9hcmQgdXJsPVwiL2FwaS9zdGF0aW9uc1wiIC8+LFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXNoYm9hcmRDb250YWluZXInKVxuICApO1xuXG4gIC8vIEluc3RhbGwgY2xpY2sgaGFuZGxlcnMgaW4gZXh0ZXJuYWwgbWVudXMgYW5kIGJ1dHRvbnNcbiAgJCgnW2RhdGEtY29tbWFuZF0nKS5lYWNoKGZ1bmN0aW9uIHNldENsaWNrSGFuZGxlcigpIHtcbiAgICAkKHRoaXMpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgd2luZG93LmRhc2hib2FyZC5nZXRDb21tYW5kKCQodGhpcykuYXR0cignZGF0YS1jb21tYW5kJykpKCk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuLyoqXG4gKiBQcmVzZXRzIEJsb2NrIGNvbXBvbmVudFxuICogQWxsb3dzIGFjdGl2YXRpbmcsIGRlbGV0aW5nIGFuZCBjcmVhdGluZyBjb21wb25lbnRzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXNldHNCbG9jayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZFByZXNldDogMCxcbiAgICB9O1xuICAgIHRoaXMuY2xpY2tlZENyZWF0ZSA9IHRoaXMuY2xpY2tlZENyZWF0ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2xpY2tlZEFjdGl2YXRlID0gdGhpcy5jbGlja2VkQWN0aXZhdGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNsaWNrZWREZWxldGUgPSB0aGlzLmNsaWNrZWREZWxldGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVByZXNldENoYW5nZSA9IHRoaXMuaGFuZGxlUHJlc2V0Q2hhbmdlLmJpbmQodGhpcyk7XG4gIH1cblxuICBjbGlja2VkQ3JlYXRlKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ3JlYXRlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ3JlYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgY2xpY2tlZEFjdGl2YXRlKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uQWN0aXZhdGUpIHtcbiAgICAgIHRoaXMucHJvcHMub25BY3RpdmF0ZSh0aGlzLnN0YXRlLnNlbGVjdGVkUHJlc2V0KTtcbiAgICB9XG4gIH1cblxuICBjbGlja2VkRGVsZXRlKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uRGVsZXRlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRGVsZXRlKHRoaXMuc3RhdGUuc2VsZWN0ZWRQcmVzZXQpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVByZXNldENoYW5nZShldikge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZFByZXNldDogTnVtYmVyLnBhcnNlSW50KGV2LnRhcmdldC52YWx1ZSwgMTApIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBbXG4gICAgICA8b3B0aW9uIGtleT1cIjBcIiB2YWx1ZT1cIjBcIiAvPixcbiAgICBdO1xuXG4gICAgZm9yIChjb25zdCBwcmVzZXQgb2YgdGhpcy5wcm9wcy5wcmVzZXRzKSB7XG4gICAgICBvcHRpb25zLnB1c2goPG9wdGlvbiBrZXk9e3ByZXNldC5pZH0gdmFsdWU9e3ByZXNldC5pZH0+e3ByZXNldC5uYW1lfTwvb3B0aW9uPik7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlRGlzYWJsZWQgPSB0aGlzLnByb3BzLmNyZWF0ZURpc2FibGVkID8gJyBkaXNhYmxlZCcgOiAnJztcbiAgICBjb25zdCBhY3Rpb25zRGlzYWJsZWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkUHJlc2V0ID09PSAwID8gJyBkaXNhYmxlZCcgOiAnJztcblxuXG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cInByZXNldHMtYmxvY2tcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1pbmxpbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIGZvcm0tZ3JvdXAtbWlud2lkdGhcIj5cbiAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgcHJlc2V0cy1saXN0XCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnNlbGVjdGVkUHJlc2V0fVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUHJlc2V0Q2hhbmdlfVxuICAgICAgICAgID57b3B0aW9uc308L3NlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxhIGNsYXNzTmFtZT17YGJ0biBidG4td2FybmluZyR7YWN0aW9uc0Rpc2FibGVkfWB9IG9uQ2xpY2s9e3RoaXMuY2xpY2tlZEFjdGl2YXRlfT5BY3RpdmF0ZSBwcmVzZXQ8L2E+XG4gICAgICAgIDxhIGNsYXNzTmFtZT17YGJ0biBidG4tZGFuZ2VyJHthY3Rpb25zRGlzYWJsZWR9YH0gb25DbGljaz17dGhpcy5jbGlja2VkRGVsZXRlfT48c3BhbiBjbGFzc05hbWU9XCJmYSBmYS10cmFzaC1vXCIgLz48L2E+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJlc2V0cy1hY3Rpb25zXCI+XG4gICAgICAgIDxhIGNsYXNzTmFtZT17YGJ0biBidG4tc3VjY2VzcyR7Y3JlYXRlRGlzYWJsZWR9YH0gb25DbGljaz17dGhpcy5jbGlja2VkQ3JlYXRlfT5DcmVhdGUgcHJlc2V0PC9hPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+KTtcbiAgfVxufVxuXG5QcmVzZXRzQmxvY2sucHJvcFR5cGVzID0ge1xuICBwcmVzZXRzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgc3RhdGlvbkFwcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3RPZihSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nKSxcbiAgICB9KVxuICApLFxuICBvbkNyZWF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQWN0aXZhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBvbkRlbGV0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIGNyZWF0ZURpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbn07XG5cblByZXNldHNCbG9jay5kZWZhdWx0UHJvcHMgPSB7XG4gIHByZXNldHM6IFtdLFxuICBvbkNyZWF0ZTogKCkgPT4ge30sXG4gIG9uQWN0aXZhdGU6ICgpID0+IHt9LFxuICBvbkRlbGV0ZTogKCkgPT4ge30sXG4gIGNyZWF0ZURpc2FibGVkOiBmYWxzZSxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0aW9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZU9wZW5UZXJtaW5hbExvZyA9IHRoaXMuaGFuZGxlT3BlblRlcm1pbmFsTG9nLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVDbGljaygpIHtcbiAgICB0aGlzLnByb3BzLm9uQ2xpY2tTdGF0aW9uKHRoaXMucHJvcHMuc3RhdGlvbi5pZCk7XG4gIH1cblxuICBoYW5kbGVPcGVuVGVybWluYWxMb2coZXYpIHtcbiAgICB0aGlzLnByb3BzLm9uT3BlblRlcm1pbmFsTG9nKHRoaXMucHJvcHMuc3RhdGlvbi5pZCk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzdGF0aW9uQ2xhc3NlcyA9IFtcbiAgICAgICdzdGF0aW9uJyxcbiAgICAgIGBzdGF0aW9uLXN0YXRlLSR7dGhpcy5wcm9wcy5zdGF0aW9uLnN0YXRlfWAsXG4gICAgICBgc3RhdGlvbi10eXBlLSR7dGhpcy5wcm9wcy5zdGF0aW9uLnR5cGV9YCxcbiAgICBdO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWQpIHtcbiAgICAgIHN0YXRpb25DbGFzc2VzLnB1c2goJ3N0YXRpb24tc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17dGhpcy5wcm9wcy5zdGF0aW9uLmlkfVxuICAgICAgICBjbGFzc05hbWU9e3N0YXRpb25DbGFzc2VzLmpvaW4oJyAnKX1cbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLXN0YXRlLWxpZ2h0XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1pY29uXCI+XG4gICAgICAgICAgPGltZyBhbHQ9e3RoaXMucHJvcHMuc3RhdGlvbi5hcHB9IHNyYz17dGhpcy5wcm9wcy5zdGF0aW9uLmljb259IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tbmFtZVwiPnt0aGlzLnByb3BzLnN0YXRpb24ubmFtZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLXR5cGVcIj57dGhpcy5wcm9wcy5zdGF0aW9uLnR5cGV9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1hcHBcIj57dGhpcy5wcm9wcy5zdGF0aW9uLmFwcH08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLXN0YXR1c1wiPnt0aGlzLnByb3BzLnN0YXRpb24uc3RhdHVzfTwvZGl2PlxuICAgICAgICA8YSBjbGFzc05hbWU9XCJzdGF0aW9uLW91dHB1dC1idXR0b25cIiBvbkNsaWNrPXsoZXYpID0+IHsgdGhpcy5oYW5kbGVPcGVuVGVybWluYWxMb2coZXYpOyB9fT5cbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1kZXNrdG9wXCI+PC9pPlxuICAgICAgICA8L2E+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblN0YXRpb24ucHJvcFR5cGVzID0ge1xuICBzdGF0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc3RhdGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgdHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzdGF0dXM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXBwOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGljb246IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIHNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgb25DbGlja1N0YXRpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBvbk9wZW5UZXJtaW5hbExvZzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG59O1xuIl19
