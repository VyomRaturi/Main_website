import React, { Component } from "react";
import { api } from "api";
import { Container, Col, Row } from "reactstrap";
import { Blob } from "react-blob";
import { StickyContainer, Sticky } from "react-sticky";

import BlogTabs from "sections/BlogSections/BlogTabs";
import BlogSubsciber from "sections/BlogSections/BlogSubsciber";
import BlogPopular from "sections/BlogSections/BlogPopular";
import BlogMagzine from "./BlogMagzine";
import BlogPagination from "./BlogPagination";
export default class BlogHero extends Component {
  constructor(params) {
    super(params);
    this.state = {
      blogs: [],
      categories: [],
      pageNo: 1,
      lastPage: 0,
      totalPages: [],
      loading: true
    };
  }

  componentDidMount() {
    api.get("/story?page=" + this.state.pageNo).then(res => {
      this.setState({ blogs: res.data.data });
      let countPages = [];
      console.log(res.data.meta.last_page);
      for (let i = 1; i <= res.data.meta.last_page; i++) {
        countPages[i - 1] = i;
      }
      this.setState({
        lastPage: res.data.meta.last_page,
        totalPages: countPages
      });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1200);
    });
    api.get("/category").then(res => this.setState({ categories: res.data }));
  }

  changePage(newpage, newposts) {
    this.setState({ pageNo: newpage, blogs: newposts, loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1200);
  }

  render() {
    const { blogs, categories, loading, pageNo, lastPage } = this.state;
    return (
      <>
        <Container
          className="tim-container"
          style={{ minHeight: "100vh !important", overflow: "hidden" }}
        >
          <BackgroundBlob />
          <div id="description-areas">
            <Row>
              <Col md="8" sm="12">
                <BlogTabs
                  loading={loading}
                  posts={blogs}
                  categories={categories}
                />
                <BlogPagination
                  pageNo={pageNo}
                  lastPage={lastPage}
                  changePage={this.changePage.bind(this)}
                />
              </Col>
              <Col className="pt-5" md="4" sm="12">
                <BlogSubsciber />
                <hr
                  style={{
                    borderTop: "1px solid black",
                    borderColor: "black"
                  }}
                />
                <BlogPopular pageNo={pageNo} />
                <hr
                  style={{
                    borderTop: "1px solid black",
                    borderColor: "black"
                  }}
                />
                <BlogMagzine />
                <hr
                  style={{
                    borderTop: "1px solid black",
                    borderColor: "black"
                  }}
                />
              </Col>
            </Row>
          </div>
        </Container>
      </>
    );
  }
}

const BackgroundBlob = ({ style, props }) => (
  <Blob
    size="165vh"
    style={{
      position: "absolute",
      bottom: "10%",
      right: "35%",
      zIndex: 0,
      backgroundColor: "#F08BA5",
      color: "white",
      opacity: 0.25,
      fontSize: "50vh",
      ...style
    }}
    {...props}
  />
);
