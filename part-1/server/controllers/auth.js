const bcrypt = require("bcryptjs");

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body

      for (let i = 0; i < users.length; i++) {

         const pinExists = bcrypt.compareSync(password, users[i].password);
        if (users[i].username === username && users[i].password === password) {
       
          res.status(200).send(users[i])
        }
      }

      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        const pin = req.body.password;
        console.log(req.body.password)

         //Salt represents complexity of our encryption in terms of patterns
         const salt = bcrypt.genSaltSync(10);
         console.log(salt);
 
         //The hash represents the actual encryption of our password
         const pinHash = bcrypt.hashSync(pin,salt);
         //Update object to include encrypted password instead of password and add it to the users array
         let hashUserObj = req.body;
         hashUserObj.password = pinHash;
         console.log(hashUserObj);

        users.push(hashUserObj);
        res.status(200).send(req.body)
    }
}