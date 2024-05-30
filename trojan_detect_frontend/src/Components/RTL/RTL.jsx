import React from 'react'
import Nav from '../Homepage/Nav'
import Dashboard from '../Homepage/Dashboard'
import FileUpload from '../../file_upload'
import Footer from '../Footer/Footer'

const RTL = () => {
  return (
    <>
    <Nav /> <br /><br />
    <FileUpload /><br /><br />
    <Dashboard />
    <Footer />
    </>
  )
}
export default RTL ;