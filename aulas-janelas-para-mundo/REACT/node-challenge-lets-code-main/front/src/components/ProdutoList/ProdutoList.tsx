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
import { Produto } from '../../services/produtos';

interface ProdutoListProps {
  data: Produto[];
}

export function ProdutoList({ data }: ProdutoListProps) {
  return (
    <>
      <ScrollArea>
        <Table sx={{ minWidth: 400 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Qtd. Estoque</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.descricao}</td>
                  <td>{item.preco}</td>
                  <td>{item.estoque}</td>
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
