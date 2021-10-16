import {
  IStockQuestion,
  IStock,
  IStockProceeds,
} from "typings/stock-questions";
import clsx from "clsx";
import styles from "./stock-selections.module.scss";
import { floatToPercentage, formatAsUSD } from "utils/stock-questions";

interface IProceedsProps {
  proceeds: IStockProceeds;
}

const Proceeds = ({ proceeds }: IProceedsProps) => (
  <div className={styles.proceeds}>
    <strong>{floatToPercentage(proceeds.probability)}</strong> chance of{" "}
    <strong>{formatAsUSD(proceeds.proceeds)}</strong> cash proceeds
  </div>
);

interface IStockProps {
  stock: IStock;
  title: string;
  isSelected: boolean;
  onSelect: () => void;
}

function Stock({ stock, title, isSelected, onSelect }: IStockProps) {
  return (
    <div
      className={clsx(styles.stockBox, {
        [styles.isSelected]: isSelected,
      })}
      onClick={onSelect}
    >
      <h4>{title}</h4>

      <div>
        <Proceeds proceeds={stock[0]} />
      </div>

      <div className={styles.proceedsDivider}>and</div>

      <div>
        <Proceeds proceeds={stock[1]} />
      </div>
    </div>
  );
}

interface IStockQuestionBoxProps {
  title: string;
  stockQuestion: IStockQuestion;
  selectedIndex: number;
  setSelectedIndex: (v: number) => void;
}

export default function StockQuestionBox({
  title,
  stockQuestion,
  selectedIndex,
  setSelectedIndex,
}: IStockQuestionBoxProps) {
  return (
    <div className={styles.stockQuestionBox}>
      <h3>{title}</h3>

      <Stock
        stock={stockQuestion.thisStock}
        title="This Stock"
        isSelected={selectedIndex === 0}
        onSelect={() => setSelectedIndex(0)}
      />

      <div className={styles.stockDivider}>or</div>

      <Stock
        stock={stockQuestion.thatStock}
        title="That Stock"
        isSelected={selectedIndex === 1}
        onSelect={() => setSelectedIndex(1)}
      />
    </div>
  );
}
