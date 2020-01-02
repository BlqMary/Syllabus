import auth from "../middleware/auth";
import { User } from "../schemas/user";
import express = require("express");
import { removeUserRole, addUserRole } from "../helpers/userRoleHelper";

const router = express.Router();

router.get('/users', auth, async (req, res) => {
    try
    {
        const users = User.find();
        if (!users) {
            throw new Error();
        }
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/users/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send();
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(400).send({error: 'Login failed!'})
        }
        var userToken = await user.generateAuthToken();
        res.status(200).send({ user, token: userToken });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.get('/users/me', auth, async(req,res) => {
    res.send(req.body.user);
});

router.post('/users/me/logout', auth, async(req, res) => {
    try {
        const { token, userId } = req.body;
        if (!userId) {
            throw new Error();
        }
        const user = await User.findById(userId);
        user.removeAuthToken(token);
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/users/me/logoutall', auth, async(req, res) => {
    try {
        const { user } = req.body;
        if (!user) {
            throw new Error();
        }
        user.tokens.splice(0, user.tokens.lenght);        
        await user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/user/role/add', async (req, res) => {
    try
    {
        await addUserRole(req.body.userId, req.body.roleId);
        const user = await User.findOne({ _id: req.body.userId });
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/user/role/remove', auth, async (req, res) => {
    try {
        await removeUserRole(req.body.userId, req.body.roleId);
        const user = await User.findOne({ _id: req.body.userId });
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});


export default router;