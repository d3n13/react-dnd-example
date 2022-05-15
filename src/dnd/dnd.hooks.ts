import { MutableRefObject, useCallback } from "react";
import {
  DragSourceMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from "react-dnd";
import { DragItem, processSortableHoverAndMutateItem } from "./dnd.utils";

import type { Identifier } from "dnd-core";

type UseSotableOptions<T extends HTMLElement> = {
  ref: MutableRefObject<T | null>;
  type: Identifier;
  hoverIndex: number;
  moveItem: (fromIndex: number, toIndex: number) => void;
};
export function useSotable<T extends HTMLElement>({
  ref,
  type,
  hoverIndex,
  moveItem,
}: UseSotableOptions<T>) {
  const dndType = type;

  const hoverDrop = useCallback(
    (item: DragItem, monitor: DropTargetMonitor<DragItem, void>) =>
      processSortableHoverAndMutateItem({
        hoverIndex,
        monitor,
        item,
        ref,
        moveItem,
      }),
    [hoverIndex, moveItem]
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

  const sortablePropss = {
    "data-handler-id": handlerId,
    style: {
      opacity: isDragging ? 0 : 1,
    },
    ref,
  };

  drag(drop(ref));

  return sortablePropss;
}
