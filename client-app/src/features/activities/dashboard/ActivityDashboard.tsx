import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Button, Divider, Grid, Loader } from 'semantic-ui-react'
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import ActivityFilters from './ActivityFilters';
import ActivityList from './ActivityList';
// import InfiniteScroll from 'react-infinite-scroll-component';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';
import { Link } from 'react-router-dom';

const ActivityDashboard = () => {
    const { activityStore, windowSizeStore: { windowSize, setWindowSize }, modalStore } = useStore();
    const { loadActivities, activityRegistry, setPagingParams, pagination } = activityStore;
    const [loadingNext, setLoadingNext] = useState(false);


    const handleGetNext = () => {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadActivities().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (activityRegistry.size <= 1) {
            loadActivities();
        }
    }, [activityRegistry.size, loadActivities, window.innerWidth, window.innerHeight])


    return (
        <>
            {windowSize.width < 750 &&
                (<>
                    <Button
                        onClick={() => modalStore.openModal(<ActivityFilters />)}
                        inverted color='blue' content='Filter'
                    />
                    <Button floated='right' positive color='teal' as={Link} to='/createActivity' content='Create New Activity' />

                    <Divider />
                </>
                )
            }
            <Grid>


                <Grid.Column width={windowSize.width >= 750 ? '10' : '16'}>
                    {activityStore.loadingInitial && !loadingNext ? (
                        <>
                            <ActivityListItemPlaceholder />
                            <ActivityListItemPlaceholder />
                            <ActivityListItemPlaceholder />
                        </>
                    ) : (
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={handleGetNext}
                            hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                            initialLoad={false}
                        >
                            <ActivityList />
                        </InfiniteScroll>
                    )}

                </Grid.Column>
                {windowSize.width >= 750 && (
                    <>
                        <Grid.Column width="6">
                            <ActivityFilters />
                            <Divider />
                            <Button fluid positive size='large' color='teal' as={Link} to='/createActivity' content='Create New Activity' />

                        </Grid.Column>

                    </>
                )
                }

                <Grid.Column width={windowSize.width >= 750 ? '10' : '16'}>
                    <Loader active={loadingNext} />
                </Grid.Column>
            </Grid>
        </>


    )
}

export default observer(ActivityDashboard)