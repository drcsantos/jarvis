const generator = require('../lib/generator')

module.exports = async (generate, meta) => {
  await generator({
    template: 'application.yml',
    target: meta.app.mainResourcePath(`application.yml`),
    props: meta.props,
    generate,
    print: 'success'
  })

  await generator({
    template: 'bootstrap.yml',
    target: meta.app.mainResourcePath(`bootstrap.yml`),
    props: {
      artifact: meta.props.artifact
    },
    generate
  })
}
