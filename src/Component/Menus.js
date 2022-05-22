import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import numberWithCommas from '../Utils/Utils';

const Menus = ({ menu, MasukKeranjang }) => {
  return (
    <Col xs={6} className="mt-3">
      <Card className="shadow" onClick={() => MasukKeranjang(menu)}>
        <Card.Img variant="top" height={250} src={'asset/' + menu.category.nama.toLowerCase() + '/' + menu.gambar} />
        <Card.Body>
          <Card.Title>
            {menu.nama} ({menu.kode})
          </Card.Title>
          <Card.Text>Rp.{numberWithCommas(menu.harga)}</Card.Text>
          <Button variant="primary">Beli</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
