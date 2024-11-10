const firebaseConfig = {
    apiKey: "AIzaSyAi9neqoH67SXQ2JRxkVY_bl9xGCoHeYUI",
    authDomain: "rad-tjw.firebaseapp.com",
    projectId: "rad-tjw",
    storageBucket: "rad-tjw.appspot.com",
    messagingSenderId: "574586917129",
    appId: "1:574586917129:web:a6242e4bc8621a6bcf83d8",
    measurementId: "G-QW1W8CBYVT"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const profileImage = document.getElementById("profileImage");
const loginLink = document.getElementById("loginLink");
const signupLink = document.getElementById("signupLink");
const profileLink = document.getElementById("profileLink");
const logoutLink = document.getElementById("logoutLink");

function updateUserInterface(user) {
    if (user) {
        // Fetch user data from Firestore
        db.collection("users").doc(user.uid).get().then(doc => {
            if (doc.exists) {
                // Set profile image to user's photoURL if it exists, otherwise use default
                const userProfilePhotoUrl = doc.data().photoURL || "images/usernotlogin.JPG";
                profileImage.src = userProfilePhotoUrl;
            } else {
                console.log("No user document found in Firestore!");
                profileImage.src = "images/usernotlogin.JPG";
            }
        }).catch(error => {
            console.error("Error fetching user data:", error);
            profileImage.src = "images/usernotlogin.JPG";
        });

        loginLink.style.display = "none";
        signupLink.style.display = "none";
        profileLink.style.display = "block";
        logoutLink.style.display = "block";

        logoutLink.addEventListener("click", function (e) {
            e.preventDefault();
            firebase.auth().signOut().then(() => {
                console.log("User logged out");
                window.location.href = "homepage.html";
            }).catch(error => {
                console.error("Error logging out:", error);
            });
        });

    } else {
        profileImage.src = "images/usernotlogin.JPG";
        loginLink.style.display = "block";
        signupLink.style.display = "block";
        profileLink.style.display = "none";
        logoutLink.style.display = "none";
    }
}

firebase.auth().onAuthStateChanged(user => {
    updateUserInterface(user);
});
