import { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Tabs, Table, Modal, Input, Space, Button, message } from 'antd';
import { useIntl } from 'react-intl';
import DetailDrawer from './components/DetailDrawer';
import DetailItem from './components/DetailItem'
import FeedbackCol from './components/feedbackCol';
import { getAllFeedbacks } from '../../api/admin.api'
import { useLoaderData } from 'react-router-dom';
const { TextArea } = Input;
const data = [
    {
        key: '1',
        _id: '312847123490861238461289',
        username: 'John Brown',
        userID: 'ksddsfasdfaslfa',
        content: 'New York No. 1 Lake Park',
        createtime: 'today',
        status: 'waiting',
        adminResponse: "nihao",
        updatedAt: '2023-10-5'
    },
    {
        key: '2',
        _id: '312847123490861238461289',
        username: 'John leon',
        userID: 'ksdlfasdfasdfasdffa',
        content: 'New York No. 1 Lake Park',
        createtime: 'today',
        status: 'done',
    },
    {
        key: '3',
        _id: '312847123490861238461289',
        username: 'chin Brown',
        userID: 'ksddsfasdfasdflfa',
        content: 'New York No. 1 Lake Park',
        createtime: 'today',
        status: 'waiting',
    },
];

export default function Feedback() {
    const { formatMessage } = useIntl()

    const allFeedbacks = useLoaderData()
    
    const [selectedFeedback, setSelectedFeedback] = useState({})
    const [drawerOpen, setDrawerOpen] = useState(false);
    const showDrawer = (feedback) => {
        setSelectedFeedback(feedback)
        setDrawerOpen(true);
    }
    const [replyBoxOpen, setReplyBoxOpen] = useState(false);
    const showReplyBox = (feedback) => {
        setSelectedFeedback(feedback)
        setReplyBoxOpen(true);
    }
    const [adminResponse, setAdminResponse] = useState()
    const [confirmLoading, setConfirmLoading] = useState(false);
    const handleReply = async () => {
        setConfirmLoading(true);
        const { userID, _id } = selectedFeedback
        const param = {
            userID,
            feedbackID: _id,
            adminResponse
        }
        const res = await replyFeedback(param)
        if (res?.status !== false) {
            setReplyBoxOpen(false)
            message.success('Reply successfully')
        } else {
            message.error('Error happen, try again please')
        }
        setConfirmLoading(false);


    }
    const detailLabel = {
        userID: formatMessage({ id: 'app.feedback.table.userID' }),
        createtime: formatMessage({ id: 'app.feedback.table.createtime' }),
        status: formatMessage({ id: 'app.feedback.table.status' }),
        content: formatMessage({ id: 'app.feedback.table.content' }),
        actionHistory: formatMessage({ id: 'actionHistory' }),
        noAction: formatMessage({ id: 'noAction' })
    }
    const tableTitle = {
        userID: formatMessage({ id: 'app.feedback.table.userID' }),
        content: formatMessage({ id: 'app.feedback.table.content' }),
        status: formatMessage({ id: 'app.feedback.table.status' }),
        waiting: formatMessage({ id: 'app.feedback.table.status.waiting' }),
        done: formatMessage({ id: 'app.feedback.table.status.done' }),
        action: formatMessage({ id: 'app.feedback.table.action' }),
        reply: formatMessage({ id: 'app.feedback.table.reply' }),
        detail: formatMessage({ id: 'app.feedback.table.detail' })
    }

    // coloum search fuction
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) => (
            text
        )
    });

    return (
        <div className='content-mainbox' style={{ padding: 0, paddingTop: 8 }}>
            <Tabs type="card" size='large' items={[{ label: formatMessage({ id: 'app.dashboard.menu.feedback' }), key: '1' }]} />
            <Table columns={FeedbackCol(tableTitle, showDrawer, showReplyBox, getColumnSearchProps)} dataSource={data} />
            <DetailDrawer onClose={() => setDrawerOpen(false)} open={drawerOpen} items={DetailItem(detailLabel, selectedFeedback)} selectedFeedback={selectedFeedback} showReplyBox={showReplyBox} />
            <Modal
                title={formatMessage({ id: 'app.feedback.table.reply' })}
                open={replyBoxOpen}
                onOk={handleReply}
                onCancel={() => setReplyBoxOpen(false)}
                okText={formatMessage({ id: 'send' })}
                cancelText={formatMessage({ id: 'cancel' })}
                bodyStyle={{ padding: '20px 0' }}
                zIndex={10000}
                confirmLoading={confirmLoading}
            >
                <TextArea onChange={({ target: { value } }) => setAdminResponse(value)} rows={4} />
            </Modal>
        </div>
    )
}
