import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityListItemAttendee from '../dashboard/ActivityListItemAttendee';
import ActivityAttendeeMobileView from './ActivityAttendeeMobileView';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

const ActivityDetails = () => {
    const { activityStore, windowSizeStore: { windowSize } } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial, clearSelectedActivity } = activityStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadActivity(id);
        return () => {
            clearSelectedActivity();
        }
    }, [id, loadActivity, clearSelectedActivity])

    if (loadingInitial || !activity) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={(windowSize.width >= 675) ? "10" : "16"}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                {(windowSize.width < 675) &&
                <ActivityAttendeeMobileView activity={activity}/>}
                <ActivityDetailedChat activityId={activity.id} />
            </Grid.Column>
            {(windowSize.width >= 675) &&
                (<Grid.Column width="6">
                    <ActivityDetailedSidebar activity={activity!} />
                </Grid.Column>)
            }

        </Grid>
    )
}

export default observer(ActivityDetails)