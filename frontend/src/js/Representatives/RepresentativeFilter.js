/* eslint-disable no-unused-vars */
import React, {Component} from 'react'
import {GridList} from 'material-ui/GridList'
import {RingLoader} from 'react-spinners'
import Select from 'react-select'
/* eslint-disable no-unused-vars */

import '../../assets/css/Filter.css'
import 'react-select/dist/react-select.css'

export default class RepresentativeFilter extends Component {
  constructor (props) {
    super(props)

    let partyArr = []
    Object.keys(this.props.parties).forEach((partyID) =>
      partyArr.push({value: partyID, label: this.props.parties[partyID][0]})
    )

    let stateArr = []
    Object.keys(this.props.states).forEach((key) =>
      stateArr.push({
        value: this.props.states[key],
        label: this.props.states[key]})
    )

    this.state = {
      state_value: null,
      party_value: null,
      vote_value: null,
      lastname_value: null,
      sort_value: null,
      all_parties: partyArr,
      all_states: stateArr
    }

    this.handleStateDropdownChange = this.handleStateDropdownChange.bind(this)
    this.handlePartyDropdownChange = this.handlePartyDropdownChange.bind(this)
    this.handleVoteDropdownChange = this.handleVoteDropdownChange.bind(this)
    this.handleLastnameDropdownChange = this.handleLastnameDropdownChange.bind(
      this)
    this.handleSortDropdownChange = this.handleSortDropdownChange.bind(this)
    this.handleFilterClicked = this.handleFilterClicked.bind(this)
    this.handleResetClicked = this.handleResetClicked.bind(this)
  }

  handleStateDropdownChange (selectedOption) {
    this.setState({state_value: selectedOption})
  }

  handlePartyDropdownChange (selectedOption) {
    this.setState({party_value: selectedOption})
  }

  handleVoteDropdownChange (selectedOption) {
    this.setState({vote_value: selectedOption})
  }

  handleLastnameDropdownChange (selectedOption) {
    this.setState({lastname_value: selectedOption})
  }

  handleSortDropdownChange (selectedOption) {
    this.setState({sort_value: selectedOption})
  }

  handleFilterClicked (e) {
    let state = 'None'
    if (this.state.state_value !== null) {
      state = this.state.state_value.value
    }

    let party = 'None'
    if (this.state.party_value !== null) {
      party = this.state.party_value.value
    }

    let votes = 'None'
    if (this.state.vote_value !== null) {
      votes = this.state.vote_value.value
    }

    let lastname = 'A-Z'
    if (this.state.lastname_value !== null) {
      lastname = this.state.lastname_value.value
    }

    let sort = 'last_asc'
    if (this.state.sort_value !== null) {
      sort = this.state.sort_value.value
    }

    this.props.buttonHandler(state, party, votes, lastname, sort)
  }

  handleResetClicked (e) {
    this.setState({
      state_value: null,
      party_value: null,
      vote_value: null,
      lastname_value: null,
      sort_value: null
    })
    this.props.buttonHandler('None', 'None', 'None', 'A-Z', 'last_asc')
  }

  render () {
    return (
      <div style={{marginLeft: '6%', marginRight: '5%', width: '90%'}}>
        <div className='filter-component row'>
          <div className='col-sm-2 filter-control'>
            <b>Filter State:</b>
            <Select name='rep-state'
              value={this.state.state_value}
              onChange={this.handleStateDropdownChange}
              options={this.state.all_states}
            />
          </div>

          <div className='col-sm-2 filter-control'>
            <b>Filter Party:</b>
            <Select name='rep-party'
              value={this.state.party_value}
              onChange={this.handlePartyDropdownChange}
              options={this.state.all_parties}
            />
          </div>

          <div className='col-sm-2 filter-control'>
            <b>Filter Votes:</b>
            <Select name='rep-votes'
              value={this.state.vote_value}
              onChange={this.handleVoteDropdownChange}
              options={[{value: '50-59', label: '50 - 59.99%'},
                {value: '60-69', label: '60 - 69.99%'},
                {value: '70-79', label: '70 - 79.99%'},
                {value: '80-89', label: '80 - 89.99%'},
                {value: '90-100', label: '90 - 100%'}]}
            />
          </div>

          <div className='col-sm-2 filter-control'>
            <b>Filter last names:</b>
            <Select name='rep-lastname'
              value={this.state.lastname_value}
              onChange={this.handleLastnameDropdownChange}
              options={[{value: 'A-L', label: 'A-L'},
                {value: 'M-Z', label: 'M-Z'}]}
            />
          </div>

          <div className='col-sm-2 sort-control'>
            <b>Sort:</b>
            <Select name='rep-lastname'
              value={this.state.sort_value}
              onChange={this.handleSortDropdownChange}
              options={[{value: 'last_asc', label: 'Last name (ASC)'},
                {value: 'last_desc', label: 'Last name (DESC)'},
                {value: 'votes_pct_asc', label: 'Votes with party (ASC)'},
                {value: 'votes_pct_desc', label: 'Votes with party (DESC)'}]}
            />
          </div>

          <div className='col-sm-2 button-control'>
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
