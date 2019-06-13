/**
 * Helper definitions for interfacing with Nagios
 * https://www.nagios.com
 */

class Nagios {

}

// Constant values obtained from
// https://github.com/NagiosEnterprises/nagioscore/
// include/common.h

// Host states
Nagios.HostState = {
  UP: 0,
  DOWN: 1,
  UNREACHABLE: 2,
};

Nagios.ServiceState = {
  OK: 0,
  WARNING: 1,
  CRITICAL: 2,
  UNKNOWN: 3,
};

Nagios.ReturnCode = Nagios.ServiceState;

Nagios.StateType = {
  SOFT: 0,
  HARD: 1,
};

module.exports = Nagios;
