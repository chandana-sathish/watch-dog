# WatchDog

## Table of Contents
- [Overview](#overview)
- [Data](#data)
- [E/R Diagram](#er-diagram)
- [Using the Application](#using-the-application)
- [API](#api)
- [Team](#team)

## Overview

[![overview](overview.gif)](https://www.youtube.com/watch?v=VbmVv0VzuPU)

WatchDog is an interactive web app for people interested in exploring crime in the city of Toronto. The webapp is helpful to a wide variety of users such as new homeowners trying to assess how safe a neighbourhood is before buying, novice drivers trying to avoid accident-prone roads or just anyone curious about crime rates in their neighbourhood.

#### Application
- https://watch-dog.azurewebsites.net/

#### Demo Video:
- https://www.youtube.com/watch?v=VbmVv0VzuPU

## Data

The tables we get from the Toronto Police Open Data:
- https://data.torontopolice.on.ca/pages/open-data

We get a few additional columns of the census from the Toronto City Open Data:
- https://open.toronto.ca/dataset/neighbourhood-profiles/

The raw data comes in the form of large CSV files that are difficult to work with. Therefore, we have created our own scripts to restructure the data into a useful format for both storage and presentation.

### Some Database Statistics
- 9 Tables (43.4 MB)
  - IncidentTime (`54 250 rows`)
  - PoliceDivision (`17 rows`)
  - Neighbourhood (`140 rows`)
  - RegularCrime (`49 rows`)
  - CrimeEvent (`212 683 rows`)
  - BikeTheft (`21 584 rows`)
  - RoadCondition (`189 rows`)
  - TrafficEvent (`5 623 rows`)  
  - InvolvedPerson (`15 418 rows`)  

## Platform and Tech Stack

Both the web application and the SQL database (MySQL 5.7) are hosted on Microsoft Azure. Azure AppServices and MySQL are modern, scalable, efficient and flexible. This setup is ideal and efficient for building a web app such as ours; plus Azure was cheaper than the alternatives.

The back end is made up Node.js + Express.js from which API end points are exposed. This is what directly talks with the database. The front end is a React application. The notalable NPM packages used include: the Semantic UI React library for UI components, the Mapbox API for the maps you see in the application, ChartJS and D3.js for the data presentation, and ag-grid for the table. Thus, our web application code mostly consists of JavaScript.

## E/R diagram
![E/R diagram](ER_Diagram.png)

## Using the Application

### Welcome Card
<img alt="welcome card" src="screenshots/welcome_card.png" width="70%">

### Starter Question
![starter question](screenshots/starter_question.gif)

* Located at very top of the application.
* It filters the information in the cards below by crime type (regular crimes, bike thefts and traffic accidents).
* For crimes we have filters for the major crime indicator (MCI), date (year or month) and location (citywide, neighbourhood and police division).
* By default, it is set to show all crimes citywide (Toronto) that happened in 2019.
* Click OK and the new search will update the cards below.

### Data Cards
*  All queries have similar cards with different data.

#### Table Card
![table card](screenshots/table_card.gif)

   * Located right below the Starter Question.
   * Contains the raw data from the query.
   * Paginated and filterable.

#### Heat Map Card
![heatmap card](screenshots/heatmap_card.gif)

   * Located right below the Table Card.
   * Shows the amount of crimes per time period.
   * Interact to refine the time range.

#### Summary Card
<p float="left">
    <img alt="summary card crimes" src="screenshots/summary_card_crimes.png" width="270">
    <img alt="summary card bike thefts"  src="screenshots/summary_card_bike_thefts.gif" width="270">
    <img alt="summary card traffic accidents"  src="screenshots/summary_card_traffic_accidents.gif" width="270">
</p>

   * Crimes: shows the number of crimes per major crime indicator.
   * Bike Thefts: shows the number of bike thefts per bike type
   * Traffic Accidents: shows the number of traffic accidents per type of the person involved person

#### Cluster Map Card
![cluster map card](screenshots/cluster_map_card.gif)

   * Shows each individual event location.
   * We can zoom in on the cluster to break it up and see individual locations.

#### Line Chart Card
![line card](screenshots/line_card.png)

   * Shows the number of event per month if our date type is set to year, or day if our date type is set to month.

#### Horizontal Bar Chart
![horizontal bar card](screenshots/horizontal_bar_card.png)
   * Same data as summary

#### Doughnut Chart
![doughnut card](screenshots/doughnut_card.png)
   * Same data as summary
   * Traffic Accidents:
        * shows the number of traffic accidents per road classification
        * shows the number of traffic accidents per road surface condition

#### Pie Chart
![pie card](screenshots/pie_card.png)
   * Crimes: shows the number of crimes per premise type
   * Bike Thefts: shows the number of bike thefts per bike status
   * Traffic Accidents: shows the number of traffic accidents per road visibility

### Police Division Map
![police division card](screenshots/police_division_card.gif)
   * Located below everything mentioned above.
   * Shows the amount of crimes per police division and where the police divisions are located.
   * Provide an address and the application will output the closest police division.

### Report Crime
![report crime form](screenshots/report_crime.gif)
   * Located at the bottom right of the application.
   * Fill this out to report a crime and update the database.

### Batman Mode
<p float="left">
    <img alt="batman mode year" src="screenshots/batman_mode_year.gif" width="410">
    <img alt="batman mode month"  src="screenshots/batman_mode_month.gif" width="410">
</p>

   * The button to activate it is located at the top right of the application.
   * A game that tests how well the user know the city of Toronto and its crime.
   * Once activated, the user has to guess the total number of crimes that occurred and the crimes per month/day for the selected query.
   * Then at the end, users can see their score for guessing both the data.
   * This is a fun way for users to explore the data and challenge their friends.

### Predefined Queries
![predefined queries](screenshots/predefined_queries.gif)

   * Located at the same spot as the Starter Question.
   * An alternative to the Starter Question if the user is not sure what they are looking for.
   * Select the toggle to the left of the Starter Sentence to switch to Predefined Queries.
   * Currently we have 21 queries, but more can be added quite easily.

### Some Sample Queries

#### What are the 3 most commonly stolen bike types?
<img src="screenshots/pre_1.png" width="70%">

#### At what hour do most crimes occur?
<img src="screenshots/pre_2.png" width="70%">

#### Which neighbourhood has the most number of traffic accidents?
<img src="screenshots/pre_3.png" width="70%">

#### What is the average cost of bikes stolen?
<img src="screenshots/pre_4.png" width="70%">

#### Is there a correlation between neighbourhood employment and crime?
<img src="screenshots/pre_5.png" width="70%">

#### Is there a correlation between neighbourhood education and crime?
<img src="screenshots/pre_6.png" width="70%">

#### What is the most common driver action taken in traffic accidents?
<img src="screenshots/pre_7.png" width="70%">

#### Which road traffic control types have the most accidents?
<img src="screenshots/pre_8.png" width="70%">

## API

### GET Requests

### General

- List of neighbourhoods
  - `/neighbourhoods/`
- List of Police Divisions
  - `/police-divisions/`
- List of crime indicators
  - `/regular-crimes/`

Can filter the following by date, neighbourhood, and/or police division

### Crimes

Can also filter all of these by MCI

- List of crime events
  - `/crime-events/table/`
- Summary of number of crime events per MCI
  - `/crime-events/summary/MCI`
- Summary of number of crime events per premise type
  - `/crime-events/summary/premise`
- List of crime locations (lat and long)
  - `/crime-events/map/`
- Summary of number of crime events by police division
  - `/crime-events/summary/police-division`
- Summary of crime events per month (if year supplied as timeType) or per day (if month supplied as timeType)
  - `/crime-events/summary/time`
- Summary of crime events per date (month, day, and hour)
  - `/crime-events/heatmap/year`

### Bike Thefts

- List of bike thefts
  - `/crime-events/bike-thefts/table/`
- Summary of number of bike thefts per bike type (can filter by bike type)
  - `/crime-events/bike-thefts/summary/type`
- Summary of number of bike thefts per bike status (can filter by bike status)
  - `/crime-events/bike-thefts/summary/status`
- List of bike theft locations (lat and long)
  - `/crime-events/bike-thefts/map/`
- Summary of number of bike thefts by police division
  - `/crime-events/bike-thefts/summary/police-division`
- Summary of bike thefts per month (if year supplied as timeType) or per day (if month supplied as timeType)
  - `/crime-events/bike-thefts/summary/time`
- Summary of bike thefts per date (month, day, and hour)
  - `/crime-events/bike-thefts/heatmap/year`

### Traffic Accidents

- List of traffic accidents
  - `/traffic-events/table/`
- Summary of number of traffic accidents per RoadCondition column (classification, visibility, surface_condition)
  - `/traffic-events/summary/road/:cat`
- Summary of number of traffic accidents per InvolvedPerson involvement_type
  - `/traffic-events/summary/type`
- List of traffic accidents locations (lat and long)
  - `/traffic-events/map/`
- Summary of number of traffic accidents by police division
  - `/traffic-events/summary/police-division`
- Summary of traffic accidents per month (if year supplied as timeType) or per day (if month supplied as timeType)
  - `/traffic-events/summary/time`
- Summary of traffic accidents per date (month, day, and hour)
  - `/traffic-events/heatmap/year`

### Predefined Question

- Predefined question & answer queries (see `questions.js`)
  - `/question/:questionNum`

### POST Requests

- Report a crime
  - Expects a JSON object with each column of CrimeEvent and, the columns for IncidentTime
  - `/report-crime/`


# Team
WatchDog was created by [Dhvani](https://github.com/Dhvani35729), [Vikram](https://github.com/vikramsubramanian), [Lukman](https://github.com/LukmanMohamed), [Abdullah](https://github.com/Abdullah2Cool), and [Chandana](https://github.com/chandana-sathish) for the CS 348 course at UWaterloo.
