interface IModel {
  type: string,
  value: string | string[],
  options: {
    tag: string,
    styles: string,
    alt?: string
  },
}

interface IFunc {
  [key: string]: (block: IModel) => string
}
