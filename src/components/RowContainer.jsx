import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import NotFound from '../img/NotFound.svg'
import { useStateValue } from '../context/StateProvider';
import {actionType} from '../context/reducer'


const RowContainer = ({ flag, data, scrollValue}) => {
    const rowContainerRef = useRef();

    const [items, setItems] = useState([])

    const [{ cartItems }, dispatch] = useStateValue();
    
    const addToCart = () => {
     
        dispatch({
            type: actionType.SET_CARTITEMS,
            cartItems : items
       })
       localStorage.setItem("cartItems", JSON.stringify(items))
    }

 
    useEffect(() => {
        rowContainerRef.current.scrollLeft += scrollValue
    }, [scrollValue])

    useEffect(() => {
        addToCart()
    }, [items])

  return (
      
      <div ref={rowContainerRef} className={`w-full my-12 gap-3 flex items-center scroll-smooth ${flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center'}`}>
          {
            data && data.length > 0 ? data.map((Item) => (
                <div
                      key={Item.id}
                      className='w-300 min-w-[275px] h-[205px] md:w-300 flex flex-col items-center justify-evenly relative md:min-w-[300px] my-12  bg-cardOverlay rounded-lg py-2 px-4 hover:drop-shadow-lg backdrop-blur-lg'>
                        <div className="w-full flex items-center justify-between">
                          <motion.div className='w-40 h-40 -mt-8 drop-shadow-2xl' whileHover={{ scale: 1.2 }}>
                              <img src={Item?.imageURL} className='w-full h-full object-contain'  alt="" />
                          </motion.div>
                        <motion.div
                            onClick={() =>    setItems([...cartItems, Item])}
                            whileTap={{ scale: 0.75 }} className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:shadow-md bg-red-600">
                                <MdShoppingBasket className='text-white' />
                            </motion.div>
                        </div>
                        <div className='w-full flex flex-col items-end justify-end'>
                            <p className='text-textColor font-semibold text-base md:text-lg'>
                            {Item?.title}
                            </p>
                            <p className='mt-1 text-sm text-gray-500'>{Item?.calories}</p>
                            <div className='flex items-center gap-8'>
                                <p
                                    className='text-lg text-headingColor font-semibold'
                                >
                                    <span className='text-sm text-red-500'>$</span>
                                    {Item?.price}
                                </p>
                            </div>
                        </div>
                 </div>
              )) :( <div className='w-full flex flex-col items-center justify-center'>
                      <img src={NotFound} className="h-340" alt="not found"/>
                      <p className='text-xl text-headingColor font-semibold my-2'>Items Not Available</p>
                  </div>)
         }
      </div>
  )
}

export default RowContainer;