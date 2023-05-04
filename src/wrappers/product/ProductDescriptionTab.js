import PropTypes from 'prop-types';
import clsx from 'clsx';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useEffect } from 'react';
import ReviewAPI from '../../api/ReviewAPI';
import { set } from 'lodash';

const ProductDescriptionTab = ({ spaceBottomClass, productFullDesc, product }) => {
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  let [reviews, setReviews] = useState([]);
  const [checkBuy, setCheckBuy] = useState(false);
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!checkBuy) {
      alert('bạn phải mua hàng mới được đánh giá.');
    }
    if (comment.trim() === '' || rating === 0) return;
    const res = await ReviewAPI.createReview({
      content: comment,
      rating: rating,
      productId: product.Id,
    });
    if (!res.error) {
      setComment('');
      setRating(5);
      setReviews([...reviews, res.data]);
    }
  };
  useEffect(() => {
    const getPreview = async () => {
      // const [reviews, checkBuy] = await Promise.all([
      //   ReviewAPI.getReviewByProduct(product.Id),
      //   ReviewAPI.checkBuy(product.Id),
      // ]);
      const reviews = await ReviewAPI.getReviewByProduct(product.Id);
      setReviews(reviews.data);
      // const checkBuy = await ReviewAPI.checkBuy(product.Id);
      // setCheckBuy(checkBuy.data);
    };
    getPreview();
  }, []);
  const disabledStyle = {
    pointerEvents: 'none',
    opacity: 0.5,
  };
  return (
    <div className={clsx('description-review-area', spaceBottomClass)}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="additionalInfo">Thông tin sản phẩm</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Sản phẩm</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">Nhận xét</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                  {product.attributes.map((attribute, index) => (
                    <>
                      {attribute.attributeValues.length < 2 ? (
                        <div key={index} className="attribute-group">
                          <p>{attribute.name}:</p>
                          <ul>
                            {attribute.attributeValues.map((value, index) => (
                              <li key={index}>
                                <span>{value.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        ''
                      )}
                    </>
                  ))}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">{productFullDesc}</Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="review-wrapper">
                      {reviews.length > 0
                        ? reviews.map((review, index) => (
                            <div className="single-review">
                              <div className="review-img">
                                <img
                                  src={
                                    review.avatar
                                      ? review.avatar
                                      : process.env.PUBLIC_URL + '/assets/img/testimonial/1.jpg'
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="review-content">
                                <div className="review-top-wrap">
                                  <div className="review-left">
                                    <div className="review-name">
                                      <h4>{review.user.displayName}</h4>
                                    </div>
                                    <div className="review-rating">
                                      {Array.from({ length: review.rating }, (v, i) => (
                                        <i key={i} className="fa fa-star" />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="review-bottom">
                                  <p>{review.content}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        : ''}
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="ratting-form-wrapper pl-50">
                      <h3>Add a Review</h3>
                      <div className="ratting-form">
                        <form action={handleSubmitComment}>
                          <div className="star-box">
                            <span>Your rating:</span>
                            <div>
                              {[...Array(5)].map((star, index) => {
                                const ratingValue = index + 1;
                                return (
                                  <label key={index}>
                                    <input
                                      type="radio"
                                      name="rating"
                                      value={ratingValue}
                                      onClick={() => setRating(ratingValue)}
                                      style={{ display: 'none' }}
                                    />
                                    <FaStar
                                      size={30}
                                      color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                                      onMouseEnter={() => setHover(ratingValue)}
                                      onMouseLeave={() => setHover(null)}
                                    />
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="rating-form-style form-submit">
                                <textarea
                                  name="Your Review"
                                  placeholder="Message"
                                  defaultValue={''}
                                  onChange={(e) => setComment(e.target.value)}
                                />
                                <div style={!checkBuy ? disabledStyle : {}}>
                                  <input type="submit" value="Submit" onClick={handleSubmitComment} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  product: PropTypes.shape({}),
};

export default ProductDescriptionTab;
