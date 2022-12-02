import { message } from 'antd';
import { getToken } from './function';

// export const URL = 'https://zulo-server.herokuapp.com';

export const URL = 'http://ec2-54-147-236-3.compute-1.amazonaws.com:8080';
// export const URL = 'http://localhost:8080';

export const AvatarDefault = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

export const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

export const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
