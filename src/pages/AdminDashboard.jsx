import { createContext, useState } from "react";
import { NavBar } from "../components/NavBar";
import { ProductList } from "../components/ProductList";
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";
import axios from "axios";

export const HandleDeleteContext = createContext();
export const AdminDashboard = () => {

    
  
   
    // modal para eliminar producto
    const [showModalDel, setShowModalDel] = useState(false);
    const [idProductDelete, setIdProductDelete] = useState(0)
    const [keyProductList, setKeyProductList] = useState(0)

  
    const handleCloseModalDel = () => setShowModalDel(false);
    const handleShowModalDel = (id) => 
    {
        setIdProductDelete(id);
        setShowModalDel(true);

    }

    const handleDelete = async () => {
        setShowModalDel(false)
        try {
          const res = await axios.delete(`https://localhost:7262/api/pruducto/${idProductDelete}`);
          setKeyProductList(keyProductList + 1)
        } catch (err) {
          console.log(err);
        }
    }
    
    
    const ModalDelete = () =>{
    
        return (
            <Modal
            show={showModalDel}
            onHide={handleCloseModalDel}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header>
              <Modal.Title>¿Seguro que desea eliminar el producto?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              El Producto será eliminado y podrá ser comprado
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModalDel}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
            </Modal.Footer>
          </Modal>

        )
    }
  
  
  


  return (
    <div>
        <NavBar />
        <HandleDeleteContext.Provider value={handleShowModalDel}>
            <ProductList  key={keyProductList}/>
        </HandleDeleteContext.Provider>
        <ModalDelete/>
    </div>
  );
};
