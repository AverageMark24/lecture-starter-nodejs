import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user

router.get(
  '/',
  (req, res, next) => {
    try {
      const users = userService.getAll()
      res.data = users
    } catch (err) {
      res.is404Error = true
      res.message = err.message
    } finally {
      next()
    }
  },
  responseMiddleware
)

router.get(
  '/:id',
  (req, res, next) => {
    try {
      const user = userService.search(user => user.id === req.params.id)
      if (user) {
        res.data = user
      } else {
        throw new Error('User does not exist.')
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

router.post(
  '/',
  createUserValid,
  (req, res, next) => {
    try {
      if (!res?.is400Error) {
        const userFromDB = userService.search(
          item =>
            item.phoneNumber === req.body.phoneNumber ||
            item.email === req.body.email
        )
        if (userFromDB) {
          throw new Error('Not unique user.')
        }

        const newUser = userService.create(req.body)
        res.data = newUser
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

router.put(
  '/:id',
  updateUserValid,
  async (req, res, next) => {
    try {
      if (!res?.is400Error) {
        const user = await userService.update(req.params.id, req.body)
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

router.delete(
  '/:id',
  async (req, res, next) => {
    try {
      const user = await userService.delete(req.params.id)
      if (user) {
        res.data = user
      } else {
        throw new Error('User does not exist.')
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
