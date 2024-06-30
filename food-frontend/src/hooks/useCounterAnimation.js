import { useEffect, useRef, useState } from "react";

const useCounterAnimation = (target, duration = 2500) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const activated = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!counterRef.current) return;
      const container = counterRef.current;
      const offsetTop = container.offsetTop;
      const offsetHeight = container.offsetHeight;

      if (
        window.scrollY > offsetTop - offsetHeight - 600 &&
        !activated.current
      ) {
        const increment = target / (duration / 15); // Calculate increment step

        let count = 0;
        const updateCount = () => {
          if (!isNaN(target)) {
            if (count < target) {
              count += increment;
              setCount(Math.ceil(count));
              setTimeout(updateCount, 15);
            } else {
              setCount(target);
            }
          } else {
            console.error(
              "Invalid target count for counter:",
              counterRef.current
            );
          }
        };

        updateCount();
        activated.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [target, duration]);

  return { count, counterRef };
};

export default useCounterAnimation;
