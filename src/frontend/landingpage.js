// import React, { useState } from 'react';
// import './GovtLoginPage.css';
// import drdoLogo from './logo.png';
// // import facebookIcon from '../social/facebook.png';
// // import twitterIcon from '../social/twitter.png';
// // import instagramIcon from '../social/instagram.jpg';
// import googleLogo from '../social/google-logo.jpeg';

// const DRDOLanding = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [usePhone, setUsePhone] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const openLogin = () => {
//     setIsSignUp(false);
//     setShowModal(true);
//     setUsePhone(false);
//   };

//   const openSignUp = () => {
//     setIsSignUp(true);
//     setShowModal(true);
//     setUsePhone(false);
//   };

//   const toggleMethod = () => {
//     setUsePhone(!usePhone);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className="drdo-outer-wrapper">
//       <header className="drdo-header">
//         <div className="drdo-header-left">
//           <img src={drdoLogo} alt="DRDO Logo" className="drdo-header-logo" />
//           <span>DRDO</span>
//         </div>
//         <div className="drdo-header-login">
//           <h3>ADVANCED SYSTEMS LABORATORY </h3>
//           <button className="drdo-login-btn" onClick={openLogin}>LOGIN</button>
//         </div>
//       </header>

//       {/* <div className="drdo-sidebar-socials-fixed">
//         <a href="https://www.facebook.com/DRDO.India" target="_blank" rel="noreferrer">
//           <img src={facebookIcon} alt="Facebook" />
//         </a>
//         <a href="https://twitter.com/DRDO_India" target="_blank" rel="noreferrer">
//           <img src={twitterIcon} alt="Twitter" />
//         </a>
//         <a href="https://www.instagram.com/drdo_india" target="_blank" rel="noreferrer">
//           <img src={instagramIcon} alt="Instagram" />
//         </a>
//       </div> */}

//       <div className="drdo-container">
//         <div className="drdo-card drdo-left">
//           <div className="drdo-logo">
//             <img src={drdoLogo} alt="DRDO Logo" className="drdo-img" />
//           </div>
//         </div>

//         <div className="drdo-card drdo-right">
//           <div className="drdo-header-center">Regularisation Portal</div>
//           <button className="drdo-btn1" onClick={openSignUp}>GET STARTED</button>
//           <button className="drdo-btn2" onClick={openLogin}>I ALREADY HAVE AN ACCOUNT</button>
//         </div>
//       </div>

//       {showModal && (
//         <div className="drdo-modal-overlay">
//           <div className="drdo-modal">
//             <button className="drdo-modal-close" onClick={closeModal}>&times;</button>
//             <img src={drdoLogo} className="drdo-modal-logo" alt="logo" />
//             <h2>{isSignUp ? 'Create your account' : 'Sign in to DRDO'}</h2>
//             <p>{isSignUp ? 'Please fill in the details to get started.' : 'Welcome back! Please sign in to continue.'}</p>

//             <button className="drdo-google-btn">
//               <img src={googleLogo} alt="Google" /> Continue with Google
//             </button>

//             <div className="drdo-divider"><span>or</span></div>
// {/*****when you want to use variables,put it in {} after that use use ternary operators.enclosed with <></> .but this is not applicable when we use && operator. */}
//             {isSignUp ? (
//               <>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label htmlFor="firstName">Name </label>
//                     <input type="text" id="firstName" placeholder="First name" />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="username">Username</label>
//                   <input type="text" id="username" placeholder="Enter your username" />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="role">Select Role</label>
//                   <select id="role" defaultValue="">
//                     <option value="" disabled hidden>Select a role</option>
//                     <option value="division-pa">Division PA</option>
//                     <option value="head">Division Head</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="phone">Phone number</label>
//                   <input type="tel" id="phone" placeholder="+91 Enter your phone number" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email address</label>
//                   <input type="email" id="email" placeholder="Enter your email address" />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="password">Password</label>
//                   <div className="password-wrapper">
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       id="password"
//                       placeholder="Enter your password"
//                     />
//                     <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
//                       {showPassword ? '🙈' : '👁️'}
//                     </span>
//                   </div>
//                 </div>
//               </>
//             ) : usePhone ? (
//               <>
//                 <div className="form-group">
//                   <label htmlFor="phoneLogin">Phone number</label>
//                   <input id="phoneLogin" placeholder="+91 Enter your phone number" />
//                 </div>


