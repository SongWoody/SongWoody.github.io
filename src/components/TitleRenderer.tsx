
import React from "react";
import ComposeLogo from "./ComposeLogo";

const TitleRenderer = ({ title, subject }: { title: string, subject?: string }) => {
  if (subject === 'compose') {
    return (
      <>
        <ComposeLogo />
        {title.replace("::compose::", "")}
      </>
    );
  }

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
