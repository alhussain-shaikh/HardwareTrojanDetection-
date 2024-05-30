import React, { useState } from 'react';
import { Carousel, Button, Table } from 'react-bootstrap';

const CarouselComponent = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedMinistry, setSelectedMinistry] = useState(null);

  const handleMinistryClick = (ministry) => {
    setSelectedMinistry(ministry);
    setShowDetails(true);
  };

  const ministries = [
    {
      id: 1,
      name: "Manufacturer",
      image : "https://www.jadeglobal.com/sites/default/files/2022-10/JSFM-Blog-banner-min.jpg" ,
      corporations: [
        { id: 1, name: "Corporation 1", contractDate: '2023-01-01', icName: 'IC1', qty: 100},
        { id: 2, name: "Corporation 2", contractDate: '2023-02-01', icName: 'IC2', qty: 150 },
        { id: 3, name: "Corporation 3", contractDate: '2023-03-01', icName: 'IC3', qty: 200 },
      ],
    },
    {
      id: 2,
      name: "PCB Designer",
      image : "https://www.zuken.com/us/wp-content/uploads/sites/12/2014/01/blue-pcb-featured-img-1.jpg" ,
      corporations: [
        { id: 4, name: "Corporation 4", contractDate: '2023-04-01', icName: 'IC4', qty: 120 },
        { id: 5, name: "Corporation 5", contractDate: '2023-05-01', icName: 'IC5', qty: 180 },
        { id: 6, name: "Corporation 6", contractDate: '2023-06-01', icName: 'IC6', qty: 220 },
      ],
    },
    {
      id: 3,
      name: "Embedded Developer",
      image : "https://www.cambridgeconsultants.com/sites/default/files/uploaded-images/Hero_ccims_42750012350_1.jpg" ,
      corporations: [
        { id: 7, name: "Corporation 7", contractDate: '2023-07-01', icName: 'IC7', qty: 130 },
        { id: 8, name: "Corporation 8", contractDate: '2023-08-01', icName: 'IC8', qty: 160 },
        { id: 9, name: "Corporation 9", contractDate: '2023-09-01', icName: 'IC9', qty: 240 },
      ],
    },
  ];

  const carouselStyle = {
    minHeight: '50vh',
  };

  const carouselItemStyle = {
    height: '60vh',
  };

  const captionStyle = {
    background: 'rgba(169, 169, 169, 0.7)',
    color: '#fff',
  };

  const buttonStyle = {
    background: 'blue',
    margin : 'auto' ,
    color: '#fff',
  };

  const tableStyle = {
    margin: '20px auto',
    width: '80%',
  };

  return (
    <div>
      <Carousel style={carouselStyle}>
        {ministries.map(ministry => (
          <Carousel.Item key={ministry.id} onClick={() => handleMinistryClick(ministry)} style={carouselItemStyle}>
            <img
              className="d-block w-100"
              src={`${ministry.image}`}
              alt={`Ministry ${ministry.id}`}
              style={carouselItemStyle}
            />
            <Carousel.Caption style={captionStyle}>
              <h3> {ministry.name} </h3>
              <Button variant="contained" style={buttonStyle}>
                View Corporations
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {showDetails && selectedMinistry && (
        <div>
          {/* <h2 style={}>{selectedMinistry.name}</h2> */}
          <Table striped bordered hover style={tableStyle}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Contract Date</th>
                <th>IC Name</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {selectedMinistry.corporations.map(corporation => (
                <tr key={corporation.id}>
                  <td>{corporation.id}</td>
                  <td>{corporation.name}</td>
                  <td>{corporation.contractDate}</td>
                  <td>{corporation.icName}</td>
                  <td>{corporation.qty}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="secondary" onClick={() => setShowDetails(false)}>Close</Button>
        </div>
      )}
    </div>
  );
};

export default CarouselComponent;