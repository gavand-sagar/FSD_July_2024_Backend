import jwt from 'jsonwebtoken'

export const AutherizeMiddleware = async (req, res, next) => {
    let token = req.headers.token;
    if (!token) {
        res.status(401).json({ message: "un-authorized" })
        return;
    }
    try {
        // if this token was created by this server
        jwt.verify(token, process.env.SECRETE_KEY);
        next();
    } catch {
        res.status(401).json({ message: "un-authorized" })
        return;
    }
}
