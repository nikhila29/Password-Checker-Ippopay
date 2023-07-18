const express = require('express')
const app = express()
var cors = require('cors')
const mongoose  = require('mongoose')
const PORT = 5000

const url = 'mongodb+srv://nikhila2929:3OzbSlA8zFbFuO33@cluster0.jdb9h1g.mongodb.net/?retryWrites=true&w=majority';

//3OzbSlA8zFbFuO33
// mongodb+srv://nikhila2929:3OzbSlA8zFbFuO33@cluster0.jdb9h1g.mongodb.net/?retryWrites=true&w=majority

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect('mongodb+srv://nikhila2929:3OzbSlA8zFbFuO33@cluster0.jdb9h1g.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo yeahhoo")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

const passwordSchema = new mongoose.Schema({
    password: String,
    result: String
})

const Password = new mongoose.model("Password", passwordSchema)


const strongPasswordChecker = (password) => {

    const minLength = 6;
    const maxLength = 20;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /[0-9]/;
  
    // Check if the password is already strong
    let missingConditions = 0;
    if (!lowercaseRegex.test(password)) {
      missingConditions++;
    }
    if (!uppercaseRegex.test(password)) {
      missingConditions++;
    }
    if (!digitRegex.test(password)) {
      missingConditions++;
    }
  
    // Check the length condition
    if (password.length < minLength) {
      const addLength = minLength - password.length;
      return Math.max(missingConditions, addLength);
    } else if (password.length > maxLength) {
      let deleteLength = password.length - maxLength;
      let repeatingChars = 0;
      let i = 2;
  
      // Count repeating characters to optimize deletions
      while (i < password.length) {
        if (
          password[i] === password[i - 1] &&
          password[i] === password[i - 2]
        ) {
          repeatingChars++;
          i += 3; // Skip the repeating characters
        } else {
          i++;
        }
      }
  
      deleteLength -= repeatingChars * 2;
      return deleteLength > missingConditions
        ? deleteLength
        : Math.max(deleteLength, missingConditions);
    } else {
      // Password length is within the valid range, check for repeating characters
      let repeatingChars = 0;
      let i = 2;
  
      while (i < password.length) {
        if (
          password[i] === password[i - 1] &&
          password[i] === password[i - 2]
        ) {
          repeatingChars++;
          i += 3; // Skip the repeating characters
        } else {
          i++;
        }
      }
  
      return Math.max(repeatingChars, missingConditions);
    }

}; 

app.post('/password', async (req, res) => {
    const { password } = req.body;
  
    const result = strongPasswordChecker(password);
    console.log(result);
  
    try {
      const existingPassword = await Password.findOne({ password });
      if (existingPassword) {
        res.send({ message: 'Password already exists' });
        // res.send({message: result})
      } else {
        const passwordChecker = new Password({
          password,
          result: result.toString(), // Convert the result to a string to store it in MongoDB
        });
        await passwordChecker.save();
        // res.send({ message: 'Successfully done' });
        res.send({message: result})
      }
    } catch (err) {
      res.send(err);
    }
});


app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})
