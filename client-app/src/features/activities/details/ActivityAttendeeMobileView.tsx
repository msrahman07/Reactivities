import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Activity } from '../../../app/models/activity'

interface IProps {
    activity: Activity;
}

export default observer(function ActivityAttendeeMobileView({ activity: { attendees, host } }: IProps) {
    if (!attendees) return null;
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {attendees.length} {attendees.length === 1 ? 'Person' : 'Persons'} going
            </Segment>
            <Segment attached>
                <List style={{height: '150px', overflow:'hidden', overflowY:'scroll'}} relaxed divided >
                    {attendees.map(attendee => (
                        <Item style={{position: 'relative' }} key={attendee.username}>
                            {attendee.username === host?.username &&
                                <Label
                                    style={{ position: 'absolute', zIndex: 1000, marginLeft: '-50px' }}
                                    color='orange'
                                    ribbon='right'
                                >
                                    Host
                                </Label>
                            }
                            <Image size='tiny' src={attendee.image || '/assets/user.png'} />
                            <Item.Content>
                                <Item.Header as='h3'>
                                    <Link to={`/profiles/${attendee.username}`}>{attendee.displayName}</Link>
                                </Item.Header>
                                {attendee.following && 
                                    <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                                }
                            </Item.Content>
                        </Item>
                    ))}
                </List>
            </Segment>
        </>

    )
})