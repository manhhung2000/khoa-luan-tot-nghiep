/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { set } from "../redux/product-modal/productModalSlice";

import Button from "./Button";

import numberWithCommas from "../utils/numberWithCommas";
import { useHistory } from "react-router-dom";

const ProductCard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="product-card">
      <Link to={`/catalog/${props.id}`}>
        <div className="product-card__image">
          <img src={props.img01} alt="image" />
          {/* <img src={props.img02} alt="" /> */}
        </div>
        <h3 className="product-card__name">{props.name}</h3>
        <div className="product-card__price">
          {numberWithCommas(props.price)}
          <span className="product-card__price__old">
            <del>{numberWithCommas(39900000)}</del>
          </span>
        </div>
      </Link>
      <div>Website: {props.website}</div>
      <div className="product-card__btn">
        <Button
          size="sm"
          icon="bx bx-cart"
          animate={true}
          onClick={() => {
            dispatch(set(props.slug));
            history.push(`/catalog/${props.id}`);
          }}
        >
          chọn mua
        </Button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  img01: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number,
};

export default ProductCard;
