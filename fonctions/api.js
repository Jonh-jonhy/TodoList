/**
 * @param {String} url 
 * @param {object} option 
 * @returns {object} json
 */
export async function fetchJSON(url, option = {}) {
    const headers = {Accept: 'application/JSON' ,...option.headers }
    const response = await fetch(url, {...option, headers})
    
    if (!response.ok) {
        throw new Error('Erreur serveur')
    } else {
        return response.json()
    }
}