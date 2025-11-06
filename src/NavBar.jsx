import { Link } from "react-router-dom";
import { signOut,getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useUser from "./useUser";
export default function NavBar() {
  const {isLoading,user}=useUser();
  const navigate = useNavigate();
 // const email = "salahcvc45@gmail.com";
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/articles'>Articles</Link>
        { isLoading && <span> Loading..</span> }
        </li>
        <>
        {user && <li>Welcome, {user.email}</li>}
          <li>
          {user
            ? <button onClick={() => signOut(getAuth())}>Sign out</button>
            : <button onClick={() => navigate('/login')}>Sign In</button>

            }</li></> 
     
      </ul>
    </nav>
  )
}