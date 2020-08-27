import { RefObject, useEffect } from "react";

type P<T> = {
  el: RefObject<T>;
  onEnter: () => void;
  active?: boolean;
  options?: {
    root?: Element | null;
    threshold?: number | number[];
    rootMargin?: string;
  };
};

const defaultObserverOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: "0px"
};

export default function useIntersectionObserver<T extends Element>({
  el,
  onEnter,
  active = true,
  options = defaultObserverOptions
}: P<T>) {
  useEffect(() => {
    let observer: IntersectionObserver;
    const refEl = el.current;
    if (IntersectionObserver && active && refEl) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.isIntersecting && onEnter());
      }, options);

      observer.observe(refEl);
    }

    return () => {
      observer?.unobserve(refEl);
    };
  }, [el, onEnter, active, options]);
}
