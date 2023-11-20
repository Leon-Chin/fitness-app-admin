import { useIntl } from 'react-intl'
import CardTitle from '../CardTitle';
import { Button, Select, Input, Space, message } from 'antd';
import { useState } from 'react';
import { SendOutlined } from '@ant-design/icons';
import { deleteBlog, reply } from '../../api/admin.api';
const { TextArea } = Input;

export default function ManageBlog({ report, setIsManageModalOpen }) {
    const { formatMessage } = useIntl()
    const [method, setMethod] = useState()
    const onMethodChange = (value) => {
        setMethod(value)
    }
    const [response, setResponse] = useState()
    const onResponseChange = (value) => {
        setResponse(value)
    }
    const handleDeleteBlog = async () => {
        const reqData = { blogID: report.targetID, reporterID: report.userID, reportID: report._id }
        try {
            const res = await deleteBlog(reqData)
            if (res?.success) {
                setIsManageModalOpen(false)
                location.reload()
            } else {
                message.error('error')
            }
        } catch (error) {
            message.error(error)
        }
    }
    const handleReply = async () => {
        const reqData = { blogID: report.targetID, reporterID: report.userID, reportID: report._id }
        try {
            console.log('daozhele ');
            const res = await reply(report.userID, { content: response })
        } catch (error) {

        }
    }
    return (
        <div className='OperationTarget-Action-blog'>
            <CardTitle title={formatMessage({ id: 'action' })} extra={<Select
                placeholder="Select the operation"
                onChange={onMethodChange}
                options={[
                    { value: 'reply', label: 'Reply to informer', },
                    { value: 'delete', label: 'Delete the blog', }
                ]}
            />} />
            {method && <div className='OperationTarget-Actioin-comment-main' style={{ marginTop: 24 }}>
                {method === 'delete' && <div style={{ display: 'flex', height: 30, alignItems: 'center', justifyContent: 'end' }}>
                    <h3>Are u sure to delete?</h3>
                    <Button style={{ marginLeft: 20 }} onClick={handleDeleteBlog} type='primary' danger>{formatMessage({ id: 'delete' })}</Button>
                </div>}
                {method === 'reply' && <>
                    <Space direction='vertical' size={'large'} style={{ display: 'flex' }}>
                        <TextArea style={{ height: 120 }} onChange={onResponseChange} />
                        <Button style={{ float: 'right' }} type='primary' onClick={handleReply}><SendOutlined />{formatMessage({ id: 'send' })}</Button>
                    </Space>
                </>}
                {/* {method === 'warning' && <>
                    <Space direction='vertical' size={'large'} style={{ display: 'flex' }}>
                        <TextArea style={{ height: 120 }} onChange={onResponseChange} />
                        <Button style={{ float: 'right' }} type='primary'><SendOutlined />{formatMessage({ id: 'send' })}</Button>
                    </Space>
                </>} */}
            </div>}
        </div>
    )
}
