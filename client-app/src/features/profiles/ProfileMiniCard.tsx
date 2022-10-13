import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile'
import FollowButton from './FollowButton';

interface IProps {
  profile: Profile;
}

const ProfileMiniCard = ({ profile }: IProps) => {
  function truncate(str: string | undefined) {
    if (str) {
      return str.length > 40 ? str.substring(0, 37) + '...' : str;
    }
  }
  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={profile.image || '/assets/user.png'}
        />
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Meta><Icon name='user' />
        {profile.followersCount} {(profile.followersCount>1)? " followers":" follower"}</Card.Meta>
        <Card.Description>
        {truncate(profile.bio)}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
        <FollowButton profile={profile} />
        </div>
      </Card.Content>
    </Card>
    // <Card as={Link} to={`/profiles/${profile.username}`}>
    //   <Image src={profile.image || '/assets/user.png'} />
    //   <Card.Content>
    //     <Card.Header>{profile.displayName}</Card.Header>
    //     <Card.Description>{truncate(profile.bio)}</Card.Description>
    //   </Card.Content>
    //   <Card.Content>
    //     <Icon name='user' />
    //     {profile.followersCount} followers
    //   </Card.Content>
    //   <FollowButton profile={profile} />
    // </Card>
  )
}

export default observer(ProfileMiniCard)