import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import '../index.css';

import { API_URL } from '../Utils/Constans';
import numberWithCommas from '../Utils/Utils';
import { Link } from 'react-router-dom';

export default class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.Keranjangs,
    };

    axios.post(API_URL + 'pesanan', pesanan).then((res) => {});
  };
  render() {
    const totalBayar = this.props.Keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);

    return (
      <>
        {/*Web */}
        <div className="fixed-bottom d-none d-md-block ">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h5>
                Total Harga : <strong className="total-bayar"> Rp. {numberWithCommas(totalBayar)} </strong>
              </h5>
              <Link to="/sukses">
                <Button variant="primary" className="btn-bayar" size="lg" onClick={() => this.submitTotalBayar(totalBayar)}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <strong> Bayar</strong>
                </Button>
              </Link>
            </Col>
          </Row>
        </div>

        {/*Mobile*/}
        <div className="d-sm-block d-md-none ">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h5>
                Total Harga :<strong className="total-bayar">Rp. {numberWithCommas(totalBayar)} </strong>
              </h5>
              <Link to="/sukses">
                <Button variant="primary" className="btn-bayar" size="lg" onClick={() => this.submitTotalBayar(totalBayar)}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <strong> Bayar</strong>
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
