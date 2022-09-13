import { useRouter } from "next/router";
const introduction = () => {
  const router = useRouter();
  return (
    <div>
      <h1>introductionの画面</h1>
      <button
        onClick={() => {
          window.localStorage.setItem("tmp", "tmp");
          router.replace("/userAction/signup");
        }}
      >
        紹介ページ見終わった！！
      </button>
    </div>
  );
};

export default introduction;
