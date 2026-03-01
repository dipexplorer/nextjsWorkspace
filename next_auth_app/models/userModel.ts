import mongoose from "mongoose";
import { BlockList } from "net";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Plz provide valid username"],
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "Plz provide valid email"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: true,
    required: [true, "Plz provide valid password"],
    minLength: 6,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpiry: Boolean,
  resetEmailToken: String,
  resetEmailExpiry: Boolean,
});

// Password hamesa hash hona sahiye
// Hash password before saving
/*
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
*/

// Compare password method
/*
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
*/

const User = mongoose.models.users || mongoose.model("User", userSchema);

export default User;

/*
NOTES:

mongoose.model("users", userSchema); --Nt directly wrng,mtlb frk nhi padta,yeh bhi chalega still standard nhi he
Mongoose expects singular model names.
Correct:
mongoose.model("User", userSchema);
Mongoose automatically pluralizes it to users collection internally.

3️⃣ You are storing tokens as plain strings
resetPasswordToken: String

This is bad security practice.
You should hash tokens before storing them.
If your DB leaks, attackers get working reset tokens.

Industry approach:
Generate token
Hash it with crypto
Store hashed version
Send original token to user

4️⃣ No validation on email
Right now:
email: { type: String, required: true, unique: true }

This allows:
"abc"
"123"
"notanemail"

Add validation:
match: [/.+@.+\..+/, "Please enter a valid email"]

5️⃣ No password hashing logic
This is just schema. Where is password hashing?
If you're storing raw passwords → catastrophic mistake.
You should use a pre-save hook:

{

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

}

Without this → you're not building production-ready backend.

6️⃣ Missing timestamps
Add this:
{ timestamps: true }

It automatically adds:
createdAt
updatedAt

*/
