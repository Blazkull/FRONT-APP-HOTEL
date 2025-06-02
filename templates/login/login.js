document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await axios.post("http://127.0.0.1:8000/api/login", {
            username,
            password
        });

        // Asegúrate de que la respuesta contenga el token en response.data.acces_token
        const token = response.data.acces_token; 

        // Almacenar el token en localStorage
        localStorage.setItem("token", token);

        document.getElementById("message").innerHTML = `
            <div class="alert alert-success">
                ${response.data.message || 'Inicio de sesión exitoso'}
            </div>
        `;

        // Redirigir al dashboard después de un breve retraso o inmediatamente
        // Puedes usar un setTimeout si quieres que el mensaje de éxito se muestre un momento.
        // setTimeout(() => {
        //     window.location.href = "/templates/dashboard/dashboard.html";
        // }, 1000); // Redirige después de 1 segundo
        window.location.href = "/templates/dashboard/dashboard.html";

    } catch (error) {
        const errMsg = error.response?.data?.detail || "Error desconocido. Por favor, intenta de nuevo.";
        document.getElementById("message").innerHTML = `
            <div class="alert alert-danger">
                ${errMsg}
            </div>
        `;
        // Opcional: Limpiar el token si hubo un error en la autenticación (aunque no debería haberlo si falla antes de obtenerlo)
        localStorage.removeItem("token");
    }
});