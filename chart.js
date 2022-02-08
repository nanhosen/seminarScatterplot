const average = (array) => array.reduce((a, b) => a + b) / array.length;
const xVals = []
const yVals = []


const bctu1Data = [
  [ 1931, 17.906767 ],
  [ 1932, 38.505102 ],
  [ 1933, 34.847584 ],
  [ 1934, 11.207398999999999 ],
  [ 1935, 31.219818 ],
  [ 1936, 37.15436 ],
  [ 1937, 29.896843000000004 ],
  [ 1938, 37.424112 ],
  [ 1939, 25.045276 ],
  [ 1940, 22.585772 ],
  [ 1941, 36.13684000000001 ],
  [ 1942, 39.556341999999994 ],
  [ 1943, 32.157999 ],
  [ 1944, 37.160311 ],
  [ 1945, 33.843948999999995 ],
  [ 1946, 34.710725 ],
  [ 1947, 38.239318 ],
  [ 1948, 39.87568099999999 ],
  [ 1949, 37.138492 ],
  [ 1950, 37.10675500000001 ],
  [ 1951, 37.160311 ],
  [ 1952, 53.327574 ],
  [ 1953, 38.471385 ],
  [ 1954, 22.228749 ],
  [ 1955, 30.686265 ],
  [ 1956, 31.239652 ],
  [ 1957, 44.503117 ],
  [ 1958, 45.62972799999999 ],
  [ 1959, 27.776514 ],
  [ 1960, 29.750065999999997 ],
  [ 1961, 14.715365 ],
  [ 1962, 39.78444100000001 ],
  [ 1963, 29.869073999999998 ],
  [ 1964, 40.34576199999999 ],
  [ 1965, 44.723282000000005 ],
  [ 1966, 27.478993000000003 ],
  [ 1967, 40.559978 ],
  [ 1968, 38.193698000000005 ],
  [ 1969, 42.400639 ],
  [ 1970, 37.89022799999999 ],
  [ 1971, 41.690557 ],
  [ 1972, 39.524606999999996 ],
  [ 1973, 37.870393 ],
  [ 1974, 42.686258 ],
  [ 1975, 48.126915999999994 ],
  [ 1976, 30.04362 ],
  [ 1977, 18.015858 ],
  [ 1978, 42.362952 ],
  [ 1979, 29.674694 ],
  [ 1980, 38.899813 ],
  [ 1981, 26.352185 ],
  [ 1982, 48.039525 ],
  [ 1983, 61.42326599999999 ],
  [ 1984, 58.67503000000001 ],
  [ 1985, 46.439716000000004 ],
  [ 1986, 58.72905900000001 ],
  [ 1987, 25.088594 ],
  [ 1988, 19.334508 ],
  [ 1989, 24.263213 ],
  [ 1990, 20.896848000000002 ],
  [ 1991, 28.650431000000005 ],
  [ 1992, 16.437948000000002 ],
  [ 1993, 48.203379 ],
  [ 1994, 28.633829 ],
  [ 1995, 56.300519 ],
  [ 1996, 43.333265999999995 ],
  [ 1997, 51.458154 ],
  [ 1998, 53.503508 ],
  [ 1999, 40.837464 ],
  [ 2000, 23.996873 ],
  [ 2001, 23.359208000000002 ],
  [ 2002, 29.656248 ],
  [ 2003, 26.038994000000002 ],
  [ 2004, 26.128051999999997 ],
  [ 2005, 45.527379999999994 ],
  [ 2006, 39.087847 ],
  [ 2007, 20.019599 ],
  [ 2008, 32.84388299999999 ],
  [ 2009, 44.126614000000004 ],
  [ 2010, 29.266238 ],
  [ 2011, 66.60732200000001 ],
  [ 2012, 24.505634000000004 ],
  [ 2013, 24.514955 ],
  [ 2014, 23.056449999999998 ],
  [ 2015, 16.705063000000003 ],
  [ 2016, 23.278003 ],
  [ 2017, 33.923288 ],
  [ 2018, 19.043295 ],
  [ 2019, 40.85551400000001 ],
  [ 2020, 25.59668 ]
]


const firstNormData = []
const secondNormData = []
bctu1Data.map(curr =>{
  const currYear = curr[0]
  if(currYear >= 1981 && currYear <=2010){
    firstNormData.push(curr[1])
  }
  if(currYear >= 1991 && currYear <=2020){
    secondNormData.push(curr[1])
  }
})

console.log(average(firstNormData),average(secondNormData))

const reformatted = bctu1Data.map(curr=>{
  xVals.push(curr[0])
  yVals.push(curr[1])
})

const sq = findLineByLeastSquares(xVals, yVals)
const newChartData = []

xVals.map((curr,i)=>{
  newChartData.push([curr, sq[1][i]])
})
// console.log('newChartData', newChartData)

function findLineByLeastSquares(values_x, values_y) {
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var count = 0;

  /*
   * We'll use those variables for faster read/write access.
   */
  var x = 0;
  var y = 0;
  var values_length = values_x.length;

  if (values_length != values_y.length) {
      throw new Error('The parameters values_x and values_y need to have same size!');
  }

  /*
   * Nothing to do.
   */
  if (values_length === 0) {
      return [ [], [] ];
  }

  /*
   * Calculate the sum for each of the parts necessary.
   */
  for (var v = 0; v < values_length; v++) {
      x = values_x[v];
      y = values_y[v];
      sum_x += x;
      sum_y += y;
      sum_xx += x*x;
      sum_xy += x*y;
      count++;
  }

  /*
   * Calculate m and b for the formular:
   * y = x * m + b
   */
  var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
  var b = (sum_y/count) - (m*sum_x)/count;

  /*
   * We will make the x and y result line now
   */
  var result_values_x = [];
  var result_values_y = [];

  for (var v = 0; v < values_length; v++) {
      x = values_x[v];
      y = x * m + b;
      result_values_x.push(x);
      result_values_y.push(y);
  }

  return [result_values_x, result_values_y];
}

