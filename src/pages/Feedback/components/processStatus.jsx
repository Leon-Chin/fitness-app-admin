import React, { useState } from 'react'
import { Tag } from 'antd';
import { useIntl } from 'react-intl';

export default function ProcessStatus({ status }) {
    const { formatMessage } = useIntl()
    const [color, setColor] = useState(status === 'waiting' ? 'geekblue' : 'green')
    return (
        <Tag color={color}>
            {formatMessage({ id: `app.feedback.table.status.${status}` }).toUpperCase()}
        </Tag>
    )
}
