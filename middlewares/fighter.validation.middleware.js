import { FIGHTER } from "../models/fighter.js";

export const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  const { id, ...rest } = FIGHTER

  Object.keys(rest).forEach(prop => {
    prop === 'health' ? (rest[prop] = 100) : (rest[prop] = '')
  })

  const data =
    Object.keys(req.body).length !== Object.keys(rest).length
      ? { ...rest, ...req.body }
      : req.body

  const errorsMessage = validate(data)

  if (errorsMessage.length !== 0) {
    res.is400Error = true
    res.message = errorsMessage
  }
  req.body = data
  next()
}

export const updateFighterValid = (req, res, next) => {
  let errorsMessage = validate(req.body)

  if (Object.keys(req.body).length === 0) errorsMessage += 'Nothing to update'

  if (errorsMessage.length !== 0) {
    res.is400Error = true
    res.message = errorsMessage
  }
  // TODO: Implement validatior for FIGHTER entity during update
  next();
};


