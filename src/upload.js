import React, { useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from './config/apiConfig';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideMenu2P from './component/sideMenu2P';

const ImageUpload = () => {
  const navigate = useNavigate()
  const [images, setImages] = useState([]);
  const projectId = localStorage.getItem('nProject');
  const prototypeType = localStorage.getItem('selectedPrototype');

 const access_token = localStorage.getItem('access_token');
   const decodedToken = jwtDecode(access_token);
   const userId = decodedToken.userId;

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setImages((prevImages) => [...prevImages, ...newImages]);
  }, []);

  const moveImage = (dragIndex, hoverIndex) => {
    const dragImage = images[dragIndex];
    const updatedImages = [...images];
    updatedImages.splice(dragIndex, 1);
    updatedImages.splice(hoverIndex, 0, dragImage);
    setImages(updatedImages);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
  });

  const handleSubmit = () => {
    console.log('Submitting images:', images);
    // Add your submit logic here
    handleUpload();
  };

  const handleUpload = async () => {

    for (let index = 0; index < images.length; index++) {
      const selectedFile = images[index];
      const formData = new FormData();
      // formData.append('userId', userId);
      formData.append('image', selectedFile);
      formData.append('type', prototypeType);
      formData.append('projectId', projectId);
      formData.append('sequence', index); // Use the index as the sequence number
      formData.append('imageName', selectedFile.name); // Use the file name as the image name

      try {
        const response = await axios.post(`${API_BASE_URL}/api/prototype/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${access_token}`,
          }
        });
        console.log(response);
      } catch (error) {
        console.error('Error uploading image:', error);
        console.log(error.response);
      }
    }

    if(prototypeType == "Prototype"){
      navigate('/prototype');
    }else if(prototypeType == "Wireframe"){
      navigate('/wireframe');
    }else{

    }

    // Reload the page after all uploads are completed
   // window.location.reload();
  };
  return (
    <>
    <div className='container2'>
    <SideMenu2P />
    <div className="main-content">
    <DndProvider backend={HTML5Backend}>
      <div className="upload-container">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag & drop some files here, or click to select files</p>
        </div>
        <div className="images-preview">
          {images.map((image, index) => (
            <ImagePreview
              key={index}
              index={index}
              image={image}
              moveImage={moveImage}
              removeImage={removeImage}
            />
          ))}
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </DndProvider>
    </div>
    </div>
    </>
  );
};

const ImagePreview = ({ image, index, moveImage, removeImage }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'image',
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'image',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} className="image-preview" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <img src={image.preview} alt={`preview-${index}`} />
      <button className="remove-button" onClick={() => removeImage(index)}>
        x
      </button>
    </div>
  );
};

export default ImageUpload;
