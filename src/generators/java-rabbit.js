const generator = require('../lib/generator')

module.exports = async (generate, meta) => {
  const gen = async file => {
    await generator({
      template: `rabbit/${file}`,
      target: meta.app.mainJavaPath(`${meta.app.paths.rabbit}/${file}`),
      props: {
        packageRabbit: meta.app.packages.rabbit
      },
      generate
    })
  }

  if (meta.props.rabbit) {
    await gen('RabbitConverter.java')
    await gen('RabbitMessageListener.java')
    await gen('RabbitSamplePojo.java')
    await gen('RabbitSender.java')
  }
}
