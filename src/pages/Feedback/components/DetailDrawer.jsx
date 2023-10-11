import React from 'react'
import { Drawer, Descriptions, Button } from 'antd';
import { useIntl } from 'react-intl';

export default function DetailDrawer(props) {
    const { formatMessage } = useIntl()
    const { onClose, open, items, showReplyBox, selectedFeedback } = props
    return (
        <Drawer bodyStyle={{ padding: 0 }} title={`${formatMessage({ id: 'app.dashboard.menu.feedback' })} ${formatMessage({ id: 'app.feedback.table.detail' })}`} placement="right" onClose={onClose} open={open}>
            <Descriptions size='small' bordered layout="vertical" items={items} />
            <div style={{ display: "flex", justifyContent: 'center', marginTop: 20 }}>
                <Button onClick={() => showReplyBox(selectedFeedback)} type='primary'>{formatMessage({ id: 'app.feedback.table.reply' })}</Button>
            </div>
        </Drawer >
    )
}
