import mongoose from 'mongoose';

const databaseUser = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

databaseUser.index({email: 1,},{ unique: true },);

const User = mongoose.model('Users', databaseUser);

export default User;
