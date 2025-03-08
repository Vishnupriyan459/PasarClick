import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";

const ProductPriceChart = () => {
  const chartRef = useRef();
  const { items: vendors } = useSelector((state) => state.vendors);

  useEffect(() => {
    if (!vendors || vendors.length === 0) return;

    const allProducts = vendors?.flatMap((vendor) =>
      vendor.products.map((product) => product.OriginalPrice)
    ) || [];

    if (allProducts.length === 0) return;

    // Define histogram bins (price ranges)
    const binCount = 20; // Number of bins
    const bins = d3.histogram()
      .domain(d3.extent(allProducts)) // Range from min to max price
      .thresholds(binCount) // Number of bins
      (allProducts);

    // Chart dimensions
    const width = 928;
    const height = 500;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    // Define scales
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(bins, (d) => d.x1)]) // Use bin max as domain
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(bins, (d) => d.length)]) // Count of products in bin
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Create SVG container
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Add bars for the histogram
    svg.selectAll("rect")
      .data(bins)
      .enter().append("rect")
      .attr("x", (d) => x(d.x0)) // Bin start
      .attr("width", (d) => x(d.x1) - x(d.x0) - 1) // Bin width
      .attr("y", (d) => y(d.length)) // Height from count
      .attr("height", (d) => y(0) - y(d.length)) // Bar height
      .attr("fill", "steelblue")
      .attr("opacity", 0.7);

    // Add X-axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(d3.format(".2s")))
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.bottom - 10)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Product Price (INR)");

    // Add Y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .append("text")
      .attr("x", -margin.left)
      .attr("y", 10)
      .attr("fill", "black")
      .attr("text-anchor", "start")
      .text("Number of Products");

  }, [vendors]);

  return <svg ref={chartRef}></svg>;
};

export default ProductPriceChart;
