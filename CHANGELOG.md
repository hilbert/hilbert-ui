# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- Added tests for the HTTP API layer
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