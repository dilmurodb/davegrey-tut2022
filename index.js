const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
    if (err) throw err
    console.log(data) 
})

fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you!', (err) => {
    if (err) throw err
    console.log('Write complete')

    fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\n Nice to meet you too!', (err) => {
        if (err) throw err
        console.log('Append complete!')

        fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply'), (err) => {
            if (err) throw err
            console.log('Rename complete!')
        })
    })
})

fs.appendFile(path.join(__dirname, 'files', 'test.txt'), '\n\n Has it appended the text?', (err) => {
    if (err) throw err
    console.log('AppendFile complete!')
})


// Exit on uncaught errors
process.on('uncaughtException', (err) => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
})