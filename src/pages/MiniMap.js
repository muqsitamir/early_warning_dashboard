import {useState} from 'react'
import { GoogleMap ,Marker, InfoWindow  } from "@react-google-maps/api"
import { Avatar } from '@mui/material';
const sunriseImg="data:image/png;base64,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";
const sunsetImg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE90lEQVR4nO2aTWwbRRTHh0IRAokGtZS2KHyqHFCRKKZF8b7ZTZqAeuDAAZCAXFAlDiB6gV7aAwcQAipoSJQQhyRtgUstxTOE0iaK+pHSFlo4lNKKCxJIFGhT+kWF4xmv/dDYifE6a3tt764dZf/SO+Vj3//35s2bWZuQOkpw7Zhg2lGyUCU5oAqyUCUDABCsABm0AAR7AFmoEhy+ERyO1DuPQOUkmTasqoUjLctJg0vlqHKVDIZc+6eCw5GZmf1TI0NQuakcVa6uthZG4U7JtdMZCAx+xhG6kjSY5uS411jh7QNGnEPA6HM3SkbDksM2yWBEMu2sYHBZcJCZYHBZMjiT/RlslbFwi/qbhjFvt8Qy7RDtWEJKKD6q3SOY9oFk8MfssddxMDgnOLwXZ7S51DOQGU2WnLxuUbRAoHrRijBtQFW3YuMFITgIwaEfR41lds+SMTB8358w2rGkmHkRg07B4VKtxm1A/C1i8ILdM1Uu5Vaj58LowzdLDoNzEh+lmDjQitNH2zD+XTsmDrfVCiOCkdBi0kjC8SdvE1wbsxoHTEy2YvzkBox/324JMWHUuhr24WjoVtIIwkhosUrIkuC4gdMn5hrPAdiv194SDCbUqmuElxqD+YklDrYWNR4/2Y6JA7VV3xKf0a/ral7EoNNi/lBx89OTbSj3Ulc3xuRuislB2FEX8xhbt1Qw7WLO/IRha1xBURuh21MhAyAKaHbrKdzd/pDvACTTBnLJfAWZ5W1d7htQ7PPGeC5igKkdOpr99EdfzccZbVYHlFz1x/Q5ve65+ZkweyimunSUu+h63wAIrr1vSeRLivFvZ3b9E+2YcGGXdwzgEz2zCpIROO6LeXyLLJJc+70wETX3xbiOsky/45bNljBf3YTnlzflolIAqQjNtkE3NfGQcZPnAGT2Vld1xQoB4Juv44UVS6sGYA5kV4AKHIKXvQfAYZurALZsxosPNlcPoO9/AOYA3e89AAYxtwFcWrO6egA9eQD66DkfAGhn3QZw5bE11QEYyY7B2Uj20GnPAYgar7p2AK62hKoCkPyiAEAXTVdhSDtW7AF2H13nz3+3AFwLr6sKgDkzAXLRpWPF/oR6hVzsF2zerAqmJVwHAOsrBqCOwRbzRQFU5q+sBNemGgFAqr+g+qoFummKzMdN8OoTaysCkNw113xmCvixCUoOe9wGcCX0iGMAhRufBUA//c17AAy21uscoO7/xcyrkBEY8x4ADz/uNoCp+1aVBsAAzcHS5rMnQcP2rbGrQiQ32F2GqgWQfuM1PH/XHUUBJPdQNHsdmO+mSUSyiPghwbR3nJg1t7942K7i+ZHc1Gm5DRbG9adD6XLms9XXJ4lf+peHV8kYCLU0a4UQf2ZjKfNljc/OfxwIP0r8lBmhp3IJdKsRpKPZq2fms7qimp/STN+awxRT7z7/SzEA+WeA/PjHqXlV/Qg9RfwWDsED6uztNMn028/aX4Xvv7v6yqvDz8d6Gof11aQeSg5pHzpN1A6CXf9XYl6FGKQfkXrK7IczlSSc2v7SxCyA6x1gMX/tqbW/VvK/zAg9Teot3GncYvbpfzpNenZjVONv6t6VFvOZM75T8330L4w0yueDO40ms49OOQWgIv5Kxw+F5p0CMHvpBfx84+2eGxMl7tLzJWr6Or4ocZeeLxF8ETNQoECBAgUKFChQoECBAgUihfoP0YFsNXX86PIAAAAASUVORK5CYII=";
export default function MiniMap({camera,defaultCenter}) {
    const myCameras =camera
    console.log("cameras",myCameras)
    
     
    const [selected, setSelected] = useState(null) 
    const mapStyles = {        
        height: "263px",
        width: "728px",
        borderRadius:'15px'
      };
    const handleClick = (item) => {
    console.log("in handle")
    setSelected(item)
    }
    const getLocation=(tempCam)=>{
        let location={
            lat: tempCam.latitude,
            lng: tempCam.longitude,
          };
          return location;
    }
    const formatDate=(inputDate)=> {
      const date = new Date(inputDate);
      const day = date.getUTCDate();
      const month = date.getUTCMonth() + 1; // Months are 0-based
      const year = date.getUTCFullYear();
      const hours = date.getUTCHours()+5;
      const minutes = date.getUTCMinutes();
      const seconds = date.getUTCSeconds();
      const timeZoneOffset = (date.getTimezoneOffset() / 60) * -1; // Convert to positive offset
    
      const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} GMT`;
    
      return formattedDate;
    }
  return (
    <GoogleMap mapContainerStyle={mapStyles} zoom={defaultCenter.zoom} center={defaultCenter.center} >
        {
            myCameras.map(tempCam => {
              let location=getLocation(tempCam)
              if(location.lat==defaultCenter.center.lat &&location.lng==defaultCenter.center.lng ){
                return (<Marker icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png" key={tempCam.id} position={getLocation(tempCam)} onClick={()  => handleClick(tempCam)} />)
              }else{
                return(<Marker icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png" key={tempCam.id} position={getLocation(tempCam)} onClick={()  => handleClick(tempCam)} />
              )}
            
            }
        )}
        {selected &&
        (

            <InfoWindow
            position={getLocation(selected)}
            clickable={true}
            onCloseClick={() => setSelected(null)}
        >
            <div style={{ display: "flex",flexDirection:'column',  justifyContent: "space-between" ,width:'250px'}}>
            <p className='mx-2' style={{fontSize:"15px",    margin: '0px' }}>{selected.description}</p>
            <p className='mx-2' style={{fontSize:"12px",margin: '0px'  ,display:'flex',justifyContent:'flex-start',alignItems:'center'}}> 
            <strong style={{fontWeight:'700'}}>Sunrise: </strong>
            <Avatar src={sunriseImg} style={{width:'20px',height:'20px'}}/>{formatDate(selected.sunrise)}</p>
            <p className='mx-2' style={{fontSize:"12px" ,margin: '0px' ,display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
               <strong style={{fontWeight:'700'}}>Sunset: </strong>
               <Avatar src={sunsetImg} style={{width:'25px',height:'25px'}}/>
               {formatDate(selected.sunset)}</p>
               
            </div>
        </InfoWindow>
        )}
    </GoogleMap>
  )
}