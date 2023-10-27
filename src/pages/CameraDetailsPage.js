// CameraDetailsPage.js
import React,{useState,useEffect} from 'react';
import CSVChart from '../features/Charts/CSVChart';
import { useParams } from 'react-router-dom';
import Chart from '../features/Charts/Chart'
function CameraDetailsPage() {
  const { id } = useParams(); 
  const [selectedCamera, setSelectedCamera] = useState('');
  const [selectedField, setSelectedField] = useState(''); // Default field, e.g., field1 (change to voltage field)
 const [show,setShow]=useState(false);
  useEffect(() => {
    if (id === '10') {
      setSelectedField('field1');
      setSelectedCamera('N1 - Khyber Power House')
    }
    if (id === '8') {
      setSelectedField('field2');
      setSelectedCamera('N3 - Karimabad Elec Tower')
    }
    if (id === '14') {
      setSelectedField('field3');
      setSelectedCamera('Karimabad')
      setShow(true);
    }
    if (id === '7') {
      setSelectedField('field4');
      setSelectedCamera('N4 - Khyber Central')
    }
    if (id === '6') {
      setSelectedField('field5');
      setSelectedCamera('N5 - Khyber Telco Tower')
    }
    
  }, [id]);

  return (
    <div className="page">
      <div className="page__content">
        <div className="main-wrapper">
          
          <header className="row db" style={{ marginTop: 25, marginLeft: '10%' }}>
            <div className="col s12">
              <h1 className="bold">Camera Statistics</h1>
            </div>
          </header>
          <div className='grid-div-mobile grid-div'>
          <CSVChart selectedCamera={selectedCamera} selectedField={selectedField} />
          </div>
          <div className='grid-div-mobile grid-div'>
            {show&&(
               <Chart/>
            )}
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default CameraDetailsPage;
