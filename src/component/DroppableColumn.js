import { useDroppable } from "@dnd-kit/core";

function DroppableColumn({ id, children, className }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={className}>
      {children}
    </div>
  );
}

export default DroppableColumn;
