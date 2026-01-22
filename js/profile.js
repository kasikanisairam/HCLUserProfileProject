$(document).ready(function () {

    console.log("profile.js loaded");

    const token = localStorage.getItem("session_token");
    console.log(token);
    // 🔐 Session check
    if (!token) {
        alert("Session expired. Please login again.");
        window.location.href = "login.html";
        return;
    }

    // 🔹 Load profile data
    $.ajax({
        url: "../backend/profile_get.php",
        type: "POST",
        dataType: "json",
        data: { token: token },
        success: function (res) {
            if (res.status) {
                $("#name").val(res.data.name);
                $("#age").val(res.data.age);
                $("#dob").val(res.data.dob);
                $("#contact").val(res.data.contact);
            } else {
                alert(res.message);
                localStorage.removeItem("session_token");
                window.location.href = "login.html";
            }
        },
        error: function (xhr) {
            console.error("Profile load error:", xhr.responseText);
            alert("Unable to load profile");
        }
    });

    // 🔹 Update profile
    $("#saveBtn").on("click", function () {
        function showError(selector, message) {
            $(selector).after(`<div class="text-danger error">${message}</div>`);
            $(selector).focus();
        }
        console.log("Update button clicked");

        const name = $("#name").val();
        const age = $("#age").val();
        const dob = $("#dob").val();
        const contact = $("#contact").val();


        // Name validation
        if (name === "") {
            showError("#name", "Name is required");
            return;
        }
        if (name.length < 3) {
            showError("#name", "Name must be at least 3 characters");
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
            url: "../backend/profile_update.php",
            type: "POST",
            dataType: "json",
            data: {
                token: token,
                name: name,
                age: age,
                dob: dob,
                contact: contact
            },
            success: function (res) {
                if (res.status) {
                    alert(res.message);
                    window.location.href = "profile.html";
                } else {
                    alert(res.message);
                }
            },
            error: function (xhr) {
                console.error("Update error:", xhr.responseText);
                alert("Profile update failed");
            }
        });
    });


    $("#logoutBtn").on("click", function () {
        localStorage.setItem("session_token", null);
        window.location.href = "login.html";
    });

});
