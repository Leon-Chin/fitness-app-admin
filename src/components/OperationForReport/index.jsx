import { Avatar, Button, Descriptions, List, Modal, Select, message } from 'antd'
import { useIntl } from 'react-intl'
import ReportTarget from '../../pages/ReportPages/components/reportTarget';
import ManageComment from './ManageComment';
import ProcessStatus from '../../pages/ReportPages/components/processStatus';
import ManageUser from './ManageUser';
import ManageBlog from './ManageBlog';
import { useState } from 'react';
import { getcommentbyid, getuserbyid } from '../../api/reportTarget.api';

export default function OperationForReport({ isManageModalOpen, setIsManageModalOpen, report }) {
    const { formatMessage } = useIntl()
    const items = [
        {
            key: '1',
            label: formatMessage({ id: 'app.report.table.type' }),
            children: <ReportTarget type={report?.type} />,
            span: 2,
        },
        {
            key: '2',
            label: formatMessage({ id: 'app.report.table.status' }),
            children: <ProcessStatus status={report?.status} />,
        },
        {
            key: '3',
            label: formatMessage({ id: 'app.report.targetID' }),
            children: report?.targetID,
            span: 3,
        },
    ];
    const [targetModalOpen, setTargetModalOpen] = useState(false);
    const handleButtonClick = () => {
        switch (report?.type) {
            case "user":
                window.open(`https://fitness-app-client-pi.vercel.app/specificuser/${report?.targetID}`, '_blank');
                break;
            case "blog":
                window.open(`https://fitness-app-client-pi.vercel.app/specificblog/${report?.targetID}`, '_blank');
                break;
            case "comment":
                getCommentDetail()
                setTargetModalOpen(true)
                break;
            default:
                message.error('Error')
                break;
        }
    };
    const [comment, setComment] = useState({})
    const getCommentDetail = async () => {
        await getcommentbyid(report?.targetID).then(async (res) => {
            if (res && res?.status !== false) {
                let comment = res
                await getuserbyid(comment.userID).then(res => {
                    if (res && res?.status !== false) {
                        setComment({ ...comment, commentUserInfo: res })
                    }
                })
            }
        })
    }

    console.log("report", report);
    return (
        <Modal width={630} zIndex={1001} title={formatMessage({ id: 'app.dashboard.menu.report' })} open={isManageModalOpen} footer={null} onCancel={() => setIsManageModalOpen(false)}>
            <div className='OperationTarget'>
                <div className='OperationTarget-Intro'>
                    <div style={{ paddingBottom: 10 }}>
                        <Button onClick={handleButtonClick}><a>Target Detail</a></Button>
                    </div>
                    <Descriptions
                        bordered
                        size='default'
                        items={items}
                    />
                </div>
                {report?.status !== 'done' && <div className='OperationTarget-Action'>
                    {/* comment */}
                    {report?.type === 'comment' && <ManageComment setIsManageModalOpen={setIsManageModalOpen} report={report} />}
                    {/* blog */}
                    {report?.type === 'blog' && <ManageBlog setIsManageModalOpen={setIsManageModalOpen} report={report} />}
                    {/* user */}
                    {report?.type === 'user' && <ManageUser setIsManageModalOpen={setIsManageModalOpen} report={report} />}
                </div>}
            </div>
            <Modal zIndex={99999} title={"Comment Detail"} open={targetModalOpen} onCancel={() => setTargetModalOpen(false)} footer={null}>
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    size='small'
                    dataSource={[comment]}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar size={49} src={item?.commentUserInfo?.avator} />}
                                title={<a href={item?.commentUserInfo ? `https://fitness-app-client-pi.vercel.app/specificuser/${item?.commentUserInfo?._id}` : '#'}>{item?.commentUserInfo ? item?.commentUserInfo?.name : ''}</a>}
                                description={item.content}
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        </Modal >
    )
}
