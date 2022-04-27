import { useNavigate } from "react-router-dom";

const ProductView = ({ product }) => {
    const navigate = useNavigate();

    return (
        <article className="product-view" onClick={() => navigate("/products/" + product._id)}>
            <img src={product.imageLink} alt={product.title}/>
            <h3>{product.title} – {product.price}€</h3>
            {/* Nur wenn product.isLimited true, dann zeig mir das div an. */}
            {product.isLimited && <div className="product-is-limited">Only a few left!</div>}
        </article>
    );
}
 
export default ProductView;