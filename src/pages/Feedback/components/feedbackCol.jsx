import ProcessStatus from "./processStatus";

const FeedbackCol = (tableTitle, showDrawer, showReplyBox, getColumnSearchProps) => [
    {
        title: tableTitle.userID,
        dataIndex: 'userID',
        key: 'userID',
        ...getColumnSearchProps('userID'),
        render: (text) => <a>{text}</a>,
        width: '180px'
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
        width: '130px'
    },
    {
        title: tableTitle.action,
        key: 'action',
        render: (feedback) => {
            console.log('props', feedback);
            return (
                <>
                    <a onClick={() => showReplyBox(feedback)}>{tableTitle.reply} | </a>
                    <a onClick={() => showDrawer(feedback)}>{tableTitle.detail}</a>
                </>
            )
        },
        width: '150px'
    },
];
export default FeedbackCol