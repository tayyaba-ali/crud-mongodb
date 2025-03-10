import userSchema from "../schema/userSchema.js";
import User from "../Models/User.js";
import chalk from "chalk";
import bcrypt from "bcrypt";

//get All users
export const getAllUsers = async (req, res) => {
  try {
    const userCollection = await User.find();
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
export const signup = async (req, res) => {
  console.log(chalk.bgCyan("incoming call to signup api"));
  try {
    const user = await userSchema.validateAsync(req.body);
    const password = bcrypt.hashSync(user.password, 10);
    const newUser = new User({ ...user, password });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        message: "Duplicate email - Email already exists",
        error: error.message,
      });
    }

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findOneAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(chalk.bgMagentaBright(deleteUser));
    res.send({
      deletedId: { id, deletedUser },
      message: "user deleted successfully",
    });
  } catch (error) {
    console.log(chalk.bgRed.white(error));
    res.status(500).json({ message: "Internal server error", error });
  }
};

//Update a User
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!updateUser) {
      res.status(404).json({
        message: "user not found",
      });
    }

    res.send({
      updatedUser: { id, updatedUser },
      message: "user updated successfully",
    });
  } catch (error) {
    console.log(chalk.bgRed.white(error));
    res.status(500).json({ message: "Internal server error", error });
  }
};

//  get a specific user
export const login = async (req, res) => {
  try {
    console.log("🚀 Incoming Login Request:", req.body);

    // Validate Request Data
    if (!req.body.email || !req.body.password) {
      console.error("❌ Missing email or password in request");
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email: req.body.email });
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!user) {
      console.error("❌ User not found with email:", req.body.email);
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
  
	if(!match){
		return res.status(401).json({
			success: false,
			message: "Unauthorized password",
		
		  });
	}
    res.status(200).json({
      success: true,
      message: "User signed in",
      user: { id: user.id },
    });
  } catch (error) {
    console.log(chalk.bgRed.white(error));
    res.status(500).json({ message: "Internal server error", error });
  }
};
