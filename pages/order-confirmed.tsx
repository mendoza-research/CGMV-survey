import usePageNavigation from "hooks/usePageNavigation";
import TextBox from "components/investment/TextBox";
import { AnimationEnum } from "typings/animation";
import { useState } from "react";
import KnowledgeItem from "components/investment/KnowledgeItem";
import { RECORD_KNOWLEDGE_ITEM_CLICKS_QUERY } from "utils/gql-queries";
import { useMutation } from "@apollo/client";
import useSurveyStore from "stores/useSurveyStore";

interface IKnowledgeItem {
  fieldName: string; // database field name
  title: string;
  explanation: React.ReactNode;
}

interface IItemStatus {
  isClicked: boolean;
  isOpen: boolean;
}

interface IItemsStatusMap {
  [fieldName: string]: IItemStatus;
}

let knowledgeItems: IKnowledgeItem[] = [
  {
    fieldName: "click_debt_ratio",
    title: "What is a Debt Ratio?",
    explanation: (
      <p>
        Debt ratio measures a company's debt compared to its total assets. A
        company's debt ratio indicates how much debt it's using to fund
        purchases of assets and can be expressed as either a decimal or
        percentage. The higher the debt ratio, the more the company is relying
        on borrowing to finance assets. The lower the debt ratio, the greater
        the percentage of the assets the company actually owns.
      </p>
    ),
  },
  {
    fieldName: "click_EPS",
    title: "What is Earnings per Share?",
    explanation: (
      <p>
        Earnings per share (EPS) is just one of many tools investors have in
        their toolbox to analyze the health of a business and estimate its
        overall value. EPS is the total net profit divided by the total number
        of shares people own in that company. EPS shows how much money a company
        has earned for every share of stock. It helps indicate how profitable
        that company's shares are compared to others -- the higher the EPS, the
        higher the profitability.
      </p>
    ),
  },
  {
    fieldName: "click_fiscal_year",
    title: "What is a Fiscal Year?",
    explanation: (
      <p>
        Every business has a fiscal year or financial year. A fiscal year is a
        company's annual financial or accounting reporting period. Sometimes it
        fits perfectly on the Jan - Dec calendar hanging on your kitchen wall,
        other times it straddles two calendar years. A fiscal year starting on
        July 1, 2018, and ending on June 30, 2019, refers to the fiscal year
        2019, or FY 2019. The federal government's fiscal year goes from October
        1 through September 30. Fiscal year-end is the end of a fiscal year.
      </p>
    ),
  },
  {
    fieldName: "click_gross_margin",
    title: "What is Gross Margin?",
    explanation: (
      <p>
        Gross margin sounds way more technical than it actually is — It's simply
        the difference between a company's revenue from sales and its costs.
        Companies can use gross margin to decide whether a product is worth
        selling, as well as how much to budget toward making it.
      </p>
    ),
  },
  {
    fieldName: "click_market_cap",
    title: "What is Market Capitalization?",
    explanation: (
      <p>
        Market capitalization (aka "market cap") is one way to measure the size
        of a company by multiplying its total number of shares by its stock
        price. Market capitalization shows the dollar value of a company's
        outstanding shares. To get this number, you multiply the company's total
        number of shares by the price of each share. As the price of the stock
        changes (or the number of shares outstanding changes), so will the
        company's market cap. Companies can be sorted into three market cap
        categories: "small cap" ( $300M–$2B), "mid cap" ($2B–$10B), and "large
        cap" ($10B+).
      </p>
    ),
  },
  {
    fieldName: "click_net_income",
    title: "What is Net Income?",
    explanation: (
      <p>
        Net income is a type of profit. Also known as net profit or net
        earnings, you can calculate it by subtracting all of a company's
        expenses from all of its revenues. It's the ultimate measure of how a
        company is doing financially. Net income can help investors understand
        whether a company has funds to reinvest, cover upcoming debts, or pay
        dividends to stockholders.
      </p>
    ),
  },
  {
    fieldName: "click_PE_ratio",
    title: "What is a Price Earnings (P/E) Ratio?",
    explanation: (
      <>
        <p>
          A company's stock price is driven by its ability to generate profits.
          The P/E (Price/Earnings) ratio compares those two things directly. P/E
          ratios give investors a measure of how "expensive" a stock is for each
          dollar of profitability; the higher the ratio, the more expensive.
          Because the P/E ratio controls for the number of shares (which can
          vary greatly from one company to another), the P/E ratio of one
          company can be compared directly to the P/E ratio of another. You can
          also compare the P/E ratio of a company to the average for that
          industry to get a sense for its relative expense. Greater than
          industry = more expensive than most stocks in the industry, and vice
          versa.
        </p>
        <h3>Neat, so how do I calculate a P/E ratio?</h3>
        <p>
          The P/E ratio comes from simple division:
          <br />
          <img src="/images/PE_ratio.png" alt="Price Earnings Ratio" />
        </p>
      </>
    ),
  },
  {
    fieldName: "click_stock_split",
    title: "What is a Stock Split?",
    explanation: (
      <p>
        Stock splits (and reverse stock splits) are often about psychology.
        Their purpose is to make an individual stock cheaper (or more expensive)
        by adjusting the number of shares available. On paper, a Stock Split
        doesn't affect the company's overall value.
      </p>
    ),
  },
];

