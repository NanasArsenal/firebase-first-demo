import { useState ,useEffect} from "react";
import {db} from "./firebase/firebase-config"

import {collection,doc,getDocs} from "firebase/firestore"


function App() {

  const [user,setUser] = useState([]);
  const userCollectionRef = collection(db,"users");

  useEffect(() => {
    const getUsers = async () =>{
      const data = await getDocs(userCollectionRef);
      console.log(data)

      setUser(data.docs.map((doc) => ({...doc.data() , id: doc.id})))
     
      
    }

    getUsers()
  }, [])
  
  return (
    <div className="App">
       {user.map((singleuser)=>{
          return(
            <li key={singleuser.id}>{singleuser.name}</li>
          )
       })}
    </div>
  );
}

export default App;
