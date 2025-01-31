import { UserProfile } from "../../features/Auth/model/types";
import styles from "./Profile.module.css"


interface ProfileProps {
  profiles: UserProfile[];
  onLogout: () => void;
  onFetchProfile: () => void;
}

export function Profile({ profiles, onLogout, onFetchProfile }: ProfileProps) {
  return (
    <div className={styles.container}>
      <button onClick={onFetchProfile} className={styles.fetchButton}>
        Получить профиль
      </button>
      <button onClick={onLogout} className={styles.logoutButton}>
        Выйти
      </button>

      {profiles.length > 0 && (
        <div className={styles.profileContainer}>
          <h3>Профили</h3>
          {profiles.map((profile, index) => (
            <div key={index} className={styles.profileCard}>
              <p>Email: {profile.email}</p>
              <p>ID: {profile.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}