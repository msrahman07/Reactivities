import { observer } from 'mobx-react-lite'
import React from 'react'
import { Card, Grid, Header, Tab } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store'
import ProfileCard from './ProfileCard';
import ProfileMiniCard from './ProfileMiniCard';

const ProfileFollowings = () => {
    const { profileStore:
        { profile, followings, loadingFollowings, activeTab }, windowSizeStore:{windowSize} } = useStore();
    

    return (
        <Tab.Pane loading={loadingFollowings}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='user' 
                        content={activeTab ===3 ? `People following ${profile?.displayName}` : `People ${profile?.displayName} is following`}/>
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group style={{height: '200px', overflowY:'scroll'}} itemsPerRow={1} >
                        {followings.map(profile => (
                            <ProfileMiniCard key={profile.username} profile={profile}/>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}

export default observer(ProfileFollowings)