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
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.thenounproject.com%2Fpng%2F363640-200.png&tbnid=n5mh09hGFtfx2M&vet=12ahUKEwir7f_T7pSFAxVlO1kFHboABOwQMygJegQIARBb..i&imgrefurl=https%3A%2F%2Fthenounproject.com%2Fbrowse%2Ficons%2Fterm%2Fuser-avatar%2F&docid=8YdYrZ0vhkOzRM&w=200&h=200&q=user%20avatar&ved=2ahUKEwir7f_T7pSFAxVlO1kFHboABOwQMygJegQIARBb",
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
