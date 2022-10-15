import { css } from "@emotion/css";
import Link from "next/link";

const FooterNav = () => {
  return (
    <div className={styles.footer}>
      <Link href="/quiz/main">
        <div className={styles.part}>
          <p className={styles.nazotoki}>謎解き</p>
        </div>
      </Link>
      <Link href="/order/main">
        <div className={styles.part}>
          <p className={styles.order}>オーダー</p>
        </div>
      </Link>
    </div>
  );
};

const styles = {
  nazotoki: css`
    color: white;
  `,

  order: css`
    color: white;
  `,

  part: css`
    background-color: #00613e;
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
