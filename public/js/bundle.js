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

      var counts = {};
      this.state.stations.forEach(function (station) {
        if (!counts.hasOwnProperty(station.state)) {
          counts[station.state] = 0;
        }
        counts[station.state]++;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwU2VsZWN0LmpzeCIsInNyYy9idXR0b25GaWx0ZXIuanN4Iiwic3JjL2Rhc2hib2FyZC5qc3giLCJzcmMvbG9nVmlld2VyLmpzeCIsInNyYy9tYWluLmpzeCIsInNyYy9zdGF0aW9uLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTXFCLFM7OztBQUVuQixxQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsNkZBQ1gsS0FEVzs7QUFFakIsVUFBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsVUFBSyxnQkFBTCxHQUF3QixNQUFLLGdCQUFMLENBQXNCLElBQXRCLE9BQXhCO0FBSGlCO0FBSWxCOzs7O3VDQUVrQjtBQUNqQixVQUFJLEtBQUssS0FBTCxDQUFXLFFBQWYsRUFBeUI7QUFDdkIsYUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixLQUFLLFdBQUwsQ0FBaUIsS0FBckM7QUFDRDtBQUNGOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFNLGVBQWUsRUFBckI7O0FBRUEsVUFBSSxLQUFLLEtBQUwsQ0FBVyxVQUFmLEVBQTJCO0FBQ3pCLHFCQUFhLElBQWIsQ0FDRTtBQUFBO1VBQUEsRUFBUSxLQUFJLE1BQVosRUFBbUIsT0FBTSxFQUF6QjtVQUFBO0FBQUEsU0FERjtBQUdEOztBQVBNO0FBQUE7QUFBQTs7QUFBQTtBQVNQLDZCQUEwQixLQUFLLEtBQUwsQ0FBVyxZQUFyQyw4SEFBbUQ7QUFBQSxjQUF4QyxXQUF3Qzs7QUFDakQsdUJBQWEsSUFBYixDQUNFO0FBQUE7WUFBQSxFQUFRLEtBQUssV0FBYixFQUEwQixPQUFPLFdBQWpDO1lBQStDO0FBQS9DLFdBREY7QUFHRDtBQWJNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFB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QjtBQUFsRCxTQVZGO1FBV0U7QUFBQTtVQUFBLEVBQUssV0FBVSxhQUFmO1VBQThCLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUI7QUFBakQsU0FYRjtRQVlFO0FBQUE7VUFBQSxFQUFLLFdBQVUsZ0JBQWY7VUFBaUMsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQjtBQUFwRDtBQVpGLE9BREY7QUFnQkQ7Ozs7RUFyQ2tDLGdCQUFNLFM7O2tCQUF0QixPOzs7QUF3Q3JCLFFBQVEsU0FBUixHQUFvQjtBQUNsQixXQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0I7QUFDN0IsUUFBSSxnQkFBTSxTQUFOLENBQWdCLE1BRFM7QUFFN0IsVUFBTSxnQkFBTSxTQUFOLENBQWdCLE1BRk87QUFHN0IsV0FBTyxnQkFBTSxTQUFOLENBQWdCLE1BSE07QUFJN0IsVUFBTSxnQkFBTSxTQUFOLENBQWdCLE1BSk87QUFLN0IsWUFBUSxnQkFBTSxTQUFOLENBQWdCLE1BTEs7QUFNN0IsU0FBSyxnQkFBTSxTQUFOLENBQWdCLE1BTlE7QUFPN0IsVUFBTSxnQkFBTSxTQUFOLENBQWdCO0FBUE8sR0FBdEIsRUFRTixVQVRlO0FBVWxCLFlBQVUsZ0JBQU0sU0FBTixDQUFnQixJQVZSO0FBV2xCLGtCQUFnQixnQkFBTSxTQUFOLENBQWdCO0FBWGQsQ0FBcEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuLyoqXG4gKiBBcHBTZWxlY3QgY29tcG9uZW50XG4gKiBBbGxvd3MgdGhlIHVzZXIgdG8gc2VsZWN0IGFuIGFwcGxpY2F0aW9uIGZyb20gYSBsaXN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcFNlbGVjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5hcHBTZWxlY3RvciA9IG51bGw7XG4gICAgdGhpcy5jbGlja2VkQ2hhbmdlQXBwID0gdGhpcy5jbGlja2VkQ2hhbmdlQXBwLmJpbmQodGhpcyk7XG4gIH1cblxuICBjbGlja2VkQ2hhbmdlQXBwKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMuYXBwU2VsZWN0b3IudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBhcHBsaWNhdGlvbnMgPSBbXTtcblxuICAgIGlmICh0aGlzLnByb3BzLmFsbG93QmxhbmspIHtcbiAgICAgIGFwcGxpY2F0aW9ucy5wdXNoKFxuICAgICAgICA8b3B0aW9uIGtleT1cIm51bGxcIiB2YWx1ZT1cIlwiPiZuYnNwOzwvb3B0aW9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGFwcGxpY2F0aW9uIG9mIHRoaXMucHJvcHMuYXBwbGljYXRpb25zKSB7XG4gICAgICBhcHBsaWNhdGlvbnMucHVzaChcbiAgICAgICAgPG9wdGlvbiBrZXk9e2FwcGxpY2F0aW9ufSB2YWx1ZT17YXBwbGljYXRpb259PnthcHBsaWNhdGlvbn08L29wdGlvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgZGlzYWJsZWRDbGFzcyA9ICh0aGlzLnByb3BzLmRpc2FibGVkID8gJyBkaXNhYmxlZCcgOiAnJyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BhcHBTZWxlY3Qke2Rpc2FibGVkQ2xhc3N9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1pbmxpbmVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgZm9ybS1ncm91cC1taW53aWR0aFwiPlxuICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb3JtLWNvbnRyb2wke2Rpc2FibGVkQ2xhc3N9YH1cbiAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSA/IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlIDogJyd9XG4gICAgICAgICAgICAgIHJlZj17KHNlbCkgPT4geyB0aGlzLmFwcFNlbGVjdG9yID0gc2VsOyB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7YXBwbGljYXRpb25zfVxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgJm5ic3A7XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4td2FybmluZyR7ZGlzYWJsZWRDbGFzc31gfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5jbGlja2VkQ2hhbmdlQXBwfVxuICAgICAgICAgID5DaGFuZ2UgYXBwbGljYXRpb248L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5BcHBTZWxlY3QucHJvcFR5cGVzID0ge1xuICBhcHBsaWNhdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgKSxcbiAgZGVmYXVsdFZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBhbGxvd0JsYW5rOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgZGlzYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5BcHBTZWxlY3QuZGVmYXVsdFByb3BzID0ge1xuICBhcHBsaWNhdGlvbnM6IFtdLFxuICBkZWZhdWx0VmFsdWU6ICcnLFxuICBhbGxvd0JsYW5rOiBmYWxzZSxcbiAgZGlzYWJsZWQ6IGZhbHNlLFxuICBvbkNoYW5nZTogKCkgPT4ge30sXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQnV0dG9uRmlsdGVyID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSBbXTtcblxuICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBwcm9wcy5vcHRpb25zKSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IFsnYnRuJywgJ2J0bi1kZWZhdWx0JywgYGJ1dHRvbi1maWx0ZXItb3B0aW9uLSR7b3B0aW9ufWBdO1xuICAgIGlmIChwcm9wcy52YWx1ZSA9PT0gb3B0aW9uKSB7XG4gICAgICBjbGFzc2VzLnB1c2goJ2FjdGl2ZScpO1xuICAgIH1cbiAgICBsZXQgY291bnRlciA9ICcnO1xuICAgIGxldCBzcGFjaW5nID0gJyc7XG4gICAgaWYgKHByb3BzLmNvdW50cyAhPT0gbnVsbCkge1xuICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgIGlmIChwcm9wcy5jb3VudHMuaGFzT3duUHJvcGVydHkob3B0aW9uKSAmJiBwcm9wcy5jb3VudHNbb3B0aW9uXSAhPT0gMCkge1xuICAgICAgICBjb3VudCA9IHByb3BzLmNvdW50c1tvcHRpb25dO1xuICAgICAgfVxuICAgICAgY29uc3QgYmFkZ2VDbGFzc2VzID0gYGJhZGdlJHtjb3VudCA9PT0gMCA/ICcgemVybycgOiAnIG5vbi16ZXJvJ31gO1xuICAgICAgY291bnRlciA9ICg8c3BhbiBjbGFzc05hbWU9e2JhZGdlQ2xhc3Nlc30+e2NvdW50fTwvc3Bhbj4pO1xuICAgICAgc3BhY2luZyA9ICcgJztcbiAgICB9XG4gICAgb3B0aW9ucy5wdXNoKFxuICAgICAgPGFcbiAgICAgICAgaHJlZj1cIiNcIlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMuam9pbignICcpfVxuICAgICAgICBrZXk9e29wdGlvbn1cbiAgICAgICAgb25DbGljaz17KCkgPT4gcHJvcHMub25DaGFuZ2Uob3B0aW9uKX1cbiAgICAgID57b3B0aW9ufXtzcGFjaW5nfXtjb3VudGVyfTwvYT5cbiAgICApO1xuICB9XG5cbiAgY29uc3QgZGVmYXVsdENsYXNzZXMgPSBbJ2J0bicsICdidG4tZGVmYXVsdCddO1xuICBpZiAocHJvcHMudmFsdWUgPT09ICcnKSB7XG4gICAgZGVmYXVsdENsYXNzZXMucHVzaCgnYWN0aXZlJyk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLXRvb2xiYXIgYnV0dG9uLWZpbHRlclwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAgPGFcbiAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgY2xhc3NOYW1lPXtkZWZhdWx0Q2xhc3Nlcy5qb2luKCcgJyl9XG4gICAgICAgICAga2V5PVwibnVsbFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gcHJvcHMub25DaGFuZ2UoJycpfVxuICAgICAgICA+e3Byb3BzLmFsbFRleHR9PC9hPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cFwiPlxuICAgICAgICB7b3B0aW9uc31cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuQnV0dG9uRmlsdGVyLnByb3BUeXBlcyA9IHtcbiAgb3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoUmVhY3QuUHJvcFR5cGVzLnN0cmluZyksXG4gIGNvdW50czogUmVhY3QuUHJvcFR5cGVzLm9iamVjdE9mKFJlYWN0LlByb3BUeXBlcy5udW1iZXIpLFxuICBhbGxUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgb25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxufTtcblxuQnV0dG9uRmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb3B0aW9uczogW10sXG4gIGNvdW50czogbnVsbCxcbiAgYWxsVGV4dDogJ0FsbCcsXG4gIHZhbHVlOiAnJyxcbiAgb25DaGFuZ2U6ICgpID0+IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uRmlsdGVyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTdGF0aW9uIGZyb20gJy4vc3RhdGlvbi5qc3gnO1xuaW1wb3J0IEFwcFNlbGVjdCBmcm9tICcuL2FwcFNlbGVjdC5qc3gnO1xuaW1wb3J0IEJ1dHRvbkZpbHRlciBmcm9tICcuL2J1dHRvbkZpbHRlci5qc3gnO1xuaW1wb3J0IExvZ1ZpZXdlciBmcm9tICcuL2xvZ1ZpZXdlci5qc3gnO1xuXG4vLyBjb25zdCB0bXBfbG9nX2VudHJpZXMgPSByZXF1aXJlKCcuL3RtcF9sb2cuanNvbicpLmVudHJpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhc2hib2FyZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHN0YXRpb25zOiBbXSxcbiAgICAgIHNlbGVjdGlvbjogbmV3IFNldCgpLFxuICAgICAgdmlzaWJsZVR5cGU6ICcnLFxuICAgICAgdmlzaWJsZVN0YXRlOiAnJyxcbiAgICAgIGxvZzogW10sXG4gICAgfTtcbiAgICB0aGlzLnNlbGVjdFRvZ2dsZSA9IHRoaXMuc2VsZWN0VG9nZ2xlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jaGFuZ2VBcHBTZWxlY3RlZCA9IHRoaXMuY2hhbmdlQXBwU2VsZWN0ZWQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNvbW1hbmRzID0ge307XG4gICAgdGhpcy5pbml0Q29tbWFuZHMoKTtcbiAgICB0aGlzLmdldENvbW1hbmQgPSB0aGlzLmdldENvbW1hbmQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvZ1ZpZXdlciA9IG51bGw7XG4gICAgdGhpcy51cGRhdGVJRCA9IDA7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnBvbGxMb29wKCk7XG4gIH1cblxuICBnZXRTdGF0aW9uU3RhdGUoc3RhdGlvbklEKSB7XG4gICAgZm9yIChjb25zdCBzdGF0aW9uIG9mIHRoaXMuc3RhdGUuc3RhdGlvbnMpIHtcbiAgICAgIGlmIChzdGF0aW9uLmlkID09PSBzdGF0aW9uSUQpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRpb247XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0U3RhdGlvblR5cGVzKCkge1xuICAgIGNvbnN0IHR5cGVzID0gbmV3IFNldCgpO1xuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiB0aGlzLnN0YXRlLnN0YXRpb25zKSB7XG4gICAgICB0eXBlcy5hZGQoc3RhdGlvbi50eXBlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0eXBlcyk7XG4gIH1cblxuICBnZXRDb21tYW5kKGNvbW1hbmROYW1lKSB7XG4gICAgaWYgKHRoaXMuY29tbWFuZHNbY29tbWFuZE5hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbW1hbmRzW2NvbW1hbmROYW1lXS5kb0NhbGxiYWNrO1xuICAgIH1cbiAgICB0aHJvdyBFcnJvcihgQ2FsbCB0byBpbnZhbGlkIGNvbW1hbmQgJHtjb21tYW5kTmFtZX1gKTtcbiAgfVxuXG4gIGdldFZpc2libGVTdGF0aW9ucygpIHtcbiAgICBjb25zdCBhbnN3ZXIgPSBbXTtcblxuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiB0aGlzLnN0YXRlLnN0YXRpb25zKSB7XG4gICAgICBpZiAoKHRoaXMuc3RhdGUudmlzaWJsZVR5cGUgPT09ICcnIHx8IHN0YXRpb24udHlwZSA9PT0gdGhpcy5zdGF0ZS52aXNpYmxlVHlwZSkgJiZcbiAgICAgICAgICAodGhpcy5zdGF0ZS52aXNpYmxlU3RhdGUgPT09ICcnIHx8IHN0YXRpb24uc3RhdGUgPT09IHRoaXMuc3RhdGUudmlzaWJsZVN0YXRlKSkge1xuICAgICAgICBhbnN3ZXIucHVzaChzdGF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYW5zd2VyO1xuICB9XG5cbiAgYXR0YWNoQ29uZmlybWF0aW9uKHRleHQsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICBib290Ym94LmRpYWxvZyh7XG4gICAgICAgIG1lc3NhZ2U6IHRleHQsXG4gICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICB3YXJuaW5nOiB7XG4gICAgICAgICAgICBsYWJlbDogJ0NvbmZpcm0nLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuLXdhcm5pbmcnLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLmJpbmQodGhpcywgLi4uYXJncyksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjYW5jZWw6IHtcbiAgICAgICAgICAgIGxhYmVsOiAnQ2FuY2VsJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bi1kZWZhdWx0JyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGluaXRDb21tYW5kcygpIHtcbiAgICB0aGlzLmNvbW1hbmRzID0ge1xuICAgICAgJ3N0YXRpb25zLWFsbC1zdGFydCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RhcnRBbGwuYmluZCh0aGlzKSxcbiAgICAgICAgdGl0bGU6ICdzdGFydCBhbGwgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1hbGwtc3RvcCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RvcEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3N0b3AgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtYWxsLXNlbGVjdCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc2VsZWN0QWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc2VsZWN0IGFsbCBzdGF0aW9ucycsXG4gICAgICAgIGNvbmZpcm06IGZhbHNlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy1hbGwtZGVzZWxlY3QnOiB7XG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLmRlc2VsZWN0QWxsLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnZGVzZWxlY3QgYWxsIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgJ3N0YXRpb25zLXNlbGVjdGVkLXN0YXJ0Jzoge1xuICAgICAgICBjYWxsYmFjazogdGhpcy5zdGFydFNlbGVjdGVkLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RhcnQgdGhlIHNlbGVjdGVkIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAnc3RhdGlvbnMtc2VsZWN0ZWQtc3RvcCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc3RvcFNlbGVjdGVkLmJpbmQodGhpcyksXG4gICAgICAgIHRpdGxlOiAnc3RvcCB0aGUgc2VsZWN0ZWQgc3RhdGlvbnMnLFxuICAgICAgICBjb25maXJtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdzdGF0aW9ucy12aXNpYmxlLXNlbGVjdCc6IHtcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuc2VsZWN0QWxsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICB0aXRsZTogJ3NlbGVjdCB2aXNpYmxlIHN0YXRpb25zJyxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXModGhpcy5jb21tYW5kcykpIHtcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSB0aGlzLmNvbW1hbmRzW25hbWVdO1xuICAgICAgaWYgKGNvbW1hbmQuY29uZmlybSkge1xuICAgICAgICB0aGlzLmNvbW1hbmRzW25hbWVdLmRvQ2FsbGJhY2sgPSB0aGlzLmF0dGFjaENvbmZpcm1hdGlvbihcbiAgICAgICAgICBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvICR7Y29tbWFuZC50aXRsZX0/YCxcbiAgICAgICAgICBjb21tYW5kLmNhbGxiYWNrXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbW1hbmRzW25hbWVdLmRvQ2FsbGJhY2sgPSBjb21tYW5kLmNhbGxiYWNrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFsbFN0YXRpb25JRHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGlvbklEcyh0aGlzLnN0YXRlLnN0YXRpb25zKTtcbiAgfVxuXG4gIHN0YXRpb25JRHMoc3RhdGlvbnMpIHtcbiAgICBjb25zdCBpZHMgPSBuZXcgU2V0KCk7XG5cbiAgICBmb3IgKGNvbnN0IHN0YXRpb24gb2Ygc3RhdGlvbnMpIHtcbiAgICAgIGlkcy5hZGQoc3RhdGlvbi5pZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlkcztcbiAgfVxuXG4gIHNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0aW9uOiB0aGlzLmFsbFN0YXRpb25JRHMoKSB9KTtcbiAgfVxuXG4gIHNlbGVjdEFsbFZpc2libGUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogdGhpcy5zdGF0aW9uSURzKHRoaXMuZ2V0VmlzaWJsZVN0YXRpb25zKCkpIH0pO1xuICB9XG5cbiAgZGVzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGlvbjogbmV3IFNldCgpIH0pO1xuICB9XG5cbiAgc2VsZWN0VG9nZ2xlKGlkKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0aW9uLmhhcyhpZCkpIHtcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmRlbGV0ZShpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmFkZChpZCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3Rpb246IHRoaXMuc3RhdGUuc2VsZWN0aW9uIH0pO1xuICB9XG5cbiAgc3RvcFN0YXRpb25zKHN0YXRpb25JRHMpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9zdGF0aW9ucy5qc29uJyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgYWN0aW9uOiAnc3RvcCcsXG4gICAgICAgIHN0YXRpb25JRHM6IEFycmF5LmZyb20oc3RhdGlvbklEcyksXG4gICAgICB9KSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAoKSA9PiBjb25zb2xlLmxvZygnU3RhcnRlZCcpLFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICB9XG5cbiAgc3RvcFNlbGVjdGVkKCkge1xuICAgIHRoaXMuc3RvcFN0YXRpb25zKHRoaXMuc3RhdGUuc2VsZWN0aW9uKTtcbiAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gIH1cblxuICBzdG9wQWxsKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3BTdGF0aW9ucyh0aGlzLmFsbFN0YXRpb25JRHMoKSk7XG4gIH1cblxuICBzdGFydFN0YXRpb25zKHN0YXRpb25JRHMpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9zdGF0aW9ucy5qc29uJyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgYWN0aW9uOiAnc3RhcnQnLFxuICAgICAgICBzdGF0aW9uSURzOiBBcnJheS5mcm9tKHN0YXRpb25JRHMpLFxuICAgICAgfSksXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKCkgPT4gY29uc29sZS5sb2coJ1N0YXJ0ZWQnKSxcbiAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXJ0U2VsZWN0ZWQoKSB7XG4gICAgdGhpcy5zdGFydFN0YXRpb25zKHRoaXMuc3RhdGUuc2VsZWN0aW9uKTtcbiAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gIH1cblxuICBzdGFydEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFydFN0YXRpb25zKHRoaXMuYWxsU3RhdGlvbklEcygpKTtcbiAgfVxuXG4gIGNoYW5nZUFwcFNlbGVjdGVkKGFwcCkge1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvYXBpL3N0YXRpb25zLmpzb24nLFxuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBhY3Rpb246ICdjaGFuZ2VfYXBwJyxcbiAgICAgICAgc3RhdGlvbklEczogQXJyYXkuZnJvbSh0aGlzLnN0YXRlLnNlbGVjdGlvbiksXG4gICAgICAgIGFwcCxcbiAgICAgIH0pLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6ICgpID0+IHt9LFxuICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpLFxuICAgIH0pO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHBvbGxMb29wKCkge1xuICAgIGNvbnN0IGxvb3AgPSAoKSA9PiB7XG4gICAgICB0aGlzLnBvbGxTZXJ2ZXIoKS50aGVuKCgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChsb29wLCA1MDApO1xuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KGxvb3AsIDUwMCk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGxvb3AoKTtcbiAgfVxuXG4gIHBvbGxTZXJ2ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvcG9sbC5qc29uJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGxhc3RTZWVuOiB0aGlzLnVwZGF0ZUlELFxuICAgICAgICB9LFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIHRpbWVvdXQ6IDMwMDAwLFxuICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhLnN0YXRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSUQgPSBkYXRhLnVwZGF0ZUlEO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdGlvbnM6IGRhdGEuc3RhdGlvbnN9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKHhociwgc3RhdHVzLCBlcnIpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMucHJvcHMudXJsLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHN0YXRpb25zID0gW107XG4gICAgY29uc3QgYWN0aW9ucyA9IFtdO1xuXG4gICAgdGhpcy5nZXRWaXNpYmxlU3RhdGlvbnMoKS5mb3JFYWNoKChzdGF0aW9uKSA9PiBzdGF0aW9ucy5wdXNoKFxuICAgICAgPFN0YXRpb25cbiAgICAgICAgc3RhdGlvbj17c3RhdGlvbn1cbiAgICAgICAga2V5PXtzdGF0aW9uLmlkfVxuICAgICAgICBzZWxlY3RlZD17dGhpcy5zdGF0ZS5zZWxlY3Rpb24uaGFzKHN0YXRpb24uaWQpfVxuICAgICAgICBvbkNsaWNrU3RhdGlvbj17dGhpcy5zZWxlY3RUb2dnbGV9XG4gICAgICAvPlxuICAgICkpO1xuXG4gICAgY29uc3QgY291bnRzID0ge307XG4gICAgdGhpcy5zdGF0ZS5zdGF0aW9ucy5mb3JFYWNoKChzdGF0aW9uKSA9PiB7XG4gICAgICBpZiAoIWNvdW50cy5oYXNPd25Qcm9wZXJ0eShzdGF0aW9uLnN0YXRlKSkge1xuICAgICAgICBjb3VudHNbc3RhdGlvbi5zdGF0ZV0gPSAwO1xuICAgICAgfVxuICAgICAgY291bnRzW3N0YXRpb24uc3RhdGVdKys7XG4gICAgfSk7XG5cbiAgICBjb25zdCBzZWxlY3RlZENvdW50ID0gdGhpcy5zdGF0ZS5zZWxlY3Rpb24uc2l6ZTtcbiAgICBjb25zdCBhbGxTZWxlY3RlZCA9IChzZWxlY3RlZENvdW50ID09PSB0aGlzLnN0YXRlLnN0YXRpb25zLmxlbmd0aCk7XG4gICAgY29uc3Qgc2VsZWN0QWxsQ2xhc3NlcyA9XG4gICAgICBgYnRuIGJ0bi1kZWZhdWx0ICR7YWxsU2VsZWN0ZWQgPyAnIGRpc2FibGVkJyA6ICcnfWA7XG5cbiAgICBjb25zdCBkZXNlbGVjdEFsbENsYXNzZXMgPVxuICAgICAgYGJ0biBidG4tZGVmYXVsdCAke3NlbGVjdGVkQ291bnQgPT09IDAgPyAnIGRpc2FibGVkJyA6ICcnfWA7XG5cbiAgICBjb25zdCBzdGF0aW9uV29yZCA9IHNlbGVjdGVkQ291bnQgPT09IDEgPyAnc3RhdGlvbicgOiAnc3RhdGlvbnMnO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzdGF0aW9uU3RhdGVGaWx0ZXJcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8QnV0dG9uRmlsdGVyXG4gICAgICAgICAgb3B0aW9ucz17WydvbicsICdvZmYnLCAnYnVzeScsICdlcnJvciddfVxuICAgICAgICAgIGNvdW50cz17Y291bnRzfVxuICAgICAgICAgIGFsbFRleHQ9XCJBbGwgc3RhdGVzXCJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52aXNpYmxlU3RhdGV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhvcHRpb24pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2aXNpYmxlU3RhdGU6IG9wdGlvbiB9KTtcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGFjdGlvbnMucHVzaChcbiAgICAgIDxkaXYga2V5PVwic3RhdGlvblR5cGVGaWx0ZXJcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8QnV0dG9uRmlsdGVyXG4gICAgICAgICAgb3B0aW9ucz17dGhpcy5nZXRTdGF0aW9uVHlwZXMoKX1cbiAgICAgICAgICBhbGxUZXh0PVwiQWxsIHR5cGVzXCJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52aXNpYmxlVHlwZX1cbiAgICAgICAgICBvbkNoYW5nZT17KG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZpc2libGVUeXBlOiBvcHRpb24gfSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInNlbGVjdGVkQ291bnRcIiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lLXNlcGFyYXRvclwiID48L2Rpdj5cbiAgICAgICAgPGI+e3RoaXMuc3RhdGUuc2VsZWN0aW9uLnNpemV9IHtzdGF0aW9uV29yZH0gc2VsZWN0ZWQ8L2I+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0QWN0aW9uc1wiPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBjbGFzc05hbWU9e2Rlc2VsZWN0QWxsQ2xhc3Nlc31cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZ2V0Q29tbWFuZCgnc3RhdGlvbnMtYWxsLWRlc2VsZWN0Jyl9XG4gICAgICAgICAgPkRlc2VsZWN0PC9hPiZuYnNwO1xuICAgICAgICAgIDxhXG4gICAgICAgICAgICBjbGFzc05hbWU9e3NlbGVjdEFsbENsYXNzZXN9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLXZpc2libGUtc2VsZWN0Jyl9XG4gICAgICAgICAgPlNlbGVjdCBhbGw8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGNvbnN0IG5vU2VsZWN0aW9uRGlzYWJsZSA9IChzZWxlY3RlZENvdW50ID09PSAwID8gJyBkaXNhYmxlZCcgOiAnJyk7XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cInN0YXJ0U3RvcFBhbmVsXCIgY2xhc3NOYW1lPXtgYWN0aW9uLXBhbmUke25vU2VsZWN0aW9uRGlzYWJsZX1gfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZS1zZXBhcmF0b3JcIiA+PC9kaXY+XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi1zdWNjZXNzJHtub1NlbGVjdGlvbkRpc2FibGV9YH1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldENvbW1hbmQoJ3N0YXRpb25zLXNlbGVjdGVkLXN0YXJ0Jyl9XG4gICAgICAgID48aSBjbGFzc05hbWU9XCJmYSBmYS1wbGF5XCIgLz4mbmJzcDsmbmJzcDtTdGFydCBTZWxlY3RlZDwvYT5cbiAgICAgICAgJm5ic3A7XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi1kYW5nZXIke25vU2VsZWN0aW9uRGlzYWJsZX1gfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZ2V0Q29tbWFuZCgnc3RhdGlvbnMtc2VsZWN0ZWQtc3RvcCcpfVxuICAgICAgICA+PGkgY2xhc3NOYW1lPVwiZmEgZmEtc3RvcFwiIC8+Jm5ic3A7Jm5ic3A7U3RvcCBTZWxlY3RlZDwvYT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBsZXQgc2VsZWN0ZWRBcmVTYW1lVHlwZSA9IHRydWU7XG4gICAgbGV0IGxhc3RUeXBlID0gbnVsbDtcbiAgICBmb3IgKGNvbnN0IHNlbGVjdGVkSUQgb2YgdGhpcy5zdGF0ZS5zZWxlY3Rpb24pIHtcbiAgICAgIGlmIChsYXN0VHlwZSA9PT0gbnVsbCkge1xuICAgICAgICBsYXN0VHlwZSA9IHRoaXMuZ2V0U3RhdGlvblN0YXRlKHNlbGVjdGVkSUQpLnR5cGU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5nZXRTdGF0aW9uU3RhdGUoc2VsZWN0ZWRJRCkudHlwZSAhPT0gbGFzdFR5cGUpIHtcbiAgICAgICAgc2VsZWN0ZWRBcmVTYW1lVHlwZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYWxsU2VsZWN0ZWRPbiA9IHRydWU7XG4gICAgZm9yIChjb25zdCBzZWxlY3RlZElEIG9mIHRoaXMuc3RhdGUuc2VsZWN0aW9uKSB7XG4gICAgICBpZiAodGhpcy5nZXRTdGF0aW9uU3RhdGUoc2VsZWN0ZWRJRCkuc3RhdGUgIT09ICdvbicpIHtcbiAgICAgICAgYWxsU2VsZWN0ZWRPbiA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjYW5DaGFuZ2VBcHAgPSAoYWxsU2VsZWN0ZWRPbiAmJiAoc2VsZWN0ZWRDb3VudCA+IDApICYmIHNlbGVjdGVkQXJlU2FtZVR5cGUpO1xuXG4gICAgbGV0IGFwcGxpY2F0aW9ucyA9IFtdO1xuICAgIGZvciAoY29uc3Qgc3RhdGlvbiBvZiB0aGlzLnN0YXRlLnN0YXRpb25zKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3Rpb24uaGFzKHN0YXRpb24uaWQpKSB7XG4gICAgICAgIGFwcGxpY2F0aW9ucyA9IHN0YXRpb24ucG9zc2libGVfYXBwcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhY3Rpb25zLnB1c2goXG4gICAgICA8ZGl2IGtleT1cImFwcFNlbGVjdFwiIGNsYXNzTmFtZT1cImFjdGlvbi1wYW5lXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmUtc2VwYXJhdG9yXCIgPjwvZGl2PlxuICAgICAgICA8QXBwU2VsZWN0XG4gICAgICAgICAgYXBwbGljYXRpb25zPXtjYW5DaGFuZ2VBcHAgPyBhcHBsaWNhdGlvbnMgOiBbXX1cbiAgICAgICAgICBkaXNhYmxlZD17IWNhbkNoYW5nZUFwcH1cbiAgICAgICAgICBhbGxvd0JsYW5rXG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuYXR0YWNoQ29uZmlybWF0aW9uKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHRoZSBhcHBsaWNhdGlvbj8nLFxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VBcHBTZWxlY3RlZCl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgYWN0aW9ucy5wdXNoKFxuICAgICAgPGRpdiBrZXk9XCJzaG93TG9nXCIgY2xhc3NOYW1lPVwiYWN0aW9uLXBhbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcGFuZS1zZXBhcmF0b3JcIiA+PC9kaXY+XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCJcbiAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5sb2dWaWV3ZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhpcy5sb2dWaWV3ZXIub3Blbk1vZGFsKCk7XG4gICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9sb2cuanNvbicsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvZzogZGF0YS5lbnRyaWVzLnJldmVyc2UoKSB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiAoeGhyLCBzdGF0dXMsIGVycikgPT4gY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH19XG4gICAgICAgID5TaG93IGxvZzwvYT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNiBwYW5lLXN0YXRpb25zXCI+XG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJkYXNoYm9hcmRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwic3RhdGlvbkxpc3RcIiBjbGFzc05hbWU9XCJwYW5lbC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAge3N0YXRpb25zfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNiBwYW5lLWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgPGRpdiBpZD1cImRhc2hib2FyZEFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICB7YWN0aW9uc31cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxMb2dWaWV3ZXIgbG9nPXt0aGlzLnN0YXRlLmxvZ30gcmVmPXsoYykgPT4geyB0aGlzLmxvZ1ZpZXdlciA9IGM7IH19IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkRhc2hib2FyZC5wcm9wVHlwZXMgPSB7XG4gIHVybDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ1ZpZXdlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGZvcm1hdFRpbWUoaXNvVGltZSkge1xuICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZShpc29UaW1lKTtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgeWVzdGVyZGF5ID0gbmV3IERhdGUoKTtcbiAgICB5ZXN0ZXJkYXkuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAxKTtcbiAgICBsZXQgZGF5ID0gJyc7XG5cbiAgICBpZiAodG9kYXkuZ2V0TW9udGgoKSA9PT0gdGltZS5nZXRNb250aCgpICYmXG4gICAgICB0b2RheS5nZXRGdWxsWWVhcigpID09PSB0aW1lLmdldEZ1bGxZZWFyKCkgJiZcbiAgICAgIHRvZGF5LmdldERhdGUoKSA9PT0gdGltZS5nZXREYXRlKCkpIHtcbiAgICAgIGRheSA9ICdUb2RheSc7XG4gICAgfSBlbHNlIGlmICh5ZXN0ZXJkYXkuZ2V0TW9udGgoKSA9PT0gdGltZS5nZXRNb250aCgpICYmXG4gICAgICB5ZXN0ZXJkYXkuZ2V0RnVsbFllYXIoKSA9PT0gdGltZS5nZXRGdWxsWWVhcigpICYmXG4gICAgICB5ZXN0ZXJkYXkuZ2V0RGF0ZSgpID09PSB0aW1lLmdldERhdGUoKSkge1xuICAgICAgZGF5ID0gJ1llc3RlcmRheSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRheSA9IGAke3RpbWUuZ2V0RnVsbFllYXIoKX0tJHt0aW1lLmdldE1vbnRoKCl9LSR7dGltZS5nZXREYXRlKCl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7ZGF5fSAke3RpbWUuZ2V0SG91cnMoKX06JHt0aW1lLmdldE1pbnV0ZXMoKX06JHt0aW1lLmdldFNlY29uZHMoKX1gO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5tb2RhbERJViA9IG51bGw7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsICgpID0+IHsgdGhpcy5oYW5kbGVSZXNpemUoKTsgfSk7XG4gICAgJCh0aGlzLm1vZGFsRElWKS5vbignc2hvdy5icy5tb2RhbCcsICgpID0+IHsgdGhpcy5oYW5kbGVSZXNpemUoKTsgfSk7XG4gIH1cblxuICBvcGVuTW9kYWwoKSB7XG4gICAgaWYgKHRoaXMubW9kYWxESVYgIT09IG51bGwpIHtcbiAgICAgICQodGhpcy5tb2RhbERJVikubW9kYWwoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVSZXNpemUoKSB7XG4gICAgY29uc3QgJG1vZGFsID0gJCh0aGlzLm1vZGFsRElWKTtcbiAgICBjb25zdCBtb2RhbEhlYWRlckhlaWdodCA9IDU2O1xuICAgIGNvbnN0IG1vZGFsTWFyZ2luID0gMzA7XG4gICAgY29uc3QgbW9kYWxCb3JkZXIgPSAxO1xuXG4gICAgY29uc3QgYm9keUhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIChtb2RhbEhlYWRlckhlaWdodCArIG1vZGFsTWFyZ2luICogMiArIG1vZGFsQm9yZGVyICogMik7XG4gICAgJG1vZGFsLmZpbmQoJy5tb2RhbC1ib2R5JykuY3NzKHsgbWF4SGVpZ2h0OiBib2R5SGVpZ2h0IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHJvd0NsYXNzZXMgPSB7XG4gICAgICBlcnJvcjogJ2RhbmdlcicsXG4gICAgICB3YXJuaW5nOiAnd2FybmluZycsXG4gICAgfTtcblxuICAgIGNvbnN0IGVudHJpZXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGxvZ0VudHJ5IG9mIHRoaXMucHJvcHMubG9nKSB7XG4gICAgICBjb25zdCByb3dDbGFzcyA9IHJvd0NsYXNzZXNbbG9nRW50cnkudHlwZV0gIT09IHVuZGVmaW5lZCA/IHJvd0NsYXNzZXNbbG9nRW50cnkudHlwZV0gOiAnJztcblxuICAgICAgZW50cmllcy5wdXNoKFxuICAgICAgICA8dHIga2V5PXtsb2dFbnRyeS5pZH0gY2xhc3NOYW1lPXtyb3dDbGFzc30+XG4gICAgICAgICAgPHRkPntMb2dWaWV3ZXIuZm9ybWF0VGltZShsb2dFbnRyeS50aW1lKX08L3RkPlxuICAgICAgICAgIDx0ZD57bG9nRW50cnkuc3RhdGlvbl9uYW1lfTwvdGQ+XG4gICAgICAgICAgPHRkPntsb2dFbnRyeS5tZXNzYWdlfTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGUgbG9nVmlld2VyLW1vZGFsXCIgdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiByZWY9eyhjKSA9PiB7IHRoaXMubW9kYWxESVYgPSBjOyB9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2cgbW9kYWwtbGdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+e3RoaXMucHJvcHMudGl0bGV9PC9oND5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1maXhlZCB0YWJsZS1jb25kZW5zZWRcIj5cbiAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5UaW1lPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlN0YXRpb248L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+TWVzc2FnZTwvdGg+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIHtlbnRyaWVzfVxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkxvZ1ZpZXdlci5wcm9wVHlwZXMgPSB7XG4gIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBsb2c6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICB0aW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgc3RhdGlvbl9pZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHN0YXRpb25fbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIG1lc3NhZ2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgfSlcbiAgKSxcbn07XG5cbkxvZ1ZpZXdlci5kZWZhdWx0UHJvcHMgPSB7XG4gIGxvZzogW10sXG4gIHRpdGxlOiAnRXZlbnQgTG9nJyxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4vZGFzaGJvYXJkLmpzeCc7XG5cbndpbmRvdy5kYXNoYm9hcmQgPSBudWxsO1xuXG4vLyBvblJlYWR5XG4kKCgpID0+IHtcbiAgd2luZG93LmRhc2hib2FyZCA9IFJlYWN0RE9NLnJlbmRlcihcbiAgICA8RGFzaGJvYXJkIHVybD1cIi9hcGkvc3RhdGlvbnMuanNvblwiIC8+LFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXNoYm9hcmRDb250YWluZXInKVxuICApO1xuXG4gIC8vIEluc3RhbGwgY2xpY2sgaGFuZGxlcnMgaW4gZXh0ZXJuYWwgbWVudXMgYW5kIGJ1dHRvbnNcbiAgJCgnW2RhdGEtY29tbWFuZF0nKS5lYWNoKGZ1bmN0aW9uIHNldENsaWNrSGFuZGxlcigpIHtcbiAgICAkKHRoaXMpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgd2luZG93LmRhc2hib2FyZC5nZXRDb21tYW5kKCQodGhpcykuYXR0cignZGF0YS1jb21tYW5kJykpKCk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVDbGljaygpIHtcbiAgICB0aGlzLnByb3BzLm9uQ2xpY2tTdGF0aW9uKHRoaXMucHJvcHMuc3RhdGlvbi5pZCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgc3RhdGlvbkNsYXNzZXMgPSBbXG4gICAgICAnc3RhdGlvbicsXG4gICAgICBgc3RhdGlvbi1zdGF0ZS0ke3RoaXMucHJvcHMuc3RhdGlvbi5zdGF0ZX1gLFxuICAgICAgYHN0YXRpb24tdHlwZS0ke3RoaXMucHJvcHMuc3RhdGlvbi50eXBlfWAsXG4gICAgXTtcblxuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkKSB7XG4gICAgICBzdGF0aW9uQ2xhc3Nlcy5wdXNoKCdzdGF0aW9uLXNlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e3RoaXMucHJvcHMuc3RhdGlvbi5pZH1cbiAgICAgICAgY2xhc3NOYW1lPXtzdGF0aW9uQ2xhc3Nlcy5qb2luKCcgJyl9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1zdGF0ZS1saWdodFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24taWNvblwiPlxuICAgICAgICAgIDxpbWcgYWx0PXt0aGlzLnByb3BzLnN0YXRpb24uYXBwfSBzcmM9e3RoaXMucHJvcHMuc3RhdGlvbi5pY29ufSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0aW9uLW5hbWVcIj57dGhpcy5wcm9wcy5zdGF0aW9uLm5hbWV9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi10eXBlXCI+e3RoaXMucHJvcHMuc3RhdGlvbi50eXBlfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXRpb24tYXBwXCI+e3RoaXMucHJvcHMuc3RhdGlvbi5hcHB9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdGlvbi1zdGF0dXNcIj57dGhpcy5wcm9wcy5zdGF0aW9uLnN0YXR1c308L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuU3RhdGlvbi5wcm9wVHlwZXMgPSB7XG4gIHN0YXRpb246IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzdGF0ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0eXBlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN0YXR1czogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcHA6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWNvbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBvbkNsaWNrU3RhdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG59O1xuIl19
