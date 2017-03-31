// LOCAL DEV VARIABLES
let env = {
	NODE_ENV: 'development',
	PORT: 3000,
	DBPROTOCOL: 'mongodb',
	DBUSERNAME: 'erikpshort',
	DBPASSWORD: 'escape1129',
	DBHOST: 'ds060009.mlab.com:60009',
	DBNAME: 'keepr',
	SERVERNAME: 'dev-server'
}
//mongodb://<dbuser>:<dbpassword>@ds060009.mlab.com:60009/keepr
// MAPS env TO ACTUAL ENVIRONMENT
Object.keys(env).forEach(v => {
	process.env[v] = process.env[v] || env[v]
})

// MongoDb Connection String Builder
env.CONNECTIONSTRING = `${env.DBPROTOCOL}://${env.DBUSERNAME}:${env.DBPASSWORD}@${env.DBHOST}/${env.DBNAME}`
process.env.CONNECTIONSTRING = env.CONNECTIONSTRING

exports = env