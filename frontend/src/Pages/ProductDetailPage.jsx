import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiUrl } from "../api/api";
import DefaultPage from "../components/DefaultPage";

const ProductDetailPage = () => {
    const { productId } = useParams()
    const [product, setProduct] = useState()
    const [error, setError] = useState("")

    useEffect(() => {
        fetch(apiUrl + "/api/products/single/" + productId)
        .then(response => response.json())
        .then((foundProduct) => {
            if(foundProduct.message) {
                return setError(foundProduct.message)
            } else {
                return setProduct(foundProduct)
            }
        })
    }, [productId])

    return ( 
        <DefaultPage title={product ? product.title : "Product page"}>
            {product && <div className="product-detail-box">
                <img src={product.imageLink} alt={product.title} width="300px"/>
                <div className="product-detail-info">
                    <h3>{product.title} – {product.price}€</h3>
                    <p>
                        {product.description}
                    </p>
                    <ul className="product-variations">
                        {product.variations.map(variation => <li className="variation">{variation}</li>)}
                    </ul>
                </div>
            </div>}

            <div>{error}</div>
            <Link to="/">Go Back To Shop</Link>
        </DefaultPage>
    );
}
 
export default ProductDetailPage;