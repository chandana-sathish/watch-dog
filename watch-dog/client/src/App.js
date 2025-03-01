/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {
  Header,
  Container,
  Segment,
  Grid,
  Label,
  Icon,
  Popup,
  Button,
} from 'semantic-ui-react';

import {SemanticToastContainer, toast} from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

import {strEqual, successToast, errorToast} from './utility';

import DogIcon from './images/dog_icon.svg';

// Components
import Question from './components/Question';
import ReportCrime from './components/ReportCrime';
import Batman from './components/Batman';

// Cards
import TableCard from './components/cards/TableCard';
import LineChart from './components/cards/LineChart';
import BarChart from './components/cards/BarChart';
import VerticalBarChart from './components/cards/VerticalBarChart';
import DoughnutChart from './components/cards/DoughnutChart';
import TextCard from './components/cards/TextCard';
import SingleTextCard from './components/cards/SingleTextCard';
import SummaryCard from './components/cards/SummaryCard';
import MapCard from './components/cards/MapCard';
import HeatMap from './components/cards/HeatMap';
import PDCard from './components/cards/PDCard';
import WelcomeCard from './components/cards/WelcomeCard';
import PolarChart from './components/cards/PolarChart';
import PieChart from './components/cards/PieChart';
import ScatterChart from './components/cards/ScatterChart';
import StatisticCard from './components/cards/StatisticCard';

// Constants
import {
  FINE_PRINT,
  ABOUT_DESC,
  bikeTypes,
  dateNumOptions,
  bikeColours,
} from './constants';

// Custom css
import './App.css';

var NUM_CARD_ROWS = 8;

