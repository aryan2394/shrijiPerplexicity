import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select:false
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt auto add ho jayenge
  }
);

userSchema.pre("save",async function ()
{
    if(!this.isModified("password"))
        return;
    return this.password=await bcrypt.hash(this.password,10);
})

userSchema.methods.comparePassword=async function (comparePassword)
{
    return await bcrypt.compare(comparePassword,this.password);
}

const userModel = mongoose.model("User", userSchema);

export default userModel;