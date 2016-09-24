# Glossary

**ui client**: Client-side HTML/CSS/JS front end. It's a single-page 
  application that uses the React framework.

**ui server**: Server daemon that tracks the state of stations and 
the operations performed on them. Provides a web service interface to
the ui-client.

**hilbert-cli**: Hilbert CLI for operating with stations. It provides
operations for changing the state of stations, initializing them, 
destroying them, etc.

**station**: A computer system controlled and monitored by hilbert.
Stations run applications deployed through containers.
 
**MKLivestatus**: A service that provides a query-based interface to 
the nagios system that monitors the station.