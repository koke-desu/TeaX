import Link from "next/link";

const BottomNavigation = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          border: "1px solid black",
          height: "50px",
          alignItems: "center",
          position: "fixed",
          bottom: 0,
          width: "100vw",
          backgroundColor: "white",
        }}
      >
        <Link href="/order/main">
          <a>order</a>
        </Link>
        <Link href="/quiz/main">
          <a>quiz</a>
        </Link>
      </div>
    </>
  );
};

export default BottomNavigation;
