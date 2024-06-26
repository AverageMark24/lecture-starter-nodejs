import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  search(search) {
    const item = userRepository.getOne(search)
    if (!item) {
      return null
    }
    return item
  }

  create(user) {
    const item = userRepository.create(user)
    if (!item) {
      return null
    }
    return item
  }

  getAll() {
    const item = userRepository.getAll()
    if (!item) {
      return null
    }
    return item
  }

  update(id, dataToUpdate) {
    const item = userRepository.update(id, dataToUpdate)
    if (!item) {
      return null
    }
    return item
  }

  delete(id) {
    const item = userRepository.delete(id)
    if (!item) {
      return null
    }
    return item
  }
}



const userService = new UserService();

export { userService };
