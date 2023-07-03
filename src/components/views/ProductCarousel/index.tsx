"use client";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import { FC, ReactNode, Component } from "react";
import Card from "../Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";




// slider use kiya h neche jo sare function hai mbl or desktop device k liye 

const ProductCarousel: FC<{ ProductData: Array<oneProductType> }> = ({ ProductData }) => {
    let initialX: number;
    let isDragging = false;
    let tabBox: any;

    const isBrowser = () => typeof window !== "undefined";

    if (isBrowser()) {
        tabBox = document.querySelector(".scrollGrab");
    }

    // Desktop functions
    function mouseMoves(e: any) {
        if (!isDragging) return;
        if (tabBox) {
            tabBox.scrollLeft -= e.movementX;
        }
    };
    function mouseDown() {
        isDragging = true;
    }
    function mouseUp() {
        isDragging = false
    }

    // mobile functions
    function mouseMovesForMobile(e: any) {
        if (!isDragging) return;
        if (tabBox) {
            var currentX = e.touches[0].clientX;
            var movementX = currentX - initialX;
            tabBox.scrollLeft -= movementX / 4;
        }
    };
    function mouseDownForMobile(e: any) {
        isDragging = true;
        initialX = e.touches[0].clientX;
    };
    let dataToItrate = ProductData.slice(0, 15);
    // limit lgai h k slider mai 0 se 15 tk data show ho us se zyda ni


  
    return (
        <div className="space-y-4">
            <div className="text-center space-y-3">
                <p className="text-blue-800 text-sm">PROMOTIONS</p>
                <h3 className="text-3xl text-gray-800 font-bold">Our Promotions Events</h3>
            </div>
            <div
                onMouseMove={mouseMoves}
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
                className="select-none flex gap-4 overflow-x-hidden scrollGrab py-4 overflow-y-hidden"
                onTouchMove={mouseMovesForMobile}
                onTouchStart={mouseDownForMobile}
                onTouchEnd={mouseUp}
            >
                {dataToItrate.map((item: oneProductType, index: number) => (
                    <Card key={index + 4} singleProductData={item} />
                ))}
            </div>
        </div>
    )
}

export default ProductCarousel
