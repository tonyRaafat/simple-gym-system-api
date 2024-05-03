import { membersDir, trainersDir } from "../../constants/constants.js";
import { readFile } from "../../utils/file-system.utils.js";

export function getMembersRevenue(req, res, next) {
    try {
        const membersData = readFile(membersDir)
        let revenue = 0;
        membersData.forEach(member => revenue += member.membership.cost)
        res.json({ revenue })
    } catch (error) {
        next(error)
    }
}

export function getTrainerRevenue(req, res, next) {
    try {
        const membersData = readFile(membersDir)
        let revenue = 0;
        membersData.forEach(member => {
            if (member.trainerId == req.params.id) {
                revenue += member.membership.cost
            }
        })
        res.json({ revenue })

    } catch (error) {
        next(error)
    }
}