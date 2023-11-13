export interface DatabaseConnection {
    connect(): Promise<void>
    disconnect(): Promise<void>
    query<T>(query: T): Promise<any>
  }
  