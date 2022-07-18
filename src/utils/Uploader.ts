import Upload, {MultipartUploadOptions} from 'react-native-background-upload';

import {ReadDirItem} from '../Types';

const Uploader = (items: ReadDirItem[]) => {
  // fetch('http://3.110.50.152:5000/api/videos?page=1');

  // return;
  const item = items[0];

  const options: MultipartUploadOptions = {
    // url: 'http://192.168.1.9:5005/api/upload/videos',
    url: 'http://3.110.50.152:5000/api/upload/videos',
    path: item.path,
    method: 'PUT',
    type: 'multipart',
    maxRetries: 1, // set retry count (Android only). Default 2
    headers: {
      'content-type': 'video/mp4', // Customize content-type
      'my-custom-header': 's3headervalueorwhateveryouneed',
    },
    // Below are options only supported on Android
    notification: {
      enabled: true,
    },
    field: 'uploaded_media',
    // useUtf8Charset: true,
  };

  Upload.startUpload(options)
    .then(uploadId => {
      console.log('Upload started ', new Date().toLocaleString());
      Upload.addListener('progress', uploadId, data => {
        console.log(`Progress: ${data.progress}`);
      });
      Upload.addListener('error', uploadId, data => {
        console.log(
          `Error: ${JSON.stringify(data)} `,
          new Date().toLocaleString(),
        );
      });
      Upload.addListener('cancelled', uploadId, data => {
        console.log('Cancelled!', new Date().toLocaleString());
      });
      Upload.addListener('completed', uploadId, data => {
        // data includes responseCode: number and responseBody: Object
        console.log('Completed! ', new Date().toLocaleString());
      });
    })
    .catch(err => {
      console.log('Upload error!', err);
    });

  // console.log(JSON.stringify(items));
};

export default Uploader;
