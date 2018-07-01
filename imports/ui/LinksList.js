import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';


import { Links } from '../api/links';

import LinkListItem from './LinkListItem';

export default class LinksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
    }

    componentDidMount() {
        console.log('componentDidMount LinksList');
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links');
            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState(() => ({ links }));
        });
    }

    componentWillUnmount() {
        console.log('componentWillUnmount LinksList');
        this.linksTracker.stop();
    }
    
    renderLinksListItems() {
        if (this.state.links.length == 0) {
            return <div className="item"><p className="item__status-message">No links found.</p></div>
        }

        return this.state.links.map((link) => {
            const shortUrl  = Meteor.absoluteUrl(link._id);
            return <LinkListItem key={link._id} shortUrl={shortUrl} {...link}/>
        });
    }

    render() {
        return (
            <div> 
                <div>{this.renderLinksListItems()}</div>
            </div>
        );
    }
};