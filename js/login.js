$("#loginBtn").click(function () {
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
        url: "../backend/login.php",
        method: "POST",
        data: {
            email: $("#email").val(),
            password: $("#password").val()
        },
        success: function (resData) {
            let res = JSON.parse(resData);
            console.log(res);
            if(res.status==true){
                localStorage.setItem("session_token", res.token);
                window.location.href = "profile.html";
            }else{
                 localStorage.setItem("session_token", res.token);
                 alert(res.message);
            }
            
        }
    });
});
