import type { NextPage } from "next";
import Head from "next/head";
import MainPage from "../src/components/MainPage";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>TeaX</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff" />
      </Head>
      <main>
        <MainPage />
      </main>
    </div>
  );
};

export default Home;
