import { useId, useState } from "react";
import Icon from "./Icon.jsx";

export default function Accordion({ items }) {
  const [openId, setOpenId] = useState(null);
  const groupId = useId();
  return (
    <div className="accordion">
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `${groupId}-${item.id}`;
        return (
          <div
            className={`accordion-item ${open ? "is-open" : ""}`}
            key={item.id}
          >
            <h3>
              <button
                id={`${panelId}-trigger`}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                {item.title}
                <Icon name="chevron" size={18} />
              </button>
            </h3>
            <div
              className="accordion-panel"
              id={panelId}
              role="region"
              aria-labelledby={`${panelId}-trigger`}
              aria-hidden={!open}
              inert={!open}
            >
              <div>
                <p>{item.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
