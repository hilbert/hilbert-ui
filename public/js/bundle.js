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
  lines: [],
  title: 'Terminal Output'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwU2VsZWN0LmpzeCIsInNyYy9idXR0b25GaWx0ZXIuanN4Iiwic3JjL2NvbnNvbGVWaWV3ZXIuanN4Iiwic3JjL2Rhc2hib2FyZC5qc3giLCJzcmMvbG9nVmlld2VyLmpzeCIsInNyYy9tYWluLmpzeCIsInNyYy9zdGF0aW9uLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTXFCLFM7OztBQUVuQixxQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsNkZBQ1gsS0FEVzs7QUFFakIsVUFBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsVUFBSyxnQkFBTCxHQUF3QixNQUFLLGdCQUFMLENBQXNCLElBQXRCLE9BQXhCO0FBSGlCO0FBSWxCOzs7O3VDQUVrQjtBQUNqQixVQUFJLEtBQUssS0FBTCxDQUFXLFFBQWYsRUFBeUI7QUFDdkIsYUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixLQUFLLFdBQUwsQ0FBaUIsS0FBckM7QUFDRDtBQUNGOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFNLGVBQWUsRUFBckI7O0FBRUEsVUFBSSxLQUFLLEtBQUwsQ0FBVyxVQUFmLEVBQTJCO0FBQ3pCLHFCQUFhLElBQWIsQ0FDRTtBQUFBO1VBQUEsRUFBUSxLQUFJLE1BQVosRUFBbUIsT0FBTSxFQUF6QjtVQUFBO0FBQUEsU0FERjtBQUdEOztBQVBNO0FBQUE7QUFBQTs7QUFBQTtBQVNQLDZCQUEwQixLQUFLLEtBQUwsQ0FBVyxZQUFyQyw4SEFBbUQ7QUFBQSxjQUF4QyxXQUF3Qzs7QUFDakQsdUJBQWEsSUFBYixDQUNFO0FBQUE7WUFBQSxFQUFRLEtBQUssV0FBYixFQUEwQixPQUFPLFdBQWpDO1lBQStDO0FBQS9DLFdBREY7QUFHRDtBQWJNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFB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TixDQUFnQixLQUFoQixDQUFzQjtBQUM3QixRQUFJLGdCQUFNLFNBQU4sQ0FBZ0IsTUFEUztBQUU3QixVQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsTUFGTztBQUc3QixXQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsTUFITTtBQUk3QixVQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsTUFKTztBQUs3QixZQUFRLGdCQUFNLFNBQU4sQ0FBZ0IsTUFMSztBQU03QixTQUFLLGdCQUFNLFNBQU4sQ0FBZ0IsTUFOUTtBQU83QixVQUFNLGdCQUFNLFNBQU4sQ0FBZ0I7QUFQTyxHQUF0QixFQVFOLFVBVGU7QUFVbEIsWUFBVSxnQkFBTSxTQUFOLENBQWdCLElBVlI7QUFXbEIsa0JBQWdCLGdCQUFNLFNBQU4sQ0FBZ0I7QUFYZCxDQUFwQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG4vKipcbiAqIEFwcFNlbGVjdCBjb21wb25lbnRcbiAqIEFsbG93cyB0aGUgdXNlciB0byBzZWxlY3QgYW4gYXBwbGljYXRpb24gZnJvbSBhIGxpc3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwU2VsZWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmFwcFNlbGVjdG9yID0gbnVsbDtcbiAgICB0aGlzLmNsaWNrZWRDaGFuZ2VBcHAgPSB0aGlzLmNsaWNrZWRDaGFuZ2VBcHAuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNsaWNrZWRDaGFuZ2VBcHAoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5hcHBTZWxlY3Rvci52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGFwcGxpY2F0aW9ucyA9IFtdO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuYWxsb3dCbGFuaykge1xuICAgICAgYXBwbGljYXRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PVwibnVsbFwiIHZhbHVlPVwiXCI+Jm5ic3A7PC9vcHRpb24+XG4gICAgICApO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgYXBwbGljYXRpb24gb2YgdGhpcy5wcm9wcy5hcHBsaWNhdGlvbnMpIHtcbiAgICAgIGFwcGxpY2F0aW9ucy5wdXNoKFxuICAgICAgICA8b3B0aW9uIGtleT17YXBwbGljYXRpb259IHZhbHVlPXthcHBsaWNhdGlvbn0+e2FwcGxpY2F0aW9ufTwvb3B0aW9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBkaXNhYmxlZENsYXNzID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPyAnIGRpc2FibGVkJyA6ICcnKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGFwcFNlbGVjdCR7ZGlzYWJsZWRDbGFzc31gfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWlubGluZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBmb3JtLWdyb3VwLW1pbndpZHRoXCI+XG4gICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCR7ZGlzYWJsZWRDbGFzc31gfVxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuZGVmYXVsdFZhbHVlID8gdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgOiAnJ31cbiAgICAgICAgICAgICAgcmVmPXsoc2VsKSA9PiB7IHRoaXMuYXBwU2VsZWN0b3IgPSBzZWw7IH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHthcHBsaWNhdGlvbnN9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAmbmJzcDtcbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi13YXJuaW5nJHtkaXNhYmxlZENsYXNzfWB9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNsaWNrZWRDaGFuZ2VBcHB9XG4gICAgICAgICAgPkNoYW5nZSBhcHBsaWNhdGlvbjwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkFwcFNlbGVjdC5wcm9wVHlwZXMgPSB7XG4gIGFwcGxpY2F0aW9uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICApLFxuICBkZWZhdWx0VmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGFsbG93Qmxhbms6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbn07XG5cbkFwcFNlbGVjdC5kZWZhdWx0UHJvcHMgPSB7XG4gIGFwcGxpY2F0aW9uczogW10sXG4gIGRlZmF1bHRWYWx1ZTogJycsXG4gIGFsbG93Qmxhbms6IGZhbHNlLFxuICBkaXNhYmxlZDogZmFsc2UsXG4gIG9uQ2hhbmdlOiAoKSA9PiB7fSxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBCdXR0b25GaWx0ZXIgPSAocHJvcHMpID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuXG4gIGZvciAoY29uc3Qgb3B0aW9uIG9mIHByb3BzLm9wdGlvbnMpIHtcbiAgICBjb25zdCBjbGFzc2VzID0gWydidG4nLCAnYnRuLWRlZmF1bHQnLCBgYnV0dG9uLWZpbHRlci1vcHRpb24tJHtvcHRpb259YF07XG4gICAgaWYgKHByb3BzLnZhbHVlID09PSBvcHRpb24pIHtcbiAgICAgIGNsYXNzZXMucHVzaCgnYWN0aXZlJyk7XG4gICAgfVxuICAgIGxldCBjb3VudGVyID0gJyc7XG4gICAgbGV0IHNwYWNpbmcgPSAnJztcbiAgICBpZiAocHJvcHMuY291bnRzICE9PSBudWxsKSB7XG4gICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgaWYgKHByb3BzLmNvdW50cy5oYXNPd25Qcm9wZXJ0eShvcHRpb24pICYmIHByb3BzLmNvdW50c1tvcHRpb25dICE9PSAwKSB7XG4gICAgICAgIGNvdW50ID0gcHJvcHMuY291bnRzW29wdGlvbl07XG4gICAgICB9XG4gICAgICBjb25zdCBiYWRnZUNsYXNzZXMgPSBgYmFkZ2Uke2NvdW50ID09PSAwID8gJyB6ZXJvJyA6ICcgbm9uLXplcm8nfWA7XG4gICAgICBjb3VudGVyID0gKDxzcGFuIGNsYXNzTmFtZT17YmFkZ2VDbGFzc2VzfT57Y291bnR9PC9zcGFuPik7XG4gICAgICBzcGFjaW5nID0gJyAnO1xuICAgIH1cbiAgICBvcHRpb25zLnB1c2goXG4gICAgICA8YVxuICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKCcgJyl9XG4gICAgICAgIGtleT17b3B0aW9ufVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBwcm9wcy5vbkNoYW5nZShvcHRpb24pfVxuICAgICAgPntvcHRpb259e3NwYWNpbmd9e2NvdW50ZXJ9PC9hPlxuICAgICk7XG4gIH1cblxuICBjb25zdCBkZWZhdWx0Q2xhc3NlcyA9IFsnYnRuJywgJ2J0bi1kZWZhdWx0J107XG4gIGlmIChwcm9wcy52YWx1ZSA9PT0gJycpIHtcbiAgICBkZWZhdWx0Q2xhc3Nlcy5wdXNoKCdhY3RpdmUnKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJidG4tdG9vbGJhciBidXR0b24tZmlsdGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cFwiPlxuICAgICAgICA8YVxuICAgICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgICBjbGFzc05hbWU9e2RlZmF1bHRDbGFzc2VzLmpvaW4oJyAnKX1cbiAgICAgICAgICBrZXk9XCJudWxsXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBwcm9wcy5vbkNoYW5nZSgnJyl9XG4gICAgICAgID57cHJvcHMuYWxsVGV4dH08L2E+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgIHtvcHRpb25zfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5CdXR0b25GaWx0ZXIucHJvcFR5cGVzID0ge1xuICBvcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nKSxcbiAgY291bnRzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0T2YoUmVhY3QuUHJvcFR5cGVzLm51bWJlciksXG4gIGFsbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5CdXR0b25GaWx0ZXIuZGVmYXVsdFByb3BzID0ge1xuICBvcHRpb25zOiBbXSxcbiAgY291bnRzOiBudWxsLFxuICBhbGxUZXh0OiAnQWxsJyxcbiAgdmFsdWU6ICcnLFxuICBvbkNoYW5nZTogKCkgPT4ge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25GaWx0ZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zb2xlVmlld2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLm1vZGFsRElWID0gbnVsbDtcbiAgfVxuXG4gIG9wZW5Nb2RhbCgpIHtcbiAgICBpZiAodGhpcy5tb2RhbERJViAhPT0gbnVsbCkge1xuICAgICAgJCh0aGlzLm1vZGFsRElWKS5tb2RhbCgpO1xuICAgICAgJCh0aGlzLm1vZGFsRElWKS5vbignc2hvd24uYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgbW9kYWxCb2R5ID0gJCh0aGlzKS5maW5kKCcubW9kYWwtYm9keScpLmZpcnN0KClbMF07XG4gICAgICAgIG1vZGFsQm9keS5zY3JvbGxUb3AgPSBNYXRoLm1heChtb2RhbEJvZHkuc2Nyb2xsSGVpZ2h0LCBtb2RhbEJvZHkuY2xpZW50SGVpZ2h0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICQod2luZG93KS5vbigncmVzaXplJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgICAkKHRoaXMubW9kYWxESVYpLm9uKCdzaG93LmJzLm1vZGFsJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZSgpIHtcbiAgICBjb25zdCAkbW9kYWwgPSAkKHRoaXMubW9kYWxESVYpO1xuICAgIGNvbnN0IG1vZGFsSGVhZGVySGVpZ2h0ID0gNTY7XG4gICAgY29uc3QgbW9kYWxNYXJnaW4gPSAzMDtcbiAgICBjb25zdCBtb2RhbEJvcmRlciA9IDE7XG5cbiAgICBjb25zdCBib2R5SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gKG1vZGFsSGVhZGVySGVpZ2h0ICsgbW9kYWxNYXJnaW4gKiAyICsgbW9kYWxCb3JkZXIgKiAyKTtcbiAgICAkbW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5jc3MoeyBtYXhIZWlnaHQ6IGJvZHlIZWlnaHQgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZSBjb25zb2xlVmlld2VyLW1vZGFsXCIgdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiByZWY9eyhjKSA9PiB7IHRoaXMubW9kYWxESVYgPSBjOyB9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2cgbW9kYWwtbGdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+e3RoaXMucHJvcHMudGl0bGV9PC9oND5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgIDxwcmU+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGluZXMuam9pbignXFxuJyl9XG4gICAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Db25zb2xlVmlld2VyLnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGxpbmVzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nKSxcbn07XG5cbkNvbnNvbGVWaWV3ZXIuZGVmYXVsdFByb3BzID0ge1xuICBsaW5lczogW10sXG4gIHRpdGxlOiAnVGVybWluYWwgT3V0cHV0Jyxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFN0YXRpb24gZnJvbSAnLi9zdGF0aW9uLmpzeCc7XG5pbXBvcnQgQXBwU2VsZWN0IGZyb20gJy4vYXBwU2VsZWN0LmpzeCc7XG5pbXBvcnQgQnV0dG9uRmlsdGVyIGZyb20gJy4vYnV0dG9uRmlsdGVyLmpzeCc7XG5pbXBvcnQgTG9nVmlld2VyIGZyb20gJy4vbG9nVmlld2VyLmpzeCc7XG5pbXBvcnQgQ29uc29sZVZpZXdlciBmcm9tICcuL2NvbnNvbGVWaWV3ZXIuanN4JztcblxuLy8gY29uc3QgdG1wX2xvZ19lbnRyaWVzID0gcmVxdWlyZSgnLi90bXBfbG9nLmpzb24nKS5lbnRyaWVzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdGF0aW9uczogW10sXG4gICAgICBzZWxlY3Rpb246IG5ldyBTZXQoKSxcbiAgICAgIHZpc2libGVUeXBlOiAnJyxcbiAgICAgIHZpc2libGVTdGF0ZTogJycsXG4gICAgICBsb2c6IFtdLFxuICAgICAgc2VydmVyQ29ubmVjdGlvbkVycm9yOiBmYWxzZSxcbiAgICB9O1xuICAgIHRoaXMuc2VsZWN0VG9nZ2xlID0gdGhpcy5zZWxlY3RUb2dnbGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNoYW5nZUFwcFNlbGVjdGVkID0gdGhpcy5jaGFuZ2VBcHBTZWxlY3RlZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY29tbWFuZHMgPSB7fTtcbiAgICB0aGlzLmluaXRDb21tYW5kcygpO1xuICAgIHRoaXMuZ2V0Q29tbWFuZCA9IHRoaXMuZ2V0Q29tbWFuZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9nVmlld2VyID0gbnVsbDtcbiAgICB0aGlzLmNvbnNvbGVWaWV3ZXIgPSBudWxsO1xuICAgIHRoaXMudXBkYXRlSUQgPSAwO1xuICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5ID0gMDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucG9sbExvb3AoKTtcbiAgfVxuXG4gIGdldFN0YXRpb25TdGF0ZShzdGF0aW9uSUQpIHtcbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgaWYgKHN0YXRpb24uaWQgPT09IHN0YXRpb25JRCkge1xuICAgICAgICByZXR1cm4gc3RhdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRTdGF0aW9uVHlwZXMoKSB7XG4gICAgY29uc3QgdHlwZXMgPSBuZXcgU2V0KCk7XG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIHR5cGVzLmFkZChzdGF0aW9uLnR5cGUpO1xuICAgIH1cblxuICAgIHJldHVybiBBcnJheS5mcm9tKHR5cGVzKTtcbiAgfVxuXG4gIGdldENvbW1hbmQoY29tbWFuZE5hbWUpIHtcbiAgICBpZiAodGhpcy5jb21tYW5kc1tjb21tYW5kTmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29tbWFuZHNbY29tbWFuZE5hbWVdLmRvQ2FsbGJhY2s7XG4gICAgfVxuICAgIHRocm93IEVycm9yKGBDYWxsIHRvIGludmFsaWQgY29tbWFuZCAke2NvbW1hbmROYW1lfWApO1xuICB9XG5cbiAgZ2V0VmlzaWJsZVN0YXRpb25zKCkge1xuICAgIGNvbnN0IGFuc3dlciA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIGlmICgodGhpcy5zdGF0ZS52aXNpYmxlVHlwZSA9PT0gJycgfHwgc3RhdGlvbi50eXBlID09PSB0aGlzLnN0YXRlLnZpc2libGVUeXBlKSAmJlxuICAgICAgICAgICh0aGlzLnN0YXRlLnZpc2libGVTdGF0ZSA9PT0gJycgfHxcbiAgICAgICAgICAgdGhpcy5kaXNwbGF5U3RhdGUoc3RhdGlvbi5zdGF0ZSkgPT09IHRoaXMuc3RhdGUudmlzaWJsZVN0YXRlKSkge1xuICAgICAgICBhbnN3ZXIucHVzaChzdGF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYW5zd2VyO1xuICB9XG5cbiAgZGlzcGxheVN0YXRlKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlID09PSAnc3RhcnRpbmcnIHx8IHN0YXRlID09PSAnc3RvcHBpbmcnIHx8IHN0YXRlID09PSAnc3dpdGNoaW5nX2FwcCcpIHtcbiAgICAgIHJldHVybiAnYnVzeSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgYXR0YWNoQ29uZmlybWF0aW9uKHRleHQsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICBib290Ym94LmRpYWxvZyh7XG4gICAgICAgIG1lc3NhZ2U6IHRleHQsXG4gICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICB3YXJuaW5nOiB7XG4gICAgICAgICAgICBsYWJlbDogJ0NvbmZpcm0nLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuLXdhcm5pbmcnLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLmJpbmQodGhpcywgLi4uYXJncyksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjYW5jZWw6IHtcbiAgICAgICAgICAgIGxhYmVsOiAnQ2FuY2VsJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bi1kZWZhdWx0JyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGluaXRDb21tYW5kcygpIHtcbiAgICB0aGlzLmNvbW1hbmRzID0ge1xuICAgICAgJ3N0YXRpb25zLWFsbC1zdGFydCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RhcnRBbGwuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzdGFydCBhbGwgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1hbGwtc3RvcCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RvcEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3N0b3AgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtYWxsLXNlbGVjdCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc2VsZWN0QWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc2VsZWN0IGFsbCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IGZhbHNlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1hbGwtZGVzZWxlY3QnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLmRlc2VsZWN0QWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnZGVzZWxlY3QgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLXNlbGVjdGVkLXN0YXJ0Jzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5zdGFydFNlbGVjdGVkLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RhcnQgdGhlIHNlbGVjdGVkIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtc2VsZWN0ZWQtc3RvcCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RvcFNlbGVjdGVkLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RvcCB0aGUgc2VsZWN0ZWQgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy12aXNpYmxlLXNlbGVjdCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc2VsZWN0QWxsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3NlbGVjdCB2aXNpYmxlIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXModGhpcy5jb21tYW5kcykpIHtcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSB0aGlzLmNvbW1hbmRzW25hbWVdO1xuICAgICAgaWYgKGNvbW1hbmQuY29uZmlybSkge1xuICAgICAgICB0aGlzLmNvbW1hbmRzW25hbWVdLmRvQ2FsbGJhY2sgPSB0aGlzLmF0dGFjaENvbmZpcm1hdGlvbihcbiAgICAgICAgICBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvICR7Y29tbWFuZC50aXRsZX0/YCxcbiAgICAgICAgICBjb21tYW5kLmNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbW1hbmRzW25hbWVdLmRvQ2FsbGJhY2sgPSBjb21tYW5kLmNhbGxiYWNrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFsbFN0YXRpb25JRHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGlvbklEcyh0aGlzLnN0YXRlLnN0YXRpb25zKTtcbiAgfVxuXG4gIHN0YXRpb25JRHMoc3RhdGlvbnMpIHtcbiAgICBjb25zdCBpZHMgPSBuZXcgU2V0KCk7XG5cbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2Ygc3RhdGlvbnMpIHtcbiAgICAgIGlkcy5hZGQoc3RhdGlvbi5pZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlkcztcbiAgfVxuXG4gIHNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW9uOiB0aGlzLmFsbFN0YXRpb25JRHMoKSB9KTtcbiAgfVxuXG4gIHNlbGVjdEFsbFZpc2libGUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogdGhpcy5zdGF0aW9uSURzKHRoaXMuZ2V0VmlzaWJsZVN0YXRpb25zKCkpIH0pO1xuICB9XG5cbiAgZGVzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogbmV3IFNldCgpIH0pO1xuICB9XG5cbiAgc2VsZWN0VG9nZ2xlKGlkKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0aW9uLmhhcyhpZCkpIHtcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmRlbGV0ZShpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmFkZChpZCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3Rpb246IHRoaXMuc3RhdGUuc2VsZWN0aW9uIH0pO1xuICB9XG5cbiAgc3RvcFN0YXRpb25zKHN0YXRpb25JRHMpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9zdGF0aW9ucy5qc29uJyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgYWN0aW9uOiAnc3RvcCcsXG4gICAgICAgIHN0YXRpb25JRHM6IEFycmF5LmZyb20oc3RhdGlvbklEcyksXG4gICAgICB9KSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7fSxcbiAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICB9KTtcbiAgfVxuXG4gIHN0b3BTZWxlY3RlZCgpIHtcbiAgICB0aGlzLnN0b3BTdGF0aW9ucyh0aGlzLnN0YXRlLnNlbGVjdGlvbik7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICB9XG5cbiAgc3RvcEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9wU3RhdGlvbnModGhpcy5hbGxTdGF0aW9uSURzKCkpO1xuICB9XG5cbiAgc3RhcnRTdGF0aW9ucyhzdGF0aW9uSURzKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvc3RhdGlvbnMuanNvbicsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGFjdGlvbjogJ3N0YXJ0JyxcbiAgICAgICAgc3RhdGlvbklEczogQXJyYXkuZnJvbShzdGF0aW9uSURzKSxcbiAgICAgIH0pLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHt9LFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICB9XG5cbiAgc3RhcnRTZWxlY3RlZCgpIHtcbiAgICB0aGlzLnN0YXJ0U3RhdGlvbnModGhpcy5zdGF0ZS5zZWxlY3Rpb24pO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHN0YXJ0QWxsKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0U3RhdGlvbnModGhpcy5hbGxTdGF0aW9uSURzKCkpO1xuICB9XG5cbiAgY2hhbmdlQXBwU2VsZWN0ZWQoYXBwKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvc3RhdGlvbnMuanNvbicsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGFjdGlvbjogJ2NoYW5nZV9hcHAnLFxuICAgICAgICBzdGF0aW9uSURzOiBBcnJheS5mcm9tKHRoaXMuc3RhdGUuc2VsZWN0aW9uKSxcbiAgICAgICAgYXBwLFxuICAgICAgfSksXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4ge30sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSB0aGUgc2VydmVyIHBvbGxcbiAgICpcbiAgICogSW1wbGVtZW50YXRpb246IFNpbmNlIHRoZSBzZXJ2ZXIgdXNlcyBsb25nIHBvbGxpbmcgd2UgdXNlIGEgdmVyeSBzaG9ydFxuICAgKiBwb2xsIHRpbWUgKDUwMG1zKS4gSW4gY2FzZSBvZiBlcnJvcnMgY29udGFjdGluZyB0aGUgc2VydmVyIHRoZSBwb2xsIHRpbWVcbiAgICogaW5jcmVhc2VzIHdpdGggZWFjaCBlcnJvciB1bnRpbCBhIG1heCBwb2xsIHRpbWUgaXMgcmVhY2hlZC5cbiAgICovXG4gIHBvbGxMb29wKCkge1xuICAgIGNvbnN0IG1pblBvbGxUaW1lID0gNTAwO1xuICAgIGxldCByZXRyeVBvbGxUaW1lID0gbWluUG9sbFRpbWU7XG4gICAgY29uc3QgcmV0cnlJbmNyZWFzZUZhY3RvciA9IDI7XG4gICAgY29uc3QgbWF4UmV0cnlQb2xsVGltZSA9IDQwMDA7XG5cbiAgICBjb25zdCBsb29wID0gKCkgPT4ge1xuICAgICAgdGhpcy5wb2xsU2VydmVyKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQobG9vcCwgbWluUG9sbFRpbWUpO1xuICAgICAgICByZXRyeVBvbGxUaW1lID0gbWluUG9sbFRpbWU7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlcnZlckNvbm5lY3Rpb25FcnJvcikge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXJ2ZXJDb25uZWN0aW9uRXJyb3I6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5ID0gMDtcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChsb29wLCByZXRyeVBvbGxUaW1lKTtcbiAgICAgICAgaWYgKHJldHJ5UG9sbFRpbWUgPCBtYXhSZXRyeVBvbGxUaW1lKSB7XG4gICAgICAgICAgcmV0cnlQb2xsVGltZSA9IHJldHJ5UG9sbFRpbWUgKiByZXRyeUluY3JlYXNlRmFjdG9yO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5Kys7XG4gICAgICAgIGlmICh0aGlzLnNlcnZlckNvbm5lY3Rpb25SZXRyeSA+IDUpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmVyQ29ubmVjdGlvbkVycm9yOiB0cnVlIH0pO1xuICAgICAgICAgIC8vIFJlc2V0IHRoZSB1cGRhdGVJRCBzbyB0aGUgbmV4dCBwb2xsIHJldHVybnMgaW1tZWRpYXRlbHlcbiAgICAgICAgICAvLyBpbnN0ZWFkIG9mIGJlaW5nIGEgbG9uZyBwb2xsXG4gICAgICAgICAgdGhpcy51cGRhdGVJRCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgbG9vcCgpO1xuICB9XG5cbiAgcG9sbFNlcnZlcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9wb2xsLmpzb24nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgbGFzdFNlZW46IHRoaXMudXBkYXRlSUQsXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgdGltZW91dDogMzAwMDAsXG4gICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGEuc3RhdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJRCA9IGRhdGEudXBkYXRlSUQ7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc3RhdGlvbnM6IGRhdGEuc3RhdGlvbnMgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByb3BzLnVybCwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzdGF0aW9ucyA9IFtdO1xuICAgIGNvbnN0IGFjdGlvbnMgPSBbXTtcbiAgICBsZXQgbWVzc2FnZUJhciA9ICcnO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuc2VydmVyQ29ubmVjdGlvbkVycm9yKSB7XG4gICAgICBtZXNzYWdlQmFyID0gKDxkaXYgY2xhc3NOYW1lPVwibWVzc2FnZV9iYXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZXNzYWdlX2Jhci1tZXNzYWdlXCI+XG4gICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtd2FybmluZ1wiPjwvaT4gIE5vIGNvbm5lY3Rpb24gdG8gc2VydmVyLlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2Pik7XG4gICAgfVxuXG4gICAgdGhpcy5nZXRWaXNpYmxlU3RhdGlvbnMoKS5mb3JFYWNoKChzdGF0aW9uKSA9PiBzdGF0aW9ucy5wdXNoKFxuICAgICAgPFN0YXRpb25cbiAgICAgICAgc3RhdGlvbj17c3RhdGlvbn1cbiAgICAgICAga2V5PXtzdGF0aW9uLmlkfVxuICAgICAgICBzZWxlY3RlZD17dGhpcy5zdGF0ZS5zZWxlY3Rpb24uaGFzKHN0YXRpb24uaWQpfVxuICAgICAgICBvbkNsaWNrU3RhdGlvbj17dGhpcy5zZWxlY3RUb2dnbGV9XG4gICAgICAvPlxuICAgICkpO1xuXG4gICAgY29uc3QgY291bnRzID0ge307XG4gICAgdGhpcy5zdGF0ZS5zdGF0aW9ucy5mb3JFYWNoKChzdGF0aW9uKSA9PiB7XG4gICAgICBpZiAoIWNvdW50cy5oYXNPd25Qcm9wZXJ0eSh0aGlzLmRpc3BsYXlTdGF0ZShzdGF0aW9uLnN0YXRlKSkpIHtcbiAgICAgICAgY291bnRzW3RoaXMuZGlzcGxheVN0YXRlKHN0YXRpb24uc3RhdGUpXSA9IDA7XG4gICAgICB9XG4gICAgICBjb3VudHNbdGhpcy5kaXNwbGF5U3RhdGUoc3RhdGlvbi5zdGF0ZSldKys7XG4gICAgfSk7XG5cbiAgICBjb25zdCBzZWxlY3RlZENvdW50ID0gdGhpcy5zdGF0ZS5zZWxlY3Rpb24uc2l6ZTtcbiAgICBjb25zdCBhbGxTZWxlY3RlZCA9IChzZWxlY3RlZENvdW50ID09PSB0aGlzLnN0YXRlLnN0YXRpb25zLmxlbmd0aCk7XG4gICAgY29uc3Qgc2VsZWN0QWxsQ2xhc3NlcyA9XG4gICAgICBgYnRuIGJ0bi1kZWZhdWx0ICR7YWxsU2VsZWN0ZWQgPyAnIGRpc2FibGVkJyA6ICcnfWA7XG5cbiAgICBjb25zdCBkZXNlbGVjdEFsbENsYXNzZXMgPVxuICAgICAgYGJ0biBidG4tZGVmYXVsdCAke3NlbGVjdGVkQ291bnQgPT09IDAgPyAnIGRpc2FibGVkJyA6ICcnfWA7XG5cbiAgICBjb25zdCBzdGF0aW9uV29yZCA9IHNlbGVjdGVkQ291bnQgPT09IDEgPyAnc3RhdGlvbicgOiAnc3RhdGlvbnMnO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzdGF0aW9uU3RhdGVGaWx0ZXJcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8QnV0dG9uRmlsdGVyXG4gICAgICAgICAgb3B0aW9ucz17WydvbicsICdvZmYnLCAnYnVzeScsICdlcnJvciddfVxuICAgICAgICAgIGNvdW50cz17Y291bnRzfVxuICAgICAgICAgIGFsbFRleHQ9XCJBbGwgc3RhdGVzXCJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52aXNpYmxlU3RhdGV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhvcHRpb24pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2aXNpYmxlU3RhdGU6IG9wdGlvbiB9KTtcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic3RhdGlvblR5cGVGaWx0ZXJcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8QnV0dG9uRmlsdGVyXG4gICAgICAgICAgb3B0aW9ucz17dGhpcy5nZXRTdGF0aW9uVHlwZXMoKX1cbiAgICAgICAgICBhbGxUZXh0PVwiQWxsIHR5cGVzXCJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52aXNpYmxlVHlwZX1cbiAgICAgICAgICBvbkNoYW5nZT17KG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZpc2libGVUeXBlOiBvcHRpb24gfSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInNlbGVjdGVkQ291bnRcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lLXNlcGFyYXRvclwiID48L2Rpdj5cbiAgICAgICAgPGI+e3RoaXMuc3RhdGUuc2VsZWN0aW9uLnNpemV9IHtzdGF0aW9uV29yZH0gc2VsZWN0ZWQ8L2I+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0QWN0aW9uc1wiPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBjbGFzc05hbWU9e2Rlc2VsZWN0QWxsQ2xhc3Nlc31cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZ2V0Q29tbWFuZCgnc3RhdGlvbnMtYWxsLWRlc2VsZWN0Jyl9XG4gICAgICAgICAgPkRlc2VsZWN0PC9hPiZuYnNwO1xuICAgICAgICAgIDxhXG4gICAgICAgICAgICBjbGFzc05hbWU9e3NlbGVjdEFsbENsYXNzZXN9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLXZpc2libGUtc2VsZWN0Jyl9XG4gICAgICAgICAgPlNlbGVjdCBhbGw8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGNvbnN0IG5vU2VsZWN0aW9uRGlzYWJsZSA9IChzZWxlY3RlZENvdW50ID09PSAwID8gJyBkaXNhYmxlZCcgOiAnJyk7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInN0YXJ0U3RvcFBhbmVsXCIgY2xhc3NOYW1lPXtgYWN0aW9uLXBhbmUke25vU2VsZWN0aW9uRGlzYWJsZX1gfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZS1zZXBhcmF0b3JcIiA+PC9kaXY+XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi1zdWNjZXNzJHtub1NlbGVjdGlvbkRpc2FibGV9YH1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLXNlbGVjdGVkLXN0YXJ0Jyl9XG4gICAgICAgID48aSBjbGFzc05hbWU9XCJmYSBmYS1wbGF5XCIgLz4mbmJzcDsmbmJzcDtTdGFydCBTZWxlY3RlZDwvYT5cbiAgICAgICAgJm5ic3A7XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi1kYW5nZXIke25vU2VsZWN0aW9uRGlzYWJsZX1gfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZ2V0Q29tbWFuZCgnc3RhdGlvbnMtc2VsZWN0ZWQtc3RvcCcpfVxuICAgICAgICA+PGkgY2xhc3NOYW1lPVwiZmEgZmEtc3RvcFwiIC8+Jm5ic3A7Jm5ic3A7U3RvcCBTZWxlY3RlZDwvYT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBsZXQgc2VsZWN0ZWRBcmVTYW1lVHlwZSA9IHRydWU7XG4gICAgbGV0IGxhc3RUeXBlID0gbnVsbDtcbiAgICBmb3IgKGNvbnN0IHNlbGVjdGVkSUQgb2YgdGhpcy5zdGF0ZS5zZWxlY3Rpb24pIHtcbiAgICAgIGlmIChsYXN0VHlwZSA9PT0gbnVsbCkge1xuICAgICAgICBsYXN0VHlwZSA9IHRoaXMuZ2V0U3RhdGlvblN0YXRlKHNlbGVjdGVkSUQpLnR5cGU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5nZXRTdGF0aW9uU3RhdGUoc2VsZWN0ZWRJRCkudHlwZSAhPT0gbGFzdFR5cGUpIHtcbiAgICAgICAgc2VsZWN0ZWRBcmVTYW1lVHlwZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYWxsU2VsZWN0ZWRPbiA9IHRydWU7XG4gICAgZm9yIChjb25zdCBzZWxlY3RlZElEIG9mIHRoaXMuc3RhdGUuc2VsZWN0aW9uKSB7XG4gICAgICBpZiAodGhpcy5nZXRTdGF0aW9uU3RhdGUoc2VsZWN0ZWRJRCkuc3RhdGUgIT09ICdvbicpIHtcbiAgICAgICAgYWxsU2VsZWN0ZWRPbiA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjYW5DaGFuZ2VBcHAgPSAoYWxsU2VsZWN0ZWRPbiAmJiAoc2VsZWN0ZWRDb3VudCA+IDApICYmIHNlbGVjdGVkQXJlU2FtZVR5cGUpO1xuXG4gICAgbGV0IGFwcGxpY2F0aW9ucyA9IFtdO1xuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiB0aGlzLnN0YXRlLnN0YXRpb25zKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3Rpb24uaGFzKHN0YXRpb24uaWQpKSB7XG4gICAgICAgIGFwcGxpY2F0aW9ucyA9IHN0YXRpb24ucG9zc2libGVfYXBwcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cImFwcFNlbGVjdFwiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmUtc2VwYXJhdG9yXCIgPjwvZGl2PlxuICAgICAgICA8QXBwU2VsZWN0XG4gICAgICAgICAgYXBwbGljYXRpb25zPXtjYW5DaGFuZ2VBcHAgPyBhcHBsaWNhdGlvbnMgOiBbXX1cbiAgICAgICAgICBkaXNhYmxlZD17IWNhbkNoYW5nZUFwcH1cbiAgICAgICAgICBhbGxvd0JsYW5rXG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuYXR0YWNoQ29uZmlybWF0aW9uKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHRoZSBhcHBsaWNhdGlvbj8nLFxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VBcHBTZWxlY3RlZCl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgY29uc3Qgbm9UZXJtaW5hbE91dHB1dERpc2FibGUgPSAoc2VsZWN0ZWRDb3VudCAhPT0gMSA/ICcgZGlzYWJsZWQnIDogJycpO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzaG93TG9nXCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZS1zZXBhcmF0b3JcIiA+PC9kaXY+XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCJcbiAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5sb2dWaWV3ZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhpcy5sb2dWaWV3ZXIub3Blbk1vZGFsKCk7XG4gICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9sb2cuanNvbicsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvZzogZGF0YS5lbnRyaWVzLnJldmVyc2UoKSB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH19XG4gICAgICAgID5TaG93IGxvZzwvYT5cbiAgICAgICAgJm5ic3A7XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi1kZWZhdWx0JHtub1Rlcm1pbmFsT3V0cHV0RGlzYWJsZX1gfVxuICAgICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgICBvbkNsaWNrPXsoZXYpID0+IHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY29uc29sZVZpZXdlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICB0aGlzLmNvbnNvbGVWaWV3ZXIub3Blbk1vZGFsKCk7XG4gICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9zdGF0aW9uX291dHB1dC5qc29uJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICBzdGF0aW9uSUQ6IEFycmF5LmZyb20odGhpcy5zdGF0ZS5zZWxlY3Rpb24pWzBdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IEFycmF5LmZyb20odGhpcy5zdGF0ZS5zZWxlY3Rpb24pWzBdLFxuICAgICAgICAgICAgICAgICAgICBsaW5lczogZGF0YS5saW5lcyxcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgPlRlcm1pbmFsIG91dHB1dDwvYT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e21lc3NhZ2VCYXIgIT09ICcnID8gJ3dpdGgtbWVzc2FnZV9iYXInIDogJyd9PlxuICAgICAgICB7bWVzc2FnZUJhcn1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNiBwYW5lLXN0YXRpb25zXCI+XG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJkYXNoYm9hcmRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwic3RhdGlvbkxpc3RcIiBjbGFzc05hbWU9XCJwYW5lbC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAge3N0YXRpb25zfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNiBwYW5lLWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgPGRpdiBpZD1cImRhc2hib2FyZEFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICB7YWN0aW9uc31cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxMb2dWaWV3ZXIgbG9nPXt0aGlzLnN0YXRlLmxvZ30gcmVmPXsoYykgPT4geyB0aGlzLmxvZ1ZpZXdlciA9IGM7IH19IC8+XG4gICAgICAgIDxDb25zb2xlVmlld2VyIGxpbmVzPXt0aGlzLnN0YXRlLmxpbmVzfSByZWY9eyhjKSA9PiB7IHRoaXMuY29uc29sZVZpZXdlciA9IGM7IH19IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkRhc2hib2FyZC5wcm9wVHlwZXMgPSB7XG4gIHVybDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ1ZpZXdlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGZvcm1hdFRpbWUoaXNvVGltZSkge1xuICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZShpc29UaW1lKTtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgeWVzdGVyZGF5ID0gbmV3IERhdGUoKTtcbiAgICB5ZXN0ZXJkYXkuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAxKTtcbiAgICBsZXQgZGF5ID0gJyc7XG5cbiAgICBpZiAodG9kYXkuZ2V0TW9udGgoKSA9PT0gdGltZS5nZXRNb250aCgpICYmXG4gICAgICB0b2RheS5nZXRGdWxsWWVhcigpID09PSB0aW1lLmdldEZ1bGxZZWFyKCkgJiZcbiAgICAgIHRvZGF5LmdldERhdGUoKSA9PT0gdGltZS5nZXREYXRlKCkpIHtcbiAgICAgIGRheSA9ICdUb2RheSc7XG4gICAgfSBlbHNlIGlmICh5ZXN0ZXJkYXkuZ2V0TW9udGgoKSA9PT0gdGltZS5nZXRNb250aCgpICYmXG4gICAgICB5ZXN0ZXJkYXkuZ2V0RnVsbFllYXIoKSA9PT0gdGltZS5nZXRGdWxsWWVhcigpICYmXG4gICAgICB5ZXN0ZXJkYXkuZ2V0RGF0ZSgpID09PSB0aW1lLmdldERhdGUoKSkge1xuICAgICAgZGF5ID0gJ1llc3RlcmRheSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRheSA9IGAke3RpbWUuZ2V0RnVsbFllYXIoKX0tJHt0aW1lLmdldE1vbnRoKCl9LSR7dGltZS5nZXREYXRlKCl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7ZGF5fSAke3RpbWUuZ2V0SG91cnMoKX06JHt0aW1lLmdldE1pbnV0ZXMoKX06JHt0aW1lLmdldFNlY29uZHMoKX1gO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5tb2RhbERJViA9IG51bGw7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsICgpID0+IHsgdGhpcy5oYW5kbGVSZXNpemUoKTsgfSk7XG4gICAgJCh0aGlzLm1vZGFsRElWKS5vbignc2hvdy5icy5tb2RhbCcsICgpID0+IHsgdGhpcy5oYW5kbGVSZXNpemUoKTsgfSk7XG4gIH1cblxuICBvcGVuTW9kYWwoKSB7XG4gICAgaWYgKHRoaXMubW9kYWxESVYgIT09IG51bGwpIHtcbiAgICAgICQodGhpcy5tb2RhbERJVikubW9kYWwoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVSZXNpemUoKSB7XG4gICAgY29uc3QgJG1vZGFsID0gJCh0aGlzLm1vZGFsRElWKTtcbiAgICBjb25zdCBtb2RhbEhlYWRlckhlaWdodCA9IDU2O1xuICAgIGNvbnN0IG1vZGFsTWFyZ2luID0gMzA7XG4gICAgY29uc3QgbW9kYWxCb3JkZXIgPSAxO1xuXG4gICAgY29uc3QgYm9keUhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIChtb2RhbEhlYWRlckhlaWdodCArIG1vZGFsTWFyZ2luICogMiArIG1vZGFsQm9yZGVyICogMik7XG4gICAgJG1vZGFsLmZpbmQoJy5tb2RhbC1ib2R5JykuY3NzKHsgbWF4SGVpZ2h0OiBib2R5SGVpZ2h0IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHJvd0NsYXNzZXMgPSB7XG4gICAgICBlcnJvcjogJ2RhbmdlcicsXG4gICAgICB3YXJuaW5nOiAnd2FybmluZycsXG4gICAgfTtcblxuICAgIGNvbnN0IGVudHJpZXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGxvZ0VudHJ5IG9mIHRoaXMucHJvcHMubG9nKSB7XG4gICAgICBjb25zdCByb3dDbGFzcyA9IHJvd0NsYXNzZXNbbG9nRW50cnkudHlwZV0gIT09IHVuZGVmaW5lZCA/IHJvd0NsYXNzZXNbbG9nRW50cnkudHlwZV0gOiAnJztcblxuICAgICAgZW50cmllcy5wdXNoKFxuICAgICAgICA8dHIga2V5PXtsb2dFbnRyeS5pZH0gY2xhc3NOYW1lPXtyb3dDbGFzc30+XG4gICAgICAgICAgPHRkPntMb2dWaWV3ZXIuZm9ybWF0VGltZShsb2dFbnRyeS50aW1lKX08L3RkPlxuICAgICAgICAgIDx0ZD57bG9nRW50cnkuc3RhdGlvbl9uYW1lfTwvdGQ+XG4gICAgICAgICAgPHRkPntsb2dFbnRyeS5tZXNzYWdlfTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGUgbG9nVmlld2VyLW1vZGFsXCIgdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiByZWY9eyhjKSA9PiB7IHRoaXMubW9kYWxESVYgPSBjOyB9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2cgbW9kYWwtbGdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+e3RoaXMucHJvcHMudGl0bGV9PC9oND5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1maXhlZCB0YWJsZS1jb25kZW5zZWRcIj5cbiAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5UaW1lPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlN0YXRpb248L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+TWVzc2FnZTwvdGg+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIHtlbnRyaWVzfVxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkxvZ1ZpZXdlci5wcm9wVHlwZXMgPSB7XG4gIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBsb2c6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICB0aW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgc3RhdGlvbl9pZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHN0YXRpb25fbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIG1lc3NhZ2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgfSlcbiAgKSxcbn07XG5cbkxvZ1ZpZXdlci5kZWZhdWx0UHJvcHMgPSB7XG4gIGxvZzogW10sXG4gIHRpdGxlOiAnRXZlbnQgTG9nJyxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4vZGFzaGJvYXJkLmpzeCc7XG5cbndpbmRvdy5kYXNoYm9hcmQgPSBudWxsO1xuXG4vLyBvblJlYWR5XG4kKCgpID0+IHtcbiAgd2luZG93LmRhc2hib2FyZCA9IFJlYWN0RE9NLnJlbmRlcihcbiAgICA8RGFzaGJvYXJkIHVybD1cIi9hcGkvc3RhdGlvbnMuanNvblwiIC8+LFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXNoYm9hcmRDb250YWluZXInKVxuICApO1xuXG4gIC8vIEluc3RhbGwgY2xpY2sgaGFuZGxlcnMgaW4gZXh0ZXJuYWwgbWVudXMgYW5kIGJ1dHRvbnNcbiAgJCgnW2RhdGEtY29tbWFuZF0nKS5lYWNoKGZ1bmN0aW9uIHNldENsaWNrSGFuZGxlcigpIHtcbiAgICAkKHRoaXMpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgd2luZG93LmRhc2hib2FyZC5nZXRDb21tYW5kKCQodGhpcykuYXR0cignZGF0YS1jb21tYW5kJykpKCk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVDbGljaygpIHtcbiAgICB0aGlzLnByb3BzLm9uQ2xpY2tTdGF0aW9uKHRoaXMucHJvcHMuc3RhdGlvbi5pZCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgc3RhdGlvbkNsYXNzZXMgPSBbXG4gICAgICAnc3RhdGlvbicsXG4gICAgICBgc3RhdGlvbi1zdGF0ZS0ke3RoaXMucHJvcHMuc3RhdGlvbi5zdGF0ZX1gLFxuICAgICAgYHN0YXRpb24tdHlwZS0ke3RoaXMucHJvcHMuc3RhdGlvbi50eXBlfWAsXG4gICAgXTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkKSB7XG4gICAgICBzdGF0aW9uQ2xhc3Nlcy5wdXNoKCdzdGF0aW9uLXNlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e3RoaXMucHJvcHMuc3RhdGlvbi5pZH1cbiAgICAgICAgY2xhc3NOYW1lPXtzdGF0aW9uQ2xhc3Nlcy5qb2luKCcgJyl9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1zdGF0ZS1saWdodFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24taWNvblwiPlxuICAgICAgICAgIDxpbWcgYWx0PXt0aGlzLnByb3BzLnN0YXRpb24uYXBwfSBzcmM9e3RoaXMucHJvcHMuc3RhdGlvbi5pY29ufSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLW5hbWVcIj57dGhpcy5wcm9wcy5zdGF0aW9uLm5hbWV9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi10eXBlXCI+e3RoaXMucHJvcHMuc3RhdGlvbi50eXBlfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tYXBwXCI+e3RoaXMucHJvcHMuc3RhdGlvbi5hcHB9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1zdGF0dXNcIj57dGhpcy5wcm9wcy5zdGF0aW9uLnN0YXR1c308L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuU3RhdGlvbi5wcm9wVHlwZXMgPSB7XG4gIHN0YXRpb246IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzdGF0ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN0YXR1czogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcHA6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWNvbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBvbkNsaWNrU3RhdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG59O1xuIl19
