﻿import React from 'react';
import Cookies from 'js-cookie';
import { Popup } from 'semantic-ui-react';
import moment from 'moment';
import { Card, Button, Icon, Segment, Label } from 'semantic-ui-react';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        //this.selectJob = this.selectJob.bind(this)
    }

    //selectJob(id) {
    //    var cookies = Cookies.get('talentAuthToken');
    //    //url: 'http://localhost:51689/listing/listing/closeJob',
    //}

    render() {
        return (
            <Card key={this.props.id}>
                <Card.Content>
                    <Card.Header>{this.props.title}</Card.Header>
                    <Label as='a' color='black' ribbon='right'><Icon name='user' />0 </Label>

                    <Card.Meta>{this.props.city}, {this.props.country}</Card.Meta>
                    <Card.Description>{this.props.summary}</Card.Description>
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

        );
    }
}