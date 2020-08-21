export function row(content: string, styles: string = ''): string {
  return `<div style='${ styles }' class='row'>${ content }</div> `;
}

export function col(content: string): string {
  return `<div class='col-sm'>${ content }</div> `;
}
