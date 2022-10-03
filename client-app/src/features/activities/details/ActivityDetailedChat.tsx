import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Segment, Header, Comment, Button } from 'semantic-ui-react'
import CommonTextArea from '../../../app/common/form/CommonTextArea';
import { useStore } from '../../../app/stores/store';


interface IProps {
    activityId: string;
}

export default observer(function ActivityDetailedChat({ activityId }: IProps) {
    const { commentStore } = useStore();
    useEffect(() => {
        if (activityId) {
            commentStore.createHubConnection(activityId);
        }
        return () => {
            commentStore.clearComment();
        }
    }, [commentStore, activityId]);


    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached clearing>
                <Comment.Group>
                    {commentStore.comments.map(comment => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.image || '/assets/user.png'} />
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                                    {comment.username}
                                </Comment.Author>
                                <Comment.Metadata>
                                    {/* <div>{comment.createdAt}</div> */}
                                </Comment.Metadata>
                                <Comment.Text>{comment.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}

                    <Formik
                        onSubmit={(values, { resetForm }) =>
                            commentStore.addComment(values).then(() => resetForm())}
                        initialValues={{ body: '' }}
                    >
                        {({ isSubmitting, isValid }) => (
                            <Form className='ui form'>
                                <CommonTextArea placeholder='Add comment' name='body' rows={2} />
                                <Button
                                    loading={isSubmitting}
                                    disabled={isSubmitting || !isValid}
                                    content='Add Reply'
                                    labelPosition='left'
                                    icon='edit'
                                    primary
                                    type='submit'
                                    floated='right'
                                />
                            </Form>
                        )}
                    </Formik>


                </Comment.Group>
            </Segment>
        </>

    )
})