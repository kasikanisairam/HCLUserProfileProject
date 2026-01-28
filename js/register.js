$("#registerBtn").click(function () {
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();
    const name = $("#name").val().trim();
    const age = $("#age").val().trim();
    const dob = $("#dob").val().trim();
    const contact = $("#contact").val().trim();


    // Email regex
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear previous errors
    $(".error").remove();


    function showError(selector, message) {
        $(selector).after(`<div class="text-danger error">${message}</div>`);
        $(selector).focus();
    }
    console.log("Update button clicked");



    // Name validation
    if (name === "") {
        showError("#name", "Name is required");
        return;
    }
    if (name.length < 3) {
        showError("#name", "Name must be at least 3 characters");
        return;
    }
    // Email validation
    if (email === "") {
        showError("#email", "Email is required");
        return;
    }
    if (!emailPattern.test(email)) {
        showError("#email", "Enter a valid email");
        return;
    }

    // Password validation
    if (password === "") {
        showError("#password", "password is required");
        return;
    }
    if (password.length < 6) {
        showError("#password", "Password must be at least 6 characters");
        return;
    }

    // Age validation
    if (age === "") {
        showError("#age", "Age is required");
        return;
    }
    if (age < 1 || age > 120) {
        showError("#age", "Enter a valid age (1–120)");
        return;
    }

    // DOB validation
    if (dob === "") {
        showError("#dob", "Date of birth is required");
        return;
    }
    if (new Date(dob) > new Date()) {
        showError("#dob", "DOB cannot be a future date");
        return;
    }

    // Contact validation
    let phonePattern = /^[0-9]{10}$/;
    if (contact === "") {
        showError("#contact", "Contact number is required");
        return;
    }
    if (!phonePattern.test(contact)) {
        showError("#contact", "Enter a valid 10-digit contact number");
        return;
    }



    // Basic validation
    if (!name || !age || !dob || !contact) {
        alert("All fields are required");
        return;
    }

    $.ajax({
        url: "../backend/register.php",
        method: "POST",
        data: {
            email: email,
            password: password,
            name: name,
            age: age,
            dob: dob,
            contact: contact
        },
        success: function (res) {
            alert(res);
            window.location.href = "login.html";
        },
        error: function (xhr, status, error) {
            alert(error);
            console.log('Failed:', error);
        }
    });
});
