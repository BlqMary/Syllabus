import { ObjectId } from "mongodb";
import { User } from "../schemas/user";
import { Role } from "../schemas/role";

 export const addUserRole = async (userId: ObjectId, roleId: ObjectId) => {
     try 
     {
        const user = await User.findOne({ _id: userId });
        const role = await Role.findOne({ _id: roleId });
        if (!user || !role || user.roles.includes(roleId) || role.users.includes(userId)) {
            throw new Error();
        }
        user.roles.push(role._id);
        role.users.push(user._id);
        await user.save();
        await role.save();
    } catch(error) {
        throw error;
    }
  };

export const removeUserRole = async (userId: ObjectId, roleId: ObjectId) => {
    try {
        const user = await User.findOne({ _id: userId });
        const role = await Role.findOne({ _id: roleId });
        if (!user || !role || !user.roles.includes(roleId) || !role.users.includes(userId)) {
            throw new Error();
        }

        const roleIndex = user.roles.indexOf(role._id);
        const userIndex = role.users.indexOf(user._id);
        if (roleIndex < 0 || userIndex < 0) {
            throw new Error();
        }

        user.roles.splice(roleIndex, 1);
        role.users.splice(userIndex, 1);
        await user.save();
        await role.save();
    } catch(error) {
        throw error;
    }
};