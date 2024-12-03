import React, { ReactElement, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../ckeditor5/build/ckeditor';
import api from '@/libs/axios';

// import uploadAdapter from './UploadAdapter';

// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function CKEditorrr(): ReactElement {
    const editorConfiguration = { extraPlugins: [MyCustomUploadAdapterPlugin] };
    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                config={editorConfiguration}
                onChange={(event: any, text: any) => {
                    const data = text.getData();
                    console.log(data);
                    // handleEditorText(data);
                }}
            />
        </div>
    );
}
export default CKEditorrr;
function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = loader => {
        return new MyUploadAdapter(loader);
    };
}
class MyUploadAdapter {
    constructor(props) {
        this.loader = props;
        this.url = `/be/aws/upload_file`;
    }

    // Starts the upload process.
    upload() {
        return new Promise((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject);
            this._sendRequest();
            // this.loader.file.then(async f => {
            //     const formData = new FormData();
            //     formData.append('file_object', f);
            //     formData.append('upload_path', upload_path);

            //     try {
            //         const { data } = await api.post(`/be/aws/upload_file`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            //         console.log(data);
            //     } catch (e: any) {}
            // });

            // file = this.loader.file
        });
    }

    // Aborts the upload process.
    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    // Example implementation using XMLHttpRequest.
    _initRequest() {
        const xhr = (this.xhr = new XMLHttpRequest());
        xhr.open('POST', this.url, true);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners(resolve, reject) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = "Couldn't upload file:" + ` ${loader.file.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;
            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : genericErrorText);
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            resolve({
                default: response.upload_url,
            });
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    // Prepares the data and sends the request.
    _sendRequest() {
        const formData = new FormData();
        this.loader.file.then(result => {
            formData.append('file_object', result);
            // formData.append('upload_path', '/CKEditor');
            this.xhr.send(formData);
        });
    }
}
