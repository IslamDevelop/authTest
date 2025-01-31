import { useForm } from "react-hook-form";
import styles from "./AuthForm.module.css";
import { AuthFormData } from "../../features/Auth/model/types"
import { Loader } from "../../shared/ui/Loader"
import { useState } from "react";

interface AuthFormProps {
  onSubmit: (data: AuthFormData, endpoint: "register" | "login") => void;
}

export function AuthForm({ onSubmit }: AuthFormProps) {
    const {
      register,
      handleSubmit,
      formState: { isSubmitting },
    } = useForm<AuthFormData>();
  
    const [isRegisterMode, setIsRegisterMode] = useState(true); // Режим регистрации/авторизации
  
    return (
      <div className={styles.container}>
        <form
          onSubmit={handleSubmit((data) =>
            onSubmit(data, isRegisterMode ? "register" : "login")
          )}
          className={styles.form}
        >
          <h3>{isRegisterMode ? "Регистрация" : "Авторизация"}</h3>
          <input
            placeholder="Email"
            {...register("email")}
            className={styles.input}
          />
          <input
            placeholder="Пароль"
            type="password"
            {...register("password")}
            className={styles.input}
          />
          <button type="submit" className={styles.button} disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader />
            ) : isRegisterMode ? (
              "Зарегистрироваться"
            ) : (
              "Войти"
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsRegisterMode((prev) => !prev)} // Переключаем режим
            className={styles.toggleButton}
          >
            {isRegisterMode
              ? "Уже есть аккаунт? Войти"
              : "Нет аккаунта? Зарегистрироваться"}
          </button>
        </form>
      </div>
    );
  }