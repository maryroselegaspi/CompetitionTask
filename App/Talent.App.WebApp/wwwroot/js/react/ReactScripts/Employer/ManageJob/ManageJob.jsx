import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment, Header, Card, Label, Button } from 'semantic-ui-react';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here
    };

    init() {
        //let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        //loaderData.isLoading = false;
        //this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)
        
        //console.log(this.state.loaderData)

        this.loadData(() => {
            let loaderData = TalentUtil.deepCopy(this.state.loaderData)
            loaderData.isLoading = false;
            this.setState({ loaderData });
        });
    }

    componentDidMount() {
        this.init();
    };

    loadData(callback) {
        var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        //your ajax call and other logic goes here
        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            data: {
                activePage: this.state.activePage,
                sortbyDate: this.state.sortBy.date,
                showActive: this.state.filter.showActive,
                showClosed: this.state.filter.showClosed,
                showDraft: this.state.filter.showDraft,
                showExpired: this.state.filter.showExpired,
                showUnexpired: this.state.filter.showUnexpired
            },
            success: function (res) {
                if (res.myJobs) {
                    this.state.loadJobs = res.myJobs;
                    console.log("loadJobs Get", this.state.loadJobs);
                }
                console.log("result Jobs", this.state.loadJobs);
                callback();
            }.bind(this),
            error: function (res) {
                console.log(res.status);
                callback();
            }
        })
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    render() {
        let listofJobs = this.state.loadJobs;
        console.log('listofJobs render: ', listofJobs);
        let jobDetails = '';

        if (listofJobs.length > 0) 
              jobDetails = listofJobs.map(item => {
                return (
                    <Card key={item.id}>
                        <Card.Content>
                            <Card.Header>{item.title}</Card.Header>
                            <Label as='a' color='black' ribbon='right'><Icon name='user' />0 </Label>
                            <Card.Meta>
                                {item.location.city}, { }
                                {item.location.country}
                            </Card.Meta>
                            <Card.Description>{item.summary}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button color='red' floated='left' size='mini'>Expired</Button>
                            <Button.Group floated='right' size='mini' >
                                <Button className="ui blue basic">
                                    <Icon name='ban' />
                                Close
                                </Button>
                                <Button className="ui blue basic">
                                    <Icon name='edit' />
                                Edit
                                </Button>
                                <Button className="ui blue basic">
                                    <Icon name='copy outline' />
                                    Copy
                                </Button>
                            </Button.Group>
                        </Card.Content>
                    </Card>
                    
                    
                    )

        })

               
                
            
        
        else {
             jobDetails =<div> No Jobs Found</div>;
            console.log("jobDetails in else:", jobDetails);
        }
        
            //: jobDetails = <div> No Jobs. Please come back later!</div>
            //    console.log("jobdetails null:", jobDetails)
     
        
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container">
                    <h1>List of Jobs</h1>
                    <Card.Group itemsPerRow={2}>
                        {jobDetails}                         
                    </Card.Group>       
                </div>
            </BodyWrapper>
        )
    }
}