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

  // Don't replace items with themselves
  if (dragIndex === hoverIndex) {
    return;
  }

  // Determine rectangle on screen
  const hoverBoundingRect = ref.current?.getBoundingClientRect();
  if (!hoverBoundingRect) {
    return;
  }

  // Get vertical middle
  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

  // Determine mouse position
  const clientOffset = monitor.getClientOffset();

  // Get pixels to the top
  const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

  // Only perform the move when the mouse has crossed half of the items height
  // When dragging downwards, only move when the cursor is below 50%
  // When dragging upwards, only move when the cursor is above 50%

  // Dragging downwards
  if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    return;
  }

  // Dragging upwards
  if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    return;
  }

  // Time to actually perform the action
  moveItem(dragIndex, hoverIndex);

  // Note: we're mutating the monitor item here!
  // Generally it's better to avoid mutations,
  // but it's good here for the sake of performance
  // to avoid expensive index searches.
  item.index = hoverIndex;
}
