import { Router } from 'express';
import {
  createUserSchema,
  loginSchema,
  usersTable,
} from '../../db/usersSchema';
import { validateData } from '../../middlewares/validationMiddleware';
import bcrypt from 'bcryptjs';
import { db } from '../../db/index';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', validateData(createUserSchema), async(req, res) => {
    try {
        const data = req.cleanBody;
        data.password = bcrypt.hashSync(data.password, 10);

        const user = await db.insert(usersTable).values(data).returning();

        // @ts-ignore
        delete user.password;

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" }); 
    }
});

router.post('/login', validateData(loginSchema), async (req, res) => {
    try {
        const {email, password} = req.cleanBody;
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));

        if(!user) {
            res.status(400).json({ error: "Invalid email or password" });
            return;
        }

        const matched = bcrypt.compareSync(password, user.password);
        if(!matched) {
            res.status(400).json({ error: "Invalid email or password" });
            return;
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, 'rokas-2002', { expiresIn: '30d' });
        
        // @ts-ignore
        delete user.password;
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" }); 
    }
});

export default router;