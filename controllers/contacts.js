// Import
const {Contact} = require("../models/contact");
const { HttpError, ctrlWrapper } = require('../helpers');

 
// list
const list = async(req, res)=> {
const {_id: owner} = req.user;
const {page = 1, limit = 10} = req.query;
const skip = (page - 1) * limit;
const result = await Contact.find({owner}, {skip, limit}).populate("owner", "name email");
res.json(result);
}

// // getById
const getById = async (req, res) => {
    const {id} = req.params;
    // const result = await Contact.findOne({id: id});
    const result = await Contact.findById(id);
    if(!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

// // addById
const addById = async(req, res)=> {
    const {_id: owner } = req.user;
      const result = await Contact.create(...req.body, owner);
      res.status(201).json(result);
    }

// //   updateById
  const updateById = async (req, res) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if(!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
    }

    //  update favorite
  const updateFavorite = async (req, res) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if(!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
    }

// deleteById
 const deleteById = async (req, res) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if(!result) {
        throw HttpError(404, "Not found");
    } 
    res.json({
    message: "contact deleted"
    })
    } 

// Export
module.exports = { 
    list: ctrlWrapper(list),
    getById: ctrlWrapper(getById),
    deleteById: ctrlWrapper(deleteById),
    addById: ctrlWrapper(addById),
    updateById: ctrlWrapper(updateById),
    updateFavorite: ctrlWrapper(updateFavorite),
}