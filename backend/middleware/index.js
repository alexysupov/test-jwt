import { verifyToken } from "../utils/index.js";

export const authorization = async (req, res, next) => {
    const accessToken = req.cookies['X-Access-Token']

    if (!accessToken) {
        return res.status(403).json({
            message: 'JWT token is not provided'
        })
    }

    try {
        req.userId = await verifyToken(accessToken).then(_ => _.userId)
        next()
    }
    catch (e) {
        return res.status(401).json({
            message: e.message
        })
    }
}