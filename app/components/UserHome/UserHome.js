import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryArea, VictoryStack, VictoryLine } from 'victory';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {plants, station} = props;
  return (
    <div>
    {
      station.daily &&
        <VictoryChart
          width={800}
          animate
          theme={VictoryTheme.material}
          >
            
            <VictoryArea 
              style={{data: {fill: "lightsalmon"}}}
              data={station.daily.maxTemps.filter(temp => temp > 0)}
            />
            <VictoryArea 
              style={{data: {fill: "lightblue"}}}
              data={station.daily.minTemps.filter(temp => temp > 0)}
            />
            <VictoryLine 
              style={{data: {stroke: "steelblue"}}}
              data={station.daily.minTemps.filter(temp => temp > 0).map(num => 32)}
            />
        </VictoryChart>
    }
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    plants: state.plants.plants,
    station: state.weather.station
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};