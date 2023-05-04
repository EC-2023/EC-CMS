import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import "./ProductDescriptionInfo.scss";
import CartAPI from "../../api/CartAPI";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
}) => {

  const [selectedBtnAttibute, setSelectedBtnAttibute] = useState({});

  const handleButtonClick = (attributeName, valueName) => {
    setSelectedBtnAttibute(prevState => ({ ...prevState, [attributeName]: valueName }));
    handleAttributeChange(attributeName, valueName);
  };
  
    const isSelected = (attributeName, valueName) => {
      return selectedBtnAttibute[attributeName] === valueName;
    };
  
  
  const dispatch = useDispatch();
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  function attributesToString(attributes) {
    if (!Array.isArray(attributes)) {
      return undefined;
    }
    return attributes.map(attr => `${attr.name}: ${attr.value}`).join(", ");
  }

  const [selectedAttributes, setSelectedAttributes] = useState([]);

  useEffect(() => {
    console.log(selectedAttributes);
    console.log(product.Id, quantityCount, attributesToString(selectedAttributes))
  }, [selectedAttributes]);

  const addProductTocart = async () => {
    try {
      const attributesValues = selectedAttributes.length > 0 ? [attributesToString(selectedAttributes)] : [];
      const params = { productId: product.Id, quantity: quantityCount, attributesValues };
      console.log(params);
      const response = await CartAPI.addToCart(params);
      dispatch(addToCart({...product, quantity : params.quantity}));

    } catch (error) {
      console.log(error);
    } 
  }


  function handleAttributeChange(attributeName, selectedValue) {
    setSelectedAttributes((prevSelectedAttributes) => {
      const attributesArray = Array.isArray(prevSelectedAttributes) ? prevSelectedAttributes : [];
      const attributeIndex = attributesArray.findIndex(attr => attr.name === attributeName);
      if (attributeIndex !== -1) {
        // Nếu thuộc tính đã tồn tại trong mảng, ghi đè giá trị của nó
        const updatedAttributes = [...attributesArray];
        updatedAttributes[attributeIndex] = { name: attributeName, value: selectedValue };
        return updatedAttributes;
      } else {
        // Nếu thuộc tính chưa tồn tại trong mảng, thêm vào mảng
        return [...attributesArray, { name: attributeName, value: selectedValue }];
      }
    });
  }

  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
      <div className="product-details-price">
        {discountedPrice !== null ? (
          <Fragment>
            <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
            <span className="old">
              {currency.currencySymbol + finalProductPrice}
            </span>
          </Fragment>
        ) : (
          <span>{currency.currencySymbol + finalProductPrice} </span>
        )}
      </div>
      <ToastContainer/>
      {product.rating && product.rating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.rating} />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="pro-details-list">
        <p>{product.shortDescription}</p>
      </div>

      {product.variation ? (
        <div className="pro-details-size-color">
          <div className="pro-details-color-wrap">
            <span>Color</span>
            <div className="pro-details-color-content">
              {product.variation.map((single, key) => {
                return (
                  <label
                    className={`pro-details-color-content--single ${single.color}`}
                    key={key}
                  >
                    <input
                      type="radio"
                      value={single.color}
                      name="product-color"
                      checked={
                        single.color === selectedProductColor ? "checked" : ""
                      }
                      onChange={() => {
                        setSelectedProductColor(single.color);
                        setSelectedProductSize(single.size[0].name);
                        setProductStock(single.size[0].stock);
                        setQuantityCount(1);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="pro-details-size">
            <span>Size</span>
            <div className="pro-details-size-content">
              {product.variation &&
                product.variation.map((single) => {
                  return single.color === selectedProductColor
                    ? single.size.map((singleSize, key) => {
                        return (
                          <label
                            className={`pro-details-size-content--single`}
                            key={key}
                          >
                            <input
                              type="radio"
                              value={singleSize.name}
                              checked={
                                singleSize.name === selectedProductSize
                                  ? "checked"
                                  : ""
                              }
                              onChange={() => {
                                setSelectedProductSize(singleSize.name);
                                setProductStock(singleSize.stock);
                                setQuantityCount(1);
                              }}
                            />
                            <span className="size-name">{singleSize.name}</span>
                          </label>
                        );
                      })
                    : "";
                })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {product.affiliateLink ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
            <a
              href={product.affiliateLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Buy Now
            </a>
          </div>
        </div>
      ) : (
        <div className="pro-details-quality">
          <div className="cart-plus-minus">
            <button
              onClick={() =>
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
              }
              className="dec qtybutton"
            >
              -
            </button>
            <input
              className="cart-plus-minus-box"
              type="text"
              value={quantityCount}
              readOnly
            />
            <button
              onClick={() =>
                setQuantityCount(
                  quantityCount < product.quantity - productCartQty
                    ? quantityCount + 1
                    : quantityCount
                )
              }
              className="inc qtybutton"
            >
              +
            </button>
          </div>
          <div className="pro-details-cart btn-hover">
            {product.quantity && product.quantity > 0 ? (
              <button
                // onClick={() => {
                //       dispatch(addToCart({...product, quantity : quantityCount}));
                //       console.log({...product, quantity : quantityCount});
                //       }}
                onClick={() => {addProductTocart()}}
                disabled={productCartQty >= product.quantity}
              >
                {" "}
                Thêm vào giỏ hàng{" "}
              </button>
            ) : (
              <button disabled>Hết Hàng</button>
            )}
          </div>
          <div className="pro-details-wishlist">
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
          {/* <div className="pro-details-compare">
            <button
              className={compareItem !== undefined ? "active" : ""}
              disabled={compareItem !== undefined}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={() => dispatch(addToCompare(product))}
            >
              <i className="pe-7s-shuffle" />
            </button>
          </div> */}
        </div>
      )}
      {product.category && product.category.name ? (
        <div className="pro-details-meta">
          <span>Category:</span>
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                {product.category.name}
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
      {/* {console.log(product.attributes[0][" attributeValues"][0])} */}
      <div className="attribute">
      <span>Thuộc tính:</span>
      {product.attributes.map((attribute, index) => (
        <>
          {attribute.attributeValues.length > 1 ? (
            <div key={index} className="attribute-group">
              <p>{attribute.name}:</p>
              <div>
                {attribute.attributeValues.map((value, index) => (
                  <button
                    key={index}
                    className={`attribute-button ${
                      isSelected(attribute.name, value.name) ? "selected" : ""
                    }`}
                    onClick={() => handleButtonClick(attribute.name, value.name)}
                  >
                    {value.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      ))}
    </div>
      {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}

      {/* <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  cartItems: PropTypes.array,
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
};

export default ProductDescriptionInfo;
