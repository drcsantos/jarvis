const { print } = require('gluegun')

module.exports = async options => {
  const log = options.print || 'info'
  const error = options.printError || 'error'

  if (!options.generate) {
    print[error]('Generator needs generate method to proccess template files')
  }

  try {
    await options.generate({
      template: options.template,
      target: options.target,
      props: { ...options.props }
    })
    print[log](`Generated ${options.target}`)
  } catch (e) {
    print[error](e)
  }
}
