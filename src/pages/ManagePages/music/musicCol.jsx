import { Button, Popconfirm, Space, Tag, Table, message, Modal } from "antd";
import { FileSearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteTutorial } from "../../../api/tutorial.api";
import { deletemusic } from "../../../api/music.api";

const musicCol = (tableTitle, getColumnSearchProps, getData, setSelectedMusic, addEditTab) => [
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
        title: tableTitle.author,
        dataIndex: 'author',
        key: 'author',
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
        title: tableTitle.url,
        key: 'url',
        dataIndex: 'url',
        render: (url) => <a style={{ fontSize: 8 }}>{url}</a>,
        width: 200
    },
    {
        title: tableTitle.action,
        key: 'action',
        render: (music) => {
            return (
                <Space onClick={() => setSelectedMusic(music)}>
                    <Button size="small" onClick={() => { addEditTab(music) }}><EditOutlined />{tableTitle.edit}</Button>
                    <Popconfirm
                        title={tableTitle.delete}
                        description={tableTitle.deleteConfirm}
                        okText={tableTitle.ok}
                        cancelText={tableTitle.cancel}
                        onConfirm={async () => {
                            await deletemusic(music._id).then(res => {
                                if (res.success) {
                                    message.success("Delete successfully!")
                                    getData()
                                } else {
                                    message.error("error happens")
                                }
                            })
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
export default musicCol