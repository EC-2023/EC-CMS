import PropTypes from 'prop-types';

import { setActiveSort } from '../../helpers/product';
import { useEffect } from 'react';
import CategoryAPI from '../../api/CategoryAPI';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const ShopCategories = ({ getSortParams }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCate = async () => {
      const res = await CategoryAPI.fetchFeature();
      setCategories(res.data);
    };

    getCate();
  }, []);
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={(e) => {
                    let newQueryString = '';
                    const currentQueryString = location.search;
                    if (currentQueryString) {
                      const searchIndex = currentQueryString.indexOf('search=');
                      if (searchIndex !== -1) {
                        newQueryString = `${currentQueryString}`;
                      } else {
                        newQueryString = `?`;
                      }
                    } else {
                      newQueryString = `?`;
                    }
                    navigate(newQueryString);
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Categories
                </button>
              </div>
            </li>
            {categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={(e) => {
                        let newQueryString = '';
                        const currentQueryString = location.search;
                        if (currentQueryString) {
                          const searchIndex = currentQueryString.indexOf('search=');
                          if (searchIndex !== -1) {
                            newQueryString = `${currentQueryString}&category=${category.Id}`;
                          } else {
                            newQueryString = `?category=${category.Id}`;
                          }
                        } else {
                          newQueryString = `?category=${category.Id}`;
                        }
                        navigate(newQueryString);
                        setActiveSort(e);
                      }}
                    >
                      {' '}
                      <span className="checkmark" /> {category.name}{' '}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          'No categories found'
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func,
};

export default ShopCategories;
