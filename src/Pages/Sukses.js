import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { API_URL } from '../Utils/Constans';
import axios from 'axios';

export default class Sukses extends Component {
  componentDidMount() {
    axios
      .get(API_URL + 'keranjang')
      .then((res) => {
        const keranjang = res.data;
        keranjang.map(function (item) {
          return axios
            .delete(API_URL + 'keranjang/' + item.id)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log('error yaa', error);
      });
  }
  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="asset/undraw.png" width="500" />
        <h2>Sukses</h2>
        <p>Terima Kasih Sudah Order</p>

        <Link style={{ borderRadius: '20%', textDecoration: 'none', backgroundColor: 'blue', fontSize: '1.5rem', padding: '5px', text: 'bold' }} to="/">
          Kembali
        </Link>
      </div>
    );
  }
}
