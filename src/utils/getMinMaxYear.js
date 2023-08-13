export function getAllYearList(movies) {
  return movies.reduce(
    (acc, { year }) => (acc.includes(year) ? acc : [year, ...acc]),
    []
  );
}

export function getMinMaxYear(movies) {
  let yearList = getAllYearList(movies);
  let minYear = Math.min(...yearList);
  let maxYear = Math.max(...yearList);
  return [minYear, maxYear];
}