export default function OrderConfirmedPage() {
  const sessionId = useSurveyStore((state) => state.sessionId);
  const { toNext } = usePageNavigation({
    nextPathname: "/platform-questions",
  });

  const [recordKnowledgeItemClicks] = useMutation(
    RECORD_KNOWLEDGE_ITEM_CLICKS_QUERY
  );

  const itemsStatusInitialMap: IItemsStatusMap = {};
  knowledgeItems.forEach((item) => {
    itemsStatusInitialMap[item.fieldName] = {
      isClicked: false,
      isOpen: false,
    };
  });

  const [itemsStatusMap, setItemsStatusMap] = useState<IItemsStatusMap>(
    itemsStatusInitialMap
  );

  const onItemToggle = (fieldName: string) => {
    setItemsStatusMap(
      Object.assign({}, itemsStatusMap, {
        [fieldName]: {
          isClicked: true,
          isOpen: !itemsStatusMap[fieldName].isOpen,
        },
      })
    );
  };

  const onNextButtonClick = async () => {
    await recordKnowledgeItemClicks({
      variables: {
        session_id: sessionId,
        click_EPS: itemsStatusMap["click_EPS"].isClicked,
        click_PE_ratio: itemsStatusMap["click_PE_ratio"].isClicked,
        click_debt_ratio: itemsStatusMap["click_debt_ratio"].isClicked,
        click_fiscal_year: itemsStatusMap["click_fiscal_year"].isClicked,
        click_market_cap: itemsStatusMap["click_market_cap"].isClicked,
        click_gross_margin: itemsStatusMap["click_gross_margin"].isClicked,
        click_net_income: itemsStatusMap["click_net_income"].isClicked,
        click_stock_split: itemsStatusMap["click_stock_split"].isClicked,
      },
    });

    toNext();
  };

  return (
    <TextBox
      toNext={onNextButtonClick}
      animation={AnimationEnum.RISING_BALLOONS}
    >
      <p
        style={{
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Interested in expanding your investment knowledge? Select any of the
        options below to learn more. (Selecting options is not required, simply
        click "Next" when you are ready to continue.){" "}
      </p>

      {knowledgeItems.map((item) => (
        <KnowledgeItem
          key={item.fieldName}
          isOpen={itemsStatusMap[item.fieldName].isOpen}
          onToggle={() => {
            onItemToggle(item.fieldName);
          }}
          title={item.title}
          explanation={item.explanation}
        />
      ))}
    </TextBox>
  );
}
