// CameraDetailsPage.js
import React,{useState,useEffect} from 'react';
import CSVChart from '../features/Charts/CSVChart';
import { useParams } from 'react-router-dom';
import Chart from '../features/Charts/Chart';
import LiveChart from '../features/Charts/LiveChart';

import Temp from '../features/Charts/Temp';
import './CameraDetailsPage.css';
import VennDiagram from '../features/Charts/VennDiagram';
import Groupchart from '../features/Charts/Groupchart';
import DayPieChart from '../features/Charts/DayPieChart';
function CameraDetailsPage() {
  const { id } = useParams(); 
  const [selectedCamera, setSelectedCamera] = useState('');
  const [selectedField, setSelectedField] = useState(''); // Default field, e.g., field1 (change to voltage field)
const [cameraId,setCameraId]=useState(0);
const [showC,setShowC]=useState(false);
  const [show,setShow]=useState(false);
  const [showS,setShowS]=useState(false);
  useEffect(() => {
    if (id === '10') {
      setSelectedField('field1');
      setSelectedCamera('N1 - Khyber Power House');
      setCameraId(10);
    }
    if (id === '8') {
      setShowC(true);
      setSelectedField('field2');
      setSelectedCamera('N3 - Karimabad Elec Tower')
      setCameraId(8);
    }
    if (id === '14') {
      setSelectedField('field3');
      setSelectedCamera('Karimabad');
      setShowC(true);
      setShow(true);
      setCameraId(14);
      setShowS(true);
    }
    if (id === '7') {
      setShowC(true);
      setSelectedField('field4');
      setSelectedCamera('N4 - Khyber Central')
      setCameraId(7);
    }
    if (id === '6') {
      setShowC(true);
      setSelectedField('field5');
      setSelectedCamera('N5 - Khyber Telco Tower');
      setCameraId(6);
    }if(id==='13'){
      
      setCameraId(13);
      setShowS(true);
    }
    if(id==='15'){
      
      setCameraId(15);
      setShowS(true);
    }
    if(id==='16'){
      setCameraId(16);
      setShowS(true);
    }
    if(id==='17'){
      setCameraId(17);
      setShowS(true);
    }else{
      setCameraId(id)
    }
    
    
    
  }, [id]);

 
  return (
    <div className="page">
    <div className="page__content">
      <div className="main-wrapper">
        
        <header className="row db" style={{ marginTop: 25, marginLeft: '10%' }}>
          <div className="col s12">
            <h2 className="bold">Statistics</h2>
          </div>
        </header>
        
          <div className="main-content">
        

        <div className="content-container"style={{display: 'flex', flexDirection: 'row',flexWrap: 'wrap',justifyContent:'space-around',alignItems:'center'}}>
       
        {/*<div className="chart-container" style={{width: '45%',borderRadius:'20px',background:'white'}}>
       <VennDiagram cameraId={id}/>
  </div>*/}
        
            <div className="chart-container" style={{width: '100%',display:'flex',flexDirection:'column',justifyContent:'center',borderRadius:'20px',background:'white',height: '500px',alignItems:'center'}}>
              
              <LiveChart cameraId={id} cameraName={selectedCamera} />
            </div>
            
          {/*showC && (
            <div className="chart-container" style={{width: '45%',borderRadius:'20px',background:'white'}}>
              <CSVChart selectedCamera={selectedCamera} selectedField={selectedField} />
            </div>
          )*/}
          {show && (
            <div className="chart-container" style={{width: '45%',borderRadius:'20px',background:'white',marginTop:'10px'}}>
              <Chart />
            </div>
          )}
           {show && (
            <div className="chart-container" style={{width: '45%',borderRadius:'20px',background:'white',marginTop:'10px'}}>
              <Groupchart />
            </div>
          )}
          {show && (
            <div className="chart-container" style={{width: '45%',borderRadius:'20px',background:'white'}}>
              <Temp />
            </div>
          )}
          
          

          
        </div>
      </div>
        </div></div>
    
    </div>
  );
}

export default CameraDetailsPage;
