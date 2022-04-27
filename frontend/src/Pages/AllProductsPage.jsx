import { useEffect, useState } from "react";
import { apiUrl } from "../api/api";
import DefaultPage from "../components/DefaultPage";
import ProductView from "../components/ProductView";

const AllProductsPage = (props) => {
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        const alertError = (error) => alert(error.message)
        fetch(apiUrl + "/api/products/all")
        .then(response => response.json())
        .then(products => {
            if(products.message) {
                return alertError(products)
            } else {
                setAllProducts(products)
            }
        })
        .catch(alertError)
    }, [])

    return ( 
        <DefaultPage title="Shop">
            <div className="product-grid-view">
                {allProducts.map(product => <ProductView key={product._id} product={product} />)}
            </div>
        </DefaultPage>
    );
}
 
export default AllProductsPage;