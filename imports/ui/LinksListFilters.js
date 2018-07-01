import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinksListFilters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showVisible: true
        };
    }

    componentDidMount() {
        this.tracker = Tracker.autorun(() => {
            const showVisible = Session.get('showVisible');
            this.setState(() => ({ showVisible }));
        });
    }

    componentWillUnmount() {
        this.tracker.stop();
    }

    render(){
        return (
            <div>
                <label className="checkbox">
                    <input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={(e) => {
                        console.log('in onChange:', e.target.checked);
                        Session.set('showVisible', !e.target.checked);
                        console.log('bla');
                    }}/>
                    show hidden links
                </label>
            </div>
        );    
    }
};
