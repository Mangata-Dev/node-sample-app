const ItemList = require('../models/ItemList')
const router =  require('express').Router()

/* Better way get all logical code and put in a controller */


router.get('/items', async (req,res) =>{
  let {list_id} = req.body
  let items = await ItemList.getAllItems(list_id);
  res.status(200).json({items : items })
})

router.get('/item/:id', async (req,res) => {
  let {id} = req.params;
  let item = await ItemList.getItem(id)

  if(item !== null){
    res.status(200).json({item : item})
  }else{
    res.status(404).json({message:`l'item ${id} non trouvée`})
  }
})

router.post('/add/item/', async (req,res) => {

  let {name,list_id}= req.body

  let results = await ItemList.addItem(name,list_id)
  if(results){
    res.status(200).json({message:`l'item ${name} à bien été créer`})
  }else{
    res.status(400).json({message:`l'item ${name} n'as pu être créer`})
  }
})
router.post('/delete/item/', async (req,res) => {

  let {id}= req.body
  let results = await ItemList.deleteItem(id)
  if(results){
    res.status(200).json({message:`l'item ${id} à bien été supprimer`})
  }else{
    res.status(400).json({message:`l'item ${id} n'as pu être supprimer`})
  }
})
router.put('/update/item/', async (req,res) => {

  let {id}= req.body
  let name= req.body.name ?? false ;
  let done= req.body.done ?? false ; // if the name change so we can say that the done variable is reset.

  let status = await ItemList.updateItem(id,name,done)
  if(status){
    res.status(200).json({message:`l'item ${name} à bien été mis à jour`})
  }else{
    res.status(400).json({message:`l'item ${name} n'as pu être mis à jour`})
  }

})
module.exports = router
