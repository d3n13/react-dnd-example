import { MutableRefObject } from "react";
import { DropTargetMonitor } from "react-dnd";
import { DNDType } from "./dnd.constants";
import type { Identifier, XYCoord } from "dnd-core";

export function getItemsType(groupIndex: number) {
  return DNDType.Item + groupIndex;
}

export type DragItem = {
  index: number;
  type: string;
};

type ProcessHoverOptions<T extends HTMLElement> = {
  ref: MutableRefObject<T | null>;
  hoverIndex: number;
  item: DragItem;
  monitor: DropTargetMonitor<DragItem, void>;
  moveItem: (fromIndex: number, toIndex: number) => void;
};

export function processSortableHoverAndMutateItem<T extends HTMLElement>({
  ref,
  hoverIndex,
  item,
  monitor,
  moveItem,
}: ProcessHoverOptions<T>) {
  if (!ref.current) {
    return;
  }
  const dragIndex = item.index;

  const isInSamePlace = dragIndex === hoverIndex;
  if (isInSamePlace) {
    return;
  }

  const hoverBoundingRect = ref.current.getBoundingClientRect();

  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

  const mousePosition = monitor.getClientOffset();

  if (!mousePosition) {
    return;
  }

  const pixelsToTop = mousePosition.y - hoverBoundingRect.top;

  const isDraggingDown = dragIndex < hoverIndex;
  const isNotBelowHalf = pixelsToTop < hoverMiddleY;
  if (isDraggingDown && isNotBelowHalf) {
    return;
  }

  const isDraggingUp = dragIndex > hoverIndex;
  const isNotAboveHalf = pixelsToTop > hoverMiddleY;
  if (isDraggingUp && isNotAboveHalf) {
    return;
  }

  moveItem(dragIndex, hoverIndex);

  // Note: we're mutating the monitor item here!
  // Generally it's better to avoid mutations,
  // but it's good here for the sake of performance
  // to avoid expensive index searches.
  item.index = hoverIndex;
}
