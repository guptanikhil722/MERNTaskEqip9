import db from "../models/index.js";

const  User  = db.users;

export const checkDuplicateNumber = async (req, res, next) => {
  try {
    console.log('user>>>', User)
    //Check for duplicate number
    return new Promise(async(resolve, reject)=>{
        let user = await db.users.findOne({
            where: {
              number: req.body.number,
            },
          });
          
          if (!user) {
            resolve()
          }else{
            reject()
          }
    }).then(()=>{
        next();
    }).catch(err=>{
        console.log(err)
        return res.status(400).send({
            message: "Failed! Number is already in use!",
          });
       
    })
  } catch (error) {
    console.log('verification err>>', error)
    return res.status(500).send({
      message: error.message,
    });
  }
};