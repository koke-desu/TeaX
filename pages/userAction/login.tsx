import TestLoginInput from "../../src/components/TestLoginInput";

const Login = () => {
  return (
    <div
      style={{
        zIndex: 9999,
        backgroundColor: "#e9e9e9",
        height: "100vh",
        position: "fixed",
        top: 0,
      }}
    >
      <TestLoginInput></TestLoginInput>
    </div>
  );
};

export default Login;
