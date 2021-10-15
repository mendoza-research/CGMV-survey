import { IStockQuestion } from "utils/stock-questions";

interface IStockQuestionBoxProps {
  title: string;
  questionData: IStockQuestion;
  isSelected: boolean;
  onClick: () => {};
}

export default function StockQuestionBox({
  title,
  questionData,
  isSelected,
  onClick,
}: IStockQuestionBoxProps) {
  return (
    <div>
      <h3>{title}</h3>
    </div>
  );
}
