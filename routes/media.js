const { Router } = require('express');
const Media = require('../models/media');
const Users = require('../models/users');
const path = require('path');
const fs = require('fs');
const media = require('../models/media');

const router = Router()
/*
// SELECT
router.get('/', async (req, res) => {
    await res.json({ a: 'test' })
    // try {
    //     
    // } catch (e) {
    //     console.log(e)
    //     res.status(500).json({
    //         message: 'Server error'
    //     })
    // }
})*/

router.get('/downloadFile', async (req, res) => {
    try {
        let mediaId = req.body.mediaId;
        /*let mediaObj = await Media.findOne(
            {
                where: { id: mediaId }
            }
        );*/
        let mediaObj = await Media.findByPk(mediaId)
        if (mediaObj === null) {
            console.log('Not found!');
        }
        console.log(mediaObj instanceof Media)
        console.log(mediaObj.id)
        let fullFilePath = mediaObj.filePath;

        let fileBase64 = 'someBase64'
        console.log(fullFilePath)
        console.log(await mediaObj.path)
        let buff = fs.readFileSync(
            path.join(mediaObj.path)
        )
        let base64data = buff.toString('base64');
        //res.status(201).json({ data: mediaObj.path })
        res.status(201).json({ data: base64data })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
})

// INSERT
router.post('/uploadFile', async (req, res) => {
    try {
        let userToken = req.body.usertoken;
        let fileName = req.body.fileName
        let fileBase64 = req.body.base64File
        let buff = Buffer(fileBase64, 'base64');
        console.log(Buffer(buff, 'base64'))
        fs.writeFileSync(
            path.join('./', 'tmp', fileName),
            buff,
            (err) => {
                if (err) throw err
                console.log("Файл не создан")
            }
        );

        let isUnique = await isIdUnique(userToken)
        console.log(isUnique)
        if (isUnique) {
            const media = Media.create({
                path: "./temp/" + fileName,
                dateUpdate: req.body.dateUpdate,
                done: false
            })
            console.log(await media)
            res.status(201).json({ media })
        }
        else {
            res.status(400).json({
                message: 'Пользователь не существует'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
})

async function isIdUnique(token) {
    let count = await Users.count({ where: { usertoken: token } })
    if (count == 1) {
        return true;
    } else if (count == 0) {
        return false;
    }
}



// UPDATE
router.put('/:id', async (req, res) => {
    // try {

    // } catch (e) {
    //     console.log(e)
    //     res.status(500).json({
    //         message: 'Server error'
    //     })
    // }
})

// DELETE
router.delete('/:id', async (req, res) => {
    // try {
    // } catch (e) {
    //     console.log(e)
    //     res.status(500).json({
    //         message: 'Server error'
    //     })
    // }
})

module.exports = router