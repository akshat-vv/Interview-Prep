import React, { useEffect, useState } from 'react'
import PaginationComponent from './PaginationComponent';

const PaginationExample = () => {
  const [data, setData] = useState([]);


  useEffect(()=>{
    const fetchData = async ()=>{
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setData(data.products);
    } 
  
    fetchData();
  },[])


  return (
    <div>PaginationExample
      <PaginationComponent items={data} itemsPerPage={10} />
    </div>
  )
}

export default PaginationExample