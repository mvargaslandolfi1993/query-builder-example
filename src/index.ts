import { DatabaseConnection } from './Interfaces/DatabaseConnection'
import SQLQueryBuilder from './Interfaces/SQLQueryBuilder'
import PostgreSQLConnection, { QueryConfig } from './Providers/pg'

export default class QueryBuilder implements SQLQueryBuilder {
  /**
   * Only available connection is pg
   */
  private connections: Record<string, new () => DatabaseConnection> = {
    pg: PostgreSQLConnection,
  }

  /**
   * DB Client Connection
   */
  client: DatabaseConnection

  /**
   * Query config
   */
  query: QueryConfig

  constructor() {
    if (process.env.DB_CONNECTION !== 'pg') {
      throw new Error('Invalid db type')
    }

    const ConnectionClass = this.connections[process.env.DB_CONNECTION]

    this.client = new ConnectionClass()
  }

  /**
   * Reset query object
   */
  private reset() {
    this.query = {
      name: '',
      values: [],
      text: '',
    }
  }

  select(table: string, fields: string[]) {
    this.reset()

    const columns = fields.map((word) => word).join(', ')
    this.query.text = `SELECT ${columns} FROM ${table}`

    return this
  }

  where(field: string, value: string, operator = '=') {
    const statement = `WHERE ${field} ${operator} $${this.query.values.length + 1}`

    this.query.text = this.query.text + ' ' + statement

    this.query.values.push(value)

    return this
  }

  async get() {
    try {
      await this.client.connect()

      const result = await this.client.query(this.query)

      await this.client.disconnect()

      return result
    } catch (error) {
      return false
    }
  }
}
