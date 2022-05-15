import { useRef, useMemo, useCallback } from "react";
import {
  DragSourceMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from "react-dnd";
import type { Identifier } from "dnd-core";

import {
  DragItem,
  getItemsType,
  processSortableHoverAndMutateItem,
} from "./dnd/dnd.utils";

import { Item as IItem } from "./App.types";

type Props = {
  item: IItem;
  groupIndex: number;
  index: number;
  moveItem: (fromIndex: number, toIndex: number) => void;
};

export const Item = ({ item, index, groupIndex, moveItem }: Props) => {
  const ref = useRef<HTMLParagraphElement>(null);

  const dndType = useMemo(() => getItemsType(groupIndex), [groupIndex]);

  const hoverDrop = useCallback(
    (item: DragItem, monitor: DropTargetMonitor<DragItem, void>) =>
      processSortableHoverAndMutateItem({
        hoverIndex: index,
        monitor,
        item,
        ref,
        moveItem,
      }),
    [index, moveItem]
  );

  const collectDrop = useCallback(
    (monitor: DropTargetMonitor<DragItem, void>) => ({
      handlerId: monitor.getHandlerId(),
    }),
    []
  );

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: dndType,
    collect: collectDrop,
    hover: hoverDrop,
  });

  const [{ isDragging }, drag] = useDrag({
    type: dndType,
    collect: (monitor: DragSourceMonitor<void, unknown>) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <p
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      {item.name}
    </p>
  );
};
