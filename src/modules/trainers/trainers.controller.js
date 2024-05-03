import { membersDir, trainersDir } from "../../constants/constants.js";
import { addToFile, deleteFromFile, readFile, updataFromFile } from "../../utils/file-system.utils.js";

export function getTrainers(req, res, next) {
    try {
        const trainerData = readFile(trainersDir, req.query.id ?? null)
        if (!Array.isArray(trainerData)) {
            const today = new Date();
            const trainershipTo = new Date(trainerData.duration.to);
            if (today <= trainershipTo) {
                return res.json({ trainerData });
            } else {
                throw throwError("trainer trainerShip is expired", 401)
            }
        } else {
            return res.json({ trainerData })
        }
    } catch (error) {
        next(error)
    }
}

export function getTrainersInDetails(req, res, next) {
    try {
        let result = [];
        let trainersData = readFile(trainersDir, req.query.id ?? null)
        let membersData = readFile(membersDir)
        if (Array.isArray(trainersData)) {
            for (let i = 0; i < trainersData.length; i++) {
                const trainer = trainersData[i];
                trainer["members"] = membersData.filter(member => member.trainerId == trainer.id)
                delete trainer.trainerId
                result.push(trainer)
            }
        } else {
            trainersData["members"] = membersData.filter(member => member.trainerId == req.query.id)
            result = trainersData
        }
        return res.json({ data: result })
    } catch (error) {
        next(error)
    }
}

export function addTrainer(req, res, next) {
    try {
        const trainersData = readFile(trainersDir)
        const data = addToFile(trainersDir, req.body, trainersData)
        res.status(201).json({ data })
    } catch (error) {
        next(error)
    }
}

export function updateTrainer(req, res, next) {
    try {
        const trainerData = readFile(trainersDir)
        const data = updataFromFile(trainersDir, req.params.id, req.body, trainerData)
        return res.status(200).json({ data })
    } catch (error) {
        next(error)
    }
}

export function deleteTrainer(req, res, next) {
    const trainerData = readFile(trainersDir)
    const data = deleteFromFile(trainersDir, req.params.id, trainerData,"hard")
    return res.status(200).json({ data })
}