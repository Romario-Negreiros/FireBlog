import { FC, useState } from 'react';
// import Blog from "./Blog/Blog";
import Login from './Login/Login';
// import { firebaseAuth, firebaseDatabase, firebaseStorage } from "../firebase";

const App: FC = () => {
    const [userID, setUserID] = useState<string>('');
    console.log(userID)

    return (
        <>
            {/* <Blog /> */}
            <Login setUserID={setUserID} />
        </>
    );
};

export default App;
