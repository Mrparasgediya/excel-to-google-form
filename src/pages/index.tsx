import type { NextPage } from 'next'
import Link from 'next/link';


const Home: NextPage = () => {

  const handleLogout = async () => {
    try {
      // get token from browser via request because of securehttp
      const { token } = await (await fetch('http://localhost:3000/api/auth/token')).json();
      // logout from server and revoke all access of this application 
      const data = await fetch('http://localhost:3000/api/auth/logout', {
        headers: {
          'Authorization': `Barear ${token}`
        }
      });

      console.log(await data.json());

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      Main page
      <button onClick={handleLogout}>Signout</button>
      <button>
        <Link href='/login'>
          Log in
        </Link>
      </button>
    </div>
  )
}

export default Home 