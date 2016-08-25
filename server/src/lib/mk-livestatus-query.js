/**
 * Generates MK Livestatus queries
 *
 * This class is responsible for formatting the query and parsing
 * the response, but not with the actual communication. The connector
 * that handles communication is passed on creation.
 *
 * http://mathias-kettner.com/checkmk_livestatus.html
 */
export default class MKLivestatusQuery {

  /**
   * Constructor
   * @param {MKLivestatusConnector} connector
   */
  constructor(connector) {
    this.connector = connector;
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
    return this.connector
      .sendCommand(this.toString())
      .then((response) => this.parseResponse(response));
  }

  /**
   * Parses the response arrays to an array of objects
   * Uses the first row as a list of names.
   * @private
   *
   * @param response {String}
   * @returns {Array}
   */
  parseResponse(response) {
    const rows = JSON.parse(response);

    if (!rows instanceof Array) {
      throw new Error(`Unable to parse MKLivestatus response: ${response}`);
    }

    if (rows.length < 1) {
      throw new Error('Empty MKLivestatus response');
    }

    const firstRow = rows.slice(0, 1)[0];
    const nameRow = this.queryColumnAliases !== null ? this.queryColumnAliases : firstRow;

    for (const columnName of firstRow) {
      if (this.queryColumns.indexOf(columnName) === -1) {
        throw new Error(
          `MKLivestatus response includes unexpected column ${columnName} (${firstRow})`
        );
      }
    }
    for (const columnName of this.queryColumns) {
      if (firstRow.indexOf(columnName) === -1) {
        throw new Error(`MKLivestatus response missing column ${columnName} (${firstRow})`);
      }
    }

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
