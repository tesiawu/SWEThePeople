/* eslint-disable no-unused-vars */
import React, {Component} from 'react'
import {GridList} from 'material-ui/GridList'
import {RingLoader} from 'react-spinners'
import Select from 'react-select'
/* eslint-disable no-unused-vars */

import '../../assets/css/Filter.css'
import 'react-select/dist/react-select.css'

export default class DistrictFilter extends Component {
  constructor(props) {
    super(props)

    let stateArr = []
    Object.keys(this.props.states).forEach((key) =>
      stateArr.push({
        value: this.props.states[key],
        label: this.props.states[key]})
    )

    this.state = {
      state_value: null,
      population_value: null,
      median_age_value: null,
      sort_value: null,
      all_states: stateArr
    }

    this.handleStateDropdownChange = this.handleStateDropdownChange.bind(this)
    this.handlePopluationDropdownChange = this.handlePopluationDropdownChange.bind(this)
    this.handleMedianAgeDropdownChange = this.handleMedianAgeDropdownChange.bind(this)
    this.handleSortDropdownChange = this.handleSortDropdownChange.bind(this)
    this.handleFilterClicked = this.handleFilterClicked.bind(this)
    this.handleResetClicked = this.handleResetClicked.bind(this)
  }

  handleStateDropdownChange(selectedOption) {
    this.setState({state_value: selectedOption})
  }

  handlePopluationDropdownChange(selectedOption) {
    this.setState({population_value: selectedOption})
  }

  handleMedianAgeDropdownChange(selectedOption) {
    this.setState({median_age_value: selectedOption})
  }

  handleSortDropdownChange(selectedOption) {
    this.setState({sort_value: selectedOption})
  }

  handleFilterClicked(e) {
    let state = 'None'
    if (this.state.state_value !== null) {
      state = this.state.state_value.value
    }

    let population = 'None'
    if (this.state.population_value !== null) {
      population = this.state.population_value.value
    }

    let median_age = 'None'
    if (this.state.median_age_value !== null) {
      median_age = this.state.median_age_value.value
    }

    let sort = 'state_asc'
    if (this.state.sort_value !== null) {
      sort = this.state.sort_value.value
    }

    this.props.buttonHandler(state, population, median_age, sort)
  }

  handleResetClicked(e) {
    this.setState({
      state_value: null,
      population_value: null,
      median_age_value: null,
      sort_value: "state_asc"
    })
    this.props.buttonHandler('None', 'None', 'None', 'state_asc')
  }

  render() {
    return (
      <div style={{marginLeft: '6%', marginRight: '5%', width: '90%'}}>
        <div className='filter-component row'>
          <div className='col-sm-2 filter-control'>
            <b>Filter State:</b>
            <Select name='district-state'
              value={this.state.state_value}
              onChange={this.handleStateDropdownChange}
              options={this.state.all_states}
            />
          </div>

          <div className='col-sm-2 filter-control'>
            <b>Filter Population:</b>
            <Select name='district-population'
              value={this.state.population_value}
              onChange={this.handlePopluationDropdownChange}
              options={[{value: '0-250000', label: '< 250,000'},
                        {value: '250000-500000', label: '250,000 - 499,999'},
                        {value: '500000-750000', label: '500,000 - 749,999'},
                        {value: '750000-1000000', label: '750,000 - 999,999'},
                        {value: '1000000-10000000', label: '>= 1,000,000'}]}
            />
          </div>

          <div className='col-sm-2 filter-control'>
            <b>Filter Median Age:</b>
            <Select name='district-median-age'
              value={this.state.median_age_value}
              onChange={this.handleMedianAgeDropdownChange}
              options={[{value: '0-30', label: '<= 29'},
                        {value: '30-40', label: '30 - 39'},
                        {value: '40-50', label: '40 - 49'},
                        {value: '50-60', label: '50 - 59'},
                        {value: '60-100', label: '>= 60'}]}
            />
          </div>

          <div className='col-sm-2 filter-control'>
            <b>Sort:</b>
            <Select name='district-sort'
              value={this.state.sort_value}
              onChange={this.handleSortDropdownChange}
              options={[{value: 'state_asc', label: 'State (ASC)'},
                        {value: 'state_desc', label: 'State (DESC)'},
                        {value: 'population_asc', label: 'Population (ASC)'},
                        {value: 'population_desc', label: 'Population (DESC)'}]}
            />
          </div>

          <div className='col-sm-2 col-sm-offset-2 button-control'>
            <button className="btn btn-primary"
              onClick={this.handleFilterClicked}>
              Filter
            </button>

            <button className="btn btn-danger reset-button"
              onClick={this.handleResetClicked}>
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}
