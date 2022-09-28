import React from 'react'
import { Message } from 'semantic-ui-react';

interface IProps {
    errors: any;
}

const ValidationErrors = ({errors}: IProps) => {
  return (
    <Message error>
        {errors &&
            <Message.List>
                {errors.map((err:any, i:any) => (
                    <Message.Item key={i}>
                        {err}
                    </Message.Item>
                ))}
            </Message.List>
        }
    </Message>
  )
}

export default ValidationErrors