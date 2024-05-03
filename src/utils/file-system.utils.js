import { readFileSync, writeFileSync } from "node:fs";
import throwError from "./throw-error.utils.js";

function readFile(file, id = null) {
    if (id != null) {

        const data = JSON.parse(readFileSync(file))
        const foundData = data.find(el => el.id == parseInt(id))
        if (foundData == undefined) {
            throw throwError("Id Not Found", 404)
        }
        return foundData
    } else {
        try {
            const data = readFileSync(file);
            return JSON.parse(data)
        } catch (error) {
            throw throwError(error, 500)
        }
    }
}

function addToFile(file, newData, parsedCurrData) {
    try {
        if (parsedCurrData.length) {
            console.log("in id");
            newData = Object.assign({ 'id': parseInt(parsedCurrData[parsedCurrData.length - 1].id) + 1 }, newData);
        } else {
            newData = Object.assign({ 'id': 1 }, newData);

        }
        parsedCurrData.push(newData)
        writeFileSync(file, JSON.stringify(parsedCurrData))
        return parsedCurrData
    } catch (error) {
        throw throwError(error, 500)
    }

}

function mergeObjects(target, source) {
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
                target[key] = mergeObjects(target[key] || {}, source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
}

function updataFromFile(file, id, newData, data) {
    const index = data.findIndex(element => element.id == id);
    if (index !== -1) {
        newData = Object.assign({ 'id': parseInt(id) }, newData);
        // const keys = Object.keys(newData)
        // console.log(keys);
        // keys.forEach(key=>data[index][key] = newData[key])
        data[index] = mergeObjects(data[index], newData);
        writeFileSync(file, JSON.stringify(data))
        return data
    } else {
        throw throwError("Id Not found", 404)
    }
}

function deleteFromFile(file, id, data, deleteOptions = "soft") {
    const index = data.findIndex(element => element.id == id);
    if (index !== -1) {
        if (deleteOptions === "soft") {
            if (data[index].isDeleted) {
                throw throwError("Member already Deleted", 400)
            }
            data[index].isDeleted = true
        } else if (deleteOptions === "hard") {
            data.splice(index, 1)
        }
        writeFileSync(file, JSON.stringify(data))
        return data

    } else {
        throw throwError("Id Not found", 404)
    }
}



export { readFile, addToFile, updataFromFile, deleteFromFile }