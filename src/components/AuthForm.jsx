import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";



export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validPassword = password.length >= 6;
    const validUsername = isLogin ? true : username.trim().length >= 3;

    setIsValid(validEmail && validPassword && validUsername);
  }, [email, password, username, isLogin]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!isValid) return;

  try {
    if (isLogin) {
      
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Logged in successfully!");
      navigate("/"); 

    } else {
      
      await createUserWithEmailAndPassword(auth, email, password);
      alert("✅ Account created successfully!");
      navigate("/"); 

    }

    
    setEmail('');
    setPassword('');
    setUsername('');
  } catch (error) {
    console.error("❌ Firebase Error:", error.message);
    alert("❌ email || password not correct || you dont have an account " );
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          {isLogin ? 'Log In to CineZakaria' : 'Create an Account'}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-red-400 dark:bg-gray-700 dark:text-white"
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-red-400 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (min 6 chars)"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-red-400 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-2 rounded-lg text-white transition-all ${
              isValid ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
          {isLogin ? 'Don’t have an account?' : 'Already have an account?'}{' '}
          <button className="text-red-500  hover:cursor-pointer ml-1" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
}
