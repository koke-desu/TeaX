import TestSigninInput from "../../src/components/TestSigninInput";

const signUp = () => {
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
      <TestSigninInput></TestSigninInput>
    </div>
  );
};

export default signUp;
