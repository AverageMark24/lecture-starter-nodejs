import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  const { id, ...rest } = USER

  const data =
    Object.keys(req.body).length !== Object.keys(rest).length
      ? { ...rest, ...req.body }
      : req.body

  const errorsMessage = validate(data)

  if (errorsMessage.length !== 0) {
    res.is400Error = true
    res.message = errorsMessage
  }
  next()
}
const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  let errorsMessage = validate(req.body)

  if (Object.keys(req.body).length === 0) errorsMessage = 'Nothing to update.'

  if (errorsMessage.length !== 0) {
    res.is400Error = true
    res.message = errorsMessage
  }
  next()
}

export { createUserValid, updateUserValid };
