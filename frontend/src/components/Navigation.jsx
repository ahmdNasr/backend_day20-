import { Link } from 'react-router-dom'

const Navigation = (props) => {
    return ( 
        <nav>
            <div>  
                <Link to={"/"}>Shop</Link>{' '}
                <Link to={"/wishlist"}>Your Wishlist</Link>
            </div>
            <div className='nav-menu-buttons'>{
                props.token
                ? <>
                    <Link to={"/addProduct"} className="add-product-button">Add Product</Link>
                    <button className="logout-button" onClick={props.logout}>Logout</button>
                </>
                : <Link to={"/login"} className="login-button">Login</Link>
            }</div>
        </nav>
     );
}
 
export default Navigation;