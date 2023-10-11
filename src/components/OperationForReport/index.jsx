import { Descriptions, Modal, Select } from 'antd'
import { useIntl } from 'react-intl'
import ReportTarget from '../../pages/ReportPages/components/reportTarget';
import ManageComment from './ManageComment';
import ProcessStatus from '../../pages/ReportPages/components/processStatus';
import ManageUser from './ManageUser';
import ManageBlog from './ManageBlog';
import CardTitle from '../CardTitle';


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
    return (
        <Modal width={630} zIndex={1001} title={formatMessage({ id: 'app.dashboard.menu.report' })} open={isManageModalOpen} footer={null} onCancel={() => setIsManageModalOpen(false)}>
            <div className='OperationTarget'>
                <div className='OperationTarget-Intro'>
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
        </Modal >
    )
}
