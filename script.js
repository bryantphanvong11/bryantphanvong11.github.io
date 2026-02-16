// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent page reload

        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Send POST request to backend
        fetch("http://localhost:5000/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        })
        .then(res => {
            if (res.ok) {
                alert("Message sent successfully!");
                form.reset(); // Clear the form
            } else {
                alert("Error sending message. Check the backend.");
            }
        })
        .catch(err => {
            console.error("Fetch error:", err);
            alert("Cannot reach backend. Make sure server is running.");
        });
    });

});
