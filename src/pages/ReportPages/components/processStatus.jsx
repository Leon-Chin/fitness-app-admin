import { Tag } from 'antd';
import { useIntl } from 'react-intl';

export default function ProcessStatus({ status }) {
    const { formatMessage } = useIntl()
    return (
        <Tag color={status === 'waiting' ? 'geekblue' : 'green'}>
            {formatMessage({ id: `app.feedback.table.status.${status}` }).toUpperCase()}
        </Tag>
    )
}
