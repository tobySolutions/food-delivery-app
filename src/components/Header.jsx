import React, { useState } from 'react';
import { MdShoppingBasket, MdAdd, MdLogout } from 'react-icons/md';
import { motion } from 'framer-motion';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';

import Logo from '../img/logo.png';
import Avatar from '../img/avatar.png';
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import {actionType} from '../context/reducer'

const Header = () => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    
    const [{ user, cartShow, cartItems },dispatch] = useStateValue()

    const [isMenu, setIsMenu] = useState(false)

    const logout = () => {
        // onClick of logout: we need to update a state, clear the local storage and hide the menu 
        setIsMenu(false)
        localStorage.clear()

        dispatch({
            type: actionType.SET_USER,
            user: null,
        })
    }

    const login = async() => {
        if (!user) { 
            const {user: {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider);
            console.log(refreshToken);
            console.log(providerData)
            // Now we need to dispatch this data to our reducer so as to make it available everywhere in our app
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            });
            // We want to use locaLStorage to hold the loaded data temporarily to prevent the state from reinit-ing on reload
            localStorage.setItem('user', JSON.stringify(providerData[0]))
        } else {
            setIsMenu(!isMenu)
        }
    }; 

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow
        });
    };   
  return (
      <header className='fixed w-screen z-50 p-3 px-4 md:p-6 md:px-16 bg-primary'>
          {/* desktop and tablet */}
          <div className='hidden md:flex w-full h-full  items-center justify-between'>
              <Link to="/" className='flex items-center gap-2'>
                  <img src={Logo} className="object-cover w-8" alt="logo" />
                  <p className='text-headingColor text-xl font-bold'>City</p>
              </Link>

              <div className='flex items-center gap-8'>
                  <motion.ul
                      initial = {{opacity: 0, x :200}}
                      animate = {{opacity: 1, x :0}}
                      exit = {{opacity: 0, x :200}}
                      className='flex items-center gap-8 ml-auto'>
                      <Link to="/*"><motion.li
                          whileTap={{ scale: 0.6 }}
                          className='text- text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>
                          Home
                      </motion.li>
                       </Link>   
                      <motion.li
                          whileTap={{ scale: 0.6 }}
                          className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>
                          Menu
                      </motion.li>
                      <motion.li
                          whileTap={{ scale: 0.6 }}
                          className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>
                          About Us
                      </motion.li>
                      <motion.li
                          whileTap={{ scale: 0.6 }}
                          className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>
                          Service
                      </motion.li>
                    </motion.ul>

                  <motion.div whileTap={{ scale: 0.6 }}
                        onClick = {showCart}
                      className='relative flex items-center justify-center'>
                      <MdShoppingBasket
                          className='text-textColor text-2xl cursor-pointer' />
                      {cartItems && cartItems.length > 0 && (
                          <div className=' absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                              <p className="text-xs text-white font-semibold">{cartItems.length}</p>
                        </div>
                       )}
                  </motion.div>

                  <div className='relative'>
                    <motion.img
                        whileTap={{scale: 0.6}}
                          src={user ? user.photoURL : Avatar}
                          className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full"
                          alt="user-profile"
                          onClick={login}
                      />
                      {
                          isMenu && (
                              <motion.div
                                  initial ={{opacity : 0, scale: 0.6}}
                                  animate ={{opacity : 1, scale: 1}}
                                  exit ={{opacity : 0, scale: 0.6}}
                                  className='w-40 bg-gray-50 shadow-xl flex flex-col rounded-lg absolute top-12 right-0'>
                            {
                                user && user.email === 'adedejitobiloba7@gmail.com' && (
                                    <Link
                                        to='/createItem'>
                                        <p
                                            onClick={() => setIsMenu(false)}
                                            className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100  transition-all duration-100 ease-in-out text-textColor text-base'>
                                            New Item<MdAdd />
                                        </p>
                                    </Link>
                                )
  
                            }
                            
                            <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base' onClick={logout}>Logout <MdLogout/></p>
                        </motion.div>
                          )
                     }
                  </div>
              </div>
          </div>  

          {/* Mobile */}
          <div className="flex items-center justify-between md:hidden w-full h-full">
              <motion.div whileTap={{ scale: 0.6 }}
                  onClick = {showCart}
                  className='relative flex items-center justify-center'>
                        <MdShoppingBasket
                            className='text-textColor text-2xl cursor-pointer' />
                            <div className=' absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                                <p className="text-xs text-white font-semibold">2</p>
                            </div>
                </motion.div>
              
              <Link to="/" className='flex items-center gap-2'>
                  <img src={Logo} className="object-cover w-8" alt="logo" />
                  <p className='text-headingColor text-xl font-bold'>City</p>
              </Link>
              
              <div className='relative'>
                    <motion.img
                        whileTap={{scale: 0.6}}
                          src={user ? user.photoURL : Avatar}
                          className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full"
                          alt="user-profile"
                          onClick={login}
                      />
                      {
                          isMenu && (
                              <motion.div
                                  initial ={{opacity : 0, scale: 0.6}}
                                  animate ={{opacity : 1, scale: 1}}
                                  exit ={{opacity : 0, scale: 0.6}}
                                  className='w-40 bg-gray-50 shadow-xl flex flex-col rounded-lg absolute top-12 right-0'>
                            {
                                user && user.email === 'adedejitobiloba7@gmail.com' && (
                                    <Link
                                        to='/createItem'>
                                          <motion.p
                                            whileTap={{ scale: 0.6 }}
                                            onClick={() => setIsMenu(false)}
                                            className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100  transition-all duration-100 ease-in-out text-textColor text-base'>
                                            New Item<MdAdd />
                                        </motion.p>
                                    </Link>
                                )
  
                              }
                              
                         <ul
                            className='flex flex-col'>
                            <motion.li
                                whileTap={{ scale: 0.6 }}
                                onClick={() => setIsMenu(false)}
                                className='px-4 py-2 text-base text-textColor hover:bg-slate-100  duration-100 transition-all ease-in-out cursor-pointer'>
                                Home
                            </motion.li>
                            <motion.li
                                whileTap={{ scale: 0.6 }}
                                onClick={() => setIsMenu(false)}    
                                className='px-4 py-2 text-base text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer'>
                                Menu
                            </motion.li>
                            <motion.li
                                whileTap={{ scale: 0.6 }}
                                onClick={() => setIsMenu(false)}
                                className='px-4 py-2 text-base text-textColor hover:bg-slate-100  duration-100 transition-all ease-in-out cursor-pointer'>
                                About Us
                            </motion.li>
                            <motion.li
                                whileTap={{ scale: 0.6 }}
                                onClick={() => setIsMenu(false)}
                                className='px-4 py-2 text-base text-textColor hover:bg-slate-100  duration-100 transition-all ease-in-out cursor-pointer'>
                                Service
                            </motion.li>
                        </ul>
                        <motion.p
                            whileTap={{ scale: 0.6 }}
                            className='m-2 p-2 rounded-md shadow-md flex items-center justify-center gap-3 cursor-pointer bg-gray-200 hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base'
                            onClick={logout}   
                            >
                            Logout <MdLogout />
                        </motion.p>
                    </motion.div>
                          )
                     }
                </div>
              
          </div>
      </header>
  )
}

export default Header;