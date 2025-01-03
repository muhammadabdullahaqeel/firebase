import { app , db , collection , addDoc , getDocs   } from "./firebase.js"
// console.log(app ,"app")
// console.log(db , "db")

const addDataBtn = document.querySelector("#addDataBtn")
const readDataBtn = document.querySelector("#readDataBtn")
const updateDataBtn = document.querySelector("#updateDataBtn")
const deleteDataBtn = document.querySelector("#deleteDataBtn")

const addData = async ()=>{
    try {
        const docRef = await addDoc(collection(db, "users"), {
          first: "Muhammad",
          last: "Abdullah",
          born: 2003,
          gender: "male"
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.log("Error: ", error.message);
      }
}

const readData = async ()=>{
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
});

    } catch (error) {
        console.log("Error: ", error.message);
    }
    
}

const updateData =()=>{
    
    
}

const deleteData =()=>{
    
}




addDataBtn.addEventListener("click" , addData)
readDataBtn.addEventListener("click" , readData)
updateDataBtn.addEventListener("click" , updateData)
deleteDataBtn.addEventListener("click" , deleteData)