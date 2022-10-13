import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Button, Divider, Icon, Image, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityListItemAttendee from './ActivityListItemAttendee';

interface IProps {
    activity: Activity
}
const activityImageStyle = {
    filter: 'brightness(30%)',
};

const ActivityListItem = ({ activity }: IProps) => {
    return (
        <Segment.Group>
            <Segment style={{paddingLeft: '0',paddingTop: '0', paddingRight: '0'}}>
                {activity.isCalcelled && (
                    <Label
                        attached='top'
                        color='red'
                        content='Cancelled'
                        style={{ textAlign: 'center' }}
                    />
                )}
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />

                <Item.Group style={{paddingLeft: '14px'}}>
                    <Item>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                <Item.Image
                                    style={{ marginBottom: 5 }}
                                    size='mini' circular src={activity.host?.image || '/assets/user.png'} /> {'  '}
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted by <Link to={`/profiles/${activity.host?.username}`}>{activity.host?.displayName}</Link></Item.Description>
                            {activity.isHost && (
                                <Item.Description>
                                    <Label basic color='orange'>
                                        You are hosting this activity
                                    </Label>
                                </Item.Description>
                            )}
                            {activity.isGoing && !activity.isHost && (
                                <Item.Description>
                                    <Label basic color='green'>
                                        You are going to this activity
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(activity.date!, 'dd MMMM yyyy h:mm aa')} {" "}
                    <Icon name='marker' /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                <ActivityListItemAttendee attendees={activity.attendees!} />
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}

export default ActivityListItem