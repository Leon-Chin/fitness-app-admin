import React, { useEffect } from 'react'
import './index.less'
import { useIntl } from 'react-intl'
import Schedule from './components/schedule'
import Overview from './components/overview'
// import Trend from './components/trend'
import { useLoaderData } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setStatistics } from '../../store/account.store'

export default function StatisticBoard() {
    const { formatMessage } = useIntl()
    const allStatistics = useLoaderData()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setStatistics(allStatistics))
    }, [])
    return (
        <div className='content-mainbox'>
            <div className='content-mainbox-statistic'>
                <div className='content-mainbox-statistic-hello'>{formatMessage({ id: 'welcome' })}</div>
                <Overview />
                <Schedule />
                {/* <Trend /> */}
            </div>
        </div>
    )
}
