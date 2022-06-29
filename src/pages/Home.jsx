/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link } from "react-router-dom";

import Helmet from "../components/Helmet";
import Section, { SectionTitle, SectionBody } from "../components/Section";
import PolicyCard from "../components/PolicyCard";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";

import policy from "../assets/fake-data/policy";

import banner from "../assets/images/carousel/slider1.webp";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import slider1 from "../assets/images/carousel/slider1.webp";
import slider2 from "../assets/images/carousel/slider2.webp";
import slider3 from "../assets/images/carousel/slider3.webp";
import slider4 from "../assets/images/carousel/slider4.webp";
import slider5 from "../assets/images/carousel/slider5.webp";
import slider6 from "../assets/images/carousel/slider6.webp";
import slider7 from "../assets/images/carousel/slider7.webp";
import slider8 from "../assets/images/carousel/slider8.webp";
import slider9 from "../assets/images/carousel/slider9.webp";
import slider10 from "../assets/images/carousel/slider10.webp";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories, getProducts } from "./../redux/product/productSlice";

const Home = () => {
  const [value, setValue] = React.useState(0);
  const [limit, setLimit] = React.useState(10);

  const products = useSelector((state) => state.products?.product);
  const categories = useSelector((state) => state.products?.category);
  const loading = useSelector((state) => state.products.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const loadMore = () => {
    setLimit(limit + 4);
  };

  const data = [
    {
      src: slider1,
    },
    {
      src: slider2,
    },
    {
      src: slider3,
    },
    {
      src: slider4,
    },
    {
      src: slider5,
    },
    {
      src: slider6,
    },
    {
      src: slider7,
    },
    {
      src: slider8,
    },
    {
      src: slider9,
    },
    {
      src: slider10,
    },
  ];
  return (
    <Helmet title="Trang chủ">
      {loading ? (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "30%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Section>
            <SectionTitle>danh mục sản phẩm</SectionTitle>
            <div className="section__cate">
              <Box>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  {categories?.map((item, index) => (
                    <Tab
                      key={index}
                      label={item.name}
                      to={`/product/${item.id}`}
                      component={Link}
                    />
                  ))}
                </Tabs>
              </Box>
            </div>
          </Section>

          <div style={{ display: "flex", margin: "4rem 0", gap: "1em" }}>
            <div style={{ width: "70%" }}>
              <Carousel autoPlay={true} interval={2000}>
                {data.map((item, index) => (
                  <div key={index} style={{ width: "100%", height: "250px" }}>
                    <img src={item.src} alt="slider" />
                  </div>
                ))}
              </Carousel>
            </div>
            <div style={{ width: "30%" }} className="carousel-slider">
              <img
                src={slider10}
                alt="slider"
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          </div>

          {/* end hero slider */}

          {/* policy section */}
          <Section>
            <SectionBody>
              <Grid col={4} mdCol={2} smCol={1} gap={20}>
                {policy.map((item, index) => (
                  <Link key={index} to="/policy">
                    <PolicyCard
                      name={item.name}
                      description={item.description}
                      icon={item.icon}
                    />
                  </Link>
                ))}
              </Grid>
            </SectionBody>
          </Section>
          {/* end policy section */}

          {/* best selling section */}
          <Section>
            <SectionTitle>top sản phẩm bán chạy trong tuần</SectionTitle>
            <SectionBody>
              <Grid col={4} mdCol={2} smCol={1} gap={20}>
                {products?.map((item, index) => (
                  <ProductCard
                    key={index}
                    img01={item.imageLink}
                    name={item.product_name}
                    price={Number(item.price)}
                    id={item.id}
                    website={item.website}
                  />
                ))}
              </Grid>
            </SectionBody>
          </Section>
          {/* end best selling section */}

          {/* new arrival section */}
          <Section>
            <SectionTitle>sản phẩm mới</SectionTitle>
            <SectionBody>
              <Grid col={4} mdCol={2} smCol={1} gap={20}>
                {products?.map((item, index) => (
                  <ProductCard
                    key={index}
                    img01={item.imageLink}
                    name={item.product_name}
                    price={Number(item.price)}
                    id={item.id}
                    website={item.website}
                  />
                ))}
              </Grid>
            </SectionBody>
          </Section>
          {/* end new arrival section */}

          {/* banner */}
          <Section>
            <SectionBody>
              <Link to="/catalog">
                <img src={banner} alt="" width={"100%"} />
              </Link>
            </SectionBody>
          </Section>
          {/* end banner */}

          {/* popular product section */}
          <Section>
            <SectionTitle>phổ biến</SectionTitle>
            <SectionBody>
              <Grid col={4} mdCol={2} smCol={1} gap={20}>
                {products?.map((item, index) => (
                  <ProductCard
                    key={index}
                    img01={item.imageLink}
                    name={item.product_name}
                    price={Number(item.price)}
                    id={item.id}
                    website={item.website}
                  />
                ))}
              </Grid>
            </SectionBody>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button onClick={loadMore} variant="contained">
                Xem thêm
              </Button>
            </div>
          </Section>
          {/* end popular product section */}
        </>
      )}
    </Helmet>
  );
};

export default Home;
