import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db'
import type { Product, ProductItem, ProductId } from '../types'

export const useCart = () => {
    // >>>>>>> STATES, VARIABLES Y FUNCIONES DE APP <<<<<<<

    const cartFromStorage = localStorage.getItem('cart');
    const initialCart = cartFromStorage ? JSON.parse(cartFromStorage) : []
    const [productData] = useState(db) // Recomendado para archivos locales
    const [cart, setCart] = useState(initialCart)

    // Simulemos límite de stock
    const ITEM_STOCK_LIMIT = 5

    // UseEffect - monitoreo de cambios en el carrito
    // Guardamos el contenido del carrito en el localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(product: Product) {
        const productExists = cart.find((item: ProductItem) => item.id === product.id)
        if(productExists) {
            const prevCart = cart.map((item: ProductItem) => item.id === product.id ? {...item, quantity: item.quantity++ } : item)
            setCart(prevCart)
        } else {
            const newProduct = {...product, quantity: 1}
            setCart([...cart, newProduct])
        }
    }

    function removeFromCart(id: ProductId) {
        setCart((prevCart: ProductItem[]) => prevCart.filter((item: ProductItem) => item.id !== id))
    }

    function increaseQuantity(id: ProductId) {
        const prevCart = cart.map((item: ProductItem) => (item.id === id && item.quantity < ITEM_STOCK_LIMIT) ? {...item, quantity: item.quantity + 1} : item)
        setCart(prevCart)
    }

    function decreaseQuantity(id: ProductId) {
        const prevCart = cart.map((item: ProductItem) => item.id === id ? {...item, quantity: item.quantity - 1} : item)
                                .filter((item: ProductItem) => item.quantity > 0)
        setCart(prevCart)
    }

    function clearCart() {
        setCart([])
    }

    // >>>>>>>>>> STATES, VARIABLES Y FUNCIONES DE HEADER <<<<<<<<<<

    // State Derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total: number, product: ProductItem) => total + product.price * product.quantity, 0), [cart])

    return { cart, productData, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal }
}