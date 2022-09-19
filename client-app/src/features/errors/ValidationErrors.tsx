import React from 'react'
import { Message } from 'semantic-ui-react';

interface IProps {
    errors: string[] | null;
}

const ValidationErrors = ({errors}: IProps) => {
  return (
    <Message error>
        {errors &&
            <Message.List>
                {errors.map((err, i) => (
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