import { Button, Form, Input, InputNumber, Select, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import CardTitle from '../CardTitle';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase'
import { useRef, useState } from 'react';
import { createTutorial, updateTutorial } from '../../api/tutorial.api'
import EXERCISETYPE from '../../constants/EXERCISETYPE';

const equipmentsOptions = [
    { value: 'yaling', label: 'yaling' },
    { value: '跳绳', label: '跳绳' },
]

export default function EditTutorialModal({ getData, selectedTutorial, removeTab }) {
    const [uploading, setUploading] = useState(false)
    const editFormRef = useRef(null);
    const [cover, setCover] = useState([{
        uid: '-1',
        name: 'cover',
        status: 'done',
        url: selectedTutorial.cover,
        thumbUrl: selectedTutorial.cover,
    }])
    const propsCover = {
        onRemove: (file) => {
            const index = cover.indexOf(file);
            const newFileList = cover.slice();
            newFileList.splice(index, 1);
            setCover(newFileList);
        },
        beforeUpload: (file) => {
            const isImage = file.type?.startsWith('image')
            if (isImage) {
                setCover([{ ...file, name: file.name }])
            } else {
                message.error('u only can upload picture here')
                return false
            }
        },
        fileList: cover,
    };
    const submitCoverToFirebase = ({ file }) => {
        setUploading(true)
        if (file) {
            const storageRef = ref(storage, `Tutorial-Cover-${parseInt((new Date().getTime() / 1000).toString())}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setCover([{ ...file, status: 'uploading', percent: progress }])
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
                    setCover([{ ...file, status: 'error' }])
                    setUploading(false)
                },
                () => {
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setCover([{ ...file, status: 'done', url: downloadURL, thumbUrl: downloadURL, name: file.name }])
                    });
                    setUploading(false)
                }
            );
        } else {
            message.err('Some error happens')
            setCover([{ ...file, status: 'error' }])
            setUploading(false)
        }
    }
    const [video, setVideo] = useState([{
        uid: '1',
        name: 'video',
        status: 'done',
        url: selectedTutorial.video,
        thumbUrl: selectedTutorial.video,
    }])
    const propsVideo = {
        onRemove: (file) => {
            const index = video.indexOf(file);
            const newFileList = video.slice();
            newFileList.splice(index, 1);
            setVideo(newFileList);
        },
        beforeUpload: (file) => {
            console.log(file);
            const isVideo = file.type?.startsWith('video')
            if (isVideo) {
                setVideo([{ ...file, name: file.name }])
            } else {
                message.error('u only can upload video here')
                return false
            }
        },
        fileList: video,
    };
    const submitVideoToFirebase = ({ file }) => {
        setUploading(true)
        if (file) {
            const storageRef = ref(storage, `Tutorial-Video-${parseInt((new Date().getTime() / 1000).toString())}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setVideo([{ ...file, status: 'uploading', percent: progress }])
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
                    setVideo([{ ...file, status: 'error' }])
                    setUploading(false)
                },
                () => {
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setVideo([{ ...file, status: 'done', url: downloadURL, thumbUrl: downloadURL, name: file.name }])
                    });
                    setUploading(false)
                }
            );
        } else {
            message.err('Some error happens')
            setVideo([{ ...file, status: 'error' }])
            setUploading(false)
        }
    }
    const onFinish = async (items) => {
        const handledItems = { ...items, cover: cover[0].url, video: video[0].url }
        try {
            const res = await updateTutorial(selectedTutorial._id, handledItems)
            console.log(res);
            message.success('Update successfully')
            removeTab(`edit${selectedTutorial._id}`)
            getData()
        } catch (error) {
            console.log(error);
            message.error('error')
        }
    };
    const onFinishFailed = (errorInfo) => {
        message.error('Failed:', errorInfo)
    };
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    return (
        <div>
            <CardTitle title={'Edit tutorial'} />
            <Form name="basic" initialValues={selectedTutorial} ref={editFormRef} labelCol={{ span: 8, }} wrapperCol={{ span: 16, }} style={{ maxWidth: 600, }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please select type!', }]}>
                    <Select>
                        {Object.values(EXERCISETYPE).map((item, index) => <Select.Option key={index} value={item.value}>{item.label}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label="Tutorial name" style={{ marginBottom: 0 }} name="name" rules={[{ required: true }]}                >
                    <Form.Item name="name" style={{ marginBottom: 10 }} rules={[{ required: true, message: 'Please input name!', }]}>
                        <Input placeholder='written in English' />
                    </Form.Item>
                    <Form.Item name="zh_name" rules={[{ required: true, message: 'Please input name!', }]}>
                        <Input placeholder='written in Chinese' />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="Brief" style={{ marginBottom: 0 }} rules={[{ required: true, message: 'Please input brief!', }]}>
                    <Form.Item name="brief" style={{ marginBottom: 10 }} rules={[{ required: true, message: 'Please input brief!', }]}>
                        <Input placeholder='written in English' />
                    </Form.Item>
                    <Form.Item name="zh_brief" rules={[{ required: true, message: 'Please input brief!', }]}>
                        <Input placeholder='written in Chinese' />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="Description" style={{ marginBottom: 0 }} rules={[{ required: true, message: 'Please input description!', }]}>
                    <Form.Item name="description" style={{ marginBottom: 10 }} rules={[{ required: true, message: 'Please input description!', }]} >
                        <Input.TextArea placeholder='written in English' />
                    </Form.Item>
                    <Form.Item name="zh_description" rules={[{ required: true, message: 'Please input description!', }]} >
                        <Input.TextArea placeholder='written in Chinese' />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="Fit Level" name="level" rules={[{ required: true, message: 'Please select fit level!', }]}>
                    <Select>
                        <Select.Option value="l1">l1</Select.Option>
                        <Select.Option value="l2">l2</Select.Option>
                        <Select.Option value="l3">l3</Select.Option>
                    </Select>
                </Form.Item>
                {/* <Form.Item label="Colorie" name="colorie" rules={[{ required: true, message: 'Please input colorie!', }]}>
                    <Form.Item
                        name="lowerEstimateColorie"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block' }}
                    >
                        <InputNumber placeholder='Lower' />
                    </Form.Item>
                    &nbsp;&nbsp;~&nbsp;&nbsp;
                    <Form.Item
                        name="higherEstimateColorie"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block' }}
                    >
                        <InputNumber placeholder='Higher' />
                    </Form.Item>
                </Form.Item> */}
                <Form.Item label="Colorie" style={{ marginBottom: 0 }} rules={[{ required: true, message: 'Please input colorie!', }]}>
                    {/* <Input placeholder='xx - xx' /> */}
                    <Form.Item
                        name="lowerEstimateColorie"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block' }}
                    >
                        <InputNumber placeholder='Lower' />
                    </Form.Item>
                    &nbsp;&nbsp;~&nbsp;&nbsp;
                    <Form.Item
                        name="higherEstimateColorie"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block' }}
                    >
                        <InputNumber placeholder='Higher' />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="Equipment Requirements" name="equipments" rules={[{ required: true, message: 'Please input equipment requirements!', }]}>
                    <Select
                        mode="tags"
                        placeholder="Please select"
                        defaultValue={[]}
                        options={equipmentsOptions}
                    />
                </Form.Item>
                <Form.Item label="Cover" name="cover" rules={[{ required: true, message: 'Please input cover!', }]} getValueFromEvent={normFile}>
                    <Upload name="cover" listType="picture" customRequest={submitCoverToFirebase} maxCount={1} {...propsCover}>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="video" name="video" rules={[{ required: true, message: 'Please input video!' }]}>
                    <Upload name="video" listType="video" customRequest={submitVideoToFirebase} maxCount={1} {...propsVideo}>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Duration(Min)" name="duration" rules={[{ required: true, message: 'Please input video!' }]}>
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" disabled={uploading ? true : false}>Upload</Button>
                </Form.Item>
            </Form>
        </div >
    )
}
