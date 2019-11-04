const paths = require('../lib/paths')
const validator = require('../lib/validator')
const formatter = require('../lib/formatter')

// Generators
const rootGenerator = require('../generators/root')
const dockerGenerator = require('../generators/docker')
const resourcesGenerator = require('../generators/resources')

const javaApplicationGenerator = require('../generators/java-application')
const javaConfigGenerator = require('../generators/java-config')
const javaRabbitGenerator = require('../generators/java-rabbit')
const javaKafkaGenerator = require('../generators/java-kafka')

const buildJpaOptions = options => {
  switch (options.database) {
    case 'postgres':
      return {
        jpa: true,
        postgres: true,
        databaseJpa: 'POSTGRESSQL',
        databaseDialect: 'PostgreSQL9Dialect'
      }
    case 'mysql':
      return {
        jpa: true,
        mysql: true,
        databaseJpa: 'MYSQL',
        databaseDialect: 'MysqlDialect'
      }
    case 'mssql':
      return {
        jpa: true,
        mssql: true,
        databaseJpa: 'SQLSERVER',
        databaseDialect: 'SQLServerDialect'
      }
    default:
      return {
        jpa: false,
        database: null,
        databaseJpa: null,
        databaseDialect: null
      }
  }
}

module.exports = {
  name: 'generate:service',
  alias: ['gs'],
  run: async toolbox => {
    const {
      parameters,
      template: { generate },
      print: { info, error, success }
    } = toolbox

    const artifact = parameters.first
    const groupId = parameters.second
    const name = `${formatter.capitalize(artifact)} Application`

    if (validator.isValidGroupId(groupId, error)) {
      const meta = {
        props: {
          name,
          appName: name.split(' ').join(''),
          description: '',
          container: 'undertow',
          git: true,
          actuator: true,
          swagger: true,
          devtools: false,
          redis: false,
          rabbit: false,
          mongodb: false,
          kafka: false,
          kafkaTopic: artifact.replace(/\w\S*/g, txt => txt.toLowerCase()),
          kafkaGroupId: 'group_id',
          influx: false,
          security: false,
          ...parameters.options,
          ...buildJpaOptions(parameters.options),
          artifact,
          groupId
        },
        app: {
          ...paths(artifact, groupId)
        }
      }

      info('\nGenerating application infrastructure...\n')
      await rootGenerator(generate, meta)
      await dockerGenerator(generate, meta)
      
      info('\nGenerating resources files...\n')
      await resourcesGenerator(generate, meta)

      // Java generator
      info('\nGenerating .java files...\n')
      await javaApplicationGenerator(generate, meta)
      await javaConfigGenerator(generate, meta)
      await javaRabbitGenerator(generate, meta)
      await javaKafkaGenerator(generate, meta)

      //Security
      //Jpa
      //MongoDb
    }
  }
}

/* 
  generate:service 
  invoice-service (artifact Id)
  com.abinbev.b2b (group Id)
  --container=undetow (undertow, jetty, tomcat)
  --name="Invoice Service"
  --description="Service to handle invoices"
  --database=none (none, postgres, mysql, sqlserver)

  >>>> options <<<<<
  --git (true)
  --dev-tools (false)
  --swagger (true)
  --redis (false)
  --rabbit (false)
  --mongodb (false)
  --kafka (false)
  --actuator (true)
  --influx (false)
  --security=none (none, basic, bearer)
  
  */

// generate:service invoice-relay-service com.abinbev.b2b --swagger --rabbit --actuator --dev-tools
