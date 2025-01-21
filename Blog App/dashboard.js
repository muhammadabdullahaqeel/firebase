
import { auth, collection, db, doc, getDoc, onAuthStateChanged, addDoc, getDocs, signOut, updateDoc, deleteDoc } from "./firebase.js";

const authCheck = async () => {
    const userUid = localStorage.getItem("uid");
    if (!userUid) {
        window.location.replace("./index.html");
    }

    // Fetch user data (if needed)
    const userData = await getDoc(doc(db, "users", userUid));
    console.log("User data:", userData.data());
};

const blogPost = async () => {
    try {
        const title = document.querySelector("#title").value;
        const desc = document.querySelector("#desc").value;
        const checkbox = document.querySelector("#checkbox").checked;

        const obj = {
            title,
            desc,
            isPrivate: checkbox,
            uid: localStorage.getItem("uid"),
        };

        await addDoc(collection(db, "blogs"), obj);
        alert("Blog created successfully!");
        await getPost();
    } catch (error) {
        console.error("Error creating blog:", error.message);
    }
};

const getPost = async () => {
    try {
        const parent = document.getElementById("parent");
        const snapShot = await getDocs(collection(db, "blogs"));
        const currentUserUid = localStorage.getItem("uid");

        parent.innerHTML = ""; // Clear previous content

        snapShot.forEach((doc) => {
            const blogData = doc.data();
            const blogId = doc.id;
            const isOwner = blogData.uid === currentUserUid;
            const isPrivateBlog = blogData.isPrivate ? "Private" : "Public";

            parent.innerHTML += `
                <div>
                    <li><strong>Title:</strong> ${blogData.title}</li>
                    <li><strong>Description:</strong> ${blogData.desc}</li>
                    <li><strong>Privacy:</strong> ${isPrivateBlog}</li>
                    ${isOwner ? `
                        <button onclick="editPost('${blogId}', '${blogData.title}', '${blogData.desc}', ${blogData.isPrivate})">EDIT</button>
                        <button onclick="deletePost('${blogId}')">DELETE</button>
                    ` : ""}
                    <hr />
                </div>`;
        });
    } catch (error) {
        console.error("Error fetching posts:", error.message);
    }
};

const deletePost = async (blogId) => {
    try {
        await deleteDoc(doc(db, "blogs", blogId));
        alert("Blog deleted successfully!");
        await getPost();
    } catch (error) {
        console.error("Error deleting post:", error.message);
    }
};

const editPost = async (blogId, currentTitle, currentDesc, isPrivate) => {
    try {
        document.querySelector("#title").value = currentTitle;
        document.querySelector("#desc").value = currentDesc;
        document.querySelector("#checkbox").checked = isPrivate;

        const updateButton = document.querySelector("#updateButton");
        updateButton.style.display = "block";
        updateButton.onclick = () => updatePost(blogId);
    } catch (error) {
        console.error("Error in editPost:", error.message);
    }
};

const updatePost = async (blogId) => {
    try {
        const title = document.querySelector("#title").value;
        const desc = document.querySelector("#desc").value;
        const isPrivate = document.querySelector("#checkbox").checked;

        await updateDoc(doc(db, "blogs", blogId), { title, desc, isPrivate });

        alert("Blog updated successfully!");
        document.querySelector("#updateButton").style.display = "none";
        await getPost();
    } catch (error) {
        console.error("Error updating post:", error.message);
    }
};

const logoutHandler = async () => {
    try {
        await signOut(auth);
        localStorage.removeItem("uid");
        window.location.replace("./index.html");
    } catch (error) {
        console.error("Error during logout:", error.message);
        alert("Error logging out. Please try again.");
    }
};

document.getElementById("logoutButton").addEventListener("click", logoutHandler);

window.blogPost = blogPost;
window.authCheck = authCheck;
window.getPost = getPost;
window.deletePost = deletePost;
window.editPost = editPost;
window.updatePost = updatePost;


