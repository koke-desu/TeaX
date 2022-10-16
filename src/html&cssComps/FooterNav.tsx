import { css } from "@emotion/css";
import Link from "next/link";
import { useRouter } from "next/router";

const FooterNav = () => {
  const router = useRouter();
  console.log("path is", router.pathname);
  return (
    <div className={styles.footer}>
      <Link href="/quiz/main">
        <div className={styles.part}>
          <p className={styles.nazotoki(router.pathname === "/quiz/main")}>
            謎解き
          </p>
        </div>
      </Link>
      <Link href="/order/main">
        <div className={styles.part}>
          <p className={styles.order(router.pathname === "/order/main")}>
            オーダー
          </p>
        </div>
      </Link>
    </div>
  );
};

const styles = {
  nazotoki: (isNazotoki: boolean) => css`
    transition: all 0.3s ease-in-out;
    color: ${isNazotoki ? "white" : "#ebebeb"};
    scale: ${isNazotoki ? 1 : 0.8};
    font-weight: bold;
  `,

  order: (isOrder: boolean) => css`
    transition: all 0.3s ease-in-out;
    color: ${isOrder ? "white" : "#ebebeb"};
    font-weight: bold;
    scale: ${isOrder ? 1 : 0.8};
  `,

  part: css`
    background-color: #87ce41;
    width: 50vw;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    margin: 0;
  `,

  footer: css`
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100vw;
  `,
};

export default FooterNav;
