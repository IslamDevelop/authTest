import { useState, useEffect } from "react";
import styles from './Auth.module.css'
import { AuthFormData, UserProfile } from "../model/types";
import { AuthForm } from "../../../widgets/AuthForm/AuthForm";
import { Profile } from "../../../widgets/Profile/Profile";


export function Auth() {
  const [token, setToken] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);

  // Восстановление токена из localStorage при загрузке компонента
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleAuth = async (
    data: AuthFormData,
    endpoint: "register" | "login"
  ) => {
    try {
      const res = await fetch(
        `https://backend-ashen-seven-22.vercel.app/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const responseData = await res.json();
      if (res.ok) {
        setToken(responseData.token);
        localStorage.setItem("token", responseData.token); // Сохраняем токен в localStorage
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchProfile = async () => {
    if (!token) return;
    try {
      const res = await fetch(
        "https://backend-ashen-seven-22.vercel.app/profile",
        {
          method: "GET",
          headers: { Authorization: token },
        }
      );
      const data: UserProfile = await res.json();
      if (res.ok) {
        setProfiles((prev) => [...prev, data]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    setToken(null); // Очищаем токен
    setProfiles([]); // Очищаем профили
    localStorage.removeItem("token"); // Удаляем токен из localStorage
  };

  return (
    <div className={styles.container}>
      {!token ? (
        <AuthForm onSubmit={handleAuth} />
      ) : (
        <Profile
          profiles={profiles}
          onLogout={handleLogout}
          onFetchProfile={fetchProfile}
        />
      )}
    </div>
  );
}