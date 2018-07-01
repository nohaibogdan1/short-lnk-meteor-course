import React from 'react';
import Modal  from 'react-modal';
import { Meteor } from 'meteor/meteor';


export default class AddLink extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            modalIsOpen: false,
            error: ''
        };
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    onSubmit(e) {
        const url = this.state.url.trim();
        e.preventDefault();
        
        Meteor.call('links.insert', url, (err, res) => {
            if (!err) {
               this.closeModal();
            } else {
                this.setState(() => ({ error: err.reason }));
            }
        });
    
        this.refs.url.value = '';
    }

    onChange(e) {
        const text = e.target.value;
        this.setState(() => ({ url: text }));
    }

    openModal() {
        this.setState(() => ({ modalIsOpen: true }));
    }

    closeModal() {
        this.setState(() => ({ url:'', modalIsOpen: false, error: '' }));
    }
    
    
    render() {
        return (
            <div>
                <button className="button" onClick={this.openModal.bind(this)}>+ Add Link</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Add link"
                    onRequestClose={this.closeModal.bind(this)}
                    onAfterOpen={() => this.refs.url.focus()}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                    >
                    <h1>Add Link</h1>
                    <p>{this.state.error ? <p>{this.state.error} </p> : undefined}</p>
                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
                        <input 
                            type="text" 
                            ref="url" 
                            placeholder="url" 
                            value={this.state.url}
                            onChange={this.onChange.bind(this)}/>
                        <button  className="button">Add Link</button>
                        <button type="button" className="button button--secondary" onClick={this.closeModal.bind(this)}>Cancel</button>                    
                    </form>
                    
                </Modal>
            </div>
        );
    }
}