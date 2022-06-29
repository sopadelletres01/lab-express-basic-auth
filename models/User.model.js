const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Username is required."]
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  }
});

//This is the middleware, It will be called before saving any record

 userSchema.pre("save", async function() {
  try {
    if (this.isModified("password") || this.isNew){
      const salt = await bcrypt.genSalt(10)
      console.log(salt)
      const hash = await bcrypt.hash(this.password, salt)
      console.log(hash)
      this.password = hash
    }
  } catch (error) {
    console.log(error)
  }
})

const User = model("User", userSchema);

module.exports = User;
