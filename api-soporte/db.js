const mssql = require('mssql/msnodesqlv8');

const config = {
  connectionString: 'Driver={SQL Server Native Client 11.0};Server=localhost\\SQLEXPRESS;Database=soporte_db;Trusted_Connection=yes;'
};

const poolPromise = mssql.connect(config)
  .then(pool => {
    console.log('Conectado exitosamente a SQL Server (soporte_db)');
    return pool;
  })
  .catch(err => {
    // Si no encuentra el Native Client 11.0, intenta con el driver estándar de SQL Server
    const altConfig = {
      connectionString: 'Driver={SQL Server};Server=localhost\\SQLEXPRESS;Database=soporte_db;Trusted_Connection=yes;'
    };
    return mssql.connect(altConfig)
      .then(pool => {
        console.log('Conectado exitosamente a SQL Server (soporte_db)');
        return pool;
      })
      .catch(altErr => {
        console.error('Error al conectar con SQL Server:', altErr);
      });
  });

module.exports = {
  mssql,
  poolPromise
};