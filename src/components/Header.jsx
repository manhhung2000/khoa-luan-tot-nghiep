/* eslint-disable no-unused-vars */
import { SearchOutlined } from "@material-ui/icons";
import { Button, TextField } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import axiosClient from "./../api/axiosClient";
import { useDispatch } from "react-redux";
import { setListSearchs } from "../redux/product/productSlice";

const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/product/1",
  },
  {
    display: "Phụ kiện",
    path: "/accessories",
  },
  {
    display: "Liên hệ",
    path: "/contact",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);

  const history = useHistory();

  const dispatch = useDispatch();

  const headerRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const menuLeft = useRef(null);

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  const [search, setSearch] = React.useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const [listSearch, setListSearch] = useState([]);

  const fetchSearch = async () => {
    try {
      const res = await axiosClient.get(`products/search/?query=${search}`);
      setListSearch(res);
      dispatch(setListSearchs(res));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // fetchSearch().then(() => {
      history.push(`/search/${search}`);
    // });
  };

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo"></div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="header__menu__center">
            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                label="Tìm kiếm"
                variant="standard"
                style={{ width: "80%" }}
                onChange={handleChange}
                required
              />
              <div style={{ width: "20%" }}>
                <Button
                  className="btn"
                  style={{ height: "40px" }}
                  variant="contained"
                  startIcon={<SearchOutlined />}
                  type="submit"
                >
                  Tìm
                </Button>
              </div>
            </form>
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              <i className="bx bx-search"></i>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <Link to="/cart">
                <i className="bx bx-shopping-bag"></i>
              </Link>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <i className="bx bx-user"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
