import { Link } from "react-router-dom";

function UserCard({ user, handleSelectUser }) {
  return (
    <Link to={`/articles`} key={user.username} className="link">
      <section className="user-card" onClick={() => handleSelectUser(user)}>
        <img src={user.avatar_url} alt="avatar" />
        <h3>{user.username}</h3>
        <p>Name: {user.name}</p>
      </section>
    </Link>
  );
}

export default UserCard;
