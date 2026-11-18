"use client";

import { Children, useId, useState, type ReactNode } from "react";

const labels = ["Story & details", "Cast & characters", "Episodes & scenes"];

export function DramaTabs({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const panels = Children.toArray(children);
  return (
    <div className="drama-tabs">
      <div
        className="drama-chapters"
        role="tablist"
        aria-label="Drama information"
      >
        {labels.map((label, index) => (
          <button
            key={label}
            id={id + "-tab-" + index}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={id + "-panel-" + index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight")
                next = (index + 1) % labels.length;
              else if (event.key === "ArrowLeft")
                next = (index + labels.length - 1) % labels.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = labels.length - 1;
              else return;
              event.preventDefault();
              setActive(next);
              document.getElementById(id + "-tab-" + next)?.focus();
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {panels.map((panel, index) => (
        <div
          key={index}
          id={id + "-panel-" + index}
          role="tabpanel"
          aria-labelledby={id + "-tab-" + index}
          hidden={active !== index}
          tabIndex={0}
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
