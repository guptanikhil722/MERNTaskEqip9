import db from "../../models/index.js"

export const getAllUsers = async(req, res) =>{
    try{
    const users = await db.users.findAll()
    if(users.length > 0){
        res.status(200).json(users)
    }else{
        res.status(404).json({message: "No users found"})
    }
    
    }catch(error){
        res.status(500).json({message: "Error fetching users" })
    }
}
export const updateUserDetail = async(req, res) =>{
  
    try{
        let _id = req.params.id
        var{firstname, lastname, number} = req.body
        const user = await db.users.findByPk(_id)
        if(!user){
            res.status(404).json({message: "No users found"})
          }
          console.log('id>>', _id)
          console.log('req.body>>', req.body)
         const updated = await db.users.update({firstname: req.body.firstname, lastname: req.body.lastName, number: req.body.number},
          {where:{id:_id}})
            console.log('updated>>>', updated)
            if(!updated){
                res.status(500).json({message: "error updating"})
              }
              const updatedUser = await db.users.findByPk(_id)
                res.status(200).json({message: "updated successfully", data : updatedUser})
                console.log('res>>>', updatedUser)
            
         
    
    }catch(error){
        res.status(500).json({message: "Error fetching users" })
    }
}

export const deleteUser = async(req, res) => {
  
    try {
        let id = req.params.id
       await db.users.destroy({ where: { id: id }} )
       res.status(200).json({message: "Deleted Successfully"})
    } catch (error) {
        res.status(500).json({message: "Error in deleting."})
    }
}