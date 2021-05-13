import clsx from "clsx";
import styles from "./KnowledgeItem.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { VscTriangleDown, VscTriangleRight } from "react-icons/vsc";

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
      <h2 onClick={onToggle}>
        <span className={styles.arrow}>
          {isOpen ? (
            <VscTriangleDown className={styles.reactIcon} />
          ) : (
            <VscTriangleRight className={styles.reactIcon} />
          )}
        </span>
        {title}
      </h2>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            {explanation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
