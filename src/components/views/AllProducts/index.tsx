"use client";
import BASE_PATH_FORAPI from "@/components/shared/Wrapper/BasePath";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../Card";

interface PropsType {
  productArray: Array<oneProductType>;
}

export default class AllProductsCompo extends Component<{
  ProductData: PropsType;
}> {
  start: number = 10;
  end: number = 20;
  // state by default hai
  state: { items: Array<oneProductType>; hasMore: boolean } = {
    items: [...this.props.ProductData.productArray],
    hasMore: true,
  };
  fetchDataFromApiGradually = async (start: number, end: number) => {
    const res = await fetch(
      `${BASE_PATH_FORAPI}/api/products?start=${start}&end=${end}`
    );
    const dataToCheckAndSend = await res.json();
    if (dataToCheckAndSend.productArray === "Not found") {
      this.setState({ hasMore: false });
    }
    return dataToCheckAndSend;
  };
  getData = async () => {
    let allTogether = await this.fetchDataFromApiGradually(
      this.start,
      this.end
    );
    if (allTogether.productArray !== "Not found") {
      this.setState({
        items: this.state.items.concat(allTogether.productArray),
      });
    } else {
      this.setState({ hasMore: false });
    }
    this.start = this.start + 10;
    this.end = this.end + 10;
  };

  render() {
    return (
      <InfiniteScroll
        dataLength={this.state.items.length}
        //This is important field to render the next data
        next={this.getData}
        hasMore={this.state.hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        className="content-center justify-center grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {this.state.items.map((item: oneProductType, index: number) => (
          <Card key={index} singleProductData={item} />
        ))}
      </InfiniteScroll>
    );
  }
}
