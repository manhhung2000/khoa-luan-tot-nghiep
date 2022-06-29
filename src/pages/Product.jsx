/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import Helmet from "../components/Helmet";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";
import ProductView from "../components/ProductView";

import productData from "../assets/fake-data/products";
import http from "../api/axiosClient";
import { useHistory, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Breadcrumbs, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Product = (props) => {
  const param = useParams();

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const fetchProductDetail = async () => {
    const res = await http.get(`products/detail/${param.id}`);
    setProduct(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  // const relatedProducts = productData.getProducts(8);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <Helmet title={product?.name}>
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
                <Link
                  underline="hover"
                  color="inherit"
                  to="/"
                  onClick={handleClick}
                >
                  Trang chủ
                </Link>
                <Typography color="text.primary">Mua hàng</Typography>
              </Breadcrumbs>
            </div>
          </div>
          <Section>
            <SectionBody>
              <ProductView product={product} />
            </SectionBody>
          </Section>
          {/* <Section>
            <SectionTitle>Khám phá thêm</SectionTitle>
            <SectionBody>
              <Grid col={4} mdCol={2} smCol={1} gap={20}>
                {relatedProducts.map((item, index) => (
                  <ProductCard
                    key={index}
                    img01={item.imageLink}
                    name={item.title}
                    price={Number(item.price)}
                    id={item.id}
                  />
                ))}
              </Grid>
            </SectionBody>
          </Section> */}
        </>
      )}
    </Helmet>
  );
};

export default Product;
