import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { addToCart } from '../../API/api';
import { useDispatch } from 'react-redux';

const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const handleAddToCart = async(productId) => {
        await addToCart(dispatch, productId);
      }
  return (
    <div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg'>
    <div className='relative mx-3 mt-4 flex h-60 overflow-hidden rounded-xl'>
        <img className='object-cover w-full' src={product.image} alt='product image' />
        <div className='absolute inset-0  bg-opacity-20' />
    </div>

    <div className='mt-4 px-5 pb-5'>
        <h5 className='text-xl font-semibold tracking-tight text-white'>{product.name.charAt(0)?.toUpperCase() + product.name.slice(1)}</h5>
        <div className='mt-2 mb-5 flex items-center justify-between'>
            <p>
                <span className='text-3xl font-bold text-emerald-400'>${product.price}</span>
            </p>
        </div>
        <button
            className='flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium
             text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
            onClick={()=>handleAddToCart(product._id)}
        >
            <ShoppingCart size={22} className='mr-2' />
            Add to cart
        </button>
    </div>
</div>
  )
}

export default ProductCard
