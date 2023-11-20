import { Button, Input, Modal, Space, Table, Tabs } from "antd";
import { useIntl } from "react-intl";
import { useLoaderData, useNavigate } from "react-router-dom";
import '../index.less'
import CardTitle from "../../../components/CardTitle";
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import musicCol from './musicCol'
import dayjs from 'dayjs'
import EditTutorialModal from "../../../components/editTutorial";
import { getallmusics } from "../../../api/music.api";
import UploadMusicModal from "../../../components/uploadMusicModal";
import EditMusicModal from "../../../components/editMusic";

export default function UploadMusic() {
  const { formatMessage } = useIntl()
  const allmusics = useLoaderData()
  const [musics, setMusics] = useState([])
  useEffect(() => {
    const handledData = allmusics.map((item) => {
      return { ...item, createdAt: dayjs(item.createdAt).format('YYYY-MM-DD'), updatedAt: dayjs(item.updatedAt).format('YYYY-MM-DD') }
    })
    setMusics(handledData)
  }, [])
  const getData = async () => {
    const allMusics = await getallmusics()
    const handledData = allMusics.map((item) => {
      return { ...item, createdAt: dayjs(item.createdAt).format('YYYY-MM-DD'), updatedAt: dayjs(item.updatedAt).format('YYYY-MM-DD') }
    })
    setMusics(handledData)
  }

  const tableTitle = {
    name: formatMessage({ id: 'name' }),
    createdAt: formatMessage({ id: 'createdAt' }),
    updatedAt: formatMessage({ id: 'updatedAt' }),
    type: formatMessage({ id: 'type' }),
    author: formatMessage({ id: 'author' }),
    url: formatMessage({ id: 'url' }),
    edit: formatMessage({ id: 'edit' }),
    delete: formatMessage({ id: 'delete' }),
    action: formatMessage({ id: "action" }),
    ok: formatMessage({ id: 'ok' }),
    cancel: formatMessage({ id: 'cancel' }),
    deleteConfirm: formatMessage({ id: 'deleteConfirm' }),
    detail: formatMessage({ id: 'detail' }),
    type: formatMessage({ id: 'sort' })
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

  // selected tutorial
  const [selectedMusic, setSelectedMusic] = useState()

  // upload tutorial modal
  const [isUploadTutorialOpen, setIsUploadTutorialOpen] = useState(false)
  // edit tutorial modal
  const [isEditTutorialOpen, setIsEditTutorialOpen] = useState(false)

  // detail drawer
  const [tutorialDetailDrawerOpen, setTutorialDetailDrawerOpen] = useState(false)
  const detailLabel = {
    brief: "brief",
    zh_brief: 'zh_brief',
    colorie: 'colorie',
    cover: 'cover',
    createdAt: 'createdAt',
    description: 'description',
    equipments: 'equipments',
    level: 'level',
    name: 'name',
    zh_name: 'zh_name',
    participant: 'participant',
    type: 'type',
    updatedAt: 'updateAt',
    video: 'video',
    zh_description: 'zh_description',
    id: 'id',
  }
  useEffect(() => {
    console.log("selectedTutorial", selectedMusic);
  }, [selectedMusic])

  //tabs
  const initialItems = [{ label: formatMessage({ id: 'music' }), key: 'music', closable: false }]
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };
  const addUploadTab = () => {
    const newActiveKey = 'upload';
    const alreadyHave = items.find(tab => tab.key === newActiveKey)
    if (!alreadyHave) {
      const newPanes = [...items];
      newPanes.push({
        label: "添加音乐",
        children: <UploadMusicModal getData={getData} removeTab={remove} />,
        key: newActiveKey,
      });
      setItems(newPanes);
      setActiveKey(newActiveKey);
    } else {
      setActiveKey(newActiveKey);
    }
  };
  const addEditTab = (music) => {
    const newActiveKey = `edit${music._id}`;
    const newPanes = [...items];
    const alreadyHave = items.find(tab => tab.key === newActiveKey)
    if (!alreadyHave) {
      newPanes.push({
        label: `${formatMessage({ id: 'edit' })}'${music.name}'`,
        children: <EditMusicModal getData={getData} selectedMusic={music} removeTab={remove} />,
        key: newActiveKey,
      });
      setItems(newPanes);
      setActiveKey(newActiveKey);
    } else {
      setActiveKey(newActiveKey);
    }
  };
  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };
  return (
    <div className='content-mainbox'>
      <Tabs type="editable-card" hideAdd items={items} onChange={onChange} activeKey={activeKey} onEdit={onEdit} />
      <div className='content-mainbox-content'>
        <div className="content-mainbox-content-left">
          {activeKey === 'music' && <>
            <CardTitle title={formatMessage({ id: 'app.manage.allMusics' })} extra={<Button type="primary" onClick={() => addUploadTab()}><PlusOutlined />{formatMessage({ id: 'add' })}</Button>} />
            <div className="content-mainbox-content-left-card">
              <div className="content-mainbox-content-left-box">
                <Table bordered={false} columns={musicCol(tableTitle, getColumnSearchProps, getData, setSelectedMusic, addEditTab)} dataSource={musics} />
              </div>
            </div>
          </>}
        </div>
      </div>
    </div>
  )
}
