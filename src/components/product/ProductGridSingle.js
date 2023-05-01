import { Fragment, useState , useEffect} from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { propTypes } from "react-hooks-paginator";
import { FaMoneyBillAlt } from 'react-icons/fa';
import CartAPI from "../../api/CartAPI";

const ProductGridSingle = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  spaceBottomClass
}) => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const addProductTocart = async () => {
    try {
      
      const params = {productId: product.Id, quantity : 1, attributesValues : []}
      console.log(params);
      const response = await CartAPI.addToCart(params);
      dispatch(addToCart({...product, quantity : params.quantity}));

    } catch (error) {
      console.log(error);
    } 
  }
  // return (
  //   <Fragment>
  //     <div className={clsx("product-wrap", spaceBottomClass)}>
  //       <div className="product-img">
  //         <Link to={process.env.PUBLIC_URL + "/product/" + product.Id}>
  //           <img
  //             className="default-img"
  //             src={process.env.PUBLIC_URL + product.images[0].location}
  //             alt=""
  //           />
  //           {/* {product.image.length > 1 ? (
  //             <img
  //               className="hover-img"
  //               src={process.env.PUBLIC_URL + product.image[1]}
  //               alt=""
  //             />
  //           ) : (
  //             ""
  //           )} */}
  //         </Link>
  //         {/* {product.discount || product.new ? (
  //           <div className="product-img-badges">
  //             {product.discount ? (
  //               <span className="pink">-{product.discount}%</span>
  //             ) : (
  //               ""
  //             )}
  //             {product.new ? <span className="purple">New</span> : ""}
  //           </div>
  //         ) : (
  //           ""
  //         )} */}

  //         <div className="product-action">
  //           <div className="pro-same-action pro-wishlist">
  //             <button
  //               className={wishlistItem !== undefined ? "active" : ""}
  //               disabled={wishlistItem !== undefined}
  //               title={
  //                 wishlistItem !== undefined
  //                   ? "Added to wishlist"
  //                   : "Add to wishlist"
  //               }
  //               onClick={() => dispatch(addToWishlist(product))}
  //             >
  //               <i className="pe-7s-like" />
  //             </button>
  //           </div>
  //           <div className="pro-same-action pro-cart">
  //             {product.affiliateLink ? (
  //               <a
  //                 href={product.affiliateLink}
  //                 rel="noopener noreferrer"
  //                 target="_blank"
  //               >
  //                 {" "}
  //                 Buy now{" "}
  //               </a>
  //             ) : product.variation && product.variation.length >= 1 ? (
  //               <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`}>
  //                 Select Option
  //               </Link>
  //             ) : product.stock && product.stock > 0 ? (
  //               <button
  //                 onClick={() => dispatch(addToCart(product))}
  //                 className={
  //                   cartItem !== undefined && cartItem.quantity > 0
  //                     ? "active"
  //                     : ""
  //                 }
  //                 disabled={cartItem !== undefined && cartItem.quantity > 0}
  //                 title={
  //                   cartItem !== undefined ? "Added to cart" : "Add to cart"
  //                 }
  //               >
  //                 {" "}
  //                 <i className="pe-7s-cart"></i>{" "}
  //                 {cartItem !== undefined && cartItem.quantity > 0
  //                   ? "Added"
  //                   : "Add to cart"}
  //               </button>
  //             ) : (
  //               <button disabled className="active">
  //                 Out of Stock
  //               </button>
  //             )}
  //           </div>
  //           <div className="pro-same-action pro-quickview">
  //             <button title="Quick View" onClick={() => setModalShow(true)}>
  //               <i className="pe-7s-look" />
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="product-content text-center">
  //         <h3>
  //           <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
  //             {product.name}
  //           </Link>
  //         </h3>
  //         {product.rating && product.rating > 0 ? (
  //           <div className="product-rating">
  //             <Rating ratingValue={product.rating} />
  //           </div>
  //         ) : (
  //           ""
  //         )}
  //         <div className="product-price">
  //             <span>{product.price} </span>
  //         </div>
  //       </div>
  //     </div>
  //     {/* product modal */}
  //     <ProductModal
  //       show={modalShow}
  //       onHide={() => setModalShow(false)}
  //       product={product}
  //       currency={currency}
  //       wishlistItem={wishlistItem}
  //     />
  //   </Fragment>
  // );

  return (
    <Fragment>
      {product && product.images[0] && (<>
        <div className={clsx("product-wrap", spaceBottomClass)}>
        <div className="product-img">
          <Link to={process.env.PUBLIC_URL + "/product/" + product.Id}>
            <img
              className="default-img"
              src={process.env.PUBLIC_URL + product.images[0].location}
              alt=""
            />
            {/* {product.image.length > 1 ? (
              <img
                className="hover-img"
                src={process.env.PUBLIC_URL + product.image[1]}
                alt=""
              />
            ) : (
              ""
            )} */}
          </Link>
          {/* {product.discount || product.new ? (
            <div className="product-img-badges">
              {product.discount ? (
                <span className="pink">-{product.discount}%</span>
              ) : (
                ""
              )}
              {product.new ? <span className="purple">New</span> : ""}
            </div>
          ) : (
            ""
          )} */}

          <div className="product-action">
            <div className="pro-same-action pro-wishlist">
              <button
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                onClick={() => dispatch(addToWishlist(product))}
              >
                <i className="pe-7s-like" />
              </button>
            </div>
            <div className="pro-same-action pro-cart">
              {product.affiliateLink ? (
                <a
                  href={product.affiliateLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  Buy now{" "}
                </a>
              ) : product.variation && product.variation.length >= 1 ? (
                <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`}>
                  Select Option
                </Link>
              ) : product.quantity && product.quantity > 0 ? (
                <button
                  onClick={() => {
                    addProductTocart();
                  }}

                  className={
                    cartItem !== undefined && cartItem.quantity > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "Added to cart" : "Add to cart"
                  }
                >
                  {" "}
                  <i className="pe-7s-cart"></i>{" "}
                  {cartItem !== undefined && cartItem.quantity > 0
                    ? "Added"
                    : "Add to cart"}
                </button>
              ) : (
                <button disabled className="active">
                  Hết Hàng
                </button>
              )}
            </div>
            <div className="pro-same-action pro-quickview">
            <button onClick={() => localStorage.setItem("productBN", JSON.stringify({...product, quantity : 1}))} title="Mua Ngay">
                  <FaMoneyBillAlt />
                </button>
            </div>
          </div>
        </div>
        <div className="product-content text-center">
          <h3>
            <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
              {product.name}
            </Link>
          </h3>
          {product.rating && product.rating > 0 ? (
            <div className="product-rating">
              <Rating ratingValue={product.rating} />
            </div>
          ) : (
            ""
          )}
          <div className="product-price">
              <span style={{color:"green"}}>{product.price + " VNĐ"} </span>
          </div>
        </div>
      </div>
      
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        wishlistItem={wishlistItem}/>
      </>)}

    </Fragment>
  );
};

ProductGridSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductGridSingle;
