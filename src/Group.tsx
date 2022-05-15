import { ComponentProps, useCallback } from "react";
import { GroupControls } from "./GroupControls";
import { Group as IGroup } from "./App.types";
import { Items } from "./Items";

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
    <>
      <h2>
        <GroupControls moveUp={moveUp} moveDown={moveDown} {...groupProps} />
        {group.name}
      </h2>
      <Items items={group.items} groupIndex={index} moveItem={moveItem} />
    </>
  );
};
