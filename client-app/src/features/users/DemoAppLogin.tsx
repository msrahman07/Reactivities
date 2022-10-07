import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button} from 'semantic-ui-react'
import { UserFormValues } from '../../app/models/user'
import { useStore } from '../../app/stores/store'

const DemoAppLogin = () => {
    const { userStore } = useStore();


    const creds : UserFormValues = {
        email: 'bob@test.com',
        password: 'Pa$$w0rd',
    }
    const handleSubmit = () => {
        userStore.login(creds);
    }

    return (

        <Button 
            loading={userStore.loading} 
            content='Demo App' 
            type='submit' 
            onClick={handleSubmit} 
            inverted
            size='huge'
        />
    )
}

export default observer(DemoAppLogin)