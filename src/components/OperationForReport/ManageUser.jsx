import { useIntl } from 'react-intl'
import CardTitle from '../CardTitle';
import { Select, DatePicker, Space, Button, Input, Form, message } from 'antd';
import { useState } from 'react';
import { SendOutlined } from '@ant-design/icons';
import { operateUser } from '../../api/admin.api';
const { TextArea } = Input

export default function ManageUser({ report, setIsManageModalOpen }) {
    const { formatMessage } = useIntl()
    const [method, setMethod] = useState()
    const onMethodChange = (value) => {
        setMethod(value)
    }
    const [response, setResponse] = useState()
    const onResponseChange = (value) => {
        setResponse(value)
    }
    const [muteDate, setMuteDate] = useState()
    const handleBanDate = (e) => {
        setMuteDate(e.$d)
    }
    const handleOperateUser = async (type) => {
        if (type === 'mute') {
            if (muteDate) {
                const reqData = { operationType: 'mute', userID: report.targetID, reporterID: report.userID, reportID: report._id, muteDate }
                try {
                    const res = await operateUser(reqData)
                    if (res?.success) {
                        setIsManageModalOpen(false)
                        location.reload()
                    } else {
                        message.error('error')
                    }
                } catch (error) {
                    message.error(error)
                }
            } else {
                message.error('please select the mute time')
            }
        } else {
            const reqData = { operationType: 'block', userID: report.targetID, reporterID: report.userID, reportID: report._id }
            try {
                const res = await operateUser(reqData)
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
    }
    return (
        <div className='OperationTarget-Action-comment-user'>
            <CardTitle title={formatMessage({ id: 'action' })} extra={<Select
                placeholder="Select the operation"
                onChange={onMethodChange}
                options={[
                    { value: 'reply', label: 'Reply to informer', },
                    { value: 'mute', label: 'Mute user', },
                    { value: 'block', label: 'Block user', },
                ]}
            />} />
            {method && <div className='OperationTarget-Actioin-user-main' style={{ marginTop: 24 }}>
                {method === 'reply' && <>
                    <Space direction='vertical' size={'large'} style={{ display: 'flex' }}>
                        <TextArea style={{ height: 120 }} onChange={onResponseChange} />
                        <Button style={{ float: 'right' }} type='primary'><SendOutlined />{formatMessage({ id: 'send' })}</Button>
                    </Space>
                </>}
                {method === 'mute' && <>
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ offset: 4, span: 14 }}
                        layout="horizontal"
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item label="禁言时间">
                            <DatePicker format='YYYY-MM-DD' onChange={(e) => handleBanDate(e)} />
                        </Form.Item>
                    </Form>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button type='primary' onClick={() => handleOperateUser('mute')}>{formatMessage({ id: 'ok' })}</Button>
                    </div>
                </>}
                {method === 'block' && <div style={{ display: 'flex', height: 30, alignItems: 'center', justifyContent: 'end' }}>
                    <h3>Are u sure to block the user?</h3>
                    <Button onClick={() => handleOperateUser('block')} style={{ marginLeft: 20 }} type='primary' danger>{formatMessage({ id: 'block' })}</Button>
                </div>}
            </div>}
        </div>
    )
}
