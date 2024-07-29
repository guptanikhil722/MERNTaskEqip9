import db from '../../models/index.js'
import {authconfig} from "../../config/auth.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const  User  = db.users;

export const signup = async (req, res) => {
  try {
    console.log('body>>>', req.body)
    // setTimeout(()=>{
        return new Promise(async(resolve,reject)=>{
          const user = await  db.users.create({
                id : Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                number: req.body.number,
                password: bcrypt.hashSync(req.body.password, 8),
                createdAt: new Date(),
                updateAt : new Date()
            })
            if(user){
                resolve(user)
            }else{
                reject()
            }
        })
        
    // },2000) 
    .then((user)=>{
        console.log('number>>>', user)
        if(user){
         return res.status(200).json(user)
        }
    }).catch((err)=>{
        console.log('err>>>', err)
    })
   
  
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        number: req.body.number,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, authconfig.secret, {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: '24h', // 24 hours
    });

   

    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      number: user.number,
      sessionToken: token 
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};