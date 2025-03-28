function longestPalindrome(s) {
    const n = s.length

    const borders = (l, r) => {
        while (l >= 0 && r < n && s[l] === s[r]) { l--; r++ }
        return [l + 1, r]
    }
    const lr = (i) => {
        const odd = borders(i, i)
        const even = borders(i, i + 1)
        return odd[0] < even[0] ? odd : even
    }

    let left = 0
    let right = 0
    let max = 0
    const pivoting = (i) => {
        const [ l, r ] = lr(i)
        if (r - l > max) [ max, left, right ] = [ r - l, l, r ]
    }

    let i = n >> 1
    while (i < n - (max >> 1)) pivoting(i++)
    
    i = n >> 1
    while (i >= (max >> 1)) pivoting(--i)

    return s.slice(left, right)
}

console.log(longestPalindrome('sddt'))