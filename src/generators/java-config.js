const generator = require('../lib/generator')

module.exports = async (generate, meta) => {
  const packageName = meta.app.packages.config
  const folderPath = meta.app.paths.config

  if (meta.props.redis) {
    await generator({
      template: 'redis/CacheConfig.java',
      target: meta.app.mainJavaPath(`${folderPath}/CacheConfig.java`),
      props: {
        packageConfig: packageName
      },
      generate
    })

    await generator({
      template: 'redis/CacheKeyGenerator.java',
      target: meta.app.mainJavaPath(`${folderPath}/CacheKeyGenerator.java`),
      props: {
        packageConfig: packageName
      },
      generate
    })
  }

  if (meta.props.jpa) {
    await generator({
      template: 'jpa/JpaConfig.java',
      target: meta.app.mainJavaPath(`${folderPath}/JpaConfig.java`),
      props: {
        packageConfig: packageName,
        packageRepository: 'repositories', //packageRepository,
        packageDomain: 'domain' //packageDomain
      },
      generate
    })
  }

  if (meta.props.swagger) {
    await generator({
      template: 'swagger/SwaggerConfig.java',
      target: meta.app.mainJavaPath(`${folderPath}/SwaggerConfig.java`),
      props: {
        packageConfig: packageName
      },
      generate
    })
  }

  if (meta.props.rabbit) {
    await generator({
      template: 'rabbit/RabbitConfig.java',
      target: meta.app.mainJavaPath(`${folderPath}/RabbitConfig.java`),
      props: {
        packageConfig: packageName
      },
      generate
    })
  }

  if (meta.props.kafka) {
    await generator({
      template: 'kafka/KafkaConfig.java',
      target: meta.app.mainJavaPath(`${folderPath}/KafkaConfig.java`),
      props: {
        packageConfig: packageName
      },
      generate
    })
  }
}
