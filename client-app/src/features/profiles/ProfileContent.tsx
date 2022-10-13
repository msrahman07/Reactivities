import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Dropdown, Segment, Tab } from 'semantic-ui-react'
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import ProfileAbout from './ProfileAbout';
import ProfileActivities from './ProfileActivities';
import ProfileFollowings from './ProfileFollowings';
import ProfilePhotos from './ProfilePhotos';

interface IProps {
    profile: Profile;
}

const ProfileContent = ({ profile }: IProps) => {
    const { profileStore, windowSizeStore: { windowSize } } = useStore();
    const [element, setElement] = useState<string>('About');

    const panes = [
        { menuItem: 'About', render: () => <Tab.Pane><ProfileAbout /></Tab.Pane> },
        { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} /> },
        { menuItem: 'Events', render: () => <ProfileActivities /> },
        { menuItem: 'Followers', render: () => <ProfileFollowings /> },
        { menuItem: 'Following', render: () => <ProfileFollowings /> },
    ];

    const options = [
        { key: 'about', text: 'About', value: 'About'},
        { key: 'photos', text: 'Photos', value: 'Photos'},
        { key: 'events',  text: 'Events',  value: 'Events' },
        { key: 'followers', text: 'Followers', value: 'Followers' },
        { key: 'following', text: 'Following', value: 'Following' },
    ];

    const elements:{[key: string]: JSX.Element} = {
        'About': <ProfileAbout />,
        'Photos': <ProfilePhotos profile={profile} />,
        'Events': <ProfileActivities />,
        'Followers': <ProfileFollowings />,
        'Following': <ProfileFollowings />,
    }

    return (
        <>
            {(windowSize.width >= 455) ?
                (
                    <Tab
                        menu={{ fluid: true, vertical: (windowSize.width >= 520) }}
                        menuPosition='right'
                        panes={panes}
                        onTabChange={(e, data) => { profileStore.setActiveTab(data.activeIndex) }}
                    />
                ) : (
                    <>
                    <Dropdown
                        placeholder={options[0].text}
                        fluid
                        selection
                        options={options}
                        onChange={(e) => {
                            setElement(e.currentTarget.innerText); 
                            if(e.currentTarget.innerText == 'Followers'){
                                profileStore.setActiveTab(3)
                            } else if(e.currentTarget.innerText == 'Following'){
                                profileStore.setActiveTab(4)
                            }
                        }}
                    />
                    <Segment>
                        {elements[element]}
                    </Segment>
                    </>
                )
            }
        </>

    )
}

export default observer(ProfileContent)