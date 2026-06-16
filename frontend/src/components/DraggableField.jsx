import { useDraggable } from "@dnd-kit/core";

const DraggableField = ({
  id,
  label,
  image,
  x,
  y,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id,
  });

  const style = {
    position: "absolute",
    left: x,
    top: y,
    zIndex: 1000,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="cursor-move select-none"
    >
      {image ? (
      <img
  src={image}
  alt="signature"
  className="w-40 border bg-white p-1 rounded"
/>
      ) : (
        <div className="bg-green-600 text-white px-3 py-2 rounded shadow">
          {label}
        </div>
      )}
    </div>
  );
};

export default DraggableField;