import { useRouter } from "next/router";
import { AuthLogOut } from "../../src/database/basicFunc/auth";

const main = () => {
  const router = useRouter();
  return (
    <div>
      main
      <button
        onClick={() => {
          AuthLogOut();
          router.replace("/userAction/login");
        }}
      >
        signout
      </button>
    </div>
  );
};

export default main;
main;
