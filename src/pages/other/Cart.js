import { Fragment, useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  deleteAllFromCart,
} from "../../store/slices/cart-slice";
import { cartItemStock } from "../../helpers/product";
import CartAPI from "../../api/CartAPI";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [storeList, setStoreList] = useState([]);

  const [selectedItems, setSelectedItems] = useState(
    JSON.parse(localStorage.getItem("selectedItems")) || []
  );

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const handleSelectItem = (itemId) => {
    const index = selectedItems.indexOf(itemId);
    if (index === -1) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems([
        ...selectedItems.slice(0, index),
        ...selectedItems.slice(index + 1),
      ]);
    }
  };

  const dispatch = useDispatch();
  const getCart = async () => {
    try {
      const params = { skip: 0, limit: 10 };
      const response = await CartAPI.getCartItems(params);
      console.log(response.data.data);
      if (response.data.data) {
        dispatch(deleteAllFromCart());
        setCartItems(response.data.data[0].cartItems);
        setIsLoading(false);
        response.data.data[0].cartItems.forEach((cartItem) => {
          console.log("add to cart", cartItem.product);
          response.data.data.forEach((Item) => {
            setStoreList(
              storeList.includes(Item.store)
                ? storeList
                : storeList.concat(Item.store)
            );
          });

          dispatch(
            addToCart({
              ...cartItem.product,
              Id: cartItem.Id,
              quantity: cartItem.quantity,
            })
          );
        });
      }
    } catch {}
    setIsLoading(false);
  };

  const deleteProductInCart = async (cartItem) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.Id !== cartItem.Id
    );
    dispatch(deleteAllFromCart());
    updatedCartItems.map((cartItem) => {
      dispatch(
        addToCart({
          ...cartItem.product,
          Id: cartItem.Id,
          quantity: cartItem.quantity,
        })
      );
    });
    console.log(updatedCartItems);
    setCartItems(updatedCartItems);
    const response = await CartAPI.deleteProductInCart(cartItem.Id);
    console.log(response);
  };

  useEffect(() => {
    getCart();
  }, []);

  const totalPrice = useMemo(() => {
    let totalPrice = 0;
    cartItems.forEach((cartItem) => {
      totalPrice += cartItem.product.price * cartItem.quantity;
    });
    return totalPrice;
  }, [cartItems]);

  useEffect(() => {
    setCartTotalPrice(totalPrice);
  }, [totalPrice]);

  const [quantityCount] = useState(1);
  let { pathname } = useLocation();

  const currency = useSelector((state) => state.currency);

  if (isLoading) {
    return (
      <div className="flone-preloader-wrapper">
        <div className="flone-preloader">
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <SEO
        titleTemplate="Cart"
        description="Cart page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Cart", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="name-shop">
                      {storeList.length > 0 &&
                        storeList.map((store, key) => {
                          return (
                            <div key={key}>
                              <h3 style={{ color: "green" }}>{store.name}</h3>
                              <div className="table-content table-responsive cart-table-content">
                                <table>
                                  <thead>
                                    <tr>
                                      <th></th>
                                      <th>Hình</th>
                                      <th>Tên sản phẩm</th>
                                      <th>Thuộc tính</th>
                                      <th>Đơn giá</th>
                                      <th>Số lượng</th>
                                      <th>Tổng</th>
                                      <th>Xoá</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {cartItems.map((cartItem, key) => {
                                      if (
                                        cartItem.product.storeId !== store.Id
                                      ) {
                                        return null; // skip rendering this cart item
                                      }
                                      return (
                                        <tr key={key}>
                                          <td>
                                            <input
                                            style={{ width: "15px" }}
                                              type="checkbox"
                                              checked={selectedItems.includes(
                                                cartItem.Id
                                              )}
                                              onChange={() => {
                                                if (
                                                  selectedItems.includes(
                                                    cartItem.Id
                                                  )
                                                ) {
                                                  setSelectedItems(
                                                    selectedItems.filter(
                                                      (id) => id !== cartItem.Id
                                                    )
                                                  );
                                                } else {
                                                  setSelectedItems([
                                                    ...selectedItems,
                                                    cartItem.Id,
                                                  ]);
                                                }
                                              }}
                                            />
                                          </td>
                                          <td className="product-thumbnail">
                                            <Link
                                              to={
                                                process.env.PUBLIC_URL +
                                                "/product/" +
                                                cartItem.Id
                                              }
                                            >
                                              <img
                                                className="img-fluid"
                                                src={
                                                  process.env.PUBLIC_URL +
                                                  cartItem.product.images[0]
                                                    .location
                                                }
                                                alt=""
                                              />
                                            </Link>
                                          </td>

                                          <td className="product-name">
                                            <Link
                                              to={
                                                process.env.PUBLIC_URL +
                                                "/product/" +
                                                cartItem.product.Id
                                              }
                                            >
                                              {cartItem.product.name}
                                            </Link>
                                            {cartItem.selectedProductColor &&
                                            cartItem.selectedProductSize ? (
                                              <div className="cart-item-variation">
                                                <span>
                                                  Color:{" "}
                                                  {
                                                    cartItem.selectedProductColor
                                                  }
                                                </span>
                                                <span>
                                                  Size:{" "}
                                                  {cartItem.selectedProductSize}
                                                </span>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                          </td>

                                          <td className="product-attributes">
                                            {cartItem.attributeValues.length >
                                              0 &&
                                              cartItem.attributeValues[0].name}
                                          </td>

                                          <td className="product-price-cart">
                                            <span className="amount">
                                              {cartItem.product.price}
                                            </span>
                                          </td>

                                          <td className="product-quantity">
                                            <div className="cart-plus-minus">
                                              <button
                                                className="dec qtybutton"
                                                onClick={() =>
                                                  console.log("giảm")
                                                }
                                              >
                                                -
                                              </button>
                                              <input
                                                className="cart-plus-minus-box"
                                                type="text"
                                                value={cartItem.quantity}
                                                readOnly
                                              />
                                              <button
                                                className="inc qtybutton"
                                                onClick={() =>
                                                  console.log("tăng")
                                                }
                                                disabled={
                                                  cartItem === undefined
                                                }
                                              >
                                                +
                                              </button>
                                            </div>
                                          </td>
                                          <td className="product-subtotal">
                                            {(
                                              cartItem.product.price *
                                              cartItem.quantity
                                            ).toFixed(2) + " VNĐ"}
                                          </td>

                                          <td className="product-remove">
                                            <button
                                              onClick={() => {
                                                // dispatch(
                                                //   deleteFromCart(cartItem.cartItemId)
                                                // )
                                                deleteProductInCart(cartItem);
                                              }}
                                            >
                                              <i className="fa fa-times"></i>
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                        >
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => dispatch(deleteAllFromCart())}>
                          Clear Shopping Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    {/* <div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Estimate Shipping And Tax
                        </h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>
                          Enter your destination to get a shipping estimate.
                        </p>
                        <div className="tax-select-wrapper">
                          <div className="tax-select">
                            <label>* Country</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Region / State</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Zip/Postal Code</label>
                            <input type="text" />
                          </div>
                          <button className="cart-btn-2" type="submit">
                            Get A Quote
                          </button>
                        </div>
                      </div>
                    </div> */}
                  </div>

                  <div className="col-lg-4 col-md-6">
                    {/* <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Use Coupon Code
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Enter your coupon code if you have one.</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">
                            Apply Coupon
                          </button>
                        </form>
                      </div>
                    </div> */}
                  </div>

                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Cart Total
                        </h4>
                      </div>
                      <h4 className="grand-totall-title">
                        Tổng đơn hàng{" "}
                        <span>
                          {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                        </span>
                      </h4>
                      <Link to={process.env.PUBLIC_URL + "/checkout"}>
                        Chuyển đến trang thanh toán
                      </Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Cart;
