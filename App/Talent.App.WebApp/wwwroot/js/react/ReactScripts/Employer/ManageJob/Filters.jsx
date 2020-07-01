import React from "react";
import { Form, Icon, Dropdown } from "semantic-ui-react";

//const filterOptions = [
//    { key: "a", text: "Active Jobs", value: "showActive" },
//    { key: "c", text: "Closed Jobs", value: "showClosed" },
//    { key: "e", text: "Expired Jobs", value: "showExpired" },
//    { key: "u", text: "Unexpired Jobs", value: "showUnexpired" }
//];
const filterOptions = [
    { key: 'Choose Filter', text: 'Choose Filter', value: 'Choose Filter' },
    { key: 'showActive', text: 'Active Jobs', value: 'showActive' },
    { key: 'showClosed', text: 'Closed Jobs', value: 'showClosed' },
    { key: 'showExpired', text: 'Expired Jobs', value: 'showExpired' },
    { key: 'showUnexpired', text: 'Unexpired Jobs', value: 'showUnexpired' }];

const optionsByDate = [
    { key: "a", text: "Newest First", value: "desc" },
    { key: "c", text: "Lastest First", value: "asc" }
];

export class Filters extends React.Component {
    constructor(props) {
        super(props);
        //this.selectJob = this.selectJob.bind(this);
    }
    render() {
        return (
            <div className="ui container">
                <span>           
                    <Icon name='filter' />
                    Filter:
                    <Dropdown inline
                        options={filterOptions}
                        onChange={this.props.handleFilterChange}
                    />
                </span>
                <span>
                    <Icon name='calendar alternate' />
                    Sort by date:
                    <Dropdown inline
                        options={optionsByDate}
                        onChange={this.props.handleFilterChange}
                    />
                </span>
                <br /> <br />
            </div>
            
        )
    }
}