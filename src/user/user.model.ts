import * as mongoose from 'mongoose';

//user schema for database
export const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
});

//user interface for usage
export interface User extends mongoose.Document {
  name: string;
  password: string;
}
