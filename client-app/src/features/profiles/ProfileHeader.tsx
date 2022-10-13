import { observer } from 'mobx-react-lite'
import React from 'react'
import { Divider, Grid, Header, Item, Segment, Statistic } from 'semantic-ui-react'
import { Profile } from '../../app/models/profile'
import { useStore } from '../../app/stores/store';
import FollowButton from './FollowButton';

interface IProps {
    profile: Profile;
}

const ProfileHeader = ({ profile }: IProps) => {
    const { windowSizeStore: { windowSize } } = useStore();
    return (
        <Segment>
            <Grid>
                <Grid.Column width={windowSize.width >= 600 ? "12" : "16"}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={profile.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' content={profile.displayName} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={windowSize.width >= 600 ? "4" : "16"}>
                    <Statistic.Group widths={2}>
                        <Statistic label='Followers' value={profile.followersCount} />
                        <Statistic label='Following' value={profile.followingCount} />
                    </Statistic.Group>
                    <Divider />
                    <FollowButton profile={profile} />
                </Grid.Column>
            </Grid>
        </Segment>
    )
}

export default observer(ProfileHeader)