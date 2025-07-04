const fsPromises = require('fs').promises
const path = require('path')

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8')
        console.log(data)
        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'))
        await fsPromises.writeFile(path.join(__dirname, 'files', 'reply.txt'), data)
        await fsPromises.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nAppended text to starter file')
        await fsPromises.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'))
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'newReply.txt'), 'utf8')
        console.log(newData)
    } catch (err) {
        console.error(err)
    }
}

fileOps()

// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
//     if (err) throw err
//     console.log(data) 
// })

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you!', (err) => {
//     if (err) throw err
//     console.log('Write complete')

//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\n Nice to meet you too!', (err) => {
//         if (err) throw err
//         console.log('Append complete!')

//         fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply'), (err) => {
//             if (err) throw err
//             console.log('Rename complete!')
//         })
//     })
// })


// Exit on uncaught errors
process.on('uncaughtException', (err) => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
})