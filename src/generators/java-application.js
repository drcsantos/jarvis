const generator = require('../lib/generator')

module.exports = async (generate, meta) => {
  await generator({
    template: 'application.java',
    target: meta.app.mainJavaPath(
      `${meta.app.paths.root}/${meta.props.appName}.java`
    ),
    props: {
      appName: meta.props.appName,
      groupId: meta.props.groupId
    },
    generate,
    print: 'success'
  })
}
