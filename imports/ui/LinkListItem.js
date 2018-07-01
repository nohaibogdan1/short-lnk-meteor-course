import { Meteor } from 'meteor/meteor';
import React from 'react';
import { PropTypes } from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';




export default class LinkListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            justCopied: false
        };
    }

    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard.on('success', () => {
            console.log('It worked');
            this.setState(() => ({justCopied: true}));
            setTimeout(() => {this.setState(() => ({justCopied: false}))}, 1000);
        }).on('error', () => {
            console.log('Unable to copy');
        });
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    renderStats() {
        const visitMessage = this.props.visitedCount > 1 ? 'visits' : 'visit';
        let visitedMessage = null;
        
        if (typeof this.props.lastVisitedAt === 'number') {
            let lastVisitedTime = moment(this.props.lastVisitedAt).fromNow();
            visitedMessage = `(visited ${lastVisitedTime})`;
        }

        return <p>{this.props.visitedCount} {visitMessage} {visitedMessage}</p>;
    }

    render() {
        return (
            <div className="item">
                <h2>{this.props.url}</h2>
                <p className="item__message">{this.props.shortUrl}</p>
                {this.renderStats()}
                <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>{this.state.justCopied ? 'copied' : 'copy'}</button>
                <button className="button button--pill" ref="visible" onClick={
                    () => {
                        console.log(this.props.visible);
                        Meteor.call('links.setVisibility',this.props._id , !this.props.visible, (err, res) => {

                        })}
                    }
                >
                    {this.props.visible ? 'Hide' : 'Unhide'}
                </button>
                <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">Visit</a>
            </div>
        );    
    }
};

LinkListItem.propTypes = {
    url: PropTypes.string.isRequired, 
    userId: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number
}

