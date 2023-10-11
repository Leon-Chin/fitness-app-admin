import { Button, Popconfirm, Space, Tag, Table, message, Modal } from "antd";
import { FileSearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteTutorial } from "../../../api/tutorial.api";

const TutorialCol = (tableTitle, getColumnSearchProps, getData, setSelectedTutorial, setTutorialDetailDrawerOpen, addEditTab) => [
    {
        title: tableTitle.name,
        dataIndex: 'name',
        key: 'name',
        ...getColumnSearchProps('name'),
        render: (text) => <a>{text}</a>,
    },
    {
        title: tableTitle.type,
        dataIndex: 'type',
        key: 'type',
        ...getColumnSearchProps('type'),
        render: (text) => <Tag>{text}</Tag>,
    },
    {
        title: tableTitle.createdAt,
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: tableTitle.updatedAt,
        key: 'updatedAt',
        dataIndex: 'updatedAt',
    },
    {
        title: tableTitle.participant,
        key: 'participant',
        dataIndex: 'participant',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.participant - b.participant,
    },
    {
        title: tableTitle.action,
        key: 'action',
        render: (tutorial) => {
            return (
                <Space onClick={() => setSelectedTutorial(tutorial)}>
                    <Button size="small" onClick={() => { setTutorialDetailDrawerOpen(true) }}><FileSearchOutlined />{tableTitle.detail}</Button>
                    <Button size="small" onClick={() => { addEditTab(tutorial) }}><EditOutlined />{tableTitle.edit}</Button>
                    <Popconfirm
                        title={tableTitle.delete}
                        description={tableTitle.deleteConfirm}
                        okText={tableTitle.ok}
                        cancelText={tableTitle.cancel}
                        onConfirm={async () => {
                            const res = await deleteTutorial(tutorial._id)
                            message.success(res)
                            getData()
                        }}
                    >
                        <Button size="small" type="primary" danger ><DeleteOutlined />{tableTitle.delete}</Button>
                    </Popconfirm>
                </Space >
            )
        },
        width: '100px'
    },
];
export default TutorialCol