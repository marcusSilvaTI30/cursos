import { Box, Title, Group, Button } from '@mantine/core';
import { useEffect, useState } from "react";
import { ProdutoList } from "../components/ProdutoList/ProdutoList";
import { findAllProdutos, Produto } from '../services/produtos';

export function Produtos() {

  const [produtos, setProdutos] = useState<Produto[]> ([]);
  const [haveChanges, setHaveChanges] = useState(true);

  useEffect(() => {
    if (haveChanges) {
      findAllProdutos().then((data) => {
        setProdutos(data.data);
        console.log(produtos);
      });
    }

    setHaveChanges(false);
  }, [haveChanges]);

  return (
    <Box mt="lg">
      <Group 
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
      <Title>Listagem de produtos</Title>
      <Button onClick={() => {}}> Adicionar Produto </Button>
      </Group>
      
      <ProdutoList data={produtos}></ProdutoList>
    </Box>
  );
}
