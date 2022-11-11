import { Box, Button, Grid, Modal, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  createFuncionario,
  findAllGerentes,
  Funcionario,
} from '../../../services/funcionario';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';

interface CriarFuncionarioModalProps {
  opened: boolean;
  onClose: () => void;
  updateList: () => void;
}

export function CriarFuncionarioModal({
  opened,
  onClose,
  updateList,
}: CriarFuncionarioModalProps) {
  const form = useForm({
    initialValues: {
      nome: '',
      cargo: '',
      gerente: '',
    },
  });

  const [gerentes, setGerentes] = useState<{ label: string; value: number }[]>(
    []
  );

  useEffect(() => {
    findAllGerentes().then((data) => {
      const result = data.data.map((item) => ({
        label: item.nome,
        value: item.id,
      }));
      setGerentes(result);
    });
  }, []);

  const handleSubmit = (values: {
    nome: string;
    cargo: string;
    gerente: string;
  }) => {
    console.log(values.gerente);
    createFuncionario(values)
      .then(() => {
        showNotification({
          color: 'green',
          title: 'Sucesso',
          message: 'Funcionario cadastrado com sucesso',
        });
        updateList();
        onClose();
      })
      .catch((err) => {
        showNotification({
          color: 'red',
          title: 'Erro',
          message: err.response.data.message,
        });
        onClose();
      });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Adicionar Funcionario"
      size="md"
      padding="lg"
      centered
    >
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values);
        })}
      >
        <Grid grow gutter="xl" mt="lg" mb="lg">
          <Grid.Col span={12}>
            <TextInput
              label="Nome"
              placeholder="Nome"
              mb="md"
              required
              {...form.getInputProps('nome')}
            />
            <Select
              label="Cargo"
              placeholder="Cargo"
              mb="md"
              required
              data={[
                { label: 'Vendedor', value: 'VENDEDOR' },
                { label: 'Gerente', value: 'GERENTE' },
              ]}
              {...form.getInputProps('cargo')}
            />
            <Select
              label="Gerente"
              placeholder="Gerente"
              mb="md"
              data={[...gerentes]}
              {...form.getInputProps('gerente')}
            />
          </Grid.Col>
        </Grid>
        <Box style={{ display: 'flex', justifyContent: 'end', gap: '1rem' }}>
          <Button
            onClick={onClose}
            color="red"
            size="md"
            variant="subtle"
            pl="xl"
            pr="xl"
          >
            Cancelar
          </Button>
          <Button type="submit" color="blue" size="md" pl="xl" pr="xl">
            Salvar
          </Button>
        </Box>
      </form>
    </Modal>
  );
}
