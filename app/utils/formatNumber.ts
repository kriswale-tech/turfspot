const formatNumber = (number: string) => {
  // Convert to international format (Ghana = 233)
  let formatted = number.trim();
  if (formatted.startsWith("0")) {
    formatted = "233" + formatted.substring(1);
  } else {
    formatted = "233" + formatted;
  }

  return formatted;
};

export default formatNumber;
