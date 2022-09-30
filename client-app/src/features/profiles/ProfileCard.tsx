import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
import { IProfile } from '../../app/models/profile'

interface IProps {
    profile: IProfile;
}

const ProfileCard = ({profile} : IProps) => {
  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
        <Image src={profile.image || '/assets/user.png'} />
        <Card.Content>
            <Card.Header>{profile.displayName}</Card.Header>
            <Card.Description>Bio goes here</Card.Description>
        </Card.Content>
        <Card.Content>
            <Icon name='user' />
            20 followers
        </Card.Content>
    </Card>
  )
}

export default observer(ProfileCard)