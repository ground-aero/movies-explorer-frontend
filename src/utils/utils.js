export const utilsSetToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const utilsGetFromLocalStorage = (key) => {
    const getData = localStorage.getItem(key)
    return getData ? JSON.parse(getData) : null
}
