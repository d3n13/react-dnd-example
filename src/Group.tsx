import { ComponentProps, useCallback, useRef } from "react";
import { GroupControls } from "./GroupControls";
import { Group as IGroup } from "./App.types";
import { Items } from "./Items";
import { DNDType } from "./dnd/dnd.constants";

import { useSotable } from "./dnd/dnd.hooks";

type Props = {
  group: IGroup;
  index: number;
  moveGroup: (index: number, toIndex: number) => void;
  moveItem: (groupIndex: number, index: number, toIndex: number) => void;
} & Pick<
  ComponentProps<typeof GroupControls>,
  "moveDownDisabled" | "moveUpDisabled"
>;

export const Group = ({
  group,
  index,
  moveGroup,
  moveItem: _moveItem,
  ...groupProps
}: Props) => {
  const ref = useRef<HTMLParagraphElement>(null);

  const sortableProps = useSotable({
    hoverIndex: index,
    moveItem: moveGroup,
    ref,
    type: DNDType.Group,
  });

  const moveUp = useCallback(
    () => moveGroup(index, index - 1),
    [index, moveGroup]
  );

  const moveDown = useCallback(
    () => moveGroup(index, index + 1),
    [index, moveGroup]
  );

  const moveItem: ComponentProps<typeof Items>["moveItem"] = useCallback(
    (fromIndex, toIndex) => _moveItem(index, fromIndex, toIndex),
    [_moveItem, index]
  );

  return (
    <div {...sortableProps}>
      <h2>
        <GroupControls moveUp={moveUp} moveDown={moveDown} {...groupProps} />
        {group.name}
      </h2>
      <Items items={group.items} groupIndex={index} moveItem={moveItem} />
    </div>
  );
};
