import { Box, Button, Group, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { PedidoList } from '../components/PedidoList/PedidoList';
import { findAllPedidos, Pedido } from '../services/pedidos';

export function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [haveChanges, setHaveChanges] = useState(true);

  useEffect(() => {
    if (haveChanges) {
      findAllPedidos().then((data) => {
        setPedidos(data.data);
      });
    }

    setHaveChanges(false);
  }, [haveChanges]);

  return (
    <Box mt="lg">
      <Group
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title mb="lg" order={2}>
          Listagem de Pedidos
        </Title>

        <Button onClick={() => {}}>Adicionar Pedido</Button>
      </Group>

      <PedidoList data={pedidos} />
    </Box>
  );
}
