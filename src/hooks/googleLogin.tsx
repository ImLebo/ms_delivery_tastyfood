import { useGoogleLogin } from "@react-oauth/google";

export const useGoogleAuth = () => {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
        try {
            // Mostrar el token
            console.log("🔐 Token de acceso:", tokenResponse.access_token);

            // Obtener datos del usuario
            const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                },
            });

            const userInfo = await res.json();

            // Guardar usuario en localStorage
            localStorage.setItem("usuarioGoogle", JSON.stringify(userInfo));

            // Mostrar usuario en consola
            console.log("✅ Usuario logueado:", userInfo);
        } catch (error) {
        console.error("❌ Error al obtener datos del usuario:", error);
        }
    },
    onError: (error) => {
        console.error("❌ Error en el login de Google:", error);
    },
});
return login;
};
