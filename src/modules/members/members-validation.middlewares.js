import { schemaValidation, updateSchemaValidation } from "../../utils/validations.js"

function beforAddMemberValidation(req, res, next) {
    try {
        schemaValidation(
            req.body,
            ["name", "nationalId", "phoneNumber", "membership", "status", "trainerId"],
            'Members object should contain only "name","nationalId","phoneNumber","membership","status" and "trainerId"'
        )
        schemaValidation(req.body.membership, ["from", "to", "cost"], "membership should contain from, to and cost")
        next()

    } catch (error) {
        next(error)
    }
}

function beforeUpdateMemberValidation(req, res, next) {
    try {
        updateSchemaValidation(
            req.body,
            ["name", "nationalId", "phoneNumber", "membership", "status", "trainerId"],
            'Members object should contain only "name","nationalId","phoneNumber","membership","status" and "trainerId"')
        if (req.body.membership) {
            updateSchemaValidation(req.body.membership, ["from", "to", "cost"], "membership should contain from, to and cost")

        }
        next()
    } catch (error) {
        next(error)
    }
}

export { beforAddMemberValidation, beforeUpdateMemberValidation }