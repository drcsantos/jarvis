const generator = require('../lib/generator');

module.exports = async (generate, meta) => {
    await generator({
        template: 'pom.xml',
        target: meta.app.rootPath('pom.xml'),
        props: meta.props,
        generate,
        print: 'success',
    })

    await generator({
        template: 'readme.tpl',
        target: meta.app.rootPath('README.md'),
        props: meta.props,
        generate
    })

    await generator({
        template: 'gitignore.tpl',
        target: meta.app.rootPath('.gitignore'),
        props: meta.props,
        generate
    })
}