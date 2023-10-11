import { Tag } from 'antd'
import {
    UserOutlined,
    CommentOutlined,
    InstagramOutlined,
} from '@ant-design/icons';
import { useIntl } from 'react-intl';

export default function ReportTarget({ type }) {
    const { formatMessage } = useIntl()
    const icon = () => {
        switch (type) {
            case 'user':
                return <UserOutlined />
            case 'comment':
                return <CommentOutlined />
            case 'blog':
                return <InstagramOutlined />
        }
    }
    return (
        <Tag icon={icon()} >
            {formatMessage({ id: `${type}` })}
        </Tag>
    )
}
