export const capAll = (string) => {
  console.log(string);
  return string
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
};
