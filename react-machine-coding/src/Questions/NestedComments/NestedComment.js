import React, { useState } from 'react'
import Comment from './Comment'

const initialData = [
  {
    "id": 1,
    "text": "This is the first top-level comment",
    "author": "Alice",
    "timestamp": "2025-07-06T10:00:00Z",
    "replies": [
      {
        "id": 2,
        "text": "Reply to first comment",
        "author": "Bob",
        "timestamp": "2025-07-06T10:05:00Z",
        "replies": [
          {
            "id": 3,
            "text": "Nested reply to Bob",
            "author": "Charlie",
            "timestamp": "2025-07-06T10:10:00Z",
            "replies": []
          }
        ]
      },
      {
        "id": 4,
        "text": "Another reply to first comment",
        "author": "Dave",
        "timestamp": "2025-07-06T10:06:00Z",
        "replies": []
      }
    ]
  },
  {
    "id": 5,
    "text": "This is the second top-level comment",
    "author": "Eve",
    "timestamp": "2025-07-06T11:00:00Z",
    "replies": []
  }
]


const NestedComment = () => {
    const [data, setData] = useState(initialData);
  return (
    <Comment comments={data} fullComments={data} setComments={setData}/>
  )
}

export default NestedComment