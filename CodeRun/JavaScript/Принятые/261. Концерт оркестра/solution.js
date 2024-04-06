const keys = [...document.querySelectorAll('.key')];
const lines = [...document.querySelectorAll('.line')];
const play = async () => {
  for (const line of lines) {
    const symbols = [...line.querySelectorAll('.symbol')];
    for (const symbol of symbols) {
      let i
      if (symbol.classList.contains('C1')) i = 0
      else if (symbol.classList.contains('D1')) i = 2
      else if (symbol.classList.contains('E1')) i = 4
      else if (symbol.classList.contains('F1')) i = 5
      else if (symbol.classList.contains('G1')) i = 7
      else if (symbol.classList.contains('A1')) i = 9
      else if (symbol.classList.contains('H1')) i = 11
      else if (symbol.classList.contains('C2')) i = 12
      else if (symbol.classList.contains('D2')) i = 14
      else if (symbol.classList.contains('E2')) i = 16
      else if (symbol.classList.contains('F2')) i = 17
      else if (symbol.classList.contains('G2')) i = 19
      else if (symbol.classList.contains('A2')) i = 21
      else if (symbol.classList.contains('H2')) i = 23

      if (typeof i !== 'undefined') {
        if (symbol.classList.contains('flat')) --i
        if (symbol.classList.contains('sharp')) ++i
        keys[i].click()
      }
      await new Promise((rs) => setTimeout(rs, 100))
    }
  }
}
play()