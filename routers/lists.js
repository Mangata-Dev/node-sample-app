const List = require('../models/List')
const router =  require('express').Router()

router.get('/lists', async (req,res) =>{
  let lists = await List.getAllLists();
  res.status(200).json({lists : lists })
})

router.get('/view/lists', async (req,res) =>{
  let lists = await List.getListView();
  res.status(200).json({lists : lists })
})

router.get('/list/:id', async (req,res) => {
  let {id} = req.params;
  let list = await List.getList(id)

  if(list !== null){
    res.status(200).json({list : list})
  }else{
    res.status(404).json({message:`la list ${id} non trouvée`})
  }
})

router.post('/add/list/', async (req,res) => {
  let {title}= req.body
  let results = await List.addList(title)

  if(results){
    res.status(200).json({message:`la liste ${title} à bien été créer`})
  }else{
    res.status(400).json({message:`la liste ${title} n'as pu être créer`})
  }
})

router.post('/delete/list/', async (req,res) => {

  let {id}= req.body
  let results = await List.deleteList(id)
  if(results){
    res.status(200).json({message:`la liste  ${id} à bien été supprimer`})
  }else{
    res.status(400).json({message:`la liste ${id} n'as pu être supprimer`})
  }
})

router.put('/update/list/', async (req,res) => {

  let {title,id}= req.body
  let status = await List.updateList(id,title)
  if(status){
    res.status(200).json({message:`la liste ${title} à bien été mis à jour`})
  }else{
    res.status(400).json({message:`la liste ${title} n'as pu être mis à jour`})
  }

})

module.exports = router
