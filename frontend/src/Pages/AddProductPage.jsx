import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { apiUrl } from "../api/api";
import DefaultPage from "../components/DefaultPage";

const AddProductPage = (props) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState()
    const [variations, setVariations] = useState()
    const [productImage, setProductImage] = useState(null)
    const [stockCount, setStockCount] = useState()

    const [error, setError] = useState("")

    const navigate = useNavigate()

    const addProduct = (event) => {
        event.preventDefault()

        fetch(apiUrl + "/api/products/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: props.token // !!! HINWEIS: TOKEN MUSS ANS BACKEND GESCHICKT WERDEN, SONST WAR DER LOGIN UNNÖTIG !!!
            },
            body: JSON.stringify({ title, description, price, stockCount, variations: ["In Palmenöl", "In Olivenöl"] })
        })
        .then((response) => response.json())
        .then(result => {
            if(result.err) {
                setError(result.err)
            } else if(result.acknowledged === true && result.insertedId) {
                navigate("/products/" + result.insertedId)
            } else {
                setError("Unknown error, please try again.")
            }
        })
    }

    if(!props.token) {
        // wenn es keinen token gibt, navigiere zur start-seite wieder...
        return <Navigate to="/" /> 
    } else return ( 
        <DefaultPage title="Add Product">
            <form>
                <label htmlFor="title-input">
                    Title:
                </label><br/>
                <input id="title-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <br/>

                <label htmlFor="description-input">
                    Description:
                </label><br/>
                <textarea id="description-input" type="text" vlaue={description} onChange={(e) => setDescription(e.target.value)} />
                <br/>

                <label htmlFor="price-input">
                    Price:
                </label><br/>
                <input id="price-input" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                <br/>

                <VariationsInput variations={variations} setVariations={setVariations} />
                <br/>

                <label htmlFor="product-image-input">
                    Product Image:
                </label><br/>
                <input id="product-image-input" type="file" value={productImage} onChange={(e) => setProductImage(e.target.files[0])} />
                <br/>

                <label htmlFor="stock-count-input">
                    Stock Count:
                </label><br/>
                <input id="stock-count-input" type="number" value={stockCount} onChange={(e) => setStockCount(Number(e.target.value))} />
                <br/>

                <button className="add-product-button" onClick={addProduct}>Add Product</button>
           
                <br/>
                 {error && <p className="error-message">{error}</p>}
             </form>
        </DefaultPage>
    );
}

const VariationsInput = ({ variations, setVariations }) => {
    return <input placeholder="variations..." />
}
 
export default AddProductPage;