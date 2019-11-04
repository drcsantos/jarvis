const generator = require('../lib/generator')

module.exports = async (generate, meta) => {
  const gen = async file => {
    await generator({
      template: `kafka/${file}`,
      target: meta.app.mainJavaPath(`${meta.app.paths.kafka}/${file}`),
      props: {
        packageKafka: meta.app.packages.kafka,
        kafkaTopic: meta.props.kafkaTopic,
        kafkaGroupId: meta.props.kafkaGroupId
      },
      generate
    })
  }

  if (meta.props.kafka) {
    await gen('KafkaProducer.java')
    await gen('KafkaConsumer.java')
  }
}
