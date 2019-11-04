module.exports = {
  isRootProject: () => {},
  isValidGroupId: (group, error) => {
    const validPack = typeof group == 'string' && group.indexOf('.') > 0
    if (!validPack && error) {
      error(
        'groupId must be a string and contains at least one point "."\n'
      )
    }
    return validPack
  }
}
