import { auth, db, getDocs, collection, query, where } from "./firebaseInit.js";

document.addEventListener("DOMContentLoaded", function () {
    fetch("sidebar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("sidebar-placeholder").innerHTML = data;

            const profileImage = document.getElementById("profileImage");
            const loginLink = document.querySelector("#loginLink");
            const signUpLink = document.querySelector("#signUpLink");
            const profileLink = document.getElementById("profileLink");
            const logoutLink = document.getElementById("logoutLink");

            if (profileImage && loginLink && profileLink && logoutLink) {
                auth.onAuthStateChanged(async (user) => {
                    if (user) {
                        const usersRef = collection(db, "users");
                        const q = query(usersRef, where("uid", "==", user.uid));
                        
                        try {
                            const querySnapshot = await getDocs(q);
                            if (!querySnapshot.empty) {
                                const userData = querySnapshot.docs[0].data();
                                const photoURL = userData.photoURL || "./public/images/usernotlogin.JPG";
                                profileImage.src = photoURL;
                            } else {
                                console.log("No matching user document found.");
                                profileImage.src = "./public/images/usernotlogin.JPG";
                            }

                            profileLink.style.display = "block";
                            logoutLink.style.display = "block";
                            loginLink.style.display = "none";
                            signUpLink.style.display = "none";
                        } catch (error) {
                            console.error("Error fetching user document:", error);
                            alert("An error occurred while retrieving your profile information. Please try again later.");
                        }
                    } else {
                        profileImage.src = "./public/images/usernotlogin.JPG";
                        profileLink.style.display = "none";
                        logoutLink.style.display = "none";
                        loginLink.style.display = "block";
                        signUpLink.style.display = "block";
                    }
                });

                if (logoutLink) {
                    logoutLink.addEventListener("click", function (event) {
                        event.preventDefault();

                        auth.signOut()
                            .then(() => {
                                window.location.href = "userLogin.html";
                            })
                            .catch((error) => {
                                console.error("Error signing out:", error);
                                alert("An error occurred while signing out. Please try again.");
                            });
                    });
                }
            } else {
                console.error("One or more elements not found in the sidebar.");
                alert("There was an error loading the sidebar. Please refresh the page.");
            }

            const currentPage = window.location.pathname.split('/').pop();
            let links = null;

            if (currentPage) {
                if (["homepage.html", "recipeBrowse.html", "recipeSubmission.html"].includes(currentPage)) {
                    links = document.querySelectorAll('.customNav-right a');
                } else if (["userLogin.html", "userSignUp.html", "userProfile.html"].includes(currentPage)) {
                    links = document.querySelectorAll('.customNav-link');
                } else {
                    links = null;
                }
            }

            if (links) {
                links.forEach(link => {
                    if (link.getAttribute('href') === currentPage) {
                        link.classList.add('active');
                    }
                });
            }
        })
        .catch(error => {
            console.error("Error loading sidebar:", error);
            alert("An error occurred while loading the sidebar. Please try refreshing the page.");
        });
});
