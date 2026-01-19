import React from "react";
import "./TableOfContents.css"

interface Heading {
  id: string;
  value: string;
  depth: number;
}

interface TOCProps {
  headings: Heading[];
}

const TableOfContents = ({ headings }: TOCProps) => {
  if (!headings || headings.length === 0) return null;

  return (
    <nav className="toc-container">
      <div className="toc-list">
        {headings.map((heading) => (
          <div
            key={heading.id}
            className={`toc-item depth-${heading.depth}`}
          >
            <button
              onClick={() => {
                const element = document.getElementById(heading.id);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {heading.value}
            </button>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default TableOfContents;