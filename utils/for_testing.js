const palindrome = (string) => {

    if (typeof string ==='undefined') return //return de nada es retornar un undefined

    return string
        .split('') //divide el string letra a letra, porque no se pasó un separador
        .reverse()
        .join('')
}

const average = array => {

    if (array.length===0) return 0

    let sum = 0
    array.forEach (num => {sum += num})
    return sum /array.length

}

module.exports = {
    palindrome, average
}