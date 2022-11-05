import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={500}
      viewBox="0 0 280 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="132" cy="132" r="132" />
      <rect x="-2" y="281" rx="10" ry="10" width="280" height="23" />
      <rect x="0" y="319" rx="0" ry="0" width="280" height="88" />
      <rect x="0" y="438" rx="0" ry="0" width="95" height="30" />
      <rect x="125" y="431" rx="25" ry="25" width="150" height="45" />
    </ContentLoader>
  );
};

export default Skeleton;
