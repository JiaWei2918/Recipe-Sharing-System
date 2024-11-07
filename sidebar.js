document.addEventListener("DOMContentLoaded", function () {
    const profileImage = document.getElementById("profileImage");

    // Mock data for example purposes. Replace with actual login status check.
    const isLoggedIn = true;
    const userProfilePhotoUrl = "user-photo.png"; // Path to user's profile photo

    // Check if the user is logged in
    if (isLoggedIn) {
        profileImage.src = userProfilePhotoUrl;  // User's profile photo
    } else {
        profileImage.src = "default-user-icon.png";  // Default icon if not logged in
    }
});
