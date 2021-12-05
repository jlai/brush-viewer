
export function getImageFileName(pattern: string, exportName: string, num: number, maxNum: number) {
  const maxDigits = maxNum.toString().length;

  const formatBrushNum = (_match: string, countStr: string) => {
    let count = countStr === '' ? maxDigits : parseInt(countStr, 10);

    return num.toString(10).padStart(count, '0');
  };

  return pattern
    .replace(/%f/g, exportName)
    .replace(/%([0-9]?)n/g, formatBrushNum)
    .replace(/%%/g, '%') + '.png';
}

export function validatePattern(pattern: string) {
  if (!/%([0-9]?)n/.test(pattern)) {
    return { ok: false, message: 'pattern must contain %n pattern' };
  }

  if (/\.(png|jpg|zip)$/.test(pattern)) {
    return { ok: false, message: 'pattern should not contain file extension' };
  }

  return { ok: true };
}
