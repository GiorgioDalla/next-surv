import Link from "next/link";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  const handleClick = () => {
    console.log("taking survey");
    router.replace("/survey");
  };
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/survey/">
        <a>Survey</a>
      </Link>
      <Link href="/signin">
        <a>User</a>
      </Link>
      <button onClick={handleClick}>take survey</button>
    </div>
  );
}

export default Home;
