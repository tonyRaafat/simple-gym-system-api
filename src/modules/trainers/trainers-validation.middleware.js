import { schemaValidation, updateSchemaValidation } from "../../utils/validations.js"

export function beforAddTrainerValidation(req, res, next) {
    try {
        schemaValidation(
            req.body,
            ["name", "duration"],
            'Trainer object should contain only "name"and duration only"'
        );
        schemaValidation(req.body.duration, ["from", "to"], "duration must contain from and to")
        next()
    } catch (error) {
        next(error)
    }
}

export function beforeUpdateTrainerValidation(req, res, next) {
    try {
        updateSchemaValidation(
            req.body,
            ["name", "duration"],
            'Trainer object should contain only "name"and duration only"'
        );
        if(req.body.duration){
            updateSchemaValidation(req.body.duration, ["from", "to"], "duration must contain from and to atttributes only")
        }
        next()
    } catch (error) {
        next(error)
    }
}