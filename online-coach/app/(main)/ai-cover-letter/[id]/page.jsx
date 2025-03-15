import React from 'react'

async function CoverLetter({params}) {
    const id = await params.id

    
    
  return (
    <div className='mt-40'>CoverLetter{id}</div>
  )
}

export default CoverLetter