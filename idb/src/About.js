import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { RingLoader } from 'react-spinners';
import Members from './Members'

var request = require("request");

export default class About extends Component {
	constructor(props){
		super(props)
		this.state = {
			ready: false,
			total_commits: 0,
			error: false,
			total_issues: 0,
			swe_member_data: {}
		}
	}
	componentWillMount(){
		this.setState({ready: false})

		var options = { method: 'GET',
		url: 'https://api.github.com/repos/WeTheSWEople/SWEThePeople/stats/contributors'}
		request(options, function (error, response, body) {
			if(error){
				this.setState({error: true, ready: true})
			}
			var swe_members = {}
			swe_members['MTirtowidjojo'] = ['Michael Tirtowidjojo', 0,0, 0,"Michael is a third-year CS student who trains in Taekwondo and enjoys reading World War II stories.", "Michael.png"]
			swe_members['copperstick6'] = ["William Han",0,0, 0, "William is a sophomore CS student who enjoys the subtle art of memes and hackathons.", "William.jpg"]
			swe_members['raulcodes'] = ['Raul Camacho', 0,0, 0, "Raul is a senior CS major who will be graduating this semester. Also he's tall. Probably too tall.", "Raul.png"]
			swe_members['minwoo0jo'] = ['Minwoo Jo', 0,0, 0, "Minwoo is a fourth year student currently pursuing a BSA in CS. He enjoys studying foreign languages and competing in video game tournaments in his free time.", 'Minwoo.jpg']
			swe_members['bzsinger'] = ['Benjamin Singer', 0,0, 0, "Benny is a third-year CS student who enjoys iOS development, reading, and following current events.", "Benny.jpg"]
			swe_members['palakhirpara'] = ['Palakkumar Hirpara', 0, 0, 0, "Palak is a senior who will be graduating this semester with BSCS and likes watching cricket.", "Palak.png"]
			var commit_json = JSON.parse(body)
			var total_commits = 0
			for(var i = 0; i < commit_json.length; i++){
				var cur_user_count = commit_json[i]["total"]
				swe_members[String(commit_json[i]["author"]["login"])][1] = cur_user_count
				total_commits += commit_json[i]["total"]

			}
			this.setState({total_commits: total_commits})
			var options = { method: 'GET',
			  url: 'https://api.github.com/repos/WeTheSWEople/SWEThePeople/issues?state=all',
			  qs: { state: 'all' },
			  };

			request(options, function (error, response, body) {
			  if(error){
				  this.setState({error: true, ready: true})
			  }
			 var issue_json = JSON.parse(body)
			 for(var i = 0; i < issue_json.length; i++){
				 var current_author = issue_json[i]["user"]["login"]
				 swe_members[String(issue_json[i]["user"]["login"])][2] += 1
			 }
			 this.setState({swe_member_data: swe_members, total_issues: issue_json.length, ready: true})
		  }.bind(this));

	  }.bind(this));

	}
  render() {
	  let calls_ready = null
	  let members = null
	  if(this.state.ready){
		  calls_ready = <h4>Total Commits: {this.state.total_commits} <br />Total Issues: {this.state.total_issues} <br />Total Unit tests: 0</h4>
		  members = <Members swe_data = {this.state.swe_member_data} />
	  }

    return (
      <div className="App">
			<header className="About-header-white">
      </header>
      <h2>WeTheSWEople Present: </h2>
      <h3>SWEThePeople.me</h3>
      <h4>SWEThePeople provides information and resources for anyone interested in the members of United States House of Representatives. This site provides information about representatives, their districts, and parties.</h4>
      <h4>The site combines information about legislators with U.S. Census data, providing visitors with a better understanding of the intersection between party, state, and socioeconomics.</h4>
      <center><RingLoader
        color={'#123abc'}
        loading={!this.state.ready}
      /></center>
      {calls_ready}
      {members}
      <p><u><a href = "https://github.com/WeTheSWEople/SWEThePeople/">Link to the GitHub Repo</a></u></p>
      <h2>Data Sources </h2>
      <p><a href = "https://github.com/WeTheSWEople/SWEThePeople/">Link to the GitHub Repo</a></p>
      <h3>Source 1: ProPublica </h3>
      <p>Link: <u><a href = "https://projects.propublica.org/api-docs/congress-api/">ProPublica</a></u></p>
      <p>Description: Used to get information about all of U.S. representatives, their party, and corresponding districts  </p> 

      <h3>Source 2: GovTrack </h3>
      <p>Link: <u><a href = "https://www.govtrack.us/developers/api">GovTrack</a></u></p>
      <p>Description: Used to get information about recent bills sponsored by each representatives and their current status </p> 

      <h3>Source 3: United States Bureau</h3>
      <p>Link: <u><a href = "https://www.census.gov/data/developers/data-sets/decennial-census.html">United States Bureau</a></u></p>
      <p>Description: Used to get socioeconomics information based on either states or districts from the census </p>

      <h3>Source 4: TheUnitedStates.io</h3>
      <p>Link: <u><a href = "https://theunitedstates.io/images/congress/">TheUnitedStates.io</a></u></p>
      <p>Description: Used to get images of representatives based on their bioguide id </p> 







      </div>
    );
  }
}
