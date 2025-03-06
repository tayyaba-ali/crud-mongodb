import userSchema from "../schema/userSchema.js";
import User from "../Models/User.js"; 
import chalk from "chalk";

//get All users
const getAllUsers = async(req, res) => {
 
  try {
     const userCollection  =  await User.find()
     res.status(200).json({
      message: "All user fetched successfully",
      users: userCollection,
    });

  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};


// Create a user
const createUser = async (req, res) => {
	try {
		const user = await userSchema.validateAsync(req.body);
		const newUser = new User(user);

		await newUser.save();

		res.status(201).json({
			message: 'User created successfully',
			user: newUser,
		});
	} catch (error) {
		if (error?.code === 11000) {
			return res.status(409).json({
				message: 'Duplicate email - Email already exists',
				error: error.message,
			});
		}

		res.status(500).json({
			message: 'Internal Server Error',
			error: error.message,
		});
	}
};

const deleteUser = async(req, res) => {
  try {
		const { id } = req.params;

		const deletedUser = await  User.findOneAndDelete(id);
		if (!deletedUser) {
			return res.status(404).json({ message: 'User not found' });
    }
    console.log(chalk.bgMagentaBright(deleteUser))
		res.send({
			deletedId: { id, deletedUser },
			message: 'user deleted successfully',
		});
	} catch (error) {
		console.log(chalk.bgRed.white(error));
		res.status(500).json({ message: 'Internal server error', error });
	}
};


//Update a User
const updateUser = async(req, res) => {
  try {
		const { id } = req.params;

		const updatedUser = await User.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
		if (!updateUser) {
			res.status(404).json({
				message: 'user not found',
			});
		}

		res.send({
			updatedUser: { id, updatedUser },
			message: 'user updated successfully',
		});
	} catch (error) {
		console.log(chalk.bgRed.white(error));
		res.status(500).json({ message: 'Internal server error', error });
	}
};


//  get a specific user
const getUser = async(req, res) => {
  try {
		const { id } = req.params;
		const userFound = await User.findOne({_id:id});
		if (!userFound) {
			res.status(400).json({
				message: 'user not found',
			});
		}

		res.send({
			user: userFound,
			message: 'user found successfully',
		});
	} catch (error) {
		console.log(chalk.bgRed.white(error));
		res.status(500).json({ message: 'Internal server error', error });
	}
};

export { getAllUsers, updateUser, deleteUser, getUser, createUser };
