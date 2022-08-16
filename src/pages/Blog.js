import React, { useEffect } from 'react'

export default function Blog() {

  useEffect(() => {

    fetch('/design-patterns')
      .then(r => r.text())
      .then(v => {
        console.log(v);
      })
    return () => {

    }
  }, [])


  return (
    <div>Blog</div>
  )
}
