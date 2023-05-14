import React,{useState,useEffect} from 'react'
import axios from 'axios';
export default function PictureUpload(props) {
  const [image, setImage] = useState(null);
  const [back,setBack]=useState('');
  useEffect(() => {

    if (image) {
      setBack(image.name);
    }
  }, [image,back]);
  const handleImageChange = event => {
    setImage(event.target.files[0]);
  };



  const HandleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', 'My Image');
    formData.append('image', image);

    if (image) {
      setBack(image.name);
    }

    await imagere(formData);
  }



  const imagere = async (formData) => {
    await axios.post("http://localhost:8000/upload", formData)
      .then((res) => {
        console.log(res);
        uploadImage();
      });


  }



const uploadImage = async () => {
  try {
    const url = `http://localhost:8000/SingleInstitutePage/addImage/${props.institute}/${back}`;
    // alert(url);
    await axios.get(`http://localhost:8000/SingleInstitutePage/addImage/${props.institute}/${back}`);
    props.onRefresh();
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div> <div className='backgroundchose'>
          <form >
            <div>
              <label htmlFor="image">Choose an image:</label>
              <input className='addpic' type="file" id="image" onChange={handleImageChange} />
            </div>
            <button className='changebackbutton' onClick={HandleSubmit}>Upload</button>
          </form>
        </div>

        </div>
  )
}

