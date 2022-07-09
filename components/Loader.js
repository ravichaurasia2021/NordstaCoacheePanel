import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
const Loader=(props)=>{
    return(
        <div className='container-fluid' style={{position:'fixed',zIndex:'999999999999999999999',background:'#88888824',width:'100%',left:'0%',top:'0%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',padding:'15px'}}>
              <div className='container' style={{padding:'15px',justifyContent:'center',alignItems:'center',display:'flex'}}>
                    <PulseLoader color={'#0603AF'} loading={props?.isLoad?props?.isLoad:false} size={20} />
              </div>

        </div>
    )
}
export default Loader;