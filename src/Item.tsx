import { Item as IItem } from "./App.types";

type Props = {
  item: IItem;
};

export const Item = ({ item }: Props) => {
  return <p>{item.name}</p>;
};