//               </>
//             ) : (
//               <>
//                 <div className="form-group">
//                   <label htmlFor="emailLogin">Email address or username</label>
//                   <input id="emailLogin" placeholder="Enter email or username" />
//                 </div>
//                 {!isSignUp && (
//                   <div className="drdo-toggle" onClick={toggleMethod}>
//                     Use {usePhone ? 'email or username' : 'phone'}
//                   </div>
//                 )}
//                 <div className="form-group">
//                   <label htmlFor="role">Select Role</label>
//                   <select id="role" defaultValue="">
//                     <option value="" disabled>Select a role</option>
//                     <option value="division-pa">Division PA</option>
//                     <option value="head">Division Head</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </div>
//               </>
//             )}


//             <button className="continue-btn">Continue ▸</button>

//             <div className="drdo-footer">
//               {isSignUp ? (
//                 <>Already have an account? <span onClick={openLogin}>Sign in</span></>
//               ) : (
//                 <>Don’t have an account? <span onClick={openSignUp}>Sign up</span></>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DRDOLanding;






import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GovtLoginPage.css';
import drdoLogo from './logo.png';
import googleLogo from './social/google-logo.jpeg';

const DRDOLanding = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [usePhone, setUsePhone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const openLogin = () => {
    setIsSignUp(false);
    setShowModal(true);
    setUsePhone(false);
  };

  const openSignUp = () => {
    setIsSignUp(true);
    setShowModal(true);
    setUsePhone(false);
  };

  const toggleMethod = () => {
    setUsePhone(!usePhone);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // CHECK ALL VISIBLE FIELDS AND REDIRECT
  const handleContinue = () => {
    const modal = document.querySelector(".drdo-modal");

    if (!modal) return;

    // Get only visible input/select fields
    const fields = Array.from(
      modal.querySelectorAll("input, select")
    ).filter((field) => field.offsetParent !== null);

    // Check every visible field
    for (const field of fields) {
      if (!field.value.trim()) {
        alert("Please fill in all the fields.");
        field.focus();
        return;
      }
    }

    // Get selected role
    const role = modal.querySelector("#role")?.value;

    if (!role) {
      alert("Please select a role.");
      return;
    }

    // Redirect according to role
    if (role === "division-pa") {
      navigate("/division-pa");
    } 
    else if (role === "head") {
      navigate("/division-head");
    } 
    else if (role === "admin") {
      navigate("/admin");
    }
  };

  return (
    <div className="drdo-outer-wrapper">

      {/* HEADER */}
      <header className="drdo-header">

        <div className="drdo-header-left">
          <img
            src={drdoLogo}
            alt="DRDO Logo"
            className="drdo-header-logo"
          />

          <span>DRDO</span>
        </div>

        <div className="drdo-header-login">

          <h3>ADVANCED SYSTEMS LABORATORY</h3>

          <button
            className="drdo-login-btn"
            onClick={openLogin}
          >
            LOGIN
          </button>

        </div>

      </header>


      {/* LANDING PAGE */}
      <div className="drdo-container">

        <div className="drdo-card drdo-left">

          <div className="drdo-logo">

            <img
              src={drdoLogo}
              alt="DRDO Logo"
              className="drdo-img"
            />

          </div>

        </div>


        <div className="drdo-card drdo-right">

          <div className="drdo-header-center">
            Regularisation Portal
          </div>

          <button
            className="drdo-btn1"
            onClick={openSignUp}
          >
            GET STARTED
          </button>

          <button
            className="drdo-btn2"
            onClick={openLogin}
          >
            I ALREADY HAVE AN ACCOUNT
          </button>

        </div>

      </div>


      {/* LOGIN / SIGNUP MODAL */}
      {showModal && (

        <div className="drdo-modal-overlay">

          <div className="drdo-modal">

            {/* CLOSE */}
            <button
              className="drdo-modal-close"
              onClick={closeModal}
            >
              &times;
            </button>


            {/* LOGO */}
            <img
              src={drdoLogo}
              className="drdo-modal-logo"
              alt="logo"
            />


            {/* TITLE */}
            <h2>
              {isSignUp
                ? 'Create your account'
                : 'Sign in to DRDO'}
            </h2>


            <p>
              {isSignUp
                ? 'Please fill in the details to get started.'
                : 'Welcome back! Please sign in to continue.'}
            </p>


            {/* GOOGLE BUTTON - UNCHANGED */}
            <button className="drdo-google-btn">

              <img
                src={googleLogo}
                alt="Google"
              />

              Continue with Google

            </button>


            <div className="drdo-divider">
              <span>or</span>
            </div>


            {/* ================= SIGN UP ================= */}
            {isSignUp ? (

              <>

                {/* NAME */}
                <div className="form-row">

                  <div className="form-group">

                    <label htmlFor="firstName">
                      Name
                    </label>

                    <input
                      type="text"
                      id="firstName"
                      placeholder="First name"
                    />

                  </div>

                </div>


                {/* USERNAME */}
                <div className="form-group">

                  <label htmlFor="username">
                    Username
                  </label>

                  <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                  />

                </div>


                {/* ROLE */}
                <div className="form-group">

                  <label htmlFor="role">
                    Select Role
                  </label>

                  <select
                    id="role"
                    defaultValue=""
                  >

                    <option
                      value=""
                      disabled
                      hidden
                    >
                      Select a role
                    </option>

                    <option value="division-pa">
                      Division PA
                    </option>

                    <option value="head">
                      Division Head
                    </option>

                    <option value="admin">
                      Admin
                    </option>

                  </select>

                </div>


                {/* PHONE */}
                <div className="form-group">

                  <label htmlFor="phone">
                    Phone number
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    placeholder="+91 Enter your phone number"
                  />

                </div>


                {/* EMAIL */}
                <div className="form-group">

                  <label htmlFor="email">
                    Email address
                  </label>

                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                  />

                </div>


                {/* PASSWORD */}
                <div className="form-group">

                  <label htmlFor="password">
                    Password
                  </label>

                  <div className="password-wrapper">

                    <input
                      type={
                        showPassword
                          ? 'text'
                          : 'password'
                      }
                      id="password"
                      placeholder="Enter your password"
                    />

                    <span
                      className="toggle-password"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </span>

                  </div>

                </div>

              </>


            ) : usePhone ? (

              /* ================= PHONE LOGIN ================= */

              <>

                <div className="form-group">

                  <label htmlFor="phoneLogin">
                    Phone number
                  </label>

                  <input
                    id="phoneLogin"
                    placeholder="+91 Enter your phone number"
                  />

                </div>


                {/* ROLE */}
                <div className="form-group">

                  <label htmlFor="role">
                    Select Role
                  </label>

                  <select
                    id="role"
                    defaultValue=""
                  >

                    <option
                      value=""
                      disabled
                    >
                      Select a role
                    </option>

                    <option value="division-pa">
                      Division PA
                    </option>

                    <option value="head">
                      Division Head
                    </option>

                    <option value="admin">
                      Admin
                    </option>

                  </select>

                </div>


                <div
                  className="drdo-toggle"
                  onClick={toggleMethod}
                >
                  Use email or username
                </div>

              </>


            ) : (

              /* ================= EMAIL / USERNAME LOGIN ================= */

              <>

                <div className="form-group">

                  <label htmlFor="emailLogin">
                    Email address or username
                  </label>

                  <input
                    id="emailLogin"
                    placeholder="Enter email or username"
                  />

                </div>


                <div
                  className="drdo-toggle"
                  onClick={toggleMethod}
                >
                  Use phone
                </div>


                {/* ROLE */}
                <div className="form-group">

                  <label htmlFor="role">
                    Select Role
                  </label>

                  <select
                    id="role"
                    defaultValue=""
                  >

                    <option
                      value=""
                      disabled
                    >
                      Select a role
                    </option>

                    <option value="division-pa">
                      Division PA
                    </option>

                    <option value="head">
                      Division Head
                    </option>

                    <option value="admin">
                      Admin
                    </option>

                  </select>

                </div>

              </>

            )}


            {/* CONTINUE BUTTON */}
            <button
              className="continue-btn"
              onClick={handleContinue}
            >
              Continue ▸
            </button>


            {/* FOOTER */}
            <div className="drdo-footer">

              {isSignUp ? (

                <>
                  Already have an account?

                  <span onClick={openLogin}>
                    Sign in
                  </span>
                </>

              ) : (

                <>
                  Don’t have an account?

                  <span onClick={openSignUp}>
                    Sign up
                  </span>
                </>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default DRDOLanding;









