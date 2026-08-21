import React from "react";
import { Image } from "antd";
import bgImage from "../Images/university-background-image.jpg";

export default function SPimagebg({ width = "100%", height = "100%", style = {} }) {
  return (
    <div
      style={{
        width: width,
        height: height,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style
      }}
    >
      <Image
        width={width}
        height={height}
        src={bgImage}
        preview={false}
        style={{
          objectFit: "cover",
          borderRadius: "8px"
        }}
        className="login-bg-image"
      />
    </div>
  );
}
