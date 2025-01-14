const crimeTypeOptions = [
  {
    label: 'crimes',
    value: 'crimes',
  },
  {
    label: 'traffic incidents',
    value: 'traffic incidents',
  },
];

const crimeIndicatorOptions = [
  {
    label: 'all',
    value: 'all',
  },
  {
    label: 'assault',
    value: 'assault',
  },
  {
    label: 'auto theft',
    value: 'auto theft',
  },
  {
    label: 'break and enter',
    value: 'break and enter',
  },
  {
    label: 'robbery',
    value: 'robbery',
  },
  {
    label: 'theft over',
    value: 'theft over',
  },
];

const dateTypeOptions = ['year', 'month'];
const dateNumOptions = new Map ();
dateNumOptions['year'] = [
  {
    value: 2014,
    label: '2014',
  },
  {
    value: 2015,
    label: '2015',
  },
  {
    value: 2016,
    label: '2016',
  },
  {
    value: 2017,
    label: '2017',
  },
  {
    value: 2018,
    label: '2018',
  },
  {
    value: 2019,
    label: '2019',
  },
  {
    value: 2020,
    label: '2020',
  },
];
dateNumOptions['month'] = [
  {
    value: 1,
    label: 'Jan',
  },
  {
    value: 2,
    label: 'Feb',
  },
  {
    value: 3,
    label: 'Mar',
  },
  {
    value: 4,
    label: 'Apr',
  },
  {
    value: 5,
    label: 'May',
  },
  {
    value: 6,
    label: 'Jun',
  },
  {
    value: 7,
    label: 'Jul',
  },
  {
    value: 8,
    label: 'Aug',
  },
  {
    value: 9,
    label: 'Sep',
  },
  {
    value: 10,
    label: 'Oct',
  },
  {
    value: 11,
    label: 'Nov',
  },
  {
    value: 12,
    label: 'Dec',
  },
];
// dateNumOptions['week'] = [1, 2, 3, 4, 5, 6];
// dateNumOptions['day'] = [1, 2, 7, 30, 60, 180, 365];

const FINE_PRINT = `The statistics, graphs and maps are based upon preliminary information that was supplied to the Toronto Police Service by the reporting parties and may not have been verified. The preliminary crime classifications may be changed at a later date based upon additional investigation and there is always the possibility of mechanical or human error.

The Toronto Police Service makes no warranty, representation or guarantee as to the content, sequence, accuracy, timeliness or completeness of any of the data provided herein. The user of the following pages should not rely on the data provided herein for comparison purposes over time, or for any reason. The Toronto Police Service explicitly disclaims any representations and warranties, including, without limitation, the implied warranties of merchantability and fitness for a particular purpose.

The Toronto Police Service shall assume no liability for any errors, omissions, or inaccuracies in the information provided, regardless of how caused. The Toronto Police Service will not be responsible for the use of, or the results obtained from the use of this information. The Toronto Police Service shall assume no liability for any decisions made or actions taken or not taken by the user of the website in reliance upon any information or data furnished hereunder.

Due to both stacked incidents (those located at the same address) and incidents which may not have been geocoded, the number of incidents identified in tables and reports may not be fully reflected in the map. All data visualizations on maps should be considered approximate and attempts to derive specific addresses are strictly prohibited.`;

const ABOUT_DESC = `WatchDog is a crime data application created by Dhvani, Vikram, Lukman, Abudllah, and Chandana for the CS 348 course at UWaterloo.`;

export {
  crimeTypeOptions,
  crimeIndicatorOptions,
  dateTypeOptions,
  dateNumOptions,
  FINE_PRINT,
  ABOUT_DESC,
};
