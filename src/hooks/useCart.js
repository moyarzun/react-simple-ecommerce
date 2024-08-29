import { useState, useEffect } from 'react'
import { db } from '../data/db'

export const useCart = () => {
    // >>>>>>> STATES, VARIABLES Y FUNCIONES <<<<<<<
    const initialCart = JSON.parse(localStorage.getItem('cart')) || []
    const [productData] = useState(db) // Recomendado para archivos locales
    const [cart, setCart] = useState(initialCart)

    // Simulemos límite de stock
    const ITEM_STOCK_LIMIT = 5

    // UseEffect - monitoreo de cambios en el carrito
    // Guardamos el contenido del carrito en el localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(product) {
        const productExists = cart.find(item => item.id === product.id)
        if(productExists) {
            const prevCart = cart.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item)
            setCart(prevCart)
        } else {
            setCart([...cart, {...product, quantity: 1}])
        }
    }

    function removeFromCart(productId) {
        setCart(prevCart => prevCart.filter(item => item.id !== productId))
    }

    function increaseQuantity(productId) {
        const prevCart = cart.map(item => (item.id === productId && item.quantity < ITEM_STOCK_LIMIT) ? {...item, quantity: item.quantity + 1} : item)
        setCart(prevCart)
    }

    function decreaseQuantity(productId) {
        const prevCart = cart.map(item => item.id === productId ? {...item, quantity: item.quantity - 1} : item)
                                .filter(item => item.quantity > 0)
        setCart(prevCart)
    }

    function clearCart() {
        setCart([])
    }

    return { cart, productData, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }
}