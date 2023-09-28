// module.exports = {
//   development: {
//     client: 'pg',
//     connection: {
//       host: 'localhost',
//       user: 'postgres', 
//       password: 'test', 
//       database: 'The_Curse_of_the_Twins'
//     }
//   }
// };

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'trumpet.db.elephantsql.com',
      user: 'afccfent',
      password: '1IMhjWszVlyY5j-vqE29bgOPuGVRx6-H',
      database: 'afccfent',
      port: 5432, 
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
};
