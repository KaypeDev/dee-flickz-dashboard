import LoginButton from "./LoginButton";

export default function Login() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Please sign in to access the dashboard</h2>
      <LoginButton />
    </div>
  );
}