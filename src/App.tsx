import * as React from "react";
import useIntersectionObserver from "./useIntersectionObserver";
import "./styles.css";

type P = {
  isIntersected: boolean;
};
const Item: React.FC = () => {
  const [isIntersected, setIsIntersected] = React.useState<boolean>(false);
  const el = React.useRef() as React.RefObject<HTMLDivElement>;
  const onEnter = React.useCallback(() => {
    setIsIntersected(true);
  }, [setIsIntersected]);
  useIntersectionObserver<HTMLDivElement>({ el, onEnter });

  return (
    <div ref={el} className={`item ${isIntersected ? "active" : ""}`}>
      Observe me
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      {Array.from({ length: 9 }).map((_, i) => (
        <Item key={i} />
      ))}
    </div>
  );
}
