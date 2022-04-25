import { useState,useEffect,useRef } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(true);
  const [current,setCurrent]=useState("臺北市");
  const [filtered,setFiltered]=useState([]);
  const [districtName,setDistrictName]=useState("中正區");
  const [zip,setZip]=useState("");


  const fetchData= async()=>{
    try{
      const res=await axios.get("https://gist.githubusercontent.com/abc873693/2804e64324eaaf26515281710e1792df/raw/a1e1fc17d04b47c564bbd9dba0d59a6a325ec7c1/taiwan_districts.json");
      const data=res.data;
      setData(data);
      setLoading(false);
    }catch(error){
      console.log(error);
    }
  }

  //選擇城市
  const changeHandler=(e)=>{
    setCurrent(e.target.value);
  }
  // const filterData=()=>{
  //   data.map((d)=>{
  //     if(d.name===current){
  //       setFiltered(d.districts)
  //     }
  //   })
  // }
  const filterData=()=>{
    const updatedList=data.filter((d)=>{
      return d.name===current;
    })
    if(!loading){
      setFiltered(updatedList[0].districts)
    }else{
      setFiltered([])
    }
  }
  //選擇鄉鎮
  const changeHandlerDistrict=(e)=>{
    setDistrictName(e.target.value);
  }

  const filterZip=()=>{
    const updated=filtered.filter((d)=>{
      return d.name===districtName
    })
    if(!loading){
      setZip(updated[0].zip)
    }else{
      setZip("");
    }
  }

  useEffect(()=>{
    fetchData()
  },[]);

  useEffect(()=>{
    filterData()
  },[current])
  
  useEffect(()=>{
    filterZip()
  },[districtName])



  if(loading){
    return <h1>Loading...</h1>
}

  return (
    <div className="App">
      <select onChange={changeHandler} defaultValue={"臺北市"}>
        {data.map((d,index)=>{
          return (
            <option key={index} value={d.name}>{d.name}</option>
          )
        })}
      </select>
      <select onChange={changeHandlerDistrict} defaultValue={"中正區"}>
        {filtered.map((f,index)=>{
          return (<option key={index} value={f.name}>{f.name}</option>)
        })}
      </select>
      <p>{zip}</p>
    </div>
  )
}

export default App
