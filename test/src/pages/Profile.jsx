// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { UserAuth } from '../context/AuthContext';

// const Profile = () => {
//   const { user, logOut } = UserAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await logOut();
//       navigate('/');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 z-[100] w-full sticky top-0 bg-black/80 backdrop-blur-sm">
//         <Link to="/">
//           <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
//             StreamPrime
//           </h1>
//         </Link>

//         {user?.email ? (
//           <div className="flex items-center gap-4">
//             <Link to="/profile">
//               <button className="text-white hover:text-gray-300 transition">
//                 My Profile
//               </button>
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded cursor-pointer transition"
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <div className="flex items-center gap-4">
//             <Link to="/login">
//               <button className="text-white hover:text-gray-300 transition">
//                 Sign In
//               </button>
//             </Link>
//             <Link to="/signup">
//               <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded cursor-pointer transition">
//                 Sign Up
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* Profile Content */}
//       <div className="p-8">
//         <h2 className="text-2xl font-bold">Welcome, {user?.email || 'Guest'}</h2>
//         <p className="text-gray-400 mt-4">
//           This is your profile page. You can manage your account here.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Profile;