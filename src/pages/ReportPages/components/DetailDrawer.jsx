import React from 'react'
import { Drawer, Descriptions, Button, Space } from 'antd';
import { useIntl } from 'react-intl';

export default function DetailDrawer(props) {
    const { formatMessage } = useIntl()
    const { onClose, open, items, selectedFeedback, OpenUserModal } = props
    return (
        <Drawer bodyStyle={{ padding: 0 }} title={`${formatMessage({ id: 'report' })} ${formatMessage({ id: 'app.feedback.table.detail' })}`} placement="right" onClose={onClose} open={open}>
            <Descriptions size='small' bordered layout="vertical" items={items} />
        </Drawer >
    )
}
