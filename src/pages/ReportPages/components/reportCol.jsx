import ProcessStatus from "./processStatus";
import ReportTarget from "./reportTarget";
import { Button, Space } from "antd";
import { FileSearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ReportCol = (tableTitle, showDrawer, getColumnSearchProps, OpenUserModal) => [
    {
        title: tableTitle.userID,
        dataIndex: 'userID',
        key: 'userID',
        ...getColumnSearchProps('userID'),
        render: (text) => <p style={{ fontSize: '8px' }}>{text}</p>,
        ellipsis: {
            showTitle: false,
        },
    },
    {
        title: tableTitle.createtime,
        dataIndex: 'createtime',
        key: 'createtime',
        sorter: (a, b) => a.createtime - b.createtime,
        ...getColumnSearchProps('createtime'),
        width: '150px',
        ellipsis: {
            showTitle: false,
        },
    },
    {
        title: tableTitle.content,
        dataIndex: 'content',
        key: 'content',
        ellipsis: {
            showTitle: false,
        },
    },
    {
        title: tableTitle.type,
        key: 'type',
        dataIndex: 'type',
        filters: [
            {
                text: tableTitle.comment,
                value: 'comment',
            },
            {
                text: tableTitle.blog,
                value: 'blog',
            },
            {
                text: tableTitle.user,
                value: 'user',
            },
        ]
        ,
        onFilter: (value, record) => {
            console.log(value, "===", record);
            return record.type.indexOf(value) === 0
        },
        render: (_, { type }) => <ReportTarget type={type} />,
        width: '120px'
    },
    {
        title: tableTitle.status,
        key: 'status',
        dataIndex: 'status',
        filters: [
            {
                text: tableTitle.waiting,
                value: 'waiting',
            },
            {
                text: tableTitle.done,
                value: 'done',
            }]
        ,
        onFilter: (value, record) => record.status.indexOf(value) === 0,
        render: (_, { status }) => <ProcessStatus status={status} />,
        width: '100px'
    },
    {
        title: tableTitle.action,
        key: 'action',
        render: (report) => {
            console.log('props', report);
            return (
                <Space>
                    <Button disabled={report?.status === 'done' ? true : false} onClick={() => OpenUserModal(report)} size="small"><EditOutlined />{tableTitle.action}</Button>
                    <Button onClick={() => showDrawer(report)} size="small"><FileSearchOutlined />{tableTitle.detail}</Button>
                </Space>
            )
        },
        width: '180px'
    },
];
export default ReportCol