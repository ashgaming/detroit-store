import React from 'react'

export default function GridView({ products }) {
    return (
        <div className='gridview'>
            {
                products.length === 0 ? ('Product not found') : (

                    products.map(product => (

                        <Product product={product} key={product._id} />

                    ))

                )
            }

        </div>
    )
}
