// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserAuth } from '../context/AuthContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const { signIn } = UserAuth();
//   const navigate = useNavigate();

//   const validateForm = () => {
//     if (!email.includes('@')) {
//       setError('Invalid email format');
//       return false;
//     }
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (!validateForm()) return;
//     try {
//       await signIn(email, password);
//       navigate('/');
//     } catch (err) {
//       setError(err.message);
//       console.log(err);
//     }
//   };

//   return (

//     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
//           Sign in to your account
//         </h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
//               Email address
//             </label>
//             <div className="mt-2">
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-white shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>

//           <div>
//             <div className="flex items-center justify-between">
//               <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
//                 Password
//               </label>
//             </div>
//             <div className="relative mt-2">
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 required
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-white shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//               >
//                 {showPassword ? '👁️' : '👁️‍🗨️'}
//               </button>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;