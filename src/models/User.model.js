import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    emailId: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save",async function(next){
if(this.isModified('password')){
  this.password = await bcrypt.hash(this.password,10)
}
next();
})

const User = mongoose.model("User", userSchema);
export default User;

