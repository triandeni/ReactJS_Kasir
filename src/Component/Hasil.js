import React, { Component } from 'react';
import { Badge, Col, ListGroup, Row, Card } from 'react-bootstrap';
import numberWithCommas from '../Utils/Utils';
import ModalKeranjang from './ModalKeranjang';
import TotalBayar from './TotalBayar';
import axios from 'axios';
import { API_URL } from '../Utils/Constans';
import swal from 'sweetalert';
import '../index.css';

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: '',
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handlerSubmit = (event) => {
    event.preventDefault();

    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };
    axios
      .put(API_URL + 'Keranjang/' + this.state.keranjangDetail.id, data)
      .then((res) => {
        swal({
          title: 'Update Pesanan!',
          text: 'Sukses Update Pesanan ' + data.product.nama,
          icon: 'success',
          button: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.log('yahh error', error);
      });
  };

  hapusPesanan = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + 'Keranjang/' + id)
      .then((res) => {
        swal({
          title: 'Hapus Pesanan!',
          text: 'Sukses Hapus Pesanan ' + this.state.keranjangDetail.product.nama,
          icon: 'error',
          button: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.log('yahh error', error);
      });
  };
  render() {
    const { Keranjangs } = this.props;

    return (
      <Col md={3} className="mt-3">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {Keranjangs.length !== 0 && (
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush">
              {Keranjangs.map((menuKeranjang) => (
                <ListGroup.Item key={menuKeranjang.id} onClick={() => this.handleShow(menuKeranjang)}>
                  <Row>
                    <Col variant="primary">
                      <h5>
                        <Badge bg="primary">{menuKeranjang.jumlah}</Badge> {menuKeranjang.product.nama}
                      </h5>

                      <p>
                        <strong className="ms-4">Rp.{numberWithCommas(menuKeranjang.product.harga)}</strong>
                      </p>
                    </Col>

                    <Col>
                      <h5>
                        <strong className="total-bayar">Rp. {numberWithCommas(menuKeranjang.total_harga)}</strong>
                      </h5>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handlerSubmit={this.handlerSubmit} hapusPesanan={this.hapusPesanan} />
            </ListGroup>
          </Card>
        )}

        <TotalBayar Keranjangs={Keranjangs} {...this.props} />
      </Col>
    );
  }
}
