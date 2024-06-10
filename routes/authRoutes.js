import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement login action (get the user if it exist with entered credentials)

router.post(
  '/login',
  (req, res, next) => {
    try {
      if (!res?.is400Error) {
        const user = authServiceuthService.login(
          user =>
            user.email === req.body.email && user.password === req.body.password
        )
        if (user) {
          res.data = user
        } else {
          throw new Error('User does not exist.')
        }
      }
    } catch (err) {
      res.is404Error = true
      res.message = err.message
    } finally {
      next()
    }
  },
  responseMiddleware
)


export { router };
