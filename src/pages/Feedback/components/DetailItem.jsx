import { Timeline } from 'antd';
import ProcessStatus from './processStatus';

const DetailItem = (detailLabel, { userID, createtime, status, content, adminResponse, updatedAt }) => {
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
            label: detailLabel.content,
            span: 3,
            children: (
                <>
                    {content}
                </>
            ),
        },
        {
            key: '5',
            label: detailLabel.actionHistory,
            children: (
                <>
                    {adminResponse ? <Timeline
                        mode="left"
                        items={[
                            adminResponse &&
                            {
                                children: `${adminResponse} ${updatedAt}`,
                            },
                        ]} /> : detailLabel.noAction}
                </>
            ),
            span: 3
        },
    ]
}

export default DetailItem