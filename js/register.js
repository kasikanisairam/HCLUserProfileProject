$("#registerBtn").click(function () {
    let email = $("#email").val().trim();
    let password = $("#password").val().trim();

    // Email regex
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear previous errors
    $(".error").remove();

    // Email validation
    if (email === "") {
        $("#email").after('<div class="text-danger error">Email is required</div>');
        return;
    }
    if (!emailPattern.test(email)) {
        $("#email").after('<div class="text-danger error">Enter a valid email</div>');
        return;
    }

    // Password validation
    if (password === "") {
        $("#password").after('<div class="text-danger error">Password is required</div>');
        return;
    }
    if (password.length < 6) {
        $("#password").after('<div class="text-danger error">Password must be at least 6 characters</div>');
        return;
    }

    $.ajax({
        url: "../backend/register.php",
        method: "POST",
        data: {
            email: $("#email").val(),
            password: $("#password").val()
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
