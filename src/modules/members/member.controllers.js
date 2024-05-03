import { membersDir, trainersDir } from "../../constants/constants.js"
import throwError from "../../utils/throw-error.utils.js"
import { readFile, addToFile, deleteFromFile, updataFromFile } from "../../utils/file-system.utils.js"

function getMembers(req, res, next) {
    try {
        const memberData = readFile(membersDir, req.query.id ?? null)
        if (!Array.isArray(memberData)) {
            const today = new Date();
            const membershipTo = new Date(memberData.membership.to);
            console.log(membershipTo);
            if (today <= membershipTo) {
                return res.json({ memberData });
            } else {
                throw throwError("Member memberShip is expired", 401)
            }
        } else {
            return res.json({ memberData })
        }
    } catch (error) {
        next(error)
    }
}

function getMembersInDetails(req, res, next) {
    try {
        let result = [];
        let membersData = readFile(membersDir, req.query.id ?? null)
        if (Array.isArray(membersData)) {
            for (let i = 0; i < membersData.length; i++) {
                const member = membersData[i];
                let trainerData = readFile(trainersDir, parseInt(member.trainerId))
                member["trainer"] = trainerData
                delete member.trainerId
                result.push(member)
            }
        } else {
            let trainerData = readFile(trainersDir, parseInt(membersData.trainerId))
            membersData["trainer"] = trainerData
            delete membersData.trainerId
            result = membersData
        }
        return res.json({ data: result })
    } catch (error) {
        next(error)
    }
}

function addMember(req, res, next) {
    try {
        const currData = readFile(membersDir)
        const trainersIds = readFile(trainersDir).map(el => el.id)
        const { nationalId, trainerId } = req.body
        if (!trainersIds.includes(trainerId)) {
            throw throwError("Invalid Trainer Id", 400)
        }
        const index = currData.findIndex(element => {
            //find if National Id already exists
            if (element.nationalId == nationalId) {
                // if it exists check if customer is a deleted customer
                if (!element.isDeleted) {
                    throw throwError("National Id already exists", 400)
                } else {
                    return true
                }
            }
        });

        // if the customer we want to ad is deleted remove the delete
        if (index !== -1) {
            currData[index].isDeleted = false
            console.log(currData);
            const data = updataFromFile(membersDir, currData[index].id, currData[index], currData)
            return res.status(201).json({ data })
        }
        //else add a new customer
        else {
            req.body.isDeleted = false
            const data = addToFile(membersDir, req.body, currData)
            return res.status(201).json({ data })
        }
    } catch (error) {
        next(error)
    }
}

function updateMember(req, res, next) {
    try {
        const currData = readFile(membersDir)
        const trainersIds = readFile(trainersDir).map(el => el.id)
        const { nationalId, trainerId } = req.body
        if (!trainersIds.includes(trainerId) && trainerId) {
            throw throwError("Invalid Trainer Id", 400)
        }
        if(nationalId){
            currData.forEach(element => {
                if (element.nationalId == nationalId && element.id != req.params.id) {
                    throw throwError("National Id already exists", 400)
                }
            });
        }
        const data = updataFromFile(membersDir, req.params.id, req.body, currData)
        console.log(data);
        return res.status(200).json({ data })
    } catch (error) {
        next(error)
    }
}

function deleteMember(req, res, next) {
    try {
        const currData = readFile(membersDir)
        const data = deleteFromFile(membersDir, parseInt(req.params.id), currData)
        return res.status(200).json({ data })
    } catch (error) {
        next(error)
    }

}

export { getMembers, addMember, updateMember, deleteMember, getMembersInDetails }