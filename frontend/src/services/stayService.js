import { httpService } from './httpService'
import { storageService } from './asyncStorageService'
// import userService from './userService'
// import { utilService } from './utilService'
const KEY_STORAGE = 'stay'
const gStays = require('../data/airbnb.json')
localStorage.setItem(KEY_STORAGE, JSON.stringify(gStays))

export const stayService = {
  add,
  query,
  remove,
  getById
}

async function query(filterBy) {
  let stays = await httpService.get('stay', filterBy)
  if (filterBy.location) {
    const filterRegex = new RegExp(filterBy.location, 'i')
    stays = stays.filter(stay => filterRegex.test(stay.loc.address))
  } 
  return Promise.resolve(stays)
}


async function getById(stayId) {
  try {
      return await httpService.get(`stay/${stayId}`)
  } catch (err) {
      throw err
  }
}


function remove(stayId) {
  // return httpService.delete(`stay/${stayId}`)
  return storageService.delete('stay', stayId)

}
async function add(stay) {
  const addedStay = await httpService.post(`stay`, stay)
  console.log('addedStay', addedStay)
  // stay.byUser = userService.getLoggedinUser()
  // stay.aboutUser = await userService.getById(stay.aboutUserId)
  // const addedStay = storageService.post('stay', stay)

  return addedStay
}
