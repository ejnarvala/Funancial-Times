import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import EventCard from '../components/EventCard'

const KENSHO_URL = 'https://www.kensho.com/external/v1/get_calendar'
const KENSHO_TOKEN = 'Token ccc88aec966ac6982f202dedd8a1ecc8564db364'

class EventList extends Component {
    state = {
        events: [],
        start_date: '',
        end_date: '',
    }
    constructor() {
        super()
        // this.getEvents()
    }

    componentWillMount(){
        this.getEvents((this.state.start_date) ? this.state.start_date : null, (this.state.end_date) ? this.state.end_date : null);
    }

    getEvents = (startDate, endDate) => {
        var today = new Date();
        var end_date = (endDate) ? endDate : today.getUTCFullYear() + '-' + ('0' + (today.getUTCMonth() + 1)).slice(-2) + '-' + ('0' + today.getUTCDate()).slice(-2);
        var start_date = (startDate) ? startDate : today.getUTCFullYear() + '-' + ('0' + (today.getUTCMonth() + 1)).slice(-2) + '-' + ('0' + (today.getUTCDate() - 1)).slice(-2);
        
        var params = {
            start_date: start_date, 
            end_date: end_date,
        };

        var url = new URL(KENSHO_URL);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        // console.log(start_date, end_date);
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: KENSHO_TOKEN
            },
        }).then(res => res.json())
        .then(response => {
            // console.log(response);
            // console.log('EventList: ', response.data);
            if(response && response.data){
                this.setState({
                    events: response.data.slice(0,25),
                    start_date: start_date,
                    end_date: end_date,
                });
            }
            // console.log(response.data.slice(0,50));
        })
        .catch(error=> console.error('Error: ', error));
    }


    onEventInputStartChange = (event) => {
        console.log("Search start changed ...")
        this.setState({start_date: event.target.value});
        this.getEvents(event.target.value, this.state.end_date);
    }
    onEventInputEndChange = (event) => {
        console.log("Search end changed ...")
        // console.log(event.target.value)
        this.setState({end_date: event.target.value});
        this.getEvents(this.state.start_date, event.target.value);
    }

    render() {
        return (
            <div>
                { this.state.events ? (
                    <div>
                        <TextField style={{paddingTop: 100, paddingLeft: 50, fontWeight: "bold"}}
                            id="searchInput1"
                            margin="normal"
                            type="date"
                            defaultValue={(new Date()).getUTCFullYear() + '-' + ('0' + ((new Date()).getUTCMonth() + 1)).slice(-2) + '-' + ('0' + ((new Date()).getUTCDate() - 1)).slice(-2)}
                            onChange={this.onEventInputStartChange}
                            />
                        <TextField style={{paddingTop: 100, paddingLeft: 25, fontWeight: "bold"}}
                            id="searchInput2"
                            margin="normal"
                            type="date"
                            defaultValue={(new Date()).getUTCFullYear() + '-' + ('0' + ((new Date()).getUTCMonth() + 1)).slice(-2) + '-' + ('0' + (new Date()).getUTCDate()).slice(-2)}
                            onChange={this.onEventInputEndChange}
                            />

                        <Grid container
                        spacing={16} 
                        alignItems="baseline"
                        style={{padding: 24}}>
                            { this.state.events.map(currentEvent => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <EventCard event={currentEvent} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No events found" }
            </div>
        )
    }
}
export default EventList;
