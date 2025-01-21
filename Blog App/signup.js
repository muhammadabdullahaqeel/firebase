import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from "./firebase.js"
const authCheck = () => {
    const userUid = localStorage.getItem("uid")
    console.log("userUid", userUid)
    if (userUid) {
        window.location.replace("./dashboard.html")
    }
}


const firstName = document.querySelector("#firstName")
const lastName = document.querySelector("#lastName")
const email = document.querySelector("#email")
const password = document.querySelector("#password")

const signupHandler = async () => {
    try {
        if(!email.value || !password.value) {
            alert("Please Enter Email or Password!")
            return
        }

        const response = await createUserWithEmailAndPassword(auth, email.value, password.value)
        console.log("response", response)

        await setDoc(doc(db, "users", response.user.uid), {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value
        })

        window.location.href = "./index.html"
        alert("User Successfully Signup!")

    } catch (error) {
        console.log("error", error.message)
        alert(error.code)
    }
}

window.signupHandler = signupHandler
window.authCheck = authCheck