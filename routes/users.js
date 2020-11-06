const { Router } = require('express')
const Users = require('../models/users')
const { v4: uuidv4 } = require('uuid');
const router = Router()

// SLECT
router.get('/', async (req, res) => {
    await res.json({ a: 'test' })
    // try {
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
        let emailUsers = req.body.email
        await isIdUnique(emailUsers).then(isUnique => {
            console.log(isUnique)
            if (isUnique) {                
                const users = Users.create({
                    username: req.body.username,
                    email: emailUsers,
                    password: req.body.password,
                    usertoken: uuidv4(),
                    done: false
                });                
                res.status(201).json({ users });
            } else
                res.status(400).json({
                    message: 'Пользователь существует'
                })
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

async function isIdUnique(email) {
    return await Users.count({ where: { email: email } })
        .then(count => {
            console.log("Count: " + count)
            if (count == 0) {
                return true;
            } else if (count >= 1) {
                return false;
            }
        });
}

module.exports = router