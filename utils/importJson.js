import {createRequire} from "node:module"
const require = createRequire(import.meta.url)

/**
 * Permite importar un archivo JSON solamente con su ruta
 * @param {Object} obj 
 * @param {String} obj.pathJson - Ruta del archivo JSON
 * @returns {Object} - JSON importado
 */
const importJson = ({ pathJson }) => {
    try {
        const json = require(pathJson)
    return json
    } catch (error) {
       console.error(error) 
    }
}

export default importJson