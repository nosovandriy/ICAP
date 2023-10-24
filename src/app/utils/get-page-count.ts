export const extractPage = (url: string) => {
  const parts = url.split('offset=');
  if (parts.length > 1) {
    const pageValue = parts[1];
    return pageValue;
  }
};
