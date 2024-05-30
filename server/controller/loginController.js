const {User} = require("../model/userModel");
const {Orgs} = require("../model/userModel");
const fs = require("fs");
const readline = require("readline");

const getUsersById = async (req, res, next) => {
    // console.log("login controller is called");
	const userId = req.body;
	try {
		const user = await User.findOne({email:userId.email});
		if (!user) {
			res.status(404).json({ error: 'No User Found' });
			return ;
		}
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const addUsers = (req,res,next) => {
    try{
        User.init().then(async ()=>{
           var new_user = new User({
               name : req.body.name ,
               email : req.body.email ,
               role : req.body.role ,
               password : req.body.password ,
           });
           try {
               const user = await new_user.save();
               res.status(201).send(user);
           } catch (err) {
               console.log(err.message);
               res.status(500).json({ error: err.message });
           }
        });
   } catch(err){
       res.status(500).json({error:err.message});
   }
}

const getTestCases = (req,res,next) => {
const filePath = "D:\\SIH 2023 Finale\\Hardware-Trojan-Detection-UI\\D-Algorithm-Combinational\\D-Algorithm-Combinational\\testcases.txt";
  console.log("test cases fetching started");
  const testVectors = [];

  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });

  rl.on('line', (line) => {
    if (line.startsWith("Test Vector:")) {
      const testVector = line.substring(13).trim();
      if (!testVectors.includes(testVector)) {
        testVectors.push(testVector);
      }
    }
  });

  rl.on('close', () => {
    console.log("Test vectors is : ",testVectors)
    res.json({ testVectors });
  });
}

const post_ipfs_data = async (req,res) => {
  console.log("starting of post_ipfs_data")
  try{
    
    const newData = new Orgs({
      name :  req.body.name,
      nameOfCircuit : req.body.ic,
      url : req.body.url,
    });

    await newData.save();
    res.json({message: 'Data added to database successfully'});
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Internal server error'});
  }

}

const testRoute = (req,res,next) => {
    res.send("Testing will be here");
}

module.exports = {
    getUsersById ,
    addUsers ,
    testRoute ,
    getTestCases ,
    post_ipfs_data ,
}