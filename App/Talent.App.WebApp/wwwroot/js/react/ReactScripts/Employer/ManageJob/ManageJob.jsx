﻿import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { JobPagination } from './Pagination.jsx';
import { EditJob } from './EditJob.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment, Header, Card, Label, Button } from 'semantic-ui-react';
import CreateJob from '../CreateJob/CreateJob.jsx';
import { TALENT_SERVICES_TALENT } from "../../HostsUrl.jsx";


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
                showClosed: true,
                showDraft: false,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: "",
            id:'',
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleCalendarChange = this.handleCalendarChange.bind(this);
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
        //this.handleEdit = this.handleEdit.bind(this);
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
        //var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var link = TALENT_SERVICES_TALENT +'/listing/listing/getSortedEmployerJobs';
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
        console.log('showActive:', this.state.filter.showActive);
        console.log('showDraft:', this.state.filter.showDraft);
        console.log('showClosed:', this.state.filter.showClosed);
        console.log('showExpired:', this.state.filter.showExpired);
        console.log('showUnexpired:', this.state.filter.showUnexpired);

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

    //handle filter change
    handleFilterChange(e, { value }) {
        let filters = {};
        //filter["showActive"] = true;
        //filter["showClosed"] = true;
        //filter["showExpired"] = true;
        //filter["showUnexpired"] = true;
        //filter["showDraft"] = false;
       
            filters["showActive"] = false;
            filters["showClosed"] = false;
            filters["showExpired"] = false;
            filters["showUnexpired"] = false;
            filters["showDraft"] = false;
            filters[value] = true;
        this.setState({
            filter: filters, sortBy: {date: 'desc'}, activePage: 1 }, function () {
                this.loadData();
            });
            
        

       
        
    }
    handleCalendarChange(e, { value }){
        let sortBy = {};
        let filters = {};
        sortBy["date"] = value;
       
        filters["showActive"] = true;
        filters["showClosed"] = true;
        filters["showExpired"] = true;
        filters["showUnexpired"] = true;
        filters["showDraft"] = false;
        this.setState({ sortBy: sortBy, filter: filters, activePage: 1 },
            function () { this.loadData();
         
        });
    }

    handlePaginationChange(e, { activePage }) {
        this.setState({ activePage: activePage }, function () {
            this.loadData();
        });
    }
    //handleEdit(event, { id}) {
    //    <EditJob
    //        params={id}
    //        />;
    //}
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
                                <Button className="ui blue basic" onClick={() =>  <CreateJob /> }>
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
        

        const filterOptions = [
            //{ key: 'Choose Filter', text: 'Choose Filter', value: 'Choose Filter' },
            //{ key: 'showAll', text: 'All Jobs', value: 'AllJobs' },
            { key: 'showActive', text: 'Active Jobs', value: 'showActive' },
            { key: 'showClosed', text: 'Closed Jobs', value: 'showClosed' },
            { key: 'showExpired', text: 'Expired Jobs', value: 'showExpired' },
            { key: 'showUnexpired', text: 'Unexpired Jobs', value: 'showUnexpired' }
        ];
        const sortOptions = [
            { key: 'newestJobs', text: 'Newest First', value: 'asc' },
            { key: 'oldestJobs', text: 'Oldest First', value: 'desc' }
        ];
     
        
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container">
                    <h1>List of Jobs</h1>
                    <span>
                        <Icon name='filter' />
                        Filter :
                        <Dropdown inline
                            placeholder="Filter by Status"
                            options={filterOptions}
                            onChange={this.handleFilterChange}
                        />
                    </span>
                    <span> </span>
                    <span>
                        <Icon name='calendar alternate' />
                        Sort by date:
                        <Dropdown inline    
                            placeholder="Filter by Date"
                            options={sortOptions}
                            onChange={this.handleCalendarChange}
                        />
                    </span>
                    <br/> 
                    <Card.Group itemsPerRow={2}>
                        {jobDetails}                         
                    </Card.Group>       
                    <JobPagination
                        handlePaginationChange={this.handlePaginationChange}
                        activePage={this.state.activePage}
                        totalPages={this.state.totalPages}
                    /> 
                </div>
            </BodyWrapper>
        )
    }
}