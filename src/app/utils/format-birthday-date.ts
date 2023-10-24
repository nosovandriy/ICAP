export const convertDateFormat = (inputDate: string) => {
  const dateParts = inputDate.split('-');

  if (dateParts.length === 3) {
    const day = dateParts[0];
    const month = dateParts[1];
    let year = parseInt(dateParts[2]);

    let newYearFormat = '';

    if (year >= 0 && year <= 23) {
      newYearFormat = `20${dateParts[2]}`;
    } else {
      newYearFormat = `19${dateParts[2]}`;
    }

    const outputDate = `${newYearFormat}-${month}-${day}`;
    return outputDate;
  }
};
