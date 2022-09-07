import { logOut } from "../../src/database/basicFunc/auth";

const main = () => {
  return (
    <div>
      main
      <button
        onClick={() => {
          logOut();
        }}
      >
        signout
      </button>
    </div>
  );
};

export default main;
main;
