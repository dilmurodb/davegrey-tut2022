const { format } = require('date-fns')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')


const logEvents = async (message, logFileName) => {
    const myUUID = uuidv4();
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${myUUID}\t${message}\n`;
    console.log(logItem)

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) {
        console.error(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
    console.log(`${req.method} ${req.path}`)
    next();
}

module.exports = { logger, logEvents }