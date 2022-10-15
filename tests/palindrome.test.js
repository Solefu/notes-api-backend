const {palindrome} = require ('../utils/for_testing')

test ('palindrome of midudev', () => {

    const result = palindrome('midudev')
    expect(result).toBe('vedudim')
})

test ('palindrome of undefined', () => {

    const result = palindrome()
    expect(result).toBeUndefined()
})

