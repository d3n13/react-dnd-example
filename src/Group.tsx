import { ComponentProps, useCallback } from "react";
import { Item } from "./Item";
import { GroupControls } from "./GroupControls";
import { Group as IGroup, Item as IItem } from "./App.types";

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
  moveItem,
  ...groupProps
}: Props) => {
  const renderItem = (item: IItem) => <Item key={item.name} item={item} />;

  const moveUp = useCallback(
    () => moveGroup(index, index - 1),
    [index, moveGroup]
  );

  const moveDown = useCallback(
    () => moveGroup(index, index + 1),
    [index, moveGroup]
  );

  return (
    <>
      <h2>
        <GroupControls moveUp={moveUp} moveDown={moveDown} {...groupProps} />
        {group.name}
      </h2>
      {group.items.map(renderItem)}
    </>
  );
};
