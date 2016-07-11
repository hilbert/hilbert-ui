const Promise = require("bluebird");
/**
 * Generates MK Livestatus queries
 *
 * http://mathias-kettner.com/checkmk_livestatus.html
 */
export default class MKLivestatusQuery {

  /**
   * Constructor
   * @param {MKLivestatusConnector} connector
   */
  constructor(connector) {
    this.dockAppConnector = connector;
    this.tableName = null;
    this.queryColumns = [];
    this.queryColumnAliases = null;
    this.queryFilters = [];
  }

  /**
   * Inits a GET query
   * @param {String} tableName
   * @returns {MKLivestatusQuery}
   */
  get(tableName) {
    this.tableName = tableName;
    return this;
  }

  /**
   * Specifies columns to return
   *
   * If this method is never called the query will return all columns
   * If it's called several times the columns will be added
   *
   * @param {Array|String} columnList
   * @returns {MKLivestatusQuery}
   */
  columns(columnList) {
    this.queryColumns = this.queryColumns.concat(columnList);

    return this;
  }

  /**
   * Specifies aliases to column names
   *
   * An array with one alias per queries columned must be provided.
   * @param {Array} columnAliases
   * @returns {MKLivestatusQuery}
   */
  asColumns(columnAliases) {
    this.queryColumnAliases = columnAliases;

    return this;
  }

  /**
   * Adds a filter condition
   *
   * This class does not yet support disjunctions (OR)
   *
   * @param {String} condition
   * @returns {MKLivestatusQuery}
   */
  filter(condition) {
    this.queryFilters.push(condition);

    return this;
  }

  /**
   * Converts the query to a string command
   * @returns {string}
   */
  toString() {
    const output = [];
    output.push(`GET ${this.tableName}`);

    if (this.queryColumns.length > 0) {
      output.push(`Columns: ${this.queryColumns.join(' ')}`);
    }

    for (const filter of this.queryFilters) {
      output.push(`Filter: ${filter}`);
    }

    output.push('OutputFormat: json');
    output.push('ColumnHeaders: on');

    return output.join('\n');
  }

  /**
   * Executes the query
   * @returns {Promise}
   * @resolve {Array} Response rows
   * @reject {Error}
   */
  execute() {
    return this.dockAppConnector.sendCommand(this.toString()).then((answer) => {
      return this.rowsToObjects(JSON.parse(answer));
    });
  }


  /**
   * Converts an array of row arrays to an array of objects
   * Uses the first row as a list of names.
   * @private
   *
   * @param rows {Array}
   * @returns {Array}
   */
  rowsToObjects(rows) {
    if (rows.length < 2) {
      return rows;
    }

    const firstRow = rows.slice(0, 1)[0];
    const nameRow = this.queryColumnAliases !== null ? this.queryColumnAliases : firstRow;

    const rest = rows.slice(1);
    const objects = [];
    for (const row of rest) {
      const rowObject = {};
      for (let i = 0; (i !== nameRow.length) && (i < 100); i++) {
        rowObject[nameRow[i]] = row[i];
      }
      objects.push(rowObject);
    }
    return objects;
  }
}
