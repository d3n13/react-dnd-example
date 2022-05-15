import { useState, useCallback } from "react";
import { Group } from "./Group";
import { moveArrayItemImmutable } from "./utils/moveArrayItem";
import { isMoveDownImpossible, isMoveUpImpossible } from "./App.utils";
import { Group as IGroup } from "./App.types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const initialGroups: IGroup[] = [
  {
    name: "Group 1",
    items: [
      {
        name: "Group 1: Item 1",
      },
      {
        name: "Group 1: Item 2",
      },
      {
        name: "Group 1: Item 3",
      },
    ],
  },
  {
    name: "Group 2",
    items: [
      {
        name: "Group 2: Item 1",
      },
      {
        name: "Group 2: Item 2",
      },
      {
        name: "Group 2: Item 3",
      },
      {
        name: "Group 2: Item 4",
      },
    ],
  },
  {
    name: "Group 3",
    items: [
      {
        name: "Group 3: Item 1",
      },
      {
        name: "Group 3: Item 2",
      },
    ],
  },
];

export function Groups() {
  const [groups, setGroups] = useState<IGroup[]>(initialGroups);

  const moveGroup = useCallback((index: number, toIndex: number) => {
    setGroups((old) => moveArrayItemImmutable(old, index, toIndex));
  }, []);

  const moveItem = useCallback(
    (groupIndex: number, index: number, toIndex: number) => {
      setGroups((old) =>
        old.map((oldGroup, oldGroupIndex) =>
          oldGroupIndex === groupIndex
            ? {
                ...oldGroup,
                items: moveArrayItemImmutable(oldGroup.items, index, toIndex),
              }
            : oldGroup
        )
      );
    },
    []
  );

  const renderGroup = (group: IGroup, index: number) => (
    <Group
      key={group.name}
      group={group}
      index={index}
      moveGroup={moveGroup}
      moveItem={moveItem}
      moveDownDisabled={isMoveDownImpossible(groups, index)}
      moveUpDisabled={isMoveUpImpossible(index)}
    />
  );

  return (
    <DndProvider backend={HTML5Backend}>{groups.map(renderGroup)}</DndProvider>
  );
}
