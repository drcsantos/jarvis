const generator = require('../lib/generator');
const folder = file => `docker/${file}`;

module.exports = async (generate, meta) => {
    await generator({
        template: folder('README-stack.tpl'),
        target: meta.app.sourcePath(folder('README-stack.md')),
        props: meta.props,
        generate
    })

    await generator({
        template: folder('Dockerfile'),
        target: meta.app.sourcePath(folder('Dockerfile')),
        props: meta.props,
        print: 'success',
        generate
    })

    await generator({
        template: folder('docker-compose.yml'),
        target: meta.app.sourcePath(folder('docker-compose.yml')),
        props: meta.props,
        print: 'success',
        generate
    })

    await generator({
        template: folder('stack.sh'),
        target: meta.app.sourcePath(folder('stack.sh')),
        props: meta.props,
        generate
    })

    await generator({
        template: folder('standalone.sh'),
        target: meta.app.sourcePath(folder('standalone.sh')),
        props: meta.props,
        generate
    })
}