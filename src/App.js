import { useState ,useEffect} from "react";
import {db} from "./firebase/firebase-config"

import {addDoc, collection,getDocs,} from "firebase/firestore"



function App() {
  const [newuser,setNewuser] = useState("")
  const [user,setUser] = useState([]);
  const userCollectionRef = collection(db,"users");


  
  useEffect(() => {
    const getUsers = async () =>{
      const data = await getDocs(userCollectionRef);
      console.log(data)
      setUser(data.docs.map((doc) => ({...doc.data() , id: doc.id})));
      
    }

    getUsers()
  }, []) 


  const AddUser = async ()=>{
  
    console.log(newuser)
  await addDoc(userCollectionRef, {name:newuser});
  window.location.reload();
}




  return (
    <div className="App">

      <div className="text-center w-full">
        <h1 className="text-4xl font-bold">Add new name</h1>

        <div >
          <input type="text" placeholder="Enter name" className="w-[300px] border-slate-600 border px-2" onChange={(event) => {setNewuser(event.target.value)}}/>

          <button onClick={AddUser} className="ml-10 border border-slate-700 px-2">Add name</button>
        </div>
   

      </div>

       {user.map((singleuser)=>{
          return(
            <li key={singleuser.id}>{singleuser.name}</li>
          )
       })}
    </div>
  );
}

export default App;
