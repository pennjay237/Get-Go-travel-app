import React from "react";

const SectionWrapper = ({ title, children }) => {
  return (
    <section className="my-8">
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
      <div>{children}</div>
    </section>
  );
};

export default SectionWrapper;
