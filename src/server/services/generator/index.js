const fs = require('fs-extra')
const path = require('path')
const debug = require('debug')('dos')

const { User, Repo } = require('../../models')

const target = path.join(__dirname, '../../../../public/data')

module.exports = {

  /**
   * Generate data.
   */
  async generate() {
    debug('Generate all data...')
    await this.generateUsers()
    await this.generateRepos()
    debug('All data generated!')
  },

  /**
   * Generate users data.
   * @return {Promise}
   */
  async generateUsers() {
    debug('Generating data for users...')
    const users = await User.findAll({
      attributes: ['login', 'name', 'url', 'avatarUrl', 'company', 'followers', 'sources', 'forked']
    })
    debug('Generating data for %d users.', users.length)
    return await fs.writeJSON(path.join(target, 'users.json'), users)
  },

  /**
   * Generate repos data.
   * @return {Promise}
   */
  async generateRepos() {
    debug('Generating data for repos...')
    const repos = await Repo.findAll({
      attributes: ['name', 'description', 'url', 'languages', 'stargazers']
    })
    debug('Generating data for %d repos.', repos.length)
    return await fs.writeJSON(path.join(target, 'repos.json'), repos)
  }
}
