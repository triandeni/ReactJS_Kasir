import React, { Component } from 'react';
import { Hasil, ListComponent, Menus } from '../Component/Index';
import { Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../Utils/Constans';
import swal from 'sweetalert';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      CategoryYangDipilih: 'makanan',
      Keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + 'product?category.nama=' + this.state.CategoryYangDipilih)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log('yahh error', error);
      });

    axios
      .get(API_URL + 'Keranjang')
      .then((res) => {
        const Keranjangs = res.data;
        this.setState({ Keranjangs });
      })
      .catch((error) => {
        console.log('yahh error', error);
      });
  }

  componentDidUpdate(prefState) {
    if (this.state.Keranjangs !== prefState.Keranjangs) {
      axios
        .get(API_URL + 'Keranjang')
        .then((res) => {
          const Keranjangs = res.data;
          this.setState({ Keranjangs });
        })
        .catch((error) => {
          console.log('yahh error', error);
        });
    }
  }

  changeCategory = (value) => {
    this.setState({
      CategoryYangDipilih: value,
      menus: [],
    });

    axios
      .get(API_URL + 'product?category.nama=' + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log('yahh error', error);
      });
  };

  MasukKeranjang = (value) => {
    axios
      .get(API_URL + 'Keranjang?product.id=' + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          axios
            .post(API_URL + 'Keranjang', keranjang)
            .then((res) => {
              swal({
                title: 'Sukses Masuk Keranjang',
                text: 'Sukses Masuk Keranjang ' + keranjang.product.nama,
                icon: 'success',
                button: false,
                timer: 2000,
              });
            })
            .catch((error) => {
              console.log('yahh error', error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };
          axios
            .put(API_URL + 'Keranjang/' + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: 'Sukses Masuk Keranjang',
                text: 'Sukses Masuk Keranjang ' + keranjang.product.nama,
                icon: 'success',
                button: false,
                timer: 2000,
              });
            })
            .catch((error) => {
              console.log('yahh error', error);
            });
        }
      })
      .catch((error) => {
        console.log('yahh error', error);
      });
  };

  render() {
    const { menus, CategoryYangDipilih, Keranjangs } = this.state;
    return (
      <div className="App">
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListComponent changeCategory={this.changeCategory} CategoryYangDipilih={CategoryYangDipilih} />
              <Col className="mt-3">
                <h4>
                  <strong className="text-center">Daftar Produk</strong>
                </h4>
                <hr />
                <Row className="overflow-auto menu">{menus && menus.map((menu) => <Menus key={menu.id} menu={menu} MasukKeranjang={this.MasukKeranjang} />)} </Row>
              </Col>
              <Hasil Keranjangs={Keranjangs} {...this.props} />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
