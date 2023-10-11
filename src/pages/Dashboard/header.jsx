import { Avatar, Button, Dropdown, Popover } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { ReactComponent as LanguageSvg } from '@/assets/header/language.svg';
import { ReactComponent as EnUsSvg } from '@/assets/header/en_US.svg';
import { ReactComponent as ZhCnSvg } from '@/assets/header/zh_CN.svg';
import './index.less'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLocale, setLogged } from '../../store/account.store'
import { useNavigate } from 'react-router-dom';

export default function MyLayoutHeader() {
    const locale = useSelector(state => state.account.locale)
    const dispatch = useDispatch()
    const navigateTo = useNavigate()
    const selectLocale = ({ key }) => {
        dispatch(setLocale(key));
    };
    const loginStatusDiv = (
        <>
            <Button type="text" danger onClick={() => {
                dispatch(setLogged(false))
                localStorage.removeItem('token')
                navigateTo('/login')
            }}>
                Logout
            </Button>
        </>
    );
    return (
        <Header className='layout-page-header'>
            <div className='layout-page-header-left'>
                <div className="medal-logo">Medal Admin</div>
            </div>
            <div className='layout-page-header-right'>
                <Dropdown
                    menu={{
                        onClick: info => selectLocale(info),
                        items: [
                            {
                                key: 'zh_CN',
                                icon: <ZhCnSvg />,
                                disabled: locale === 'zh_CN',
                                label: '简体中文',
                            },
                            {
                                key: 'en_US',
                                icon: <EnUsSvg />,
                                disabled: locale === 'en_US',
                                label: 'English',
                            },
                        ],
                    }}
                >
                    <LanguageSvg id="language-change" />
                </Dropdown>
                <Popover placement="bottom" content={loginStatusDiv} trigger="click">
                    <Avatar className='MyHeader-Avatar' size="large">Admin</Avatar>
                </Popover>
            </div>
        </Header>
    )
}
