export default interface SQLQueryBuilder {
    /**
     * Select table and fields
     * @param table
     * @param fields
     */
    select(table: string, fields: Array<string>)
  
    /**
     * Conditions
     * @param field
     * @param value
     * @param operator
     */
    where(field: string, value: string, operator: string)
  
    /**
     * Get results
     */
    get()
  }
  