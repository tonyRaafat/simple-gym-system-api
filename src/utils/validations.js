import throwError from "./throw-error.utils.js"

function schemaValidation(data, schemaArray, errorMesage) {
    if (Object.keys(data).toString() !== schemaArray.toString()) {
        throw throwError(errorMesage, 400)
    }
}

function updateSchemaValidation(data,schemaArray,errorMesage){
    const keys = Object.keys(data)
    keys.forEach(el=>{
        if (!schemaArray.includes(el)) {
            throw throwError(errorMesage,400)
        }
    })
}
export  { schemaValidation,updateSchemaValidation }