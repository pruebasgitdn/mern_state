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
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2F736x%2F89%2F90%2F48%2F899048ab0cc455154006fdb9676964b3.jpg&tbnid=ayWNELQUboo9qM&vet=12ahUKEwjkw4ex6ZeFAxWuj7AFHTuvB0MQxiAoA3oECAAQKg..i&imgrefurl=https%3A%2F%2Fwww.pinterest.es%2Fpin%2F606015693604756163%2F&docid=HixZqvfpNv2HkM&w=640&h=640&itg=1&q=user%20avatar&ved=2ahUKEwjkw4ex6ZeFAxWuj7AFHTuvB0MQxiAoA3oECAAQKg",
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
