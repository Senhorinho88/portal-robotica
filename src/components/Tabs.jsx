import { useId, useRef, useState } from "react";

export default function Tabs({ items, label = "Detalhes do curso" }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const tabsId = useId();

  function handleKeyDown(event, index) {
    const nextIndex = {
      ArrowRight: (index + 1) % items.length,
      ArrowLeft: (index - 1 + items.length) % items.length,
      Home: 0,
      End: items.length - 1,
    }[event.key];
    if (nextIndex === undefined) return;
    event.preventDefault();
    setActive(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="tabs">
      <div className="tab-list" role="tablist" aria-label={label}>
        {items.map((item, i) => (
          <button
            key={item.id}
            ref={(element) => {
              tabRefs.current[i] = element;
            }}
            id={`${tabsId}-tab-${item.id}`}
            role="tab"
            aria-selected={active === i}
            aria-controls={`${tabsId}-panel-${item.id}`}
            tabIndex={active === i ? 0 : -1}
            onKeyDown={(event) => handleKeyDown(event, i)}
            onClick={() => setActive(i)}
          >
            {item.title}
          </button>
        ))}
      </div>
      {items.map((item, i) => (
        <div
          className="tab-panel"
          role="tabpanel"
          id={`${tabsId}-panel-${item.id}`}
          aria-labelledby={`${tabsId}-tab-${item.id}`}
          tabIndex={0}
          hidden={active !== i}
          key={item.id}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
