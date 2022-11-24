import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import CategoriesModal from './CategoriesModal';
import ProductsModal from './ProductsModal';
import Navbar from './Navbar';
import StoreModal from './StoreModal';

function TabsExample() {
  return (
    <div>
      <Navbar/>
    <br/><br/><br/><br/>
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#Categories" style={{width:'100px',}}>
      <Row>
        <Col sm={4}>
          <ListGroup>
            <ListGroup.Item action href="#Categories">
             Categories
            </ListGroup.Item>
            <ListGroup.Item action href="#Products">
              Products
            </ListGroup.Item>
            <ListGroup.Item action href="#Store">
              Store
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content>
            <Tab.Pane eventKey="#Categories">
              <CategoriesModal/>
            </Tab.Pane>
            <Tab.Pane eventKey="#Products">
            <ProductsModal/>
            </Tab.Pane>
            <Tab.Pane eventKey="#Store">
            <StoreModal/>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </div>  
  );
}

export default TabsExample;