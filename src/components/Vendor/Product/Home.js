import React, { useState } from 'react';
import './Home.css';
import { MdAdd, MdRemove, MdClose, MdAddCircle } from 'react-icons/md';

function Vendor() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [promotionalPrice, setPromotionalPrice] = useState('');
  const [dateValidPromote, setDateValidPromote] = useState('');
  const [quantity, setQuantity] = useState('');
  const [video, setVideo] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();

    // Replace this with an API call to create a new product
    console.log({
      name,
      description,
      price,
      promotionalPrice,
      dateValidPromote,
      quantity,
      video,
      attributes,
      images,
    });
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = file;
        setImages(newImages);

        const newPreviewImages = [...previewImages];
        newPreviewImages[index] = reader.result;
        setPreviewImages(newPreviewImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAttributeChange = (index, key, value) => {
    const newAttributes = [...attributes];
    newAttributes[index][key] = value;
    setAttributes(newAttributes);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { name: '', values: [] }]);
  };

  const removeAttribute = (index) => {
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1);
    setAttributes(newAttributes);
  };

  const handleAttributeValueChange = (index, valueIndex, value) => {
    const newAttributes = [...attributes];
    newAttributes[index].values[valueIndex] = value;
    setAttributes(newAttributes);
  };

  const addAttributeValue = (index) => {
    const newAttributes = [...attributes];
    newAttributes[index].values.push('');
    setAttributes(newAttributes);
  };

  const removeAttributeValue = (index, valueIndex) => {
    const newAttributes = [...attributes];
    newAttributes[index].values.splice(valueIndex, 1);
    setAttributes(newAttributes);
  };

  const addImage = () => {
    setPreviewImages([...previewImages, null]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
  };
  return (
    <div className="product-form">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="columns">
          <div className="column">
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              Description:
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>
            <label>
              Price:
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </label>
            <label>
              Promotional Price:
              <input
                type="number"
                value={promotionalPrice}
                onChange={(e) => setPromotionalPrice(e.target.value)}
              />
            </label>
            <label>
              Date Valid Promote:
              <input
                type="date"
                value={dateValidPromote}
                onChange={(e) => setDateValidPromote(e.target.value)}
              />
            </label>
            <label>
              Quantity:
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
            </label>
            <label>
              Video:
              <input type="text" value={video} onChange={(e) => setVideo(e.target.value)} />
            </label>
          </div>
          <div className="column">
            <label>Attributes</label>
            {attributes.map((attribute, index) => (
              <div key={index} className="attribute-container ">
                <div className="attribute">
                  <div>
                    <label>Name:</label>
                    <input
                      type="text"
                      value={attribute.name}
                      onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <button
                    className="remove-attribute-button"
                    type="button"
                    onClick={() => removeAttribute(index)}
                  >
                    <MdClose />
                  </button>
                </div>

                {attribute.values.map((value, valueIndex) => (
                  <div key={valueIndex} className="attribute-value">
                    <label style={{ marginRight: '20px' }}>Value:</label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleAttributeValueChange(index, valueIndex, e.target.value)}
                      required
                    />
                    <button
                      className="remove-attribute-value-button"
                      type="button"
                      onClick={() => removeAttributeValue(index, valueIndex)}
                    >
                      <MdRemove />
                    </button>
                  </div>
                ))}
                <button
                  className="add-attribute-value-button"
                  type="button"
                  onClick={() => addAttributeValue(index)}
                >
                  <MdAddCircle />
                </button>
              </div>
            ))}
            <button type="button" onClick={addAttribute} className="add-attribute-button">
              <MdAdd /> Add Attribute
            </button>
            <label>Images</label>
            {previewImages.map((previewImage, index) => (
              <div key={index} className="image-preview">
                <img src={previewImage} alt={`Preview ${index}`} />
                <button className="remove-image-button" type="button" onClick={() => removeImage(index)}>
                  <MdClose />
                </button>
              </div>
            ))}
            <div className="image-upload">
              <label>
                <MdAdd /> Upload Image
                <input
                  type="file"
                  accept="image/*"
                  width={100}
                  onChange={(e) => handleImageUpload(e, images.length)}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default Vendor;
