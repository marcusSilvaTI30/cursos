import {
  ActionIcon,
  Button,
  Group,
  List,
  Popover,
  ScrollArea,
  Stack,
  Table,
  Text,
} from '@mantine/core';

import { IconEdit, IconTrash } from '@tabler/icons';
import { Pedido } from '../../services/pedidos';

interface PedidoListProps {
  data: Pedido[];
}

export function PedidoList({ data }: PedidoListProps) {
  return (
    <>
      <ScrollArea>
        <Table sx={{ minWidth: 400 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Vendedor</th>
              <th>Endereço</th>
              <th>Preço Total</th>
              <th>Data</th>
              <th>Produtos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.vendedor.nome}</td>
                  <td>{item.endereco_entrega}</td>
                  <td>{item.preco_total}</td>
                  <td>
                    {new Date(item.data_pedido).toLocaleDateString('pt-BR')}
                  </td>
                  <td>
                    <Popover width={280} shadow="md" position="bottom">
                      <Popover.Target>
                        <Text style={{ cursor: 'pointer' }}>
                          {item.itens.length} produtos
                        </Text>
                      </Popover.Target>
                      <Popover.Dropdown>
                        <List>
                          {item.itens.map((element) => (
                            <List.Item key={element.produto.id + Math.random()}>
                              {element.produto.descricao}
                            </List.Item>
                          ))}
                        </List>
                      </Popover.Dropdown>
                    </Popover>
                  </td>
                  <td>
                    <Group>
                      <ActionIcon color="clue">
                        <IconEdit size={20} />
                      </ActionIcon>
                      <Popover
                        width={200}
                        position="right"
                        withArrow
                        shadow="md"
                      >
                        <Popover.Target>
                          <ActionIcon color="red">
                            <IconTrash size={20} />
                          </ActionIcon>
                        </Popover.Target>
                        <Popover.Dropdown>
                          <Stack>
                            <Text size="sm">
                              Tem certeza que deseja excluir esse item ?
                            </Text>
                            <Button size="xs" variant="light" color="red">
                              Remover
                            </Button>
                          </Stack>
                        </Popover.Dropdown>
                      </Popover>
                    </Group>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
