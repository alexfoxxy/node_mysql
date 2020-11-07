const { Router } = require('express')
const Media = require('../models/media')
const Users = require('../models/users')
const router = Router()

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
})

// INSERT
router.post('/', async (req, res) => {
    try {
        let userToken = req.body.usertoken;
        let fileBase64 = req.body.path
        //let buff = new Buffer(fileBase64, 'base64');
        //fs.writeFile('test.docx', buff);

        await isIdUnique(userToken).then(isUnique => {
            console.log(isUnique)
            if (isUnique) {
                const media = Media.create({
                    path: req.body.path,
                    dateUpdate: req.body.dateUpdate,
                    done: false
                })
                res.status(201).json({ media })
            }
            else {
                res.status(400).json({
                    message: 'Пользователь не существует'
                })
            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

async function isIdUnique(token) {
    try {
        return await Users.count({ where: { usertoken: token } })
        count => {
            throw new Error('errormessage')
            console.log("Count: " + count)
            if (count == 1) {
                return true;
            } else if (count == 0) {
                return false;
            }
        }
    } catch (error) {
        console.log(error)
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

