import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import drag_drop from '../../assets/Images/drag_drop.jpg';
import sha1 from 'js-sha1';

function MyEditor() {
  const [image, setImage] = useState(drag_drop);
  const [editor, setEditor] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (dropped) => {
      setImage(dropped[0]);
    },
    noClick: false,
    noKeyboard: true,
  });

  const handleSave = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const apiKey = '181975331748428';
        const apiSecret = '2R3O056NMmxBXUMwL2apc6CH6aQ';
        const cloudName = 'dommm7bzh';
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const formData = new FormData();
        formData.append('file', blob, 'avatar.jpg');
        formData.append('timestamp', timestamp);
        formData.append('api_key', apiKey);

        const signature = sha1(`timestamp=${timestamp}&${apiSecret}`);
        formData.append('signature', signature);

        axios.post(url, formData).then((response) => {});
      });
    }
  };

  const setEditorRef = (editor) => {
    setEditor(editor);
  };

  return (
    <>
      <p className="d-flex justify-content-center" style={{ fontSize: '20px' }}>
        Kéo thả hoặc chọn ảnh
      </p>
      <div className="d-flex justify-content-center align-items-center">
        <br />
        <div {...getRootProps()} style={{ width: '200px', height: '200px' }}>
          <AvatarEditor ref={setEditorRef} width={150} height={150} image={image} border={10} />
          <input {...getInputProps()} />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
}

export default MyEditor;
