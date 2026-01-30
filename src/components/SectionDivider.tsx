import React from "react";

interface SectionDividerProps {
  position?: "top" | "bottom";
  color?: string;
  height?: string;
  className?: string;
  flip?: boolean;
}

/**
 * A standard Wave Divider that creates a smooth organic transition.
 * The SVG path is designed to fill the BOTTOM of the container.
 * 
 * Logic:
 * - position="bottom": No rotation. Fills the bottom of the container with the wave shape on top.
 *   This connects to the section BELOW (assuming color matches section below).
 * - position="top": Rotated 180deg. Fills the top of the container with the wave shape on bottom.
 *   This connects to the section ABOVE (assuming color matches section above).
 */
export const OrganicDivider: React.FC<SectionDividerProps> = ({
  position = "bottom",
  color = "text-white dark:text-gray-900",
  height = "h-16 md:h-24",
  className = "",
  flip = false,
}) => {
  const positionClasses = position === "bottom" 
    ? "bottom-[-1px] left-0" 
    : "top-[-1px] left-0 transform rotate-180";

  return (
    <div 
      className={`absolute w-full overflow-hidden leading-none z-20 ${positionClasses} ${height} ${className} pointer-events-none`}
    >
      <svg
        className={`relative block w-[calc(100%+1.3px)] h-full ${color} ${flip ? "transform scale-x-[-1]" : ""}`}
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,58.7L1200,64V120H0Z"
          className="fill-current"
        ></path>
      </svg>
    </div>
  );
};

export const CurveDivider: React.FC<SectionDividerProps> = ({
  position = "bottom",
  color = "text-white dark:text-gray-900",
  height = "h-16 md:h-24",
  className = "",
  flip = false,
}) => {
  const positionClasses = position === "bottom" 
    ? "bottom-[-1px] left-0" 
    : "top-[-1px] left-0 transform rotate-180";

  return (
    <div 
      className={`absolute w-full overflow-hidden leading-none z-20 ${positionClasses} ${height} ${className} pointer-events-none`}
    >
      <svg
        className={`relative block w-[calc(100%+1.3px)] h-full ${color} ${flip ? "transform scale-x-[-1]" : ""}`}
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="fill-current"
        ></path>
      </svg>
    </div>
  );
};
