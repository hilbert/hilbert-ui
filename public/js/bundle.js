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

var _station = require('./station.jsx');

var _station2 = _interopRequireDefault(_station);

var _appSelect = require('./appSelect.jsx');

var _appSelect2 = _interopRequireDefault(_appSelect);

var _buttonFilter = require('./buttonFilter.jsx');

var _buttonFilter2 = _interopRequireDefault(_buttonFilter);

var _logViewer = require('./logViewer.jsx');

var _logViewer2 = _interopRequireDefault(_logViewer);

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

},{"./appSelect.jsx":1,"./buttonFilter.jsx":2,"./logViewer.jsx":4,"./station.jsx":6,"react":"react"}],4:[function(require,module,exports){
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

},{"react":"react"}],5:[function(require,module,exports){
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

},{"./dashboard.jsx":3,"react":"react","react-dom":"react-dom"}],6:[function(require,module,exports){
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

},{"react":"react"}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwU2VsZWN0LmpzeCIsInNyYy9idXR0b25GaWx0ZXIuanN4Iiwic3JjL2Rhc2hib2FyZC5qc3giLCJzcmMvbG9nVmlld2VyLmpzeCIsInNyYy9tYWluLmpzeCIsInNyYy9zdGF0aW9uLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTXFCLFM7OztBQUVuQixxQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsNkZBQ1gsS0FEVzs7QUFFakIsVUFBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsVUFBSyxnQkFBTCxHQUF3QixNQUFLLGdCQUFMLENBQXNCLElBQXRCLE9BQXhCO0FBSGlCO0FBSWxCOzs7O3VDQUVrQjtBQUNqQixVQUFJLEtBQUssS0FBTCxDQUFXLFFBQWYsRUFBeUI7QUFDdkIsYUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixLQUFLLFdBQUwsQ0FBaUIsS0FBckM7QUFDRDtBQUNGOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFNLGVBQWUsRUFBckI7O0FBRUEsVUFBSSxLQUFLLEtBQUwsQ0FBVyxVQUFmLEVBQTJCO0FBQ3pCLHFCQUFhLElBQWIsQ0FDRTtBQUFBO1VBQUEsRUFBUSxLQUFJLE1BQVosRUFBbUIsT0FBTSxFQUF6QjtVQUFBO0FBQUEsU0FERjtBQUdEOztBQVBNO0FBQUE7QUFBQTs7QUFBQTtBQVNQLDZCQUEwQixLQUFLLEtBQUwsQ0FBVyxZQUFyQyw4SEFBbUQ7QUFBQSxjQUF4QyxXQUF3Qzs7QUFDakQsdUJBQWEsSUFBYixDQUNFO0FBQUE7WUFBQSxFQUFRLEtBQUssV0FBYixFQUEwQixPQUFPLFdBQWpDO1lBQStDO0FBQS9DLFdBREY7QUFHRDtBQWJNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFB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O1VBQThCLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUI7QUFBakQsU0FYRjtRQVlFO0FBQUE7VUFBQSxFQUFLLFdBQVUsZ0JBQWY7VUFBaUMsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQjtBQUFwRDtBQVpGLE9BREY7QUFnQkQ7Ozs7RUFyQ2tDLGdCQUFNLFM7O2tCQUF0QixPOzs7QUF3Q3JCLFFBQVEsU0FBUixHQUFvQjtBQUNsQixXQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0I7QUFDN0IsUUFBSSxnQkFBTSxTQUFOLENBQWdCLE1BRFM7QUFFN0IsVUFBTSxnQkFBTSxTQUFOLENBQWdCLE1BRk87QUFHN0IsV0FBTyxnQkFBTSxTQUFOLENBQWdCLE1BSE07QUFJN0IsVUFBTSxnQkFBTSxTQUFOLENBQWdCLE1BSk87QUFLN0IsWUFBUSxnQkFBTSxTQUFOLENBQWdCLE1BTEs7QUFNN0IsU0FBSyxnQkFBTSxTQUFOLENBQWdCLE1BTlE7QUFPN0IsVUFBTSxnQkFBTSxTQUFOLENBQWdCO0FBUE8sR0FBdEIsRUFRTixVQVRlO0FBVWxCLFlBQVUsZ0JBQU0sU0FBTixDQUFnQixJQVZSO0FBV2xCLGtCQUFnQixnQkFBTSxTQUFOLENBQWdCO0FBWGQsQ0FBcEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuLyoqXG4gKiBBcHBTZWxlY3QgY29tcG9uZW50XG4gKiBBbGxvd3MgdGhlIHVzZXIgdG8gc2VsZWN0IGFuIGFwcGxpY2F0aW9uIGZyb20gYSBsaXN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcFNlbGVjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5hcHBTZWxlY3RvciA9IG51bGw7XG4gICAgdGhpcy5jbGlja2VkQ2hhbmdlQXBwID0gdGhpcy5jbGlja2VkQ2hhbmdlQXBwLmJpbmQodGhpcyk7XG4gIH1cblxuICBjbGlja2VkQ2hhbmdlQXBwKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMuYXBwU2VsZWN0b3IudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBhcHBsaWNhdGlvbnMgPSBbXTtcblxuICAgIGlmICh0aGlzLnByb3BzLmFsbG93QmxhbmspIHtcbiAgICAgIGFwcGxpY2F0aW9ucy5wdXNoKFxuICAgICAgICA8b3B0aW9uIGtleT1cIm51bGxcIiB2YWx1ZT1cIlwiPiZuYnNwOzwvb3B0aW9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGFwcGxpY2F0aW9uIG9mIHRoaXMucHJvcHMuYXBwbGljYXRpb25zKSB7XG4gICAgICBhcHBsaWNhdGlvbnMucHVzaChcbiAgICAgICAgPG9wdGlvbiBrZXk9e2FwcGxpY2F0aW9ufSB2YWx1ZT17YXBwbGljYXRpb259PnthcHBsaWNhdGlvbn08L29wdGlvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgZGlzYWJsZWRDbGFzcyA9ICh0aGlzLnByb3BzLmRpc2FibGVkID8gJyBkaXNhYmxlZCcgOiAnJyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BhcHBTZWxlY3Qke2Rpc2FibGVkQ2xhc3N9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1pbmxpbmVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgZm9ybS1ncm91cC1taW53aWR0aFwiPlxuICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb3JtLWNvbnRyb2wke2Rpc2FibGVkQ2xhc3N9YH1cbiAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSA/IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlIDogJyd9XG4gICAgICAgICAgICAgIHJlZj17KHNlbCkgPT4geyB0aGlzLmFwcFNlbGVjdG9yID0gc2VsOyB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7YXBwbGljYXRpb25zfVxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgJm5ic3A7XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4td2FybmluZyR7ZGlzYWJsZWRDbGFzc31gfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5jbGlja2VkQ2hhbmdlQXBwfVxuICAgICAgICAgID5DaGFuZ2UgYXBwbGljYXRpb248L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5BcHBTZWxlY3QucHJvcFR5cGVzID0ge1xuICBhcHBsaWNhdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgKSxcbiAgZGVmYXVsdFZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBhbGxvd0JsYW5rOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgZGlzYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5BcHBTZWxlY3QuZGVmYXVsdFByb3BzID0ge1xuICBhcHBsaWNhdGlvbnM6IFtdLFxuICBkZWZhdWx0VmFsdWU6ICcnLFxuICBhbGxvd0JsYW5rOiBmYWxzZSxcbiAgZGlzYWJsZWQ6IGZhbHNlLFxuICBvbkNoYW5nZTogKCkgPT4ge30sXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQnV0dG9uRmlsdGVyID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSBbXTtcblxuICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBwcm9wcy5vcHRpb25zKSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IFsnYnRuJywgJ2J0bi1kZWZhdWx0JywgYGJ1dHRvbi1maWx0ZXItb3B0aW9uLSR7b3B0aW9ufWBdO1xuICAgIGlmIChwcm9wcy52YWx1ZSA9PT0gb3B0aW9uKSB7XG4gICAgICBjbGFzc2VzLnB1c2goJ2FjdGl2ZScpO1xuICAgIH1cbiAgICBsZXQgY291bnRlciA9ICcnO1xuICAgIGxldCBzcGFjaW5nID0gJyc7XG4gICAgaWYgKHByb3BzLmNvdW50cyAhPT0gbnVsbCkge1xuICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgIGlmIChwcm9wcy5jb3VudHMuaGFzT3duUHJvcGVydHkob3B0aW9uKSAmJiBwcm9wcy5jb3VudHNbb3B0aW9uXSAhPT0gMCkge1xuICAgICAgICBjb3VudCA9IHByb3BzLmNvdW50c1tvcHRpb25dO1xuICAgICAgfVxuICAgICAgY29uc3QgYmFkZ2VDbGFzc2VzID0gYGJhZGdlJHtjb3VudCA9PT0gMCA/ICcgemVybycgOiAnIG5vbi16ZXJvJ31gO1xuICAgICAgY291bnRlciA9ICg8c3BhbiBjbGFzc05hbWU9e2JhZGdlQ2xhc3Nlc30+e2NvdW50fTwvc3Bhbj4pO1xuICAgICAgc3BhY2luZyA9ICcgJztcbiAgICB9XG4gICAgb3B0aW9ucy5wdXNoKFxuICAgICAgPGFcbiAgICAgICAgaHJlZj1cIiNcIlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMuam9pbignICcpfVxuICAgICAgICBrZXk9e29wdGlvbn1cbiAgICAgICAgb25DbGljaz17KCkgPT4gcHJvcHMub25DaGFuZ2Uob3B0aW9uKX1cbiAgICAgID57b3B0aW9ufXtzcGFjaW5nfXtjb3VudGVyfTwvYT5cbiAgICApO1xuICB9XG5cbiAgY29uc3QgZGVmYXVsdENsYXNzZXMgPSBbJ2J0bicsICdidG4tZGVmYXVsdCddO1xuICBpZiAocHJvcHMudmFsdWUgPT09ICcnKSB7XG4gICAgZGVmYXVsdENsYXNzZXMucHVzaCgnYWN0aXZlJyk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLXRvb2xiYXIgYnV0dG9uLWZpbHRlclwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAgPGFcbiAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgY2xhc3NOYW1lPXtkZWZhdWx0Q2xhc3Nlcy5qb2luKCcgJyl9XG4gICAgICAgICAga2V5PVwibnVsbFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gcHJvcHMub25DaGFuZ2UoJycpfVxuICAgICAgICA+e3Byb3BzLmFsbFRleHR9PC9hPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cFwiPlxuICAgICAgICB7b3B0aW9uc31cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuQnV0dG9uRmlsdGVyLnByb3BUeXBlcyA9IHtcbiAgb3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLnN0cmluZyksXG4gIGNvdW50czogUmVhY3QuUHJvcFR5cGVzLm9iamVjdE9mKFJlYWN0LlByb3BUeXBlcy5udW1iZXIpLFxuICBhbGxUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgb25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxufTtcblxuQnV0dG9uRmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb3B0aW9uczogW10sXG4gIGNvdW50czogbnVsbCxcbiAgYWxsVGV4dDogJ0FsbCcsXG4gIHZhbHVlOiAnJyxcbiAgb25DaGFuZ2U6ICgpID0+IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uRmlsdGVyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTdGF0aW9uIGZyb20gJy4vc3RhdGlvbi5qc3gnO1xuaW1wb3J0IEFwcFNlbGVjdCBmcm9tICcuL2FwcFNlbGVjdC5qc3gnO1xuaW1wb3J0IEJ1dHRvbkZpbHRlciBmcm9tICcuL2J1dHRvbkZpbHRlci5qc3gnO1xuaW1wb3J0IExvZ1ZpZXdlciBmcm9tICcuL2xvZ1ZpZXdlci5qc3gnO1xuXG4vLyBjb25zdCB0bXBfbG9nX2VudHJpZXMgPSByZXF1aXJlKCcuL3RtcF9sb2cuanNvbicpLmVudHJpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhc2hib2FyZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHN0YXRpb25zOiBbXSxcbiAgICAgIHNlbGVjdGlvbjogbmV3IFNldCgpLFxuICAgICAgdmlzaWJsZVR5cGU6ICcnLFxuICAgICAgdmlzaWJsZVN0YXRlOiAnJyxcbiAgICAgIGxvZzogW10sXG4gICAgICBzZXJ2ZXJDb25uZWN0aW9uRXJyb3I6IGZhbHNlLFxuICAgIH07XG4gICAgdGhpcy5zZWxlY3RUb2dnbGUgPSB0aGlzLnNlbGVjdFRvZ2dsZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2hhbmdlQXBwU2VsZWN0ZWQgPSB0aGlzLmNoYW5nZUFwcFNlbGVjdGVkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jb21tYW5kcyA9IHt9O1xuICAgIHRoaXMuaW5pdENvbW1hbmRzKCk7XG4gICAgdGhpcy5nZXRDb21tYW5kID0gdGhpcy5nZXRDb21tYW5kLmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb2dWaWV3ZXIgPSBudWxsO1xuICAgIHRoaXMudXBkYXRlSUQgPSAwO1xuICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5ID0gMDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucG9sbExvb3AoKTtcbiAgfVxuXG4gIGdldFN0YXRpb25TdGF0ZShzdGF0aW9uSUQpIHtcbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgaWYgKHN0YXRpb24uaWQgPT09IHN0YXRpb25JRCkge1xuICAgICAgICByZXR1cm4gc3RhdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRTdGF0aW9uVHlwZXMoKSB7XG4gICAgY29uc3QgdHlwZXMgPSBuZXcgU2V0KCk7XG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIHR5cGVzLmFkZChzdGF0aW9uLnR5cGUpO1xuICAgIH1cblxuICAgIHJldHVybiBBcnJheS5mcm9tKHR5cGVzKTtcbiAgfVxuXG4gIGdldENvbW1hbmQoY29tbWFuZE5hbWUpIHtcbiAgICBpZiAodGhpcy5jb21tYW5kc1tjb21tYW5kTmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29tbWFuZHNbY29tbWFuZE5hbWVdLmRvQ2FsbGJhY2s7XG4gICAgfVxuICAgIHRocm93IEVycm9yKGBDYWxsIHRvIGludmFsaWQgY29tbWFuZCAke2NvbW1hbmROYW1lfWApO1xuICB9XG5cbiAgZ2V0VmlzaWJsZVN0YXRpb25zKCkge1xuICAgIGNvbnN0IGFuc3dlciA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIGlmICgodGhpcy5zdGF0ZS52aXNpYmxlVHlwZSA9PT0gJycgfHwgc3RhdGlvbi50eXBlID09PSB0aGlzLnN0YXRlLnZpc2libGVUeXBlKSAmJlxuICAgICAgICAgICh0aGlzLnN0YXRlLnZpc2libGVTdGF0ZSA9PT0gJycgfHxcbiAgICAgICAgICAgdGhpcy5kaXNwbGF5U3RhdGUoc3RhdGlvbi5zdGF0ZSkgPT09IHRoaXMuc3RhdGUudmlzaWJsZVN0YXRlKSkge1xuICAgICAgICBhbnN3ZXIucHVzaChzdGF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYW5zd2VyO1xuICB9XG5cbiAgZGlzcGxheVN0YXRlKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlID09PSAnc3RhcnRpbmcnIHx8IHN0YXRlID09PSAnc3RvcHBpbmcnIHx8IHN0YXRlID09PSAnc3dpdGNoaW5nX2FwcCcpIHtcbiAgICAgIHJldHVybiAnYnVzeSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgYXR0YWNoQ29uZmlybWF0aW9uKHRleHQsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICBib290Ym94LmRpYWxvZyh7XG4gICAgICAgIG1lc3NhZ2U6IHRleHQsXG4gICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICB3YXJuaW5nOiB7XG4gICAgICAgICAgICBsYWJlbDogJ0NvbmZpcm0nLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuLXdhcm5pbmcnLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLmJpbmQodGhpcywgLi4uYXJncyksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjYW5jZWw6IHtcbiAgICAgICAgICAgIGxhYmVsOiAnQ2FuY2VsJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bi1kZWZhdWx0JyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGluaXRDb21tYW5kcygpIHtcbiAgICB0aGlzLmNvbW1hbmRzID0ge1xuICAgICAgJ3N0YXRpb25zLWFsbC1zdGFydCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RhcnRBbGwuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzdGFydCBhbGwgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1hbGwtc3RvcCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RvcEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3N0b3AgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtYWxsLXNlbGVjdCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc2VsZWN0QWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc2VsZWN0IGFsbCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IGZhbHNlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1hbGwtZGVzZWxlY3QnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLmRlc2VsZWN0QWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnZGVzZWxlY3QgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLXNlbGVjdGVkLXN0YXJ0Jzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5zdGFydFNlbGVjdGVkLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RhcnQgdGhlIHNlbGVjdGVkIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtc2VsZWN0ZWQtc3RvcCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RvcFNlbGVjdGVkLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RvcCB0aGUgc2VsZWN0ZWQgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy12aXNpYmxlLXNlbGVjdCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc2VsZWN0QWxsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3NlbGVjdCB2aXNpYmxlIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXModGhpcy5jb21tYW5kcykpIHtcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSB0aGlzLmNvbW1hbmRzW25hbWVdO1xuICAgICAgaWYgKGNvbW1hbmQuY29uZmlybSkge1xuICAgICAgICB0aGlzLmNvbW1hbmRzW25hbWVdLmRvQ2FsbGJhY2sgPSB0aGlzLmF0dGFjaENvbmZpcm1hdGlvbihcbiAgICAgICAgICBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvICR7Y29tbWFuZC50aXRsZX0/YCxcbiAgICAgICAgICBjb21tYW5kLmNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbW1hbmRzW25hbWVdLmRvQ2FsbGJhY2sgPSBjb21tYW5kLmNhbGxiYWNrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFsbFN0YXRpb25JRHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGlvbklEcyh0aGlzLnN0YXRlLnN0YXRpb25zKTtcbiAgfVxuXG4gIHN0YXRpb25JRHMoc3RhdGlvbnMpIHtcbiAgICBjb25zdCBpZHMgPSBuZXcgU2V0KCk7XG5cbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2Ygc3RhdGlvbnMpIHtcbiAgICAgIGlkcy5hZGQoc3RhdGlvbi5pZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlkcztcbiAgfVxuXG4gIHNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW9uOiB0aGlzLmFsbFN0YXRpb25JRHMoKSB9KTtcbiAgfVxuXG4gIHNlbGVjdEFsbFZpc2libGUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogdGhpcy5zdGF0aW9uSURzKHRoaXMuZ2V0VmlzaWJsZVN0YXRpb25zKCkpIH0pO1xuICB9XG5cbiAgZGVzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogbmV3IFNldCgpIH0pO1xuICB9XG5cbiAgc2VsZWN0VG9nZ2xlKGlkKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0aW9uLmhhcyhpZCkpIHtcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmRlbGV0ZShpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmFkZChpZCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3Rpb246IHRoaXMuc3RhdGUuc2VsZWN0aW9uIH0pO1xuICB9XG5cbiAgc3RvcFN0YXRpb25zKHN0YXRpb25JRHMpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9zdGF0aW9ucy5qc29uJyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgYWN0aW9uOiAnc3RvcCcsXG4gICAgICAgIHN0YXRpb25JRHM6IEFycmF5LmZyb20oc3RhdGlvbklEcyksXG4gICAgICB9KSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7fSxcbiAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICB9KTtcbiAgfVxuXG4gIHN0b3BTZWxlY3RlZCgpIHtcbiAgICB0aGlzLnN0b3BTdGF0aW9ucyh0aGlzLnN0YXRlLnNlbGVjdGlvbik7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICB9XG5cbiAgc3RvcEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9wU3RhdGlvbnModGhpcy5hbGxTdGF0aW9uSURzKCkpO1xuICB9XG5cbiAgc3RhcnRTdGF0aW9ucyhzdGF0aW9uSURzKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvc3RhdGlvbnMuanNvbicsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGFjdGlvbjogJ3N0YXJ0JyxcbiAgICAgICAgc3RhdGlvbklEczogQXJyYXkuZnJvbShzdGF0aW9uSURzKSxcbiAgICAgIH0pLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHt9LFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICB9XG5cbiAgc3RhcnRTZWxlY3RlZCgpIHtcbiAgICB0aGlzLnN0YXJ0U3RhdGlvbnModGhpcy5zdGF0ZS5zZWxlY3Rpb24pO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHN0YXJ0QWxsKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0U3RhdGlvbnModGhpcy5hbGxTdGF0aW9uSURzKCkpO1xuICB9XG5cbiAgY2hhbmdlQXBwU2VsZWN0ZWQoYXBwKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvc3RhdGlvbnMuanNvbicsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGFjdGlvbjogJ2NoYW5nZV9hcHAnLFxuICAgICAgICBzdGF0aW9uSURzOiBBcnJheS5mcm9tKHRoaXMuc3RhdGUuc2VsZWN0aW9uKSxcbiAgICAgICAgYXBwLFxuICAgICAgfSksXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4ge30sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSB0aGUgc2VydmVyIHBvbGxcbiAgICpcbiAgICogSW1wbGVtZW50YXRpb246IFNpbmNlIHRoZSBzZXJ2ZXIgdXNlcyBsb25nIHBvbGxpbmcgd2UgdXNlIGEgdmVyeSBzaG9ydFxuICAgKiBwb2xsIHRpbWUgKDUwMG1zKS4gSW4gY2FzZSBvZiBlcnJvcnMgY29udGFjdGluZyB0aGUgc2VydmVyIHRoZSBwb2xsIHRpbWVcbiAgICogaW5jcmVhc2VzIHdpdGggZWFjaCBlcnJvciB1bnRpbCBhIG1heCBwb2xsIHRpbWUgaXMgcmVhY2hlZC5cbiAgICovXG4gIHBvbGxMb29wKCkge1xuICAgIGNvbnN0IG1pblBvbGxUaW1lID0gNTAwO1xuICAgIGxldCByZXRyeVBvbGxUaW1lID0gbWluUG9sbFRpbWU7XG4gICAgY29uc3QgcmV0cnlJbmNyZWFzZUZhY3RvciA9IDI7XG4gICAgY29uc3QgbWF4UmV0cnlQb2xsVGltZSA9IDQwMDA7XG5cbiAgICBjb25zdCBsb29wID0gKCkgPT4ge1xuICAgICAgdGhpcy5wb2xsU2VydmVyKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQobG9vcCwgbWluUG9sbFRpbWUpO1xuICAgICAgICByZXRyeVBvbGxUaW1lID0gbWluUG9sbFRpbWU7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlcnZlckNvbm5lY3Rpb25FcnJvcikge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXJ2ZXJDb25uZWN0aW9uRXJyb3I6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5ID0gMDtcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChsb29wLCByZXRyeVBvbGxUaW1lKTtcbiAgICAgICAgaWYgKHJldHJ5UG9sbFRpbWUgPCBtYXhSZXRyeVBvbGxUaW1lKSB7XG4gICAgICAgICAgcmV0cnlQb2xsVGltZSA9IHJldHJ5UG9sbFRpbWUgKiByZXRyeUluY3JlYXNlRmFjdG9yO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblJldHJ5Kys7XG4gICAgICAgIGlmICh0aGlzLnNlcnZlckNvbm5lY3Rpb25SZXRyeSA+IDUpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmVyQ29ubmVjdGlvbkVycm9yOiB0cnVlIH0pO1xuICAgICAgICAgIC8vIFJlc2V0IHRoZSB1cGRhdGVJRCBzbyB0aGUgbmV4dCBwb2xsIHJldHVybnMgaW1tZWRpYXRlbHlcbiAgICAgICAgICAvLyBpbnN0ZWFkIG9mIGJlaW5nIGEgbG9uZyBwb2xsXG4gICAgICAgICAgdGhpcy51cGRhdGVJRCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgbG9vcCgpO1xuICB9XG5cbiAgcG9sbFNlcnZlcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9wb2xsLmpzb24nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgbGFzdFNlZW46IHRoaXMudXBkYXRlSUQsXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgdGltZW91dDogMzAwMDAsXG4gICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGEuc3RhdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJRCA9IGRhdGEudXBkYXRlSUQ7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc3RhdGlvbnM6IGRhdGEuc3RhdGlvbnMgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByb3BzLnVybCwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzdGF0aW9ucyA9IFtdO1xuICAgIGNvbnN0IGFjdGlvbnMgPSBbXTtcbiAgICBsZXQgbWVzc2FnZUJhciA9ICcnO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuc2VydmVyQ29ubmVjdGlvbkVycm9yKSB7XG4gICAgICBtZXNzYWdlQmFyID0gKDxkaXYgY2xhc3NOYW1lPVwibWVzc2FnZV9iYXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZXNzYWdlX2Jhci1tZXNzYWdlXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtd2FybmluZ1wiPjwvaT4gIE5vIGNvbm5lY3Rpb24gdG8gc2VydmVyLjwvZGl2PlxuICAgICAgPC9kaXY+KTtcbiAgICB9XG5cbiAgICB0aGlzLmdldFZpc2libGVTdGF0aW9ucygpLmZvckVhY2goKHN0YXRpb24pID0+IHN0YXRpb25zLnB1c2goXG4gICAgICA8U3RhdGlvblxuICAgICAgICBzdGF0aW9uPXtzdGF0aW9ufVxuICAgICAgICBrZXk9e3N0YXRpb24uaWR9XG4gICAgICAgIHNlbGVjdGVkPXt0aGlzLnN0YXRlLnNlbGVjdGlvbi5oYXMoc3RhdGlvbi5pZCl9XG4gICAgICAgIG9uQ2xpY2tTdGF0aW9uPXt0aGlzLnNlbGVjdFRvZ2dsZX1cbiAgICAgIC8+XG4gICAgKSk7XG5cbiAgICBjb25zdCBjb3VudHMgPSB7fTtcbiAgICB0aGlzLnN0YXRlLnN0YXRpb25zLmZvckVhY2goKHN0YXRpb24pID0+IHtcbiAgICAgIGlmICghY291bnRzLmhhc093blByb3BlcnR5KHRoaXMuZGlzcGxheVN0YXRlKHN0YXRpb24uc3RhdGUpKSkge1xuICAgICAgICBjb3VudHNbdGhpcy5kaXNwbGF5U3RhdGUoc3RhdGlvbi5zdGF0ZSldID0gMDtcbiAgICAgIH1cbiAgICAgIGNvdW50c1t0aGlzLmRpc3BsYXlTdGF0ZShzdGF0aW9uLnN0YXRlKV0rKztcbiAgICB9KTtcblxuICAgIGNvbnN0IHNlbGVjdGVkQ291bnQgPSB0aGlzLnN0YXRlLnNlbGVjdGlvbi5zaXplO1xuICAgIGNvbnN0IGFsbFNlbGVjdGVkID0gKHNlbGVjdGVkQ291bnQgPT09IHRoaXMuc3RhdGUuc3RhdGlvbnMubGVuZ3RoKTtcbiAgICBjb25zdCBzZWxlY3RBbGxDbGFzc2VzID1cbiAgICAgIGBidG4gYnRuLWRlZmF1bHQgJHthbGxTZWxlY3RlZCA/ICcgZGlzYWJsZWQnIDogJyd9YDtcblxuICAgIGNvbnN0IGRlc2VsZWN0QWxsQ2xhc3NlcyA9XG4gICAgICBgYnRuIGJ0bi1kZWZhdWx0ICR7c2VsZWN0ZWRDb3VudCA9PT0gMCA/ICcgZGlzYWJsZWQnIDogJyd9YDtcblxuICAgIGNvbnN0IHN0YXRpb25Xb3JkID0gc2VsZWN0ZWRDb3VudCA9PT0gMSA/ICdzdGF0aW9uJyA6ICdzdGF0aW9ucyc7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInN0YXRpb25TdGF0ZUZpbHRlclwiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxCdXR0b25GaWx0ZXJcbiAgICAgICAgICBvcHRpb25zPXtbJ29uJywgJ29mZicsICdidXN5JywgJ2Vycm9yJ119XG4gICAgICAgICAgY291bnRzPXtjb3VudHN9XG4gICAgICAgICAgYWxsVGV4dD1cIkFsbCBzdGF0ZXNcIlxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZpc2libGVTdGF0ZX1cbiAgICAgICAgICBvbkNoYW5nZT17KG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZpc2libGVTdGF0ZTogb3B0aW9uIH0pO1xuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzdGF0aW9uVHlwZUZpbHRlclwiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxCdXR0b25GaWx0ZXJcbiAgICAgICAgICBvcHRpb25zPXt0aGlzLmdldFN0YXRpb25UeXBlcygpfVxuICAgICAgICAgIGFsbFRleHQ9XCJBbGwgdHlwZXNcIlxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZpc2libGVUeXBlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmlzaWJsZVR5cGU6IG9wdGlvbiB9KTtcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic2VsZWN0ZWRDb3VudFwiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmUtc2VwYXJhdG9yXCIgPjwvZGl2PlxuICAgICAgICA8Yj57dGhpcy5zdGF0ZS5zZWxlY3Rpb24uc2l6ZX0ge3N0YXRpb25Xb3JkfSBzZWxlY3RlZDwvYj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3RBY3Rpb25zXCI+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGNsYXNzTmFtZT17ZGVzZWxlY3RBbGxDbGFzc2VzfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy1hbGwtZGVzZWxlY3QnKX1cbiAgICAgICAgICA+RGVzZWxlY3Q8L2E+Jm5ic3A7XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGNsYXNzTmFtZT17c2VsZWN0QWxsQ2xhc3Nlc31cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZ2V0Q29tbWFuZCgnc3RhdGlvbnMtdmlzaWJsZS1zZWxlY3QnKX1cbiAgICAgICAgICA+U2VsZWN0IGFsbDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgY29uc3Qgbm9TZWxlY3Rpb25EaXNhYmxlID0gKHNlbGVjdGVkQ291bnQgPT09IDAgPyAnIGRpc2FibGVkJyA6ICcnKTtcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic3RhcnRTdG9wUGFuZWxcIiBjbGFzc05hbWU9e2BhY3Rpb24tcGFuZSR7bm9TZWxlY3Rpb25EaXNhYmxlfWB9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lLXNlcGFyYXRvclwiID48L2Rpdj5cbiAgICAgICAgPGFcbiAgICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLXN1Y2Nlc3Mke25vU2VsZWN0aW9uRGlzYWJsZX1gfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZ2V0Q29tbWFuZCgnc3RhdGlvbnMtc2VsZWN0ZWQtc3RhcnQnKX1cbiAgICAgICAgPjxpIGNsYXNzTmFtZT1cImZhIGZhLXBsYXlcIiAvPiZuYnNwOyZuYnNwO1N0YXJ0IFNlbGVjdGVkPC9hPlxuICAgICAgICAmbmJzcDtcbiAgICAgICAgPGFcbiAgICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLWRhbmdlciR7bm9TZWxlY3Rpb25EaXNhYmxlfWB9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy1zZWxlY3RlZC1zdG9wJyl9XG4gICAgICAgID48aSBjbGFzc05hbWU9XCJmYSBmYS1zdG9wXCIgLz4mbmJzcDsmbmJzcDtTdG9wIFNlbGVjdGVkPC9hPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGxldCBzZWxlY3RlZEFyZVNhbWVUeXBlID0gdHJ1ZTtcbiAgICBsZXQgbGFzdFR5cGUgPSBudWxsO1xuICAgIGZvciAoY29uc3Qgc2VsZWN0ZWRJRCBvZiB0aGlzLnN0YXRlLnNlbGVjdGlvbikge1xuICAgICAgaWYgKGxhc3RUeXBlID09PSBudWxsKSB7XG4gICAgICAgIGxhc3RUeXBlID0gdGhpcy5nZXRTdGF0aW9uU3RhdGUoc2VsZWN0ZWRJRCkudHlwZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmdldFN0YXRpb25TdGF0ZShzZWxlY3RlZElEKS50eXBlICE9PSBsYXN0VHlwZSkge1xuICAgICAgICBzZWxlY3RlZEFyZVNhbWVUeXBlID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBhbGxTZWxlY3RlZE9uID0gdHJ1ZTtcbiAgICBmb3IgKGNvbnN0IHNlbGVjdGVkSUQgb2YgdGhpcy5zdGF0ZS5zZWxlY3Rpb24pIHtcbiAgICAgIGlmICh0aGlzLmdldFN0YXRpb25TdGF0ZShzZWxlY3RlZElEKS5zdGF0ZSAhPT0gJ29uJykge1xuICAgICAgICBhbGxTZWxlY3RlZE9uID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNhbkNoYW5nZUFwcCA9IChhbGxTZWxlY3RlZE9uICYmIChzZWxlY3RlZENvdW50ID4gMCkgJiYgc2VsZWN0ZWRBcmVTYW1lVHlwZSk7XG5cbiAgICBsZXQgYXBwbGljYXRpb25zID0gW107XG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGlvbi5oYXMoc3RhdGlvbi5pZCkpIHtcbiAgICAgICAgYXBwbGljYXRpb25zID0gc3RhdGlvbi5wb3NzaWJsZV9hcHBzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwiYXBwU2VsZWN0XCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZS1zZXBhcmF0b3JcIiA+PC9kaXY+XG4gICAgICAgIDxBcHBTZWxlY3RcbiAgICAgICAgICBhcHBsaWNhdGlvbnM9e2NhbkNoYW5nZUFwcCA/IGFwcGxpY2F0aW9ucyA6IFtdfVxuICAgICAgICAgIGRpc2FibGVkPXshY2FuQ2hhbmdlQXBwfVxuICAgICAgICAgIGFsbG93QmxhbmtcbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5hdHRhY2hDb25maXJtYXRpb24oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjaGFuZ2UgdGhlIGFwcGxpY2F0aW9uPycsXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFwcFNlbGVjdGVkKX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInNob3dMb2dcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lLXNlcGFyYXRvclwiID48L2Rpdj5cbiAgICAgICAgPGFcbiAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIlxuICAgICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgICBvbkNsaWNrPXsoZXYpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvZ1ZpZXdlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICB0aGlzLmxvZ1ZpZXdlci5vcGVuTW9kYWwoKTtcbiAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2xvZy5qc29uJyxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG9nOiBkYXRhLmVudHJpZXMucmV2ZXJzZSgpIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgPlNob3cgbG9nPC9hPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17bWVzc2FnZUJhciAhPT0gJycgPyAnd2l0aC1tZXNzYWdlX2JhcicgOiAnJ30+XG4gICAgICAgIHttZXNzYWdlQmFyfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02IHBhbmUtc3RhdGlvbnNcIj5cbiAgICAgICAgICAgICAgPGRpdiBpZD1cImRhc2hib2FyZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJzdGF0aW9uTGlzdFwiIGNsYXNzTmFtZT1cInBhbmVsLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICB7c3RhdGlvbnN9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02IHBhbmUtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGFzaGJvYXJkQWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgIHthY3Rpb25zfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPExvZ1ZpZXdlciBsb2c9e3RoaXMuc3RhdGUubG9nfSByZWY9eyhjKSA9PiB7IHRoaXMubG9nVmlld2VyID0gYzsgfX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRGFzaGJvYXJkLnByb3BUeXBlcyA9IHtcbiAgdXJsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nVmlld2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBzdGF0aWMgZm9ybWF0VGltZShpc29UaW1lKSB7XG4gICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKGlzb1RpbWUpO1xuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSgpO1xuICAgIHllc3RlcmRheS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDEpO1xuICAgIGxldCBkYXkgPSAnJztcblxuICAgIGlmICh0b2RheS5nZXRNb250aCgpID09PSB0aW1lLmdldE1vbnRoKCkgJiZcbiAgICAgIHRvZGF5LmdldEZ1bGxZZWFyKCkgPT09IHRpbWUuZ2V0RnVsbFllYXIoKSAmJlxuICAgICAgdG9kYXkuZ2V0RGF0ZSgpID09PSB0aW1lLmdldERhdGUoKSkge1xuICAgICAgZGF5ID0gJ1RvZGF5JztcbiAgICB9IGVsc2UgaWYgKHllc3RlcmRheS5nZXRNb250aCgpID09PSB0aW1lLmdldE1vbnRoKCkgJiZcbiAgICAgIHllc3RlcmRheS5nZXRGdWxsWWVhcigpID09PSB0aW1lLmdldEZ1bGxZZWFyKCkgJiZcbiAgICAgIHllc3RlcmRheS5nZXREYXRlKCkgPT09IHRpbWUuZ2V0RGF0ZSgpKSB7XG4gICAgICBkYXkgPSAnWWVzdGVyZGF5JztcbiAgICB9IGVsc2Uge1xuICAgICAgZGF5ID0gYCR7dGltZS5nZXRGdWxsWWVhcigpfS0ke3RpbWUuZ2V0TW9udGgoKX0tJHt0aW1lLmdldERhdGUoKX1gO1xuICAgIH1cblxuICAgIHJldHVybiBgJHtkYXl9ICR7dGltZS5nZXRIb3VycygpfToke3RpbWUuZ2V0TWludXRlcygpfToke3RpbWUuZ2V0U2Vjb25kcygpfWA7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLm1vZGFsRElWID0gbnVsbDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICQod2luZG93KS5vbigncmVzaXplJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgICAkKHRoaXMubW9kYWxESVYpLm9uKCdzaG93LmJzLm1vZGFsJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgfVxuXG4gIG9wZW5Nb2RhbCgpIHtcbiAgICBpZiAodGhpcy5tb2RhbERJViAhPT0gbnVsbCkge1xuICAgICAgJCh0aGlzLm1vZGFsRElWKS5tb2RhbCgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZSgpIHtcbiAgICBjb25zdCAkbW9kYWwgPSAkKHRoaXMubW9kYWxESVYpO1xuICAgIGNvbnN0IG1vZGFsSGVhZGVySGVpZ2h0ID0gNTY7XG4gICAgY29uc3QgbW9kYWxNYXJnaW4gPSAzMDtcbiAgICBjb25zdCBtb2RhbEJvcmRlciA9IDE7XG5cbiAgICBjb25zdCBib2R5SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gKG1vZGFsSGVhZGVySGVpZ2h0ICsgbW9kYWxNYXJnaW4gKiAyICsgbW9kYWxCb3JkZXIgKiAyKTtcbiAgICAkbW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5jc3MoeyBtYXhIZWlnaHQ6IGJvZHlIZWlnaHQgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgcm93Q2xhc3NlcyA9IHtcbiAgICAgIGVycm9yOiAnZGFuZ2VyJyxcbiAgICAgIHdhcm5pbmc6ICd3YXJuaW5nJyxcbiAgICB9O1xuXG4gICAgY29uc3QgZW50cmllcyA9IFtdO1xuICAgIGZvciAoY29uc3QgbG9nRW50cnkgb2YgdGhpcy5wcm9wcy5sb2cpIHtcbiAgICAgIGNvbnN0IHJvd0NsYXNzID0gcm93Q2xhc3Nlc1tsb2dFbnRyeS50eXBlXSAhPT0gdW5kZWZpbmVkID8gcm93Q2xhc3Nlc1tsb2dFbnRyeS50eXBlXSA6ICcnO1xuXG4gICAgICBlbnRyaWVzLnB1c2goXG4gICAgICAgIDx0ciBrZXk9e2xvZ0VudHJ5LmlkfSBjbGFzc05hbWU9e3Jvd0NsYXNzfT5cbiAgICAgICAgICA8dGQ+e0xvZ1ZpZXdlci5mb3JtYXRUaW1lKGxvZ0VudHJ5LnRpbWUpfTwvdGQ+XG4gICAgICAgICAgPHRkPntsb2dFbnRyeS5zdGF0aW9uX25hbWV9PC90ZD5cbiAgICAgICAgICA8dGQ+e2xvZ0VudHJ5Lm1lc3NhZ2V9PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZSBsb2dWaWV3ZXItbW9kYWxcIiB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIHJlZj17KGMpID0+IHsgdGhpcy5tb2RhbERJViA9IGM7IH19PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZyBtb2RhbC1sZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPiZ0aW1lczs8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj57dGhpcy5wcm9wcy50aXRsZX08L2g0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLWZpeGVkIHRhYmxlLWNvbmRlbnNlZFwiPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlRpbWU8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+U3RhdGlvbjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5NZXNzYWdlPC90aD5cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAge2VudHJpZXN9XG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuTG9nVmlld2VyLnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGxvZzogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgdHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHRpbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBzdGF0aW9uX2lkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgc3RhdGlvbl9uYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgbWVzc2FnZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9KVxuICApLFxufTtcblxuTG9nVmlld2VyLmRlZmF1bHRQcm9wcyA9IHtcbiAgbG9nOiBbXSxcbiAgdGl0bGU6ICdFdmVudCBMb2cnLFxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi9kYXNoYm9hcmQuanN4Jztcblxud2luZG93LmRhc2hib2FyZCA9IG51bGw7XG5cbi8vIG9uUmVhZHlcbiQoKCkgPT4ge1xuICB3aW5kb3cuZGFzaGJvYXJkID0gUmVhY3RET00ucmVuZGVyKFxuICAgIDxEYXNoYm9hcmQgdXJsPVwiL2FwaS9zdGF0aW9ucy5qc29uXCIgLz4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rhc2hib2FyZENvbnRhaW5lcicpXG4gICk7XG5cbiAgLy8gSW5zdGFsbCBjbGljayBoYW5kbGVycyBpbiBleHRlcm5hbCBtZW51cyBhbmQgYnV0dG9uc1xuICAkKCdbZGF0YS1jb21tYW5kXScpLmVhY2goZnVuY3Rpb24gc2V0Q2xpY2tIYW5kbGVyKCkge1xuICAgICQodGhpcykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB3aW5kb3cuZGFzaGJvYXJkLmdldENvbW1hbmQoJCh0aGlzKS5hdHRyKCdkYXRhLWNvbW1hbmQnKSkoKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0aW9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKCkge1xuICAgIHRoaXMucHJvcHMub25DbGlja1N0YXRpb24odGhpcy5wcm9wcy5zdGF0aW9uLmlkKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzdGF0aW9uQ2xhc3NlcyA9IFtcbiAgICAgICdzdGF0aW9uJyxcbiAgICAgIGBzdGF0aW9uLXN0YXRlLSR7dGhpcy5wcm9wcy5zdGF0aW9uLnN0YXRlfWAsXG4gICAgICBgc3RhdGlvbi10eXBlLSR7dGhpcy5wcm9wcy5zdGF0aW9uLnR5cGV9YCxcbiAgICBdO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWQpIHtcbiAgICAgIHN0YXRpb25DbGFzc2VzLnB1c2goJ3N0YXRpb24tc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17dGhpcy5wcm9wcy5zdGF0aW9uLmlkfVxuICAgICAgICBjbGFzc05hbWU9e3N0YXRpb25DbGFzc2VzLmpvaW4oJyAnKX1cbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLXN0YXRlLWxpZ2h0XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1pY29uXCI+XG4gICAgICAgICAgPGltZyBhbHQ9e3RoaXMucHJvcHMuc3RhdGlvbi5hcHB9IHNyYz17dGhpcy5wcm9wcy5zdGF0aW9uLmljb259IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tbmFtZVwiPnt0aGlzLnByb3BzLnN0YXRpb24ubmFtZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLXR5cGVcIj57dGhpcy5wcm9wcy5zdGF0aW9uLnR5cGV9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1hcHBcIj57dGhpcy5wcm9wcy5zdGF0aW9uLmFwcH08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLXN0YXR1c1wiPnt0aGlzLnByb3BzLnN0YXRpb24uc3RhdHVzfTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TdGF0aW9uLnByb3BUeXBlcyA9IHtcbiAgc3RhdGlvbjogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN0YXRlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc3RhdHVzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFwcDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpY29uOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICB9KS5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2xpY2tTdGF0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbn07XG4iXX0=
