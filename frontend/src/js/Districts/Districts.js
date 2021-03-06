/* eslint-disable camelcase */
/* eslint-disable valid-jsdoc */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {RingLoader} from 'react-spinners'

import axios from 'axios'
import DistrictGrid from './DistrictGrid.js'
import DistrictFilter from './DistrictFilter.js'
import url from '../../assets/resource.json'

/**
* Creates component for District card
*/
export default class Districts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      all_states: null,
      state_value: 'None',
      population_value: 'None',
      median_age_value: 'None',
      sort_value: 'last_asc'
    }

    axios.get(url.api_url + 'state/?state_usps=True').then((response) => {
      this.setState({all_states: response.data})
    }).catch((error) => {
      if (error) {
        this.setState({all_states: null})
      }
    })

    this.handleFilterClicked = this.handleFilterClicked.bind(this)
  }

  /**
  * Sets filter state based on selected filter values
  */
  handleFilterClicked (state_value, population_value, median_age_value,
    sort_value) {
    this.setState({
      state_value: state_value,
      population_value: population_value,
      median_age_value: median_age_value,
      sort_value: sort_value
    })
  }

  /**
  * Creates card for filtered districts
  */
  render () {
    const styles = {
      center: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: '25%',
        paddingLeft: '50px',
        paddingRight: '50px',
        justifyContent: 'space-around'
      }
    }

    if (this.state.all_states === null) {
      return (
        <div style={styles.center} className="loading">
          <RingLoader color={'#123abc'} loading={true} />
        </div>
      )
    }
    
    return (
      <div style={{paddingTop: '25px'}}>
        <DistrictFilter
          states={this.state.all_states}
          buttonHandler={this.handleFilterClicked} />
        <DistrictGrid
          state_value={this.state.state_value}
          population_value={this.state.population_value}
          median_age_value={this.state.median_age_value}
          sort_value={this.state.sort_value} />
      </div>
    )
  }
}
