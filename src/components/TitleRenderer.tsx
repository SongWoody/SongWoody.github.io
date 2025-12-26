
import React from "react";
import ComposeLogo from "./ComposeLogo";

const TitleRenderer = ({ title }: { title: string }) => {
  if (!title.includes("::compose::")) {
    return <>{title}</>;
  }

  const parts = title.split("::compose::");
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {i > 0 && <ComposeLogo />}
          {part}
        </React.Fragment>
      ))}
    </>
  );
};

export default TitleRenderer;
