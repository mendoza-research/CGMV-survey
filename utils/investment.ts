export function formatAsCurrency(amount: number, showCurrency: boolean = true) {
  let numberFormatOption = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    style: "decimal",
  };

  if (showCurrency) {
    numberFormatOption = Object.assign({}, numberFormatOption, {
      currency: "USD",
      style: "currency",
    });
  }

  let formattedStr = amount.toLocaleString("en-US", numberFormatOption);

  return formattedStr;
}
