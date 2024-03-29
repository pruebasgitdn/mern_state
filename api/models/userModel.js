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
    avatar: {
      type: String,
      default:
        "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
    },
  },
  { timestamps: true }
);
/*
 mongoose.model() del módulo mongoose se utiliza para crear una colección de una base de datos

 tabla User
*/
const User = mongoose.model("User", userSchema);
export default User;
