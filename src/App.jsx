import './index.less'
import MyRouter from './router/routers.jsx'
import { IntlProvider } from "react-intl";
import { localeConfig } from '../src/locale'
import { useSelector } from 'react-redux';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';

const App = () => {
    const locale = useSelector(state => state.account.locale)
    return (
        <ConfigProvider locale={locale.split('_')[0] === 'en' ? enUS : zhCN}>
            <IntlProvider locale={locale.split('_')[0]} messages={localeConfig[locale]}>
                <MyRouter />
            </IntlProvider>
        </ConfigProvider>
    )
}
export default App
