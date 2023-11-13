import pg from 'pg'
import { DatabaseConnection } from '../Interfaces/DatabaseConnection'

export type QueryConfig = {
  // the raw query text
  text: String

  // an array of query parameters
  values?: Array<any>

  // name of the query - used for prepared statements
  name?: String
}

export default class PostgreSQLConnection implements DatabaseConnection {
  private client: typeof pg.Client

  constructor() {
    this.client = new pg.Client({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
      connectionTimeoutMillis: 3000,
      query_timeout: 4000,
    })
  }

  async connect(): Promise<void> {
    await this.client.connect()
  }

  async disconnect(): Promise<void> {
    await this.client.end()
  }

  async query<T>(query: T) {
    const result = await this.client.query(query)
    return result.rows
  }
}
