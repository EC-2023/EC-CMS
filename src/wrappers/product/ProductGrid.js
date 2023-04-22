import { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../helpers/product';
import ProductGridSingle from '../../components/product/ProductGridSingle';
import productAPI from '../../api/ProductAPI';
// import {setProducts} from "../../store/slices/product-slice"
const ProductGrid = ({ spaceBottomClass, category, type, limit }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const prods = getProducts(products, category, type, limit);
  // useEffect(() => {
  //   const fetchProductList = async () => {
  //     try {
  //       const params = {size : 8, page : 0, orderBy : '-createAt'};
  //       const response = await productAPI.getNewProduct(params);
  //       console.log(response);
  //       dispatch(setProducts(response.data));
  //     } catch (error) {
  //       console.log("faild", error);
  //     }
  //   }

  //   fetchProductList();
  // }, []);

  return <Fragment></Fragment>;
};

ProductGrid.propTypes = {
  spaceBottomClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number,
};

export default ProductGrid;
