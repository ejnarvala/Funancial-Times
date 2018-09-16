import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const API_KEY = 'RtMGAGKwM44YCUwC3XKK7u4n98n4Tfnv'
const limit = 10;
const GIF_URL = 'http://api.giphy.com/v1/gifs/search'


class EventCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gif_url: '',
        };
        this.fetchGif();
    }

    refreshGif = res => this.setState({gif_url: res.data[Math.floor(Math.random() * 10)].images.fixed_width.url})

    fetchGif(){
        console.log('fetch gif');
        if(this.props.event){
            console.log('fetch gif w event');
            var params = {
                api_key: API_KEY, 
                limit: limit,
                rating: "g",
                q: this.props.event.event_name,
            };
            var url = new URL(GIF_URL);
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            fetch(url,{
                mode: "cors", // no-cors, cors, *same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, same-origin, *omit
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer"
            })
            .then(res => res.json()).then(this.refreshGif)
            // .then(response => {
            //     this.setState({
            //         gif_url: response.data[Math.floor(Math.random() * 10)].images.fixed_width.url,
            //     });
            // })
            .catch(error=> console.error('Error: ', error));
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.event.event_name != prevProps.event.event_name){
            this.fetchGif();
        }
    }

    render(){
        return(
            <div>
            {
                <Card style={{height: "100%"}}>
                        {this.state.gif_url ? (<CardMedia style={{height: 0, paddingTop: '56.25%'}} image={this.state.gif_url} title={this.props.event.event_name}/>) : null}
                        <CardContent style={{backgroundColor: "#404040"}}>
                            <Typography gutterBottom variant="headline" style={{color: "white", fontFamily: "serif"}}>{this.props.event.event_name}</Typography>
                            <Typography variant="subheading" style={{color: "#DCDCDC", fontFamily: "serif"}}>{this.props.event.event_description}</Typography>
                            <Typography variant="subheading" style={{color: "darkGrey", fontFamily: "serif", fontSize: 15, textAlign: "right"}}>{this.props.event.event_date}</Typography>
                        </CardContent>

                </Card>
            }
            </div>
            )
    }

}


export default EventCard