interface IFunc {
  [key: string]: (result: number) => string
}

interface IDom {
  init(): void;
  getHTML(): void;
  start(): void;
}

interface IQuiz {
  handleNextButton(button: Node): void;
  handleAnswers(answer: Node): void;
  nextWrapper(button: Node): void;
  finishQuiz(key: string | null): void;
  share(): void;
}
