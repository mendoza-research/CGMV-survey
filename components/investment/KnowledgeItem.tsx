import clsx from "clsx";
import styles from "./KnowledgeItem.module.scss";

interface IKnowledgeItemProps {
  isOpen: boolean;
  onToggle: () => void;
  title: string;
  explanation: React.ReactNode;
}

export default function KnowledgeItem({
  isOpen,
  onToggle,
  title,
  explanation,
}: IKnowledgeItemProps) {
  return (
    <div
      className={clsx(styles.knowledgeItem, {
        [styles.isOpen]: isOpen,
        [styles.isCollapsed]: !isOpen,
      })}
    >
      <h2 onClick={onToggle}>{title}</h2>

      {isOpen && <div>{explanation}</div>}
    </div>
  );
}
