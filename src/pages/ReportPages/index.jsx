import { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Tabs, Table, Modal, Input, Space, Button, message } from 'antd';
import { useIntl } from 'react-intl';
import DetailDrawer from './components/DetailDrawer';
import DetailItem from './components/DetailItem'
import ReportCol from './components/reportCol';
import OperationForUser from '../../components/OperationForReport';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import dayjs from 'dayjs';
// const data = [
//     {
//         key: '1',
//         _id: '312847123490861238461289',
//         type: 'blog',
//         targetID: "sdfioweifsodijfsldkfja;",
//         username: 'John Brown',
//         userID: 'ksddsfasdfaslfa',
//         content: 'New York No. 1 Lake Park',
//         createtime: 'today',
//         status: 'waiting',
//     },
//     {
//         key: '2',
//         _id: '312847123490861238461289',
//         type: 'comment',
//         targetID: "sdfioweifsodijfsldkfja;",
//         username: 'John leon',
//         userID: 'ksdlfasdfasdfasdffa',
//         content: 'New York No. 1 Lake Park',
//         createtime: 'today',
//         status: 'done',
//     },
//     {
//         key: '3',
//         _id: '312847123490861238461289',
//         type: 'user',
//         targetID: "sdfioweifsodijfsldkfja;",
//         username: 'chin Brown',
//         userID: 'ksddsfasdfasdflfa',
//         content: 'New York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake Park',
//         createtime: 'today',
//         status: 'waiting',
//     },
// ];

export default function ReportUser() {
    const { formatMessage } = useIntl()
    const [data, setData] = useState([])
    let allReports = useLoaderData()
    useEffect(() => {
        allReports = allReports.map((report) => { return { ...report, createtime: dayjs(report.createdAt).format('YYYY-MM-DD') } })
        setData(allReports)
    }, [])
    const [selectedReport, setSelectedReport] = useState({})
    const [drawerOpen, setDrawerOpen] = useState(false);
    const showDrawer = (report) => {
        setSelectedReport(report)
        setDrawerOpen(true);
    }
    // 管理举报的modal框
    const [isManageModalOpen, setIsManageModalOpen] = useState(false)
    const [manageReport, setManageReport] = useState()
    const OpenUserModal = (report) => {
        setManageReport(report)
        setIsManageModalOpen(true)
    }

    const detailLabel = {
        userID: formatMessage({ id: 'app.report.table.userID' }),
        createtime: formatMessage({ id: 'app.report.table.createtime' }),
        status: formatMessage({ id: 'app.report.table.status' }),
        content: formatMessage({ id: 'app.report.table.content' }),
        type: formatMessage({ id: 'app.report.table.type' }),
        targetID: formatMessage({ id: 'app.report.targetID' }),
        actionHistory: formatMessage({ id: 'actionHistory' }),
        noAction: formatMessage({ id: 'noAction' })
    }
    const tableTitle = {
        userID: formatMessage({ id: 'app.report.table.userID' }),
        createtime: formatMessage({ id: 'app.report.table.createtime' }),
        content: formatMessage({ id: 'app.report.table.content' }),
        type: formatMessage({ id: 'app.report.table.type' }),
        comment: formatMessage({ id: 'comment' }),
        blog: formatMessage({ id: 'blog' }),
        user: formatMessage({ id: 'user' }),
        status: formatMessage({ id: 'app.report.table.status' }),
        waiting: formatMessage({ id: 'app.report.table.status.waiting' }),
        done: formatMessage({ id: 'app.report.table.status.done' }),
        action: formatMessage({ id: 'app.report.table.action' }),
        reply: formatMessage({ id: 'app.report.table.reply' }),
        detail: formatMessage({ id: 'app.report.table.detail' })
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
                    placeholder={`${formatMessage({ id: 'search' })} ${formatMessage({ id: `${dataIndex}` })}`}
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
                        {formatMessage({ id: 'search' })}
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        {formatMessage({ id: 'reset' })}
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
                        {formatMessage({ id: 'filter' })}
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        {formatMessage({ id: 'close' })}
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
            <Tabs type="card" size='large' items={[{ label: formatMessage({ id: 'app.dashboard.menu.report' }), key: 'report' }]} />
            <Table columns={ReportCol(tableTitle, showDrawer, getColumnSearchProps, OpenUserModal)} dataSource={data} />
            <DetailDrawer onClose={() => setDrawerOpen(false)} open={drawerOpen} items={DetailItem(detailLabel, selectedReport)} selectedReport={selectedReport} OpenUserModal={OpenUserModal} />
            <OperationForUser isManageModalOpen={isManageModalOpen} setIsManageModalOpen={setIsManageModalOpen} report={manageReport} />
        </div>
    )
}


