"use client";
import { useDroppable } from "@dnd-kit/core";

export default function DesignArea({
  id,
  children,
  onClick,
  canvasSize,
  selectedBackground,
  canvasScale = 1,
  ...rest
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  const getBackgroundStyle = () => {
    if (!selectedBackground) return { backgroundColor: "#ffffff" };

    const style = {};

    if (selectedBackground.type === "color") {
      style.backgroundColor = selectedBackground.value;
    } else if (selectedBackground.type === "gradient") {
      style.background = selectedBackground.value;
    } else if (
      selectedBackground.type === "pattern" ||
      selectedBackground.type === "custom"
    ) {
      const bgValue = selectedBackground.value;
      style.backgroundImage = bgValue?.startsWith("url")
        ? bgValue
        : `url(${bgValue})`;
      style.backgroundSize = selectedBackground.backgroundSize || "cover";
      style.backgroundPosition = "center";
      style.backgroundRepeat = "no-repeat";
      style.backgroundColor = "transparent";
    }

    return style;
  };

  return (
    // ✅ WRAPPER = kích thước visual sau scale, overflow hidden clip phần DOM thừa
    <div
      style={{
        width: `${canvasSize.width * canvasScale}px`,
        height: `${canvasSize.height * canvasScale}px`,
        position: "relative",
        margin: "0 auto",
        boxSizing: "border-box",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* 🔹 CANVAS GỐC – kích thước logic giữ nguyên, scale từ top-left để visual khớp wrapper */}
      <div
        ref={setNodeRef}
        onClick={onClick}
        className={`lego-canvas ${isOver ? "is-over" : ""}`}
        style={{
          width: `${canvasSize.width}px`,
          height: `${canvasSize.height}px`,
          transform: `scale(${canvasScale})`,
          transformOrigin: "top left",
          ...getBackgroundStyle(),
        }}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
}