function App () {
  const [showWelcome, setShowWelcome] = useState (true);
  const [batmanMode, setBatmanMode] = useState (false);
  const [batmanData, setBatmanData] = useState (null);
  const [defaultQuestion, setDefaultQuestion] = useState (true);

  const [cards, setCards] = useState ([]);
  const [loadingData, setLoadingData] = useState (false);
  const [hoodOptions, setHoodOptions] = useState ([]);
  const [crimeOptions, setCrimeOptions] = useState ([]);
  const [pdOptions, setPDOptions] = useState ([]);
  const [pdDetails, setPDDetails] = useState ([]);
  const [offenceOptions, setOffenceOptions] = useState (new Map ());

  function defaultQuestionChanged (defaultQuestion) {
    setDefaultQuestion (defaultQuestion);
  }

  useEffect (() => {
    var allHoods = [];
    fetch ('/neighbourhoods')
      .then (response => response.json ())
      .then (res => {
        // console.log (res);
        res.forEach (hood => {
          allHoods.push ({
            key: hood['hood_id'],
            text: hood['name'],
            value: hood['name'],
          });
        });
        setHoodOptions (allHoods);
        successToast ('Fetched neighbourhoods!');
      })
      .catch (err => {
        console.log (err);
        errorToast ('Could not fetch neighbourhoods');
      });

    var policeDivisions = [];
    fetch ('/police-divisions')
      .then (response => response.json ())
      .then (res => {
        // console.log (res);
        res.forEach (pd => {
          policeDivisions.push ({
            key: pd['division'],
            text: pd['division'],
            value: pd['division'],
          });
        });

        // Resolve promises
        setPDOptions (policeDivisions);
        successToast ('Fetched police divisions!');
      })
      .catch (err => {
        console.log (err);
        errorToast ('Could not fetch police divisions');
      });

    var allCrimeTypes = [];
    var offence = new Map ();
    fetch ('/regular-crimes')
      .then (response => response.json ())
      .then (res => {
        // console.log (res);
        res.forEach (crime => {
          if (!allCrimeTypes.find (ct => strEqual (ct.value, crime['MCI']))) {
            allCrimeTypes.push ({
              key: crime['crime_id'],
              text: crime['MCI'],
              value: crime['MCI'],
            });
          }
          var offenceOption = {
            key: crime['offence'],
            text: crime['offence'],
            value: crime['offence'],
            db_key: crime['crime_id'],
            indicator: crime['MCI'],
          };
          if (offence[crime['MCI']]) {
            offence[crime['MCI']].push (offenceOption);
          } else {
            offence[crime['MCI']] = [offenceOption];
          }
        });
        setCrimeOptions (allCrimeTypes);
        setOffenceOptions (offence);
        successToast ('Fetched crime types!');
      })
      .catch (err => {
        console.log (err);
        errorToast ('Could not fetch crime indicators');
      });
  }, []);

  function closeWelcome () {
    localStorage.setItem ('welcomeMsg', 'false');
    setShowWelcome (false);
  }

  function showHelp () {
    localStorage.setItem ('welcomeMsg', 'true');
    setShowWelcome (true);
  }

  function fetchQuestion (questionNum) {
    console.log ('Fetching question');
    var questionPath = '/question/';
    questionPath += questionNum;
    setLoadingData (true);
    fetch (questionPath)
      .then (response => response.json ())
      .then (res => {
        // console.log (res);
        var allCards = [];
        var lastCardsGroup = 1;

        if (questionNum == 0) {
          res.forEach (data => {
            data['bike_type'] = bikeTypes.get (data['bike_type']);
          });
          allCards.push ({
            src: (
              <PolarChart
                data={res}
                title="Stolen Bike Types"
                labelKey="bike_type"
                dataKey="theft_count"
              />
            ),
            group: 0,
            width: null,
          });
        } else if (questionNum == 1) {
          allCards.push ({
            src: (
              <StatisticCard
                data={res[0].total}
                label="stolen bikes recovered"
              />
            ),
            group: 0,
            width: null,
          });
        } else if (questionNum == 2) {
          res.forEach (data => {
            var label = dateNumOptions['hour'].find (
              hour => hour.value == data['hour']
            );
            data['hour'] = label['label'];
          });

          allCards.push ({
            src: (
              <VerticalBarChart
                data={res}
                title="Crimes Per Hour"
                labelKey="hour"
                dataKey="total"
                chartLabel="crimes"
              />
            ),
            group: 0,
            width: null,
          });
        } else if (questionNum == 3) {
          res.forEach (data => {
            var label = dateNumOptions['week'].find (
              hour => hour.value == data['day_of_week']
            );
            data['day_of_week'] = label['label'];
          });

          allCards.push ({
            src: (
              <VerticalBarChart
                data={res}
                title="Crimes Per Day of the Week"
                labelKey="day_of_week"
                dataKey="total"
                chartLabel="crimes"
              />
            ),
            group: 0,
            width: null,
          });
        } else if (questionNum == 4) {
          res.forEach (data => {
            var label = dateNumOptions['hour'].find (
              hour => hour.value == data['hour']
            );
            data['hour'] = label['label'];
          });

          allCards.push ({
            src: (
              <VerticalBarChart
                data={res}
                title="Robberies Per Hour"
                labelKey="hour"
                dataKey="total"
                chartLabel="crimes"
              />
            ),
            group: 0,
            width: null,
          });
        } else if (questionNum == 5) {
          res.forEach (data => {
            var label = dateNumOptions['week'].find (
              hour => hour.value == data['day_of_week']
            );
            data['day_of_week'] = label['label'];
          });

          allCards.push ({
            src: (
              <VerticalBarChart
                data={res}
                title="Robberies Per Day of the Week"
                labelKey="day_of_week"
                dataKey="total"
                chartLabel="crimes"
              />
            ),
            group: 0,
            width: null,
          });
        } else if (questionNum == 6) {
          var text = res[0].name + ' (' + res[0].hood_id + ')';
          allCards.push ({
            src: (
              <SingleTextCard
                mainText={text}
                subText={
                  ' has the most with a total of ' +
                    res[0].total +
                    ' traffic accidents'
                }
              />
            ),
            group: 0,
            width: null,
          });
        } else if (questionNum == 7) {
          res.forEach (data => {
            if (data['label'] == null) {
              data['label'] = 'Unknown';
            }
          });
          allCards.push ({
            src: (
              <BarChart
                data={res}
                title="Traffic Accidents by Age of Involved Person"
              />
            ),
            group: 0,
            width: null,
          });
        } else if (questionNum == 8) {
          allCards.push ({
            src: (
              <StatisticCard
                data={'$' + res[0].avgCost.toFixed (2)}
                label=" dollars"
              />
            ),
            group: 0,
            width: null,
          });
        } else if (questionNum == 9) {
          res.forEach (data => {
            data['colour'] = bikeColours.get (data['colour']);
          });

          allCards.push ({
            src: (
              <PolarChart
                data={res}
                title="Stolen Bike Colours"
                labelKey="colour"
                dataKey="total"
                customColors={['#011627', '#00b4d8', '#d9d9d9']}
              />
            ),
            group: 0,
            width: null,
          });
        } else if (questionNum == 10) {
          res.forEach (data => {
            if (data['label'] == null) {
              data['label'] = 'Unknown';
            }
          });
          allCards.push ({
            src: (
              <DoughnutChart title="Traffic Accidents Per Injury" data={res} />
            ),
            group: 0,
            width: null,
          });
        } else if (questionNum == 11) {
          res.forEach (data => {
            if (data['label'] == null) {
              data['label'] = 'Unknown';
            }
          });
          allCards.push ({
            src: (
              <BarChart data={res} title="Traffic Accidents by Vehicle Type" />
            ),
            group: 0,
            width: null,
          });
        } else if (questionNum == 12) {
          res.forEach (data => {
            if (data['label'].length == 1) {
              data['label'] = 'Unknown';
            }
          });
          allCards.push ({
            src: (
              <BarChart data={res} title="Traffic Accidents by Action Taken" />
            ),
            group: 0,
            width: null,
          });
        } else if (questionNum == 13) {
          allCards.push ({
            src: (
              <ScatterChart
                data={res}
                title="Crimes Per Neighbourhood Employment Rate"
                labelKey="hood_id"
                xKey="employment_rate"
                yKey="total"
                yLabel="Number of Crimes"
                xLabel="Employment Rate"
              />
            ),
            group: 0,
            width: null,
          });
        } else if (questionNum == 14) {
          allCards.push ({
            src: (
              <ScatterChart
                data={res[0]}
                title="Crimes Per Neighbourhood High School Education Rate"
                labelKey="hood_id"
                xKey="high_school"
                yKey="total"
                yLabel="Number of Crimes"
                xLabel="High School Rate"
              />
            ),
            group: 0,
            width: null,
          });

          allCards.push ({
            src: (
              <ScatterChart
                data={res[1]}
                title="Crimes Per Neighbourhood University Education Rate"
                labelKey="hood_id"
                xKey="university"
                yKey="total"
                yLabel="Number of Crimes"
                xLabel="University Rate"
              />
            ),
            group: 1,
            width: null,
          });

          allCards.push ({
            src: (
              <ScatterChart
                data={res[2]}
                title="Crimes Per Neighbourhood Technical Degree Rate"
                labelKey="hood_id"
                xKey="technical_degree"
                yKey="total"
                yLabel="Number of Crimes"
                xLabel="Technical Degree Rate"
              />
            ),
            group: 2,
            width: null,
          });
          lastCardsGroup = 3;
        } else if (questionNum == 15) {
          allCards.push ({
            src: (
              <ScatterChart
                data={res}
                title="Bike Thefts Per Bike Speed"
                labelKey="hood_id"
                xKey="speed"
                yKey="total"
                yLabel="Number of Bike Thefts"
                xLabel="Bike Speed"
              />
            ),
            group: 0,
            width: null,
          });
        } else if (questionNum == 16) {
          allCards.push ({
            src: (
              <ScatterChart
                data={res}
                title="Bike Thefts Per Bike Cost"
                labelKey="hood_id"
                xKey="cost"
                yKey="total"
                yLabel="Number of Bike Thefts"
                xLabel="Bike Cost"
              />
            ),
            group: 0,
            width: null,
          });
        } else if (questionNum == 17) {
          res.forEach (data => {
            if (data['label'] == null) {
              data['label'] = 'Unknown';
            }
          });
          allCards.push ({
            src: (
              <PieChart
                title="Traffic Accidents Per Road Surface Conditions"
                data={res}
                labelKey="label"
                dataKey="total"
              />
            ),
            group: 0,
            width: null,
          });
        } else if (questionNum == 18) {
          res.forEach (data => {
            if (data['label'] == null) {
              data['label'] = 'Unknown';
            }
          });
          allCards.push ({
            src: (
              <PieChart
                title="Traffic Accidents Per Road Visibility Conditions"
                data={res}
                labelKey="label"
                dataKey="total"
              />
            ),
            group: 0,
            width: null,
          });
        } else if (questionNum == 19) {
          res.forEach (data => {
            if (data['label'] == null) {
              data['label'] = 'Unknown';
            }
          });
          allCards.push ({
            src: (
              <PieChart
                title="Traffic Accidents Per Road Type"
                data={res}
                labelKey="label"
                dataKey="total"
              />
            ),
            group: 0,
            width: null,
          });
        } else if (questionNum == 20) {
          res.forEach (data => {
            if (data['label'] == null) {
              data['label'] = 'Unknown';
            }
          });
          allCards.push ({
            src: (
              <PieChart
                title="Traffic Accidents Per Road Traffic Control Type"
                data={res}
                labelKey="label"
                dataKey="total"
              />
            ),
            group: 0,
            width: null,
          });
        }

        allCards.push ({
          src: (
            <TextCard
              header="The fine print:"
              height={'300px'}
              body={FINE_PRINT}
            />
          ),
          group: lastCardsGroup,
          width: null,
        });

        allCards.push ({
          src: <TextCard header="About" body={ABOUT_DESC} />,
          group: lastCardsGroup,
          width: null,
        });

        setLoadingData (false);
        successToast ();
        setCards (allCards);
        setBatmanMode (false);
      })
      .catch (err => {
        console.log (err);
        setLoadingData (false);
        errorToast ();
      });
  }

  function fetchCrimes (
    crimeType,
    crimeIndicator,
    dateType,
    dateNum,
    locationType,
    hoodName,
    pdNum
  ) {
    setLoadingData (true);

    var mainPaths = [];
    var extraPaths = [];

    var timeType = '';
    if (strEqual (dateType, 'year')) {
      timeType = 'month';
    } else if (strEqual (dateType, 'month')) {
      timeType = 'day';
    }

    if (strEqual (crimeType, 'crimes')) {
      mainPaths.push ('/crime-events/table?');
      mainPaths.push ('/crime-events/summary/MCI?');
      mainPaths.push ('/crime-events/summary/time?' + 'timeType=' + timeType);
      mainPaths.push ('/crime-events/map?');
      mainPaths.push ('/crime-events/heatmap/year?');
      mainPaths.push ('/crime-events/summary/police-division?');

      extraPaths.push ('/crime-events/summary/premise?');
    } else if (strEqual (crimeType, 'bike thefts')) {
      mainPaths.push ('/crime-events/bike-thefts/table?');
      mainPaths.push ('/crime-events/bike-thefts/summary/type?');
      mainPaths.push (
        '/crime-events/bike-thefts/summary/time?' + 'timeType=' + timeType
      );
      mainPaths.push ('/crime-events/bike-thefts/map?');
      mainPaths.push ('/crime-events/bike-thefts/heatmap/year?');
      mainPaths.push ('/crime-events/bike-thefts/summary/police-division?');

      extraPaths.push ('/crime-events/bike-thefts/summary/status?');
    } else if (strEqual (crimeType, 'traffic incidents')) {
      mainPaths.push ('/traffic-events/table?');
      mainPaths.push ('/traffic-events/summary/type?');
      mainPaths.push ('/traffic-events/summary/time?' + 'timeType=' + timeType);
      mainPaths.push ('/traffic-events/map?');
      mainPaths.push ('/traffic-events/heatmap/year?');
      mainPaths.push ('/traffic-events/summary/police-division?');

      extraPaths.push ('/traffic-events/summary/road/classification?');
      extraPaths.push ('/traffic-events/summary/road/visibility?');
      extraPaths.push ('/traffic-events/summary/road/surface_condition?');
    }

    var plusPart = '&dateType=' + dateType + '&dateNum=' + dateNum.value;
    if (strEqual (crimeType, 'crimes') && !strEqual (crimeIndicator, 'all')) {
      plusPart += '&MCI=' + crimeIndicator;
    }
    if (strEqual (locationType, 'in neighbourhood')) {
      plusPart += '&hood=' + hoodName;
    } else if (strEqual (locationType, 'in police division')) {
      plusPart += '&pd=' + pdNum.substr (3);
    }

    mainPaths.forEach ((mPath, ind, theArray) => {
      theArray[ind] = mPath + plusPart;
    });

    extraPaths.forEach ((xPath, ind, theArray) => {
      theArray[ind] = xPath + plusPart;
    });

    var fetches = [];

    mainPaths.forEach (mPath => {
      fetches.push (fetch (mPath).then (response => response.json ()));
    });

    extraPaths.forEach (xPath => {
      fetches.push (fetch (xPath).then (response => response.json ()));
    });

    Promise.all (fetches)
      .then (allResponses => {
        // console.log (allResponses);

        const tableData = allResponses[0];
        const mainSummaryData = allResponses[1];
        const summaryTimeData = allResponses[2];
        const mapData = allResponses[3];
        const heatmapData = allResponses[4];
        const summaryPDData = allResponses[5];

        var newBatmanData = {};
        newBatmanData['total'] = tableData.length;
        newBatmanData['dateType'] = dateType;
        newBatmanData['timeData'] = summaryTimeData;
        setBatmanData (newBatmanData);

        var summaryPremiseData = null;
        if (strEqual (crimeType, 'crimes')) {
          summaryPremiseData = allResponses[6];
        }

        var summaryStatusData = null;
        if (strEqual (crimeType, 'bike thefts')) {
          summaryStatusData = allResponses[6];
        }

        var summaryClassData = null;
        var summaryVisData = null;
        var summarySurfaceData = null;
        if (strEqual (crimeType, 'traffic incidents')) {
          summaryClassData = allResponses[6];
          summaryVisData = allResponses[7];
          summarySurfaceData = allResponses[8];
        }

        successToast ();

        var allCards = [];

        allCards.push ({
          src: <TableCard data={tableData || []} />,
          group: 0,
          width: null,
        });

        if (strEqual (dateType, 'year')) {
          allCards.push ({
            src: (
              <HeatMap
                data={heatmapData}
                start={dateNum.value}
                dateType={dateType}
              />
            ),
            group: 1,
            width: null,
          });
        }

        if (strEqual (crimeType, 'bike thefts')) {
          mainSummaryData.forEach (data => {
            data['label'] = bikeTypes.get (data['label']);
          });
        }

        if (strEqual (crimeType, 'traffic incidents')) {
          mainSummaryData.forEach (data => {
            if (data['label'] == null) {
              data['label'] = 'Unknown';
            }
          });
          summaryClassData.forEach (data => {
            if (data['label'] == null) {
              data['label'] = 'Unknown';
            }
          });
          summaryVisData.forEach (data => {
            if (data['label'] == null) {
              data['label'] = 'Unknown';
            }
          });
          summarySurfaceData.forEach (data => {
            if (data['label'] == null) {
              data['label'] = 'Unknown';
            }
          });
        }

        allCards.push ({
          src: <SummaryCard data={mainSummaryData || []} />,
          group: 2,
          width: 6,
        });

        allCards.push ({
          src: <MapCard markers={mapData} />,
          group: 2,
          width: null,
        });

        allCards.push ({
          src: <LineChart data={summaryTimeData} dateType={dateType} />,
          group: 3,
          width: null,
        });

        allCards.push ({
          src: (
            <TextCard
              header="The fine print:"
              height={'300px'}
              body={FINE_PRINT}
            />
          ),
          group: 3,
          width: 4,
        });

        allCards.push ({
          src: <BarChart data={mainSummaryData || []} title={dateNum.label} />,
          group: 5,
          width: null,
        });

        if (strEqual (crimeType, 'crimes')) {
          allCards.push ({
            src: <DoughnutChart data={mainSummaryData || []} />,
            group: 6,
            width: null,
          });

          allCards.push ({
            src: (
              <PieChart
                data={summaryPremiseData || []}
                labelKey="label"
                dataKey="total"
              />
            ),
            group: 6,
            width: null,
          });
        }

        if (
          strEqual (crimeType, 'crimes') ||
          strEqual (crimeType, 'bike thefts')
        ) {
          allCards.push ({
            src: <TextCard header="About" body={ABOUT_DESC} />,
            group: 5,
            width: 3,
          });
        }

        if (strEqual (crimeType, 'bike thefts')) {
          allCards.push ({
            src: (
              <DoughnutChart title="Bike Types" data={mainSummaryData || []} />
            ),
            group: 6,
            width: null,
          });
          allCards.push ({
            src: (
              <PieChart
                data={summaryStatusData}
                title="Bike Status"
                labelKey="label"
                dataKey="total"
              />
            ),
            group: 6,
            width: null,
          });
        }

        if (strEqual (crimeType, 'traffic incidents')) {
          allCards.push ({
            src: (
              <DoughnutChart
                title="Road Classification"
                data={summaryClassData || []}
              />
            ),
            group: 5,
            width: null,
          });
          allCards.push ({
            src: (
              <PieChart
                data={summaryVisData}
                title="Road Visibility"
                labelKey="label"
                dataKey="total"
              />
            ),
            group: 6,
            width: null,
          });
          allCards.push ({
            src: (
              <DoughnutChart
                title="Road Surface Condition"
                data={summarySurfaceData || []}
              />
            ),
            group: 6,
            width: null,
          });
          allCards.push ({
            src: <TextCard header="About" body={ABOUT_DESC} />,
            group: 6,
            width: 3,
          });
        }

        // PD Card
        var locPaths = [];
        var newPDDetails = [];

        summaryPDData.forEach (pd => {
          var findPDData = pdDetails.find (storedPD =>
            strEqual (storedPD.rawAddress, pd['address'])
          );

          if (!findPDData) {
            var mapboxPath =
              'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
              pd['address'] +
              ', Ontario, Canada.json' +
              '?access_token=' +
              process.env.REACT_APP_MAPBOX_KEY;
            locPaths.push (
              fetch (mapboxPath).then (response => response.json ())
            );
          } else {
            newPDDetails.push ({
              name: findPDData.name,
              coords: findPDData.coords,
              rawAddress: findPDData.rawAddress,
              total: pd.total,
            });
          }
        });

        Promise.all (locPaths)
          .then (allResponses => {
            allResponses.forEach ((locData, ind) => {
              if (locData.features.length) {
                var findPDData = summaryPDData.find (storedPD =>
                  locData.query
                    .join (' ')
                    .startsWith (storedPD.address.toLowerCase ())
                );

                if (findPDData) {
                  newPDDetails.push ({
                    name: 'Division ' + findPDData.division,
                    coords: locData.features[0].center,
                    rawAddress: findPDData.address,
                    total: findPDData.total,
                  });
                }
              }
            });

            allCards.push ({
              src: <PDCard data={newPDDetails} />,
              group: 7,
              width: null,
            });

            setCards (allCards);
            setLoadingData (false);
            setPDDetails (newPDDetails);
          })
          .catch (err => {
            console.log (err);
            errorToast ();
            setLoadingData (false);
          });

        // setCards (allCards);
      })
      .catch (err => {
        console.log (err);
        errorToast ();
        setLoadingData (false);
      });
  }

  useEffect (() => {
    var welcomeMsg = localStorage.getItem ('welcomeMsg');
    if (welcomeMsg && strEqual (welcomeMsg, 'false')) {
      setShowWelcome (false);
    }
  }, []);

  return (
    <div className="container">
      <div className="appHeader">
        <Header>
          <img src={DogIcon} alt="WachDog Icon" />
          <Header.Content>
            WatchDog - Crime Data Application
            {!showWelcome &&
              <Popup
                content="Show help"
                inverted
                trigger={
                  <Label as="a" onClick={showHelp}>
                    <Icon name="question" style={{marginRight: 0}} />
                  </Label>
                }
              />}
            <Button
              // animated
              onClick={() => setBatmanMode (!batmanMode)}
              style={{position: 'absolute', right: '20px'}}
              color="black"
              disabled={!defaultQuestion}
            >
              <Button.Content visible>
                Batman Mode {batmanMode ? 'On' : 'Off'}
              </Button.Content>
            </Button>

          </Header.Content>
        </Header>
      </div>
      <Question
        fetchCrimes={fetchCrimes}
        fetchQuestion={fetchQuestion}
        loading={loadingData}
        hoodOptions={hoodOptions}
        crimeOptions={crimeOptions}
        pdOptions={pdOptions}
        defaultQuestionChanged={defaultQuestionChanged}
      />
      <Container style={{marginTop: '3em'}}>
        <Grid columns="equal">
          {showWelcome &&
            <Grid.Row columns="equal">
              <Grid.Column width={null}>
                <Segment className="cardSegment">
                  <WelcomeCard closeWelcome={closeWelcome} />
                </Segment>
              </Grid.Column>
            </Grid.Row>}
          {batmanData != null &&
            batmanMode &&
            <Grid.Row columns="equal">
              <Grid.Column width={null}>
                <Batman batmanData={batmanData} />
              </Grid.Column>
            </Grid.Row>}
          {!batmanMode &&
            [...Array (NUM_CARD_ROWS).keys ()].map (gnum => {
              return (
                <Grid.Row columns="equal" key={gnum}>
                  {cards
                    .filter (card => card.group === gnum)
                    .map ((card, ind) => {
                      return (
                        <Grid.Column width={card.width} key={ind}>
                          <Segment className="cardSegment">
                            {card.src}
                          </Segment>
                        </Grid.Column>
                      );
                    })}
                </Grid.Row>
              );
            })}
        </Grid>
        <ReportCrime
          hoodOptions={hoodOptions}
          crimeOptions={crimeOptions}
          offenceOptions={offenceOptions}
        />
      </Container>
      <SemanticToastContainer />
    </div>
  );
}

export default App;
