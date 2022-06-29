/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";

import Helmet from "../components/Helmet";

import productData from "../assets/fake-data/products";
import Button from "../components/Button";
import InfinityList from "../components/InfinityList";
import CheckBox from "./../components/CheckBox";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import http from "../api/axiosClient";
import { setListCategories } from "../redux/product/productSlice";
import { Checkbox, CircularProgress, FormControlLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import _ from "lodash";
import { Box } from "@mui/system";

const Catalog = () => {
  const param = useParams();
  const dispatch = useDispatch();

  const [listCate, setListCate] = useState([]);

  const [checkDsc, setCheckDsc] = useState(false);
  const [checkAsc, setCheckAsc] = useState(false);

  const [loading, setLoading] = useState(true);

  const filterRef = useRef(null);
  const history = useHistory();

  const fetchCate = async () => {
    const res = await http.get(
      `https://b76b-115-76-50-176.ap.ngrok.io/products/?categoryId=${param.id}`
    );
    dispatch(setListCategories(res));
    setListCate(res);
    setLoading(false);
  };

  const fetchCateDesc = async () => {
    setLoading(true);
    const res = await http.get(
      `products/?categoryId=${param.id}&order=dsc&orderField=price`
    );
    setListCate(res);
    setLoading(false);
  };

  const fetchCateAsc = async () => {
    setLoading(true);
    const res = await http.get(
      `products/?categoryId=${param.id}&order=asc&orderField=price`
    );
    setListCate(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchCate().then(() => {
      setLoading(false);
      setCheckDsc(false);
      setCheckAsc(false);
    });
  }, []);

  const handleChangeDsc = (e) => {
    setCheckDsc(e.target.checked);
    setCheckAsc(false);
    fetchCateDesc();
  };
  const handleChangeAsc = (e) => {
    setCheckAsc(e.target.checked);
    setCheckDsc(false);
    fetchCateAsc();
  };

  const showHideFilter = () => filterRef.current.classList.toggle("active");

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <Helmet title="Sản phẩm">
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20%",
          }}
        >
          <Box>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: "2em", fontSize: "20px" }}>
            <div role="presentation">
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" onClick={handleClick}>
                  Trang chủ
                </Link>
                <Typography color="text.primary">Sản phẩm</Typography>
              </Breadcrumbs>
            </div>
          </div>
          <div className="catalog">
            <div className="catalog__filter" ref={filterRef}>
              <div
                className="catalog__filter__close"
                onClick={() => showHideFilter()}
              >
                <i className="bx bx-left-arrow-alt"></i>
              </div>
              <div className="catalog__filter__widget">
                <div className="catalog__filter__widget__title">Giá</div>
                <div className="catalog__filter__widget__content">
                  <div className="catalog__filter__widget__content__item">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkDsc}
                          onChange={handleChangeDsc}
                          name="dsc"
                        />
                      }
                      label="Giảm dần"
                    />
                  </div>
                  <div className="catalog__filter__widget__content__item">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkAsc}
                          onChange={handleChangeAsc}
                          name="asc"
                        />
                      }
                      label="Tăng dần"
                    />
                  </div>
                </div>
              </div>

              <div className="catalog__filter__widget">
                <div className="catalog__filter__widget__content">
                  <Button size="sm">xóa bộ lọc</Button>
                </div>
              </div>
            </div>
            <div className="catalog__filter__toggle">
              <Button size="sm" onClick={() => showHideFilter()}>
                bộ lọc
              </Button>
            </div>
            <div className="catalog__content">
              <InfinityList data={listCate} />
            </div>
          </div>
        </>
      )}
    </Helmet>
  );
};

export default Catalog;
