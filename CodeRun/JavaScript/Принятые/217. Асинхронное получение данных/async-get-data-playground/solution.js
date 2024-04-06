const {getHashByData, fetchData} = require('./utils');

module.exports = async function (urls, retryCount = 0) {
  const fetchHashByData = (data) => new Promise((rs) => getHashByData(data, rs))
  function fetchWithRetry(url, retry) {
    if (!retry) return
    return fetchData(url)
      .then(async ({ data, hashSum }) => {
        if (await fetchHashByData(data) === hashSum) return data
        return fetchWithRetry(url, retry - 1)
      })
      .catch(err => {
        return fetchWithRetry(url, retry - 1)
      })
  }

  return Promise.all(urls.map(url => fetchWithRetry(url, retryCount + 1)))
    .then(res => res.filter(Boolean))
}