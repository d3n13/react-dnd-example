type Props = {
  moveDownDisabled: boolean;
  moveUpDisabled: boolean;
  moveDown: () => void;
  moveUp: () => void;
};

export const GroupControls = ({
  moveDownDisabled,
  moveUpDisabled,
  moveDown,
  moveUp,
}: Props) => (
  <>
    <button disabled={moveUpDisabled} onClick={moveUp} title="Move up">
      ↑
    </button>
    <button disabled={moveDownDisabled} onClick={moveDown} title="Move down">
      ↓
    </button>
  </>
);
