# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [v0.15.1] 2018-04-02
### Fixed
- Fixes bug that prevented receiving state from CheckMK

## [v0.15] 2018-04-02
### Added
- Ignore stale app data from CheckMK

## [v0.14] 2018-04-02
### Added
- Adds a System menu to start and stop stations
- Adds a Test menu to simulate errors in test mode
- Adds notifications to the client
- Stations now temporarily lock after certain errors
- Station operations now time out after a configurable amount of time
- Adds the 'operation_timeout' and 'error_lock_time' config keys.
### Changed
- The server now properly handles a number of error conditions, specially during operations
- The client "Event log" is now called "Latest notifications"

## [v0.13.1] 2018-03-04
### Added
- Adds schema validation to the HTTP API

## [v0.13] 2018-02-20
### Added
- Added support for the new Hilbert CLI configuration format
- Added /applications and /station_profiles entry points to the API
- Shows application and station names instead of IDs in the the client
- Uses station profiles instead of type for filtering in the client
- Added API documentation in Swagger / OpenAPI format
### Changed
- Call Hilbert CLI directly instead of through wrapper scripts


## [v0.12.1] 2018-01-30
### Fixed
- Presets are deselected after deleting them

## [v0.12] 2018-01-30
### Added
- Added a header bar to the UI
### Changed
- Presets were changed to always map all stations instead of subsets

## [v0.11.1] 2018-01-28
### Fixed
- Removes internal properties from the station data sent through the HTTP API

## [v0.11] 2018-01-28
### Added
- Added support for Presets (named station->app mappings)
- Added new API for modules that add functionality to the server

## [v0.10] 2016-12-06
### Added
- CLI program (hilbert-http-api) that can list, start and stop stations.
- Added tests for the HTTP API layer
- Added interface to the Test Backend for defining test data programmatically
- Added LICENSE and NOTICE
- Added Travis CI configuration
### Changed
- Makes delays in test mode optional
### Fixed
- HTTP Api returns error instead of throwing exceptions when required
  arguments are missing.

## [v0.9] 2016-09-30
### Added
- Documented HTTP API
- Test entry point with dummy test
### Changed
- New HTTP API in server

## [v0.8] 2016-09-24
### Changed
- The project was renamed to hilbert-ui.
- The client files were moved to the `client` directory.
- Updated documentation.

## [v0.7.1] 2016-09-17
### Added
- This changelog was added. Some version numbers don't perfectly adhere
  to semantic versioning (arguably) but things will improve from now on
  (hopefully).
- Added undocumented configuration keys to README.md

## [v0.7] 2016-08-30
### Added
- Adds a "Terminal log" button to each station in the UI and removes
  the previous external button. 

## [v0.6] 2016-08-28
### Added
- The UI shows the reason why a station is down (manual shutdown or 
unexpected)

## [v0.5.1] 2016-08-28
### Changed
- The internal STARTING station state is split into STARTING_STATION and
  STARTING_APP.
### Fixed
- Fixes bad handling of return codes in wrapping scripts.

## [v0.5] 2016-08-27
### Changed
- Interfaces to Dockapp through high level wrapping scripts.
- Changes to the output of 'debug' and 'verbose' level logs. 
### Fixed
- Fixes errors in parsing MKLivestatus responses.

## [v0.4.2] 2016-08-25
### Fixed
- Correctly parse station configurations that include comments.

## [v0.4.1] 2016-08-25
### Changed
- The console output respects the configured logging level. 

## [v0.4] 2016-08-21
### Added
- The output of scripts run on the server host can be viewed in a 
terminal window.
- Added various monitoring methods to the http API.

## [v0.3] 2016-08-15
### Added
- The output of scripts run on each terminal can be viewed in a terminal
window.
- A prominente message bar in the UI informs when the connection to the
server is lost.
- The client increases the poll time when it fails to contact the 
server.
- Added the `scriptConcurrency` configuration key to limit the 
concurrency of station operations.
- Support for overriding config options through the command line.
- Changed the format of the MKLivestatus connector configuration.
- Improved logging.
- Validates station configurations.
### Changed
- More granular internal tracking of station state. Replaced the 
BUSY state with STOPPING, STARTING and SWITCHING_APP. Added the UNKNOWN 
station state.
- The test mode now simulates dockapp and MKLivestatus separately.
- Changed to the Bluebird implementation of Promises
### Fixed
- Added error handling to MKLivestatus polling.
- Various minor fixes

## [v0.2.1] 2016-06-21
### Fixed
- Fixed a bug in the log where it failed to rotate correctly
- Other minor fixes

## [v0.2] 2016-06-20
### Added
- Added badges with station count in filter buttons of the UI
- Added Dockerfile to ease deployment 

## [v0.1] 2016-06-19
### Added
- First prototype with a simulated backend