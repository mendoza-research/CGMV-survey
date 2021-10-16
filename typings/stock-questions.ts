export interface IStockProceeds {
  probability: number;
  proceeds: number;
}

export type IStock = Array<IStockProceeds>;

export interface IStockQuestion {
  thisStock: IStock;
  thatStock: IStock;
}
