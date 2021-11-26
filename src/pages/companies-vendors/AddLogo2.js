import React from "react";
import fs from 'fs';

import defaultImage from "../../assets/img/default-avatar.png";

function AddLogo2(props) {
  const [fileState, setFileState] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(defaultImage);

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    //Para cambiarle el nombre al archivo de acuerdo a las especificaciones
   /* var newName = props.registerCountry.concat(props.registerRfc)
    Object.defineProperty(file, 'name', {
      writable: true,
      value: newName.concat(".", getFileExtension(file.name))
    });*/

    //const formData = new FormData();
    //formData.append("image", file)
    

    //Para enviar el archiv del logo al padre
    reader.onloadend = () => {
      
      setFileState(file);
      props.setregisterLogo(reader.result)
      setImagePreviewUrl(reader.result);
      //console.log(reader.result)
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    //handleSubmit(e);
  };

  function getFileExtension(filename) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // fileState is the file/image uploaded
    // in this function you can save the image (fileState) on form submit
    // you have to call it yourself
  };

  return (
    <div className="picture-container">
      <div className="picture">
        <img src={imagePreviewUrl} className="picture-src" alt="..." />
        <input type="file" onChange={(e) => handleImageChange(e)} />
      </div>
      <h6 className="description">Elegir logo</h6>
    </div>
  );
}

export default AddLogo2;