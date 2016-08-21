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
      if (state === 'starting' || state === 'stopping' || state === 'switching_app') {
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
                this.props.window_title
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
  window_title: _react2.default.PropTypes.string,
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
  window_title: 'Event Log'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwU2VsZWN0LmpzeCIsInNyYy9idXR0b25GaWx0ZXIuanN4Iiwic3JjL2NvbnNvbGVWaWV3ZXIuanN4Iiwic3JjL2Rhc2hib2FyZC5qc3giLCJzcmMvbG9nVmlld2VyLmpzeCIsInNyYy9tYWluLmpzeCIsInNyYy9zdGF0aW9uLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTXFCLFM7OztBQUVuQixxQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsNkZBQ1gsS0FEVzs7QUFFakIsVUFBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsVUFBSyxnQkFBTCxHQUF3QixNQUFLLGdCQUFMLENBQXNCLElBQXRCLE9BQXhCO0FBSGlCO0FBSWxCOzs7O3VDQUVrQjtBQUNqQixVQUFJLEtBQUssS0FBTCxDQUFXLFFBQWYsRUFBeUI7QUFDdkIsYUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixLQUFLLFdBQUwsQ0FBaUIsS0FBckM7QUFDRDtBQUNGOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFNLGVBQWUsRUFBckI7O0FBRUEsVUFBSSxLQUFLLEtBQUwsQ0FBVyxVQUFmLEVBQTJCO0FBQ3pCLHFCQUFhLElBQWIsQ0FDRTtBQUFBO1VBQUEsRUFBUSxLQUFJLE1BQVosRUFBbUIsT0FBTSxFQUF6QjtVQUFBO0FBQUEsU0FERjtBQUdEOztBQVBNO0FBQUE7QUFBQTs7QUFBQTtBQVNQLDZCQUEwQixLQUFLLEtBQUwsQ0FBVyxZQUFyQyw4SEFBbUQ7QUFBQSxjQUF4QyxXQUF3Qzs7QUFDakQsdUJBQWEsSUFBYixDQUNFO0FBQUE7WUFBQSxFQUFRLEtBQUssV0FBYixFQUEwQixPQUFPLFdBQWpDO1lBQStDO0FBQS9DLFdBREY7QUFHRDtBQWJNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFB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Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuLyoqXG4gKiBBcHBTZWxlY3QgY29tcG9uZW50XG4gKiBBbGxvd3MgdGhlIHVzZXIgdG8gc2VsZWN0IGFuIGFwcGxpY2F0aW9uIGZyb20gYSBsaXN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcFNlbGVjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5hcHBTZWxlY3RvciA9IG51bGw7XG4gICAgdGhpcy5jbGlja2VkQ2hhbmdlQXBwID0gdGhpcy5jbGlja2VkQ2hhbmdlQXBwLmJpbmQodGhpcyk7XG4gIH1cblxuICBjbGlja2VkQ2hhbmdlQXBwKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMuYXBwU2VsZWN0b3IudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBhcHBsaWNhdGlvbnMgPSBbXTtcblxuICAgIGlmICh0aGlzLnByb3BzLmFsbG93QmxhbmspIHtcbiAgICAgIGFwcGxpY2F0aW9ucy5wdXNoKFxuICAgICAgICA8b3B0aW9uIGtleT1cIm51bGxcIiB2YWx1ZT1cIlwiPiZuYnNwOzwvb3B0aW9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGFwcGxpY2F0aW9uIG9mIHRoaXMucHJvcHMuYXBwbGljYXRpb25zKSB7XG4gICAgICBhcHBsaWNhdGlvbnMucHVzaChcbiAgICAgICAgPG9wdGlvbiBrZXk9e2FwcGxpY2F0aW9ufSB2YWx1ZT17YXBwbGljYXRpb259PnthcHBsaWNhdGlvbn08L29wdGlvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgZGlzYWJsZWRDbGFzcyA9ICh0aGlzLnByb3BzLmRpc2FibGVkID8gJyBkaXNhYmxlZCcgOiAnJyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BhcHBTZWxlY3Qke2Rpc2FibGVkQ2xhc3N9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1pbmxpbmVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgZm9ybS1ncm91cC1taW53aWR0aFwiPlxuICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb3JtLWNvbnRyb2wke2Rpc2FibGVkQ2xhc3N9YH1cbiAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSA/IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlIDogJyd9XG4gICAgICAgICAgICAgIHJlZj17KHNlbCkgPT4geyB0aGlzLmFwcFNlbGVjdG9yID0gc2VsOyB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7YXBwbGljYXRpb25zfVxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgJm5ic3A7XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4td2FybmluZyR7ZGlzYWJsZWRDbGFzc31gfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5jbGlja2VkQ2hhbmdlQXBwfVxuICAgICAgICAgID5DaGFuZ2UgYXBwbGljYXRpb248L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5BcHBTZWxlY3QucHJvcFR5cGVzID0ge1xuICBhcHBsaWNhdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgKSxcbiAgZGVmYXVsdFZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBhbGxvd0JsYW5rOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgZGlzYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5BcHBTZWxlY3QuZGVmYXVsdFByb3BzID0ge1xuICBhcHBsaWNhdGlvbnM6IFtdLFxuICBkZWZhdWx0VmFsdWU6ICcnLFxuICBhbGxvd0JsYW5rOiBmYWxzZSxcbiAgZGlzYWJsZWQ6IGZhbHNlLFxuICBvbkNoYW5nZTogKCkgPT4ge30sXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQnV0dG9uRmlsdGVyID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSBbXTtcblxuICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBwcm9wcy5vcHRpb25zKSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IFsnYnRuJywgJ2J0bi1kZWZhdWx0JywgYGJ1dHRvbi1maWx0ZXItb3B0aW9uLSR7b3B0aW9ufWBdO1xuICAgIGlmIChwcm9wcy52YWx1ZSA9PT0gb3B0aW9uKSB7XG4gICAgICBjbGFzc2VzLnB1c2goJ2FjdGl2ZScpO1xuICAgIH1cbiAgICBsZXQgY291bnRlciA9ICcnO1xuICAgIGxldCBzcGFjaW5nID0gJyc7XG4gICAgaWYgKHByb3BzLmNvdW50cyAhPT0gbnVsbCkge1xuICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgIGlmIChwcm9wcy5jb3VudHMuaGFzT3duUHJvcGVydHkob3B0aW9uKSAmJiBwcm9wcy5jb3VudHNbb3B0aW9uXSAhPT0gMCkge1xuICAgICAgICBjb3VudCA9IHByb3BzLmNvdW50c1tvcHRpb25dO1xuICAgICAgfVxuICAgICAgY29uc3QgYmFkZ2VDbGFzc2VzID0gYGJhZGdlJHtjb3VudCA9PT0gMCA/ICcgemVybycgOiAnIG5vbi16ZXJvJ31gO1xuICAgICAgY291bnRlciA9ICg8c3BhbiBjbGFzc05hbWU9e2JhZGdlQ2xhc3Nlc30+e2NvdW50fTwvc3Bhbj4pO1xuICAgICAgc3BhY2luZyA9ICcgJztcbiAgICB9XG4gICAgb3B0aW9ucy5wdXNoKFxuICAgICAgPGFcbiAgICAgICAgaHJlZj1cIiNcIlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMuam9pbignICcpfVxuICAgICAgICBrZXk9e29wdGlvbn1cbiAgICAgICAgb25DbGljaz17KCkgPT4gcHJvcHMub25DaGFuZ2Uob3B0aW9uKX1cbiAgICAgID57b3B0aW9ufXtzcGFjaW5nfXtjb3VudGVyfTwvYT5cbiAgICApO1xuICB9XG5cbiAgY29uc3QgZGVmYXVsdENsYXNzZXMgPSBbJ2J0bicsICdidG4tZGVmYXVsdCddO1xuICBpZiAocHJvcHMudmFsdWUgPT09ICcnKSB7XG4gICAgZGVmYXVsdENsYXNzZXMucHVzaCgnYWN0aXZlJyk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLXRvb2xiYXIgYnV0dG9uLWZpbHRlclwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAgPGFcbiAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgY2xhc3NOYW1lPXtkZWZhdWx0Q2xhc3Nlcy5qb2luKCcgJyl9XG4gICAgICAgICAga2V5PVwibnVsbFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gcHJvcHMub25DaGFuZ2UoJycpfVxuICAgICAgICA+e3Byb3BzLmFsbFRleHR9PC9hPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cFwiPlxuICAgICAgICB7b3B0aW9uc31cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuQnV0dG9uRmlsdGVyLnByb3BUeXBlcyA9IHtcbiAgb3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLnN0cmluZyksXG4gIGNvdW50czogUmVhY3QuUHJvcFR5cGVzLm9iamVjdE9mKFJlYWN0LlByb3BUeXBlcy5udW1iZXIpLFxuICBhbGxUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgb25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxufTtcblxuQnV0dG9uRmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb3B0aW9uczogW10sXG4gIGNvdW50czogbnVsbCxcbiAgYWxsVGV4dDogJ0FsbCcsXG4gIHZhbHVlOiAnJyxcbiAgb25DaGFuZ2U6ICgpID0+IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uRmlsdGVyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uc29sZVZpZXdlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5tb2RhbERJViA9IG51bGw7XG4gIH1cblxuICBvcGVuTW9kYWwoKSB7XG4gICAgaWYgKHRoaXMubW9kYWxESVYgIT09IG51bGwpIHtcbiAgICAgICQodGhpcy5tb2RhbERJVikubW9kYWwoKTtcbiAgICAgICQodGhpcy5tb2RhbERJVikub24oJ3Nob3duLmJzLm1vZGFsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IG1vZGFsQm9keSA9ICQodGhpcykuZmluZCgnLm1vZGFsLWJvZHknKS5maXJzdCgpWzBdO1xuICAgICAgICBtb2RhbEJvZHkuc2Nyb2xsVG9wID0gTWF0aC5tYXgobW9kYWxCb2R5LnNjcm9sbEhlaWdodCwgbW9kYWxCb2R5LmNsaWVudEhlaWdodCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsICgpID0+IHsgdGhpcy5oYW5kbGVSZXNpemUoKTsgfSk7XG4gICAgJCh0aGlzLm1vZGFsRElWKS5vbignc2hvdy5icy5tb2RhbCcsICgpID0+IHsgdGhpcy5oYW5kbGVSZXNpemUoKTsgfSk7XG4gIH1cblxuICBoYW5kbGVSZXNpemUoKSB7XG4gICAgY29uc3QgJG1vZGFsID0gJCh0aGlzLm1vZGFsRElWKTtcbiAgICBjb25zdCBtb2RhbEhlYWRlckhlaWdodCA9IDU2O1xuICAgIGNvbnN0IG1vZGFsTWFyZ2luID0gMzA7XG4gICAgY29uc3QgbW9kYWxCb3JkZXIgPSAxO1xuXG4gICAgY29uc3QgYm9keUhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIChtb2RhbEhlYWRlckhlaWdodCArIG1vZGFsTWFyZ2luICogMiArIG1vZGFsQm9yZGVyICogMik7XG4gICAgJG1vZGFsLmZpbmQoJy5tb2RhbC1ib2R5JykuY3NzKHsgbWF4SGVpZ2h0OiBib2R5SGVpZ2h0IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGUgY29uc29sZVZpZXdlci1tb2RhbFwiIHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgcmVmPXsoYykgPT4geyB0aGlzLm1vZGFsRElWID0gYzsgfX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nIG1vZGFsLWxnXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPnt0aGlzLnByb3BzLnRpdGxlfTwvaDQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICA8cHJlPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxpbmVzLmpvaW4oJ1xcbicpfVxuICAgICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQ29uc29sZVZpZXdlci5wcm9wVHlwZXMgPSB7XG4gIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBsaW5lczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLnN0cmluZyksXG59O1xuXG5Db25zb2xlVmlld2VyLmRlZmF1bHRQcm9wcyA9IHtcbiAgdGl0bGU6ICdUZXJtaW5hbCBPdXRwdXQnLFxuICBsaW5lczogW10sXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTdGF0aW9uIGZyb20gJy4vc3RhdGlvbi5qc3gnO1xuaW1wb3J0IEFwcFNlbGVjdCBmcm9tICcuL2FwcFNlbGVjdC5qc3gnO1xuaW1wb3J0IEJ1dHRvbkZpbHRlciBmcm9tICcuL2J1dHRvbkZpbHRlci5qc3gnO1xuaW1wb3J0IExvZ1ZpZXdlciBmcm9tICcuL2xvZ1ZpZXdlci5qc3gnO1xuaW1wb3J0IENvbnNvbGVWaWV3ZXIgZnJvbSAnLi9jb25zb2xlVmlld2VyLmpzeCc7XG5cbi8vIGNvbnN0IHRtcF9sb2dfZW50cmllcyA9IHJlcXVpcmUoJy4vdG1wX2xvZy5qc29uJykuZW50cmllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFzaGJvYXJkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc3RhdGlvbnM6IFtdLFxuICAgICAgc2VsZWN0aW9uOiBuZXcgU2V0KCksXG4gICAgICB2aXNpYmxlVHlwZTogJycsXG4gICAgICB2aXNpYmxlU3RhdGU6ICcnLFxuICAgICAgbG9nOiBbXSxcbiAgICAgIHNlcnZlckNvbm5lY3Rpb25FcnJvcjogZmFsc2UsXG4gICAgfTtcbiAgICB0aGlzLnNlbGVjdFRvZ2dsZSA9IHRoaXMuc2VsZWN0VG9nZ2xlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jaGFuZ2VBcHBTZWxlY3RlZCA9IHRoaXMuY2hhbmdlQXBwU2VsZWN0ZWQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNvbW1hbmRzID0ge307XG4gICAgdGhpcy5pbml0Q29tbWFuZHMoKTtcbiAgICB0aGlzLmdldENvbW1hbmQgPSB0aGlzLmdldENvbW1hbmQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvZ1ZpZXdlciA9IG51bGw7XG4gICAgdGhpcy5jb25zb2xlVmlld2VyID0gbnVsbDtcbiAgICB0aGlzLnVwZGF0ZUlEID0gMDtcbiAgICB0aGlzLnNlcnZlckNvbm5lY3Rpb25SZXRyeSA9IDA7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnBvbGxMb29wKCk7XG4gIH1cblxuICBnZXRTdGF0aW9uU3RhdGUoc3RhdGlvbklEKSB7XG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIGlmIChzdGF0aW9uLmlkID09PSBzdGF0aW9uSUQpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRpb247XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0U3RhdGlvblR5cGVzKCkge1xuICAgIGNvbnN0IHR5cGVzID0gbmV3IFNldCgpO1xuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiB0aGlzLnN0YXRlLnN0YXRpb25zKSB7XG4gICAgICB0eXBlcy5hZGQoc3RhdGlvbi50eXBlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0eXBlcyk7XG4gIH1cblxuICBnZXRDb21tYW5kKGNvbW1hbmROYW1lKSB7XG4gICAgaWYgKHRoaXMuY29tbWFuZHNbY29tbWFuZE5hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbW1hbmRzW2NvbW1hbmROYW1lXS5kb0NhbGxiYWNrO1xuICAgIH1cbiAgICB0aHJvdyBFcnJvcihgQ2FsbCB0byBpbnZhbGlkIGNvbW1hbmQgJHtjb21tYW5kTmFtZX1gKTtcbiAgfVxuXG4gIGdldFZpc2libGVTdGF0aW9ucygpIHtcbiAgICBjb25zdCBhbnN3ZXIgPSBbXTtcblxuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiB0aGlzLnN0YXRlLnN0YXRpb25zKSB7XG4gICAgICBpZiAoKHRoaXMuc3RhdGUudmlzaWJsZVR5cGUgPT09ICcnIHx8IHN0YXRpb24udHlwZSA9PT0gdGhpcy5zdGF0ZS52aXNpYmxlVHlwZSkgJiZcbiAgICAgICAgICAodGhpcy5zdGF0ZS52aXNpYmxlU3RhdGUgPT09ICcnIHx8XG4gICAgICAgICAgIHRoaXMuZGlzcGxheVN0YXRlKHN0YXRpb24uc3RhdGUpID09PSB0aGlzLnN0YXRlLnZpc2libGVTdGF0ZSkpIHtcbiAgICAgICAgYW5zd2VyLnB1c2goc3RhdGlvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFuc3dlcjtcbiAgfVxuXG4gIGRpc3BsYXlTdGF0ZShzdGF0ZSkge1xuICAgIGlmIChzdGF0ZSA9PT0gJ3N0YXJ0aW5nJyB8fCBzdGF0ZSA9PT0gJ3N0b3BwaW5nJyB8fCBzdGF0ZSA9PT0gJ3N3aXRjaGluZ19hcHAnKSB7XG4gICAgICByZXR1cm4gJ2J1c3knO1xuICAgIH1cblxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGF0dGFjaENvbmZpcm1hdGlvbih0ZXh0LCBjYWxsYmFjaykge1xuICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgYm9vdGJveC5kaWFsb2coe1xuICAgICAgICBtZXNzYWdlOiB0ZXh0LFxuICAgICAgICBidXR0b25zOiB7XG4gICAgICAgICAgd2FybmluZzoge1xuICAgICAgICAgICAgbGFiZWw6ICdDb25maXJtJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bi13YXJuaW5nJyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjay5iaW5kKHRoaXMsIC4uLmFyZ3MpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2FuY2VsOiB7XG4gICAgICAgICAgICBsYWJlbDogJ0NhbmNlbCcsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdidG4tZGVmYXVsdCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBpbml0Q29tbWFuZHMoKSB7XG4gICAgdGhpcy5jb21tYW5kcyA9IHtcbiAgICAgICdzdGF0aW9ucy1hbGwtc3RhcnQnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnN0YXJ0QWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RhcnQgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtYWxsLXN0b3AnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnN0b3BBbGwuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzdG9wIGFsbCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IHRydWUsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLWFsbC1zZWxlY3QnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnNlbGVjdEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3NlbGVjdCBhbGwgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtYWxsLWRlc2VsZWN0Jzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5kZXNlbGVjdEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ2Rlc2VsZWN0IGFsbCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IGZhbHNlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1zZWxlY3RlZC1zdGFydCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RhcnRTZWxlY3RlZC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3N0YXJ0IHRoZSBzZWxlY3RlZCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IHRydWUsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLXNlbGVjdGVkLXN0b3AnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnN0b3BTZWxlY3RlZC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3N0b3AgdGhlIHNlbGVjdGVkIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtdmlzaWJsZS1zZWxlY3QnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnNlbGVjdEFsbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzZWxlY3QgdmlzaWJsZSBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IGZhbHNlLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5rZXlzKHRoaXMuY29tbWFuZHMpKSB7XG4gICAgICBjb25zdCBjb21tYW5kID0gdGhpcy5jb21tYW5kc1tuYW1lXTtcbiAgICAgIGlmIChjb21tYW5kLmNvbmZpcm0pIHtcbiAgICAgICAgdGhpcy5jb21tYW5kc1tuYW1lXS5kb0NhbGxiYWNrID0gdGhpcy5hdHRhY2hDb25maXJtYXRpb24oXG4gICAgICAgICAgYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byAke2NvbW1hbmQudGl0bGV9P2AsXG4gICAgICAgICAgY29tbWFuZC5jYWxsYmFja1xuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21tYW5kc1tuYW1lXS5kb0NhbGxiYWNrID0gY29tbWFuZC5jYWxsYmFjaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhbGxTdGF0aW9uSURzKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRpb25JRHModGhpcy5zdGF0ZS5zdGF0aW9ucyk7XG4gIH1cblxuICBzdGF0aW9uSURzKHN0YXRpb25zKSB7XG4gICAgY29uc3QgaWRzID0gbmV3IFNldCgpO1xuXG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHN0YXRpb25zKSB7XG4gICAgICBpZHMuYWRkKHN0YXRpb24uaWQpO1xuICAgIH1cblxuICAgIHJldHVybiBpZHM7XG4gIH1cblxuICBzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogdGhpcy5hbGxTdGF0aW9uSURzKCkgfSk7XG4gIH1cblxuICBzZWxlY3RBbGxWaXNpYmxlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3Rpb246IHRoaXMuc3RhdGlvbklEcyh0aGlzLmdldFZpc2libGVTdGF0aW9ucygpKSB9KTtcbiAgfVxuXG4gIGRlc2VsZWN0QWxsKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3Rpb246IG5ldyBTZXQoKSB9KTtcbiAgfVxuXG4gIHNlbGVjdFRvZ2dsZShpZCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGlvbi5oYXMoaWQpKSB7XG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbi5kZWxldGUoaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbi5hZGQoaWQpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW9uOiB0aGlzLnN0YXRlLnNlbGVjdGlvbiB9KTtcbiAgfVxuXG4gIHN0b3BTdGF0aW9ucyhzdGF0aW9uSURzKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvc3RhdGlvbnMuanNvbicsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGFjdGlvbjogJ3N0b3AnLFxuICAgICAgICBzdGF0aW9uSURzOiBBcnJheS5mcm9tKHN0YXRpb25JRHMpLFxuICAgICAgfSksXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4ge30sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gIH1cblxuICBzdG9wU2VsZWN0ZWQoKSB7XG4gICAgdGhpcy5zdG9wU3RhdGlvbnModGhpcy5zdGF0ZS5zZWxlY3Rpb24pO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHN0b3BBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcFN0YXRpb25zKHRoaXMuYWxsU3RhdGlvbklEcygpKTtcbiAgfVxuXG4gIHN0YXJ0U3RhdGlvbnMoc3RhdGlvbklEcykge1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvYXBpL3N0YXRpb25zLmpzb24nLFxuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBhY3Rpb246ICdzdGFydCcsXG4gICAgICAgIHN0YXRpb25JRHM6IEFycmF5LmZyb20oc3RhdGlvbklEcyksXG4gICAgICB9KSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7fSxcbiAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXJ0U2VsZWN0ZWQoKSB7XG4gICAgdGhpcy5zdGFydFN0YXRpb25zKHRoaXMuc3RhdGUuc2VsZWN0aW9uKTtcbiAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gIH1cblxuICBzdGFydEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFydFN0YXRpb25zKHRoaXMuYWxsU3RhdGlvbklEcygpKTtcbiAgfVxuXG4gIGNoYW5nZUFwcFNlbGVjdGVkKGFwcCkge1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvYXBpL3N0YXRpb25zLmpzb24nLFxuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBhY3Rpb246ICdjaGFuZ2VfYXBwJyxcbiAgICAgICAgc3RhdGlvbklEczogQXJyYXkuZnJvbSh0aGlzLnN0YXRlLnNlbGVjdGlvbiksXG4gICAgICAgIGFwcCxcbiAgICAgIH0pLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHt9LFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgdGhlIHNlcnZlciBwb2xsXG4gICAqXG4gICAqIEltcGxlbWVudGF0aW9uOiBTaW5jZSB0aGUgc2VydmVyIHVzZXMgbG9uZyBwb2xsaW5nIHdlIHVzZSBhIHZlcnkgc2hvcnRcbiAgICogcG9sbCB0aW1lICg1MDBtcykuIEluIGNhc2Ugb2YgZXJyb3JzIGNvbnRhY3RpbmcgdGhlIHNlcnZlciB0aGUgcG9sbCB0aW1lXG4gICAqIGluY3JlYXNlcyB3aXRoIGVhY2ggZXJyb3IgdW50aWwgYSBtYXggcG9sbCB0aW1lIGlzIHJlYWNoZWQuXG4gICAqL1xuICBwb2xsTG9vcCgpIHtcbiAgICBjb25zdCBtaW5Qb2xsVGltZSA9IDUwMDtcbiAgICBsZXQgcmV0cnlQb2xsVGltZSA9IG1pblBvbGxUaW1lO1xuICAgIGNvbnN0IHJldHJ5SW5jcmVhc2VGYWN0b3IgPSAyO1xuICAgIGNvbnN0IG1heFJldHJ5UG9sbFRpbWUgPSA0MDAwO1xuXG4gICAgY29uc3QgbG9vcCA9ICgpID0+IHtcbiAgICAgIHRoaXMucG9sbFNlcnZlcigpLnRoZW4oKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KGxvb3AsIG1pblBvbGxUaW1lKTtcbiAgICAgICAgcmV0cnlQb2xsVGltZSA9IG1pblBvbGxUaW1lO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZXJ2ZXJDb25uZWN0aW9uRXJyb3IpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmVyQ29ubmVjdGlvbkVycm9yOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlcnZlckNvbm5lY3Rpb25SZXRyeSA9IDA7XG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQobG9vcCwgcmV0cnlQb2xsVGltZSk7XG4gICAgICAgIGlmIChyZXRyeVBvbGxUaW1lIDwgbWF4UmV0cnlQb2xsVGltZSkge1xuICAgICAgICAgIHJldHJ5UG9sbFRpbWUgPSByZXRyeVBvbGxUaW1lICogcmV0cnlJbmNyZWFzZUZhY3RvcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlcnZlckNvbm5lY3Rpb25SZXRyeSsrO1xuICAgICAgICBpZiAodGhpcy5zZXJ2ZXJDb25uZWN0aW9uUmV0cnkgPiA1KSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlcnZlckNvbm5lY3Rpb25FcnJvcjogdHJ1ZSB9KTtcbiAgICAgICAgICAvLyBSZXNldCB0aGUgdXBkYXRlSUQgc28gdGhlIG5leHQgcG9sbCByZXR1cm5zIGltbWVkaWF0ZWx5XG4gICAgICAgICAgLy8gaW5zdGVhZCBvZiBiZWluZyBhIGxvbmcgcG9sbFxuICAgICAgICAgIHRoaXMudXBkYXRlSUQgPSAwO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGxvb3AoKTtcbiAgfVxuXG4gIHBvbGxTZXJ2ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvcG9sbC5qc29uJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGxhc3RTZWVuOiB0aGlzLnVwZGF0ZUlELFxuICAgICAgICB9LFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIHRpbWVvdXQ6IDMwMDAwLFxuICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhLnN0YXRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSUQgPSBkYXRhLnVwZGF0ZUlEO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHN0YXRpb25zOiBkYXRhLnN0YXRpb25zIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5wcm9wcy51cmwsIHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgc3RhdGlvbnMgPSBbXTtcbiAgICBjb25zdCBhY3Rpb25zID0gW107XG4gICAgbGV0IG1lc3NhZ2VCYXIgPSAnJztcblxuICAgIGlmICh0aGlzLnN0YXRlLnNlcnZlckNvbm5lY3Rpb25FcnJvcikge1xuICAgICAgbWVzc2FnZUJhciA9ICg8ZGl2IGNsYXNzTmFtZT1cIm1lc3NhZ2VfYmFyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVzc2FnZV9iYXItbWVzc2FnZVwiPlxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXdhcm5pbmdcIj48L2k+ICBObyBjb25uZWN0aW9uIHRvIHNlcnZlci5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4pO1xuICAgIH1cblxuICAgIHRoaXMuZ2V0VmlzaWJsZVN0YXRpb25zKCkuZm9yRWFjaCgoc3RhdGlvbikgPT4gc3RhdGlvbnMucHVzaChcbiAgICAgIDxTdGF0aW9uXG4gICAgICAgIHN0YXRpb249e3N0YXRpb259XG4gICAgICAgIGtleT17c3RhdGlvbi5pZH1cbiAgICAgICAgc2VsZWN0ZWQ9e3RoaXMuc3RhdGUuc2VsZWN0aW9uLmhhcyhzdGF0aW9uLmlkKX1cbiAgICAgICAgb25DbGlja1N0YXRpb249e3RoaXMuc2VsZWN0VG9nZ2xlfVxuICAgICAgLz5cbiAgICApKTtcblxuICAgIGNvbnN0IGNvdW50cyA9IHt9O1xuICAgIHRoaXMuc3RhdGUuc3RhdGlvbnMuZm9yRWFjaCgoc3RhdGlvbikgPT4ge1xuICAgICAgaWYgKCFjb3VudHMuaGFzT3duUHJvcGVydHkodGhpcy5kaXNwbGF5U3RhdGUoc3RhdGlvbi5zdGF0ZSkpKSB7XG4gICAgICAgIGNvdW50c1t0aGlzLmRpc3BsYXlTdGF0ZShzdGF0aW9uLnN0YXRlKV0gPSAwO1xuICAgICAgfVxuICAgICAgY291bnRzW3RoaXMuZGlzcGxheVN0YXRlKHN0YXRpb24uc3RhdGUpXSsrO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRDb3VudCA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uLnNpemU7XG4gICAgY29uc3QgYWxsU2VsZWN0ZWQgPSAoc2VsZWN0ZWRDb3VudCA9PT0gdGhpcy5zdGF0ZS5zdGF0aW9ucy5sZW5ndGgpO1xuICAgIGNvbnN0IHNlbGVjdEFsbENsYXNzZXMgPVxuICAgICAgYGJ0biBidG4tZGVmYXVsdCAke2FsbFNlbGVjdGVkID8gJyBkaXNhYmxlZCcgOiAnJ31gO1xuXG4gICAgY29uc3QgZGVzZWxlY3RBbGxDbGFzc2VzID1cbiAgICAgIGBidG4gYnRuLWRlZmF1bHQgJHtzZWxlY3RlZENvdW50ID09PSAwID8gJyBkaXNhYmxlZCcgOiAnJ31gO1xuXG4gICAgY29uc3Qgc3RhdGlvbldvcmQgPSBzZWxlY3RlZENvdW50ID09PSAxID8gJ3N0YXRpb24nIDogJ3N0YXRpb25zJztcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic3RhdGlvblN0YXRlRmlsdGVyXCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPEJ1dHRvbkZpbHRlclxuICAgICAgICAgIG9wdGlvbnM9e1snb24nLCAnb2ZmJywgJ2J1c3knLCAnZXJyb3InXX1cbiAgICAgICAgICBjb3VudHM9e2NvdW50c31cbiAgICAgICAgICBhbGxUZXh0PVwiQWxsIHN0YXRlc1wiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmlzaWJsZVN0YXRlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmlzaWJsZVN0YXRlOiBvcHRpb24gfSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInN0YXRpb25UeXBlRmlsdGVyXCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPEJ1dHRvbkZpbHRlclxuICAgICAgICAgIG9wdGlvbnM9e3RoaXMuZ2V0U3RhdGlvblR5cGVzKCl9XG4gICAgICAgICAgYWxsVGV4dD1cIkFsbCB0eXBlc1wiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmlzaWJsZVR5cGV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhvcHRpb24pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2aXNpYmxlVHlwZTogb3B0aW9uIH0pO1xuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzZWxlY3RlZENvdW50XCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZS1zZXBhcmF0b3JcIiA+PC9kaXY+XG4gICAgICAgIDxiPnt0aGlzLnN0YXRlLnNlbGVjdGlvbi5zaXplfSB7c3RhdGlvbldvcmR9IHNlbGVjdGVkPC9iPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdEFjdGlvbnNcIj5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtkZXNlbGVjdEFsbENsYXNzZXN9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLWFsbC1kZXNlbGVjdCcpfVxuICAgICAgICAgID5EZXNlbGVjdDwvYT4mbmJzcDtcbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzZWxlY3RBbGxDbGFzc2VzfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy12aXNpYmxlLXNlbGVjdCcpfVxuICAgICAgICAgID5TZWxlY3QgYWxsPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBjb25zdCBub1NlbGVjdGlvbkRpc2FibGUgPSAoc2VsZWN0ZWRDb3VudCA9PT0gMCA/ICcgZGlzYWJsZWQnIDogJycpO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzdGFydFN0b3BQYW5lbFwiIGNsYXNzTmFtZT17YGFjdGlvbi1wYW5lJHtub1NlbGVjdGlvbkRpc2FibGV9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmUtc2VwYXJhdG9yXCIgPjwvZGl2PlxuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tc3VjY2VzcyR7bm9TZWxlY3Rpb25EaXNhYmxlfWB9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy1zZWxlY3RlZC1zdGFydCcpfVxuICAgICAgICA+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGxheVwiIC8+Jm5ic3A7Jm5ic3A7U3RhcnQgU2VsZWN0ZWQ8L2E+XG4gICAgICAgICZuYnNwO1xuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tZGFuZ2VyJHtub1NlbGVjdGlvbkRpc2FibGV9YH1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLXNlbGVjdGVkLXN0b3AnKX1cbiAgICAgICAgPjxpIGNsYXNzTmFtZT1cImZhIGZhLXN0b3BcIiAvPiZuYnNwOyZuYnNwO1N0b3AgU2VsZWN0ZWQ8L2E+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgbGV0IHNlbGVjdGVkQXJlU2FtZVR5cGUgPSB0cnVlO1xuICAgIGxldCBsYXN0VHlwZSA9IG51bGw7XG4gICAgZm9yIChjb25zdCBzZWxlY3RlZElEIG9mIHRoaXMuc3RhdGUuc2VsZWN0aW9uKSB7XG4gICAgICBpZiAobGFzdFR5cGUgPT09IG51bGwpIHtcbiAgICAgICAgbGFzdFR5cGUgPSB0aGlzLmdldFN0YXRpb25TdGF0ZShzZWxlY3RlZElEKS50eXBlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZ2V0U3RhdGlvblN0YXRlKHNlbGVjdGVkSUQpLnR5cGUgIT09IGxhc3RUeXBlKSB7XG4gICAgICAgIHNlbGVjdGVkQXJlU2FtZVR5cGUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGFsbFNlbGVjdGVkT24gPSB0cnVlO1xuICAgIGZvciAoY29uc3Qgc2VsZWN0ZWRJRCBvZiB0aGlzLnN0YXRlLnNlbGVjdGlvbikge1xuICAgICAgaWYgKHRoaXMuZ2V0U3RhdGlvblN0YXRlKHNlbGVjdGVkSUQpLnN0YXRlICE9PSAnb24nKSB7XG4gICAgICAgIGFsbFNlbGVjdGVkT24gPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2FuQ2hhbmdlQXBwID0gKGFsbFNlbGVjdGVkT24gJiYgKHNlbGVjdGVkQ291bnQgPiAwKSAmJiBzZWxlY3RlZEFyZVNhbWVUeXBlKTtcblxuICAgIGxldCBhcHBsaWNhdGlvbnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0aW9uLmhhcyhzdGF0aW9uLmlkKSkge1xuICAgICAgICBhcHBsaWNhdGlvbnMgPSBzdGF0aW9uLnBvc3NpYmxlX2FwcHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJhcHBTZWxlY3RcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lLXNlcGFyYXRvclwiID48L2Rpdj5cbiAgICAgICAgPEFwcFNlbGVjdFxuICAgICAgICAgIGFwcGxpY2F0aW9ucz17Y2FuQ2hhbmdlQXBwID8gYXBwbGljYXRpb25zIDogW119XG4gICAgICAgICAgZGlzYWJsZWQ9eyFjYW5DaGFuZ2VBcHB9XG4gICAgICAgICAgYWxsb3dCbGFua1xuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmF0dGFjaENvbmZpcm1hdGlvbignQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGUgYXBwbGljYXRpb24/JyxcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQXBwU2VsZWN0ZWQpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGNvbnN0IG5vVGVybWluYWxPdXRwdXREaXNhYmxlID0gKHNlbGVjdGVkQ291bnQgIT09IDEgPyAnIGRpc2FibGVkJyA6ICcnKTtcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic2hvd0xvZ1wiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmUtc2VwYXJhdG9yXCIgPjwvZGl2PlxuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiXG4gICAgICAgICAgaHJlZj1cIiNcIlxuICAgICAgICAgIG9uQ2xpY2s9eyhldikgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMubG9nVmlld2VyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRoaXMubG9nVmlld2VyLm9wZW5Nb2RhbCgpO1xuICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvbG9nLmpzb24nLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsb2c6IGRhdGEuZW50cmllcy5yZXZlcnNlKCkgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9fVxuICAgICAgICA+U2hvdyBsb2c8L2E+XG4gICAgICAgICZuYnNwO1xuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tZGVmYXVsdCR7bm9UZXJtaW5hbE91dHB1dERpc2FibGV9YH1cbiAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25zb2xlVmlld2VyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRoaXMuY29uc29sZVZpZXdlci5vcGVuTW9kYWwoKTtcbiAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL3N0YXRpb25fb3V0cHV0Lmpzb24nLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpb25JRDogQXJyYXkuZnJvbSh0aGlzLnN0YXRlLnNlbGVjdGlvbilbMF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogQXJyYXkuZnJvbSh0aGlzLnN0YXRlLnNlbGVjdGlvbilbMF0sXG4gICAgICAgICAgICAgICAgICAgIGxpbmVzOiBkYXRhLmxpbmVzLFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9fVxuICAgICAgICA+VGVybWluYWwgb3V0cHV0PC9hPlxuICAgICAgICAmbmJzcDtcbiAgICAgICAgPGFcbiAgICAgICAgICBjbGFzc05hbWU9eydidG4gYnRuLWRlZmF1bHQnfVxuICAgICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgICBvbkNsaWNrPXsoZXYpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnNvbGVWaWV3ZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhpcy5jb25zb2xlVmlld2VyLm9wZW5Nb2RhbCgpO1xuICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvc3RhdGlvbl9vdXRwdXQuanNvbicsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdHbG9iYWwgb3V0cHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbGluZXM6IGRhdGEubGluZXMsXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH19XG4gICAgICAgID5HbG9iYWwgb3V0cHV0PC9hPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17bWVzc2FnZUJhciAhPT0gJycgPyAnd2l0aC1tZXNzYWdlX2JhcicgOiAnJ30+XG4gICAgICAgIHttZXNzYWdlQmFyfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02IHBhbmUtc3RhdGlvbnNcIj5cbiAgICAgICAgICAgICAgPGRpdiBpZD1cImRhc2hib2FyZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJzdGF0aW9uTGlzdFwiIGNsYXNzTmFtZT1cInBhbmVsLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICB7c3RhdGlvbnN9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02IHBhbmUtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGFzaGJvYXJkQWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgIHthY3Rpb25zfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPExvZ1ZpZXdlciBsb2c9e3RoaXMuc3RhdGUubG9nfSByZWY9eyhjKSA9PiB7IHRoaXMubG9nVmlld2VyID0gYzsgfX0gLz5cbiAgICAgICAgPENvbnNvbGVWaWV3ZXIgbGluZXM9e3RoaXMuc3RhdGUubGluZXN9IHJlZj17KGMpID0+IHsgdGhpcy5jb25zb2xlVmlld2VyID0gYzsgfX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRGFzaGJvYXJkLnByb3BUeXBlcyA9IHtcbiAgdXJsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nVmlld2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBzdGF0aWMgZm9ybWF0VGltZShpc29UaW1lKSB7XG4gICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKGlzb1RpbWUpO1xuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSgpO1xuICAgIHllc3RlcmRheS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDEpO1xuICAgIGxldCBkYXkgPSAnJztcblxuICAgIGlmICh0b2RheS5nZXRNb250aCgpID09PSB0aW1lLmdldE1vbnRoKCkgJiZcbiAgICAgIHRvZGF5LmdldEZ1bGxZZWFyKCkgPT09IHRpbWUuZ2V0RnVsbFllYXIoKSAmJlxuICAgICAgdG9kYXkuZ2V0RGF0ZSgpID09PSB0aW1lLmdldERhdGUoKSkge1xuICAgICAgZGF5ID0gJ1RvZGF5JztcbiAgICB9IGVsc2UgaWYgKHllc3RlcmRheS5nZXRNb250aCgpID09PSB0aW1lLmdldE1vbnRoKCkgJiZcbiAgICAgIHllc3RlcmRheS5nZXRGdWxsWWVhcigpID09PSB0aW1lLmdldEZ1bGxZZWFyKCkgJiZcbiAgICAgIHllc3RlcmRheS5nZXREYXRlKCkgPT09IHRpbWUuZ2V0RGF0ZSgpKSB7XG4gICAgICBkYXkgPSAnWWVzdGVyZGF5JztcbiAgICB9IGVsc2Uge1xuICAgICAgZGF5ID0gYCR7dGltZS5nZXRGdWxsWWVhcigpfS0ke3RpbWUuZ2V0TW9udGgoKX0tJHt0aW1lLmdldERhdGUoKX1gO1xuICAgIH1cblxuICAgIHJldHVybiBgJHtkYXl9ICR7dGltZS5nZXRIb3VycygpfToke3RpbWUuZ2V0TWludXRlcygpfToke3RpbWUuZ2V0U2Vjb25kcygpfWA7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLm1vZGFsRElWID0gbnVsbDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICQod2luZG93KS5vbigncmVzaXplJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgICAkKHRoaXMubW9kYWxESVYpLm9uKCdzaG93LmJzLm1vZGFsJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgfVxuXG4gIG9wZW5Nb2RhbCgpIHtcbiAgICBpZiAodGhpcy5tb2RhbERJViAhPT0gbnVsbCkge1xuICAgICAgJCh0aGlzLm1vZGFsRElWKS5tb2RhbCgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZSgpIHtcbiAgICBjb25zdCAkbW9kYWwgPSAkKHRoaXMubW9kYWxESVYpO1xuICAgIGNvbnN0IG1vZGFsSGVhZGVySGVpZ2h0ID0gNTY7XG4gICAgY29uc3QgbW9kYWxNYXJnaW4gPSAzMDtcbiAgICBjb25zdCBtb2RhbEJvcmRlciA9IDE7XG5cbiAgICBjb25zdCBib2R5SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gKG1vZGFsSGVhZGVySGVpZ2h0ICsgbW9kYWxNYXJnaW4gKiAyICsgbW9kYWxCb3JkZXIgKiAyKTtcbiAgICAkbW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5jc3MoeyBtYXhIZWlnaHQ6IGJvZHlIZWlnaHQgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgcm93Q2xhc3NlcyA9IHtcbiAgICAgIGVycm9yOiAnZGFuZ2VyJyxcbiAgICAgIHdhcm5pbmc6ICd3YXJuaW5nJyxcbiAgICB9O1xuXG4gICAgY29uc3QgZW50cmllcyA9IFtdO1xuICAgIGZvciAoY29uc3QgbG9nRW50cnkgb2YgdGhpcy5wcm9wcy5sb2cpIHtcbiAgICAgIGNvbnN0IHJvd0NsYXNzID0gcm93Q2xhc3Nlc1tsb2dFbnRyeS50eXBlXSAhPT0gdW5kZWZpbmVkID8gcm93Q2xhc3Nlc1tsb2dFbnRyeS50eXBlXSA6ICcnO1xuXG4gICAgICBlbnRyaWVzLnB1c2goXG4gICAgICAgIDx0ciBrZXk9e2xvZ0VudHJ5LmlkfSBjbGFzc05hbWU9e3Jvd0NsYXNzfT5cbiAgICAgICAgICA8dGQ+e0xvZ1ZpZXdlci5mb3JtYXRUaW1lKGxvZ0VudHJ5LnRpbWUpfTwvdGQ+XG4gICAgICAgICAgPHRkPntsb2dFbnRyeS5zdGF0aW9uX25hbWV9PC90ZD5cbiAgICAgICAgICA8dGQ+e2xvZ0VudHJ5Lm1lc3NhZ2V9PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZSBsb2dWaWV3ZXItbW9kYWxcIiB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIHJlZj17KGMpID0+IHsgdGhpcy5tb2RhbERJViA9IGM7IH19PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZyBtb2RhbC1sZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPiZ0aW1lczs8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj57dGhpcy5wcm9wcy53aW5kb3dfdGl0bGV9PC9oND5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1maXhlZCB0YWJsZS1jb25kZW5zZWRcIj5cbiAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5UaW1lPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlN0YXRpb248L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+TWVzc2FnZTwvdGg+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIHtlbnRyaWVzfVxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkxvZ1ZpZXdlci5wcm9wVHlwZXMgPSB7XG4gIHdpbmRvd190aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgbG9nOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgdGltZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHN0YXRpb25faWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBzdGF0aW9uX25hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBtZXNzYWdlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIH0pXG4gICksXG59O1xuXG5Mb2dWaWV3ZXIuZGVmYXVsdFByb3BzID0ge1xuICBsb2c6IFtdLFxuICB3aW5kb3dfdGl0bGU6ICdFdmVudCBMb2cnLFxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi9kYXNoYm9hcmQuanN4Jztcblxud2luZG93LmRhc2hib2FyZCA9IG51bGw7XG5cbi8vIG9uUmVhZHlcbiQoKCkgPT4ge1xuICB3aW5kb3cuZGFzaGJvYXJkID0gUmVhY3RET00ucmVuZGVyKFxuICAgIDxEYXNoYm9hcmQgdXJsPVwiL2FwaS9zdGF0aW9ucy5qc29uXCIgLz4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rhc2hib2FyZENvbnRhaW5lcicpXG4gICk7XG5cbiAgLy8gSW5zdGFsbCBjbGljayBoYW5kbGVycyBpbiBleHRlcm5hbCBtZW51cyBhbmQgYnV0dG9uc1xuICAkKCdbZGF0YS1jb21tYW5kXScpLmVhY2goZnVuY3Rpb24gc2V0Q2xpY2tIYW5kbGVyKCkge1xuICAgICQodGhpcykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB3aW5kb3cuZGFzaGJvYXJkLmdldENvbW1hbmQoJCh0aGlzKS5hdHRyKCdkYXRhLWNvbW1hbmQnKSkoKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0aW9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKCkge1xuICAgIHRoaXMucHJvcHMub25DbGlja1N0YXRpb24odGhpcy5wcm9wcy5zdGF0aW9uLmlkKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzdGF0aW9uQ2xhc3NlcyA9IFtcbiAgICAgICdzdGF0aW9uJyxcbiAgICAgIGBzdGF0aW9uLXN0YXRlLSR7dGhpcy5wcm9wcy5zdGF0aW9uLnN0YXRlfWAsXG4gICAgICBgc3RhdGlvbi10eXBlLSR7dGhpcy5wcm9wcy5zdGF0aW9uLnR5cGV9YCxcbiAgICBdO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWQpIHtcbiAgICAgIHN0YXRpb25DbGFzc2VzLnB1c2goJ3N0YXRpb24tc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17dGhpcy5wcm9wcy5zdGF0aW9uLmlkfVxuICAgICAgICBjbGFzc05hbWU9e3N0YXRpb25DbGFzc2VzLmpvaW4oJyAnKX1cbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLXN0YXRlLWxpZ2h0XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1pY29uXCI+XG4gICAgICAgICAgPGltZyBhbHQ9e3RoaXMucHJvcHMuc3RhdGlvbi5hcHB9IHNyYz17dGhpcy5wcm9wcy5zdGF0aW9uLmljb259IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tbmFtZVwiPnt0aGlzLnByb3BzLnN0YXRpb24ubmFtZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLXR5cGVcIj57dGhpcy5wcm9wcy5zdGF0aW9uLnR5cGV9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1hcHBcIj57dGhpcy5wcm9wcy5zdGF0aW9uLmFwcH08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLXN0YXR1c1wiPnt0aGlzLnByb3BzLnN0YXRpb24uc3RhdHVzfTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TdGF0aW9uLnByb3BUeXBlcyA9IHtcbiAgc3RhdGlvbjogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN0YXRlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc3RhdHVzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFwcDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpY29uOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICB9KS5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2xpY2tTdGF0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbn07XG4iXX0=
