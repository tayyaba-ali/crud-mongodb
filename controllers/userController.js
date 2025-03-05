import userSchema from "../schema/userSchema.js";
import User from "../Models/User.js";

const getAllUsers = async(req, res) => {
 
  try {
     const userCollection  =  await User.findBy()
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

const createUser = async (req, res) => {
  try {
    const user = await userSchema.validateAsync(req.body);
    const newUser = await new User(user);

    await newUser.save()

    res.status(201).json({
      message: "User created successfully",
      User: newUser,
    });
    console.log(value);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

const deleteUser = (req, res) => {
  try {
    const { id } = req.params;

    let index = users.findIndex((user) => user.id == id);
    users.splice(index, 1);

    res.send({
      deletedId: id,
      message: "user deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = (req, res) => {
  try {
    const { id } = req.params;

    let index = users.findIndex((user) => user.id == id);
    users.splice(index, 1, { ...req.body, id: id });

    res.send({
      updatedUser: id,
      message: "user updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
const getUser = (req, res) => {
  try {
    const { id } = req.params;
    let foundUser = users.find((obj) => obj.id == id);

    res.send({
      user: foundUser,
      message: "user found successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export { getAllUsers, updateUser, deleteUser, getUser, createUser };
