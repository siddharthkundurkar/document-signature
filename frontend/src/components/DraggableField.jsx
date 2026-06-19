import { useDraggable } from "@dnd-kit/core";

const DraggableField = ({
  id,
  label,
  image,
  value,
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
          className="w-40 border bg-white p-1 rounded shadow"
        />
      ) : (
        <div className="bg-white border shadow px-4 py-2 rounded min-w-[120px]">
          <span className="text-black font-medium">
            {value || label}
          </span>
        </div>
      )}
    </div>
  );
};

export default DraggableField;