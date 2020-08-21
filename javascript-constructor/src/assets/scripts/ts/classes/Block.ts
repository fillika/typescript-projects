import { col, row } from '../utils/utils';

class Block implements IModel {
  readonly value: string | string[];
  readonly options: TOptions;

  constructor(type: string, value: string | string[], options: TOptions) {
    this.value = value;
    this.options = options;
  }

  toHTML(): never | string {
    throw new Error('Метод toHTML не реализован');
  }
}

export class TitleBlock extends Block {
  constructor(value: string | string[], options: TOptions) {
    super('title', value, options);
  }

  toHTML(): string {
    const { styles, tag } = this.options;
    let str = '';

    if (typeof this.value === 'string') {
      str = col(`<${ tag }>${ this.value }</${ tag }>`);
    }

    return row(str, styles);
  }
}

export class TextBlock extends Block {
  constructor(value: string | string[], options: TOptions) {
    super('text', value, options);
  }

  toHTML(): string {
    const { styles, tag } = this.options;
    let str = '';

    if (typeof this.value === 'string') {
      str = col(`<${ tag }>${ this.value }</${ tag }>`);
    }

    return row(str, styles);
  }
}

export class TextColumsBlock extends Block {
  constructor(value: string | string[], options: TOptions) {
    super('text', value, options);
  }

  toHTML(): string {
    const { styles, tag } = this.options;
    let str = '';

    if (Array.isArray(this.value)) {
      str = this.value.map((text: string) => col(`<${ tag }>${ text }</${ tag }>`)).join('');
    }

    return row(str, styles);
  }
}

export class ImageBlock extends Block {
  constructor(value: string | string[], options: TOptions) {
    super('image', value, options);
  }

  toHTML(): string {
    const { alt, styles, tag } = this.options;
    let str = '';

    if (typeof this.value === 'string') {
      str = col(`<${ tag } src='${ this.value }' alt='${ alt }'/>`);
    }

    return row(str, styles);
  }
}
