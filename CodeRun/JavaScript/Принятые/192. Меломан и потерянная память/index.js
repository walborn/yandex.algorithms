const Genre1 = { type: 'genre', name: 'Рок', bands: [], subgenres: [], parent: null };
const Genre1Sub1 = { type: 'genre', name: 'Классик-рок', bands: [], subgenres: [], parent: null };
const Genre1Sub2 = { type: 'genre', name: 'Акустик-рок', bands: [], subgenres: [], parent: null };
const Genre1Sub3 = { type: 'genre', name: 'Полурок', bands: [], subgenres: [], parent: null };
const Genre2 = { type: 'genre', name: 'Нерок', bands: [], subgenres: [], parent: null };

// Разбираемся с роком
Genre1.subgenres.push(Genre1Sub1, Genre1Sub2, Genre1Sub3);
Genre1Sub1.parent = Genre1Sub2.parent = Genre1Sub3.parent = Genre1;

// Группы в памяти
const Band1 = { type: 'band', name: 'Жёлтый мох', friends: [], genres: [] };
const Band2 = { type: 'band', name: 'Красный слой', friends: [], genres: [] };
const Band3 = { type: 'band', name: 'Бритый гриб', friends: [], genres: [] };

// И в жанрах
Band1.genres.push(Genre1Sub1);
Genre1Sub1.bands.push(Band1);

Band2.genres.push(Genre1Sub2);
Genre1Sub2.bands.push(Band2);

// А Бритый гриб лабает в двух жанрах
Band3.genres.push(Genre2);
Genre2.bands.push(Band3);
Band3.genres.push(Genre1Sub3);
Genre1Sub3.bands.push(Band3);

// Группы умеют дружить
Band1.friends.push(Band2);
Band2.friends.push(Band1);

// С некоторыми — по 2 раза, но это не взаимно
Band1.friends.push(Band3);

// Помнит Коля только про Бритый Гриб :-(
module.exports = Band3;



module.exports = function (genreOrBand) {
  Array.prototype.sortByName = function () {
    return this.sort((a, b) => a.name > b.name ? 1 : -1)
  }
  const q = [genreOrBand]
  const visited = new Set()
  while (q.length) {
    const next = q.shift()
    if (visited.has(next)) continue
    visited.add(next)
    if (next.friends) q.push(...next.friends)
    if (next.genres) q.push(...next.genres)
    if (next.subgenres) q.push(...next.subgenres)
    if (next.bands) q.push(...next.bands)
    if (next.parent) q.push(next.parent)
  }
  const bands = []
  const genres = []
  visited.forEach(i => {
    if (i.type === 'band') bands.push(i)
    if (i.type === 'genre') genres.push(i)
  })
  bands.sortByName().forEach(i => { i.friends.sortByName() })
  genres.sortByName().forEach(i => { i.bands.sortByName(); i.subgenres.sortByName() })

  const bandsMd = bands.map(band => {
    let bandStr = `- ${band.name}`
    if (band.friends.length) bandStr += `, друзья: ${band.friends.map(friend => friend.name).join(', ')}`
    return bandStr
  })

  const genresMd = genres
    .filter(genre => genre.parent === null)
    .map(genre => {
      const rec = (genre, tab = 1) => {
        let genreStr = `- ${genre.name}`
        if (genre.bands.length) genreStr += `: ${genre.bands.map(band => band.name).join(', ')}`
        if (genre.subgenres.length) {
          const tabStr = '  '.repeat(tab)
          genreStr += `\n${tabStr}`
          genreStr += genre.subgenres.map(subgenre => rec(subgenre, tab + 1)).join(`\n${tabStr}`)
        }
        return genreStr
      }

      return rec(genre)
    })
  return `## Жанры\n\n${genresMd.join('\n')}\n\n## Группы\n\n${bandsMd.join('\n')}`
}


console.log(module.exports(Band3))