import { Timeline } from 'antd';
import ProcessStatus from './processStatus';
import ReportTarget from './reportTarget';
import dayjs from 'dayjs'

const DetailItem = (detailLabel, { userID, createtime, status, content, type, targetID, adminResponse, updatedAt }) => {
    return [
        {
            key: '1',
            label: detailLabel.userID,
            span: 3,
            children: userID,
        },
        {
            key: '2',
            label: detailLabel.createtime,
            span: 2,
            children: createtime/*'2019-04-24 18:00:00'*/,
        },
        {
            key: '3',
            label: detailLabel.status,
            span: 3,
            children: <ProcessStatus status={status} />,
        },
        {
            key: '4',
            label: detailLabel.type,
            span: 2,
            children: <ReportTarget type={type} />,
        },
        {
            key: '5',
            label: detailLabel.targetID,
            span: 3,
            children: targetID,
        },
        {
            key: '6',
            label: detailLabel.content,
            span: 3,
            children: (
                <>
                    {content}
                </>
            ),
        },
        {
            key: '7',
            label: detailLabel.actionHistory,
            children: (
                <>
                    {adminResponse ? <Timeline
                        mode="left"
                        items={[
                            adminResponse &&
                            {
                                children: `${adminResponse} 'at ${dayjs(updatedAt).format('YYYY-MM-DD')}'`,
                            },
                        ]} /> : detailLabel.noAction}
                </>
            ),
            span: 3
        },
    ]
}

export default DetailItem