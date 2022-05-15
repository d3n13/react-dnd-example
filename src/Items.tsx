import { Item } from "./Item";
import { Item as IItem } from "./App.types";
import { ComponentProps } from "react";

type Props = {
  items: IItem[];
} & Pick<ComponentProps<typeof Item>, "moveItem" | "groupIndex">;

export const Items = ({ items, ...itemProps }: Props) => {
  const renderItem = (item: IItem, index: number) => (
    <Item key={item.name} item={item} index={index} {...itemProps} />
  );

  return <>{items.map(renderItem)}</>;
};
