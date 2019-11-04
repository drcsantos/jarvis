module.exports = {
  capitalize: value =>
    value
      .replace(/\-/g, ' ')
      .replace(
        /\w\S*/g,
        txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      ),
  packageToPath: value => value.replace(/\./g, '/')
}
