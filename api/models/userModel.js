import mongoose from "mongoose";

/*
Un esquema Mongoose define la estructura del documento, los valores por defecto, los validadores
*/
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
/*
 mongoose.model() del módulo mongoose se utiliza para crear una colección de una base de datos
*/
const User = mongoose.model("User", userSchema);
export default User;
