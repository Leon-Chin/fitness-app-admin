import React, { useEffect, useState } from 'react'
import CardTitle from '../../../components/CardTitle'
import { useIntl } from 'react-intl'
import { Segmented } from 'antd'
import TrendGraph from './trendGraph'

export default function Trend() {
    const { formatMessage } = useIntl()
    const [selectedValue, setSelectedValue] = useState('user')
    useEffect(() => {
        console.log(selectedValue);
    }, [selectedValue])
    return (
        <div className='content-mainbox-statistic-trend' style={{ marginTop: 20 }}>
            <CardTitle title={formatMessage({ id: 'trend' })} extra={<Segmented onChange={(e) => setSelectedValue(e)} defaultValue={selectedValue}
                options={[
                    { label: formatMessage({ id: 'user' }), value: 'user' },
                    { label: formatMessage({ id: 'blog' }), value: 'blog' },
                    { label: formatMessage({ id: 'comment' }), value: 'comment' }
                ]}
            />} />
            <div className='content-mainbox-statistic-trend-graph'>
                <TrendGraph selectedValue={selectedValue} />
            </div>
        </div>
    )
}
