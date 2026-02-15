/**
 * @param {String} tagName 
 * @param {Object} attribut 
 * @returns {HTMLElement}
 */
export function createElement(tagName, property = {}) {

    const element = document.createElement(tagName)

    for (const [attribut, value] of Object.entries(property)){
        if (!value === false) {
            element.setAttribute(`${attribut}`,`${value}`)
        }
    }
    return element
}