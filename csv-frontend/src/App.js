import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function App() {
  // set state of songs
  const [songs, setSongs] = useState([]);

  // API URL
  const API_URL = 'http://localhost:8000/api/v1/songs';

  // fetch data on component rendering
  useEffect(() => {
    axios.get(API_URL)
      .then((res) => {
        console.log(res.data)
        setSongs(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <div className="App">

      {/* HEADER */}
      <div className="header">
        <h1>Your Songs!</h1>
      </div>

      {/* MAIN */}
      <div className="main">
        <div className="songs-list-container">
          <br />
          <TableContainer component={Paper}>
            <Table className="table" sx={{ minWidth: 200 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <span className="tableHeadCell">Song Name</span>
                  </TableCell>
                  <TableCell align="left">
                    <span className="tableHeadCell">Band</span>
                  </TableCell>
                  <TableCell className="tableHeadCell" align="left">
                    <span className="tableHeadCell">Year</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {songs.map((song) => (
                  <TableRow
                    key={song.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left" >{song.song_name}</TableCell>
                    <TableCell align="left">{song.band}</TableCell>
                    <TableCell align="left">{song.year}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
