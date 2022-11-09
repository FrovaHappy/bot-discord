import { autobuppingModel } from './model/autobupping.schema.js'

async function updateAutobupping(filter, update) {
  return await autobuppingModel
    .findOneAndUpdate(filter, update, {
      upsert: true,
    })
    .catch((e) => {
      throw new Error('error updating autobupping')
    })
}
async function findAutobupping(filter) {
  return await autobuppingModel.findOne(filter).catch((e) => {
    throw new Error('error finding autobupping')
  })
}
export { findAutobupping, updateAutobupping }
