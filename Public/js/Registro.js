document.getElementById("formRegistro").addEventListener("submit", function(e){

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(password.length < 6){
        alert("La contraseña debe tener mínimo 6 caracteres");
        e.preventDefault();
        return;
    }

    if(password !== confirmPassword){
        alert("Las contraseñas no coinciden");
        e.preventDefault();
        return;
    }

});
