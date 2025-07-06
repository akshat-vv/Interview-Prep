import React from 'react'
import useFetch from './useFetch'

const FetchExample = () => {

    const {data, loading, error} = useFetch();

    console.log(data,loading, error)
  return (
    <div>FetchExample</div>
  )
}

export default FetchExample