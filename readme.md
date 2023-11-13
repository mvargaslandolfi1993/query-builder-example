# PostgreSQL Query Builder for Node.js and TypeScript

- This project is a Query Builder for PostgreSQL, designed to simplify the construction of SQL queries in TypeScript-based Node.js applications. While this example focuses on PostgreSQL, this Query Builder can be easily adapted to work with other relational databases like MySQL or SQLite.

### Example

```
const builder = new QueryBuilder();

// Example: Retrieving a user's information
const user = await builder
  .select('users', ['id', 'name'])
  .where('id', ${user_id})
  .get();
```

- This example showcases the fundamental features of the QueryBuilder, including the get, select, and where methods. It demonstrates how to construct a SELECT query to retrieve user information from the 'users' table. While this is a basic example, it's important to note that the QueryBuilder can be extended to include more advanced functionality as needed for your specific project requirements.




