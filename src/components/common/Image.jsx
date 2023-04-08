import React from 'react'

const Image = ({ data }) => {
    return (
        <div>
            <div className="d-flex">
                {data.map((product) => {
                    return (
                        <img
                            src={`http://localhost:4000/Product/${product.Images[0].src}`}
                            alt=""
                            key={product.Images[0].id}
                            className="img-fluid img-30 me-2 blur-up lazyloaded"
                        />
                    );
                })}
            </div>
        </div>
    )
}

export default Image