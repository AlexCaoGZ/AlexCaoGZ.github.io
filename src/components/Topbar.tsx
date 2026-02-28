import { Link } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../utils/Auth";
import SearchBar from "./SearchBar";

export default function Topbar() {
  const { login, logout, user } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        username: "zcao3138",
        password: "8723138",
      });

      const { access_token, user } = response.data;
      login(access_token, user);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#FFFFFF",
        color: "white",
        borderBottom: "1px solid #DCDCDC",
      }}
    >
      {/* lift side */}
      <div style={{ flex: 1 }}>
        <Link
          to="/Favorite"
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            color: "black",
            textDecoration: "none",
          }}
        >
          zcao3138
        </Link>
      </div>

      {/* middle */}
      <div style={{ flex: 2, display: "flex", justifyContent: "center" }}>
        <SearchBar />
      </div>

      {/* right side */}
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "right",
        }}
      >
        {user ? (
          // UI for Login-ed
          <>
            <span style={{ color: "black" }}>
              Good Day, {user.firstName} {user.lastName}
            </span>
            <button
              onClick={handleLogout}
              style={{
                width: "80px",
                textAlign: "center",
                padding: "16px 0",
                cursor: "pointer",
                borderRadius: "20px",
                border: "none",
                fontWeight: "bold",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          // UI for not Login-ed
          <button
            onClick={handleLogin}
            style={{
              width: "80px",
              textAlign: "center",
              padding: "16px 0",
              cursor: "pointer",
              borderRadius: "20px",
              border: "none",
              backgroundColor: "#66ccff",
              fontWeight: "bold",
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
