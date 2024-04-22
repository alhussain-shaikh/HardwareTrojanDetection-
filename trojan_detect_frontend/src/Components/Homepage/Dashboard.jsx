import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Grid from '@mui/material/Grid';

const Dashboard = () => {

  const [totalScan , setTotalScan] = useState(100);
  const [countTjFree , setCountTjFree] = useState(80);
  const [countTjin , setCountTjIn] = useState(20);

  const tableData = [
    { srNo: 1, date: '2023-01-01', manufacturer: 'Tyrell Corp', icName: 'IC123', status: 'Trojan Free' },
    { srNo: 2, date: '2023-01-02', manufacturer: 'XYZ Ltd', icName: 'IC456', status: 'Trojan Infected' },
    { srNo: 3, date: '2023-01-03', manufacturer: 'PQR Inc', icName: 'IC789', status: 'Trojan Free' },
    { srNo: 4, date: '2023-01-04', manufacturer: 'LMN Tech', icName: 'IC012', status: 'Trojan Infected' },
    { srNo: 5, date: '2023-01-05', manufacturer: 'EFG Solutions', icName: 'IC345', status: 'Trojan Free' },
    { srNo: 6, date: '2023-01-06', manufacturer: 'UVW Systems', icName: 'IC678', status: 'Trojan Infected' },
    { srNo: 7, date: '2023-01-07', manufacturer: 'JKL Innovations', icName: 'IC901', status: 'Trojan Free' },
  ];

  return (
    <div>
      <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              {/* Total Trojan Count */}
              <Typography variant="h5" component="div" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                Total Codes Scan : {totalScan}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              {/* Number of Trojan Free */}
              <Typography variant="h5" component="div" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CheckCircleOutlineIcon fontSize="large" style={{ marginRight: '8px' }} />
                Trojan Free: {countTjFree}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              {/* Number of Trojan Infected */}
              <Typography variant="h5" component="div" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ReportProblemIcon fontSize="large" style={{ marginRight: '8px' }} />
                Trojan Infected: {countTjin}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider style={{ marginTop: '16px', marginBottom: '16px' }} />

      <Card>
        <CardContent>
          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Name of Manufacturer</TableCell>
                  <TableCell>Name of IC</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.srNo}>
                    <TableCell>{row.srNo}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.manufacturer}</TableCell>
                    <TableCell>{row.icName}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
