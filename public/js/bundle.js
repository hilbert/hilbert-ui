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

      var classes = ['btn', 'btn-default'];
      if (props.value === option) {
        classes.push('active');
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
        option
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
  allText: _react2.default.PropTypes.string,
  value: _react2.default.PropTypes.string,
  onChange: _react2.default.PropTypes.func
};

ButtonFilter.defaultProps = {
  options: [],
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
    key: 'getVisibleStations',
    value: function getVisibleStations() {
      var answer = [];

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.state.stations[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var station = _step3.value;

          if ((this.state.visibleType === '' || station.type === this.state.visibleType) && (this.state.visibleState === '' || station.state === this.state.visibleState)) {
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
        success: function success() {
          return console.log('Started');
        },
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
        success: function success() {
          return console.log('Started');
        },
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
  }, {
    key: 'pollLoop',
    value: function pollLoop() {
      var _this3 = this;

      var loop = function loop() {
        _this3.pollServer().then(function () {
          setTimeout(loop, 500);
        }).catch(function () {
          setTimeout(loop, 500);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwU2VsZWN0LmpzeCIsInNyYy9idXR0b25GaWx0ZXIuanN4Iiwic3JjL2Rhc2hib2FyZC5qc3giLCJzcmMvbG9nVmlld2VyLmpzeCIsInNyYy9tYWluLmpzeCIsInNyYy9zdGF0aW9uLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTXFCLFM7OztBQUVuQixxQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsNkZBQ1gsS0FEVzs7QUFFakIsVUFBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsVUFBSyxnQkFBTCxHQUF3QixNQUFLLGdCQUFMLENBQXNCLElBQXRCLE9BQXhCO0FBSGlCO0FBSWxCOzs7O3VDQUVrQjtBQUNqQixVQUFJLEtBQUssS0FBTCxDQUFXLFFBQWYsRUFBeUI7QUFDdkIsYUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixLQUFLLFdBQUwsQ0FBaUIsS0FBckM7QUFDRDtBQUNGOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFNLGVBQWUsRUFBckI7O0FBRUEsVUFBSSxLQUFLLEtBQUwsQ0FBVyxVQUFmLEVBQTJCO0FBQ3pCLHFCQUFhLElBQWIsQ0FDRTtBQUFBO1VBQUEsRUFBUSxLQUFJLE1BQVosRUFBbUIsT0FBTSxFQUF6QjtVQUFBO0FBQUEsU0FERjtBQUdEOztBQVBNO0FBQUE7QUFBQTs7QUFBQTtBQVNQLDZCQUEwQixLQUFLLEtBQUwsQ0FBVyxZQUFyQyw4SEFBbUQ7QUFBQSxjQUF4QyxXQUF3Qzs7QUFDakQsdUJBQWEsSUFBYixDQUNFO0FBQUE7WUFBQSxFQUFRLEtBQUssV0FBYixFQUEwQixPQUFPLFdBQWpDO1lBQStDO0FBQS9DLFdBREY7QUFHRDtBQWJNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFB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LE9BQVgsQ0FBbUIsR0FBN0IsRUFBa0MsS0FBSyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLElBQTFEO0FBREYsU0FORjtRQVNFO0FBQUE7VUFBQSxFQUFLLFdBQVUsY0FBZjtVQUErQixLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CO0FBQWxELFNBVEY7UUFVRTtBQUFBO1VBQUEsRUFBSyxXQUFVLGNBQWY7VUFBK0IsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQjtBQUFsRCxTQVZGO1FBV0U7QUFBQTtVQUFBLEVBQUssV0FBVSxhQUFmO1VBQThCLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUI7QUFBakQsU0FYRjtRQVlFO0FBQUE7VUFBQSxFQUFLLFdBQVUsZ0JBQWY7VUFBaUMsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQjtBQUFwRDtBQVpGLE9BREY7QUFnQkQ7Ozs7RUFyQ2tDLGdCQUFNLFM7O2tCQUF0QixPOzs7QUF3Q3JCLFFBQVEsU0FBUixHQUFvQjtBQUNsQixXQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0I7QUFDN0IsUUFBSSxnQkFBTSxTQUFOLENBQWdCLE1BRFM7QUFFN0IsVUFBTSxnQkFBTSxTQUFOLENBQWdCLE1BRk87QUFHN0IsV0FBTyxnQkFBTSxTQUFOLENBQWdCLE1BSE07QUFJN0IsVUFBTSxnQkFBTSxTQUFOLENBQWdCLE1BSk87QUFLN0IsWUFBUSxnQkFBTSxTQUFOLENBQWdCLE1BTEs7QUFNN0IsU0FBSyxnQkFBTSxTQUFOLENBQWdCLE1BTlE7QUFPN0IsVUFBTSxnQkFBTSxTQUFOLENBQWdCO0FBUE8sR0FBdEIsRUFRTixVQVRlO0FBVWxCLFlBQVUsZ0JBQU0sU0FBTixDQUFnQixJQVZSO0FBV2xCLGtCQUFnQixnQkFBTSxTQUFOLENBQWdCO0FBWGQsQ0FBcEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuLyoqXG4gKiBBcHBTZWxlY3QgY29tcG9uZW50XG4gKiBBbGxvd3MgdGhlIHVzZXIgdG8gc2VsZWN0IGFuIGFwcGxpY2F0aW9uIGZyb20gYSBsaXN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcFNlbGVjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5hcHBTZWxlY3RvciA9IG51bGw7XG4gICAgdGhpcy5jbGlja2VkQ2hhbmdlQXBwID0gdGhpcy5jbGlja2VkQ2hhbmdlQXBwLmJpbmQodGhpcyk7XG4gIH1cblxuICBjbGlja2VkQ2hhbmdlQXBwKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMuYXBwU2VsZWN0b3IudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBhcHBsaWNhdGlvbnMgPSBbXTtcblxuICAgIGlmICh0aGlzLnByb3BzLmFsbG93QmxhbmspIHtcbiAgICAgIGFwcGxpY2F0aW9ucy5wdXNoKFxuICAgICAgICA8b3B0aW9uIGtleT1cIm51bGxcIiB2YWx1ZT1cIlwiPiZuYnNwOzwvb3B0aW9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGFwcGxpY2F0aW9uIG9mIHRoaXMucHJvcHMuYXBwbGljYXRpb25zKSB7XG4gICAgICBhcHBsaWNhdGlvbnMucHVzaChcbiAgICAgICAgPG9wdGlvbiBrZXk9e2FwcGxpY2F0aW9ufSB2YWx1ZT17YXBwbGljYXRpb259PnthcHBsaWNhdGlvbn08L29wdGlvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgZGlzYWJsZWRDbGFzcyA9ICh0aGlzLnByb3BzLmRpc2FibGVkID8gJyBkaXNhYmxlZCcgOiAnJyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BhcHBTZWxlY3Qke2Rpc2FibGVkQ2xhc3N9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1pbmxpbmVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgZm9ybS1ncm91cC1taW53aWR0aFwiPlxuICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb3JtLWNvbnRyb2wke2Rpc2FibGVkQ2xhc3N9YH1cbiAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSA/IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlIDogJyd9XG4gICAgICAgICAgICAgIHJlZj17KHNlbCkgPT4geyB0aGlzLmFwcFNlbGVjdG9yID0gc2VsOyB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7YXBwbGljYXRpb25zfVxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgJm5ic3A7XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4td2FybmluZyR7ZGlzYWJsZWRDbGFzc31gfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5jbGlja2VkQ2hhbmdlQXBwfVxuICAgICAgICAgID5DaGFuZ2UgYXBwbGljYXRpb248L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5BcHBTZWxlY3QucHJvcFR5cGVzID0ge1xuICBhcHBsaWNhdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgKSxcbiAgZGVmYXVsdFZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBhbGxvd0JsYW5rOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgZGlzYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5BcHBTZWxlY3QuZGVmYXVsdFByb3BzID0ge1xuICBhcHBsaWNhdGlvbnM6IFtdLFxuICBkZWZhdWx0VmFsdWU6ICcnLFxuICBhbGxvd0JsYW5rOiBmYWxzZSxcbiAgZGlzYWJsZWQ6IGZhbHNlLFxuICBvbkNoYW5nZTogKCkgPT4ge30sXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQnV0dG9uRmlsdGVyID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSBbXTtcblxuICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBwcm9wcy5vcHRpb25zKSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IFsnYnRuJywgJ2J0bi1kZWZhdWx0J107XG4gICAgaWYgKHByb3BzLnZhbHVlID09PSBvcHRpb24pIHtcbiAgICAgIGNsYXNzZXMucHVzaCgnYWN0aXZlJyk7XG4gICAgfVxuICAgIG9wdGlvbnMucHVzaChcbiAgICAgIDxhXG4gICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLmpvaW4oJyAnKX1cbiAgICAgICAga2V5PXtvcHRpb259XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHByb3BzLm9uQ2hhbmdlKG9wdGlvbil9XG4gICAgICA+e29wdGlvbn08L2E+XG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGRlZmF1bHRDbGFzc2VzID0gWydidG4nLCAnYnRuLWRlZmF1bHQnXTtcbiAgaWYgKHByb3BzLnZhbHVlID09PSAnJykge1xuICAgIGRlZmF1bHRDbGFzc2VzLnB1c2goJ2FjdGl2ZScpO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi10b29sYmFyIGJ1dHRvbi1maWx0ZXJcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgIDxhXG4gICAgICAgICAgaHJlZj1cIiNcIlxuICAgICAgICAgIGNsYXNzTmFtZT17ZGVmYXVsdENsYXNzZXMuam9pbignICcpfVxuICAgICAgICAgIGtleT1cIm51bGxcIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHByb3BzLm9uQ2hhbmdlKCcnKX1cbiAgICAgICAgPntwcm9wcy5hbGxUZXh0fTwvYT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAge29wdGlvbnN9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbkJ1dHRvbkZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIG9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5zdHJpbmcpLFxuICBhbGxUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgb25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxufTtcblxuQnV0dG9uRmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb3B0aW9uczogW10sXG4gIGFsbFRleHQ6ICdBbGwnLFxuICB2YWx1ZTogJycsXG4gIG9uQ2hhbmdlOiAoKSA9PiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkZpbHRlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU3RhdGlvbiBmcm9tICcuL3N0YXRpb24uanN4JztcbmltcG9ydCBBcHBTZWxlY3QgZnJvbSAnLi9hcHBTZWxlY3QuanN4JztcbmltcG9ydCBCdXR0b25GaWx0ZXIgZnJvbSAnLi9idXR0b25GaWx0ZXIuanN4JztcbmltcG9ydCBMb2dWaWV3ZXIgZnJvbSAnLi9sb2dWaWV3ZXIuanN4JztcblxuLy8gY29uc3QgdG1wX2xvZ19lbnRyaWVzID0gcmVxdWlyZSgnLi90bXBfbG9nLmpzb24nKS5lbnRyaWVzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdGF0aW9uczogW10sXG4gICAgICBzZWxlY3Rpb246IG5ldyBTZXQoKSxcbiAgICAgIHZpc2libGVUeXBlOiAnJyxcbiAgICAgIHZpc2libGVTdGF0ZTogJycsXG4gICAgICBsb2c6IFtdLFxuICAgIH07XG4gICAgdGhpcy5zZWxlY3RUb2dnbGUgPSB0aGlzLnNlbGVjdFRvZ2dsZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2hhbmdlQXBwU2VsZWN0ZWQgPSB0aGlzLmNoYW5nZUFwcFNlbGVjdGVkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jb21tYW5kcyA9IHt9O1xuICAgIHRoaXMuaW5pdENvbW1hbmRzKCk7XG4gICAgdGhpcy5nZXRDb21tYW5kID0gdGhpcy5nZXRDb21tYW5kLmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb2dWaWV3ZXIgPSBudWxsO1xuICAgIHRoaXMudXBkYXRlSUQgPSAwO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wb2xsTG9vcCgpO1xuICB9XG5cbiAgZ2V0U3RhdGlvblN0YXRlKHN0YXRpb25JRCkge1xuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiB0aGlzLnN0YXRlLnN0YXRpb25zKSB7XG4gICAgICBpZiAoc3RhdGlvbi5pZCA9PT0gc3RhdGlvbklEKSB7XG4gICAgICAgIHJldHVybiBzdGF0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldFN0YXRpb25UeXBlcygpIHtcbiAgICBjb25zdCB0eXBlcyA9IG5ldyBTZXQoKTtcbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgdHlwZXMuYWRkKHN0YXRpb24udHlwZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEFycmF5LmZyb20odHlwZXMpO1xuICB9XG5cbiAgZ2V0Q29tbWFuZChjb21tYW5kTmFtZSkge1xuICAgIGlmICh0aGlzLmNvbW1hbmRzW2NvbW1hbmROYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb21tYW5kc1tjb21tYW5kTmFtZV0uZG9DYWxsYmFjaztcbiAgICB9XG4gICAgdGhyb3cgRXJyb3IoYENhbGwgdG8gaW52YWxpZCBjb21tYW5kICR7Y29tbWFuZE5hbWV9YCk7XG4gIH1cblxuICBnZXRWaXNpYmxlU3RhdGlvbnMoKSB7XG4gICAgY29uc3QgYW5zd2VyID0gW107XG5cbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2YgdGhpcy5zdGF0ZS5zdGF0aW9ucykge1xuICAgICAgaWYgKCh0aGlzLnN0YXRlLnZpc2libGVUeXBlID09PSAnJyB8fCBzdGF0aW9uLnR5cGUgPT09IHRoaXMuc3RhdGUudmlzaWJsZVR5cGUpICYmXG4gICAgICAgICAgKHRoaXMuc3RhdGUudmlzaWJsZVN0YXRlID09PSAnJyB8fCBzdGF0aW9uLnN0YXRlID09PSB0aGlzLnN0YXRlLnZpc2libGVTdGF0ZSkpIHtcbiAgICAgICAgYW5zd2VyLnB1c2goc3RhdGlvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFuc3dlcjtcbiAgfVxuXG4gIGF0dGFjaENvbmZpcm1hdGlvbih0ZXh0LCBjYWxsYmFjaykge1xuICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgYm9vdGJveC5kaWFsb2coe1xuICAgICAgICBtZXNzYWdlOiB0ZXh0LFxuICAgICAgICBidXR0b25zOiB7XG4gICAgICAgICAgd2FybmluZzoge1xuICAgICAgICAgICAgbGFiZWw6ICdDb25maXJtJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bi13YXJuaW5nJyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjay5iaW5kKHRoaXMsIC4uLmFyZ3MpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2FuY2VsOiB7XG4gICAgICAgICAgICBsYWJlbDogJ0NhbmNlbCcsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdidG4tZGVmYXVsdCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBpbml0Q29tbWFuZHMoKSB7XG4gICAgdGhpcy5jb21tYW5kcyA9IHtcbiAgICAgICdzdGF0aW9ucy1hbGwtc3RhcnQnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnN0YXJ0QWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RhcnQgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtYWxsLXN0b3AnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnN0b3BBbGwuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzdG9wIGFsbCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IHRydWUsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLWFsbC1zZWxlY3QnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnNlbGVjdEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3NlbGVjdCBhbGwgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtYWxsLWRlc2VsZWN0Jzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5kZXNlbGVjdEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ2Rlc2VsZWN0IGFsbCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IGZhbHNlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1zZWxlY3RlZC1zdGFydCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RhcnRTZWxlY3RlZC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3N0YXJ0IHRoZSBzZWxlY3RlZCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IHRydWUsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLXNlbGVjdGVkLXN0b3AnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnN0b3BTZWxlY3RlZC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3N0b3AgdGhlIHNlbGVjdGVkIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtdmlzaWJsZS1zZWxlY3QnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnNlbGVjdEFsbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzZWxlY3QgdmlzaWJsZSBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IGZhbHNlLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5rZXlzKHRoaXMuY29tbWFuZHMpKSB7XG4gICAgICBjb25zdCBjb21tYW5kID0gdGhpcy5jb21tYW5kc1tuYW1lXTtcbiAgICAgIGlmIChjb21tYW5kLmNvbmZpcm0pIHtcbiAgICAgICAgdGhpcy5jb21tYW5kc1tuYW1lXS5kb0NhbGxiYWNrID0gdGhpcy5hdHRhY2hDb25maXJtYXRpb24oXG4gICAgICAgICAgYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byAke2NvbW1hbmQudGl0bGV9P2AsXG4gICAgICAgICAgY29tbWFuZC5jYWxsYmFja1xuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21tYW5kc1tuYW1lXS5kb0NhbGxiYWNrID0gY29tbWFuZC5jYWxsYmFjaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhbGxTdGF0aW9uSURzKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRpb25JRHModGhpcy5zdGF0ZS5zdGF0aW9ucyk7XG4gIH1cblxuICBzdGF0aW9uSURzKHN0YXRpb25zKSB7XG4gICAgY29uc3QgaWRzID0gbmV3IFNldCgpO1xuXG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHN0YXRpb25zKSB7XG4gICAgICBpZHMuYWRkKHN0YXRpb24uaWQpO1xuICAgIH1cblxuICAgIHJldHVybiBpZHM7XG4gIH1cblxuICBzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogdGhpcy5hbGxTdGF0aW9uSURzKCkgfSk7XG4gIH1cblxuICBzZWxlY3RBbGxWaXNpYmxlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3Rpb246IHRoaXMuc3RhdGlvbklEcyh0aGlzLmdldFZpc2libGVTdGF0aW9ucygpKSB9KTtcbiAgfVxuXG4gIGRlc2VsZWN0QWxsKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3Rpb246IG5ldyBTZXQoKSB9KTtcbiAgfVxuXG4gIHNlbGVjdFRvZ2dsZShpZCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGlvbi5oYXMoaWQpKSB7XG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbi5kZWxldGUoaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbi5hZGQoaWQpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW9uOiB0aGlzLnN0YXRlLnNlbGVjdGlvbiB9KTtcbiAgfVxuXG4gIHN0b3BTdGF0aW9ucyhzdGF0aW9uSURzKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvc3RhdGlvbnMuanNvbicsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGFjdGlvbjogJ3N0b3AnLFxuICAgICAgICBzdGF0aW9uSURzOiBBcnJheS5mcm9tKHN0YXRpb25JRHMpLFxuICAgICAgfSksXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4gY29uc29sZS5sb2coJ1N0YXJ0ZWQnKSxcbiAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICB9KTtcbiAgfVxuXG4gIHN0b3BTZWxlY3RlZCgpIHtcbiAgICB0aGlzLnN0b3BTdGF0aW9ucyh0aGlzLnN0YXRlLnNlbGVjdGlvbik7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICB9XG5cbiAgc3RvcEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9wU3RhdGlvbnModGhpcy5hbGxTdGF0aW9uSURzKCkpO1xuICB9XG5cbiAgc3RhcnRTdGF0aW9ucyhzdGF0aW9uSURzKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvc3RhdGlvbnMuanNvbicsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGFjdGlvbjogJ3N0YXJ0JyxcbiAgICAgICAgc3RhdGlvbklEczogQXJyYXkuZnJvbShzdGF0aW9uSURzKSxcbiAgICAgIH0pLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IGNvbnNvbGUubG9nKCdTdGFydGVkJyksXG4gICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSksXG4gICAgfSk7XG4gIH1cblxuICBzdGFydFNlbGVjdGVkKCkge1xuICAgIHRoaXMuc3RhcnRTdGF0aW9ucyh0aGlzLnN0YXRlLnNlbGVjdGlvbik7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICB9XG5cbiAgc3RhcnRBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhcnRTdGF0aW9ucyh0aGlzLmFsbFN0YXRpb25JRHMoKSk7XG4gIH1cblxuICBjaGFuZ2VBcHBTZWxlY3RlZChhcHApIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9zdGF0aW9ucy5qc29uJyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgYWN0aW9uOiAnY2hhbmdlX2FwcCcsXG4gICAgICAgIHN0YXRpb25JRHM6IEFycmF5LmZyb20odGhpcy5zdGF0ZS5zZWxlY3Rpb24pLFxuICAgICAgICBhcHAsXG4gICAgICB9KSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7fSxcbiAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICB9KTtcbiAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gIH1cblxuICBwb2xsTG9vcCgpIHtcbiAgICBjb25zdCBsb29wID0gKCkgPT4ge1xuICAgICAgdGhpcy5wb2xsU2VydmVyKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQobG9vcCwgNTAwKTtcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChsb29wLCA1MDApO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICBsb29wKCk7XG4gIH1cblxuICBwb2xsU2VydmVyKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL3BvbGwuanNvbicsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBsYXN0U2VlbjogdGhpcy51cGRhdGVJRCxcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICB0aW1lb3V0OiAzMDAwMCxcbiAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICBpZiAoZGF0YS5zdGF0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlEID0gZGF0YS51cGRhdGVJRDtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXRpb25zOiBkYXRhLnN0YXRpb25zfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByb3BzLnVybCwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzdGF0aW9ucyA9IFtdO1xuICAgIGNvbnN0IGFjdGlvbnMgPSBbXTtcblxuICAgIHRoaXMuZ2V0VmlzaWJsZVN0YXRpb25zKCkuZm9yRWFjaCgoc3RhdGlvbikgPT4gc3RhdGlvbnMucHVzaChcbiAgICAgIDxTdGF0aW9uXG4gICAgICAgIHN0YXRpb249e3N0YXRpb259XG4gICAgICAgIGtleT17c3RhdGlvbi5pZH1cbiAgICAgICAgc2VsZWN0ZWQ9e3RoaXMuc3RhdGUuc2VsZWN0aW9uLmhhcyhzdGF0aW9uLmlkKX1cbiAgICAgICAgb25DbGlja1N0YXRpb249e3RoaXMuc2VsZWN0VG9nZ2xlfVxuICAgICAgLz5cbiAgICApKTtcblxuICAgIGNvbnN0IHNlbGVjdGVkQ291bnQgPSB0aGlzLnN0YXRlLnNlbGVjdGlvbi5zaXplO1xuICAgIGNvbnN0IGFsbFNlbGVjdGVkID0gKHNlbGVjdGVkQ291bnQgPT09IHRoaXMuc3RhdGUuc3RhdGlvbnMubGVuZ3RoKTtcbiAgICBjb25zdCBzZWxlY3RBbGxDbGFzc2VzID1cbiAgICAgIGBidG4gYnRuLWRlZmF1bHQgJHthbGxTZWxlY3RlZCA/ICcgZGlzYWJsZWQnIDogJyd9YDtcblxuICAgIGNvbnN0IGRlc2VsZWN0QWxsQ2xhc3NlcyA9XG4gICAgICBgYnRuIGJ0bi1kZWZhdWx0ICR7c2VsZWN0ZWRDb3VudCA9PT0gMCA/ICcgZGlzYWJsZWQnIDogJyd9YDtcblxuICAgIGNvbnN0IHN0YXRpb25Xb3JkID0gc2VsZWN0ZWRDb3VudCA9PT0gMSA/ICdzdGF0aW9uJyA6ICdzdGF0aW9ucyc7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInN0YXRpb25TdGF0ZUZpbHRlclwiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxCdXR0b25GaWx0ZXJcbiAgICAgICAgICBvcHRpb25zPXtbJ29uJywgJ29mZicsICdidXN5JywgJ2Vycm9yJ119XG4gICAgICAgICAgYWxsVGV4dD1cIkFsbCBzdGF0ZXNcIlxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZpc2libGVTdGF0ZX1cbiAgICAgICAgICBvbkNoYW5nZT17KG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZpc2libGVTdGF0ZTogb3B0aW9uIH0pO1xuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzdGF0aW9uVHlwZUZpbHRlclwiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxCdXR0b25GaWx0ZXJcbiAgICAgICAgICBvcHRpb25zPXt0aGlzLmdldFN0YXRpb25UeXBlcygpfVxuICAgICAgICAgIGFsbFRleHQ9XCJBbGwgdHlwZXNcIlxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZpc2libGVUeXBlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmlzaWJsZVR5cGU6IG9wdGlvbiB9KTtcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic2VsZWN0ZWRDb3VudFwiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmUtc2VwYXJhdG9yXCIgPjwvZGl2PlxuICAgICAgICA8Yj57dGhpcy5zdGF0ZS5zZWxlY3Rpb24uc2l6ZX0ge3N0YXRpb25Xb3JkfSBzZWxlY3RlZDwvYj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3RBY3Rpb25zXCI+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGNsYXNzTmFtZT17ZGVzZWxlY3RBbGxDbGFzc2VzfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy1hbGwtZGVzZWxlY3QnKX1cbiAgICAgICAgICA+RGVzZWxlY3Q8L2E+Jm5ic3A7XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGNsYXNzTmFtZT17c2VsZWN0QWxsQ2xhc3Nlc31cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZ2V0Q29tbWFuZCgnc3RhdGlvbnMtdmlzaWJsZS1zZWxlY3QnKX1cbiAgICAgICAgICA+U2VsZWN0IGFsbDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgY29uc3Qgbm9TZWxlY3Rpb25EaXNhYmxlID0gKHNlbGVjdGVkQ291bnQgPT09IDAgPyAnIGRpc2FibGVkJyA6ICcnKTtcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic3RhcnRTdG9wUGFuZWxcIiBjbGFzc05hbWU9e2BhY3Rpb24tcGFuZSR7bm9TZWxlY3Rpb25EaXNhYmxlfWB9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lLXNlcGFyYXRvclwiID48L2Rpdj5cbiAgICAgICAgPGFcbiAgICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLXN1Y2Nlc3Mke25vU2VsZWN0aW9uRGlzYWJsZX1gfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZ2V0Q29tbWFuZCgnc3RhdGlvbnMtc2VsZWN0ZWQtc3RhcnQnKX1cbiAgICAgICAgPjxpIGNsYXNzTmFtZT1cImZhIGZhLXBsYXlcIiAvPiZuYnNwOyZuYnNwO1N0YXJ0IFNlbGVjdGVkPC9hPlxuICAgICAgICAmbmJzcDtcbiAgICAgICAgPGFcbiAgICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLWRhbmdlciR7bm9TZWxlY3Rpb25EaXNhYmxlfWB9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5nZXRDb21tYW5kKCdzdGF0aW9ucy1zZWxlY3RlZC1zdG9wJyl9XG4gICAgICAgID48aSBjbGFzc05hbWU9XCJmYSBmYS1zdG9wXCIgLz4mbmJzcDsmbmJzcDtTdG9wIFNlbGVjdGVkPC9hPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGxldCBzZWxlY3RlZEFyZVNhbWVUeXBlID0gdHJ1ZTtcbiAgICBsZXQgbGFzdFR5cGUgPSBudWxsO1xuICAgIGZvciAoY29uc3Qgc2VsZWN0ZWRJRCBvZiB0aGlzLnN0YXRlLnNlbGVjdGlvbikge1xuICAgICAgaWYgKGxhc3RUeXBlID09PSBudWxsKSB7XG4gICAgICAgIGxhc3RUeXBlID0gdGhpcy5nZXRTdGF0aW9uU3RhdGUoc2VsZWN0ZWRJRCkudHlwZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmdldFN0YXRpb25TdGF0ZShzZWxlY3RlZElEKS50eXBlICE9PSBsYXN0VHlwZSkge1xuICAgICAgICBzZWxlY3RlZEFyZVNhbWVUeXBlID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBhbGxTZWxlY3RlZE9uID0gdHJ1ZTtcbiAgICBmb3IgKGNvbnN0IHNlbGVjdGVkSUQgb2YgdGhpcy5zdGF0ZS5zZWxlY3Rpb24pIHtcbiAgICAgIGlmICh0aGlzLmdldFN0YXRpb25TdGF0ZShzZWxlY3RlZElEKS5zdGF0ZSAhPT0gJ29uJykge1xuICAgICAgICBhbGxTZWxlY3RlZE9uID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNhbkNoYW5nZUFwcCA9IChhbGxTZWxlY3RlZE9uICYmIChzZWxlY3RlZENvdW50ID4gMCkgJiYgc2VsZWN0ZWRBcmVTYW1lVHlwZSk7XG5cbiAgICBsZXQgYXBwbGljYXRpb25zID0gW107XG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGlvbi5oYXMoc3RhdGlvbi5pZCkpIHtcbiAgICAgICAgYXBwbGljYXRpb25zID0gc3RhdGlvbi5wb3NzaWJsZV9hcHBzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwiYXBwU2VsZWN0XCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZS1zZXBhcmF0b3JcIiA+PC9kaXY+XG4gICAgICAgIDxBcHBTZWxlY3RcbiAgICAgICAgICBhcHBsaWNhdGlvbnM9e2NhbkNoYW5nZUFwcCA/IGFwcGxpY2F0aW9ucyA6IFtdfVxuICAgICAgICAgIGRpc2FibGVkPXshY2FuQ2hhbmdlQXBwfVxuICAgICAgICAgIGFsbG93QmxhbmtcbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5hdHRhY2hDb25maXJtYXRpb24oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjaGFuZ2UgdGhlIGFwcGxpY2F0aW9uPycsXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFwcFNlbGVjdGVkKX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInNob3dMb2dcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lLXNlcGFyYXRvclwiID48L2Rpdj5cbiAgICAgICAgPGFcbiAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIlxuICAgICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgICBvbkNsaWNrPXsoZXYpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvZ1ZpZXdlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICB0aGlzLmxvZ1ZpZXdlci5vcGVuTW9kYWwoKTtcbiAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2xvZy5qc29uJyxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG9nOiBkYXRhLmVudHJpZXMucmV2ZXJzZSgpIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgPlNob3cgbG9nPC9hPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02IHBhbmUtc3RhdGlvbnNcIj5cbiAgICAgICAgICAgICAgPGRpdiBpZD1cImRhc2hib2FyZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJzdGF0aW9uTGlzdFwiIGNsYXNzTmFtZT1cInBhbmVsLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICB7c3RhdGlvbnN9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02IHBhbmUtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGFzaGJvYXJkQWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgIHthY3Rpb25zfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPExvZ1ZpZXdlciBsb2c9e3RoaXMuc3RhdGUubG9nfSByZWY9eyhjKSA9PiB7IHRoaXMubG9nVmlld2VyID0gYzsgfX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRGFzaGJvYXJkLnByb3BUeXBlcyA9IHtcbiAgdXJsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nVmlld2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBzdGF0aWMgZm9ybWF0VGltZShpc29UaW1lKSB7XG4gICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKGlzb1RpbWUpO1xuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSgpO1xuICAgIHllc3RlcmRheS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDEpO1xuICAgIGxldCBkYXkgPSAnJztcblxuICAgIGlmICh0b2RheS5nZXRNb250aCgpID09PSB0aW1lLmdldE1vbnRoKCkgJiZcbiAgICAgIHRvZGF5LmdldEZ1bGxZZWFyKCkgPT09IHRpbWUuZ2V0RnVsbFllYXIoKSAmJlxuICAgICAgdG9kYXkuZ2V0RGF0ZSgpID09PSB0aW1lLmdldERhdGUoKSkge1xuICAgICAgZGF5ID0gJ1RvZGF5JztcbiAgICB9IGVsc2UgaWYgKHllc3RlcmRheS5nZXRNb250aCgpID09PSB0aW1lLmdldE1vbnRoKCkgJiZcbiAgICAgIHllc3RlcmRheS5nZXRGdWxsWWVhcigpID09PSB0aW1lLmdldEZ1bGxZZWFyKCkgJiZcbiAgICAgIHllc3RlcmRheS5nZXREYXRlKCkgPT09IHRpbWUuZ2V0RGF0ZSgpKSB7XG4gICAgICBkYXkgPSAnWWVzdGVyZGF5JztcbiAgICB9IGVsc2Uge1xuICAgICAgZGF5ID0gYCR7dGltZS5nZXRGdWxsWWVhcigpfS0ke3RpbWUuZ2V0TW9udGgoKX0tJHt0aW1lLmdldERhdGUoKX1gO1xuICAgIH1cblxuICAgIHJldHVybiBgJHtkYXl9ICR7dGltZS5nZXRIb3VycygpfToke3RpbWUuZ2V0TWludXRlcygpfToke3RpbWUuZ2V0U2Vjb25kcygpfWA7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLm1vZGFsRElWID0gbnVsbDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICQod2luZG93KS5vbigncmVzaXplJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgICAkKHRoaXMubW9kYWxESVYpLm9uKCdzaG93LmJzLm1vZGFsJywgKCkgPT4geyB0aGlzLmhhbmRsZVJlc2l6ZSgpOyB9KTtcbiAgfVxuXG4gIG9wZW5Nb2RhbCgpIHtcbiAgICBpZiAodGhpcy5tb2RhbERJViAhPT0gbnVsbCkge1xuICAgICAgJCh0aGlzLm1vZGFsRElWKS5tb2RhbCgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZSgpIHtcbiAgICBjb25zdCAkbW9kYWwgPSAkKHRoaXMubW9kYWxESVYpO1xuICAgIGNvbnN0IG1vZGFsSGVhZGVySGVpZ2h0ID0gNTY7XG4gICAgY29uc3QgbW9kYWxNYXJnaW4gPSAzMDtcbiAgICBjb25zdCBtb2RhbEJvcmRlciA9IDE7XG5cbiAgICBjb25zdCBib2R5SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gKG1vZGFsSGVhZGVySGVpZ2h0ICsgbW9kYWxNYXJnaW4gKiAyICsgbW9kYWxCb3JkZXIgKiAyKTtcbiAgICAkbW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5jc3MoeyBtYXhIZWlnaHQ6IGJvZHlIZWlnaHQgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgcm93Q2xhc3NlcyA9IHtcbiAgICAgIGVycm9yOiAnZGFuZ2VyJyxcbiAgICAgIHdhcm5pbmc6ICd3YXJuaW5nJyxcbiAgICB9O1xuXG4gICAgY29uc3QgZW50cmllcyA9IFtdO1xuICAgIGZvciAoY29uc3QgbG9nRW50cnkgb2YgdGhpcy5wcm9wcy5sb2cpIHtcbiAgICAgIGNvbnN0IHJvd0NsYXNzID0gcm93Q2xhc3Nlc1tsb2dFbnRyeS50eXBlXSAhPT0gdW5kZWZpbmVkID8gcm93Q2xhc3Nlc1tsb2dFbnRyeS50eXBlXSA6ICcnO1xuXG4gICAgICBlbnRyaWVzLnB1c2goXG4gICAgICAgIDx0ciBrZXk9e2xvZ0VudHJ5LmlkfSBjbGFzc05hbWU9e3Jvd0NsYXNzfT5cbiAgICAgICAgICA8dGQ+e0xvZ1ZpZXdlci5mb3JtYXRUaW1lKGxvZ0VudHJ5LnRpbWUpfTwvdGQ+XG4gICAgICAgICAgPHRkPntsb2dFbnRyeS5zdGF0aW9uX25hbWV9PC90ZD5cbiAgICAgICAgICA8dGQ+e2xvZ0VudHJ5Lm1lc3NhZ2V9PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZSBsb2dWaWV3ZXItbW9kYWxcIiB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIHJlZj17KGMpID0+IHsgdGhpcy5tb2RhbERJViA9IGM7IH19PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZyBtb2RhbC1sZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPiZ0aW1lczs8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj57dGhpcy5wcm9wcy50aXRsZX08L2g0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLWZpeGVkIHRhYmxlLWNvbmRlbnNlZFwiPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlRpbWU8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+U3RhdGlvbjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5NZXNzYWdlPC90aD5cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAge2VudHJpZXN9XG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuTG9nVmlld2VyLnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGxvZzogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgdHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHRpbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBzdGF0aW9uX2lkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgc3RhdGlvbl9uYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgbWVzc2FnZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9KVxuICApLFxufTtcblxuTG9nVmlld2VyLmRlZmF1bHRQcm9wcyA9IHtcbiAgbG9nOiBbXSxcbiAgdGl0bGU6ICdFdmVudCBMb2cnLFxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi9kYXNoYm9hcmQuanN4Jztcblxud2luZG93LmRhc2hib2FyZCA9IG51bGw7XG5cbi8vIG9uUmVhZHlcbiQoKCkgPT4ge1xuICB3aW5kb3cuZGFzaGJvYXJkID0gUmVhY3RET00ucmVuZGVyKFxuICAgIDxEYXNoYm9hcmQgdXJsPVwiL2FwaS9zdGF0aW9ucy5qc29uXCIgLz4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rhc2hib2FyZENvbnRhaW5lcicpXG4gICk7XG5cbiAgLy8gSW5zdGFsbCBjbGljayBoYW5kbGVycyBpbiBleHRlcm5hbCBtZW51cyBhbmQgYnV0dG9uc1xuICAkKCdbZGF0YS1jb21tYW5kXScpLmVhY2goZnVuY3Rpb24gc2V0Q2xpY2tIYW5kbGVyKCkge1xuICAgICQodGhpcykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB3aW5kb3cuZGFzaGJvYXJkLmdldENvbW1hbmQoJCh0aGlzKS5hdHRyKCdkYXRhLWNvbW1hbmQnKSkoKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0aW9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKCkge1xuICAgIHRoaXMucHJvcHMub25DbGlja1N0YXRpb24odGhpcy5wcm9wcy5zdGF0aW9uLmlkKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzdGF0aW9uQ2xhc3NlcyA9IFtcbiAgICAgICdzdGF0aW9uJyxcbiAgICAgIGBzdGF0aW9uLXN0YXRlLSR7dGhpcy5wcm9wcy5zdGF0aW9uLnN0YXRlfWAsXG4gICAgICBgc3RhdGlvbi10eXBlLSR7dGhpcy5wcm9wcy5zdGF0aW9uLnR5cGV9YCxcbiAgICBdO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWQpIHtcbiAgICAgIHN0YXRpb25DbGFzc2VzLnB1c2goJ3N0YXRpb24tc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17dGhpcy5wcm9wcy5zdGF0aW9uLmlkfVxuICAgICAgICBjbGFzc05hbWU9e3N0YXRpb25DbGFzc2VzLmpvaW4oJyAnKX1cbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLXN0YXRlLWxpZ2h0XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1pY29uXCI+XG4gICAgICAgICAgPGltZyBhbHQ9e3RoaXMucHJvcHMuc3RhdGlvbi5hcHB9IHNyYz17dGhpcy5wcm9wcy5zdGF0aW9uLmljb259IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tbmFtZVwiPnt0aGlzLnByb3BzLnN0YXRpb24ubmFtZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLXR5cGVcIj57dGhpcy5wcm9wcy5zdGF0aW9uLnR5cGV9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1hcHBcIj57dGhpcy5wcm9wcy5zdGF0aW9uLmFwcH08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLXN0YXR1c1wiPnt0aGlzLnByb3BzLnN0YXRpb24uc3RhdHVzfTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TdGF0aW9uLnByb3BUeXBlcyA9IHtcbiAgc3RhdGlvbjogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN0YXRlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc3RhdHVzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFwcDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpY29uOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICB9KS5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2xpY2tTdGF0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbn07XG4iXX0=
