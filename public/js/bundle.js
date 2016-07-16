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
      log: []
    };
    _this.selectToggle = _this.selectToggle.bind(_this);
    _this.changeAppSelected = _this.changeAppSelected.bind(_this);
    _this.commands = {};
    _this.initCommands();
    _this.getCommand = _this.getCommand.bind(_this);
    _this.logViewer = null;
    _this.updateID = 0;
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
    key: 'displayState',
    value: function displayState(state) {

      if (state === 'starting' || state === 'stopping' || state === 'switching_app') {
        return 'busy';
      }

      return state;
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
        }).catch(function () {
          setTimeout(loop, retryPollTime);
          if (retryPollTime < maxRetryPollTime) {
            retryPollTime = retryPollTime * retryIncreaseFactor;
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
        null,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwU2VsZWN0LmpzeCIsInNyYy9idXR0b25GaWx0ZXIuanN4Iiwic3JjL2Rhc2hib2FyZC5qc3giLCJzcmMvbG9nVmlld2VyLmpzeCIsInNyYy9tYWluLmpzeCIsInNyYy9zdGF0aW9uLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTXFCLFM7OztBQUVuQixxQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsNkZBQ1gsS0FEVzs7QUFFakIsVUFBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsVUFBSyxnQkFBTCxHQUF3QixNQUFLLGdCQUFMLENBQXNCLElBQXRCLE9BQXhCO0FBSGlCO0FBSWxCOzs7O3VDQUVrQjtBQUNqQixVQUFJLEtBQUssS0FBTCxDQUFXLFFBQWYsRUFBeUI7QUFDdkIsYUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixLQUFLLFdBQUwsQ0FBaUIsS0FBckM7QUFDRDtBQUNGOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFNLGVBQWUsRUFBckI7O0FBRUEsVUFBSSxLQUFLLEtBQUwsQ0FBVyxVQUFmLEVBQTJCO0FBQ3pCLHFCQUFhLElBQWIsQ0FDRTtBQUFBO1VBQUEsRUFBUSxLQUFJLE1BQVosRUFBbUIsT0FBTSxFQUF6QjtVQUFBO0FBQUEsU0FERjtBQUdEOztBQVBNO0FBQUE7QUFBQTs7QUFBQTtBQVNQLDZCQUEwQixLQUFLLEtBQUwsQ0FBVyxZQUFyQyw4SEFBbUQ7QUFBQSxjQUF4QyxXQUF3Qzs7QUFDakQsdUJBQWEsSUFBYixDQUNFO0FBQUE7WUFBQSxFQUFRLEtBQUssV0FBYixFQUEwQixPQUFPLFdBQWpDO1lBQStDO0FBQS9DLFdBREY7QUFHRDtBQWJNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFB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LENBQXBCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbi8qKlxuICogQXBwU2VsZWN0IGNvbXBvbmVudFxuICogQWxsb3dzIHRoZSB1c2VyIHRvIHNlbGVjdCBhbiBhcHBsaWNhdGlvbiBmcm9tIGEgbGlzdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBTZWxlY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuYXBwU2VsZWN0b3IgPSBudWxsO1xuICAgIHRoaXMuY2xpY2tlZENoYW5nZUFwcCA9IHRoaXMuY2xpY2tlZENoYW5nZUFwcC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY2xpY2tlZENoYW5nZUFwcCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLmFwcFNlbGVjdG9yLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgYXBwbGljYXRpb25zID0gW107XG5cbiAgICBpZiAodGhpcy5wcm9wcy5hbGxvd0JsYW5rKSB7XG4gICAgICBhcHBsaWNhdGlvbnMucHVzaChcbiAgICAgICAgPG9wdGlvbiBrZXk9XCJudWxsXCIgdmFsdWU9XCJcIj4mbmJzcDs8L29wdGlvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBhcHBsaWNhdGlvbiBvZiB0aGlzLnByb3BzLmFwcGxpY2F0aW9ucykge1xuICAgICAgYXBwbGljYXRpb25zLnB1c2goXG4gICAgICAgIDxvcHRpb24ga2V5PXthcHBsaWNhdGlvbn0gdmFsdWU9e2FwcGxpY2F0aW9ufT57YXBwbGljYXRpb259PC9vcHRpb24+XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGRpc2FibGVkQ2xhc3MgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA/ICcgZGlzYWJsZWQnIDogJycpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYXBwU2VsZWN0JHtkaXNhYmxlZENsYXNzfWB9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0taW5saW5lXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIGZvcm0tZ3JvdXAtbWlud2lkdGhcIj5cbiAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sJHtkaXNhYmxlZENsYXNzfWB9XG4gICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgPyB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSA6ICcnfVxuICAgICAgICAgICAgICByZWY9eyhzZWwpID0+IHsgdGhpcy5hcHBTZWxlY3RvciA9IHNlbDsgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2FwcGxpY2F0aW9uc31cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICZuYnNwO1xuICAgICAgICAgIDxhXG4gICAgICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLXdhcm5pbmcke2Rpc2FibGVkQ2xhc3N9YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY2xpY2tlZENoYW5nZUFwcH1cbiAgICAgICAgICA+Q2hhbmdlIGFwcGxpY2F0aW9uPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQXBwU2VsZWN0LnByb3BUeXBlcyA9IHtcbiAgYXBwbGljYXRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICksXG4gIGRlZmF1bHRWYWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgYWxsb3dCbGFuazogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIGRpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgb25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxufTtcblxuQXBwU2VsZWN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgYXBwbGljYXRpb25zOiBbXSxcbiAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgYWxsb3dCbGFuazogZmFsc2UsXG4gIGRpc2FibGVkOiBmYWxzZSxcbiAgb25DaGFuZ2U6ICgpID0+IHt9LFxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEJ1dHRvbkZpbHRlciA9IChwcm9wcykgPT4ge1xuICBjb25zdCBvcHRpb25zID0gW107XG5cbiAgZm9yIChjb25zdCBvcHRpb24gb2YgcHJvcHMub3B0aW9ucykge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbJ2J0bicsICdidG4tZGVmYXVsdCcsIGBidXR0b24tZmlsdGVyLW9wdGlvbi0ke29wdGlvbn1gXTtcbiAgICBpZiAocHJvcHMudmFsdWUgPT09IG9wdGlvbikge1xuICAgICAgY2xhc3Nlcy5wdXNoKCdhY3RpdmUnKTtcbiAgICB9XG4gICAgbGV0IGNvdW50ZXIgPSAnJztcbiAgICBsZXQgc3BhY2luZyA9ICcnO1xuICAgIGlmIChwcm9wcy5jb3VudHMgIT09IG51bGwpIHtcbiAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICBpZiAocHJvcHMuY291bnRzLmhhc093blByb3BlcnR5KG9wdGlvbikgJiYgcHJvcHMuY291bnRzW29wdGlvbl0gIT09IDApIHtcbiAgICAgICAgY291bnQgPSBwcm9wcy5jb3VudHNbb3B0aW9uXTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGJhZGdlQ2xhc3NlcyA9IGBiYWRnZSR7Y291bnQgPT09IDAgPyAnIHplcm8nIDogJyBub24temVybyd9YDtcbiAgICAgIGNvdW50ZXIgPSAoPHNwYW4gY2xhc3NOYW1lPXtiYWRnZUNsYXNzZXN9Pntjb3VudH08L3NwYW4+KTtcbiAgICAgIHNwYWNpbmcgPSAnICc7XG4gICAgfVxuICAgIG9wdGlvbnMucHVzaChcbiAgICAgIDxhXG4gICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oJyAnKX1cbiAgICAgICAga2V5PXtvcHRpb259XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHByb3BzLm9uQ2hhbmdlKG9wdGlvbil9XG4gICAgICA+e29wdGlvbn17c3BhY2luZ317Y291bnRlcn08L2E+XG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGRlZmF1bHRDbGFzc2VzID0gWydidG4nLCAnYnRuLWRlZmF1bHQnXTtcbiAgaWYgKHByb3BzLnZhbHVlID09PSAnJykge1xuICAgIGRlZmF1bHRDbGFzc2VzLnB1c2goJ2FjdGl2ZScpO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi10b29sYmFyIGJ1dHRvbi1maWx0ZXJcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgIDxhXG4gICAgICAgICAgaHJlZj1cIiNcIlxuICAgICAgICAgIGNsYXNzTmFtZT17ZGVmYXVsdENsYXNzZXMuam9pbignICcpfVxuICAgICAgICAgIGtleT1cIm51bGxcIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHByb3BzLm9uQ2hhbmdlKCcnKX1cbiAgICAgICAgPntwcm9wcy5hbGxUZXh0fTwvYT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAge29wdGlvbnN9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbkJ1dHRvbkZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIG9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5zdHJpbmcpLFxuICBjb3VudHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3RPZihSZWFjdC5Qcm9wVHlwZXMubnVtYmVyKSxcbiAgYWxsVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbn07XG5cbkJ1dHRvbkZpbHRlci5kZWZhdWx0UHJvcHMgPSB7XG4gIG9wdGlvbnM6IFtdLFxuICBjb3VudHM6IG51bGwsXG4gIGFsbFRleHQ6ICdBbGwnLFxuICB2YWx1ZTogJycsXG4gIG9uQ2hhbmdlOiAoKSA9PiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkZpbHRlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU3RhdGlvbiBmcm9tICcuL3N0YXRpb24uanN4JztcbmltcG9ydCBBcHBTZWxlY3QgZnJvbSAnLi9hcHBTZWxlY3QuanN4JztcbmltcG9ydCBCdXR0b25GaWx0ZXIgZnJvbSAnLi9idXR0b25GaWx0ZXIuanN4JztcbmltcG9ydCBMb2dWaWV3ZXIgZnJvbSAnLi9sb2dWaWV3ZXIuanN4JztcblxuLy8gY29uc3QgdG1wX2xvZ19lbnRyaWVzID0gcmVxdWlyZSgnLi90bXBfbG9nLmpzb24nKS5lbnRyaWVzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdGF0aW9uczogW10sXG4gICAgICBzZWxlY3Rpb246IG5ldyBTZXQoKSxcbiAgICAgIHZpc2libGVUeXBlOiAnJyxcbiAgICAgIHZpc2libGVTdGF0ZTogJycsXG4gICAgICBsb2c6IFtdLFxuICAgIH07XG4gICAgdGhpcy5zZWxlY3RUb2dnbGUgPSB0aGlzLnNlbGVjdFRvZ2dsZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2hhbmdlQXBwU2VsZWN0ZWQgPSB0aGlzLmNoYW5nZUFwcFNlbGVjdGVkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jb21tYW5kcyA9IHt9O1xuICAgIHRoaXMuaW5pdENvbW1hbmRzKCk7XG4gICAgdGhpcy5nZXRDb21tYW5kID0gdGhpcy5nZXRDb21tYW5kLmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb2dWaWV3ZXIgPSBudWxsO1xuICAgIHRoaXMudXBkYXRlSUQgPSAwO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wb2xsTG9vcCgpO1xuICB9XG5cbiAgZ2V0U3RhdGlvblN0YXRlKHN0YXRpb25JRCkge1xuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiB0aGlzLnN0YXRlLnN0YXRpb25zKSB7XG4gICAgICBpZiAoc3RhdGlvbi5pZCA9PT0gc3RhdGlvbklEKSB7XG4gICAgICAgIHJldHVybiBzdGF0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldFN0YXRpb25UeXBlcygpIHtcbiAgICBjb25zdCB0eXBlcyA9IG5ldyBTZXQoKTtcbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgdHlwZXMuYWRkKHN0YXRpb24udHlwZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEFycmF5LmZyb20odHlwZXMpO1xuICB9XG5cbiAgZ2V0Q29tbWFuZChjb21tYW5kTmFtZSkge1xuICAgIGlmICh0aGlzLmNvbW1hbmRzW2NvbW1hbmROYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb21tYW5kc1tjb21tYW5kTmFtZV0uZG9DYWxsYmFjaztcbiAgICB9XG4gICAgdGhyb3cgRXJyb3IoYENhbGwgdG8gaW52YWxpZCBjb21tYW5kICR7Y29tbWFuZE5hbWV9YCk7XG4gIH1cblxuICBkaXNwbGF5U3RhdGUoc3RhdGUpIHtcblxuICAgIGlmIChzdGF0ZSA9PT0gJ3N0YXJ0aW5nJyB8fCBzdGF0ZSA9PT0gJ3N0b3BwaW5nJyB8fCBzdGF0ZSA9PT0gJ3N3aXRjaGluZ19hcHAnKSB7XG4gICAgICByZXR1cm4gJ2J1c3knO1xuICAgIH1cblxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGdldFZpc2libGVTdGF0aW9ucygpIHtcbiAgICBjb25zdCBhbnN3ZXIgPSBbXTtcblxuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiB0aGlzLnN0YXRlLnN0YXRpb25zKSB7XG4gICAgICBpZiAoKHRoaXMuc3RhdGUudmlzaWJsZVR5cGUgPT09ICcnIHx8IHN0YXRpb24udHlwZSA9PT0gdGhpcy5zdGF0ZS52aXNpYmxlVHlwZSkgJiZcbiAgICAgICAgICAodGhpcy5zdGF0ZS52aXNpYmxlU3RhdGUgPT09ICcnIHx8IHRoaXMuZGlzcGxheVN0YXRlKHN0YXRpb24uc3RhdGUpID09PSB0aGlzLnN0YXRlLnZpc2libGVTdGF0ZSkpIHtcbiAgICAgICAgYW5zd2VyLnB1c2goc3RhdGlvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFuc3dlcjtcbiAgfVxuXG4gIGF0dGFjaENvbmZpcm1hdGlvbih0ZXh0LCBjYWxsYmFjaykge1xuICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgYm9vdGJveC5kaWFsb2coe1xuICAgICAgICBtZXNzYWdlOiB0ZXh0LFxuICAgICAgICBidXR0b25zOiB7XG4gICAgICAgICAgd2FybmluZzoge1xuICAgICAgICAgICAgbGFiZWw6ICdDb25maXJtJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bi13YXJuaW5nJyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjay5iaW5kKHRoaXMsIC4uLmFyZ3MpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2FuY2VsOiB7XG4gICAgICAgICAgICBsYWJlbDogJ0NhbmNlbCcsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdidG4tZGVmYXVsdCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBpbml0Q29tbWFuZHMoKSB7XG4gICAgdGhpcy5jb21tYW5kcyA9IHtcbiAgICAgICdzdGF0aW9ucy1hbGwtc3RhcnQnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnN0YXJ0QWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RhcnQgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtYWxsLXN0b3AnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnN0b3BBbGwuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzdG9wIGFsbCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IHRydWUsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLWFsbC1zZWxlY3QnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnNlbGVjdEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3NlbGVjdCBhbGwgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtYWxsLWRlc2VsZWN0Jzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5kZXNlbGVjdEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ2Rlc2VsZWN0IGFsbCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IGZhbHNlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1zZWxlY3RlZC1zdGFydCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RhcnRTZWxlY3RlZC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3N0YXJ0IHRoZSBzZWxlY3RlZCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IHRydWUsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLXNlbGVjdGVkLXN0b3AnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnN0b3BTZWxlY3RlZC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3N0b3AgdGhlIHNlbGVjdGVkIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtdmlzaWJsZS1zZWxlY3QnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnNlbGVjdEFsbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzZWxlY3QgdmlzaWJsZSBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IGZhbHNlLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5rZXlzKHRoaXMuY29tbWFuZHMpKSB7XG4gICAgICBjb25zdCBjb21tYW5kID0gdGhpcy5jb21tYW5kc1tuYW1lXTtcbiAgICAgIGlmIChjb21tYW5kLmNvbmZpcm0pIHtcbiAgICAgICAgdGhpcy5jb21tYW5kc1tuYW1lXS5kb0NhbGxiYWNrID0gdGhpcy5hdHRhY2hDb25maXJtYXRpb24oXG4gICAgICAgICAgYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byAke2NvbW1hbmQudGl0bGV9P2AsXG4gICAgICAgICAgY29tbWFuZC5jYWxsYmFja1xuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21tYW5kc1tuYW1lXS5kb0NhbGxiYWNrID0gY29tbWFuZC5jYWxsYmFjaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhbGxTdGF0aW9uSURzKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRpb25JRHModGhpcy5zdGF0ZS5zdGF0aW9ucyk7XG4gIH1cblxuICBzdGF0aW9uSURzKHN0YXRpb25zKSB7XG4gICAgY29uc3QgaWRzID0gbmV3IFNldCgpO1xuXG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHN0YXRpb25zKSB7XG4gICAgICBpZHMuYWRkKHN0YXRpb24uaWQpO1xuICAgIH1cblxuICAgIHJldHVybiBpZHM7XG4gIH1cblxuICBzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogdGhpcy5hbGxTdGF0aW9uSURzKCkgfSk7XG4gIH1cblxuICBzZWxlY3RBbGxWaXNpYmxlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3Rpb246IHRoaXMuc3RhdGlvbklEcyh0aGlzLmdldFZpc2libGVTdGF0aW9ucygpKSB9KTtcbiAgfVxuXG4gIGRlc2VsZWN0QWxsKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3Rpb246IG5ldyBTZXQoKSB9KTtcbiAgfVxuXG4gIHNlbGVjdFRvZ2dsZShpZCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGlvbi5oYXMoaWQpKSB7XG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbi5kZWxldGUoaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbi5hZGQoaWQpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW9uOiB0aGlzLnN0YXRlLnNlbGVjdGlvbiB9KTtcbiAgfVxuXG4gIHN0b3BTdGF0aW9ucyhzdGF0aW9uSURzKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvc3RhdGlvbnMuanNvbicsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGFjdGlvbjogJ3N0b3AnLFxuICAgICAgICBzdGF0aW9uSURzOiBBcnJheS5mcm9tKHN0YXRpb25JRHMpLFxuICAgICAgfSksXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4ge30sXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gIH1cblxuICBzdG9wU2VsZWN0ZWQoKSB7XG4gICAgdGhpcy5zdG9wU3RhdGlvbnModGhpcy5zdGF0ZS5zZWxlY3Rpb24pO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHN0b3BBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcFN0YXRpb25zKHRoaXMuYWxsU3RhdGlvbklEcygpKTtcbiAgfVxuXG4gIHN0YXJ0U3RhdGlvbnMoc3RhdGlvbklEcykge1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvYXBpL3N0YXRpb25zLmpzb24nLFxuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBhY3Rpb246ICdzdGFydCcsXG4gICAgICAgIHN0YXRpb25JRHM6IEFycmF5LmZyb20oc3RhdGlvbklEcyksXG4gICAgICB9KSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7fSxcbiAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXJ0U2VsZWN0ZWQoKSB7XG4gICAgdGhpcy5zdGFydFN0YXRpb25zKHRoaXMuc3RhdGUuc2VsZWN0aW9uKTtcbiAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gIH1cblxuICBzdGFydEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFydFN0YXRpb25zKHRoaXMuYWxsU3RhdGlvbklEcygpKTtcbiAgfVxuXG4gIGNoYW5nZUFwcFNlbGVjdGVkKGFwcCkge1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvYXBpL3N0YXRpb25zLmpzb24nLFxuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBhY3Rpb246ICdjaGFuZ2VfYXBwJyxcbiAgICAgICAgc3RhdGlvbklEczogQXJyYXkuZnJvbSh0aGlzLnN0YXRlLnNlbGVjdGlvbiksXG4gICAgICAgIGFwcCxcbiAgICAgIH0pLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHt9LFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgdGhlIHNlcnZlciBwb2xsXG4gICAqXG4gICAqIEltcGxlbWVudGF0aW9uOiBTaW5jZSB0aGUgc2VydmVyIHVzZXMgbG9uZyBwb2xsaW5nIHdlIHVzZSBhIHZlcnkgc2hvcnRcbiAgICogcG9sbCB0aW1lICg1MDBtcykuIEluIGNhc2Ugb2YgZXJyb3JzIGNvbnRhY3RpbmcgdGhlIHNlcnZlciB0aGUgcG9sbCB0aW1lXG4gICAqIGluY3JlYXNlcyB3aXRoIGVhY2ggZXJyb3IgdW50aWwgYSBtYXggcG9sbCB0aW1lIGlzIHJlYWNoZWQuXG4gICAqL1xuICBwb2xsTG9vcCgpIHtcbiAgICBjb25zdCBtaW5Qb2xsVGltZSA9IDUwMDtcbiAgICBsZXQgcmV0cnlQb2xsVGltZSA9IG1pblBvbGxUaW1lO1xuICAgIGNvbnN0IHJldHJ5SW5jcmVhc2VGYWN0b3IgPSAyO1xuICAgIGNvbnN0IG1heFJldHJ5UG9sbFRpbWUgPSA0MDAwO1xuXG4gICAgY29uc3QgbG9vcCA9ICgpID0+IHtcbiAgICAgIHRoaXMucG9sbFNlcnZlcigpLnRoZW4oKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KGxvb3AsIG1pblBvbGxUaW1lKTtcbiAgICAgICAgcmV0cnlQb2xsVGltZSA9IG1pblBvbGxUaW1lO1xuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KGxvb3AsIHJldHJ5UG9sbFRpbWUpO1xuICAgICAgICBpZiAocmV0cnlQb2xsVGltZSA8IG1heFJldHJ5UG9sbFRpbWUpIHtcbiAgICAgICAgICByZXRyeVBvbGxUaW1lID0gcmV0cnlQb2xsVGltZSAqIHJldHJ5SW5jcmVhc2VGYWN0b3I7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgbG9vcCgpO1xuICB9XG5cbiAgcG9sbFNlcnZlcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9wb2xsLmpzb24nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgbGFzdFNlZW46IHRoaXMudXBkYXRlSUQsXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgdGltZW91dDogMzAwMDAsXG4gICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGEuc3RhdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJRCA9IGRhdGEudXBkYXRlSUQ7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc3RhdGlvbnM6IGRhdGEuc3RhdGlvbnMgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByb3BzLnVybCwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzdGF0aW9ucyA9IFtdO1xuICAgIGNvbnN0IGFjdGlvbnMgPSBbXTtcblxuICAgIHRoaXMuZ2V0VmlzaWJsZVN0YXRpb25zKCkuZm9yRWFjaCgoc3RhdGlvbikgPT4gc3RhdGlvbnMucHVzaChcbiAgICAgIDxTdGF0aW9uXG4gICAgICAgIHN0YXRpb249e3N0YXRpb259XG4gICAgICAgIGtleT17c3RhdGlvbi5pZH1cbiAgICAgICAgc2VsZWN0ZWQ9e3RoaXMuc3RhdGUuc2VsZWN0aW9uLmhhcyhzdGF0aW9uLmlkKX1cbiAgICAgICAgb25DbGlja1N0YXRpb249e3RoaXMuc2VsZWN0VG9nZ2xlfVxuICAgICAgLz5cbiAgICApKTtcblxuICAgIGNvbnN0IGNvdW50cyA9IHt9O1xuICAgIHRoaXMuc3RhdGUuc3RhdGlvbnMuZm9yRWFjaCgoc3RhdGlvbikgPT4ge1xuICAgICAgaWYgKCFjb3VudHMuaGFzT3duUHJvcGVydHkodGhpcy5kaXNwbGF5U3RhdGUoc3RhdGlvbi5zdGF0ZSkpKSB7XG4gICAgICAgIGNvdW50c1t0aGlzLmRpc3BsYXlTdGF0ZShzdGF0aW9uLnN0YXRlKV0gPSAwO1xuICAgICAgfVxuICAgICAgY291bnRzW3RoaXMuZGlzcGxheVN0YXRlKHN0YXRpb24uc3RhdGUpXSsrO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRDb3VudCA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uLnNpemU7XG4gICAgY29uc3QgYWxsU2VsZWN0ZWQgPSAoc2VsZWN0ZWRDb3VudCA9PT0gdGhpcy5zdGF0ZS5zdGF0aW9ucy5sZW5ndGgpO1xuICAgIGNvbnN0IHNlbGVjdEFsbENsYXNzZXMgPVxuICAgICAgYGJ0biBidG4tZGVmYXVsdCAke2FsbFNlbGVjdGVkID8gJyBkaXNhYmxlZCcgOiAnJ31gO1xuXG4gICAgY29uc3QgZGVzZWxlY3RBbGxDbGFzc2VzID1cbiAgICAgIGBidG4gYnRuLWRlZmF1bHQgJHtzZWxlY3RlZENvdW50ID09PSAwID8gJyBkaXNhYmxlZCcgOiAnJ31gO1xuXG4gICAgY29uc3Qgc3RhdGlvbldvcmQgPSBzZWxlY3RlZENvdW50ID09PSAxID8gJ3N0YXRpb24nIDogJ3N0YXRpb25zJztcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic3RhdGlvblN0YXRlRmlsdGVyXCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPEJ1dHRvbkZpbHRlclxuICAgICAgICAgIG9wdGlvbnM9e1snb24nLCAnb2ZmJywgJ2J1c3knLCAnZXJyb3InXX1cbiAgICAgICAgICBjb3VudHM9e2NvdW50c31cbiAgICAgICAgICBhbGxUZXh0PVwiQWxsIHN0YXRlc1wiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmlzaWJsZVN0YXRlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmlzaWJsZVN0YXRlOiBvcHRpb24gfSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInN0YXRpb25UeXBlRmlsdGVyXCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPEJ1dHRvbkZpbHRlclxuICAgICAgICAgIG9wdGlvbnM9e3RoaXMuZ2V0U3RhdGlvblR5cGVzKCl9XG4gICAgICAgICAgYWxsVGV4dD1cIkFsbCB0eXBlc1wiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmlzaWJsZVR5cGV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhvcHRpb24pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2aXNpYmxlVHlwZTogb3B0aW9uIH0pO1xuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzZWxlY3RlZENvdW50XCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZS1zZXBhcmF0b3JcIiA+PC9kaXY+XG4gICAgICAgIDxiPnt0aGlzLnN0YXRlLnNlbGVjdGlvbi5zaXplfSB7c3RhdGlvbldvcmR9IHNlbGVjdGVkPC9iPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdEFjdGlvbnNcIj5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtkZXNlbGVjdEFsbENsYXNzZXN9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLWFsbC1kZXNlbGVjdCcpfVxuICAgICAgICAgID5EZXNlbGVjdDwvYT4mbmJzcDtcbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzZWxlY3RBbGxDbGFzc2VzfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy12aXNpYmxlLXNlbGVjdCcpfVxuICAgICAgICAgID5TZWxlY3QgYWxsPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBjb25zdCBub1NlbGVjdGlvbkRpc2FibGUgPSAoc2VsZWN0ZWRDb3VudCA9PT0gMCA/ICcgZGlzYWJsZWQnIDogJycpO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzdGFydFN0b3BQYW5lbFwiIGNsYXNzTmFtZT17YGFjdGlvbi1wYW5lJHtub1NlbGVjdGlvbkRpc2FibGV9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmUtc2VwYXJhdG9yXCIgPjwvZGl2PlxuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tc3VjY2VzcyR7bm9TZWxlY3Rpb25EaXNhYmxlfWB9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy1zZWxlY3RlZC1zdGFydCcpfVxuICAgICAgICA+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGxheVwiIC8+Jm5ic3A7Jm5ic3A7U3RhcnQgU2VsZWN0ZWQ8L2E+XG4gICAgICAgICZuYnNwO1xuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tZGFuZ2VyJHtub1NlbGVjdGlvbkRpc2FibGV9YH1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLXNlbGVjdGVkLXN0b3AnKX1cbiAgICAgICAgPjxpIGNsYXNzTmFtZT1cImZhIGZhLXN0b3BcIiAvPiZuYnNwOyZuYnNwO1N0b3AgU2VsZWN0ZWQ8L2E+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgbGV0IHNlbGVjdGVkQXJlU2FtZVR5cGUgPSB0cnVlO1xuICAgIGxldCBsYXN0VHlwZSA9IG51bGw7XG4gICAgZm9yIChjb25zdCBzZWxlY3RlZElEIG9mIHRoaXMuc3RhdGUuc2VsZWN0aW9uKSB7XG4gICAgICBpZiAobGFzdFR5cGUgPT09IG51bGwpIHtcbiAgICAgICAgbGFzdFR5cGUgPSB0aGlzLmdldFN0YXRpb25TdGF0ZShzZWxlY3RlZElEKS50eXBlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZ2V0U3RhdGlvblN0YXRlKHNlbGVjdGVkSUQpLnR5cGUgIT09IGxhc3RUeXBlKSB7XG4gICAgICAgIHNlbGVjdGVkQXJlU2FtZVR5cGUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGFsbFNlbGVjdGVkT24gPSB0cnVlO1xuICAgIGZvciAoY29uc3Qgc2VsZWN0ZWRJRCBvZiB0aGlzLnN0YXRlLnNlbGVjdGlvbikge1xuICAgICAgaWYgKHRoaXMuZ2V0U3RhdGlvblN0YXRlKHNlbGVjdGVkSUQpLnN0YXRlICE9PSAnb24nKSB7XG4gICAgICAgIGFsbFNlbGVjdGVkT24gPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2FuQ2hhbmdlQXBwID0gKGFsbFNlbGVjdGVkT24gJiYgKHNlbGVjdGVkQ291bnQgPiAwKSAmJiBzZWxlY3RlZEFyZVNhbWVUeXBlKTtcblxuICAgIGxldCBhcHBsaWNhdGlvbnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0aW9uLmhhcyhzdGF0aW9uLmlkKSkge1xuICAgICAgICBhcHBsaWNhdGlvbnMgPSBzdGF0aW9uLnBvc3NpYmxlX2FwcHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJhcHBTZWxlY3RcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lLXNlcGFyYXRvclwiID48L2Rpdj5cbiAgICAgICAgPEFwcFNlbGVjdFxuICAgICAgICAgIGFwcGxpY2F0aW9ucz17Y2FuQ2hhbmdlQXBwID8gYXBwbGljYXRpb25zIDogW119XG4gICAgICAgICAgZGlzYWJsZWQ9eyFjYW5DaGFuZ2VBcHB9XG4gICAgICAgICAgYWxsb3dCbGFua1xuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmF0dGFjaENvbmZpcm1hdGlvbignQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGUgYXBwbGljYXRpb24/JyxcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQXBwU2VsZWN0ZWQpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic2hvd0xvZ1wiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmUtc2VwYXJhdG9yXCIgPjwvZGl2PlxuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiXG4gICAgICAgICAgaHJlZj1cIiNcIlxuICAgICAgICAgIG9uQ2xpY2s9eyhldikgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMubG9nVmlld2VyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRoaXMubG9nVmlld2VyLm9wZW5Nb2RhbCgpO1xuICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvbG9nLmpzb24nLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsb2c6IGRhdGEuZW50cmllcy5yZXZlcnNlKCkgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9fVxuICAgICAgICA+U2hvdyBsb2c8L2E+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTYgcGFuZS1zdGF0aW9uc1wiPlxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGFzaGJvYXJkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInN0YXRpb25MaXN0XCIgY2xhc3NOYW1lPVwicGFuZWwtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgIHtzdGF0aW9uc31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTYgcGFuZS1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJkYXNoYm9hcmRBY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAge2FjdGlvbnN9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8TG9nVmlld2VyIGxvZz17dGhpcy5zdGF0ZS5sb2d9IHJlZj17KGMpID0+IHsgdGhpcy5sb2dWaWV3ZXIgPSBjOyB9fSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5EYXNoYm9hcmQucHJvcFR5cGVzID0ge1xuICB1cmw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dWaWV3ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIHN0YXRpYyBmb3JtYXRUaW1lKGlzb1RpbWUpIHtcbiAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoaXNvVGltZSk7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IHllc3RlcmRheSA9IG5ldyBEYXRlKCk7XG4gICAgeWVzdGVyZGF5LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMSk7XG4gICAgbGV0IGRheSA9ICcnO1xuXG4gICAgaWYgKHRvZGF5LmdldE1vbnRoKCkgPT09IHRpbWUuZ2V0TW9udGgoKSAmJlxuICAgICAgdG9kYXkuZ2V0RnVsbFllYXIoKSA9PT0gdGltZS5nZXRGdWxsWWVhcigpICYmXG4gICAgICB0b2RheS5nZXREYXRlKCkgPT09IHRpbWUuZ2V0RGF0ZSgpKSB7XG4gICAgICBkYXkgPSAnVG9kYXknO1xuICAgIH0gZWxzZSBpZiAoeWVzdGVyZGF5LmdldE1vbnRoKCkgPT09IHRpbWUuZ2V0TW9udGgoKSAmJlxuICAgICAgeWVzdGVyZGF5LmdldEZ1bGxZZWFyKCkgPT09IHRpbWUuZ2V0RnVsbFllYXIoKSAmJlxuICAgICAgeWVzdGVyZGF5LmdldERhdGUoKSA9PT0gdGltZS5nZXREYXRlKCkpIHtcbiAgICAgIGRheSA9ICdZZXN0ZXJkYXknO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXkgPSBgJHt0aW1lLmdldEZ1bGxZZWFyKCl9LSR7dGltZS5nZXRNb250aCgpfS0ke3RpbWUuZ2V0RGF0ZSgpfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke2RheX0gJHt0aW1lLmdldEhvdXJzKCl9OiR7dGltZS5nZXRNaW51dGVzKCl9OiR7dGltZS5nZXRTZWNvbmRzKCl9YDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMubW9kYWxESVYgPSBudWxsO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCAoKSA9PiB7IHRoaXMuaGFuZGxlUmVzaXplKCk7IH0pO1xuICAgICQodGhpcy5tb2RhbERJVikub24oJ3Nob3cuYnMubW9kYWwnLCAoKSA9PiB7IHRoaXMuaGFuZGxlUmVzaXplKCk7IH0pO1xuICB9XG5cbiAgb3Blbk1vZGFsKCkge1xuICAgIGlmICh0aGlzLm1vZGFsRElWICE9PSBudWxsKSB7XG4gICAgICAkKHRoaXMubW9kYWxESVYpLm1vZGFsKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUmVzaXplKCkge1xuICAgIGNvbnN0ICRtb2RhbCA9ICQodGhpcy5tb2RhbERJVik7XG4gICAgY29uc3QgbW9kYWxIZWFkZXJIZWlnaHQgPSA1NjtcbiAgICBjb25zdCBtb2RhbE1hcmdpbiA9IDMwO1xuICAgIGNvbnN0IG1vZGFsQm9yZGVyID0gMTtcblxuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSAobW9kYWxIZWFkZXJIZWlnaHQgKyBtb2RhbE1hcmdpbiAqIDIgKyBtb2RhbEJvcmRlciAqIDIpO1xuICAgICRtb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmNzcyh7IG1heEhlaWdodDogYm9keUhlaWdodCB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCByb3dDbGFzc2VzID0ge1xuICAgICAgZXJyb3I6ICdkYW5nZXInLFxuICAgICAgd2FybmluZzogJ3dhcm5pbmcnLFxuICAgIH07XG5cbiAgICBjb25zdCBlbnRyaWVzID0gW107XG4gICAgZm9yIChjb25zdCBsb2dFbnRyeSBvZiB0aGlzLnByb3BzLmxvZykge1xuICAgICAgY29uc3Qgcm93Q2xhc3MgPSByb3dDbGFzc2VzW2xvZ0VudHJ5LnR5cGVdICE9PSB1bmRlZmluZWQgPyByb3dDbGFzc2VzW2xvZ0VudHJ5LnR5cGVdIDogJyc7XG5cbiAgICAgIGVudHJpZXMucHVzaChcbiAgICAgICAgPHRyIGtleT17bG9nRW50cnkuaWR9IGNsYXNzTmFtZT17cm93Q2xhc3N9PlxuICAgICAgICAgIDx0ZD57TG9nVmlld2VyLmZvcm1hdFRpbWUobG9nRW50cnkudGltZSl9PC90ZD5cbiAgICAgICAgICA8dGQ+e2xvZ0VudHJ5LnN0YXRpb25fbmFtZX08L3RkPlxuICAgICAgICAgIDx0ZD57bG9nRW50cnkubWVzc2FnZX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlIGxvZ1ZpZXdlci1tb2RhbFwiIHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgcmVmPXsoYykgPT4geyB0aGlzLm1vZGFsRElWID0gYzsgfX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nIG1vZGFsLWxnXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPnt0aGlzLnByb3BzLnRpdGxlfTwvaDQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUgdGFibGUtZml4ZWQgdGFibGUtY29uZGVuc2VkXCI+XG4gICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGg+VGltZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5TdGF0aW9uPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPk1lc3NhZ2U8L3RoPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICB7ZW50cmllc31cbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Mb2dWaWV3ZXIucHJvcFR5cGVzID0ge1xuICB0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgbG9nOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgdGltZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHN0YXRpb25faWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBzdGF0aW9uX25hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBtZXNzYWdlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIH0pXG4gICksXG59O1xuXG5Mb2dWaWV3ZXIuZGVmYXVsdFByb3BzID0ge1xuICBsb2c6IFtdLFxuICB0aXRsZTogJ0V2ZW50IExvZycsXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuL2Rhc2hib2FyZC5qc3gnO1xuXG53aW5kb3cuZGFzaGJvYXJkID0gbnVsbDtcblxuLy8gb25SZWFkeVxuJCgoKSA9PiB7XG4gIHdpbmRvdy5kYXNoYm9hcmQgPSBSZWFjdERPTS5yZW5kZXIoXG4gICAgPERhc2hib2FyZCB1cmw9XCIvYXBpL3N0YXRpb25zLmpzb25cIiAvPixcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGFzaGJvYXJkQ29udGFpbmVyJylcbiAgKTtcblxuICAvLyBJbnN0YWxsIGNsaWNrIGhhbmRsZXJzIGluIGV4dGVybmFsIG1lbnVzIGFuZCBidXR0b25zXG4gICQoJ1tkYXRhLWNvbW1hbmRdJykuZWFjaChmdW5jdGlvbiBzZXRDbGlja0hhbmRsZXIoKSB7XG4gICAgJCh0aGlzKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHdpbmRvdy5kYXNoYm9hcmQuZ2V0Q29tbWFuZCgkKHRoaXMpLmF0dHIoJ2RhdGEtY29tbWFuZCcpKSgpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRpb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaGFuZGxlQ2xpY2soKSB7XG4gICAgdGhpcy5wcm9wcy5vbkNsaWNrU3RhdGlvbih0aGlzLnByb3BzLnN0YXRpb24uaWQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHN0YXRpb25DbGFzc2VzID0gW1xuICAgICAgJ3N0YXRpb24nLFxuICAgICAgYHN0YXRpb24tc3RhdGUtJHt0aGlzLnByb3BzLnN0YXRpb24uc3RhdGV9YCxcbiAgICAgIGBzdGF0aW9uLXR5cGUtJHt0aGlzLnByb3BzLnN0YXRpb24udHlwZX1gLFxuICAgIF07XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZCkge1xuICAgICAgc3RhdGlvbkNsYXNzZXMucHVzaCgnc3RhdGlvbi1zZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXt0aGlzLnByb3BzLnN0YXRpb24uaWR9XG4gICAgICAgIGNsYXNzTmFtZT17c3RhdGlvbkNsYXNzZXMuam9pbignICcpfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tc3RhdGUtbGlnaHRcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLWljb25cIj5cbiAgICAgICAgICA8aW1nIGFsdD17dGhpcy5wcm9wcy5zdGF0aW9uLmFwcH0gc3JjPXt0aGlzLnByb3BzLnN0YXRpb24uaWNvbn0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1uYW1lXCI+e3RoaXMucHJvcHMuc3RhdGlvbi5uYW1lfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tdHlwZVwiPnt0aGlzLnByb3BzLnN0YXRpb24udHlwZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLWFwcFwiPnt0aGlzLnByb3BzLnN0YXRpb24uYXBwfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tc3RhdHVzXCI+e3RoaXMucHJvcHMuc3RhdGlvbi5zdGF0dXN9PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblN0YXRpb24ucHJvcFR5cGVzID0ge1xuICBzdGF0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc3RhdGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgdHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzdGF0dXM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXBwOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGljb246IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIHNlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgb25DbGlja1N0YXRpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxufTtcbiJdfQ==
