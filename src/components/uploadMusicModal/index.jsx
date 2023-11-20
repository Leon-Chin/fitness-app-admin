import { Button, Form, Input, InputNumber, Select, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import CardTitle from '../CardTitle';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase'
import { useRef, useState } from 'react';
import { createmusic } from '../../api/music.api';


export default function UploadMusicModal({ getData, removeTab }) {
    const [uploading, setUploading] = useState(false)
    const formRef = useRef(null);
    const [music, setMusic] = useState([])
    const propsMusic = {
        onRemove: (file) => {
            const index = music.indexOf(file);
            const newFileList = music.slice();
            newFileList.splice(index, 1);
            setMusic(newFileList);
        },
        beforeUpload: (file) => {
            const isVideo = file.type?.startsWith('audio')
            if (isVideo) {
                setMusic([{ ...file, name: file.name }])
            } else {
                message.error('u only can upload music here')
                return false
            }
        },
        fileList: music,
    };
    const submitMusicToFirebase = ({ file }) => {
        setUploading(true)
        if (file) {
            const storageRef = ref(storage, `Tutorial-Video-${parseInt((new Date().getTime() / 1000).toString())}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setMusic([{ ...file, status: 'uploading', percent: progress }])
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    message.err('Some error happens')
                    setMusic([{ ...file, status: 'error' }])
                    setUploading(false)
                },
                () => {
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setMusic([{ ...file, status: 'done', url: downloadURL, name: file.name }])
                    });
                    setUploading(false)
                }
            );
        } else {
            message.err('Some error happens')
            setMusic([{ ...file, status: 'error' }])
            setUploading(false)
        }
    }
    const onFinish = async (items) => {
        const handledItems = { name: items.name, type: items.type, author: items.author, url: music[0].url }
        await createmusic(handledItems).then(res => {
            if (res.success) {
                getData()
                removeTab('upload')
                clear()
                message.success('Upload Success')
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        message.error('Failed:', errorInfo)
    };
    const clear = () => {
        formRef.current?.resetFields();
        setMusic([])
    };
    return (
        <div>
            <CardTitle title={'upload music'} />
            <Form name="basic" ref={formRef} labelCol={{ span: 8, }} wrapperCol={{ span: 16, }} style={{ maxWidth: 600, }} initialValues={{ remember: true, }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                <Form.Item label="Name" name="name" style={{ marginBottom: 10 }} rules={[{ required: true, message: 'Please input name!', }]}>
                    <Input placeholder='Music name' />
                </Form.Item>
                <Form.Item label="Author" name="author" style={{ marginBottom: 10 }} rules={[{ required: true, message: 'Please input Author!', }]}>
                    <Input placeholder='Music Author' />
                </Form.Item>
                <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please select type!', }]}>
                    <Select>
                        <Select.Option value="dynamic">dynamic</Select.Option>
                        <Select.Option value="soft">soft</Select.Option>
                        <Select.Option value="fashion">fashion</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Music" name="Music" rules={[{ required: true, message: 'Please input Music!' }]}>
                    <Upload name="music" listType="music" customRequest={submitMusicToFirebase} maxCount={1} {...propsMusic}>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" disabled={uploading ? true : false}>Upload</Button>
                </Form.Item>
            </Form>
        </div >

    )
}
