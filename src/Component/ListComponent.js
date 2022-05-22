import React, { Component } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../Utils/Constans';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlFood, faMugHot, faCheese } from '@fortawesome/free-solid-svg-icons';

const Icon = ({ nama }) => {
  if (nama === 'makanan') return <FontAwesomeIcon icon={faBowlFood} className="mr-2" />;
  if (nama === 'minuman') return <FontAwesomeIcon icon={faMugHot} className="mr-2" />;
  if (nama === 'cemilan') return <FontAwesomeIcon icon={faCheese} className="mr-2" />;
};

export default class ListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + 'category')
      .then((res) => {
        const category = res.data;
        this.setState({ category });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { category } = this.state;
    const { changeCategory, CategoryYangDipilih } = this.props;
    return (
      <Col md={2} className="mt-3">
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>
        <hr />
        <ListGroup>
          {category &&
            category.map((categories) => (
              <ListGroup.Item key={categories.id} onClick={() => changeCategory(categories.nama)} className={CategoryYangDipilih === categories.nama && 'category-aktif'} style={{ cursor: 'pointer' }}>
                <h5>
                  <Icon nama={categories.nama} /> {categories.nama}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
