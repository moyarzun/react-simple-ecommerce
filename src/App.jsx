import { useState } from 'react'
import { useEffect } from 'react'
import Header from './components/Header'
import Product from './components/Product'
import { db } from './data/db'

export default function App() {
    // >>>>>>> STATES, VARIABLES Y FUNCIONES <<<<<<<
    const [productData, setProductData] = useState(db) // Recomendado para archivos locales
    const [cart, setCart] = useState([])

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

    return (
        <>
        <Header cart={cart} removeFromCart={removeFromCart} />

        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {productData.map((product) => <Product key={product.id} product={product} addToCart={addToCart} /> )}
            </div>
        </main>


        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>
        </>
    )
  }