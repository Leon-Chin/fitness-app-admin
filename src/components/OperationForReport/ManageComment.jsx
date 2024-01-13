import { useIntl } from 'react-intl'
import CardTitle from '../CardTitle';
import { Button, Select, Input, Space } from 'antd';
import { useState } from 'react';
import {
    SendOutlined
} from '@ant-design/icons';
import { deleteComment, reply } from '../../api/admin.api';
const { TextArea } = Input;

export default function ManageComment({ report, setIsManageModalOpen }) {
    const { formatMessage } = useIntl()
    const [method, setMethod] = useState()
    const onMethodChange = (value) => {
        setMethod(value)
    }
    const [response, setResponse] = useState()
    const onResponseChange = (value) => {
        console.log(value);
        setResponse(value)
    }
    const handleDeleteComment = async () => {
        const reqData = { commentID: report.targetID, reporterID: report.userID, reportID: report._id }
        await deleteComment(reqData).then(res => {
            if (res.success) {
                setIsManageModalOpen(false)
                location.reload()
            } else {
                message.error('error')
                // message.error(error)
            }
        }).catch(err => {
            message.error('error')
            console.log(err);
        })
    }

    const replyInformer = async () => {
        const reqData = { report, content: response }
        try {
            const res = await reply(report.userID, reqData)
            setIsManageModalOpen(false)
            location.reload()
        } catch (error) {

        }
    }

    return (
        <div className='OperationTarget-Action-comment'>
            <CardTitle title={formatMessage({ id: 'action' })} extra={<Select
                placeholder="Select the operation"
                onChange={onMethodChange}
                options={[
                    { value: 'reply', label: 'Reply to informer', },
                    { value: 'delete', label: 'Delete the comment', }
                ]}
            />} />
            {method && <div className='OperationTarget-Actioin-comment-main' style={{ marginTop: 24 }}>
                {method === 'delete' && <div style={{ display: 'flex', height: 30, alignItems: 'center', justifyContent: 'end' }}>
                    <h3>Are u sure to delete?</h3>
                    <Button style={{ marginLeft: 20 }} type='primary' onClick={handleDeleteComment} danger>{formatMessage({ id: 'delete' })}</Button>
                </div>}
                {method === 'reply' && <>
                    <Space direction='vertical' size={'large'} style={{ display: 'flex' }}>
                        <TextArea style={{ height: 120 }} onChange={({ target: { value } }) => onResponseChange(value)} />
                        <Button style={{ float: 'right' }} type='primary' onClick={replyInformer}><SendOutlined />{formatMessage({ id: 'send' })}</Button>
                    </Space>
                </>}
            </div>}
        </div>
    )
}

