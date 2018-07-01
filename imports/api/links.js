import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'simpl-schema/dist/SimpleSchema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
    Meteor.publish('links', function () {
        return Links.find({userId: this.userId});
    });
}


// resource.action
Meteor.methods({
    'links.insert'(url) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        new SimpleSchema({
            url: {
                type: String,
                label: 'Your link',
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({ url });
        
        Links.insert({
            _id: shortid.generate(), 
            url, 
            userId: this.userId, 
            visible: true,
            visitedCount: 0,
            lastVisitedAt: null
        });
    },
     
    'links.setVisibility'(_id, visible) {
        console.log('setvisibility', this.userId);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        new SimpleSchema({
            _id: {
                type: String,
                min: 1, 
                label: 'The id of the link'
            },
            visible: {
                type: Boolean
            }
        }).validate({ _id, visible });

        Links.update({'_id': _id}, {$set: {'visible': visible }});
    },

    'links.trackVisit'(_id) {
        new SimpleSchema({
            _id: {
                type: String,
                min: 1,
                label: 'The id of the link'
            }
        }).validate({ _id });
        Links.update({ _id }, { 
            $set: { 
                lastVisitedAt: new Date().getTime()
            },
            $inc: { 
                visitedCount: 1
            }
        });
        
    }
});
