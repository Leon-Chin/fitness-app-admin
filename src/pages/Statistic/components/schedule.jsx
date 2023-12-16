import CardTitle from '../../../components/CardTitle'
import { useIntl } from 'react-intl'
import { Card, Col, Row, Statistic } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Schedule() {
    const { formatMessage } = useIntl()
    const overview = useSelector((state) => state.account.statistics)
    const { feedbacksNum, reportsNum } = overview
    const navigateTo = useNavigate()
    return (
        <div className='content-mainbox-statistic-schedule'>
            <CardTitle title={formatMessage({ id: 'schedule' })} />
            <Row gutter={16}>
                <Col span={12}>
                    <Card hoverable onClick={() => navigateTo('/feedback')}>
                        <Statistic
                            title={formatMessage({ id: "app.statistic.pendingFeedbacks" })}
                            value={feedbacksNum}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card hoverable onClick={() => navigateTo('/report')}>
                        <Statistic
                            title={formatMessage({ id: "app.statistic.pendingReports" })}
                            value={reportsNum}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
