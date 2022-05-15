import { useRef, useMemo } from "react";

import { getItemsType } from "./dnd/dnd.utils";

import { Item as IItem } from "./App.types";
import { useSotable } from "./dnd/dnd.hooks";

type Props = {
  item: IItem;
  groupIndex: number;
  index: number;
  moveItem: (fromIndex: number, toIndex: number) => void;
};

export const Item = ({ item, index, groupIndex, moveItem }: Props) => {
  const ref = useRef<HTMLParagraphElement>(null);

  const dndType = useMemo(() => getItemsType(groupIndex), [groupIndex]);

  const sortableProps = useSotable({
    hoverIndex: index,
    moveItem,
    ref,
    type: dndType,
  });

  return <p {...sortableProps}>{item.name}</p>;
};
