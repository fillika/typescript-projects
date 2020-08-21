import img from '@img/image.png';

const model: IModel[] = [
  {
    type: 'title',
    value: 'Test title',
    options: {
      tag: 'H2',
      styles: 'background-color: darkkhaki; color: #ccc;',
    },
  },
  {
    type: 'text',
    value: 'Lorem ipsum dolorem',
    options: {
      tag: 'p',
      styles: 'color: blue;',
    },
  },
  {
    type: 'textColums',
    value: [
      'Lorem ipsum dolorem',
      'Lorem ipsum dadada 2',
      'Lorem ipsum nonono 3',
    ],
    options: {
      tag: 'p',
      styles: 'color: red;',
    },
  },

  {
    type: 'image',
    value: img,
    options: {
      tag: 'img',
      styles: 'max-width: 100%',
      alt: 'Просто картинка'
    },
  },
];

export default model;
