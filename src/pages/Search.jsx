/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";

import Helmet from "../components/Helmet";

import Button from "../components/Button";
import InfinityList from "../components/InfinityList";
import { useParams } from "react-router-dom";
import { CircularProgress, FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { Box } from "@mui/system";
import axiosClient from "./../api/axiosClient";

const Search = () => {
  const param = useParams();

  const [loading, setLoading] = useState(false);

  const [listSearch, setListSearch] = useState([]);

  const fetchSearch = async () => {
    setLoading(true);
    const res = await axiosClient.get(`products/search/?query=${param.id}`);
    setListSearch(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchSearch().then(() => {
      setLoading(false);
      setCheckDsc(false);
      setCheckAsc(false);
    });
  }, [param.id]);

  const [checkDsc, setCheckDsc] = useState(false);
  const [checkAsc, setCheckAsc] = useState(false);

  const fetchSearchDesc = async () => {
    setLoading(true);
    const res = await axiosClient.get(
      `products/search/?query=${param.id}&order=dsc&orderField=price`
    );
    setListSearch(res);
    setLoading(false);
  };

  const fetchSearchAsc = async () => {
    setLoading(true);
    const res = await axiosClient.get(
      `products/search/?query=${param.id}&order=asc&orderField=price`
    );
    setListSearch(res);
    setLoading(false);
  };

  const handleChangeDsc = (e) => {
    setCheckDsc(e.target.checked);
    setCheckAsc(false);
    fetchSearchDesc();
  };

  const handleChangeAsc = (e) => {
    setCheckAsc(e.target.checked);
    setCheckDsc(false);
    fetchSearchAsc();
  };

  const filterRef = useRef(null);

  const showHideFilter = () => filterRef.current.classList.toggle("active");

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
            <InfinityList data={listSearch} />
          </div>
        </div>
      )}
    </Helmet>
  );
};

export default Search;
