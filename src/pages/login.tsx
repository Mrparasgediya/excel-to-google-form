import { NextPage } from "next";
import Link from "next/link";

const LogInPage: NextPage = () => {
  return (
    <div>
      <h1>Login </h1>
      <button>
        <Link href="/api/auth/login">Login</Link>
      </button>
    </div>
  );
};

export default LogInPage;
