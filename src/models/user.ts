import bcrypt from "bcrypt";
import mongoose, { Document, Schema } from "mongoose";
import Team from "./team";

export interface UserDocument extends Document {
  name: String;
  username: String;
  password: String;

  // eslint-disable-next-line no-unused-vars
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 6,
    maxlength: 128,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
},{
  timestamps: true
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.pre('remove', async function(next){
  try{
      // find a user
      let team = await Team.findById(this.user);
      // remove the id of the message from their message list
      team.member.remove(this.id);
      // // save that user
      await team.save();
      // return next
      return next();
  }catch(err){
      return next(err);
  }    
})

userSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
