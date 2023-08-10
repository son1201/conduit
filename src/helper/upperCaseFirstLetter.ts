
export const upperCaseFirstLetter = (string: string) => {
    return string[0].toUpperCase() + string.split('').splice(1, string.length).join('')
}