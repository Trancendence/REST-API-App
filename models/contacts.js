// const fs = require('fs/promises');
// const path = require("node:path");
// const {nanoid} = require("nanoid");
// const contactsPath = path.join(__dirname, "contacts.json");
// const Contacts = require("../../models/contact");



// List 
// const list = async (req, res) => {
//   const contact = await Contacts.find();
//   res.json(contact);
// }

// Get by id
// const getById = async (id) => {
//   const contact = await list();
//     const result = contact.find(item => item.id === id);
//     return result || null;
// }

// remove by id
// const deleteById = async (id) => {
//   const contacts = await list();
//   const index = contacts.findIndex(item => item.id === id);
//   if(index === -1){
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await updateContacts(contacts);
//   return result;
//   };

// add by id
// const addById = async (body) => {
//   const contacts = await list();
//     const newContact = {
//       id: nanoid(),
//       ...body,
//     };
//     contacts.push(newContact);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts));
//     return newContact;
//   }

// update contact
// const updateById = async (id, body) => {
//   const contacts = await list();
//   const index = contacts.findIndex(item => item.id === id);
//   if(index === -1){
//     return null;
//   }
//   contacts[index] = {id, ...body};
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return contacts[index];
// }

// module.exports = {
  // list: ctrlWrapper(list),
  // getById: ctrlWrapper(getById),
  // deleteById: ctrlWrapper(deleteById),
  // addById: ctrlWrapper(addById),
  // updateById: ctrlWrapper(updateById),
// }