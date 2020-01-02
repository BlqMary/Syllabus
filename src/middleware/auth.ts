import  { verify } from "jsonwebtoken";
import { User } from "../schemas/user";

export const auth = async(req,res,next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    try {
        if (!token) {
            throw new Error();
        }
        const data = verify(token, process.env.JWT_KEY);
        const user = await User.findOne(
            {
                'tokens.token': token 
            });
        
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch {
        res.status(401).send({ error: 'No authorized to access this resource.'})
    }

};

export default auth;