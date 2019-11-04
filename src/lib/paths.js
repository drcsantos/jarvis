const formatter = require('./formatter')

const packagesAndPaths = packageRoot => {
  const toPath = package => formatter.packageToPath(package)
  const packageRoute = package => `${packageRoot}.${package}`

  const packageMap = {
    packages: {
      root: packageRoot
    },
    paths: {
      root: toPath(packageRoot)
    }
  }
  const packages = [
    'controllers',
    'repositories',
    'services',
    'config',
    'domain',
    'model',
    'rabbit',
    'kafka'
  ]

  packages.map(package => {
    const value = packageRoute(package)
    packageMap.packages[package] = value
    packageMap.paths[package] = toPath(value)
  })

  return packageMap
}

module.exports = (root, package) => {
  const dir = value => (value === '' ? '' : value + '/')
  const path = (base, path) => `${root}/${dir(base)}${path}`
  const src = (value = '') => path('src', value)
  return {
    rootPath: (value = '') => path('', value),
    sourcePath: src,
    mainResourcePath: (value = '') => src(`main/resource/${value}`),
    mainJavaPath: (value = '') => src(`main/java/${value}`),
    testJavaPath: (value = '') => src(`test/java/${value}`),
    ...packagesAndPaths(package)
  }
}
