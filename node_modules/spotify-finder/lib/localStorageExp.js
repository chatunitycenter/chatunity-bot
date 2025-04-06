'use strict'
const localStorage = global.localStorage
  ? global.localStorage
  : new (require('node-localstorage').LocalStorage)('./store')

class LocalStorageExp {
  /**
   * @param {string} key - name of key
   * @param {Object} jsonData - value to save
   * @param {Number} expirationMin - integer with time of expire in minute
   */
  save (key, jsonData, expirationMin) {
    const expirationMS = expirationMin * 60 * 1000
    const record = {
      value: JSON.stringify(jsonData),
      timestamp: new Date().getTime() + expirationMS
    }
    localStorage.setItem(key, JSON.stringify(record))
  }

  /**
   * @param {string} key - name of key
   */
  load (key) {
    const record = JSON.parse(localStorage.getItem(key))
    if (!record) { return false }
    return (new Date().getTime() < record.timestamp && JSON.parse(record.value))
  }

  /**
   * @param {string} key - name of key
   */
  remove (key) {
    localStorage.removeItem(key)
  }
}

module.exports = new LocalStorageExp()
