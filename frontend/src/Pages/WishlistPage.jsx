import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { apiUrl } from "../api/api";

const { default: DefaultPage } = require("../components/DefaultPage")

const WishlistPage = (props) => {
    const [userInfo, setUserInfo] = useState()

    useEffect(() => {
        fetch(apiUrl + "/api/users/userInfo", {
            headers: {
                token: props.token
            }
        })
        .then(response => response.json())
        .then(result => {
            if(!result.err){
                setUserInfo(result)
            }
        })
    }, [props.token])

    if(!props.token) {
        return <Navigate to="/" />
    } else return ( 
        <DefaultPage title="Your Wishlist">
            {userInfo ? <>
                <h2>Hello {userInfo.name}</h2>
                <ul className="user-wishlist">
                    {userInfo.wishlist.map(product => 
                        <li key={product._id}>
                            <img src={product.imageLink} alt="preview" width={100} />
                            {product.title}
                        </li>
                    )}
                </ul>
            </> : <h2>Loading...</h2>}
        </DefaultPage>
    );
}
 
export default WishlistPage;