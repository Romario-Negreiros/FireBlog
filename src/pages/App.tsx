import { FC } from "react";
import Blog from "./Blog/Blog";
import Login from "./Login/Login";
import { firebaseAuth, firebaseDatabase, firebaseStorage } from "../firebase";

const App: FC = () => {
  console.log(firebaseAuth, firebaseDatabase, firebaseStorage);

  firebaseDatabase.child('hello').push({name: 'oi'})

  return (
    <>
      <Blog />
      <Login />
    </>
  );
};

export default App;
