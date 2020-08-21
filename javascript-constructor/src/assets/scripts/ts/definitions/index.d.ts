interface IModel {
  readonly value: string | string[];
  readonly options: TOptions;

  toHTML(): string | never
}

type TOptions = { [key: string]: string }

interface IFunc {
  [key: string]: (block: IModel) => string
}
