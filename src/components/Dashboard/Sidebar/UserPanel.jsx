import useAuth from "../../../hooks/useAuth";

export default function UserPanel() {
  const { user } = useAuth();

  return (
    <div style={{ textAlign: "center", padding: "16px" }}>
      <img
        src={user?.photoURL || "https://i.ibb.co/YT8KQzG/placeholder.jpg"}
        alt="user"
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "10px"
        }}
      />
      <h3>{user?.displayName || "User"}</h3>
      <p>{user?.email}</p>
    </div>
  );
}
