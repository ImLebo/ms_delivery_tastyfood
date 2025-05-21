import { useGoogleLogin } from "@react-oauth/google";

export const useGoogleAuth = (onSuccessCallback?: () => void) => {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                console.log("🔐 Token de acceso:", tokenResponse.access_token);

                const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });

                const userInfo = await res.json();
                localStorage.setItem("usuarioGoogle", JSON.stringify(userInfo));
                console.log("✅ Usuario logueado:", userInfo);
                
                if (onSuccessCallback) onSuccessCallback(); // Ejecuta el callback
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