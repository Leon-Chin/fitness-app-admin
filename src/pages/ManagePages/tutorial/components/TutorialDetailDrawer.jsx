import React from 'react'
import { Drawer, Descriptions, Button } from 'antd';
import { useIntl } from 'react-intl';

export default function TutorialDetailDrawer(props) {
    const { formatMessage } = useIntl()
    const { onClose, open, items, showReplyBox, selectedTutorial } = props
    return (
        <Drawer width={600} bodyStyle={{ padding: 0 }} title={formatMessage({ id: "tutorialDetail" })} placement="right" onClose={onClose} open={open}>
            <Descriptions size='small' bordered layout="vertical" items={items} />
        </Drawer >
    )
}
