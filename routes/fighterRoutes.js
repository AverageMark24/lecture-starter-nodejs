import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter


router.get(
  '/',
  (req, res, next) => {
    try {
      const fighters = fighterService.getAll()
      res.data = fighters
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
      const fighter = fighterService.search(user => user.id === req.params.id)
      if (fighter) {
        res.data = fighter
      } else {
        throw new Error('Fighter does not exist')
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
  createFighterValid,
  (req, res, next) => {
    try {
      if (!res?.is400Error) {
        const fighterFromDB = fighterService.search(
          item => item.name === req.body.name
        )
        if (fighterFromDB) {
          throw new Error('Not unique fighter.')
        }

        const newFighter = fighterService.create(req.body)
        res.data = newFighter
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
  updateFighterValid,
  async (req, res, next) => {
    try {
      if (!res?.is400Error) {
        const fighter = await fighterService.update(req.params.id, req.body)
        if (fighter) {
          res.data = fighter
        } else {
          throw new Error('Fighter does not exist.')
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
      const fighter = await fighterService.delete(req.params.id)
      if (fighter) {
        res.data = fighter
      } else {
        throw new Error('Fighter does not exist.')
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
