// webcomponent/mocks/next-image.tsx
import React from "react";
const Image = ({ src, alt, width, height, ...props }: any) => (
  <img src={src} alt={alt} width={width} height={height} {...props} />
);
export default Image;