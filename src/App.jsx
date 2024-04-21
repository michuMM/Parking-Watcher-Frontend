import './App.css'
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import ForgotPass from './components/ForgotPass';

function App() {
  document.body.style.backgroundColor = "#f1f2f6";
  return (
    <>
      <Navbar />
      <div className="mt-16"> {/* Ustaw margines na górze dla odstępu */}
        <Signup />
      </div>
      
    </>
  )
}

export default App
