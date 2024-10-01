import Navbar from "./Components/Navbar/Navbar";
import Footer from './Components/Footer/Footer';
import AnimatedRoutes from './Pages/AnimatedRoutes';
import LoginSignUp from "./Pages/LoginSignUp";


function App() {
 
  return (
    <div>
        <Navbar/> 
        {localStorage.getItem("auth-token")? <AnimatedRoutes /> : <LoginSignUp />}                   
        <Footer /> 
    </div>   
  );
}

export default App;
