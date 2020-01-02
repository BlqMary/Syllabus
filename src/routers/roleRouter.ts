import auth from "../middleware/auth";
import express = require("express");
import { Role } from "../schemas/role";
import { removeUserRole, addUserRole } from "../helpers/userRoleHelper";

const router = express.Router();

router.get('/roles', auth, async (req, res) => {
    try
    {
        const roles = Role.find();
        if (!roles) {
            throw new Error();
        }
        res.status(200).send(roles);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/roles/add', async (req, res) => {
    try {
        const role = new Role(req.body);
        await role.save();
        res.status(201).send({ role });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/roles/remove', async (req, res) => {
    try {
        if (!req.body.name) {
            throw new Error();
        }
        await Role.deleteOne({ name: req.body.name});        
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/role/user/add', async (req, res) => {
    try
    {
        await addUserRole(req.body.userId, req.body.roleId);
        const role = await Role.findOne({ _id: req.body.roleId });
        res.status(200).send(role);

    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/role/user/remove', async (req, res) => {
    try {
        await removeUserRole(req.body.userId, req.body.roleId);
        const role = await Role.findOne({ _id: req.body.roleId });
        res.status(200).send(role);
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;