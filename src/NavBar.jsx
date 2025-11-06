import { Link } from "react-router-dom";
import { signOut,getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function NavBar() {
  const isLoggedIn = false; // Change this to true or false to simulate logged-in state
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
        { isLoggedIn && <span> (Welcome, {email})</span> }
        </li>
        <li> {isLoggedIn
          ? <button onClick={() => signOut(getAuth())}>Sign out</button>
          : <button onClick={() => navigate('/login')}>Sign In</button>
        }
        
        </li>
      </ul>
    </nav>
  )
}