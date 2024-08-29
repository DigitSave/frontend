"use client";
import { ReactNode, useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

/**
 * Component for animating a box with various fade animations.
 *
 * @param children - The content to be rendered inside the box.
 * @param className - Additional CSS classes to apply to the box.
 * @param animationType - The type of fade animation to apply to the box.
 * @param delay - Whether to add a delay to the animation.
 * @param title - The title attribute for the box.
 * @returns The animated box component.
 */
export default function MotionBox({
  children,
  ...props
}: {
  children: ReactNode;
  className?: any;
  animationType?: "fadeIn" | "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight";
  delay?: boolean;
  title?: string;
  onClick?: (e?: any) => void;
}) {
  // Create animation control
  const control = useAnimation();
  // Check if the component is in view
  const [ref, inView] = useInView();
  // Define the values for each fade animation type
  const variantValue = {
    fadeIn: { x: 0, y: 1.4, scale: 0.9 },
    fadeUp: { x: 0, y: 100, scale: 1 },
    fadeDown: { x: 0, y: -100, scale: 1 },
    fadeLeft: { x: 100, y: 0, scale: 1 },
    fadeRight: { x: -100, y: 0, scale: 1 },
  };
  // Memoize the box variant based on animation type and delay
  const boxVariant = useMemo(() => {
    return {
      hidden: {
        ...variantValue[props.animationType || "fadeIn"],
        opacity: 0,
        transition: { duration: 0.7 },
        scale: 1,
      },
      visible: {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, delay: props.delay ? 0.5 : 0 },
      },
    };
  }, []);
  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);
  return (
    <motion.div
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
      className={props.className}
      title={props.title}
      onClick={props.onClick}
    >
      {children}
    </motion.div>
  );
}
