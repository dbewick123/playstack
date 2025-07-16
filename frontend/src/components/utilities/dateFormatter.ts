const localDateFormatter = (dateInput: Date | string) => {
  const userLocale = navigator.language;

  if (!dateInput) return "tbc";

  try {
    const date = new Date(dateInput);
    return new Intl.DateTimeFormat(userLocale, { dateStyle: "medium" }).format(
      date
    );
  } catch {
    // Fallback to a safe default
    return String(dateInput);
  }
};

export default localDateFormatter;
